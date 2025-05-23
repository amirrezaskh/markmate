import { useNavigate } from "react-router";
import { NavBar, Footer } from "../components";
import { useEffect } from "react";

export default function Marking() {
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
            <Footer />
        </div>
    );
}