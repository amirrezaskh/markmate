import { useState } from "react"
import { AssignmentContext } from "../contexts";
const BASE_URL = import.meta.env.VITE_BACKEND_URL;

export default function AssignmentProvider({children}) {
    const [assignments, setAssignments] = useState([]);
    
    async function loadAssignments() {
        const response = await fetch(`${BASE_URL}/users/assignments/`,{
            method: "GET",
            headers: {
                "Authorization": `Token ${JSON.parse(sessionStorage.getItem("userInfo")).token}`,
                "Content-Type": "application/json"
            }
        });
        const data = await response.json()
        setAssignments(data);
    }

    function addAssignment(assignment) {
        setAssignments({
            ...assignments,
            assignment
        })
    }

    function removeAssignment(assignment) {
        setAssignments(assignments => assignments.filter(eachAssignment => eachAssignment.id !== assignment.id))
    }

    return (
        <AssignmentContext.Provider value={{assignments, loadAssignments, addAssignment, removeAssignment}}>
            {children}
        </AssignmentContext.Provider>
    )
}