export default function ControlBar({
    setSearch,
    setStatus,
    setSource,
    setSort,
}: any) {
    return (
        <div style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            flexWrap: "wrap",
            width: "100%"
        }}>
            {/* SEARCH INPUT */}
            <input
                style={{ flex: "1", minWidth: "200px" }}
                placeholder="Search leads..."
                onChange={(e) => setSearch(e.target.value)}
            />

            {/* STATUS FILTER */}
            <select onChange={(e) => setStatus(e.target.value)}>
                <option value="">All Status</option>
                <option value="New">New</option>
                <option value="Qualified">Qualified</option>
                <option value="Lost">Lost</option>
            </select>

            {/* SOURCE FILTER */}
            <select onChange={(e) => setSource(e.target.value)}>
                <option value="">All Source</option>
                <option value="Website">Website</option>
                <option value="Instagram">Instagram</option>
                <option value="Referral">Referral</option>
            </select>

            {/* SORT BUTTONS */}
            <button type="button" onClick={() => setSort("latest")}>Latest</button>
            <button type="button" onClick={() => setSort("oldest")}>Oldest</button>
        </div>
    );
}