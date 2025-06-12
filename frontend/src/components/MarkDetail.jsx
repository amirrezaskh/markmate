import { useEffect, useState } from "react";
import { useAssignment } from "../hooks"
import ReactMarkdown from "react-markdown";

export default function MarkDetail({ currentAssignmentId }) {
    const { assignments } = useAssignment();
    const assignment = assignments.find(eachAssignment => eachAssignment.id == currentAssignmentId);
    const [submission, setSubmission] = useState({})
    const splitElements = submission.splits?.map((split, i) => (
        <div key={i} className="p-6 mb-6 rounded-xl shadow-md bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
            <div className="flex flex-row justify-between">
                <h2 className="text-lg font-bold mb-4 text-sky-600">Question {i + 1}</h2>
                <h2 className="text-lg font-bold mb-4 text-sky-600">Score: {split["score"]}</h2>
            </div>
            <div>
                <label className="block my-3 font-semibold">Reason:</label>
                <div className="dark:text-gray-300 whitespace-pre-wrap prose dark:prose-invert max-w-none">
                    <ReactMarkdown>{split["reasoning"]}</ReactMarkdown>
                </div>
            </div>
        </div>
    ))

    useEffect(() => {
        (async () => {
            const response = await fetch(`http://localhost:8000/users/submission/?assignment_id=${currentAssignmentId}`,{
                method: "GET",
                headers: {
                    "Authorization": `Token ${JSON.parse(sessionStorage.getItem("userInfo")).token}`,
                    "Content-Type": "application/json"
                }
            });
            if (response.status != 404) {
                const data = await response.json()
                setSubmission(data);
            }
            
        })();
    }, [currentAssignmentId]);

    if (!assignment) return <p className="text-gray-500">No assignment selected.</p>;

    return (
        <div>
            <div className="mb-4 border-b border-gray-300 dark:border-gray-700 pb-2">
                <h2 className="text-md font-bold ">{assignment.title}</h2>
            </div>

            {
                    submission != {} ?
                    (
                        submission?.splits?.length > 0 ?
                        <div>
                            <p className="font-semibold text-gray-700 dark:text-gray-300 mb-4 pb-2">Total Score: {submission.score}</p>
                            <div>
                                {splitElements}
                            </div>
                        </div>
                        :
                        <p className="text-gray-700 dark:text-gray-300 mb-4 pb-2">Not graded yet.</p>
                    )
                    :
                    (
                        <p className="text-gray-700 dark:text-gray-300 mb-4 pb-2">No submission found.</p>
                    )
                }
        </div>
    )
}