export default function AssignmentDetail({assignments, currentAssignmentId, role, toggleNewAssignmentView}) {
    const assignment = assignments[currentAssignmentId];
    if (!assignment) return <p className="text-gray-500">No course selected.</p>;

    return (
        <div>
            <div className="flex flex-row justify-between mb-4 border-b border-gray-300 dark:border-gray-700 pb-2">
                <h2 className="text-2xl font-bold ">{assignment.title}</h2>
                {role === "instructor" ? 
                    <button onClick={toggleNewAssignmentView} className="text-sm sm:text-base bg-sky-600 hover:bg-sky-700 text-white px-3 py-1 rounded-md transition cursor-pointer ">
                        Create
                    </button>
                :
                    null
                }
            </div>
            <p className="text-gray-700 dark:text-gray-300">{assignment.description}</p>
        </div>
    )
}