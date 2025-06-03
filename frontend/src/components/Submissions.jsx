import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

export default function Submissions({currentAssignmentId, markingMode=false}) {
    const [submissions, setSubmissions] = useState([]);
    const { id } = useParams();
    const navigate = useNavigate();
    const assignmentId = currentAssignmentId !== null ? currentAssignmentId : id
    const submissionsElements = submissions.map((submission, i) => (
        <li
            key={i}
            className="p-4 rounded-md bg-sky-100 dark:bg-sky-700 hover:bg-sky-200 dark:hover:bg-sky-800 transition shadow-sm cursor-pointer"
            onClick={() => handleClick(i)}
        >
            <h3 className="text-lg font-medium">Submission #{submission.id}</h3>
            
        </li>
    ));
    useEffect(() => {
            (async () => {
                const response = await fetch(`http://localhost:8000/assignments/${assignmentId}/submissions/`,{
                    method: "GET",
                    headers: {
                        "Authorization": `Token ${JSON.parse(sessionStorage.getItem("userInfo")).token}`,
                        "Content-Type": "application/json"
                    }
                });
                const data = await response.json()
                setSubmissions(data);
            })();
        }, [assignmentId]);

    function handleClick(i) {
        if (markingMode) {
            navigate(`/submission/${submissions[i].id}/`)
        }
    }
    return (
        <div>
            {
                markingMode ? 
                <h2 className="flex flex-row justify-between mb-4 border-b border-gray-300 dark:border-gray-700 pb-2 text-2xl font-bold">
                    Marking Submissions
                </h2>
                :
                <h2 className="flex flex-row justify-between mb-4 border-b border-gray-300 dark:border-gray-700 pb-2 text-2xl font-bold">
                    Submissions
                </h2>
            }
            
            <ul className="space-y-3">
                {submissions.length === 0 ? (
                    <p className="text-gray-500 dark:text-gray-400">No submissions found.</p>
                ) : (
                    <ul className="space-y-3">
                        {submissionsElements}
                    </ul>
                )}
            </ul>
        </div>
    )
}