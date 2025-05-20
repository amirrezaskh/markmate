import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "../hooks";

export default function NavBar() {
  const loggedIn = sessionStorage.getItem("userInfo") !== null;
  const { darkMode, toggleMode } = useTheme();
  const navigate = useNavigate();

  function handleLogOut() {
    sessionStorage.removeItem("userInfo");
    navigate("/");
  }

  const navLinkStyle = "text-sm sm:text-base font-medium hover:text-sky-600 hover:scale-105 transition-transform px-2";

  return (
    <nav className="bg-white dark:bg-gray-900 text-gray-800 dark:text-white border-b-2 border-sky-600 shadow-md">
      <div className="max-w-screen-xl mx-auto flex items-center justify-between px-4 sm:px-8 py-3">
        
        <Link to={loggedIn ? "/dashboard" : "/"} className="text-xl sm:text-2xl font-bold text-sky-600 dark:text-sky-400">
          Mark Mate
        </Link>

        <div className="hidden md:flex gap-4">
          <Link to="/about" className={navLinkStyle}>About</Link>
          <Link to="/courses" className={navLinkStyle}>Courses</Link>
          <Link to="/assignments" className={navLinkStyle}>Assignments</Link>
          <Link to="/marking" className={navLinkStyle}>Marking</Link>
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          {loggedIn ? (
            <button 
              onClick={handleLogOut}
              className="text-sm sm:text-base bg-sky-600 hover:bg-sky-700 text-white px-3 py-1 rounded-md transition"
            >
              Log out
            </button>
          ) : (
            <>
              <Link to="/signup" className="text-sm sm:text-base bg-sky-600 hover:bg-sky-700 text-white px-3 py-1 rounded-md transition">
                Sign Up
              </Link>
              <Link to="/login" className="text-sm sm:text-base border border-sky-600 text-sky-600 hover:bg-sky-100 dark:hover:bg-sky-900 px-3 py-1 rounded-md transition">
                Log In
              </Link>
            </>
          )}

          <button 
            onClick={toggleMode} 
            className="w-9 h-9 flex items-center justify-center text-lg border-2 border-sky-600 rounded-full hover:bg-sky-100 dark:hover:bg-sky-800 transition"
            aria-label="Toggle dark mode"
          >
            {darkMode ? "☀️" : "🌙"}
          </button>
        </div>
      </div>
    </nav>
  );
}
