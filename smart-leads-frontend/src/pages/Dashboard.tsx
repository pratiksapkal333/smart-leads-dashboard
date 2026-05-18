import { useEffect, useState } from "react";
import api from "../services/api";

import ControlBar from "../components/ControlBar";
import LeadsTable from "../components/LeadsTable";
import Pagination from "../components/Pagination";

export interface Lead {
    _id: string;
    name: string;
    email: string;
    status: string;
    source: string;
    createdAt: string;
}

export default function Dashboard() {
    const [leads, setLeads] = useState<Lead[]>([]);
    const [loading, setLoading] = useState(false);

    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("");
    const [source, setSource] = useState("");

    const [page, setPage] = useState(1);

    const [pagination, setPagination] = useState({
        totalPages: 1,
        hasNextPage: false,
    });

    const fetchLeads = async () => {
        try {
            setLoading(true);

            const response = await api.get("/leads", {
                params: {
                    search,
                    status,
                    source,
                    page,
                },
            });

            setLeads(response.data.data);

            setPagination(response.data.pagination);
        } catch (error) {
            console.error("Failed to fetch leads", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchLeads();
    }, [search, status, source, page]);

    return (
        <div className="space-y-6">

            <ControlBar
                search={search}
                setSearch={setSearch}
                status={status}
                setStatus={setStatus}
                source={source}
                setSource={setSource}
            />

            {loading ? (
                <div className="card">Loading leads...</div>
            ) : leads.length === 0 ? (
                <div className="card">No Leads Found</div>
            ) : (
                <LeadsTable leads={leads} />
            )}

            <Pagination
                page={page}
                setPage={setPage}
                totalPages={pagination.totalPages}
            />

        </div>
    );
}