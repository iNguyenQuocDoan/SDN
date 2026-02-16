/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { getAll } from "../../services/perfume.api";
import { getAll as getAllBrands } from "../../services/brand.api";

const CardSkeleton = () => (
  <div className="bg-white rounded-xl shadow-md overflow-hidden animate-pulse">
    <div className="h-48 bg-gray-200" />
    <div className="p-6 space-y-3">
      <div className="h-5 bg-gray-200 rounded w-3/4" />
      <div className="h-4 bg-gray-200 rounded w-1/2" />
      <div className="h-4 bg-gray-200 rounded w-1/3" />
      <div className="h-6 bg-gray-200 rounded w-1/4" />
    </div>
  </div>
);

const LandingPage = () => {
  const [perfumes, setPerfumes] = useState<any[]>([]);
  const [brands, setBrands] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      getAll({ limit: 3 }).then((res) => setPerfumes(res.data)),
      getAllBrands().then((res) => setBrands(res.data)),
    ]).finally(() => setLoading(false));
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-purple-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">
            Discover Your Signature Scent
          </h1>
          <p className="text-xl text-purple-200 mb-8">
            Explore our collection of premium perfumes from top brands
          </p>
          <Link
            to="/perfumes"
            className="inline-block px-8 py-3 bg-white text-purple-600 font-semibold rounded-lg hover:bg-purple-50 transition"
          >
            Browse Perfumes
          </Link>
        </div>
      </section>

      {/* Featured Perfumes */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">
          Featured Perfumes
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {loading && Array.from({ length: 3 }).map((_, i) => <CardSkeleton key={i} />)}
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
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-2">
                  {perfume.perfumeName}
                </h3>
                <p className="text-gray-500 text-sm mb-1">
                  {perfume.brand?.brandName}
                </p>
                <p className="text-gray-400 text-sm mb-3">
                  {perfume.volume}ml — {perfume.targetAudience}
                </p>
                <p className="text-purple-600 font-bold text-xl">
                  ${perfume.price}
                </p>
              </div>
            </Link>
          ))}
        </div>
        {!loading && <div className="text-center mt-12">
          <Link
            to="/perfumes"
            className="px-6 py-3 border-2 border-purple-600 text-purple-600 rounded-lg hover:bg-purple-600 hover:text-white transition font-semibold"
          >
            View All Perfumes
          </Link>
        </div>}
      </section>

      {/* Brands Section */}
      <section className="bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Brands</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {loading && Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="bg-white rounded-lg p-8 animate-pulse">
                <div className="h-5 bg-gray-200 rounded w-2/3 mx-auto" />
              </div>
            ))}
            {!loading && brands.map((brand: any) => (
              <Link
                key={brand._id}
                to="/perfumes"
                className="bg-white rounded-lg p-8 text-center shadow-sm hover:shadow-md transition"
              >
                <span className="text-lg font-medium">{brand.brandName}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>

  );
};

export default LandingPage;
