import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

export default function DashboardLayout({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    setIsLoading(false);
    setUser({
      name: "John Doe",
      role: "admin",
    });
  }, []);

  const handleLogout = () => {
    console.log("Logout clicked");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <NavLink
                  to="/dashboard"
                  className="text-xl font-bold text-indigo-600"
                >
                  Approve Hub
                </NavLink>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                {user?.role === "admin" && (
                  <a
                    href="/dashboard/settings"
                    className={`${
                      window.location.pathname === "/dashboard/settings" // Check if the current page is the settings page
                        ? "border-indigo-500 text-gray-900"
                        : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                    } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
                  >
                    Settings
                  </a>
                )}
              </div>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:items-center">
              <div className="ml-3 relative">
                <div className="flex items-center space-x-3">
                  <span className="text-sm font-medium text-gray-700">
                    {user?.name} ({user?.role})
                  </span>
                  <button
                    onClick={handleLogout}
                    className="inline-flex cursor-pointer items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Logout
                  </button>
                </div>
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="flex items-center sm:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                {/* Icon when menu is closed */}
                <svg
                  className={`${isMobileMenuOpen ? "hidden" : "block"} h-6 w-6`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
                {/* Icon when menu is open */}
                <svg
                  className={`${isMobileMenuOpen ? "block" : "hidden"} h-6 w-6`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu, show/hide based on menu state */}
        <div className={`${isMobileMenuOpen ? "block" : "hidden"} sm:hidden`}>
          <div className="pt-2 pb-3 space-y-1">
            <NavLink
              to="/dashboard"
              className={`${
                window.location.pathname === "/dashboard"
                  ? "bg-indigo-50 border-indigo-500 text-indigo-700"
                  : "border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800"
              } block pl-3 pr-4 py-2 border-l-4 text-base font-medium`}
            >
              Dashboard
            </NavLink>
            {user?.role === "admin" && (
              <NavLink
                to="/dashboard/settings"
                className={`${
                  window.location.pathname === "/dashboard/settings"
                    ? "bg-indigo-50 border-indigo-500 text-indigo-700"
                    : "border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800"
                } block pl-3 pr-4 py-2 border-l-4 text-base font-medium`}
              >
                Settings
              </NavLink>
            )}
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200">
            <div className="flex items-center px-4">
              <div className="ml-3">
                <div className="text-base font-medium text-gray-800">
                  {user?.name}
                </div>
                <div className="text-sm font-medium text-gray-500">
                  {user?.role}
                </div>
              </div>
            </div>
            <div className="mt-3 space-y-1">
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      {children}
    </div>
  );
}
