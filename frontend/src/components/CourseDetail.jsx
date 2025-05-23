import { Link, useParams } from "react-router";
import { useCourse } from "../hooks";

export default function CourseDetail({currentCourseId=null, role="student", toggleCreateView=null, openCourseView=false}) {
    const {courses} = useCourse();
    const { id } = useParams();
    let course = currentCourseId !== null ? courses[currentCourseId] : courses.find(item => item.id == id);
    if (!course) return <p className="text-gray-500">No course selected.</p>;

    return (
        <div>
            <div className="flex flex-row justify-between mb-4 border-b border-gray-300 dark:border-gray-700 pb-2">
                <h2 className="text-2xl font-bold ">{course.title}</h2>
                {role === "instructor" ? 
                    <button onClick={toggleCreateView} className="text-sm sm:text-base bg-sky-600 hover:bg-sky-700 text-white px-3 py-1 rounded-md transition cursor-pointer">
                        Create
                    </button>
                :
                    null
                }
            </div>
            <p className="text-gray-700 dark:text-gray-300 mb-4 pb-2">{course.description}</p>
            {
                openCourseView ?
                <Link to={`/course/${course.id}`} className="text-sky-600 hover:scale-105">
                    Open Course
                </Link>
                :
                null
            }
        </div>
    )
}