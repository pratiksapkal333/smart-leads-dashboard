export default function LeadsTable({ leads }: any) {
    return (
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Status</th>
                    <th>Source</th>
                </tr>
            </thead>

            <tbody>
                {leads.map((lead: any) => (
                    <tr key={lead._id || lead.id}>
                        <td style={{ fontWeight: 500 }}>{lead.name}</td>
                        <td style={{ color: "#4b5563" }}>{lead.email}</td>
                        <td>
                            <span style={{
                                padding: "4px 8px",
                                borderRadius: "4px",
                                fontSize: "0.85rem",
                                fontWeight: 500,
                                backgroundColor: lead.status === "Qualified" ? "#e0f2fe" : lead.status === "Lost" ? "#fee2e2" : "#f3f4f6",
                                color: lead.status === "Qualified" ? "#0369a1" : lead.status === "Lost" ? "#b91c1c" : "#374151"
                            }}>
                                {lead.status}
                            </span>
                        </td>
                        <td style={{ color: "#4b5563" }}>{lead.source}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}