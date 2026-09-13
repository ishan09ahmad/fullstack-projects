import { useContext, useEffect, useState } from "react";
import { Link, NavLink, useNavigate, useLocation } from "react-router";
import {
  Check,
  ChevronDown,
  MailCheck,
  LogOut,
  Menu,
  X,
  User,
} from "lucide-react";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";

export default function Navbar() {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const { isLoggedIn, setIsLoggedIn, setTasks, } = useContext(AppContext);

  const [isOpen, setIsOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsOpen(false);
  }, [location.pathname]);

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
    } finally {
    }
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="w-full border-b border-gray-100 bg-white shadow-xl relative">
      <div className="mx-auto flex items-center justify-between h-17 max-w-350  gap-4 px-6">
        {/* Logo */}
        <Link
          to="/"
          onClick={closeMobileMenu}
          className="flex items-center gap-2"
        >
          <div className="flex h-6 w-6 items-center justify-center rounded-md bg-violet-600">
            <Check size={20} strokeWidth={4} className="text-white" />
          </div>

          <span className="text-[22px] font-extrabold tracking-tight text-gray-900">
            TaskFlow
          </span>
        </Link>

        {/* ================= DESKTOP NAV ================= */}
        <div className="hidden items-center gap-10 md:flex">
          <NavLink
            to="/features"
            className={({ isActive }) =>
              `text-[15px] font-semibold text-gray-700 transition-colors hover:text-violet-600 ${
                isActive ? "border-b-2 border-b-violet-400 pb-1" : ""
              }`
            }
          >
            Features
          </NavLink>

          {/* Logged Out */}
          {!isLoggedIn && (
            <>
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  `text-[15px] font-semibold text-gray-700 transition-colors hover:text-violet-600 ${
                    isActive ? "border-b-2 border-b-violet-400 pb-1" : ""
                  }`
                }
              >
                Login
              </NavLink>

              <Link
                to="/register"
                className="rounded-full bg-[#111c2d] px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-[#1b293d] hover:shadow-md"
              >
                Get Started
              </Link>
            </>
          )}

          {/* Logged In */}
          {isLoggedIn && (
            <>
              <NavLink
                to="dashboard"
                className={({ isActive }) =>
                  `text-[15px] font-semibold text-gray-700 transition-colors hover:text-violet-600 ${
                    isActive ? "border-b-2 border-b-violet-400 pb-1" : ""
                  }`
                }
              >
                Dashboard
              </NavLink>

              <NavLink
                to="/add-task"
                className={({ isActive }) =>
                  `text-[15px] font-semibold text-gray-700 transition-colors hover:text-violet-600 ${
                    isActive ? "border-b-2 border-b-violet-400 pb-1" : ""
                  }`
                }
              >
                Add Task
              </NavLink>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setIsOpen(!isOpen)}
                  className="flex cursor-pointer items-center gap-2 rounded-lg px-2 py-1.5 transition hover:bg-gray-100"
                >
                  {/* Avatar */}
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-200 text-[12px] font-semibold text-gray-600">
                    <User />
                  </div>
                  <ChevronDown
                    size={15}
                    className={`text-gray-500 transition-transform ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Dropdown */}
                {isOpen && (
                  <div className="absolute right-0 top-full z-50 mt-2 w-48 rounded-xl border border-gray-100 bg-white p-1.5 shadow-xl">
                    <button
                      type="button"
                      onClick={() => {
                        setIsOpen(false);
                        navigate("/verify-email");
                      }}
                      className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-violet-50 hover:text-violet-600 cursor-pointer"
                    >
                      <MailCheck size={17} />
                      Verify Email
                    </button>

                    <div className="my-1 h-px bg-gray-100" />

                    <button
                      type="button"
                      onClick={handleLogout}
                      className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-red-50 hover:text-red-600 cursor-pointer"
                    >
                      <LogOut size={17} />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </>
          )}
        </div>

        {/* ================= MOBILE BUTTON ================= */}
        <button
          type="button"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg text-gray-700 transition hover:bg-gray-100 md:hidden"
          aria-label="Toggle navigation menu"
        >
          {isMobileMenuOpen ? <X size={23} /> : <Menu size={23} />}
        </button>
      </div>

      {/* ================= MOBILE NAV ================= */}
      {isMobileMenuOpen && (
        <div className="border-t border-b shadow-md border-gray-100 bg-white px-6 py-4 absolute left-0 right-0 md:hidden z-50 ">
          <div className="flex flex-col gap-1">
            <NavLink
              to="/features"
              onClick={closeMobileMenu}
              className="rounded-lg px-3 py-3 text-[15px] font-semibold text-gray-700 transition hover:bg-violet-50 hover:text-violet-600"
            >
              Features
            </NavLink>

            {!isLoggedIn && (
              <>
                <NavLink
                  to="/login"
                  onClick={closeMobileMenu}
                  className="rounded-lg px-3 py-3 text-[15px] font-semibold text-gray-700 transition hover:bg-violet-50 hover:text-violet-600"
                >
                  Login
                </NavLink>

                <Link
                  to="/register"
                  onClick={closeMobileMenu}
                  className="mt-2 rounded-full bg-[#111c2d] px-5 py-3 text-center text-sm font-semibold text-white transition-all hover:bg-[#1b293d]"
                >
                  Get Started
                </Link>
              </>
            )}

            {isLoggedIn && (
              <>
                <NavLink
                  to="dashboard"
                  className="rounded-lg px-3 py-3 text-[15px] font-semibold text-gray-700 transition hover:bg-violet-50 hover:text-violet-600"
                >
                  Dashboard
                </NavLink>

                <NavLink
                  to="add-task"
                  className="rounded-lg px-3 py-3 text-[15px] font-semibold text-gray-700 transition hover:bg-violet-50 hover:text-violet-600"
                >
                  Add Task
                </NavLink>

                <NavLink
                  to="/verify-email"
                  className="rounded-lg px-3 py-3 text-[15px] font-semibold text-gray-700 transition hover:bg-violet-50 hover:text-violet-600"
                >
                  Verify Email
                </NavLink>

                <button
                  onClick={handleLogout}
                  className="mt-2 rounded-full bg-[#111c2d] px-5 py-3 text-center text-sm font-semibold text-white transition-all hover:bg-[#1b293d]"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
