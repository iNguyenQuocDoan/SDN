import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { logout } from "../services/auth.api";
import { toast } from "react-toastify";

const menuItems = [
  { label: "Brands", path: "/admin/brands" },
  { label: "Perfumes", path: "/admin/perfumes" },
  { label: "Collectors", path: "/admin/collectors" },
];

const AdminLayout = () => {
  const { pathname } = useLocation();
  const { user, setUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    setUser(null);
    toast.success("Logged out");
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-gray-900 text-white flex flex-col">
        <div className="p-6">
          <h2 className="text-xl font-bold">Admin Panel</h2>
          {user && <p className="text-gray-400 text-sm mt-1">{user.name}</p>}
        </div>
        <nav className="mt-4 flex-1">
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
        <div className="p-6 space-y-3">
          <Link
            to="/"
            className="block text-gray-400 hover:text-white transition text-sm"
          >
            Back to Home
          </Link>
          <button
            type="button"
            onClick={handleLogout}
            className="w-full px-4 py-2 text-red-400 border border-red-400 rounded-lg hover:bg-red-400 hover:text-white transition text-sm"
          >
            Logout
          </button>
        </div>
      </aside>

      <main className="flex-1 bg-gray-100">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
