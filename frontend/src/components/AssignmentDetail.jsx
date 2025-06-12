import { Link, useParams } from "react-router";
import { useAssignment } from "../hooks";
const BASE_URL = import.meta.env.VITE_BACKEND_URL;

export default function AssignmentDetail({ currentAssignmentId=null, openAssignmentView=false}) {
    const { assignments } = useAssignment(); 
    const { id } = useParams();
    const assignment = currentAssignmentId !== null ? assignments.find(eachAssignment => eachAssignment.id == currentAssignmentId) : assignments.find(eachAssignment => eachAssignment.id == id);
    if (!assignment) return <p className="text-gray-500">No assignment selected.</p>;
    const deadline = new Date(assignment.deadline);

    return (
        <div>
            <div className="flex flex-row justify-between mb-4 border-b border-gray-300 dark:border-gray-700 pb-2">
                <h2 className="text-2xl font-bold ">{assignment.title}</h2>
            </div>
            <p className="text-gray-700 dark:text-gray-300 mb-4 border-b border-gray-300 dark:border-gray-700 pb-2 whitespace-pre-wrap">{assignment.description}</p>
            <div className="flex flex-row justify-between">
                <div className="flex flex-col space-y-2">
                    <p className="font-semibold">Deadline: {deadline.toDateString()}</p>
                {
                    openAssignmentView ?
                    <Link to={`/assignment/${assignment.id}`} className="text-sky-600 font-semibold hover:underline">
                        Open Assignment
                    </Link>
                    :
                    null
                }
                </div>
                
                <div className="mb-4 space-y-2">
                    {assignment.assignment_file && (
                        <a
                            href={`${BASE_URL}${assignment.assignment_file}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sky-600 font-semibold hover:underline block"
                        >
                            Assignment File
                        </a>
                    )}
                    {assignment.public_test_file && (
                        <a
                            href={`${BASE_URL}${assignment.public_test_file}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sky-600 font-semibold hover:underline block"
                        >
                            Test File
                        </a>
                    )}
                </div>
            </div>
        </div>
    )
}