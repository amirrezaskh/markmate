import { useNavigate, useParams } from "react-router"
import { useAssignment } from "../hooks";
import { useEffect, useState } from "react";

export default function SubmissionMarking() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [student, setStudent] = useState({});
    const [submission, setSubmission] = useState({});
    const [gradingMode, setGradingMode] = useState(submission.splits && submission.splits.length > 0);
    const {assignments} = useAssignment();
    const assignment = assignments.find(eachAssignment => eachAssignment.id == id)
    const submittedDate = submission.created_at ? new Date(submission.created_at) : null;
    
    const splitElements = submission.splits?.map((split, i) => (
        <div key={i} className="p-6 mb-6 rounded-xl shadow-md bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-bold mb-4">Question {i + 1}</h2>
            <p className="dark:text-gray-300">{split["question"]}</p>
            <div>
                <label className="block my-3 font-semibold">Given Answer</label>
                <p className="dark:text-gray-300">{split["answer"]}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label htmlFor="score" className="block my-3 font-semibold">Score</label>
                    <input
                        type="number"
                        id={`score-${i}`}
                        name="score"
                        value={split["score"] || ''}
                        onChange={(e) => changeSplit(i, "score", e.target.value)}
                        className="w-full px-4 py-2 rounded-md bg-gray-200 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-sky-500"
                    />
                </div>
                <div className="flex items-end justify-end">
                    <button
                        type="button"
                        className="w-full py-2 px-4 bg-green-600 hover:bg-green-700 text-white rounded-md font-semibold transition-all duration-150 ease-in-out cursor-pointer"
                    >
                        Use Auto Grading
                    </button>
                </div>
            </div>
            <div className="mt-4">
                <label htmlFor="reasoning" className="block mb-1 font-semibold">Reasoning</label>
                <textarea
                    id={`reasoning-${i}`}
                    name="reasoning"
                    value={split["reasoning"] || ''}
                    onChange={(e) => changeSplit(i, "reasoning", e.target.value)}
                    rows={3}
                    className="w-full px-4 py-2 resize-none rounded-md bg-gray-200 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
            </div>
        </div>
    ))
    useEffect(() => {
        (async () => {
            const userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
            const response = await fetch(`http://localhost:8000/submissions/${id}`, {
                method: "GET",
                headers: {
                    "Authorization": `Token ${userInfo.token}`,
                    "Content-Type": "application/json"
                }
            });
            const data = await response.json();
            setGradingMode(data.splits && data.splits.length > 0); // Use `data`, not `submission`
            setSubmission(data);
        })();
    }, []);

    useEffect(() => {
        (async () => {
            const userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
            const response = await fetch(`http://localhost:8000/users/${submission.student}`, {
                method: "GET",
                headers: {
                    "Authorization": `Token ${userInfo.token}`,
                    "Content-Type": "application/json"
                }
            });
            const data = await response.json();
            setStudent(data);
        })();
    }, [submission.student]);

    async function getSplits() {
        const userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
        const response = await fetch(`http://localhost:8000/submissions/${id}/split/`, {
            method: "PUT",
            headers: {
                "Authorization": `Token ${userInfo.token}`,
                "Content-Type": "application/json"
            }
        });
        const data = await response.json();
        setSubmission(data);
        setGradingMode(true);
    }

    function changeSubmission(e) {
        setSubmission(prevSubmission => ({
            ...prevSubmission,
            [e.target.name]: e.target.value
        }))
    }

    function changeSplit(index, key, value) {
    setSubmission(prev => {
        const updatedSplits = [...prev.splits];
        updatedSplits[index] = {
            ...updatedSplits[index],
            [key]: value,
        };
        return {
            ...prev,
            splits: updatedSplits
        };
    });
}


    async function handleSubmit(e) {
        e.preventDefault();
        const response = await fetch(`http://localhost:8000/submissions/${id}/`,{
                method: "PUT",
                headers: {
                    "Authorization": `Token ${JSON.parse(sessionStorage.getItem("userInfo")).token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(submission)
            });
        if (response.status === 200) {
            navigate("/marking");
        }
    }

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white py-10">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 bg-white dark:bg-gray-900 rounded-xl p-6 shadow-lg">
                <h1 className="font-bold text-3xl border-b-2 border-gray-300 dark:border-gray-700 pb-6 mb-6">
                    Marking Submission #{id}
                </h1>
                <div className="border-b-2 border-gray-300 dark:border-gray-700 pb-4 mb-5">
                    <h1 className="font-bold text-xl mb-4">
                        {assignment.title}
                    </h1>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                        {assignment.description}
                    </p>
                    <div className="flex flex-row gap-4">
                        {assignment.assignment_file && (
                            <a
                                href={assignment.assignment_file}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sky-600 font-semibold hover:underline block"
                            >
                                Assignment File
                            </a>
                        )}
                        {assignment.public_test_file && (
                            <a
                                href={assignment.public_test_file}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sky-600 font-semibold hover:underline block"
                            >
                                Test File
                            </a>
                        )}
                    </div>
                </div>
                
                <div className="flex flex-row font-bold text-md border-b-2 border-gray-300 dark:border-gray-700 pb-5 mb-4 justify-between">
                    <p>
                        Student: {student.first_name} {student.last_name}
                    </p>
                    {submission.submission_file && (
                            <a
                                href={submission.submission_file}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sky-600 font-semibold hover:underline block"
                            >
                                Submission File
                            </a>
                        )}
                    <p className="">
                        Submitted on: {submittedDate?.toDateString()}
                    </p>
                </div>
                {gradingMode ?
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {splitElements}
                        <button
                            type="submit"
                            className="w-full py-2 bg-sky-600 hover:bg-sky-700 text-white rounded-md font-semibold transition cursor-pointer"
                        >
                            Submit Grade
                        </button>
                    </form> 
                    :
                    <button
                        onClick={() => getSplits()}
                        type="button"
                        className="w-full mt-7 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md font-semibold transition cursor-pointer"
                    >
                        Start Grading
                    </button>
                }
            </div>
        </div>
    )
}