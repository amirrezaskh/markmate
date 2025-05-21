export default function CourseDetail({courses, currentCourseId,}) {
    const course = courses[currentCourseId];
    if (!course) return <p className="text-gray-500">No course selected.</p>;

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4 border-b border-gray-300 dark:border-gray-700 pb-2">{course.title}</h2>
            <p className="text-gray-700 dark:text-gray-300">{course.description}</p>
        </div>
    )
}