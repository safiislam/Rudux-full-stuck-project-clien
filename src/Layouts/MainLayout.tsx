import { useState } from "react";
import useTheme from "../hooks/useTheme";
import Sidebar from "../components/Sidebar/Sidebar";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
    const [isOpen, setIsOpen] = useState(false)

    const [theme, toggleTheme] = useTheme();
    console.log(theme);
    return (
        <div className="flex h-screen w-full bg-gray-100 dark:bg-gray-400 transition-all duration-500 ">

            <div className={`${isOpen ? ' absolute top-0 h-screen left-[-500px]  ' : 'left-0 h-screen'} absolute transition-all duration-700  z-20 w-64 bg-gray-800`}>
                <div className="flex items-center justify-center h-16 bg-gray-800 relative">
                    <span className="text-white font-bold uppercase">Dashboard</span>
                    <span onClick={() => setIsOpen(!isOpen)} className="text-2xl text-red-500 block md:hidden absolute -end-3 ">{`<`}</span>
                </div>
                <div className="flex flex-col flex-1 overflow-y-auto">
                    <Sidebar />
                </div>
            </div>

            <div className={` ${!isOpen ? 'absolute top-0 md:ms-64 md:static' : ""}  md:flex flex-col flex-1  overflow-y-auto transition-all duration-500  `}>
                <div className="flex items-center justify-between py-4 bg-white border-b border-gray-200">
                    <div className="flex justify-start  w-full md:items-center px-4">
                        <button onClick={() => setIsOpen(!isOpen)} className={` text-gray-500 focus:outline-none focus:text-gray-700`}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                    d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                    </div>
                    <div onClick={toggleTheme} className="flex items-center pr-4 cursor-pointer transition-all duration-500 ">
                        {
                            theme === 'dark' ? <svg data-slot="icon" fill="none" className="size-8 transition-all duration-500" strokeWidth="1.5" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"></path>
                            </svg>
                                :
                                <svg data-slot="icon" fill="none" strokeWidth="1.5" className="size-8 transition-all duration-500" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"></path>
                                </svg>
                        }
                    </div>
                </div>
                <div className="p-4">
                    {/* <h1 className="text-2xl font-bold">Welcome to Daystar Daycare </h1>
                    <p className="mt-2 text-gray-600">Raising tomorrow's leaders.</p> */}
                    <Outlet />
                </div>
            </div>


        </div>
    );
};

export default MainLayout;