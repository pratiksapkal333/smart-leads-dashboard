import { useEffect, useState } from "react";
import api from "../services/api";
import useDebounce from "../hooks/useDebounce";

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
    const [sort, setSort] = useState("latest");
    const [page, setPage] = useState(1);

    const [pagination, setPagination] = useState({
        totalPages: 1,
        hasNextPage: false,
    });

    const debouncedSearch = useDebounce(search, 300);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingLead, setEditingLead] = useState<Lead | null>(null);
    const [formData, setFormData] = useState({ name: "", email: "", status: "New", source: "Website" });

    const fetchLeads = async () => {
        try {
            setLoading(true);
            const response = await api.get("/leads", {
                params: {
                    search: debouncedSearch,
                    status,
                    source,
                    sort,
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
        setPage(1);
    }, [debouncedSearch, status, source, sort]);

    useEffect(() => {
        fetchLeads();
    }, [debouncedSearch, status, source, sort, page]);

    const handleCreateLeadClick = () => {
        setEditingLead(null);
        setFormData({ name: "", email: "", status: "New", source: "Website" });
        setIsModalOpen(true);
    };

    const handleEditLead = (lead: Lead) => {
        setEditingLead(lead);
        setFormData({ name: lead.name, email: lead.email, status: lead.status, source: lead.source });
        setIsModalOpen(true);
    };

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (editingLead) {
                await api.put(`/leads/${editingLead._id}`, formData);
            } else {
                await api.post("/leads", formData);
            }
            setIsModalOpen(false);
            fetchLeads();
        } catch (error) {
            console.error("Form handling execution failed", error);
            alert("Error saving lead information.");
        }
    };

    const handleDeleteLead = async (id: string) => {
        if (window.confirm("Are you sure you want to completely clear this lead record registry?")) {
            try {
                await api.delete(`/leads/${id}`);
                fetchLeads();
            } catch (error) {
                console.error("Failed to delete lead", error);
                alert("Error removing entry.");
            }
        }
    };

    const handleCSVExportClick = async () => {
        try {
            const response = await api.get("/export/leads", { responseType: "blob" });
            const blobUrl = window.URL.createObjectURL(new Blob([response.data]));
            const downloadLink = document.createElement("a");
            downloadLink.href = blobUrl;
            downloadLink.setAttribute("download", `Leads_Report_${new Date().toISOString().slice(0, 10)}.csv`);
            document.body.appendChild(downloadLink);
            downloadLink.click();
            downloadLink.remove();
        } catch (error) {
            console.error("CSV compilation failed", error);
            alert("Unable to process document transfer stream parameters.");
        }
    };

    return (
        <div className="space-y-6 p-6 w-full">
            <ControlBar
                search={search}
                setSearch={setSearch}
                status={status}
                setStatus={setStatus}
                source={source}
                setSource={setSource}
                sort={sort}
                setSort={setSort}
                onCreateClick={handleCreateLeadClick}
                onExportCSV={handleCSVExportClick}
            />

            {loading ? (
                <div className="card text-center py-8 text-gray-500 dark:text-gray-400 font-medium">
                    Synchronizing network entries...
                </div>
            ) : leads.length === 0 ? (
                <div className="card text-center py-8 text-gray-500 dark:text-gray-400 font-medium">
                    No active leads match the defined query filters.
                </div>
            ) : (
                <div className="card overflow-hidden !p-0">
                    <LeadsTable leads={leads} onEdit={handleEditLead} onDelete={handleDeleteLead} />
                </div>
            )}

            <Pagination page={page} setPage={setPage} totalPages={pagination.totalPages} />

            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                    <div className="bg-white dark:bg-gray-800 w-full max-w-md p-6 rounded-xl shadow-xl border border-gray-100 dark:border-gray-700 mx-4">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                            {editingLead ? "✏️ Edit Lead Details" : "➕ Create New Lead Prospect"}
                        </h3>
                        <form onSubmit={handleFormSubmit} className="space-y-4">
                            <div>
                                <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">Full Name</label>
                                <input
                                    type="text"
                                    required
                                    className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">Email Address</label>
                                <input
                                    type="email"
                                    required
                                    className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">Lifecycle Status</label>
                                    <select
                                        className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        value={formData.status}
                                        onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                                    >
                                        <option value="New">New</option>
                                        <option value="Contacted">Contacted</option>
                                        <option value="Qualified">Qualified</option>
                                        <option value="Lost">Lost</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">Acquisition Source</label>
                                    <select
                                        className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        value={formData.source}
                                        onChange={(e) => setFormData({ ...formData, source: e.target.value })}
                                    >
                                        <option value="Website">Website</option>
                                        <option value="Instagram">Instagram</option>
                                        <option value="Referral">Referral</option>
                                    </select>
                                </div>
                            </div>
                            <div className="flex justify-end gap-2 pt-4 border-t border-gray-100 dark:border-gray-700">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-4 py-2 text-xs font-medium text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-all"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 text-xs font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-md transition-all"
                                >
                                    {editingLead ? "Save Changes" : "Create Registry"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}