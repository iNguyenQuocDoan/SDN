import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { logout } from "../services/auth.api";
import { toast } from "react-toastify";

const Header = () => {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    setUser(null);
    toast.success("Logged out");
    navigate("/login");
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-2xl font-bold text-purple-600">
            Perfume Shop
          </Link>

          <nav className="flex items-center gap-8">
            <Link
              to="/"
              className="text-gray-600 hover:text-purple-600 transition"
            >
              Home
            </Link>
            <Link
              to="/perfumes"
              className="text-gray-600 hover:text-purple-600 transition"
            >
              Perfumes
            </Link>
            {user?.isAdmin && (
              <Link
                to="/admin/brands"
                className="text-gray-600 hover:text-purple-600 transition"
              >
                Admin
              </Link>
            )}
          </nav>

          <div className="flex items-center gap-3">
            {user ? (
              <>
                <Link
                  to="/profile"
                  className="text-gray-600 hover:text-purple-600 transition"
                >
                  {user.name}
                </Link>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="px-4 py-2 text-red-600 border border-red-600 rounded-lg hover:bg-red-50 transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 text-purple-600 border border-purple-600 rounded-lg hover:bg-purple-50 transition"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
