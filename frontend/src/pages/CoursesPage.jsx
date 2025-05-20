import { useNavigate } from "react-router";
import { NavBar, Courses, CourseForm } from "../components";
import { useEffect } from "react";

export default function CoursesPage() {
    const loggedIn = (sessionStorage.getItem("userInfo") !== null)
    const navigate = useNavigate();

    useEffect(() => {
        if (!loggedIn) {
            navigate("/login");
        }
    }, [loggedIn, navigate])
    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white">
            <NavBar />
            <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 grid grid-cols-1 lg:grid-cols-2 gap-8">
                <section className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-lg">
                    <Courses />
                </section>
                {(() => {
                    const userInfo = sessionStorage.getItem("userInfo");
                    if (!userInfo) return null;
                    const { role } = JSON.parse(userInfo);
                    return role === "instructor" ? (
                        <section className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-lg">
                            <CourseForm />
                        </section>
                    ) : null;
                })()}
            </div>
        </div>
    );
}