import { useAuth } from "../context/AuthContext";
import type { Lead } from "../pages/Dashboard";

interface LeadsTableProps {
    leads: Lead[];
    onEdit: (lead: Lead) => void;
    onDelete: (id: string) => void;
}

export default function LeadsTable({ leads, onEdit, onDelete }: LeadsTableProps) {
    const { isAdmin } = useAuth(); // Grab the role check from context

    return (
        <div className="w-full overflow-x-auto border border-gray-200 dark:border-gray-800 rounded-xl bg-white dark:bg-gray-900 shadow-sm transition-colors duration-200">
            <table className="w-full border-collapse text-left text-base">
                <thead className="bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-bold border-b border-gray-200 dark:border-gray-700">
                    <tr>
                        <th className="px-6 py-4">Name</th>
                        <th className="px-6 py-4">Email</th>
                        <th className="px-6 py-4">Status</th>
                        <th className="px-6 py-4">Source</th>
                        <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-800 text-gray-900 dark:text-gray-100 font-medium">
                    {leads.map((lead) => (
                        <tr key={lead._id} className="hover:bg-gray-50 dark:hover:bg-gray-800/40 transition-colors">
                            <td className="px-6 py-4.5">{lead.name}</td>
                            <td className="px-6 py-4.5 text-gray-500 dark:text-gray-400">{lead.email}</td>
                            <td className="px-6 py-4.5">
                                <span className={`px-3 py-1 rounded-full text-sm font-bold ${lead.status === "New" ? "bg-blue-50 text-blue-600 dark:bg-blue-950/30 dark:text-blue-400" :
                                        lead.status === "Contacted" ? "bg-amber-50 text-amber-600 dark:bg-amber-950/30 dark:text-amber-400" :
                                            lead.status === "Qualified" ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/30 dark:text-emerald-400" :
                                                "bg-red-50 text-red-600 dark:bg-red-950/30 dark:text-red-400"
                                    }`}>
                                    {lead.status}
                                </span>
                            </td>
                            <td className="px-6 py-4.5 text-gray-600 dark:text-gray-400">{lead.source}</td>
                            <td className="px-6 py-4.5 text-right space-x-2">
                                <button
                                    onClick={() => onEdit(lead)}
                                    className="px-4 py-2 text-sm font-bold bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-blue-600 dark:text-blue-400 rounded-lg transition-all cursor-pointer"
                                >
                                    Edit
                                </button>

                                {/* 🔐 Role-Based Access Control: Only admins see or use Delete */}
                                {isAdmin && (
                                    <button
                                        onClick={() => onDelete(lead._id)}
                                        className="px-4 py-2 text-sm font-bold bg-red-50 hover:bg-red-100 dark:bg-red-950/20 dark:hover:bg-red-950/40 text-red-600 dark:text-red-400 rounded-lg transition-all cursor-pointer"
                                    >
                                        Delete
                                    </button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}