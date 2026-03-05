/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";

import { getAll } from "../../services/collector.api";

import { PageHeader } from "@/components/admin/PageHeader";
import { DataTableCard } from "@/components/admin/DataTableCard";
import { AdminPagination } from "@/components/admin/AdminPagination";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const LIMIT = 8;

const TH =
  "px-4 py-3 text-left text-xs font-bold uppercase tracking-wide text-(--muted)";
const TD = "px-4 py-3 align-middle";

const Collectors = () => {
  const [members, setMembers] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(false);
  const [search, setSearch] = useState("");

  const fetchMembers = () => {
    setLoading(true);
    setFetchError(false);
    getAll()
      .then((res) => setMembers(res.data))
      .catch(() => setFetchError(true))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  /* reset to page 1 when search changes */
  useEffect(() => {
    setPage(1);
  }, [search]);

  const filtered = members.filter(
    (m) =>
      !search ||
      m.name?.toLowerCase().includes(search.toLowerCase()) ||
      m.email?.toLowerCase().includes(search.toLowerCase()),
  );

  const totalPages = Math.ceil(filtered.length / LIMIT);
  const paginated = filtered.slice((page - 1) * LIMIT, page * LIMIT);

  return (
    <div className="py-4">
      <PageHeader title="Collectors" subtitle="All registered members" />

      <DataTableCard
        toolbar={
          <div className="flex items-center gap-3">
            <Input
              placeholder="Search by name or email…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-8 max-w-xs text-sm"
            />
            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                className="text-xs text-(--muted) hover:text-(--text)"
              >
                Clear
              </button>
            )}
          </div>
        }
        footer={
          <AdminPagination
            page={page}
            totalPages={totalPages}
            onChange={setPage}
          />
        }
      >
        <table className="w-full min-w-150">
          <thead>
            <tr>
              <th className={TH}>Name</th>
              <th className={TH}>Email</th>
              <th className={`${TH} text-right`}>YOB</th>
              <th className={TH}>Gender</th>
              <th className={TH}>Role</th>
            </tr>
          </thead>
          <tbody>
            {/* Loading skeleton */}
            {loading &&
              Array.from({ length: 6 }).map((_, i) => (
                <tr key={i} className="animate-pulse">
                  <td className={TD}>
                    <div className="h-4 w-28 rounded bg-[#efe5d3]" />
                  </td>
                  <td className={TD}>
                    <div className="h-4 w-40 rounded bg-[#efe5d3]" />
                  </td>
                  <td className={TD}>
                    <div className="ml-auto h-4 w-10 rounded bg-[#efe5d3]" />
                  </td>
                  <td className={TD}>
                    <div className="h-5 w-16 rounded-full bg-[#efe5d3]" />
                  </td>
                  <td className={TD}>
                    <div className="h-5 w-16 rounded-full bg-[#efe5d3]" />
                  </td>
                </tr>
              ))}

            {/* Error state */}
            {!loading && fetchError && (
              <tr>
                <td colSpan={5} className="px-4 py-16 text-center">
                  <p className="text-sm font-semibold text-(--danger)">
                    Failed to load members.
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-3"
                    onClick={fetchMembers}
                  >
                    Retry
                  </Button>
                </td>
              </tr>
            )}

            {/* Empty state */}
            {!loading && !fetchError && filtered.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-16 text-center">
                  <p className="text-sm text-(--muted)">
                    {search
                      ? `No members match "${search}"`
                      : "No members found."}
                  </p>
                </td>
              </tr>
            )}

            {/* Data rows */}
            {!loading &&
              !fetchError &&
              paginated.map((member: any) => (
                <tr key={member._id}>
                  <td className={`${TD} font-medium`}>{member.name}</td>
                  <td className={`${TD} text-(--muted)`}>{member.email}</td>
                  <td className={`${TD} text-right text-(--muted)`}>
                    {member.YOB}
                  </td>
                  <td className={TD}>
                    <Badge variant={member.gender ? "male" : "female"}>
                      {member.gender ? "Male" : "Female"}
                    </Badge>
                  </td>
                  <td className={TD}>
                    <Badge variant={member.isAdmin ? "edp" : "outline"}>
                      {member.isAdmin ? "Admin" : "Member"}
                    </Badge>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </DataTableCard>
    </div>
  );
};

export default Collectors;
