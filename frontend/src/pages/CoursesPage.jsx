import { useNavigate } from "react-router";
import { NavBar, Courses } from "../components";
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
        <div>
            <NavBar />
            <Courses />
        </div>
    );
}