export default function Pagination({
    page,
    setPage,
    totalPages,
}: any) {
    return (
        <div className="pagination" style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "16px"
        }}>
            <button
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
                style={{ backgroundColor: page === 1 ? "#d1d5db" : "#2563eb", cursor: page === 1 ? "not-allowed" : "pointer" }}
            >
                Prev
            </button>

            <span style={{ fontWeight: 500, color: "#4b5563", fontSize: "0.95rem" }}>
                Page {page} of {totalPages || 1}
            </span>

            <button
                disabled={page === totalPages || totalPages === 0}
                onClick={() => setPage(page + 1)}
                style={{ backgroundColor: (page === totalPages || totalPages === 0) ? "#d1d5db" : "#2563eb", cursor: (page === totalPages || totalPages === 0) ? "not-allowed" : "pointer" }}
            >
                Next
            </button>
        </div>
    );
}