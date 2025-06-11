import os
import signal
from llm import LLM
from flask import Flask, request

port = 8080
llm = LLM()
app = Flask(__name__)


@app.route("/split/", methods=['POST'])
def split():
    assignment_path = request.get_json()["assignment_path"]
    submission_path = request.get_json()["submission_path"]
    rubric = request.get_json()["rubric"]
    return llm.split(assignment_path, submission_path, rubric)


@app.route("/doc/", methods=['POST'])
def add_doc():
    path = request.get_json()["path"]
    llm.add_doc(path)
    return "Document was added to vector store successfully."


@app.route("/grade/", methods=['POST'])
def grade_question():
    question = request.get_json()["question"]
    rubric = request.get_json()["rubric"]
    return llm.grade_question(question, rubric)


@app.route("/exit/")
def exit_llm():
    os.kill(os.getpid(), signal.SIGTERM)


if __name__ == '__main__':
    app.run(host="localhost", port=port, debug=True)
