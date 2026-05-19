interface PaginationProps {
    page: number;
    setPage: (page: number) => void;
    totalPages: number;
}

export default function Pagination({ page, setPage, totalPages }: PaginationProps) {
    return (
        <div className="flex gap-5 mt-6 justify-center items-center">
            <button
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
                className="px-5 py-2.5 text-sm font-semibold rounded-lg disabled:bg-gray-200 dark:disabled:bg-gray-800 disabled:text-gray-400 dark:disabled:text-gray-600 disabled:cursor-not-allowed bg-blue-600 hover:bg-blue-700 text-white transition-all shadow-sm cursor-pointer"
            >
                Prev
            </button>

            <span className="text-base font-semibold text-gray-700 dark:text-gray-300">
                Page {page} of {totalPages || 1}
            </span>

            <button
                disabled={page === totalPages || totalPages === 0}
                onClick={() => setPage(page + 1)}
                className="px-5 py-2.5 text-sm font-semibold rounded-lg disabled:bg-gray-200 dark:disabled:bg-gray-800 disabled:text-gray-400 dark:disabled:text-gray-600 disabled:cursor-not-allowed bg-blue-600 hover:bg-blue-700 text-white transition-all shadow-sm cursor-pointer"
            >
                Next
            </button>
        </div>
    );
}