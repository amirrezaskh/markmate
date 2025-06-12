import { useReducer } from "react";
import { useParams } from "react-router";
import { useAssignment } from "../hooks";
const BASE_URL = import.meta.env.BACKEND_URL;

export default function AssignmentForm({toggleCreateView}) {
    const { loadAssignments } = useAssignment();
    const [files, addFile] = useReducer(
        (files, e) => ({
            ...files,
            [e.target.name]: e.target.files[0]
        }),
        {
            assignment_file: null,
            submission_file: null,
            public_test_file: null,
            private_test_file: null
        }
    )
    const [assignment, changeAssignment] = useReducer(
        (assignment, e) => ({
            ...assignment,
            [e.target.name]: e.target.value
        }),
        {
            title: "",
            description: "",
            rubric: "",
            deadline: ""
        }
    );
    const { id } = useParams();

    async function handleSubmit(e) {
        e.preventDefault();
        let formData = new FormData();
        formData.append("title", assignment.title);
        formData.append("description", assignment.description);
        formData.append("rubric", assignment.rubric);
        formData.append("course", id);
        formData.append("deadline", new Date(assignment.deadline).toISOString());
        if (files.assignment_file) {
            formData.append("assignment_file", files.assignment_file);
        }
        if (files.submission_file) {
            formData.append("submission_file", files.submission_file);
        }
        if (files.public_test_file) {
            formData.append("public_test_file", files.public_test_file);
        }
        if (files.private_test_file) {
            formData.append("private_test_file", files.private_test_file);
        }

        await fetch(`${BASE_URL}/assignments/`, {
            method: "POST",
            headers: {
                "Authorization": `Token ${JSON.parse(sessionStorage.getItem("userInfo")).token}`
            },
            body: formData
        });

        await loadAssignments();

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
                        onChange={changeAssignment}
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
                        onChange={changeAssignment}
                        name="description" 
                        id="description" 
                    />
                </div>
                <div>
                    <label htmlFor="rubric" className="block mb-1 font-medium">Rubric</label>
                    <textarea
                        placeholder="[{
    problem: str
    criterion: str
    max_score: int
    description: str
}]" 
                        className="h-50 w-full px-4 py-2 bg-gray-200 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500" 
                        type="text" 
                        value={assignment.rubric}
                        onChange={changeAssignment}
                        name="rubric" 
                        id="rubric" 
                    />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label
                        htmlFor="assignment_file"
                        className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
                        >
                        Assignment File
                        </label>
                        <input
                        id="assignment_file"
                        name="assignment_file"
                        type="file"
                        onChange={addFile}
                        className="block w-full text-sm text-gray-900 dark:text-gray-300 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-sky-600 file:text-white hover:file:bg-sky-700 cursor-pointer"
                        />
                    </div>
                    <div>
                        <label
                        htmlFor="submission_file"
                        className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
                        >
                        Submission File
                        </label>
                        <input
                        id="submission_file"
                        name="submission_file"
                        type="file"
                        onChange={addFile}
                        className="block w-full text-sm text-gray-900 dark:text-gray-300 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-sky-600 file:text-white hover:file:bg-sky-700 cursor-pointer"
                        />
                    </div>
                    <div>
                        <label
                        htmlFor="public_test_file"
                        className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
                        >
                        Public Test File
                        </label>
                        <input
                        id="public_test_file"
                        name="public_test_file"
                        type="file"
                        onChange={addFile}
                        className="block w-full text-sm text-gray-900 dark:text-gray-300 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-sky-600 file:text-white hover:file:bg-sky-700 cursor-pointer"
                        />
                    </div>
                    <div>
                        <label
                        htmlFor="private_test_file"
                        className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
                        >
                        Private Test File
                        </label>
                        <input
                        id="private_test_file"
                        name="private_test_file"
                        type="file"
                        onChange={addFile}
                        className="block w-full text-sm text-gray-900 dark:text-gray-300 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-sky-600 file:text-white hover:file:bg-sky-700 cursor-pointer"
                        />
                    </div>
                </div>
                <div>
                    <label htmlFor="deadline" className="block mb-1 font-medium">
                        Deadline
                    </label>
                    <input
                        type="datetime-local"
                        name="deadline"
                        id="deadline"
                        value={assignment.deadline}
                        onChange={changeAssignment}
                        className="w-full px-4 py-2 bg-gray-200 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
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