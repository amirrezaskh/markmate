import { useNavigate } from "react-router";
import { NavBar, Courses, CourseForm } from "../components";
import { useEffect } from "react";

export default function CoursesPage() {
    const loggedIn = (sessionStorage.getItem("userInfo") !== null)
    const navigate = useNavigate();

    useEffect(() => {
        if (!loggedIn) {
            navigate("/login")
        }
    }, [loggedIn, navigate])
    return (
        <div className="h-[calc(100vh)] bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
            <NavBar />
            <div className=" max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-2 gap-10">
                <Courses />
                <CourseForm />
            </div>
        </div>
    );
}