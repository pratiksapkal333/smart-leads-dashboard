import { useEffect, useState } from "react";

export default function Sidebar() {
    const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
        const savedTheme = localStorage.getItem("theme");
        if (savedTheme) return savedTheme === "dark";
        return window.matchMedia("(prefers-color-scheme: dark)").matches;
    });

    useEffect(() => {
        const rootElement = window.document.documentElement;
        if (isDarkMode) {
            rootElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            rootElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }
    }, [isDarkMode]);

    return (
        <div className="h-full w-full bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 p-6 flex flex-col justify-between transition-colors duration-200">
            {/* TOP SECTION: LOGO & NAVIGATION */}
            <div className="space-y-8">
                <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white flex items-center gap-2">
                    📊 Smart Leads
                </h2>

                <nav className="flex flex-col gap-2">
                    <button className="flex items-center px-4 py-3.5 text-base font-bold rounded-xl bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 w-full text-left transition-all cursor-pointer">
                        🎯 Dashboard
                    </button>
                    <button className="flex items-center px-4 py-3.5 text-base font-semibold rounded-xl text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800/50 w-full text-left transition-all cursor-pointer">
                        👥 Leads Directory
                    </button>
                    <button className="flex items-center px-4 py-3.5 text-base font-semibold rounded-xl text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800/50 w-full text-left transition-all cursor-pointer">
                        📈 Analytics Logs
                    </button>
                </nav>
            </div>

            {/* BOTTOM SECTION: DARK MODE INTEGRATION SWITCH */}
            <div className="pt-5 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
                <span className="text-base font-bold text-gray-700 dark:text-gray-300">
                    {isDarkMode ? "🌙 Dark Mode" : "☀️ Light Mode"}
                </span>

                <button
                    type="button"
                    onClick={() => setIsDarkMode(!isDarkMode)}
                    className={`relative inline-flex h-7 w-12 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none items-center ${isDarkMode ? "bg-blue-600" : "bg-gray-200 dark:bg-gray-700"
                        }`}
                    role="switch"
                    aria-checked={isDarkMode}
                >
                    <span
                        className={`pointer-events-none inline-block h-5.5 w-5.5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${isDarkMode ? "translate-x-5" : "translate-x-0"
                            }`}
                    />
                </button>
            </div>
        </div>
    );
}