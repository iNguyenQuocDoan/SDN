import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import LandingPage from "./pages/client/LandingPage";
import PerfumeList from "./pages/client/PerfumeList";
import Login from "./pages/client/Login";
import Register from "./pages/client/Register";
import PerfumeDetail from "./pages/client/PerfumeDetail";
import Profile from "./pages/client/Profile";
import BrandManager from "./pages/admin/BrandManager";
import PerfumeManager from "./pages/admin/PerfumeManager";
import Collectors from "./pages/admin/Collectors";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/perfumes" element={<PerfumeList />} />
            <Route path="/perfumes/:id" element={<PerfumeDetail />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/admin/brands" element={<BrandManager />} />
            <Route path="/admin/perfumes" element={<PerfumeManager />} />
            <Route path="/admin/collectors" element={<Collectors />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
