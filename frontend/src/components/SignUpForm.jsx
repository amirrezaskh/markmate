import { useReducer } from "react";
import { useNavigate } from "react-router";
const BASE_URL = import.meta.env.VITE_BACKEND_URL;

export default function SignUpForm() {
    const [info, changeInfo] = useReducer(
        (info, e) => ({
            ...info,
            [e.target.name]: e.target.value
        }), {
            username: "",
            role: "student",
            email: "",
            firstName: "",
            lastName: "",
            password: "",
            confirmPassword: ""
        }
    );
    const [tryMessage, toggleTryMessage] = useReducer(tryMessage => !tryMessage, false);
    const navigate = useNavigate();

    async function submitForm(e) {
        e.preventDefault();
        const data = {
            first_name: info.firstName,
            last_name: info.lastName,
            email: info.email,
            username: info.username,
            role: info.role,
            password: info.password
        }
        const response = await fetch(`${BASE_URL}/users/`,{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        if (response.status === 201) {
            navigate("/login");
        } else {
            toggleTryMessage();
        }
    }
    return (
        <div className="min-h-[calc(100vh-77px)] flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-800">
            {tryMessage && 
                <p className="mb-4 p-3 text-sm text-red-500 bg-red-500/10 border border-red-500 rounded-md text-center">
                    Please try again!
                </p>
            }
            <form onSubmit={submitForm} className="grid grid-cols-2 md:grid-cols-2 gap-4 justify-center content-center bg-white dark:bg-gray-900 text-gray-900 dark:text-white p-6 rounded-xl shadow-lg w-full max-w-md mx-4">
                <div className="flex flex-col">
                    <label htmlFor="firstName" className="block mb-1 font-medium">
                    First Name:
                    </label>
                    <input 
                        className="w-full px-4 py-2 bg-gray-200 dark:bg-gray-800 border-2 border-sky-500 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500" 
                        type="firstName" 
                        value={info.firstName}
                        onChange={changeInfo}
                        name="firstName" 
                        id="firstName" 
                    />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="lastName" className="block mb-1 font-medium col-span-2">
                        Last Name:
                    </label>
                    <input 
                        className="w-full px-4 py-2 bg-gray-200 dark:bg-gray-800 border-2 border-sky-500 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500 col-span-2" 
                        type="lastName" 
                        value={info.lastName}
                        onChange={changeInfo}
                        name="lastName" 
                        id="lastName" 
                    />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="username" className="block mb-1 font-medium col-span-2">
                        Username:
                    </label>
                    <input 
                        className="w-full px-4 py-2 bg-gray-200 dark:bg-gray-800 border-2 border-sky-500 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500 col-span-2" 
                        type="text" 
                        value={info.username}
                        onChange={changeInfo}
                        name="username" 
                        id="username" 
                    />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="role" className="block mb-1 font-medium col-span-2">
                        Role:
                    </label>
                    <div className="flex flex-row gap-2">
                        <label className="flex items-center gap-2">
                        <input
                            type="radio"
                            name="role"
                            value="instructor"
                            checked={info.role === "instructor"}
                            onChange={changeInfo}
                            className="accent-sky-600"
                        />
                        Instructor
                        </label>
                        <label className="flex items-center gap-2">
                        <input
                            type="radio"
                            name="role"
                            value="student"
                            checked={info.role === "student"}
                            onChange={changeInfo}
                            className="accent-sky-600"
                        />
                        Student
                        </label>
                    </div>
                </div>
                <div className="flex flex-col col-span-2">
                    <label htmlFor="email" className="block mb-1 font-medium col-span-full">
                        Email:
                    </label>
                    <input 
                        className="w-full px-4 py-2 bg-gray-200 dark:bg-gray-800 border-2 border-sky-500 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500" 
                        type="email" 
                        value={info.email}
                        onChange={changeInfo}
                        name="email" 
                        id="email" 
                    />
                </div>
                <div className="flex flex-col col-span-2">
                    <label htmlFor="password" className="block mb-1 font-medium">
                        Password:
                    </label>
                    <input 
                        className="w-full px-4 py-2 bg-gray-200 dark:bg-gray-800 border-2 border-sky-500 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
                        type="password"
                        value={info.password}
                        onChange={changeInfo} 
                        name="password" 
                        id="password" 
                    />
                </div>
                <div className="flex flex-col col-span-2">
                    <label htmlFor="confirmPassword" className="block mb-1 font-medium">
                        Confirm Password:
                    </label>
                    <input 
                        className="col-span-2 w-full px-4 py-2 mb-2 bg-gray-200 dark:bg-gray-800 border-2 border-sky-500 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
                        type="password"
                        value={info.confirmPassword}
                        onChange={changeInfo} 
                        name="confirmPassword" 
                        id="confirmPassword" 
                    />
                </div>
                <button 
                    type="submit"
                    className="col-span-2 w-full py-2 bg-sky-600 hover:bg-sky-700 text-white rounded-md font-semibold transition"
                >
                    Sign up
                </button>
            </form>
        </div>
    )    
}