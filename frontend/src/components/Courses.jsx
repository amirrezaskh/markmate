import { useEffect, useState } from "react"
import { useCourse } from "../hooks";

export default function Courses(){
    const {courses, loadCourses} = useCourse();

    useEffect(() => {
        (async () => {
            await loadCourses();
        })();
    }, []);

    const coursesElements = courses.map((course, i) => (
        <li
            key={i}
            className="p-4 rounded-lg bg-sky-100 dark:bg-sky-600 hover:bg-sky-200 dark:hover:bg-sky-800 transition cursor-pointer shadow-sm"
        >
            {course.title}
        </li>
    ));

    return (
        <div className="h-[calc(100vh-84px)] bg-white dark:bg-gray-800 text-gray-900 dark:text-white flex flex-col px-50">
            <h2 className="text-2xl font-semibold my-4">
                Courses:
            </h2>
            <ul className="space-y-2">
                {coursesElements}
            </ul>
        </div>
    )
}