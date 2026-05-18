import { useEffect, useState } from "react";
import api from "../services/api";
import useDebounce from "../hooks/useDebounce";

import LeadsTable from "../components/LeadsTable";
import ControlBar from "../components/ControlBar";
import Pagination from "../components/Pagination";

export default function Dashboard() {
    const [leads, setLeads] = useState([]);
    const [loading, setLoading] = useState(false);

    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("");
    const [source, setSource] = useState("");
    const [sort, setSort] = useState("latest");

    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const debouncedSearch = useDebounce(search, 500);

    useEffect(() => {
        fetchLeads();
    }, [debouncedSearch, status, source, sort, page]);

    const fetchLeads = async () => {
        setLoading(true);

        try {
            const res = await api.get("/leads", {
                params: {
                    search: debouncedSearch,
                    status,
                    source,
                    sort,
                    page,
                },
            });

            setLeads(res.data.data);
            setTotalPages(res.data.pagination.totalPages);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>

            {/* SEARCH / FILTERS CONTROL BAR */}
            <div>
                <ControlBar
                    setSearch={setSearch}
                    setStatus={setStatus}
                    setSource={setSource}
                    setSort={setSort}
                />
            </div>

            {/* DATA PANEL CONTAINER */}
            <div className="card" style={{ flex: 1 }}>
                {loading ? (
                    <div style={{ padding: "20px", textAlign: "center", color: "#6b7280" }}>
                        Loading leads data...
                    </div>
                ) : leads.length > 0 ? (
                    <LeadsTable leads={leads} />
                ) : (
                    <div style={{ padding: "40px", textAlign: "center", color: "#6b7280" }}>
                        No Leads Found Matching Criteria
                    </div>
                )}
            </div>

            {/* PAGINATION CONTROLS */}
            <div>
                <Pagination
                    page={page}
                    setPage={setPage}
                    totalPages={totalPages}
                />
            </div>
        </div>
    );
}