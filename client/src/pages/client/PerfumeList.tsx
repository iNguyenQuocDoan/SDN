import { Link } from "react-router-dom";

const PerfumeList = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Search & Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <input
          type="text"
          placeholder="Search by perfume name..."
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500">
          <option value="">All Brands</option>
        </select>
      </div>

      {/* Perfume Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <Link
          to="/perfumes/1"
          className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition"
        >
          <div className="h-48 bg-gray-200 flex items-center justify-center">
            <span className="text-gray-400">Image</span>
          </div>
          <div className="p-4">
            <h3 className="font-semibold mb-1">Chanel No.5</h3>
            <p className="text-gray-500 text-sm mb-1">Chanel</p>
            <p className="text-gray-400 text-xs mb-2">100ml — Eau de Parfum</p>
            <p className="text-purple-600 font-bold">$120.00</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default PerfumeList;
