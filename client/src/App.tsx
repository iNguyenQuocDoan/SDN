import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Layout from "./components/Layout";
import AdminLayout from "./components/AdminLayout";
import LandingPage from "./pages/client/LandingPage";
import PerfumeList from "./pages/client/PerfumeList";
import Login from "./pages/client/Login";
import Register from "./pages/client/Register";
import PerfumeDetail from "./pages/client/PerfumeDetail";
import Profile from "./pages/client/Profile";
import BrandManager from "./pages/admin/BrandManager";
import PerfumeManager from "./pages/admin/PerfumeManager";
import Collectors from "./pages/admin/Collectors";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";

import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/perfumes" element={<PerfumeList />} />
              <Route path="/perfumes/:id" element={<PerfumeDetail />} />

              {/* protect */}
              <Route element={<ProtectedRoute />}>
                <Route path="/profile" element={<Profile />} />
              </Route>
            </Route>

            <Route element={<AdminRoute />}>
              <Route element={<AdminLayout />}>
                <Route path="/admin/brands" element={<BrandManager />} />
                <Route path="/admin/perfumes" element={<PerfumeManager />} />
                <Route path="/admin/collectors" element={<Collectors />} />
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </>
  );
}

export default App;
