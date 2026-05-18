export default function Navbar() {
    return (
        <div style={{
            height: "100%",
            width: "100%",
            backgroundColor: "#ffffff",
            borderBottom: "1px solid #e5e7eb",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 24px",
            boxSizing: "border-box"
        }}>
            <h3 style={{ fontWeight: 600, fontSize: "1.125rem", margin: 0 }}>
                Leads Dashboard
            </h3>

            <div style={{
                fontSize: "0.875rem",
                fontWeight: 500,
                color: "#4b5563"
            }}>
                User Profile
            </div>
        </div>
    );
}