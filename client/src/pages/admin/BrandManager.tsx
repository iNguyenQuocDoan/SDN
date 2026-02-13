import { useEffect, useState } from "react";
import { getAll } from "../../services/brand.api";

const BrandManager = () => {
  const [brands, setBrands] = useState<unknown[]>([]);

  const fetchBrands = async () => {
    const res = await getAll();
    setBrands(res.data);
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
        >
          + Add Brand
        </button>
      </div>

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
              <tr className="hover:bg-gray-50" key={brand.id}>
                <td className="px-6 py-4">{brand.brandName}</td>
                <td className="px-6 py-4 text-right space-x-2">
                  <button
                    type="button"
                    className="px-3 py-1 text-sm bg-blue-100 text-blue-600 rounded hover:bg-blue-200 transition"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className="px-3 py-1 text-sm bg-red-100 text-red-600 rounded hover:bg-red-200 transition"
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
