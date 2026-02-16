/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState, type FormEvent } from "react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import * as yup from "yup";

import {
  getAll,
  create,
  update,
  remove,
} from "../../services/perfume.api";
import { getAll as getAllBrands } from "../../services/brand.api";
import { perfumeSchema } from "../../validates/perfume.validate";

const emptyForm = {
  perfumeName: "",
  uri: "",
  price: 0,
  concentration: "EDP",
  description: "",
  ingredients: "",
  volume: 0,
  targetAudience: "unisex",
  brand: "",
};

const PerfumeManager = () => {
  const [perfumes, setPerfumes] = useState<any[]>([]);
  const [brands, setBrands] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  const fetchPerfumes = async (currentPage = page) => {
    const res = await getAll({ page: currentPage, limit: 8 });
    setPerfumes(res.data);
    setTotalPages(res.pagination.totalPages);
  };

  useEffect(() => {
    setLoading(true);
    Promise.all([
      getAll({ page, limit: 8 }).then((res) => {
        setPerfumes(res.data);
        setTotalPages(res.pagination.totalPages);
      }),
      getAllBrands().then((res) => setBrands(res.data)),
    ]).finally(() => setLoading(false));
  }, [page]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "price" || name === "volume" ? Number(value) : value,
    }));
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await perfumeSchema.validate(form, { abortEarly: false });
      setErrors({});

      if (editingId) {
        await update(editingId, form);
        toast.success("Perfume updated!");
      } else {
        await create(form);
        toast.success("Perfume created!");
      }
      setForm(emptyForm);
      setShowForm(false);
      setEditingId(null);
      fetchPerfumes();
    } catch (err) {
      if (err instanceof yup.ValidationError) {
        const fieldErrors: Record<string, string> = {};
        err.inner.forEach((e) => {
          if (e.path && !fieldErrors[e.path]) {
            fieldErrors[e.path] = e.message;
          }
        });
        setErrors(fieldErrors);
      } else {
        toast.error((err as any).response?.data?.message || "Failed to save perfume");
      }
    }
  };

  const handleEdit = (perfume: any) => {
    setForm({
      perfumeName: perfume.perfumeName,
      uri: perfume.uri,
      price: perfume.price,
      concentration: perfume.concentration,
      description: perfume.description,
      ingredients: perfume.ingredients,
      volume: perfume.volume,
      targetAudience: perfume.targetAudience,
      brand: perfume.brand?._id || "",
    });
    setEditingId(perfume._id);
    setErrors({});
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This perfume will be deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });
    if (!result.isConfirmed) return;
    try {
      await remove(id);
      fetchPerfumes();
      toast.success("Perfume deleted!");
    } catch {
      toast.error("Failed to delete perfume");
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Perfume Management</h1>
        <button
          type="button"
          className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
          onClick={() => {
            setForm(emptyForm);
            setEditingId(null);
            setErrors({});
            setShowForm(!showForm);
          }}
        >
          {showForm ? "Cancel" : "+ Add Perfume"}
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4">
            {editingId ? "Edit Perfume" : "Add Perfume"}
          </h2>
          <form className="grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={handleSubmit}>
            {/* Perfume Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Perfume Name
              </label>
              <input
                name="perfumeName"
                value={form.perfumeName}
                onChange={handleChange}
                placeholder="e.g. Chanel No.5"
                className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${errors.perfumeName ? "border-red-500" : ""}`}
              />
              {errors.perfumeName && <p className="text-red-500 text-sm mt-1">{errors.perfumeName}</p>}
            </div>

            {/* Image URL + Preview */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Image URL
              </label>
              <input
                name="uri"
                value={form.uri}
                onChange={handleChange}
                placeholder="e.g. https://example.com/image.jpg"
                className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${errors.uri ? "border-red-500" : ""}`}
              />
              {errors.uri && <p className="text-red-500 text-sm mt-1">{errors.uri}</p>}
              {form.uri && (
                <div className="mt-2 border border-gray-200 rounded-lg overflow-hidden w-32 h-32 bg-gray-100">
                  <img
                    src={form.uri}
                    alt="Preview"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = "none";
                    }}
                    onLoad={(e) => {
                      (e.target as HTMLImageElement).style.display = "block";
                    }}
                  />
                </div>
              )}
            </div>

            {/* Price */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Price ($)
              </label>
              <input
                name="price"
                type="number"
                value={form.price}
                onChange={handleChange}
                placeholder="e.g. 120"
                className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${errors.price ? "border-red-500" : ""}`}
              />
              {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price}</p>}
            </div>

            {/* Volume */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Volume (ml)
              </label>
              <input
                name="volume"
                type="number"
                value={form.volume}
                onChange={handleChange}
                placeholder="e.g. 100"
                className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${errors.volume ? "border-red-500" : ""}`}
              />
              {errors.volume && <p className="text-red-500 text-sm mt-1">{errors.volume}</p>}
            </div>

            {/* Concentration */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Concentration
              </label>
              <select
                title="Concentration"
                name="concentration"
                value={form.concentration}
                onChange={handleChange}
                className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${errors.concentration ? "border-red-500" : ""}`}
              >
                <option value="Extrait">Extrait</option>
                <option value="EDP">EDP</option>
                <option value="EDT">EDT</option>
                <option value="EDC">EDC</option>
                <option value="Eau Fraiche">Eau Fraiche</option>
              </select>
              {errors.concentration && <p className="text-red-500 text-sm mt-1">{errors.concentration}</p>}
            </div>

            {/* Target Audience */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Target Audience
              </label>
              <select
                title="Target Audience"
                name="targetAudience"
                value={form.targetAudience}
                onChange={handleChange}
                className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${errors.targetAudience ? "border-red-500" : ""}`}
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="unisex">Unisex</option>
              </select>
              {errors.targetAudience && <p className="text-red-500 text-sm mt-1">{errors.targetAudience}</p>}
            </div>

            {/* Brand */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Brand
              </label>
              <select
                title="Brand"
                name="brand"
                value={form.brand}
                onChange={handleChange}
                className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${errors.brand ? "border-red-500" : ""}`}
              >
                <option value="">-- Select Brand --</option>
                {brands.map((brand: any) => (
                  <option key={brand._id} value={brand._id}>
                    {brand.brandName}
                  </option>
                ))}
              </select>
              {errors.brand && <p className="text-red-500 text-sm mt-1">{errors.brand}</p>}
            </div>

            {/* Ingredients */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Ingredients
              </label>
              <input
                name="ingredients"
                value={form.ingredients}
                onChange={handleChange}
                placeholder="e.g. Aldehydes, Ylang-Ylang, Jasmine"
                className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${errors.ingredients ? "border-red-500" : ""}`}
              />
              {errors.ingredients && <p className="text-red-500 text-sm mt-1">{errors.ingredients}</p>}
            </div>

            {/* Description */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="e.g. A timeless fragrance with floral and powdery notes"
                rows={3}
                className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${errors.description ? "border-red-500" : ""}`}
              />
              {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
            </div>

            <div className="md:col-span-2">
              <button
                type="submit"
                className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
              >
                {editingId ? "Update" : "Create"}
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Image</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Name</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Brand</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Price</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Volume</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Concentration</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Target</th>
              <th className="px-6 py-3 text-right text-sm font-semibold text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {loading && Array.from({ length: 5 }).map((_, i) => (
              <tr key={i} className="animate-pulse">
                <td className="px-6 py-4"><div className="w-12 h-12 bg-gray-200 rounded" /></td>
                <td className="px-6 py-4"><div className="h-4 bg-gray-200 rounded w-24" /></td>
                <td className="px-6 py-4"><div className="h-4 bg-gray-200 rounded w-20" /></td>
                <td className="px-6 py-4"><div className="h-4 bg-gray-200 rounded w-14" /></td>
                <td className="px-6 py-4"><div className="h-4 bg-gray-200 rounded w-12" /></td>
                <td className="px-6 py-4"><div className="h-4 bg-gray-200 rounded w-16" /></td>
                <td className="px-6 py-4"><div className="h-4 bg-gray-200 rounded w-14" /></td>
                <td className="px-6 py-4 text-right"><div className="h-6 bg-gray-200 rounded w-24 ml-auto" /></td>
              </tr>
            ))}
            {!loading && perfumes.map((perfume: any) => (
              <tr className="hover:bg-gray-50" key={perfume._id}>
                <td className="px-6 py-4">
                  {perfume.uri ? (
                    <img src={perfume.uri} alt={perfume.perfumeName} className="w-12 h-12 object-cover rounded" />
                  ) : (
                    <span className="text-gray-400 text-xs">No image</span>
                  )}
                </td>
                <td className="px-6 py-4 font-medium">{perfume.perfumeName}</td>
                <td className="px-6 py-4 text-gray-500">{perfume.brand?.brandName}</td>
                <td className="px-6 py-4 text-purple-600 font-semibold">${perfume.price}</td>
                <td className="px-6 py-4 text-gray-500">{perfume.volume}ml</td>
                <td className="px-6 py-4 text-gray-500">{perfume.concentration}</td>
                <td className="px-6 py-4 text-gray-500">{perfume.targetAudience}</td>
                <td className="px-6 py-4 text-right space-x-2">
                  <button
                    type="button"
                    className="px-3 py-1 text-sm bg-blue-100 text-blue-600 rounded hover:bg-blue-200 transition"
                    onClick={() => handleEdit(perfume)}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className="px-3 py-1 text-sm bg-red-100 text-red-600 rounded hover:bg-red-200 transition"
                    onClick={() => handleDelete(perfume._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-6">
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

export default PerfumeManager;
