import { Link, Outlet, useLocation } from "react-router-dom";

const menuItems = [
  { label: "Brands", path: "/admin/brands" },
  { label: "Perfumes", path: "/admin/perfumes" },
  { label: "Collectors", path: "/admin/collectors" },
];

const AdminLayout = () => {
  const { pathname } = useLocation();

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white">
        <div className="p-6">
          <h2 className="text-xl font-bold">Admin Panel</h2>
        </div>
        <nav className="mt-4">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`block px-6 py-3 transition ${
                pathname === item.path
                  ? "bg-purple-600 text-white"
                  : "text-gray-300 hover:bg-gray-800"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="mt-auto p-6">
          <Link
            to="/"
            className="text-gray-400 hover:text-white transition text-sm"
          >
            Back to Home
          </Link>
        </div>
      </aside>

      {/* Content */}
      <main className="flex-1 bg-gray-100">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
