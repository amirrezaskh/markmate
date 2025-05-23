import { useReducer } from "react";

export default function AssignmentForm({toggleCreateView}) {
    const [assignment, changeassignment] = useReducer(
            (assignment, e) => ({
                ...assignment,
                [e.target.name]: e.target.value
            }),
            {
                title: "",
                description: ""
            }
        );
    
        async function handleSubmit(e) {
            e.preventDefault();
            console.log(assignment);
        }
        return (
            <div className="w-full max-w-md mx-auto">
                <div className="flex flex-row justify-between mb-4 border-b border-gray-300 dark:border-gray-700 pb-2">
                    <h2 className="text-2xl font-bold">Create New assignment</h2>
                    <button onClick={toggleCreateView} className="text-sm sm:text-base bg-sky-600 hover:bg-sky-700 text-white px-3 py-1 rounded-md transition cursor-pointer">
                    Back
                </button>
                </div>                
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label htmlFor="title" className="block mb-1 font-medium">Title</label>
                        <input 
                            className="w-full px-4 py-2 bg-gray-200 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500" 
                            type="text" 
                            value={assignment.title}
                            onChange={changeassignment}
                            name="title" 
                            id="title" 
                        />
                    </div>
    
                    <div>
                        <label htmlFor="description" className="block mb-1 font-medium">Description</label>
                        <textarea 
                            className="h-50 w-full px-4 py-2 bg-gray-200 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500" 
                            type="text" 
                            value={assignment.description}
                            onChange={changeassignment}
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