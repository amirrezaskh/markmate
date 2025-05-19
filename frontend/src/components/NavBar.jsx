import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "../hooks";

export default function NavBar() {
  const loggedIn = (sessionStorage.getItem("userInfo") !== null);
  const { darkMode, toggleMode } = useTheme();
  const navigate = useNavigate()

  const navLinkStyle = "hover:text-sky-600 hover:scale-105 transform transition duration-200 px-2";

  function handleLogOut() {
    sessionStorage.removeItem("loginToken");
    navigate("/");
  }

  return (
    <nav className="shadow-xl border-b-2 border-sky-600 flex flex-row justify-between px-30 py-4 bg-white text-gray-800 dark:bg-gray-900 dark:text-white">
      <div className="flex flex-row">
        <Link to="/" className="text-xl font-bold px-5 text-sky-600 dark:text-sky-400"> Mark Mate </Link>
        {loggedIn ? (
          <div 
            className="py-1 px-2 bg-sky-600 rounded-md text-white hover:bg-sky-700 transition"
            onClick={() => (handleLogOut())}
          >
            Log out
          </div>  
        ) : (
          <div className="flex flex-row justify-between">
            <Link to="/signup" className="py-1 px-2 bg-sky-600 rounded-md text-white hover:bg-sky-700 transition">Sign Up</Link>
            <Link to="/login" className="py-1 mx-2 px-2 border border-sky-600 rounded-md text-sky-600 hover:bg-sky-100 transition">Log In</Link>
          </div>
        )}
      </div>
      
      <div className="flex flex-row justify-end">
        <a href="#about" className={navLinkStyle}>About</a>
        <a href="#classes" className={navLinkStyle}>Classes</a>
        <a href="#assignments" className={navLinkStyle}>Assignments</a>
        <a href="#marking" className={navLinkStyle}>Marking</a>
        <button 
          onClick={toggleMode} 
          className="hover:scale-105 transform transition duration-200 px-2 mx-2 border-2 border-sky-600 rounded-md"
          aria-label="Toggle dark mode"
        >
          {darkMode ? "☀️" : "🌙"}
        </button>
      </div>
    </nav>
  );
}
