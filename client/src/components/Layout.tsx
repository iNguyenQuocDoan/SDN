import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

const Layout = () => {
  return (
    <div className="relative flex min-h-screen flex-col overflow-x-hidden">
      <div className="pointer-events-none absolute -left-20 top-20 h-64 w-64 rounded-full bg-[rgba(188,116,27,0.12)] blur-3xl" />
      <div className="pointer-events-none absolute -right-16 top-0 h-72 w-72 rounded-full bg-[rgba(31,93,99,0.14)] blur-3xl" />
      <Header />
      <main className="relative z-10 flex-1 page-entrance">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
