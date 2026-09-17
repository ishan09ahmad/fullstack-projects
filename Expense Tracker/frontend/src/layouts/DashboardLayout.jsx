import { Outlet, NavLink } from "react-router";
import { LayoutDashboard, Receipt, BarChart3, Tags } from "lucide-react";

export default function DashboardLayout() {
  const navItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Transactions",
      path: "transactions",
      icon: Receipt,
    },
    {
      name: "Reports",
      path: "reports",
      icon: BarChart3,
    },
    {
      name: "Categories",
      path: "categories",
      icon: Tags,
    },
  ];

  return (
    <div className="min-h-[calc(100vh-70px)] bg-stone-50">
      {/* Desktop Navigation */}
      <nav className="fixed left-0 top-17.5 hidden h-[calc(100vh-70px)] w-64 border-r border-stone-200 bg-white p-4 md:block">
        <div className="space-y-2">
          {navItems.map(({ name, path, icon: Icon }) => (
            <NavLink
              key={path}
              to={path}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition ${
                  isActive
                    ? "bg-red-50 text-red-700"
                    : "text-stone-600 hover:bg-stone-50 hover:text-stone-800"
                }`
              }
            >
              <Icon size={19} />
              {name}
            </NavLink>
          ))}
        </div>
      </nav>

      {/* Page Content */}
      <div className="pb-20 md:ml-64 md:pb-0">
        <Outlet />
      </div>

      {/* Mobile Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 h-20 right-0 z-50 border-t border-stone-200 bg-white px-2 py-2 md:hidden">
        <div className="grid grid-cols-4 space-x-1">
          {navItems.map(({ name, path, icon: Icon }) => (
            <NavLink
              key={path}
              to={path}
              className={({ isActive }) =>
                `flex flex-col items-center justify-center gap-1 rounded-xl py-2 text-[10px] min-[400px]:text-xs font-semibold transition  ${
                  isActive
                    ? "text-red-700"
                    : "text-stone-500 hover:text-stone-700"
                }`
              }
            >
              <Icon size={21} />
              <span>{name}</span>
            </NavLink>
          ))}
        </div>
      </nav>
    </div>
  );
}
