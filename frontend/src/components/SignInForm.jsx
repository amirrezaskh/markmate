import { useEffect, useReducer } from "react"
import { useNavigate } from "react-router";

export default function SignInForm() {
    const [info, changeInfo] = useReducer(
        (info, e) => ({
            ...info, 
            [e.target.name]: e.target.value
        }),
        {
            username: "",
            password: ""
        }
    );

    const navigate = useNavigate();

    const [incorrectMessage, toggleIncorrectMessage] = useReducer(incorrectMessage => !incorrectMessage, false)

    async function handleSubmit(e) {
        e.preventDefault();
        const response = await fetch("http://localhost:8000/login/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(info)
        });
        if (response.status !== 200) {
            toggleIncorrectMessage()
        } else {
            const data = await response.json();
            sessionStorage.setItem("userInfo", data);
            navigate("/dashboard");
        }
    }

    return (
        <div className="h-[calc(100vh-84px)] flex items-center justify-center bg-gray-100 dark:bg-gray-800">
            <form onSubmit={handleSubmit} className="flex flex-col justify-center content-center bg-white dark:bg-gray-900 text-gray-900 dark:text-white p-6 rounded-xl shadow-lg w-full max-w-md mx-4">
                <h2 className="text-xl sm:text-3xl font-extrabold mb-4 text-center">
                    Welcome to <span className="text-sky-500">Mark Mate 👨🏻‍🏫</span>
                </h2>
                {incorrectMessage && 
                    <p className="mb-4 p-3 text-sm text-red-500 bg-red-500/10 border border-red-500 rounded-md text-center">
                        Username or password is incorrect, please try again!
                    </p>
                } 
                <label htmlFor="username" className="block mb-1 font-medium">
                    Username:
                </label>
                <input 
                    className="w-full px-4 py-2 mb-3 bg-gray-200 dark:bg-gray-800 border-2 border-sky-500 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500" 
                    type="text" 
                    value={info.username}
                    onChange={changeInfo}
                    name="username" 
                    id="username" 
                />
                <label htmlFor="password" className="block mb-1 font-medium">
                    Password:
                </label>
                <input 
                    className="w-full px-4 py-2 mb-6 bg-gray-200 dark:bg-gray-800 border-2 border-sky-500 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
                    type="password"
                    value={info.password}
                    onChange={changeInfo} 
                    name="password" 
                    id="password" 
                />
                <button 
                    type="submit"
                    className="w-full py-2 bg-sky-600 hover:bg-sky-700 text-white rounded-md font-semibold transition"
                >
                    Log In
                </button>
            </form>
        </div>
    )
}