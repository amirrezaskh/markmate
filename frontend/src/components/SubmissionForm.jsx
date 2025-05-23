import { useState } from "react";
import { useAssignment } from "../hooks";
import { useParams } from "react-router";

export default function SubmissionForm() {
    const { id } = useParams();
    const [file, setFile] = useState(null);

    async function handleSubmit(e) {
        e.preventDefault();
        let formData = new FormData();
        formData.append("file", file);
        formData.append("assignment", id);
        await fetch("http://localhost:8000/users/submission/", {
            method: "POST",
            headers: {
                "Authorization": `Token ${JSON.parse(sessionStorage.getItem("userInfo")).token}`
            },
            body: formData
        });
        setFile(null);
    }
    return (
        <div>
            <h2 className="flex flex-row justify-between mb-4 border-b border-gray-300 dark:border-gray-700 pb-2 text-2xl font-bold">
                New Submission
            </h2>
            <form onSubmit={handleSubmit} className="flex items-center justify-between space-x-4">
                <div className="flex flex-col">
                    <label
                        htmlFor="file"
                        className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                        Upload your solution
                    </label>
                    <input
                        id="file"
                        type="file"
                        onChange={(e) => setFile(e.target.files[0])}
                        required
                        className="px-4 w-50 flex-1 block text-sm text-gray-900 dark:text-gray-300 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-sky-500"
                    />
                </div>
                
                <button
                    type="submit"
                    className="py-2 px-4 bg-sky-600 hover:bg-sky-700 text-white font-semibold rounded-lg transition shadow-sm cursor-pointer"
                >
                    Upload
                </button>
            </form>
        </div>
    )
}