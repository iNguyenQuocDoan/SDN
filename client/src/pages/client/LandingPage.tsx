import { Link } from "react-router-dom";

const LandingPage = () => {
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
          <Link
            to="/perfumes/1"
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition"
          >
            <div className="h-48 bg-gray-200 flex items-center justify-center">
              <span className="text-gray-400">Image</span>
            </div>
            <div className="p-6">
              <h3 className="text-lg font-semibold mb-2">Chanel No.5</h3>
              <p className="text-gray-500 text-sm mb-1">Chanel</p>
              <p className="text-gray-400 text-sm mb-3">100ml — Unisex</p>
              <p className="text-purple-600 font-bold text-xl">$120.00</p>
            </div>
          </Link>
        </div>
        <div className="text-center mt-12">
          <Link
            to="/perfumes"
            className="px-6 py-3 border-2 border-purple-600 text-purple-600 rounded-lg hover:bg-purple-600 hover:text-white transition font-semibold"
          >
            View All Perfumes
          </Link>
        </div>
      </section>

      {/* Brands Section */}
      <section className="bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Brands</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <Link
              to="/perfumes"
              className="bg-white rounded-lg p-8 text-center shadow-sm hover:shadow-md transition"
            >
              <span className="text-lg font-medium">Chanel</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
