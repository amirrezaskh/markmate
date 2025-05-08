export default function NavBar() {
  const loggedIn = false;

  const navLinkStyle = "hover:text-gray-300 hover:scale-105 transform transition duration-200 px-2"
  return (
    <nav className="shadow-xl flex flex-row justify-between px-30 py-4 bg-white text-gray-900 dark:bg-gray-900 dark:text-white">
      <div className="flex flex-row">
        <a href="#" className="text-xl font-bold px-5"> Mark Mate </a>
        {loggedIn ? (
          <a href="#profile" className={navLinkStyle}>Profile</a>
        ) : (
          <div className="flex flex-row justify-between">
            <a href="#signup" className="py-1 px-2 bg-sky-500 rounded-md text-white hover:bg-sky-700 transition">Sign Up</a>
            <a href="#login" className="py-1 mx-2 px-2 border-sky-500 border rounded-md text-sky-500 hover:bg-gray-700 transition">Log In</a>
          </div>
        )}
      </div>
      
      <div className="flex flex-row justify-end">
        <a href="#about" className={navLinkStyle}>About</a>
        <a href="#classes" className={navLinkStyle}>Classes</a>
        <a href="#assignments" className={navLinkStyle}>Assignments</a>
        <a href="#marking" className={navLinkStyle}>Marking</a>
      </div>
    </nav>
  )
}