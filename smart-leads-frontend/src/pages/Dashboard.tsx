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

    // Read base API URL from environment variable
    const BASE_URL = import.meta.env.VITE_API_URL || "https://smart-leads-dashboard-backend-1m9c.onrender.com";

    // Debounce search input to prevent excessive API calls
    useEffect(() => {
        const queryDelayTimer = setTimeout(() => {
            setDebouncedSearch(search);
            setPage(1);
        }, 400);
        return () => clearTimeout(queryDelayTimer);
    }, [search]);

    // Fetch leads based on active filters
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
            const response = await fetch(`${BASE_URL}/leads?${queryParams}`, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });

            if (!response.ok) throw new Error("Failed to fetch lead records.");

            const data = await response.json();

            // Handle different backend response structures gracefully
            const leadData = data.leads || data.data || data;
            setLeads(Array.isArray(leadData) ? leadData : []);
            setTotalPages(data.totalPages || 1);
        } catch (err: any) {
            setError(err.message || "An error occurred while loading leads.");
        } finally {
            setIsLoading(false);
        }
    };

    // Re-fetch when filters change
    useEffect(() => {
        fetchLeads();
    }, [debouncedSearch, status, source, sort, page]);

    // Handle Create and Edit submissions
    const handleModalSubmit = async (formData: LeadFormData) => {
        try {
            const token = localStorage.getItem("token");
            const isEditing = !!selectedLead?._id;
            const url = isEditing
                ? `${BASE_URL}/leads/${selectedLead._id}`
                : `${BASE_URL}/leads`;

            // Using PATCH to match backend route definition
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
                throw new Error(errorData.message || "Operation failed.");
            }

            setIsModalOpen(false);
            setSelectedLead(undefined); // Reset edit state
            fetchLeads();
        } catch (err: any) {
            alert(err.message);
        }
    };

    // Delete a lead record
    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this lead?")) return;
        try {
            const token = localStorage.getItem("token");
            const response = await fetch(`${BASE_URL}/leads/${id}`, {
                method: "DELETE",
                headers: { "Authorization": `Bearer ${token}` }
            });

            if (!response.ok) throw new Error("Failed to delete record.");
            fetchLeads();
        } catch (err: any) {
            alert(err.message);
        }
    };

    const handleExportCSV = () => {
        const token = localStorage.getItem("token");
        const queryParams = new URLSearchParams({
            search: debouncedSearch,
            status,
            source,
            sort,
            token: token || "" // Pass token here
        });
        // This opens the URL with the token attached as a query param
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
                    <p className="text-gray-500 font-medium">Updating data...</p>
                </div>
            ) : error ? (
                <div className="p-4 rounded-xl bg-red-50 text-red-600 border border-red-200">
                    Error: {error}
                </div>
            ) : leads.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 border border-dashed rounded-2xl">
                    <p className="text-gray-400">No leads found.</p>
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
                title={selectedLead ? "Modify Existing Lead" : "Register New Lead"}
                initialData={selectedLead}
            />
        </div>
    );
}