import { useReducer, useState } from "react"
import { useCourse } from "../hooks";

export default function CourseForm() {
    const {courses, addCourse} = useCourse()
    const [course, changeCourse] = useReducer(
        (course, e) => ({
            ...course,
            [e.target.name]: e.target.value
        }),
        {
            title: "",
            description: ""
        }
    );

    async function handleSubmit(e) {
        e.preventDefault();
        console.log(course);
    }
    return (
        <div className="w-full max-w-md mx-auto">
            <h2 className="text-2xl font-bold mb-4 border-b border-gray-300 dark:border-gray-700 pb-2">Create New Course</h2>
            <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                    <label htmlFor="title" className="block mb-1 font-medium">Title</label>
                    <input 
                        className="w-full px-4 py-2 bg-gray-200 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500" 
                        type="text" 
                        value={course.title}
                        onChange={changeCourse}
                        name="title" 
                        id="title" 
                    />
                </div>

                <div>
                    <label htmlFor="description" className="block mb-1 font-medium">Description</label>
                    <textarea 
                        className="h-50 w-full px-4 py-2 bg-gray-200 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500" 
                        type="text" 
                        value={course.description}
                        onChange={changeCourse}
                        name="description" 
                        id="description" 
                    />
                </div>

                <button 
                    type="submit"
                    className="w-full py-2 bg-sky-600 hover:bg-sky-700 text-white rounded-md font-semibold transition"
                >
                    Submit
                </button>
            </form>
        </div>

    )
}