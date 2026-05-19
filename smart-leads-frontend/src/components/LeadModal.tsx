import { useState, useEffect } from "react";

export interface LeadFormData {
    name: string;
    email: string;
    status: "New" | "Contacted" | "Qualified" | "Lost";
    source: "Website" | "Instagram" | "Referral";
}

interface LeadModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: LeadFormData) => void;
    initialData?: LeadFormData;
    title: string;
}

export default function LeadModal({ isOpen, onClose, onSubmit, initialData, title }: LeadModalProps) {
    const [formData, setFormData] = useState<LeadFormData>({
        name: "",
        email: "",
        status: "New",
        source: "Website"
    });
    const [error, setError] = useState<string>("");

    useEffect(() => {
        if (initialData) {
            setFormData(initialData);
        } else {
            setFormData({ name: "", email: "", status: "New", source: "Website" });
        }
        setError("");
    }, [initialData, isOpen]);

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.name.trim() || !formData.email.trim()) {
            setError("Name and Email fields are strictly required.");
            return;
        }
        // Simple regex verification
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            setError("Please enter a valid email address.");
            return;
        }
        onSubmit(formData);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl max-w-md w-full p-6 shadow-xl transition-all">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">{title}</h3>

                {error && (
                    <div className="mb-4 p-3 text-sm font-semibold bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400 rounded-lg">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">Full Name</label>
                        <input
                            type="text"
                            className="w-full px-4 py-2.5 text-base border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">Email Address</label>
                        <input
                            type="email"
                            className="w-full px-4 py-2.5 text-base border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">Status</label>
                            <select
                                className="w-full px-3 py-2.5 text-base border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200"
                                value={formData.status}
                                onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                            >
                                <option value="New">New</option>
                                <option value="Contacted">Contacted</option>
                                <option value="Qualified">Qualified</option>
                                <option value="Lost">Lost</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">Source</label>
                            <select
                                className="w-full px-3 py-2.5 text-base border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200"
                                value={formData.source}
                                onChange={(e) => setFormData({ ...formData, source: e.target.value as any })}
                            >
                                <option value="Website">Website</option>
                                <option value="Instagram">Instagram</option>
                                <option value="Referral">Referral</option>
                            </select>
                        </div>
                    </div>

                    <div className="flex justify-end gap-3 pt-4 border-t border-gray-100 dark:border-gray-800 mt-6">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2.5 text-sm font-semibold text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg cursor-pointer"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg cursor-pointer"
                        >
                            Save Details
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}