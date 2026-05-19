import { useState, useEffect } from "react";
import ControlBar from "../components/ControlBar";
import LeadsTable from "../components/LeadsTable";
import Pagination from "../components/Pagination";
import LeadModal from "../components/LeadModal";
import type { LeadFormData } from "../components/LeadModal";

export interface Lead {
    _id: string;
    name: string;
    email: string;
    status: "New" | "Contacted" | "Qualified" | "Lost";
    source: "Website" | "Instagram" | "Referral";
}

export default function Dashboard() {
    // Search, sorting and filtration configurations
    const [search, setSearch] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");
    const [status, setStatus] = useState("");
    const [source, setSource] = useState("");
    const [sort, setSort] = useState("latest");
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    // Dynamic UI state buckets
    const [leads, setLeads] = useState<Lead[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    // Modal view handlers
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedLead, setSelectedLead] = useState<Lead | undefined>(undefined);

    // 💡 Read from your exact .env variable name to handle clean environment mapping
    const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

    // Debounce processing wrapper
    useEffect(() => {
        const queryDelayTimer = setTimeout(() => {
            setDebouncedSearch(search);
            setPage(1); // Reset page focus when query adjusts
        }, 400);

        return () => clearTimeout(queryDelayTimer);
    }, [search]);

    // Fetch master pipeline matching backend criteria
    const fetchLeads = async () => {
        setIsLoading(true);
        setError("");
        try {
            const queryParams = new URLSearchParams({
                search: debouncedSearch,
                status,
                source,
                sort,
                page: page.toString(),
                limit: "10"
            });

            const token = localStorage.getItem("token");

            // 💡 Updated to use dynamic BASE_URL variable safely
            const response = await fetch(`${BASE_URL}/leads?${queryParams}`, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });

            if (!response.ok) throw new Error("Failed to pull updated leads data.");
            const data = await response.json();

            // 💡 Defensive unpacking: extract from data.leads, data.data, or fallback safely to a direct array
            if (Array.isArray(data)) {
                setLeads(data);
            } else if (data && Array.isArray(data.leads)) {
                setLeads(data.leads);
            } else if (data && data.data && Array.isArray(data.data.leads)) {
                setLeads(data.data.leads);
            } else if (data && Array.isArray(data.data)) {
                setLeads(data.data);
            } else {
                setLeads([]);
            }

            setTotalPages(data.totalPages || data.data?.totalPages || 1);
        } catch (err: any) {
            setError(err.message || "An unexpected error occurred.");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchLeads();
    }, [debouncedSearch, status, source, sort, page]);

    // Create or update execution pipeline
    const handleModalSubmit = async (formData: LeadFormData) => {
        try {
            const token = localStorage.getItem("token");

            // 💡 Check if we are in Edit mode by looking for selectedLead._id
            const isEditing = !!selectedLead?._id;
            const url = isEditing
                ? `${BASE_URL}/leads/${selectedLead._id}`
                : `${BASE_URL}/leads`;

            const method = isEditing ? "PATCH" : "POST";

            const response = await fetch(url, {
                method,
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Failed to persist lead changes.");
            }

            setIsModalOpen(false);
            setSelectedLead(undefined); // 💡 Reset selection after success
            fetchLeads();
        } catch (err: any) {
            alert(err.message);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to completely clear this lead record?")) return;
        try {
            const token = localStorage.getItem("token");
            const response = await fetch(`${BASE_URL}/leads/${id}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            if (!response.ok) throw new Error("Could not process record removal.");
            fetchLeads();
        } catch (err: any) {
            alert(err.message);
        }
    };

    const handleExportCSV = () => {
        const queryParams = new URLSearchParams({ search: debouncedSearch, status, source, sort });
        // 💡 Dynamic download binding targeting your environment variable
        window.open(`${BASE_URL}/leads/export?${queryParams}`, "_blank");
    };

    return (
        <div className="p-6 space-y-6 max-w-[1600px] mx-auto w-full box-border">
            <ControlBar
                search={search}
                setSearch={setSearch}
                status={status}
                setStatus={setStatus}
                source={source}
                setSource={setSource}
                sort={sort}
                setSort={setSort}
                onCreateClick={() => {
                    setSelectedLead(undefined);
                    setIsModalOpen(true);
                }}
                onExportCSV={handleExportCSV}
            />

            {isLoading ? (
                <div className="flex flex-col items-center justify-center py-20 space-y-4">
                    <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-gray-500 font-medium">Fetching dashboard records...</p>
                </div>
            ) : error ? (
                <div className="p-4 rounded-xl bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/50 text-red-600 dark:text-red-400 font-medium">
                    Error: {error}
                </div>
            ) : leads.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 border border-dashed border-gray-200 dark:border-gray-800 rounded-2xl bg-white dark:bg-gray-900">
                    <p className="text-gray-400 text-lg font-medium">No matching lead records located.</p>
                </div>
            ) : (
                <>
                    <LeadsTable
                        leads={leads}
                        onEdit={(lead) => {
                            setSelectedLead(lead);
                            setIsModalOpen(true);
                        }}
                        onDelete={handleDelete}
                    />
                    <Pagination page={page} setPage={setPage} totalPages={totalPages} />
                </>
            )}

            <LeadModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleModalSubmit}
                title={selectedLead ? "Modify Existing Lead" : "Register New Lead Source"}
                initialData={selectedLead}
            />
        </div>
    );
}