import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { logout } from "../services/auth.api";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";

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
    <div className="flex min-h-screen flex-col lg:flex-row">
      <aside className="border-b border-[color:var(--line)] bg-[color:rgba(255,249,238,0.92)] p-4 lg:sticky lg:top-0 lg:h-screen lg:w-72 lg:shrink-0 lg:border-b-0 lg:border-r lg:p-6">
        <div className="mb-5">
          <p className="font-display text-2xl leading-none">Admin Studio</p>
          {user && (
            <p className="mt-2 text-sm font-medium text-[var(--muted)]">
              Signed in as {user.name}
            </p>
          )}
        </div>
        <nav className="flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold transition lg:rounded-xl lg:px-4 lg:py-3 ${
                pathname === item.path
                  ? "bg-[var(--accent)] text-white"
                  : "text-[var(--muted)] hover:bg-[color:rgba(31,93,99,0.12)] hover:text-[var(--accent)]"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="mt-4 flex gap-2 lg:mt-8 lg:flex-col">
          <Button variant="outline" size="pill" asChild className="w-full lg:rounded-xl">
            <Link to="/">Back to Home</Link>
          </Button>
          <Button
            variant="destructive"
            size="pill"
            className="w-full lg:rounded-xl"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </div>
      </aside>

      <main id="main-scroll" className="flex-1 overflow-auto p-4 sm:p-6 lg:h-screen">
        <div className="page-entrance mx-auto w-full max-w-6xl">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
