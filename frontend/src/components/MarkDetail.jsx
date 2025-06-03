import { useEffect, useState } from "react";
import { useAssignment } from "../hooks"

export default function MarkDetail({ currentAssignmentId }) {
    const { assignments } = useAssignment();
    const assignment = assignments.find(eachAssignment => eachAssignment.id == currentAssignmentId);
    const [submission, setSubmission] = useState({})

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
                console.log(submission)
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
                        <div>
                            <p className="font-semibold text-gray-700 dark:text-gray-300 mb-4 pb-2">Score: {submission.score}</p>
                            <p className="font-semibold text-sky-600 pb-2">Reasoning:</p>
                            {
                                submission.reasoning === null ?
                                <p className="text-gray-700 dark:text-gray-300 mb-4 pb-2">Not graded.</p>
                                :
                                <p className="text-gray-700 dark:text-gray-300 mb-4 pb-2">{submission.reasoning}</p>
                            }
                            
                        </div>
                    )
                    :
                    (
                        <p className="text-gray-700 dark:text-gray-300 mb-4 pb-2">No submission found.</p>
                    )
                }
        </div>
    )
}