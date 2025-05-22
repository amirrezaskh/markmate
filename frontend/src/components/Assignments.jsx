import { useAssignment } from "../hooks";

export default function Assignments({courseAssignments=null, setCurrentAssignmentId=null}) {
    let { assignments } = useAssignment();
    assignments = courseAssignments !== null ? courseAssignments : assignments; 
    const assignmentsElements = assignments.map((assignment, i) => (
        <li
            key={i}
            onClick={() => toggleView(i)}
            className="p-4 rounded-md bg-sky-100 dark:bg-sky-700 hover:bg-sky-200 dark:hover:bg-sky-800 transition shadow-sm cursor-pointer"
        >
            <h3 className="text-lg font-medium">
                {assignment.title}
            </h3>

        </li>
    ));

    function toggleView(i) {
        setCurrentAssignmentId(i);
    }
    
    return (
        <div className="flex flex-col">
            <h2 className="text-2xl font-bold mb-4 border-b border-gray-300 dark:border-gray-700 pb-2">
                My Assignments
            </h2>
            {assignments.length === 0 ? (
                <p className="text-gray-500 dark:text-gray-400">No assignments found.</p>
            ) : (
                <ul className="space-y-3">
                    {assignmentsElements}
                </ul>
            )}
        </div>
    )
}