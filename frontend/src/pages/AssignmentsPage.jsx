import { useNavigate } from "react-router";
import { AssignmentDetail, AssignmentForm, Assignments, NavBar } from "../components";
import { useEffect, useState } from "react";

export default function AssignmentsPage() {
    const [assignments, setAssignments] = useState([]);
    const [newAssignmentView, setNewAssignmentView] = useState(false)
    const [currentAssignmentId, setCurrentAssignmentId] = useState(0)

    function toggleNewAssignmentView() {
        setNewAssignmentView(newAssignmentView => !newAssignmentView);
    }

    const loggedIn = (sessionStorage.getItem("userInfo") !== null)
    const navigate = useNavigate();

    useEffect(() => {
        if (!loggedIn) {
            navigate("/login")
        }
    }, [loggedIn, navigate])

    useEffect(() => { 
        (async () => {
            const response = await fetch("http://localhost:8000/users/assignments/",{
                method: "GET",
                headers: {
                    "Authorization": `Token ${JSON.parse(sessionStorage.getItem("userInfo")).token}`,
                    "Content-Type": "application/json"
                }
            });
            const data = await response.json()
            setAssignments(data); 
        })();
    })

    const userInfo = sessionStorage.getItem("userInfo");
    if (!userInfo) return null;
    const { role } = JSON.parse(userInfo);

    
    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white">
            <NavBar />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 grid grid-cols-1 lg:grid-cols-2 gap-8">
                <section className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-lg">
                    <Assignments 
                        assignments={assignments}
                        currentAssignmentId={currentAssignmentId}
                        setCurrentAssignmentId={setCurrentAssignmentId}
                        setNewAssignmentView={setNewAssignmentView}
                    />
                </section>
                    { 
                        newAssignmentView ?
                        <section className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-lg">
                            <AssignmentForm />
                        </section>
                        :
                        <section className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-lg">
                            <AssignmentDetail 
                                assignments={assignments}
                                currentAssignmentId={currentAssignmentId}
                                role={role}
                                toggleNewAssignmentView={toggleNewAssignmentView}
                            />
                        </section>
                    }
            </div>
        </div>
    );
}