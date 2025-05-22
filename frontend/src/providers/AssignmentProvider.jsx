import { useState } from "react"
import { AssignmentContext } from "../contexts";

export default function AssignmentProvider({children}) {
    const [assignments, setAssignments] = useState([]);
    
    async function loadAssignments() {
        const response = await fetch("http://localhost:8000/users/assignments/",{
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