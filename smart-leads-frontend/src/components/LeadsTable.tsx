import type { Lead } from "../pages/Dashboard";

interface LeadsTableProps {
    leads: Lead[];
    onEdit: (lead: Lead) => void;
    onDelete: (id: string) => void;
}

export default function LeadsTable({ leads, onEdit, onDelete }: LeadsTableProps) {
    const getStatusStyles = (status: string) => {
        switch (status) {
            case "Qualified":
                return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
            case "Contacted":
                return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400";
            case "Lost":
                return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400";
            case "New":
            default:
                return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";
        }
    };

    return (
        <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm bg-white dark:bg-gray-800 w-full">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 text-left text-sm">
                <thead className="bg-gray-50 dark:bg-gray-700/50 text-gray-700 dark:text-gray-300 font-medium">
                    <tr>
                        <th className="px-6 py-4">Name</th>
                        <th className="px-6 py-4">Email</th>
                        <th className="px-6 py-4">Status</th>
                        <th className="px-6 py-4">Source</th>
                        <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-gray-800">
                    {leads.map((lead) => (
                        <tr key={lead._id} className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                            <td className="px-6 py-4 font-medium text-gray-900 dark:text-gray-100">{lead.name}</td>
                            <td className="px-6 py-4 text-gray-600 dark:text-gray-300">{lead.email}</td>
                            <td className="px-6 py-4">
                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusStyles(lead.status)}`}>
                                    {lead.status}
                                </span>
                            </td>
                            <td className="px-6 py-4 text-gray-600 dark:text-gray-300">{lead.source}</td>
                            <td className="px-6 py-4 text-right space-x-2">
                                <button
                                    onClick={() => onEdit(lead)}
                                    className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 text-xs font-semibold px-2 py-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => onDelete(lead._id)}
                                    className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 text-xs font-semibold px-2 py-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}