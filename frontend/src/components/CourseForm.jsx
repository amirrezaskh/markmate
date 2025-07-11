import { useReducer, useState } from "react"
import { useCourse } from "../hooks";
const BASE_URL = import.meta.env.VITE_BACKEND_URL;

export default function CourseForm() {
    const {addCourse} = useCourse()
    const [course, changeCourse] = useReducer((course, e) => {
        if (e === "reset") {
            return {
                title: "",
                description: ""
            };
        }
        return {
            ...course,
            [e.target.name]: e.target.value
        };
    }, {
        title: "",
        description: ""
    });

    async function handleSubmit(e) {
        e.preventDefault();
        const response = await fetch(`${BASE_URL}/users/course/`,{
                method: "POST",
                headers: {
                    "Authorization": `Token ${JSON.parse(sessionStorage.getItem("userInfo")).token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(course)
            });
        if (response.status === 201) {
            changeCourse("reset");
            addCourse(course);
        }
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