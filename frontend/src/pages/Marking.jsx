import { useNavigate } from "react-router";
import { NavBar, Footer, Assignments, MarkDetail, Submissions } from "../components";
import { useEffect, useState } from "react";
import { useAssignment } from "../hooks";

export default function Marking() {
    const { assignments } = useAssignment();
    const [currentAssignmentId, setCurrentAssignmentId] = useState(assignments[0].id);

    const loggedIn = (sessionStorage.getItem("userInfo") !== null)
    const navigate = useNavigate();

    useEffect(() => {
        if (!loggedIn) {
            navigate("/login")
        }
    }, [navigate, loggedIn])

    const userInfo = sessionStorage.getItem("userInfo");
    if (!userInfo) return null;
    const { role } = JSON.parse(userInfo);

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
                        {role === "instructor" ?
                            <Submissions 
                                currentAssignmentId={currentAssignmentId}
                                markingMode={true}
                            />
                        :
                            <MarkDetail 
                                currentAssignmentId={currentAssignmentId}
                            />
                        }        
                    </section>
                </div>
            </div>
            <Footer />
        </div>
    );
}