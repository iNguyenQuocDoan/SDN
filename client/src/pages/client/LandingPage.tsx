/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  BeakerIcon,
  SparklesIcon,
  MagnifyingGlassIcon,
  StarIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";

import { getAll } from "../../services/perfume.api";
import { getAll as getAllBrands } from "../../services/brand.api";
import { useAuth } from "../../context/AuthContext";

/* ── Helpers ─────────────────────────────────────────────── */

const concBadgeClass = (conc: string) => {
  const map: Record<string, string> = {
    Extrait: "badge badge-extrait",
    EDP: "badge badge-edp",
    EDT: "badge badge-edt",
    EDC: "badge badge-edc",
    "Eau Fraiche": "badge badge-edc",
  };
  return map[conc] ?? "badge badge-edt";
};

const avgRating = (comments: any[]) =>
  comments?.length > 0
    ? Math.round(
        comments.reduce((s: number, c: any) => s + c.rating, 0) /
          comments.length,
      )
    : null;

/* ── Card Skeleton ───────────────────────────────────────── */

const CardSkeleton = () => (
  <div className="panel-soft overflow-hidden animate-pulse">
    <div className="h-56 bg-[rgba(104,115,133,0.13)]" />
    <div className="space-y-2.5 p-4">
      <div className="h-3 w-1/3 rounded-full bg-[rgba(104,115,133,0.15)]" />
      <div className="h-5 w-4/5 rounded-full bg-[rgba(104,115,133,0.15)]" />
      <div className="h-3 w-1/2 rounded-full bg-[rgba(104,115,133,0.12)]" />
      <div className="flex gap-2 pt-1">
        <div className="h-5 w-16 rounded-full bg-[rgba(188,116,27,0.18)]" />
      </div>
    </div>
  </div>
);

/* ── Product Card ────────────────────────────────────────── */

const ProductCard = ({ perfume }: { perfume: any }) => {
  const rating = avgRating(perfume.comments);

  return (
    <Link
      to={`/perfumes/${perfume._id}`}
      className="panel-soft card-hover group flex flex-col overflow-hidden"
    >
      {/* Image */}
      <div className="h-56 overflow-hidden bg-[rgba(104,115,133,0.09)]">
        {perfume.uri ? (
          <img
            src={perfume.uri}
            alt={perfume.perfumeName}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full flex-col items-center justify-center gap-2 text-[var(--muted)]">
            <BeakerIcon className="h-10 w-10 opacity-20" />
            <span className="text-xs font-medium">No image</span>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex flex-1 flex-col gap-1.5 p-4">
        <p className="eyebrow truncate">{perfume.brand?.brandName}</p>
        <h3 className="font-display text-[1rem] leading-snug text-[var(--text)] line-clamp-2">
          {perfume.perfumeName}
        </h3>
        <div className="mt-auto flex flex-wrap items-center gap-1.5 pt-2">
          <span className={concBadgeClass(perfume.concentration)}>
            {perfume.concentration}
          </span>
          <span className="text-xs text-[var(--muted)]">
            · {perfume.volume}ml
          </span>
        </div>
        {rating !== null && (
          <div className="flex items-center gap-1 text-sm">
            <span className="stars-filled">{"★".repeat(rating)}</span>
            <span className="stars-empty">{"★".repeat(3 - rating)}</span>
            <span className="ml-0.5 text-xs text-[var(--muted)]">
              ({perfume.comments.length})
            </span>
          </div>
        )}
        <p className="text-lg font-extrabold text-[var(--brand-strong)]">
          ${perfume.price}
        </p>
      </div>
    </Link>
  );
};

/* ── Hero Visual Card (right panel) ─────────────────────── */

const HeroVisualCard = () => (
  <div className="relative min-h-[360px] overflow-hidden rounded-3xl lg:min-h-[440px]">
    {/* Layered gradient background */}
    <div className="absolute inset-0 bg-gradient-to-br from-[#1e0f05] via-[#2d1809] to-[#0c1f1f]" />
    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

    {/* Ambient glow blobs */}
    <div className="absolute -right-12 top-6 h-56 w-56 rounded-full bg-[var(--brand)] opacity-20 blur-3xl" />
    <div className="absolute -left-10 bottom-10 h-48 w-48 rounded-full bg-[var(--accent)] opacity-18 blur-3xl" />

    {/* Top badge */}
    <div className="absolute left-5 top-5 z-10">
      <span className="inline-flex items-center gap-2 rounded-full border border-white/18 bg-white/10 px-3.5 py-1.5 text-[0.65rem] font-bold uppercase tracking-[0.18em] text-white/85 backdrop-blur-sm">
        <span className="text-[#d4a55c]">✦</span> Curated Archive
      </span>
    </div>

    {/* Center editorial content */}
    <div className="relative z-10 flex h-full flex-col items-center justify-center px-8 py-20 text-center">
      {/* Monogram decoration */}
      <div className="mb-5 flex items-center gap-3 text-white/25">
        <span className="h-px w-10 bg-white/20" />
        <span className="text-[0.6rem] font-bold uppercase tracking-[0.28em] text-white/40">
          Atelier Scent
        </span>
        <span className="h-px w-10 bg-white/20" />
      </div>

      {/* Icon */}
      <div className="mb-7">
        <BeakerIcon className="h-16 w-16 text-[rgba(240,229,208,0.55)]" />
      </div>

      {/* Editorial headline */}
      <p className="font-display text-3xl italic leading-tight text-white/88 sm:text-4xl">
        The Art
        <br />
        of Scent
      </p>
      <p className="mt-3 text-[0.65rem] font-bold uppercase tracking-[0.28em] text-white/40">
        Fragrance Archive
      </p>
    </div>

    {/* Benefits strip at bottom */}
    <div className="absolute inset-x-4 bottom-4 z-10 rounded-2xl border border-white/10 bg-white/8 p-4 backdrop-blur-md">
      <div className="grid grid-cols-3 gap-2 text-center">
        {[
          { Icon: SparklesIcon, label: "Curated" },
          { Icon: MagnifyingGlassIcon, label: "Detailed" },
          { Icon: StarIcon, label: "Reviewed" },
        ].map(({ Icon, label }) => (
          <div key={label} className="flex flex-col items-center gap-1">
            <Icon className="h-4 w-4 text-[#d4a55c]" />
            <span className="text-[0.62rem] font-bold uppercase tracking-wider text-white/65">
              {label}
            </span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

/* ── Page ────────────────────────────────────────────────── */

const LandingPage = () => {
  const { user } = useAuth();
  const [perfumes, setPerfumes] = useState<any[]>([]);
  const [brands, setBrands] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      getAll({ limit: 4 }).then((res) => setPerfumes(res.data)),
      getAllBrands().then((res) => setBrands(res.data)),
    ]).finally(() => setLoading(false));
  }, []);

  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-10 px-4 pt-4 pb-8 sm:px-6 sm:pt-5 sm:pb-10">
      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="panel relative overflow-hidden px-6 py-10 sm:px-10 sm:py-12">
        {/* Ambient blobs */}
        <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[rgba(188,116,27,0.2)] blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 left-8 h-64 w-64 rounded-full bg-[rgba(31,93,99,0.16)] blur-3xl" />

        <div className="relative z-10 grid w-full gap-10 lg:grid-cols-[1fr_420px] lg:items-start xl:grid-cols-[1fr_460px]">
          {/* Left: text + CTAs */}
          <div>
            <p className="eyebrow mb-3">Curated Fragrance Archive</p>
            <h1 className="font-display text-5xl leading-[1.06] text-[var(--text)] sm:text-6xl lg:text-7xl">
              Discover your
              <br />
              <em className="not-italic text-[var(--brand)]">signature</em>{" "}
              scent.
            </h1>
            <p className="mt-5 max-w-[560px] text-base leading-relaxed text-[var(--muted)] sm:text-lg">
              A focused archive of modern fragrances and timeless classics.
              Compare concentration, style, and reviews — all in one place.
            </p>

            {/* CTA row */}
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Link
                to="/perfumes"
                className="btn-main rounded-full px-7 py-3 text-sm font-bold uppercase tracking-wide"
              >
                Browse Collection
              </Link>
              {!user && (
                <Link
                  to="/register"
                  className="btn-ghost rounded-full px-7 py-3 text-sm font-bold uppercase tracking-wide"
                >
                  Join Community
                </Link>
              )}
            </div>

            {/* Quick-explore chips */}
            <div className="mt-6 flex flex-wrap items-center gap-2">
              <span className="eyebrow mr-1 self-center">Explore:</span>
              {["Extrait", "EDP", "EDT", "For Him", "For Her"].map((tag) => (
                <Link key={tag} to="/perfumes" className="chip">
                  {tag}
                </Link>
              ))}
            </div>
          </div>

          {/* Right: visual card */}
          <HeroVisualCard />
        </div>
      </section>

      {/* ── FEATURED PERFUMES ────────────────────────────────── */}
      <section className="space-y-7">
        <div className="flex items-end justify-between gap-3">
          <div>
            <p className="eyebrow mb-1">Editor's Picks</p>
            <h2 className="font-display text-3xl sm:text-4xl">
              Featured Perfumes
            </h2>
          </div>
          {!loading && (
            <Link
              to="/perfumes"
              className="flex items-center gap-1.5 text-sm font-bold uppercase tracking-wide text-[var(--brand-strong)] transition-colors hover:text-[var(--brand)]"
            >
              View all <ArrowRightIcon className="h-4 w-4" />
            </Link>
          )}
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {loading
            ? Array.from({ length: 4 }).map((_, i) => <CardSkeleton key={i} />)
            : perfumes.map((p) => <ProductCard key={p._id} perfume={p} />)}
        </div>

        {!loading && perfumes.length === 0 && (
          <div className="panel-soft flex flex-col items-center gap-3 rounded-2xl py-14 text-center">
            <p className="font-display text-xl text-[var(--text)]">
              No perfumes yet
            </p>
            <p className="text-sm text-[var(--muted)]">
              Check back soon for new additions.
            </p>
          </div>
        )}
      </section>

      {/* ── BRAND WALL ───────────────────────────────────────── */}
      <section className="panel space-y-7 px-6 py-8 sm:px-8 sm:py-10">
        <div className="flex items-end justify-between gap-3">
          <div>
            <p className="eyebrow mb-1">In the Archive</p>
            <h2 className="font-display text-3xl sm:text-4xl">Brand Wall</h2>
          </div>
          <Link
            to="/perfumes"
            className="text-sm font-bold uppercase tracking-wide text-[var(--brand-strong)] transition-colors hover:text-[var(--brand)]"
          >
            Browse all
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {loading
            ? Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={i}
                  className="h-16 animate-pulse rounded-2xl bg-[rgba(104,115,133,0.12)]"
                />
              ))
            : brands.map((brand: any) => (
                <Link
                  key={brand._id}
                  to="/perfumes"
                  className="flex items-center justify-center rounded-2xl border border-[color:var(--line)] bg-white/60 px-3 py-5 text-center text-xs font-bold uppercase tracking-widest text-[var(--muted)] transition hover:-translate-y-0.5 hover:border-[var(--brand)] hover:bg-[rgba(188,116,27,0.06)] hover:text-[var(--brand-strong)] hover:shadow-sm"
                >
                  {brand.brandName}
                </Link>
              ))}
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
