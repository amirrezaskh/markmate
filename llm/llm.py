import re
import json
from pypdf import PdfReader
from dotenv import load_dotenv
from langchain.chains import LLMChain
from langchain.prompts import PromptTemplate
from langchain_openai import OpenAIEmbeddings
from langchain_core.documents import Document
from langgraph.graph import START, StateGraph
from langchain.chat_models import init_chat_model
from typing_extensions import List, TypedDict, Dict, Any
from langchain_core.vectorstores import InMemoryVectorStore
from langchain_community.document_loaders import PyPDFLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter


class RubricEntry(TypedDict):
    problem: str
    criterion: str
    max_score: int
    description: str

class State(TypedDict):
    question: Dict[str, Any]
    course_context: List[Document]
    rubric: List[RubricEntry]
    answer: str


class LLM:
    def __init__(self):
        load_dotenv()
        self.llm = init_chat_model("gpt-4.1-mini", model_provider="openai")
        self.embeddings = OpenAIEmbeddings(model="text-embedding-3-large")
        self.vector_store = InMemoryVectorStore(self.embeddings)

        self.split_prompt = PromptTemplate.from_template("""
        You are an AI assistant tasked with extracting answers to questions from a student submission.
        If a submission does not include a question, include the question in the JSON list but leave the answer empty.
        The question titles can be chosen from the given list if possible, otherwise, select the best suited title yourself:

        Assignment Questions:
        {assignment}
                                                         
        Assignment Solution:
        {solution}

        Student Submission:
        {submission}

        Question Titles:
        {titles}                                                                       
                                            

        Return a JSON list where each item includes:
        - question_title
        - question
        - solution
        - answer
        """)

        self.grading_prompt = PromptTemplate.from_template("""
        You are an expert teaching assistant helping to grade a student's assignment. Your grading should follow the official rubric closely and use the provided course and assignment context when needed.

        ---

        ### Context

        **Course Context:**
        {course_context}

        **Question, Solution, and Student's Submission:**
        {question}

        **Grading Rubric:**
        {rubric}

        ---

        ### Instructions

        Your job is to grade the student's submission based on the rubric and assignment instructions above. 

        Follow these principles:
        1. Use the rubric as the primary grading guideline.
        2. Support each grade with a short rationale, citing what the student did or didn’t do well.
        3. If rubric categories are vague or ambiguous, reason through your decision logically.
        4. Be objective, professional, and avoid guessing when information is missing.
        5. Do not skip any rubric item, even if the student's response is incomplete.
        6. Provide all grades in a structured JSON format.
        8. The score of each criterion is out of 5.

        ---

        ### Output Format

        Return your response in the following JSON format:

        ```json
        {{
        "grades": [
            {{
            "criterion": "Criterion 1 Name",
            "score": 3,                                              
            "rationale": "Student explained the concept clearly but missed a key detail."
            }},
            {{
            "criterion": "Criterion 2 Name",
            "score": 4,
            "rationale": "Good depth and supported by an example from the lecture notes."
            }}
        ],
        "total_score": 7,
        "feedback_summary": "Overall, the student demonstrates good understanding with minor errors in explanation."
        }}
        """)

        graph_builder = StateGraph(State).add_sequence([self.retrieve, self.generate])
        graph_builder.add_edge(START, "retrieve")
        self.graph = graph_builder.compile()

    def read_path(self, path):
        reader = PdfReader(path)
        text = ""
        for page in reader.pages:
            text += page.extract_text()
        return text
    
    def extract_json_from_text(self, pattern, text: str):
        matches = re.findall(pattern, text, flags=re.DOTALL)

        for match in matches:
            try:
                return json.loads(match)
            except json.JSONDecodeError:
                continue
        raise ValueError("No valid JSON found in text")

    def split(self, assignment_path, solution_path, submission_path, rubric):
        assignment_text = self.read_path(assignment_path)
        solution_text = self.read_path(solution_path)
        submission_text = self.read_path(submission_path)

        titles = []
        for rule in rubric:
            titles.append(rule["problem"])
        titles = set(titles)

        split_chain = LLMChain(
            llm=self.llm,
            prompt=self.split_prompt
        )

        output = split_chain.run({
            "assignment": assignment_text,
            "solution": solution_text,
            "submission": submission_text,
            "titles": titles
        })

        try:
            pattern = r'\[\s*\{.*\}\s*\]'
            parsed = self.extract_json_from_text(pattern, output)
            for i in range(len(parsed)):
                parsed[i]["score"] = 0
                parsed[i]["reasoning"] = ""
        except ValueError as e:
            raise RuntimeError(f"Failed to parse JSON from LLM output: {e}")
        return parsed

    def add_doc(self, path):
        loader = PyPDFLoader(path)
        docs = loader.load()

        text_splitter = RecursiveCharacterTextSplitter(
            chunk_size=1000,
            chunk_overlap=200,
            add_start_index=True,
        )
        splits = text_splitter.split_documents(docs)
        self.vector_store.add_documents(documents=splits)

    def retrieve(self, state: State):
        retrieved_docs = self.vector_store.similarity_search(state["question"]["question"])
        return {"course_context": retrieved_docs}


    def generate(self, state: State):
        docs_content = "\n\n".join(doc.page_content for doc in state["course_context"])
        messages = self.grading_prompt.invoke({"question": state["question"], "course_context": docs_content, "rubric": state["rubric"]})
        response = self.llm.invoke(messages)
        return {"answer": response.content}

    def grade_question(self, question, rubric):
        result = self.graph.invoke({"question": question, "rubric": rubric})
        try:
            pattern = r'\{.*"grades".*"feedback_summary".*\}'
            parsed = self.extract_json_from_text(pattern, result["answer"])
        except ValueError as e:
            raise RuntimeError(f"Failed to parse JSON from LLM output: {e}")
        return parsed