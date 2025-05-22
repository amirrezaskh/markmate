export default function CourseDetail({courses, currentCourseId, role, toggleNewCourseView}) {
    const course = courses[currentCourseId];
    if (!course) return <p className="text-gray-500">No course selected.</p>;

    return (
        <div>
            <div className="flex flex-row justify-between mb-4 border-b border-gray-300 dark:border-gray-700 pb-2">
                <h2 className="text-2xl font-bold ">{course.title}</h2>
                {role === "instructor" ? 
                    <button onClick={toggleNewCourseView} className="text-sm sm:text-base bg-sky-600 hover:bg-sky-700 text-white px-3 py-1 rounded-md transition cursor-pointer">
                        New Course
                    </button>
                :
                    null
                }
            </div>
            <p className="text-gray-700 dark:text-gray-300">{course.description}</p>
        </div>
    )
}