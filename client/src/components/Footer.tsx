import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="footer">
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-12">
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">

        {/* Brand column */}
        <div className="lg:col-span-2">
          <Link to="/" className="group inline-block">
            <p className="font-display text-2xl text-[var(--text)]">Atelier Scent</p>
            <p className="text-[0.6rem] font-bold uppercase tracking-[0.24em] text-[var(--muted)] transition-colors group-hover:text-[var(--brand)]">
              Perfume Archive
            </p>
          </Link>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-[var(--muted)]">
            A curated archive for exploring modern and timeless fragrances.
            Compare concentration, style, and community reviews in one place.
          </p>
        </div>

        {/* Explore */}
        <div>
          <p className="eyebrow mb-4">Explore</p>
          <ul className="space-y-2.5 text-sm">
            <li>
              <Link to="/" className="text-[var(--muted)] transition-colors hover:text-[var(--brand-strong)]">
                Home
              </Link>
            </li>
            <li>
              <Link to="/perfumes" className="text-[var(--muted)] transition-colors hover:text-[var(--brand-strong)]">
                All Perfumes
              </Link>
            </li>
          </ul>
        </div>

        {/* Account */}
        <div>
          <p className="eyebrow mb-4">Account</p>
          <ul className="space-y-2.5 text-sm">
            <li>
              <Link to="/login" className="text-[var(--muted)] transition-colors hover:text-[var(--brand-strong)]">
                Sign in
              </Link>
            </li>
            <li>
              <Link to="/register" className="text-[var(--muted)] transition-colors hover:text-[var(--brand-strong)]">
                Register
              </Link>
            </li>
            <li>
              <Link to="/profile" className="text-[var(--muted)] transition-colors hover:text-[var(--brand-strong)]">
                Profile
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-[color:var(--line)] pt-6 sm:flex-row">
        <p className="text-xs text-[var(--muted)]">
          © {new Date().getFullYear()} Atelier Scent. All rights reserved.
        </p>
        <p className="text-[0.6rem] font-bold uppercase tracking-[0.2em] text-[var(--muted)]">
          Fragrance Archive
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
