import { Home, Login, SignUp } from "./pages";
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
        </Routes>
      </ThemeProvider>
    </div>
  );
}

export default App;
