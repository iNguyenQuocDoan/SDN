/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";

import { MagnifyingGlassIcon, ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { StarIcon as StarSolid } from "@heroicons/react/24/solid";
import { Button } from "@/components/ui/button";

import { getAll } from "../../services/perfume.api";
import { getAll as getAllBrands } from "../../services/brand.api";

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
      <div className="h-2.5 w-1/3 rounded-full bg-[rgba(104,115,133,0.14)]" />
      <div className="h-4 w-4/5 rounded-full bg-[rgba(104,115,133,0.14)]" />
      <div className="h-3 w-2/3 rounded-full bg-[rgba(104,115,133,0.12)]" />
      <div className="h-4 w-1/4 rounded-full bg-[rgba(188,116,27,0.15)]" />
    </div>
  </div>
);

/* ── Page ────────────────────────────────────────────────── */

const PerfumeList = () => {
  const [searchParams] = useSearchParams();
  const [perfumes, setPerfumes] = useState<any[]>([]);
  const [brands, setBrands] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [brandFilter, setBrandFilter] = useState(() => searchParams.get("brand") ?? "");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  const fetchPerfumes = async (currentPage = page) => {
    setLoading(true);
    try {
      const query: any = { page: currentPage, limit: 8 };
      if (search) query.search = search;
      if (brandFilter) query.brand = brandFilter;

      const res = await getAll(query);
      setPerfumes(res.data);
      setTotalPages(res.pagination.totalPages);
    } catch {
      setPerfumes([]);
      setTotalPages(1);
      toast.error("Failed to load perfumes");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllBrands().then((res) => setBrands(res.data));
  }, []);

  useEffect(() => {
    fetchPerfumes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, brandFilter]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (page === 1) {
      fetchPerfumes(1);
    } else {
      setPage(1);
    }
  };

  const handleBrandChange = (brandId: string) => {
    setBrandFilter(brandId);
    setPage(1);
  };

  const clearFilters = () => {
    setSearch("");
    setBrandFilter("");
    setPage(1);
  };

  const hasFilters = !!(search || brandFilter);

  return (
    <div className="mx-auto max-w-7xl space-y-5 px-4 pt-4 pb-8 sm:px-6 sm:pt-5">
      {/* ── HEADER + SEARCH BAR ──────────────────────────────── */}
      <section className="panel px-6 py-6 sm:px-8">
        <div className="mb-5 flex items-end justify-between gap-4">
          <div>
            <h1 className="font-display text-4xl italic sm:text-5xl">Perfume Archive</h1>
          </div>
          {!loading && (
            <p className="shrink-0 pb-1 text-sm text-(--muted)">
              {perfumes.length === 0
                ? "No results"
                : `${perfumes.length} fragrance${perfumes.length !== 1 ? "s" : ""}${hasFilters ? " found" : ""}`}
            </p>
          )}
        </div>

        {/* Search + filter row */}
        <form
          className="flex flex-col gap-3 md:flex-row"
          onSubmit={handleSearch}
        >
          {/* Search input with icon */}
          <div className="search-wrap flex-1">
            <MagnifyingGlassIcon className="search-icon" />
            <input
              type="text"
              placeholder="Search by name…"
              className="field min-h-11"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* Brand select — div wrapper controls flex width; .field width:100% fills wrapper */}
          <div className="w-full shrink-0 md:w-44">
            <select
              title="Filter by brand"
              className="field min-h-11"
              value={brandFilter}
              onChange={(e) => handleBrandChange(e.target.value)}
            >
              <option value="">All Brands</option>
              {brands.map((brand: any) => (
                <option key={brand._id} value={brand._id}>
                  {brand.brandName}
                </option>
              ))}
            </select>
          </div>

          <Button type="submit" className="min-h-11 px-6 tracking-wide">
            Search
          </Button>

        </form>

        {/* Active filter chips — animate height with grid-rows trick */}
        <div className={`grid transition-[grid-template-rows] duration-200 ease-in-out ${hasFilters ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
          <div className="overflow-hidden">
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <span className="eyebrow">Active filters:</span>
              {search && (
                <span className="chip chip-active">
                  &ldquo;{search}&rdquo;
                  <button
                    type="button"
                    aria-label="Remove search filter"
                    onClick={() => setSearch("")}
                    className="ml-0.5 opacity-70 hover:opacity-100"
                  >
                    ×
                  </button>
                </span>
              )}
              {brandFilter && (
                <span className="chip chip-active">
                  {brands.find((b) => b._id === brandFilter)?.brandName ?? "Brand"}
                  <button
                    type="button"
                    aria-label="Remove brand filter"
                    onClick={() => handleBrandChange("")}
                    className="ml-0.5 opacity-70 hover:opacity-100"
                  >
                    ×
                  </button>
                </span>
              )}
              {search && brandFilter && (
                <button
                  type="button"
                  onClick={clearFilters}
                  className="ml-1 text-xs text-(--muted) underline-offset-2 hover:text-(--text) hover:underline transition-colors"
                >
                  Clear all
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── PRODUCT GRID ─────────────────────────────────────── */}
      <section className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {loading
          ? Array.from({ length: 8 }).map((_, i) => <CardSkeleton key={i} />)
          : perfumes.map((perfume: any) => {
              const rating = avgRating(perfume.comments);
              return (
                <Link
                  key={perfume._id}
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
                        <svg width="36" height="50" viewBox="0 0 40 56" fill="none" className="opacity-25" aria-hidden="true">
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
                    {/* Price — display italic, not bold */}
                    <p className="font-display italic text-[1.05rem] text-(--brand-strong)">${perfume.price}</p>
                  </div>
                </Link>
              );
            })}
      </section>

      {/* ── EMPTY STATE ───────────────────────────────────────── */}
      {!loading && perfumes.length === 0 && (
        <div className="panel-soft flex flex-col items-center gap-4 rounded-2xl py-16 text-center">
          <svg
            width="48"
            height="48"
            viewBox="0 0 48 48"
            fill="none"
            className="opacity-25 text-(--muted)"
            aria-hidden="true"
          >
            <circle
              cx="21"
              cy="21"
              r="14"
              stroke="currentColor"
              strokeWidth="2.5"
            />
            <path
              d="m32 32 8 8"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <path
              d="M15 21h12M21 15v12"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              opacity="0.5"
            />
          </svg>
          <div>
            <p className="font-display text-xl text-(--text)">
              No results found
            </p>
            <p className="mt-1 text-sm text-(--muted)">
              Try adjusting your search or clear the filters.
            </p>
          </div>
          <Button
            type="button"
            variant="outline"
            size="pill"
            onClick={clearFilters}
            className="px-6 py-2.5"
          >
            Clear all filters
          </Button>
        </div>
      )}

      {/* ── PAGINATION ───────────────────────────────────────── */}
      {totalPages > 1 && (
        <div className="flex flex-wrap justify-center gap-2 pt-2">
          <Button
            variant="outline"
            size="pill"
            onClick={() => { setPage((p) => Math.max(1, p - 1)); window.scrollTo(0, 0); }}
            disabled={page === 1}
            className="min-h-11 px-5"
          >
            <ChevronLeftIcon className="h-4 w-4" /> Prev
          </Button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <Button
              key={p}
              variant={p === page ? "default" : "outline"}
              size="pill"
              onClick={() => { setPage(p); window.scrollTo(0, 0); }}
              className="min-h-11 min-w-11 font-bold"
            >
              {p}
            </Button>
          ))}

          <Button
            variant="outline"
            size="pill"
            onClick={() => { setPage((p) => Math.min(totalPages, p + 1)); window.scrollTo(0, 0); }}
            disabled={page === totalPages}
            className="min-h-11 px-5"
          >
            Next <ChevronRightIcon className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
};

export default PerfumeList;
