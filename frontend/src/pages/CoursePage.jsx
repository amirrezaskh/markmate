import { useEffect, useReducer, useState } from "react";
import { AssignmentForm, Assignments, CourseDetail, NavBar, Footer } from "../components"
import { useParams } from "react-router";
const BASE_URL = import.meta.env.VITE_API_URL;

export default function CoursePage() {
    const [createView, toggleCreateView] = useReducer(createView => !createView, false)
    const [assignments, setAssignments] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        (async () => {
            const response = await fetch(`${BASE_URL}/courses/${id}/assignments/`,{
                method: "GET",
                headers: {
                    "Authorization": `Token ${JSON.parse(sessionStorage.getItem("userInfo")).token}`,
                    "Content-Type": "application/json"
                }
            });
            const data = await response.json();
            setAssignments(data);
        })();
    }, []);

    const userInfo = sessionStorage.getItem("userInfo");
    if (!userInfo) return null;
    const { role } = JSON.parse(userInfo);
    return (
            <div className="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white">
                <NavBar />
                <div className="min-h-screen">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <section className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-lg">
                            {
                                createView ? 
                                <AssignmentForm toggleCreateView={toggleCreateView}/>
                                : 
                                <CourseDetail role={role} toggleCreateView={toggleCreateView} />
                            }
                        </section>
                        <section className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-lg">
                            <Assignments courseAssignments={assignments}/>
                        </section>
                    </div>
                </div>
                <Footer />
            </div>
        );
}