import getTheme from "../theme/theme"
import { createContext, useContext, useMemo, useState } from "react";
export const ThemeContext = createContext();

export const UseTheme = () => useContext(ThemeContext);

export const ThemeContextProvider = ({children}) => {
    const [mode, setMode] = useState(
        localStorage.getItem("mode") || "dark"
    );

    const toggleMode = () => {
        setMode((prev) => {
            const newMode = prev === "light" ? "dark" : "light";
            localStorage.setItem("mode", newMode);
            return newMode;
        })
    }

    const theme = useMemo(() => getTheme(mode), [mode]);
    return (
        <ThemeContext.Provider value={{mode, toggleMode, theme}}>
            {children}
        </ThemeContext.Provider>
    )
}
