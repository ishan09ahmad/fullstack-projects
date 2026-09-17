import { useContext, useEffect, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router";
import {
  ChevronDown,
  LogOut,
  Menu,
  Search,
  Settings,
  User,
  X,
} from "lucide-react";
import { toast } from "react-toastify";
import { AppContext } from "../context/AppContextProvider";

export default function Navbar() {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const { isLoggedIn, setIsLoggedIn, setTasks, appLoading } =
    useContext(AppContext);

  const [isOpen, setIsOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [search, setSearch] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setIsOpen(false);
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleLogout = async () => {
    try {
      const response = await fetch(`${backendUrl}/api/auth/logout`, {
        method: "POST",
        credentials: "include",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      setIsOpen(false);
      setIsMobileMenuOpen(false);
      setIsLoggedIn(false);
      setTasks([]);

      toast.success(data.message);
      navigate("/");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <nav className="relative mx-auto flex h-17.5 max-w-350 items-center justify-between gap-8 px-6">
      <Link to="/" className="text-xl font-bold tracking-tight text-stone-800">
        Expense <span className="text-red-700">Tracker</span>
      </Link>

      {!appLoading &&
        (isLoggedIn ? (
          <div className="flex items-center justify-between md:flex-1 ">
            <div className="relative hidden md:block">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400"
              />

              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search expenses..."
                className="w-80 rounded-full border border-stone-200 bg-stone-50 py-2.5 pl-10 pr-4 text-sm text-stone-700 outline-none transition placeholder:text-stone-400 focus:border-red-300 focus:bg-white focus:ring-2 focus:ring-red-100"
              />
            </div>

            <div className="flex items-center justify-center gap-4 sm:gap-6">
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  `text-[17px] font-semibold transition-colors ${
                    isActive
                      ? "text-red-700"
                      : "text-stone-600 hover:text-red-700"
                  }`
                }
              >
                Dashboard
              </NavLink>

              <div className="relative">
                <button
                  type="button"
                  onClick={() => setIsOpen(!isOpen)}
                  className="flex cursor-pointer items-center gap-2 rounded-lg px-2 py-1.5 transition hover:bg-stone-100"
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-red-50 text-red-700">
                    <User size={17} />
                  </div>

                  <ChevronDown
                    size={15}
                    className={`text-stone-500 transition-transform ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Profile Dropdown */}
                {isOpen && (
                  <div className="absolute right-0 top-full z-50 mt-2 w-48 rounded-xl border border-stone-100 bg-white p-1.5 shadow-lg">
                    <button
                      type="button"
                      onClick={() => {
                        setIsOpen(false);
                        navigate("/settings");
                      }}
                      className="flex w-full cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-stone-600 transition hover:bg-red-50 hover:text-red-700"
                    >
                      <Settings size={17} />
                      Settings
                    </button>

                    <div className="my-1 h-px bg-stone-100" />

                    <button
                      type="button"
                      onClick={handleLogout}
                      className="flex w-full cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-stone-600 transition hover:bg-red-50 hover:text-red-700"
                    >
                      <LogOut size={17} />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="hidden md:flex md:gap-12  items-center ">
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `text-[15px] font-semibold transition-colors ${
                  isActive
                    ? "text-red-700"
                    : "text-stone-600 hover:text-red-700"
                }`
              }
            >
              About
            </NavLink>

            <NavLink
              to="/login"
              className={({ isActive }) =>
                `text-[15px] font-semibold transition-colors ${
                  isActive
                    ? "text-red-700"
                    : "text-stone-600 hover:text-red-700"
                }`
              }
            >
              Login
            </NavLink>

            <Link
              to="/register"
              className="rounded-full bg-red-700 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-red-600"
            >
              Sign Up
            </Link>
          </div>
        ))}

      {/* Mobile Menu Button */}
      {!isLoggedIn && !appLoading && (
        <button
          type="button"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="cursor-pointer rounded-lg p-2 text-stone-700 transition hover:bg-stone-100 md:hidden"
          aria-label="Toggle navigation menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      )}

      {/* Mobile Menu */}
      {isMobileMenuOpen && !isLoggedIn && !appLoading && (
        <div className="absolute left-0 right-0 top-17.5 z-50 border-b border-stone-200 bg-white px-6 py-4 shadow-md md:hidden">
          <div className="flex flex-col gap-1">
            <>
              <NavLink
                to="/about"
                onClick={closeMobileMenu}
                className={({ isActive }) =>
                  `rounded-lg px-3 py-3 text-[15px] font-semibold transition ${
                    isActive
                      ? "bg-red-50 text-red-700"
                      : "text-stone-600 hover:bg-red-50 hover:text-red-700"
                  }`
                }
              >
                About
              </NavLink>

              <NavLink
                to="/login"
                onClick={closeMobileMenu}
                className={({ isActive }) =>
                  `rounded-lg px-3 py-3 text-[15px] font-semibold transition ${
                    isActive
                      ? "bg-red-50 text-red-700"
                      : "text-stone-600 hover:bg-red-50 hover:text-red-700"
                  }`
                }
              >
                Login
              </NavLink>

              <Link
                to="/register"
                onClick={closeMobileMenu}
                className="mt-2 rounded-full bg-red-700 px-5 py-3 text-center text-sm font-semibold text-white transition hover:bg-red-600"
              >
                Sign Up
              </Link>
            </>
          </div>
        </div>
      )}
    </nav>
  );
}
