import { useNavigate } from "react-router";
import { NavBar, Footer, Assignments, MarkDetail } from "../components";
import { useEffect, useState } from "react";

export default function Marking() {
    const [currentAssignmentId, setCurrentAssignmentId] = useState(0);

    const loggedIn = (sessionStorage.getItem("userInfo") !== null)
    const navigate = useNavigate();

    useEffect(() => {
        if (!loggedIn) {
            navigate("/login")
        }
    }, [navigate, loggedIn])
    return (
        <div>
            <NavBar />
            <div className="min-h-screen bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <section className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-lg">
                        <Assignments 
                            setCurrentAssignmentId={setCurrentAssignmentId}
                        />
                    </section>
                    <section className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-lg">
                        <MarkDetail 
                            currentAssignmentId={currentAssignmentId}
                        />
                    </section>
                </div>
            </div>
            <Footer />
        </div>
    );
}