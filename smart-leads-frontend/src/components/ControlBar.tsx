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
    search,
    setSearch,
    status,
    setStatus,
    source,
    setSource,
    sort,
    setSort,
    onCreateClick,
    onExportCSV
}: ControlBarProps) {
    return (
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between w-full bg-white dark:bg-gray-900 p-4 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm transition-colors duration-200">
            <div className="w-full md:flex-1">
                <input
                    type="text"
                    placeholder="Search by Name or Email..."
                    className="w-full px-4 py-2 text-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>
            <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-end">
                <select
                    className="px-3 py-2 text-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
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
                    className="px-3 py-2 text-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    value={source}
                    onChange={(e) => setSource(e.target.value)}
                >
                    <option value="">All Sources</option>
                    <option value="Website">Website</option>
                    <option value="Instagram">Instagram</option>
                    <option value="Referral">Referral</option>
                </select>
                <div className="flex rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
                    <button
                        onClick={() => setSort("latest")}
                        className={`px-3 py-2 text-xs font-medium transition-all ${sort === "latest" ? "bg-blue-600 text-white" : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"}`}
                    >
                        Latest
                    </button>
                    <button
                        onClick={() => setSort("oldest")}
                        className={`px-3 py-2 text-xs font-medium transition-all ${sort === "oldest" ? "bg-blue-600 text-white" : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"}`}
                    >
                        Oldest
                    </button>
                </div>
                <button
                    onClick={onExportCSV}
                    className="px-4 py-2 text-xs font-medium bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg shadow-sm transition-all"
                >
                    Export CSV
                </button>
                <button
                    onClick={onCreateClick}
                    className="px-4 py-2 text-xs font-medium bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-sm transition-all"
                >
                    + Create Lead
                </button>
            </div>
        </div>
    );
}