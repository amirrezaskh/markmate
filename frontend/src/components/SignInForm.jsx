import { useEffect, useReducer } from "react";
import { useNavigate } from "react-router";

export default function SignInForm() {
    const [info, changeInfo] = useReducer(
        (info, e) => ({ ...info, [e.target.name]: e.target.value }),
        { username: "", password: "" }
    );

    const navigate = useNavigate();
    const [incorrectMessage, toggleIncorrectMessage] = useReducer(msg => !msg, false);

    async function handleSubmit(e) {
        e.preventDefault();
        const response = await fetch("http://localhost:8000/login/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(info),
        });
        if (response.status !== 200) {
            toggleIncorrectMessage();
        } else {
            const data = await response.json();
            sessionStorage.setItem("userInfo", JSON.stringify(data));
            navigate("/dashboard");
        }
    }

    return (
        <div className="min-h-[calc(100vh-77px)] flex items-center justify-center bg-gray-100 dark:bg-gray-800 px-4">
            <form 
                onSubmit={handleSubmit} 
                className="w-full max-w-md bg-white dark:bg-gray-900 text-gray-900 dark:text-white p-8 rounded-2xl shadow-2xl space-y-5"
            >
                <h2 className="text-2xl sm:text-3xl font-extrabold text-center">
                    Welcome to <span className="text-sky-500">Mark Mate 👨🏻‍🏫</span>
                </h2>

                {incorrectMessage && (
                    <p 
                        className="text-sm text-red-600 bg-red-100 dark:bg-red-900/30 border border-red-400 dark:border-red-600 rounded-md p-3 text-center animate-shake"
                        role="alert"
                        aria-live="polite"
                    >
                        Username or password is incorrect, please try again!
                    </p>
                )}

                <div className="space-y-2">
                    <label htmlFor="username" className="block font-medium">
                        Username:
                    </label>
                    <input
                        className="w-full px-4 py-2 bg-gray-200 dark:bg-gray-800 border-2 border-sky-500 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500 text-base"
                        type="text"
                        name="username"
                        id="username"
                        value={info.username}
                        onChange={changeInfo}
                        aria-invalid={incorrectMessage}
                    />
                </div>

                <div className="space-y-2">
                    <label htmlFor="password" className="block font-medium">
                        Password:
                    </label>
                    <input
                        className="w-full px-4 py-2 bg-gray-200 dark:bg-gray-800 border-2 border-sky-500 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500 text-base"
                        type="password"
                        name="password"
                        id="password"
                        value={info.password}
                        onChange={changeInfo}
                        aria-invalid={incorrectMessage}
                    />
                </div>

                <button
                    type="submit"
                    className="w-full py-2 mt-2 bg-sky-600 hover:bg-sky-700 text-white rounded-md font-semibold text-base transition"
                >
                    Log In
                </button>
            </form>
        </div>
    );
}
