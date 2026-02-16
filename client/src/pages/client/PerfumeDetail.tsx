/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState, type FormEvent } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

import { getById, addComment } from "../../services/perfume.api";
import { useAuth } from "../../context/AuthContext";

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
  }, [id]);

  const handleSubmitComment = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await addComment(id as string, { rating, content });
      toast.success("Review submitted!");
      setContent("");
      setRating(3);
      fetchPerfume();
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to submit review");
    }
  };

  if (!perfume) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8 animate-pulse">
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/2 h-96 bg-gray-200" />
            <div className="p-8 md:w-1/2 space-y-4">
              <div className="h-4 bg-gray-200 rounded w-1/4" />
              <div className="h-8 bg-gray-200 rounded w-3/4" />
              <div className="h-4 bg-gray-200 rounded w-full" />
              <div className="h-4 bg-gray-200 rounded w-2/3" />
              <div className="space-y-3 mt-6">
                <div className="h-6 bg-gray-200 rounded" />
                <div className="h-6 bg-gray-200 rounded" />
                <div className="h-6 bg-gray-200 rounded" />
                <div className="h-6 bg-gray-200 rounded" />
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8 space-y-4">
          <div className="h-7 bg-gray-200 rounded w-1/4" />
          <div className="bg-white rounded-xl shadow-md p-6 space-y-3">
            <div className="h-4 bg-gray-200 rounded w-1/3" />
            <div className="h-4 bg-gray-200 rounded w-full" />
          </div>
        </div>
      </div>
    );
  }

  const hasCommented = perfume.comments?.some(
    (c: any) => c.author?._id === user?._id,
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Perfume Info */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/2 h-96 bg-gray-200 flex items-center justify-center overflow-hidden">
            {perfume.uri ? (
              <img
                src={perfume.uri}
                alt={perfume.perfumeName}
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-gray-400 text-lg">Image</span>
            )}
          </div>
          <div className="p-8 md:w-1/2">
            <p className="text-purple-600 text-sm font-medium mb-2">
              {perfume.brand?.brandName}
            </p>
            <h1 className="text-3xl font-bold mb-4">{perfume.perfumeName}</h1>
            <p className="text-gray-600 mb-4">{perfume.description}</p>
            <p className="text-gray-500 text-sm mb-6">
              Ingredients: {perfume.ingredients}
            </p>
            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-500">Price</span>
                <span className="text-2xl font-bold text-purple-600">
                  ${perfume.price}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Volume</span>
                <span className="font-medium">{perfume.volume}ml</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Concentration</span>
                {perfume.concentration === "Extrait" ? (
                  <span className="px-3 py-0.5 bg-yellow-100 text-yellow-700 font-semibold rounded">
                    Extrait
                  </span>
                ) : (
                  <span className="font-medium">{perfume.concentration}</span>
                )}
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Target Audience</span>
                <span className="font-medium">{perfume.targetAudience}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Comments Section */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-6">Reviews</h2>

        {/* Comment Form - chỉ hiện khi đã đăng nhập và chưa comment */}
        {user && !hasCommented && (
          <div className="bg-white rounded-xl shadow-md p-6 mb-6">
            <h3 className="text-lg font-semibold mb-4">Write a Review</h3>
            <form className="space-y-4" onSubmit={handleSubmitComment}>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Rating
                </label>
                <div className="flex gap-2">
                  {[1, 2, 3].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className={`text-3xl transition ${
                        star <= rating
                          ? "text-yellow-400"
                          : "text-gray-300"
                      } hover:text-yellow-400`}
                    >
                      ★
                    </button>
                  ))}
                  <span className="ml-2 text-sm text-gray-500 self-center">
                    {rating === 3 ? "Excellent" : rating === 2 ? "Good" : "Poor"}
                  </span>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Comment
                </label>
                <textarea
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Write your review..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
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
        )}

        {!user && (
          <p className="text-gray-400 mb-6">Please login to write a review.</p>
        )}

        {/* Comment List */}
        <div className="space-y-4">
          {perfume.comments?.length === 0 && (
            <p className="text-gray-400">No reviews yet.</p>
          )}
          {perfume.comments?.map((comment: any, index: number) => (
            <div key={index} className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <span className="font-semibold">{comment.author?.name}</span>
                  <span className="text-gray-400 text-sm ml-2">
                    {comment.author?.email}
                  </span>
                </div>
                <span className="text-yellow-400 font-bold text-lg">
                  {"★".repeat(comment.rating)}{"☆".repeat(3 - comment.rating)}
                </span>
              </div>
              <p className="text-gray-600">{comment.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PerfumeDetail;
