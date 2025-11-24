import { useEffect, useState } from "react";

export function useTheme(){
  const [theme, setTheme] = useState<"light" | "dark">(
      () => (localStorage.getItem("theme") as "light" | "dark") || "light"
    );
  
    useEffect(() => {
      const root = document.documentElement;
  
      if (theme === "dark") {
        root.classList.add("dark");
        localStorage.setItem("theme", "dark");
      } else {
        root.classList.remove("dark");
        localStorage.setItem("theme", "light");
      }
    }, [theme]);
    return {theme, setTheme}
}