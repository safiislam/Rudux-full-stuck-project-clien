// import { useEffect, useState } from "react";

// const useThemeDetector = (): boolean => {
//     const getCurrentTheme = (): boolean => window.matchMedia("(prefers-color-scheme: dark)").matches;
//     const [isDarkTheme, setIsDarkTheme] = useState<boolean>(getCurrentTheme());

//     useEffect(() => {
//         const darkThemeMq = window.matchMedia("(prefers-color-scheme: dark)");
//         const mqListener = (e: MediaQueryListEvent) => setIsDarkTheme(e.matches);
//         darkThemeMq.addEventListener("change", mqListener);
//         return () => darkThemeMq.removeEventListener("change", mqListener);
//     }, []);

//     useEffect(() => {
//         const savedTheme = localStorage.getItem("theme");
//         if (savedTheme) {
//             setIsDarkTheme(savedTheme === "dark");
//         } else {
//             localStorage.setItem("theme", isDarkTheme ? "dark" : "light");
//         }
//     }, [isDarkTheme]);

//     useEffect(() => {
//         document.body.classList.toggle("dark", isDarkTheme);
//         localStorage.setItem("theme", isDarkTheme ? "dark" : "light");
//     }, [isDarkTheme]);

//     return isDarkTheme;
// };

// export default useThemeDetector;
