import { useEffect, useState } from "react"
import { useCourse } from "../hooks";

export default function Courses(){
    const {courses, loadCourses} = useCourse();

    useEffect(() => {
        (async () => {
            if (courses.length === 0) {
                await loadCourses();
            }
        })();
    }, [courses]);

    const coursesElements = courses.map((course, i) => (
        <li
            key={i}
            className="p-4 rounded-lg bg-sky-100 dark:bg-sky-600 hover:bg-sky-200 dark:hover:bg-sky-800 transition cursor-pointer shadow-sm"
        >
            {course.title}
        </li>
    ));

    return (
        <div className=" flex flex-col">
            <h2 className="text-2xl font-semibold my-4">
                Courses:
            </h2>
            {courses.length === 0 ?
                <p className="text-gray-500 dark:text-gray-400">No courses found.</p>
                :
                <ul className="space-y-2">
                    {coursesElements}
                </ul>
            }
        </div>
    )
}