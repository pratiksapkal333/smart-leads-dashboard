export default function Navbar() {
    return (
        <div className="h-full w-full bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between px-6 box-border transition-colors duration-200">
            <h3 className="text-gray-900 dark:text-white font-semibold text-lg m-0 transition-colors duration-200">
                Leads Dashboard
            </h3>
            <div className="text-gray-600 dark:text-gray-400 text-sm font-medium transition-colors duration-200">
                User Profile
            </div>
        </div>
    );
}