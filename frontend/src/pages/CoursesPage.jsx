import { useNavigate } from "react-router";
import { NavBar, Courses, CourseForm, CourseDetail, Footer } from "../components";
import { useEffect, useReducer, useState } from "react";
import { useCourse } from "../hooks";

export default function CoursesPage() {
    const {courses, loadCourses} = useCourse();
    const [currentCourseId, setCurrentCourseId] = useState(0);
    const [newCourseView, setNewCourseView] = useState(false);
    const loggedIn = (sessionStorage.getItem("userInfo") !== null)
    const navigate = useNavigate();
    
    function toggleNewCourseView() {
        setNewCourseView(newCourseView => !newCourseView);
    }

    useEffect(() => {
        (async () => {
            await loadCourses();
        })();
    }, [courses]);

    useEffect(() => {
        if (!loggedIn) {
            navigate("/login");
        }
    }, [loggedIn, navigate])

    const userInfo = sessionStorage.getItem("userInfo");
    if (!userInfo) return null;
    const { role } = JSON.parse(userInfo);

    return (
        <div className="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white">
            <NavBar />
            <div className="min-h-screen">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <section className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-lg">
                        <Courses  
                            currentCourseId={currentCourseId} 
                            setCurrentCourseId={setCurrentCourseId}
                            setNewCourseView={setNewCourseView}
                        />
                    </section>
                    {newCourseView ? 
                        <section className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-lg">
                            <CourseForm />
                        </section>
                        :
                        <section className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-lg">
                            <CourseDetail 
                                currentCourseId={currentCourseId} 
                                role={role} 
                                toggleCreateView={toggleNewCourseView}
                                openCourseView={true}
                            />
                        </section>
                    }
                </div>
            </div>
            <Footer />
        </div>
    );
}