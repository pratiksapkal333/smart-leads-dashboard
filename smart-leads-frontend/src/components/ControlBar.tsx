interface ControlBarProps {
    search: string;
    setSearch: (val: string) => void;
    status: string;
    setStatus: (val: string) => void;
    source: string;
    setSource: (val: string) => void;
    sort: string;
    setSort: (val: string) => void;
    onCreateClick: () => void;
    onExportCSV: () => void;
}

export default function ControlBar({
    search, setSearch, status, setStatus, source, setSource, sort, setSort, onCreateClick, onExportCSV
}: ControlBarProps) {
    return (
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 w-full bg-white dark:bg-gray-900 p-4 rounded-xl border border-gray-100 dark:border-gray-800 transition-colors">
            {/* Search Input Bar */}
            <div className="w-full md:w-1/3">
                <input
                    type="text"
                    placeholder="Search by Name or Email..."
                    className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-transparent text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            {/* Filter and Action Controls Layout */}
            <div className="flex flex-wrap items-center justify-end gap-3 w-full md:w-auto">
                <select
                    className="px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-sm focus:outline-none"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                >
                    <option value="">All Statuses</option>
                    <option value="New">New</option>
                    <option value="Contacted">Contacted</option>
                    <option value="Qualified">Qualified</option>
                    <option value="Lost">Lost</option>
                </select>

                <select
                    className="px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-sm focus:outline-none"
                    value={source}
                    onChange={(e) => setSource(e.target.value)}
                >
                    <option value="">All Sources</option>
                    <option value="Website">Website</option>
                    <option value="Instagram">Instagram</option>
                    <option value="Referral">Referral</option>
                </select>

                {/* Sort Button Group */}
                <div className="flex rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden text-sm">
                    <button
                        onClick={() => setSort("latest")}
                        className={`px-3 py-2 font-medium transition-colors ${sort === "latest" ? "bg-blue-600 text-white" : "bg-transparent text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800"}`}
                    >
                        Latest
                    </button>
                    <button
                        onClick={() => setSort("oldest")}
                        className={`px-3 py-2 font-medium border-l border-gray-200 dark:border-gray-700 transition-colors ${sort === "oldest" ? "bg-blue-600 text-white" : "bg-transparent text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800"}`}
                    >
                        Oldest
                    </button>
                </div>

                {/* Action Buttons */}
                <button
                    onClick={onExportCSV}
                    className="px-4 py-2 text-sm font-bold bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-all"
                >
                    Export CSV
                </button>
                <button
                    onClick={onCreateClick}
                    className="px-4 py-2 text-sm font-bold bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all"
                >
                    + Create Lead
                </button>
            </div>
        </div>
    );
}