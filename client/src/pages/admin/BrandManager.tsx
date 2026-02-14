/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { create, getAll, update, remove } from "../../services/brand.api";

const BrandManager = () => {
  const [brands, setBrands] = useState<unknown[]>([]);
  const [brandName, setBrandName] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingName, setEditingName] = useState("");

  const fetchBrands = async () => {
    const res = await getAll();
    setBrands(res.data);
  };

  const handleCreate = async () => {
    try {
      await create({ brandName });
      setBrandName("");
      setShowForm(false);
      fetchBrands();
    } catch (err) {
      console.error("Error creating brand: ", err);
      throw err;
    }
  };

  const handleUpdate = async (id: string) => {
    if (!editingId) return;
    await update(id, { brandName: editingName });
    setEditingId(null);
    setEditingName("");
    fetchBrands();
  };

  const handleDelete = async (id: string) => {
    await remove(id);
    fetchBrands();
  };

  useEffect(() => {
    fetchBrands();
  }, []);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Brand Management</h1>
        <button
          type="button"
          className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
          onClick={() => setShowForm(!showForm)}
        >
          + Add Brand
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <input
            type="text"
            value={brandName}
            onChange={(e) => setBrandName(e.target.value)}
            placeholder="Enter brand name"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 mb-4"
          />
          <button
            type="button"
            onClick={handleCreate}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
          >
            Save
          </button>
        </div>
      )}

      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                Brand Name
              </th>
              <th className="px-6 py-3 text-right text-sm font-semibold text-gray-600">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {brands.map((brand: any) => (
              <tr className="hover:bg-gray-50" key={brand._id}>
                <td className="px-6 py-4">
                  {editingId === brand._id ? (
                    <input
                      type="text"
                      value={editingName}
                      onChange={(e) => setEditingName(e.target.value)}
                    />
                  ) : (
                    brand.brandName
                  )}
                </td>
                <td className="px-6 py-4 text-right space-x-2">
                  {editingId === brand._id ? (
                    <>
                      <button
                        type="button"
                        className="px-3 py-1 text-sm bg-green-100 text-green-600 rounded hover:bg-green-200 transition mr-2"
                        onClick={() => handleUpdate(brand._id)}
                      >
                        Save
                      </button>
                      <button
                        type="button"
                        className="px-3 py-1 text-sm bg-gray-100 text-gray-600 rounded hover:bg-gray-200 transition"
                        onClick={() => setEditingId(null)}
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <span className="text-gray-500">No edits in progress</span>
                  )}
                  <button
                    type="button"
                    className="px-3 py-1 text-sm bg-blue-100 text-blue-600 rounded hover:bg-blue-200 transition"
                    onClick={() => {
                      setEditingId(brand._id);
                      setEditingName(brand.brandName);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className="px-3 py-1 text-sm bg-red-100 text-red-600 rounded hover:bg-red-200 transition"
                    onClick={() => handleDelete(brand._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BrandManager;
