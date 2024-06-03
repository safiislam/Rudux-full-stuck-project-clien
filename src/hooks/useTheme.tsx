import { useEffect, useState } from 'react';

const useTheme = (): [string, () => void] => {
    const getInitialTheme = (): string => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            return savedTheme;
        }
        const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)").matches;
        return prefersDarkScheme ? 'dark' : 'light';
    };

    const [theme, setTheme] = useState<string>(getInitialTheme());

    useEffect(() => {
        const html = document.documentElement;
        if (theme === 'dark') {
            html.classList.add('dark');
        } else {
            html.classList.remove('dark');
        }
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
    };

    return [theme, toggleTheme];
};

export default useTheme;
