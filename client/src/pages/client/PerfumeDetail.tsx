const PerfumeDetail = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Perfume Info */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/2 h-96 bg-gray-200 flex items-center justify-center">
            <span className="text-gray-400 text-lg">Image</span>
          </div>
          <div className="p-8 md:w-1/2">
            <p className="text-purple-600 text-sm font-medium mb-2">Chanel</p>
            <h1 className="text-3xl font-bold mb-4">Chanel No.5</h1>
            <p className="text-gray-600 mb-4">
              A timeless fragrance with floral and powdery notes.
            </p>
            <p className="text-gray-500 text-sm mb-6">
              Ingredients: Aldehydes, Ylang-Ylang, Jasmine
            </p>
            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-500">Price</span>
                <span className="text-2xl font-bold text-purple-600">$120.00</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Volume</span>
                <span className="font-medium">100ml</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Concentration</span>
                <span className="font-medium">Eau de Parfum</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Target Audience</span>
                <span className="font-medium">Unisex</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Comments Section */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-6">Reviews</h2>

        {/* Comment Form */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <h3 className="text-lg font-semibold mb-4">Write a Review</h3>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Rating
              </label>
              <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500">
                <option value="3">3 - Excellent</option>
                <option value="2">2 - Good</option>
                <option value="1">1 - Poor</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Comment
              </label>
              <textarea
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Write your review..."
              />
            </div>
            <button
              type="submit"
              className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
            >
              Submit Review
            </button>
          </form>
        </div>

        {/* Comment Item */}
        <div className="space-y-4">
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between mb-3">
              <div>
                <span className="font-semibold">John Doe</span>
                <span className="text-gray-400 text-sm ml-2">john@email.com</span>
              </div>
              <span className="text-yellow-500 font-bold">Rating: 3/3</span>
            </div>
            <p className="text-gray-600">Great perfume! Love the scent.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerfumeDetail;
