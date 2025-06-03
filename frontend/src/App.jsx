import { Dashboard, Home, Login, SignUp, CoursesPage, AssignmentsPage, AboutPage, Marking, CoursePage, AssignmentPage, SubmissionPage } from "./pages";
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider, CourseProvider, AssignmentProvider } from "./providers";
import "./App.css";

function App() {
  return (
    <div>
      <ThemeProvider>
        <CourseProvider>
          <AssignmentProvider>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/dashboard" element={<Dashboard />}/>
              <Route path="/courses" element={<CoursesPage />}/>
              <Route path="/assignments" element={<AssignmentsPage />}/>
              <Route path="/about" element={<AboutPage />}/>
              <Route path="/marking" element={<Marking />}/>
              <Route path="/course/:id/" element={<CoursePage />}/>
              <Route path="/assignment/:id/" element={<AssignmentPage />}/>
              <Route path="/submission/:id/" element={<SubmissionPage />}/>
            </Routes>
          </AssignmentProvider>
        </CourseProvider>
      </ThemeProvider>
    </div>
  );
}

export default App;
