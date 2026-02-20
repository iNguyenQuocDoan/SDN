/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import { getAll } from "../../services/perfume.api";
import { getAll as getAllBrands } from "../../services/brand.api";

const CardSkeleton = () => (
  <div className="bg-white rounded-xl shadow-md overflow-hidden animate-pulse">
    <div className="h-48 bg-gray-200" />
    <div className="p-4 space-y-2">
      <div className="h-4 bg-gray-200 rounded w-3/4" />
      <div className="h-3 bg-gray-200 rounded w-1/2" />
      <div className="h-3 bg-gray-200 rounded w-1/3" />
      <div className="h-5 bg-gray-200 rounded w-1/4" />
    </div>
  </div>
);

const PerfumeList = () => {
  const [perfumes, setPerfumes] = useState<any[]>([]);
  const [brands, setBrands] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [brandFilter, setBrandFilter] = useState("");
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
  }, [page, brandFilter]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (page === 1) {
      fetchPerfumes(1);
    } else {
      setPage(1); // useEffect sẽ tự trigger fetchPerfumes
    }
  };

  const handleBrandChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setBrandFilter(e.target.value);
    setPage(1);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Search & Filter */}
      <form
        className="flex flex-col md:flex-row gap-4 mb-8"
        onSubmit={handleSearch}
      >
        <input
          type="text"
          placeholder="Search by perfume name..."
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          title="Filter by brand"
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          value={brandFilter}
          onChange={handleBrandChange}
        >
          <option value="">All Brands</option>
          {brands.map((brand: any) => (
            <option key={brand._id} value={brand._id}>
              {brand.brandName}
            </option>
          ))}
        </select>
        <button
          type="submit"
          className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
        >
          Search
        </button>
      </form>

      {/* Perfume Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {loading && Array.from({ length: 8 }).map((_, i) => <CardSkeleton key={i} />)}
        {!loading && perfumes.map((perfume: any) => (
          <Link
            key={perfume._id}
            to={`/perfumes/${perfume._id}`}
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition"
          >
            <div className="h-48 bg-gray-200 flex items-center justify-center overflow-hidden">
              {perfume.uri ? (
                <img
                  src={perfume.uri}
                  alt={perfume.perfumeName}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-gray-400">Image</span>
              )}
            </div>
            <div className="p-4">
              <h3 className="font-semibold mb-1">{perfume.perfumeName}</h3>
              <p className="text-gray-500 text-sm mb-1">
                {perfume.brand?.brandName}
              </p>
              <p className="text-gray-400 text-xs mb-2">
                {perfume.volume}ml — {perfume.targetAudience}
              </p>
              {perfume.concentration === "Extrait" ? (
                <span className="inline-block px-2 py-0.5 bg-yellow-100 text-yellow-700 text-xs font-semibold rounded mb-2">
                  Extrait
                </span>
              ) : (
                <span className="text-gray-400 text-xs block mb-2">
                  {perfume.concentration}
                </span>
              )}
              <p className="text-purple-600 font-bold">${perfume.price}</p>
            </div>
          </Link>
        ))}
      </div>

      {!loading && perfumes.length === 0 && (
        <p className="text-center text-gray-400 mt-12">No perfumes found.</p>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-8">
          <button
            type="button"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => setPage(p)}
              className={`px-4 py-2 rounded-lg transition ${
                p === page
                  ? "bg-purple-600 text-white"
                  : "border border-gray-300 hover:bg-gray-50"
              }`}
            >
              {p}
            </button>
          ))}
          <button
            type="button"
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default PerfumeList;
