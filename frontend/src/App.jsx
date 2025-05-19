import { Dashboard, Home, Login, SignUp, Courses, Assignments, About, Marking } from "./pages";
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from "./providers";
import "./App.css";

function App() {
  return (
    <div>
      <ThemeProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/dashboard" element={<Dashboard />}/>
          <Route path="/courses" element={<Courses />}/>
          <Route path="/assignments" element={<Assignments />}/>
          <Route path="/about" element={<About />}/>
          <Route path="/marking" element={<Marking />}/>
        </Routes>
      </ThemeProvider>
    </div>
  );
}

export default App;
