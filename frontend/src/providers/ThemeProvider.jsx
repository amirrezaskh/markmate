import { useEffect, useReducer } from "react"
import { ThemeContext } from "../contexts";

export default function ThemeProvider({children}) {
    const [darkMode, toggleMode] = useReducer(mode => !mode, true);

    useEffect(() => {
        const root = window.document.documentElement;
        if (darkMode) {
            root.classList.add("dark");
        } else {
            root.classList.remove("dark");
        }
    }, [darkMode]);

    return (
        <ThemeContext.Provider value={{darkMode, toggleMode}}>
            {children}
        </ThemeContext.Provider>
    );
}