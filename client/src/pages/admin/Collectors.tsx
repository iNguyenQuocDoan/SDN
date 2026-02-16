/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";

import { getAll } from "../../services/collector.api";

const LIMIT = 8;

const Collectors = () => {
  const [members, setMembers] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAll()
      .then((res) => setMembers(res.data))
      .finally(() => setLoading(false));
  }, []);

  const totalPages = Math.ceil(members.length / LIMIT);
  const paginatedMembers = members.slice((page - 1) * LIMIT, page * LIMIT);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Members</h1>

      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Name</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Email</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">YOB</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Gender</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Role</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {loading && Array.from({ length: 5 }).map((_, i) => (
              <tr key={i} className="animate-pulse">
                <td className="px-6 py-4"><div className="h-4 bg-gray-200 rounded w-24" /></td>
                <td className="px-6 py-4"><div className="h-4 bg-gray-200 rounded w-32" /></td>
                <td className="px-6 py-4"><div className="h-4 bg-gray-200 rounded w-12" /></td>
                <td className="px-6 py-4"><div className="h-4 bg-gray-200 rounded w-14" /></td>
                <td className="px-6 py-4"><div className="h-6 bg-gray-200 rounded w-16" /></td>
              </tr>
            ))}
            {!loading && paginatedMembers.map((member: any) => (
              <tr className="hover:bg-gray-50" key={member._id}>
                <td className="px-6 py-4 font-medium">{member.name}</td>
                <td className="px-6 py-4 text-gray-500">{member.email}</td>
                <td className="px-6 py-4">{member.YOB}</td>
                <td className="px-6 py-4">{member.gender ? "Male" : "Female"}</td>
                <td className="px-6 py-4">
                  {member.isAdmin ? (
                    <span className="px-2 py-1 text-xs bg-purple-100 text-purple-600 rounded">Admin</span>
                  ) : (
                    <span className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded">Member</span>
                  )}
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

export default Collectors;
