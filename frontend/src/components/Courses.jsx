import { useEffect, useState } from "react"
import { useCourse } from "../hooks";

export default function Courses({courses, currentCourseId, setCurrentCourseId}){
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
            <h2 className="text-2xl font-bold mb-4 border-b border-gray-300 dark:border-gray-700 pb-2">Courses</h2>
            {courses.length === 0 ? (
                <p className="text-gray-500 dark:text-gray-400">No courses found.</p>
            ) : (
                <ul className="space-y-3">
                    {courses.map((course, i) => (
                        <li
                            key={i}
                            onClick={() => setCurrentCourseId(i)}
                            className="p-4 rounded-md bg-sky-100 dark:bg-sky-700 hover:bg-sky-200 dark:hover:bg-sky-800 transition shadow-sm"
                        >
                            <h3 className="text-lg font-medium">{course.title}</h3>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}