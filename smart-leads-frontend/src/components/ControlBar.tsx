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
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between w-full bg-white dark:bg-gray-900 p-5 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm transition-colors duration-200">
            <div className="w-full md:flex-1">
                <input
                    type="text"
                    placeholder="Search by Name or Email..."
                    className="w-full px-4 py-3 text-base bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>
            <div className="flex flex-wrap items-center gap-4 w-full md:w-auto justify-end">
                <select
                    className="px-4 py-3 text-base bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all cursor-pointer"
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
                    className="px-4 py-3 text-base bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all cursor-pointer"
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
                        className={`px-4 py-3 text-sm font-semibold transition-all cursor-pointer ${sort === "latest" ? "bg-blue-600 text-white" : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"}`}
                    >
                        Latest
                    </button>
                    <button
                        onClick={() => setSort("oldest")}
                        className={`px-4 py-3 text-sm font-semibold transition-all cursor-pointer ${sort === "oldest" ? "bg-blue-600 text-white" : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"}`}
                    >
                        Oldest
                    </button>
                </div>
                <button
                    onClick={onExportCSV}
                    className="px-5 py-3 text-sm font-semibold bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg shadow-sm hover:shadow transition-all cursor-pointer"
                >
                    Export CSV
                </button>
                <button
                    onClick={onCreateClick}
                    className="px-5 py-3 text-sm font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-sm hover:shadow transition-all cursor-pointer"
                >
                    + Create Lead
                </button>
            </div>
        </div>
    );
}