export default function Sidebar() {
    return (
        <div style={{
            height: "100%",
            width: "100%",
            backgroundColor: "#ffffff",
            borderRight: "1px solid #e5e7eb",
            padding: "24px",
            boxSizing: "border-box"
        }}>
            <h2 style={{
                fontSize: "1.5rem",
                fontWeight: "bold",
                marginBottom: "24px",
                color: "#111827"
            }}>
                Smart Leads
            </h2>

            <div style={{
                display: "flex",
                flexDirection: "column",
                gap: "12px"
            }}>
                <button style={{ textAlign: "left", width: "100%" }}>
                    Dashboard
                </button>

                <button style={{ textAlign: "left", width: "100%" }}>
                    Leads
                </button>

                <button style={{ textAlign: "left", width: "100%" }}>
                    Analytics
                </button>
            </div>
        </div>
    );
}