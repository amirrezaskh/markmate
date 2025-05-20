import { useNavigate } from "react-router";
import { NavBar, Main } from "../components"
import { useEffect } from "react";

export default function Dashboard() {
    const loggedIn = (sessionStorage.getItem("userInfo") !== null)
    const navigate = useNavigate()

    useEffect(() => {
        if (!loggedIn) {
            navigate("/login");
        }
    }, [loggedIn, navigate])
    return (
        <div>
            <NavBar />
            <Main />
        </div>
    )
}