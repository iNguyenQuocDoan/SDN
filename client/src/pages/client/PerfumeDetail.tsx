/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { useParams, Link } from "react-router-dom";
import { toast } from "react-toastify";

import { ArrowLeftIcon } from "@heroicons/react/24/outline";

import { getById, addComment } from "../../services/perfume.api";
import { useAuth } from "../../context/AuthContext";
import { Button } from "@/components/ui/button";

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

const audienceBadgeClass = (target: string) => {
  const map: Record<string, string> = {
    male: "badge badge-male",
    female: "badge badge-female",
    unisex: "badge badge-unisex",
  };
  return map[target] ?? "badge badge-unisex";
};

const RATING_LABELS: Record<number, string> = {
  1: "Fair",
  2: "Good",
  3: "Excellent",
};

/* ── Loading Skeleton ────────────────────────────────────── */

const DetailSkeleton = () => (
  <div className="mx-auto max-w-7xl px-4 pt-4 pb-8 sm:px-6 sm:pt-5">
    <div className="panel animate-pulse overflow-hidden">
      <div className="grid md:grid-cols-2">
        <div className="min-h-[360px] bg-[rgba(104,115,133,0.13)] md:min-h-[500px]" />
        <div className="space-y-5 p-8">
          <div className="h-3 w-20 rounded-full bg-[rgba(104,115,133,0.15)]" />
          <div className="h-9 w-3/4 rounded-lg bg-[rgba(104,115,133,0.15)]" />
          <div className="flex gap-2">
            <div className="h-6 w-16 rounded-full bg-[rgba(188,116,27,0.2)]" />
            <div className="h-6 w-16 rounded-full bg-[rgba(104,115,133,0.13)]" />
          </div>
          <div className="h-4 w-full rounded bg-[rgba(104,115,133,0.12)]" />
          <div className="h-4 w-2/3 rounded bg-[rgba(104,115,133,0.12)]" />
          <div className="space-y-3 pt-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex justify-between">
                <div className="h-4 w-20 rounded bg-[rgba(104,115,133,0.12)]" />
                <div className="h-4 w-24 rounded bg-[rgba(104,115,133,0.12)]" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
);

/* ── Page ────────────────────────────────────────────────── */

const PerfumeDetail = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [perfume, setPerfume] = useState<any>(null);
  const [rating, setRating] = useState(3);
  const [content, setContent] = useState("");

  const fetchPerfume = async () => {
    try {
      const res = await getById(id as string);
      setPerfume(res.data);
    } catch {
      toast.error("Perfume not found");
    }
  };

  useEffect(() => {
    fetchPerfume();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleSubmitComment = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await addComment(id as string, { rating, content });
      toast.success("Review submitted");
      setContent("");
      setRating(3);
      fetchPerfume();
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to submit review");
    }
  };

  if (!perfume) return <DetailSkeleton />;

  const hasCommented = perfume.comments?.some(
    (c: any) => c.author?._id === user?._id,
  );

  const totalReviews: number = perfume.comments?.length ?? 0;
  const avgRating: number | null =
    totalReviews > 0
      ? Math.round(
          perfume.comments.reduce(
            (s: number, c: any) => s + c.rating,
            0,
          ) / totalReviews,
        )
      : null;

  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-5 px-4 pt-2 pb-8 sm:px-6">

      {/* ── PRODUCT HERO ─────────────────────────────────────── */}
      <section className="panel overflow-hidden">
        <div className="grid md:grid-cols-[1fr_1.15fr]">

          {/* Image panel */}
          <div className="relative min-h-55 bg-[rgba(104,115,133,0.09)] md:min-h-90">
            {perfume.uri ? (
              <img
                src={perfume.uri}
                alt={perfume.perfumeName}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full flex-col items-center justify-center gap-3 text-[var(--muted)]">
                <svg
                  width="64"
                  height="88"
                  viewBox="0 0 72 100"
                  fill="none"
                  className="opacity-20"
                  aria-hidden="true"
                >
                  <rect x="24" y="0" width="24" height="14" rx="4" fill="currentColor" />
                  <rect x="28" y="10" width="16" height="6" rx="2" fill="currentColor" opacity="0.6" />
                  <path
                    d="M10 24 Q6 32 6 46 L6 88 Q6 94 12 94 L60 94 Q66 94 66 88 L66 46 Q66 32 62 24 Z"
                    fill="currentColor"
                    opacity="0.35"
                    stroke="currentColor"
                    strokeWidth="1"
                  />
                </svg>
                <p className="text-sm font-medium">No image available</p>
              </div>
            )}
          </div>

          {/* Info panel */}
          <div className="flex flex-col gap-4 p-5 sm:p-6 lg:p-8">

            {/* Brand + back link */}
            <div className="flex items-center justify-between gap-3">
              <p className="eyebrow">{perfume.brand?.brandName}</p>
              <Link
                to="/perfumes"
                className="group inline-flex items-center gap-1.5 rounded-full border border-(--line) bg-white/60 px-3.5 py-1.5 text-xs font-semibold text-(--muted) shadow-sm backdrop-blur-sm transition-all duration-200 hover:border-(--brand) hover:bg-[rgba(188,116,27,0.08)] hover:text-(--brand-strong) hover:shadow-md"
              >
                <ArrowLeftIcon className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-x-0.5" />
                Back to archive
              </Link>
            </div>

            {/* Title */}
            <h1 className="font-display text-3xl leading-tight text-[var(--text)] sm:text-4xl">
              {perfume.perfumeName}
            </h1>

            {/* Tags row */}
            <div className="flex flex-wrap gap-2">
              <span className={concBadgeClass(perfume.concentration)}>
                {perfume.concentration}
              </span>
              <span className={audienceBadgeClass(perfume.targetAudience)}>
                {perfume.targetAudience}
              </span>
              <span className="badge badge-edc">{perfume.volume}ml</span>
            </div>

            {/* Rating summary */}
            {avgRating !== null && (
              <div className="flex items-center gap-2">
                <span className="stars-filled text-lg">
                  {"★".repeat(avgRating)}
                </span>
                <span className="stars-empty text-lg">
                  {"★".repeat(3 - avgRating)}
                </span>
                <span className="text-sm font-semibold text-[var(--muted)]">
                  {totalReviews} review{totalReviews !== 1 ? "s" : ""}
                </span>
              </div>
            )}

            {/* Description */}
            {perfume.description && (
              <p className="border-l-2 border-[color:var(--line)] pl-4 text-sm leading-relaxed text-[var(--muted)]">
                {perfume.description}
              </p>
            )}

            {/* Key facts table */}
            <div className="panel-soft overflow-hidden rounded-2xl divide-y divide-[color:var(--line)]">
              <div className="flex items-center justify-between px-5 py-3.5">
                <span className="text-sm font-medium text-[var(--muted)]">Price</span>
                <span className="text-2xl font-extrabold text-[var(--brand-strong)]">
                  ${perfume.price}
                </span>
              </div>
              <div className="flex items-center justify-between px-5 py-3.5">
                <span className="text-sm font-medium text-[var(--muted)]">Volume</span>
                <span className="text-sm font-bold">{perfume.volume}ml</span>
              </div>
              <div className="flex items-center justify-between px-5 py-3.5">
                <span className="text-sm font-medium text-[var(--muted)]">Concentration</span>
                <span className={concBadgeClass(perfume.concentration)}>
                  {perfume.concentration}
                </span>
              </div>
              <div className="flex items-center justify-between px-5 py-3.5">
                <span className="text-sm font-medium text-[var(--muted)]">For</span>
                <span className={audienceBadgeClass(perfume.targetAudience)}>
                  {perfume.targetAudience}
                </span>
              </div>
            </div>

            {/* Ingredients */}
            {perfume.ingredients && (
              <div className="rounded-xl bg-[rgba(31,93,99,0.07)] px-5 py-4">
                <p className="eyebrow mb-1.5">Ingredients</p>
                <p className="text-sm leading-relaxed text-[var(--muted)]">
                  {perfume.ingredients}
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── REVIEWS ──────────────────────────────────────────── */}
      <section className="space-y-6">
        <div>
          <h2 className="font-display text-3xl">
            Reviews
            {totalReviews > 0 && (
              <span className="ml-2 font-sans text-lg font-bold text-[var(--muted)]">
                ({totalReviews})
              </span>
            )}
          </h2>
        </div>

        <hr className="divider" />

        {/* Write review form */}
        {user && !hasCommented && (
          <div className="panel space-y-5 p-6 sm:p-7">
            <h3 className="font-display text-xl">Write a review</h3>
            <form className="space-y-5" onSubmit={handleSubmitComment}>

              {/* Star rating selector */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-[var(--muted)]">
                  Your rating
                </label>
                <div className="flex items-center gap-1">
                  {[1, 2, 3].map((value) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() => setRating(value)}
                      aria-label={`Rate ${value} star${value > 1 ? "s" : ""}`}
                      className={`text-3xl transition-transform duration-150 hover:scale-125 focus-visible:outline-none ${
                        value <= rating ? "stars-filled" : "stars-empty"
                      }`}
                    >
                      ★
                    </button>
                  ))}
                  <span className="ml-3 rounded-full bg-[rgba(188,116,27,0.12)] px-3 py-1 text-xs font-bold uppercase tracking-wide text-[var(--brand-strong)]">
                    {RATING_LABELS[rating]}
                  </span>
                </div>
              </div>

              {/* Comment */}
              <div>
                <label className="mb-1.5 block text-sm font-semibold text-[var(--muted)]">
                  Your thoughts
                </label>
                <textarea
                  rows={4}
                  className="field"
                  placeholder="Share your experience with this fragrance…"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />
              </div>

              <Button type="submit" size="lg" className="px-7 uppercase tracking-wide">
                Submit review
              </Button>
            </form>
          </div>
        )}

        {/* Already reviewed notice */}
        {user && hasCommented && (
          <div className="panel-soft flex items-center gap-3 rounded-2xl p-4 text-sm text-[var(--muted)]">
            <span className="text-base text-[var(--accent)]">✓</span>
            You've already reviewed this fragrance.
          </div>
        )}

        {/* Sign-in prompt */}
        {!user && (
          <div className="panel-soft flex flex-wrap items-center justify-between gap-4 rounded-2xl p-5">
            <p className="text-sm text-[var(--muted)]">
              Have thoughts on this fragrance? Sign in to leave a review.
            </p>
            <Link
              to="/login"
              className="btn-main rounded-full px-5 py-2 text-xs font-bold uppercase tracking-wide"
            >
              Sign in
            </Link>
          </div>
        )}

        {/* Review list */}
        <div className="space-y-4">
          {totalReviews === 0 && (
            <div className="panel-soft flex flex-col items-center gap-3 rounded-2xl py-12 text-center">
              <p className="font-display text-lg text-[var(--text)]">No reviews yet</p>
              <p className="text-sm text-[var(--muted)]">Be the first to share your experience.</p>
            </div>
          )}

          {perfume.comments?.map((comment: any, index: number) => (
            <div key={index} className="review-card">
              <div className="mb-3 flex flex-wrap items-start justify-between gap-2">
                {/* Author */}
                <div>
                  <p className="font-semibold text-[var(--text)]">{comment.author?.name}</p>
                  <p className="text-xs text-[var(--muted)]">{comment.author?.email}</p>
                </div>
                {/* Stars + label */}
                <div className="flex items-center gap-2">
                  <span className="stars-filled text-base">
                    {"★".repeat(comment.rating)}
                  </span>
                  <span className="stars-empty text-base">
                    {"★".repeat(3 - comment.rating)}
                  </span>
                  <span className="rounded-full bg-[rgba(188,116,27,0.1)] px-2.5 py-0.5 text-xs font-bold text-[var(--brand-strong)]">
                    {RATING_LABELS[comment.rating]}
                  </span>
                </div>
              </div>
              <p className="text-sm leading-relaxed text-[var(--text)]">
                {comment.content}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default PerfumeDetail;
