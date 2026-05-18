import type { ReactNode } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

export default function DashboardLayout({
    children,
}: {
    children: ReactNode;
}) {
    return (
        <div style={{ display: "flex", height: "100vh", width: "100vw", overflow: "hidden" }}>

            {/* SIDEBAR CONTAINER */}
            <div style={{ width: "256px", height: "100%", flexShrink: 0 }}>
                <Sidebar />
            </div>

            {/* MAIN AREA WORKSPACE */}
            <div style={{ display: "flex", flexDirection: "column", flex: 1, minWidth: 0 }}>

                {/* NAVBAR CONTAINER */}
                <div style={{ height: "60px", width: "100%", flexShrink: 0 }}>
                    <Navbar />
                </div>

                {/* DASHBOARD PAGE VIEWS */}
                <main style={{ flex: 1, padding: "24px", overflowY: "auto", backgroundColor: "#f9fafb" }}>
                    {children}
                </main>

            </div>
        </div>
    );
}