import { useEffect, useReducer } from "react"

export default function SignInForm() {
    const [info, changeInfo] = useReducer(
        (info, e) => ({
            ...info, 
            [e.target.name]: e.target.value
        }),
        {
            email: "",
            password: ""
        }
    );

    function handleSubmit(e) {
        e.preventDefault()
        console.log(info);
    }

    return (
        <div className="h-[calc(100vh-84px)] flex items-center justify-center bg-gray-100 dark:bg-gray-800">
            <form onSubmit={handleSubmit} className="flex flex-col justify-center content-center bg-white dark:bg-gray-900 text-gray-900 dark:text-white p-6 rounded-xl shadow-lg w-full max-w-md mx-4">
                <h2 className="text-xl sm:text-3xl font-extrabold mb-4">
                    Welcome to <span className="text-sky-500">Mark Mate 👨🏻‍🏫</span>
                </h2>
                <label htmlFor="email" className="block mb-1 font-medium">
                    Email:
                </label>
                <input 
                    className="w-full px-4 py-2 mb-3 bg-gray-200 dark:bg-gray-800 border-2 border-sky-500 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500" 
                    type="email" 
                    value={info.email}
                    onChange={changeInfo}
                    name="email" 
                    id="email" 
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