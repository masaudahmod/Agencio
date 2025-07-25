import { useEffect, useState } from "react";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { useGetUserQuery, useLogoutMutation } from "../features/api/authSlice";
import { DropdownMenu } from "radix-ui";
import { FaCheck, FaChevronDown, FaFill, FaRegUser } from "react-icons/fa";

export default function DashboardLayout() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigate = useNavigate();

  const [logout, { isError }] = useLogoutMutation();
  const { data: userData } = useGetUserQuery();

  useEffect(() => {
    if (userData) {
      setUser(userData);
    }
    setIsLoading(false);
  }, [userData]);

  const handleLogout = async () => {
    await logout();
    navigate(0, { replace: true }, "/login");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg">Loading...</p>
      </div>
    );
  }
  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg text-red-500">Error loading user data</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <NavLink
                  to="/"
                  className={`text-xl font-bold text-indigo-600 `}
                >
                  Agencio
                </NavLink>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:space-x-4">
                {(user?.role === "superAdmin" || user?.role === "cm") && (
                  <NavLink
                    to="/settings"
                    className={`${
                      window.location.pathname === "/settings"
                        ? "border-indigo-500 text-gray-900"
                        : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                    } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
                  >
                    Settings
                  </NavLink>
                )}
                <NavLink
                  to="/all-content"
                  className={`${
                    window.location.pathname === "/all-content"
                      ? "border-indigo-500 text-gray-900"
                      : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                  } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
                >
                  All Contents
                </NavLink>
                <NavLink
                  to="/content/write"
                  className={`${
                    window.location.pathname === "/content/write"
                      ? "border-indigo-500 text-gray-900"
                      : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                  } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
                >
                  Write Content
                </NavLink>
                {(user?.role === "superAdmin" || user?.role === "cm") && (
                  <NavLink
                    to="/business"
                    className={`${
                      window.location.pathname === "/business"
                        ? "border-indigo-500 text-gray-900"
                        : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                    } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
                  >
                    Businesses
                  </NavLink>
                )}
                {(user?.role === "superAdmin" || user?.role === "cm") && (
                  <>
                    <NavLink
                      to="/business/add"
                      className={`${
                        window.location.pathname === "/business/add"
                          ? "border-indigo-500 text-gray-900"
                          : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                      } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
                    >
                      Add Business
                    </NavLink>
                    <NavLink
                      to="/links"
                      className={`${
                        window.location.pathname === "/links"
                          ? "border-indigo-500 text-gray-900"
                          : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                      }
                    inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
                    >
                      Links
                    </NavLink>
                  </>
                )}
              </div>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:items-center">
              <div className="ml-3 relative">
                <div className="flex items-center space-x-3">
                  <span className="text-sm capitalize font-medium text-gray-700">
                    {user?.name} ({user?.role})
                  </span>
                  <DropdownMenu.Root>
                    <DropdownMenu.Trigger asChild>
                      <button
                        className="inline-flex size-[35px] items-center justify-center rounded-full bg-white text-violet11 shadow-[0_2px_10px] shadow-black outline-none cursor-pointer focus:shadow-[0_0_0_2px] focus:shadow-black"
                        aria-label="Customise options"
                      >
                        <FaRegUser />
                      </button>
                    </DropdownMenu.Trigger>

                    <DropdownMenu.Portal>
                      <DropdownMenu.Content
                        className="min-w-[220px] rounded-md bg-white p-[5px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform] data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade data-[side=right]:animate-slideLeftAndFade data-[side=top]:animate-slideDownAndFade"
                        sideOffset={5}
                      >
                        <DropdownMenu.Item className="group relative flex select-none items-center px-2 py-1 text-base data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[disabled]:text-mauve8 data-[highlighted]:text-violet1">
                          New Tab{" "}
                        </DropdownMenu.Item>
                        <DropdownMenu.Item className="group relative flex select-none items-center px-2 py-1 text-base data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[disabled]:text-mauve8 data-[highlighted]:text-violet1">
                          New Window{" "}
                        </DropdownMenu.Item>
                        <DropdownMenu.Item
                          className="group relative flex select-none items-center px-2 py-1 text-base data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[disabled]:text-mauve8 data-[highlighted]:text-violet1"
                          disabled
                        >
                          New Private Window{" "}
                        </DropdownMenu.Item>

                        <DropdownMenu.Separator className="h-[1px] bg-violet-500" />

                        <DropdownMenu.Item
                          onClick={handleLogout}
                          className="group cursor-pointer relative flex select-none items-center rounded-[3px] p-2 text-base data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[disabled]:text-mauve8 data-[highlighted]:text-violet-600"
                        >
                          Logout
                        </DropdownMenu.Item>

                        <DropdownMenu.Arrow className="fill-white" />
                      </DropdownMenu.Content>
                    </DropdownMenu.Portal>
                  </DropdownMenu.Root>
                </div>
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="flex items-center sm:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-900 hover:text-gray-500"
                aria-expanded="false"
              >
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
              to="/content/write"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`${
                window.location.pathname === "/content/write"
                  ? "bg-indigo-50 border-indigo-500 text-indigo-700"
                  : "border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800"
              } block pl-3 pr-4 py-2 border-l-4 text-base font-medium`}
            >
              Write Content
            </NavLink>
            <NavLink
              to="/all-content"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`${
                window.location.pathname === "/all-content"
                  ? "bg-indigo-50 border-indigo-500 text-indigo-700"
                  : "border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800"
              } block pl-3 pr-4 py-2 border-l-4 text-base font-medium`}
            >
              All Contents
            </NavLink>
            <NavLink
              to="/business"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`${
                window.location.pathname === "/all-content"
                  ? "bg-indigo-50 border-indigo-500 text-indigo-700"
                  : "border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800"
              } block pl-3 pr-4 py-2 border-l-4 text-base font-medium`}
            >
              Businesses
            </NavLink>
            <NavLink
              to="/business/add"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`${
                window.location.pathname === "/business/add"
                  ? "bg-indigo-50 border-indigo-500 text-indigo-700"
                  : "border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800"
              }
              block pl-3 pr-4 py-2 border-l-4 text-base font-medium`}
            >
              Add Business
            </NavLink>
            {user?.role === "superAdmin" && (
              <NavLink
                to="/all-content/settings"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={`${
                  window.location.pathname === "/all-content/settings"
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
      <main className="container mx-auto px-3 sm:px-3 lg:px-5 py-6">
        <Outlet />
      </main>
    </div>
  );
}
