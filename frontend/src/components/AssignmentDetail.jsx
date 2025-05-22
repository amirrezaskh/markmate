import { useAssignment } from "../hooks";

export default function AssignmentDetail({ currentAssignmentId }) {
    const { assignments } = useAssignment(); 
    const assignment = assignments[currentAssignmentId];
    if (!assignment) return <p className="text-gray-500">No course selected.</p>;
    const deadline = new Date(assignment.deadline);

    return (
        <div>
            <div className="flex flex-row justify-between mb-4 border-b border-gray-300 dark:border-gray-700 pb-2">
                <h2 className="text-2xl font-bold ">{assignment.title}</h2>
            </div>
            <p className="text-gray-700 dark:text-gray-300 mb-4 border-b border-gray-300 dark:border-gray-700 pb-2">{assignment.description}</p>
            <p className="font-semibold">Deadline: {deadline.toDateString()}</p>
        </div>
    )
}