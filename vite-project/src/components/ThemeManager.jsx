import { createContext, useContext, useState } from "react";

export const ThemeContext = createContext("light");

function ThemeButton() {
  const { theme, setTheme } = useContext(ThemeContext);

  return (
    <button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
      Switch to {theme === "light" ? "dark" : "light"} mode
    </button>
  );
}

function ThemeManager() {
  const [theme, setTheme] = useState("light");

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <div className={theme}>
        <p>Current theme: {theme}</p>
        <ThemeButton />
      </div>
    </ThemeContext.Provider>
  );
}

export default ThemeManager;