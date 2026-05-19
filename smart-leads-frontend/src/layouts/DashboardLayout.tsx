import type { ReactNode } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

export default function DashboardLayout({
    children,
}: {
    children: ReactNode;
}) {
    return (
        <div className="flex h-screen w-screen overflow-hidden bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-200">
            {/* SIDEBAR CONTAINER */}
            <div className="w-64 h-full flex-shrink-0 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 transition-colors duration-200">
                <Sidebar />
            </div>

            {/* MAIN AREA WORKSPACE */}
            <div className="flex flex-col flex-1 min-w-0">
                {/* NAVBAR CONTAINER */}
                <div className="h-[60px] w-full flex-shrink-0 bg-white dark:bg-gray-900 transition-colors duration-200">
                    <Navbar />
                </div>

                {/* DASHBOARD PAGE VIEWS */}
                <main className="flex-1 p-6 overflow-y-auto bg-gray-50 dark:bg-gray-950 transition-colors duration-200">
                    {children}
                </main>
            </div>
        </div>
    );
}