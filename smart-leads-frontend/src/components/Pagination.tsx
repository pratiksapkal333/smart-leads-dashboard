export default function Pagination({
    page,
    setPage,
    totalPages,
}: any) {
    return (
        <div className="flex gap-4 mt-4 justify-center items-center">
            <button
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
                className="px-4 py-2 text-xs font-medium rounded-lg disabled:bg-gray-200 dark:disabled:bg-gray-700 disabled:text-gray-400 dark:disabled:text-gray-500 disabled:cursor-not-allowed bg-blue-600 hover:bg-blue-700 text-white transition-all shadow-sm"
            >
                Prev
            </button>

            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Page {page} of {totalPages || 1}
            </span>

            <button
                disabled={page === totalPages || totalPages === 0}
                onClick={() => setPage(page + 1)}
                className="px-4 py-2 text-xs font-medium rounded-lg disabled:bg-gray-200 dark:disabled:bg-gray-700 disabled:text-gray-400 dark:disabled:text-gray-500 disabled:cursor-not-allowed bg-blue-600 hover:bg-blue-700 text-white transition-all shadow-sm"
            >
                Next
            </button>
        </div>
    );
}