/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  SparklesIcon,
  MagnifyingGlassIcon,
  StarIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";
import { StarIcon as StarSolid } from "@heroicons/react/24/solid";

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
    <div className="h-52 bg-[rgba(104,115,133,0.13)]" />
    <div className="space-y-2 p-3.5">
      <div className="h-2.5 w-1/3 rounded-full bg-[rgba(104,115,133,0.15)]" />
      <div className="h-4 w-4/5 rounded-full bg-[rgba(104,115,133,0.15)]" />
      <div className="h-3 w-2/3 rounded-full bg-[rgba(104,115,133,0.12)]" />
      <div className="h-4 w-1/4 rounded-full bg-[rgba(188,116,27,0.15)]" />
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
      <div className="relative h-52 overflow-hidden bg-[rgba(104,115,133,0.09)]">
        {perfume.uri ? (
          <img
            src={perfume.uri}
            alt={perfume.perfumeName}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          />
        ) : (
          <div className="flex h-full flex-col items-center justify-center gap-2 text-(--muted)">
            <svg width="32" height="44" viewBox="0 0 40 56" fill="none" className="opacity-20" aria-hidden="true">
              <rect x="14" y="0" width="12" height="8" rx="2" fill="currentColor" />
              <path d="M8 12 Q4 16 4 24 L4 48 Q4 52 8 52 L32 52 Q36 52 36 48 L36 24 Q36 16 32 12 Z" fill="currentColor" opacity="0.6" />
            </svg>
            <span className="text-xs font-medium">No image</span>
          </div>
        )}
        {/* Gradient overlay */}
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-linear-to-t from-black/25 to-transparent" />
      </div>

      {/* Info */}
      <div className="flex flex-1 flex-col gap-1 p-3.5">
        <div className="flex items-center justify-between gap-2">
          <p className="eyebrow truncate">{perfume.brand?.brandName}</p>
          <span className={`${concBadgeClass(perfume.concentration)} shrink-0 text-[10px]`}>
            {perfume.concentration}
          </span>
        </div>
        <h3 className="font-display text-[0.95rem] leading-snug text-(--text) line-clamp-2">
          {perfume.perfumeName}
        </h3>
        {/* Rating + volume — same line */}
        <div className="mt-auto flex items-center gap-2 pt-2">
          {rating !== null ? (
            <div className="flex items-center gap-0.5">
              {Array.from({ length: 3 }).map((_, i) => (
                <StarSolid
                  key={i}
                  className={`h-3 w-3 ${i < rating ? "text-(--brand)" : "text-[rgba(104,115,133,0.25)]"}`}
                />
              ))}
              <span className="ml-0.5 text-[11px] text-(--muted)">({perfume.comments.length})</span>
            </div>
          ) : (
            <span className="text-[11px] text-(--muted)">No reviews</span>
          )}
          <span className="text-[11px] text-(--muted)">· {perfume.volume}ml</span>
        </div>
        <p className="font-display italic text-[1.05rem] text-(--brand-strong)">${perfume.price}</p>
      </div>
    </Link>
  );
};

/* ── Archive Spotlight Card (hero right panel) ───────────── */

const ArchiveSpotlightCard = () => (
  <Link
    to="/perfumes"
    className="group relative block min-h-[360px] overflow-hidden rounded-3xl lg:min-h-[440px]"
  >
    <img
      src="/hero.png"
      alt="The Fragrance Archive"
      className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
    />

    {/* Overlays */}
    <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-black/10" />
    <div className="absolute -right-12 top-6 h-56 w-56 rounded-full bg-[var(--brand)] opacity-15 blur-3xl" />

    {/* Top badge */}
    <div className="absolute left-5 top-5 z-10">
      <span className="inline-flex items-center gap-1.5 rounded-full border border-white/18 bg-white/10 px-3 py-1.5 text-[0.62rem] font-bold uppercase tracking-[0.18em] text-white/80 backdrop-blur-sm">
        <SparklesIcon className="h-3 w-3 text-[#d4a55c]" /> Archive Spotlight
      </span>
    </div>

    {/* Bottom content */}
    <div className="absolute inset-x-0 bottom-0 z-10 p-5">
      <p className="mb-1 text-[0.58rem] font-bold uppercase tracking-[0.22em] text-white/50">
        Atelier Scent
      </p>
      <p className="font-display italic text-2xl leading-snug text-white/92 sm:text-3xl">
        The Fragrance<br />Archive
      </p>
      <div className="mt-3 flex items-center justify-end">
        <span className="flex items-center gap-1 text-[0.68rem] font-bold uppercase tracking-wider text-white/50 transition-colors group-hover:text-white/85">
          Browse <ArrowRightIcon className="h-3 w-3" />
        </span>
      </div>
    </div>
  </Link>
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
    <div className="mx-auto flex max-w-7xl flex-col gap-10 px-4 pt-4 pb-0 sm:px-6 sm:pt-5">
      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="panel relative overflow-hidden px-6 py-10 sm:px-10 sm:py-12">
        {/* Ambient blobs */}
        <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[rgba(188,116,27,0.2)] blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 left-8 h-64 w-64 rounded-full bg-[rgba(31,93,99,0.16)] blur-3xl" />

        <div className="relative z-10 grid w-full gap-10 lg:grid-cols-[1fr_380px] lg:items-start xl:grid-cols-[1fr_420px]">
          {/* Left: text + CTAs */}
          <div>
            <p className="eyebrow mb-3">The Fragrance Archive</p>
            <h1 className="font-display text-5xl leading-[1.06] text-(--text) sm:text-6xl lg:text-7xl">
              Every scent,
              <br />
              <em className="not-italic text-(--brand)">precisely</em>{" "}
              catalogued.
            </h1>
            <p className="mt-5 max-w-[520px] text-base leading-relaxed text-(--muted) sm:text-lg">
              Browse by house, concentration, or character.
              Community-reviewed. Curator-selected.
            </p>

            {/* CTA row */}
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Link
                to="/perfumes"
                className="btn-main rounded-full px-7 py-3 text-sm font-bold uppercase tracking-wide"
              >
                Browse the Archive
              </Link>
              {!user && (
                <Link
                  to="/register"
                  className="btn-ghost rounded-full px-7 py-3 text-sm font-bold uppercase tracking-wide"
                >
                  Join the Community
                </Link>
              )}
            </div>

            {/* Feature highlights */}
            <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2">
              {[
                { Icon: SparklesIcon, label: "Curator-selected" },
                { Icon: StarIcon,     label: "Community reviews" },
                { Icon: MagnifyingGlassIcon, label: "Filter by house & concentration" },
              ].map(({ Icon, label }) => (
                <span key={label} className="flex items-center gap-1.5 text-sm text-(--muted)">
                  <Icon className="h-4 w-4 shrink-0 text-(--brand)" />
                  {label}
                </span>
              ))}
            </div>
          </div>

          {/* Right: archive spotlight */}
          <ArchiveSpotlightCard />
        </div>
      </section>

      {/* ── FEATURED PERFUMES ────────────────────────────────── */}
      <section className="space-y-7">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="eyebrow mb-1">Editor's Picks</p>
            <h2 className="font-display text-3xl italic sm:text-4xl">The Edit</h2>
          </div>
          {!loading && (
            <Link
              to="/perfumes"
              className="flex items-center gap-1.5 text-sm font-bold uppercase tracking-wide text-(--brand-strong) transition-colors hover:text-(--brand)"
            >
              Explore the archive <ArrowRightIcon className="h-4 w-4" />
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
            <p className="font-display text-xl text-(--text)">No perfumes yet</p>
            <p className="text-sm text-(--muted)">Check back soon for new additions.</p>
          </div>
        )}
      </section>

      {/* ── BRAND WALL ───────────────────────────────────────── */}
      <section className="panel space-y-5 px-6 py-6 sm:px-8 sm:py-7">
        <div className="flex items-end justify-between gap-3">
          <div>
            <p className="eyebrow mb-1">The Houses</p>
            <h2 className="font-display text-3xl italic sm:text-4xl">Browse by House</h2>
          </div>
          <Link
            to="/perfumes"
            className="text-sm font-bold uppercase tracking-wide text-(--brand-strong) transition-colors hover:text-(--brand)"
          >
            All fragrances
          </Link>
        </div>

        <div className="overflow-hidden py-2 -my-2">
          {loading ? (
            <div className="flex gap-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={i}
                  className="h-14 min-w-36 shrink-0 animate-pulse rounded-2xl bg-[rgba(104,115,133,0.12)]"
                />
              ))}
            </div>
          ) : (
            <div className="animate-marquee flex gap-3 w-max">
              {[...brands, ...brands].map((brand: any, i: number) => (
                <Link
                  key={`${brand._id}-${i}`}
                  to={`/perfumes?brand=${brand._id}`}
                  className="flex min-h-14 min-w-36 shrink-0 items-center justify-center rounded-2xl border border-[color:var(--line)] bg-white/60 px-4 py-3 text-center text-xs font-bold uppercase tracking-widest text-(--muted) transition hover:-translate-y-0.5 hover:border-(--brand) hover:bg-[rgba(188,116,27,0.06)] hover:text-(--brand-strong) hover:shadow-sm"
                >
                  {brand.brandName}
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
