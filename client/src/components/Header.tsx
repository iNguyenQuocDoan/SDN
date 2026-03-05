import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  HomeIcon,
  BeakerIcon,
  Cog6ToothIcon,
  UserIcon,
  ArrowRightOnRectangleIcon,
  ArrowLeftOnRectangleIcon,
  UserPlusIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

import { useAuth } from "../context/AuthContext";
import { logout } from "../services/auth.api";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";

/* ── Header ──────────────────────────────────────────────── */

const Header = () => {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    setUser(null);
    toast.success("Logged out");
    navigate("/login");
    setMenuOpen(false);
  };

  const navClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold transition ${
      isActive
        ? "bg-[rgba(188,116,27,0.16)] text-[var(--brand-strong)]"
        : "text-[var(--muted)] hover:bg-[rgba(188,116,27,0.1)] hover:text-[var(--text)]"
    }`;

  return (
    <header className="sticky top-0 z-50 border-b border-[color:var(--line)] bg-[rgba(255,252,245,0.9)] backdrop-blur-md">
      {/*
        3-column flex layout — nav stays in true center:
        [flex-1 logo] · [auto nav] · [flex-1 CTA right-aligned]
      */}
      <div className="mx-auto flex max-w-7xl items-center px-4 py-3 sm:px-6">

        {/* ── Col 1: Logo ───────────────────── */}
        <div className="flex-1">
          <Link
            to="/"
            className="group inline-block"
            onClick={() => setMenuOpen(false)}
          >
            <p className="font-display text-xl leading-none text-[var(--text)] sm:text-2xl">
              Atelier Scent
            </p>
            <p className="text-[0.6rem] font-bold uppercase tracking-[0.24em] text-[var(--muted)] transition-colors group-hover:text-[var(--brand)]">
              Perfume Archive
            </p>
          </Link>
        </div>

        {/* ── Col 2: Nav (centered) ─────────── */}
        <nav className="hidden items-center gap-1 md:flex">
          <NavLink to="/" end className={navClass}>
            <HomeIcon className="h-4 w-4" />
            Home
          </NavLink>
          <NavLink to="/perfumes" className={navClass}>
            <BeakerIcon className="h-4 w-4" />
            Perfumes
          </NavLink>
          {user?.isAdmin && (
            <NavLink to="/admin/brands" className={navClass}>
              <Cog6ToothIcon className="h-4 w-4" />
              Admin
            </NavLink>
          )}
        </nav>

        {/* ── Col 3: CTA + hamburger ────────── */}
        <div className="flex flex-1 items-center justify-end gap-2">

          {/* Desktop CTA */}
          <div className="hidden items-center gap-2 md:flex">
            {user ? (
              <>
                <Link
                  to="/profile"
                  className="flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold text-[var(--accent)] transition hover:bg-[rgba(31,93,99,0.1)]"
                >
                  <UserIcon className="h-4 w-4" />
                  {user.name}
                </Link>
                <Button
                  variant="destructive"
                  size="pill"
                  onClick={handleLogout}
                >
                  <ArrowLeftOnRectangleIcon className="h-4 w-4" />
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="btn-ghost flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold"
                >
                  <ArrowRightOnRectangleIcon className="h-4 w-4" />
                  Login
                </Link>
                <Link
                  to="/register"
                  className="btn-main flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold"
                >
                  <UserPlusIcon className="h-4 w-4" />
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            type="button"
            aria-label={menuOpen ? "Close navigation" : "Open navigation"}
            onClick={() => setMenuOpen((v) => !v)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[color:var(--line)] bg-[rgba(255,253,248,0.8)] text-[var(--muted)] transition hover:text-[var(--text)] md:hidden"
          >
            {menuOpen
              ? <XMarkIcon className="h-5 w-5" />
              : <Bars3Icon className="h-5 w-5" />
            }
          </button>
        </div>
      </div>

      {/* ── Mobile drawer ─────────────────────── */}
      {menuOpen && (
        <div className="border-t border-[color:var(--line)] bg-[rgba(255,252,245,0.97)] px-4 pb-5 pt-3 md:hidden">
          <nav className="flex flex-col gap-1">
            <NavLink to="/" end className={navClass} onClick={() => setMenuOpen(false)}>
              <HomeIcon className="h-4 w-4" />
              Home
            </NavLink>
            <NavLink to="/perfumes" className={navClass} onClick={() => setMenuOpen(false)}>
              <BeakerIcon className="h-4 w-4" />
              Perfumes
            </NavLink>
            {user?.isAdmin && (
              <NavLink to="/admin/brands" className={navClass} onClick={() => setMenuOpen(false)}>
                <Cog6ToothIcon className="h-4 w-4" />
                Admin
              </NavLink>
            )}
          </nav>
          <div className="mt-3 flex flex-col gap-2 border-t border-[color:var(--line)] pt-3">
            {user ? (
              <>
                <Link
                  to="/profile"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold text-[var(--accent)] transition hover:bg-[rgba(31,93,99,0.1)]"
                >
                  <UserIcon className="h-4 w-4" />
                  {user.name}
                </Link>
                <Button
                  variant="destructive"
                  size="pill"
                  onClick={handleLogout}
                >
                  <ArrowLeftOnRectangleIcon className="h-4 w-4" />
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setMenuOpen(false)}
                  className="btn-ghost flex items-center justify-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold"
                >
                  <ArrowRightOnRectangleIcon className="h-4 w-4" />
                  Login
                </Link>
                <Link
                  to="/register"
                  onClick={() => setMenuOpen(false)}
                  className="btn-main flex items-center justify-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold"
                >
                  <UserPlusIcon className="h-4 w-4" />
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
