import { useNavigate } from "react-router";
import { AssignmentDetail, AssignmentForm, Assignments, NavBar } from "../components";
import { useEffect, useState } from "react";
import { useAssignment } from "../hooks";

export default function AssignmentsPage() {
    const {assignments, loadAssignments} = useAssignment();
    const [currentAssignmentId, setCurrentAssignmentId] = useState(0);

    const loggedIn = (sessionStorage.getItem("userInfo") !== null)
    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            await loadAssignments();
        })();
    }, [assignments]);

    useEffect(() => {
        if (!loggedIn) {
            navigate("/login")
        }
    }, [loggedIn, navigate])

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white">
            <NavBar />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 grid grid-cols-1 lg:grid-cols-2 gap-8">
                <section className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-lg">
                    <Assignments 
                        setCurrentAssignmentId={setCurrentAssignmentId}
                    />
                </section>
                <section className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-lg">
                    <AssignmentDetail
                        currentAssignmentId={currentAssignmentId}
                        openAssignmentView={true}
                    />
                </section>
            </div>
        </div>
    );
}