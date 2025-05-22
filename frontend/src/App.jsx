import { Dashboard, Home, Login, SignUp, CoursesPage, AssignmentsPage, About, Marking, CoursePage } from "./pages";
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider, CourseProvider } from "./providers";
import "./App.css";

function App() {
  return (
    <div>
      <ThemeProvider>
        <CourseProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/dashboard" element={<Dashboard />}/>
            <Route path="/courses" element={<CoursesPage />}/>
            <Route path="/assignments" element={<AssignmentsPage />}/>
            <Route path="/about" element={<About />}/>
            <Route path="/marking" element={<Marking />}/>
            <Route path="/course/:id" element={<CoursePage />}/>
          </Routes>
        </CourseProvider>
      </ThemeProvider>
    </div>
  );
}

export default App;
