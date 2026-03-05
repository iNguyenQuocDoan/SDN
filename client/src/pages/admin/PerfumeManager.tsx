/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState, type FormEvent } from "react";
import { toast } from "react-toastify";
import * as yup from "yup";

import { getAll, create, update, remove } from "../../services/perfume.api";
import { getAll as getAllBrands } from "../../services/brand.api";
import { perfumeSchema } from "../../validates/perfume.validate";

import { PageHeader } from "@/components/admin/PageHeader";
import { DataTableCard } from "@/components/admin/DataTableCard";
import { AdminPagination } from "@/components/admin/AdminPagination";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const emptyForm = {
  perfumeName: "",
  uri: "",
  price: 0,
  concentration: "EDP",
  description: "",
  ingredients: "",
  volume: 0,
  targetAudience: "male",
  brand: "",
};

const concentrationVariant: Record<
  string,
  "extrait" | "edp" | "edt" | "edc" | "outline"
> = {
  Extrait: "extrait",
  EDP: "edp",
  EDT: "edt",
  EDC: "edc",
};

const audienceVariant: Record<string, "male" | "female"> = {
  male: "male",
  female: "female",
};

const TH =
  "px-4 py-3 text-left text-xs font-bold uppercase tracking-wide text-(--muted)";
const TD = "px-4 py-3 align-middle";

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
  const [fetchError, setFetchError] = useState(false);
  const [search, setSearch] = useState("");

  const fetchPerfumes = async (currentPage = page) => {
    setLoading(true);
    setFetchError(false);
    try {
      const res = await getAll({ page: currentPage, limit: 8 });
      setPerfumes(res.data);
      setTotalPages(res.pagination.totalPages);
    } catch {
      setFetchError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    setFetchError(false);
    Promise.all([
      getAll({ page, limit: 8 }).then((res) => {
        setPerfumes(res.data);
        setTotalPages(res.pagination.totalPages);
      }),
      getAllBrands().then((res) => setBrands(res.data)),
    ])
      .catch(() => setFetchError(true))
      .finally(() => setLoading(false));
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
        toast.success("Perfume updated");
      } else {
        await create(form);
        toast.success("Perfume created");
      }
      setForm(emptyForm);
      setShowForm(false);
      setEditingId(null);
      fetchPerfumes();
    } catch (err) {
      if (err instanceof yup.ValidationError) {
        const fieldErrors: Record<string, string> = {};
        err.inner.forEach((item) => {
          if (item.path && !fieldErrors[item.path]) {
            fieldErrors[item.path] = item.message;
          }
        });
        setErrors(fieldErrors);
      } else {
        toast.error(
          (err as any).response?.data?.message || "Failed to save perfume",
        );
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
    try {
      await remove(id);
      fetchPerfumes();
      toast.success("Perfume deleted");
    } catch {
      toast.error("Failed to delete perfume");
    }
  };

  const fe = (field: string) => errors[field];

  /* client-side search within the current page */
  const filtered = perfumes.filter(
    (p) =>
      !search ||
      p.perfumeName?.toLowerCase().includes(search.toLowerCase()) ||
      p.brand?.brandName?.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="py-4">
      <PageHeader
        title="Perfume Management"
        subtitle={totalPages > 1 ? `Page ${page} of ${totalPages}` : undefined}
        actions={
          <Button
            onClick={() => {
              setForm(emptyForm);
              setEditingId(null);
              setErrors({});
              setShowForm(!showForm);
            }}
          >
            {showForm ? "Cancel" : "+ Add Perfume"}
          </Button>
        }
      />

      {/* ── Create / Edit form ── */}
      {showForm && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg">
              {editingId ? "Edit Perfume" : "Add Perfume"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form
              className="grid grid-cols-1 gap-4 md:grid-cols-2"
              onSubmit={handleSubmit}
            >
              <div>
                <Label htmlFor="pm-name">Perfume Name</Label>
                <Input
                  id="pm-name"
                  name="perfumeName"
                  value={form.perfumeName}
                  onChange={handleChange}
                  placeholder="e.g. Chanel No.5"
                  error={!!fe("perfumeName")}
                />
                {fe("perfumeName") && (
                  <p className="mt-1 text-xs font-semibold text-(--danger)">
                    {fe("perfumeName")}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="pm-uri">Image URL</Label>
                <Input
                  id="pm-uri"
                  name="uri"
                  value={form.uri}
                  onChange={handleChange}
                  placeholder="https://example.com/image.jpg"
                  error={!!fe("uri")}
                />
                {fe("uri") && (
                  <p className="mt-1 text-xs font-semibold text-(--danger)">
                    {fe("uri")}
                  </p>
                )}
                {form.uri && (
                  <div className="mt-2 h-28 w-28 overflow-hidden rounded-xl border border-(--line) bg-[rgba(104,115,133,0.1)]">
                    <img
                      src={form.uri}
                      alt="Preview"
                      className="h-full w-full object-cover"
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

              <div>
                <Label htmlFor="pm-price">Price ($)</Label>
                <Input
                  id="pm-price"
                  name="price"
                  type="number"
                  value={form.price}
                  onChange={handleChange}
                  error={!!fe("price")}
                />
                {fe("price") && (
                  <p className="mt-1 text-xs font-semibold text-(--danger)">
                    {fe("price")}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="pm-volume">Volume (ml)</Label>
                <Input
                  id="pm-volume"
                  name="volume"
                  type="number"
                  value={form.volume}
                  onChange={handleChange}
                  error={!!fe("volume")}
                />
                {fe("volume") && (
                  <p className="mt-1 text-xs font-semibold text-(--danger)">
                    {fe("volume")}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="pm-concentration">Concentration</Label>
                <Select
                  id="pm-concentration"
                  title="Concentration"
                  name="concentration"
                  value={form.concentration}
                  onChange={handleChange}
                  error={!!fe("concentration")}
                >
                  <option value="Extrait">Extrait</option>
                  <option value="EDP">EDP</option>
                  <option value="EDT">EDT</option>
                  <option value="EDC">EDC</option>
                  <option value="Eau Fraiche">Eau Fraiche</option>
                </Select>
                {fe("concentration") && (
                  <p className="mt-1 text-xs font-semibold text-(--danger)">
                    {fe("concentration")}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="pm-audience">Target Audience</Label>
                <Select
                  id="pm-audience"
                  title="Target Audience"
                  name="targetAudience"
                  value={form.targetAudience}
                  onChange={handleChange}
                  error={!!fe("targetAudience")}
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </Select>
                {fe("targetAudience") && (
                  <p className="mt-1 text-xs font-semibold text-(--danger)">
                    {fe("targetAudience")}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="pm-brand">Brand</Label>
                <Select
                  id="pm-brand"
                  title="Brand"
                  name="brand"
                  value={form.brand}
                  onChange={handleChange}
                  error={!!fe("brand")}
                >
                  <option value="">-- Select Brand --</option>
                  {brands.map((brand: any) => (
                    <option key={brand._id} value={brand._id}>
                      {brand.brandName}
                    </option>
                  ))}
                </Select>
                {fe("brand") && (
                  <p className="mt-1 text-xs font-semibold text-(--danger)">
                    {fe("brand")}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="pm-ingredients">Ingredients</Label>
                <Input
                  id="pm-ingredients"
                  name="ingredients"
                  value={form.ingredients}
                  onChange={handleChange}
                  placeholder="e.g. Jasmine, Cedarwood"
                  error={!!fe("ingredients")}
                />
                {fe("ingredients") && (
                  <p className="mt-1 text-xs font-semibold text-(--danger)">
                    {fe("ingredients")}
                  </p>
                )}
              </div>

              <div className="md:col-span-2">
                <Label htmlFor="pm-description">Description</Label>
                <Textarea
                  id="pm-description"
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  rows={3}
                  error={!!fe("description")}
                />
                {fe("description") && (
                  <p className="mt-1 text-xs font-semibold text-(--danger)">
                    {fe("description")}
                  </p>
                )}
              </div>

              <div className="md:col-span-2">
                <Button type="submit" size="lg">
                  {editingId ? "Update" : "Create"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* ── Data table ── */}
      <DataTableCard
        toolbar={
          <div className="flex items-center gap-3">
            <Input
              placeholder="Search by name or brand…"
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
            onChange={(p) => {
              setPage(p);
              setSearch("");
            }}
          />
        }
      >
        <table className="w-full min-w-205">
          <thead>
            <tr>
              <th className={`${TH} w-15`}>
                Image
              </th>
              <th className={TH}>Name</th>
              <th className={TH}>Brand</th>
              <th className={`${TH} text-right`}>Price</th>
              <th className={`${TH} text-right`}>Volume</th>
              <th className={TH}>Concentration</th>
              <th className={TH}>Target</th>
              <th className={`${TH} text-right`}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* Loading skeleton */}
            {loading &&
              Array.from({ length: 6 }).map((_, i) => (
                <tr key={i} className="animate-pulse">
                  <td className={TD}>
                    <div className="h-11 w-11 rounded-lg bg-[#efe5d3]" />
                  </td>
                  <td className={TD}>
                    <div className="h-4 w-36 rounded bg-[#efe5d3]" />
                  </td>
                  <td className={TD}>
                    <div className="h-4 w-24 rounded bg-[#efe5d3]" />
                  </td>
                  <td className={TD}>
                    <div className="ml-auto h-4 w-14 rounded bg-[#efe5d3]" />
                  </td>
                  <td className={TD}>
                    <div className="ml-auto h-4 w-12 rounded bg-[#efe5d3]" />
                  </td>
                  <td className={TD}>
                    <div className="h-5 w-16 rounded-full bg-[#efe5d3]" />
                  </td>
                  <td className={TD}>
                    <div className="h-5 w-14 rounded-full bg-[#efe5d3]" />
                  </td>
                  <td className={TD}>
                    <div className="ml-auto h-7 w-28 rounded-lg bg-[#efe5d3]" />
                  </td>
                </tr>
              ))}

            {/* Error state */}
            {!loading && fetchError && (
              <tr>
                <td colSpan={8} className="px-4 py-16 text-center">
                  <p className="text-sm font-semibold text-(--danger)">
                    Failed to load perfumes.
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-3"
                    onClick={() => fetchPerfumes(page)}
                  >
                    Retry
                  </Button>
                </td>
              </tr>
            )}

            {/* Empty state */}
            {!loading && !fetchError && filtered.length === 0 && (
              <tr>
                <td colSpan={8} className="px-4 py-16 text-center">
                  {search ? (
                    <p className="text-sm text-(--muted)">
                      No perfumes match &ldquo;{search}&rdquo;
                    </p>
                  ) : (
                    <>
                      <p className="text-sm font-semibold text-(--muted)">
                        No perfumes yet.
                      </p>
                      <Button
                        size="sm"
                        className="mt-3"
                        onClick={() => {
                          setForm(emptyForm);
                          setEditingId(null);
                          setErrors({});
                          setShowForm(true);
                        }}
                      >
                        + Add Perfume
                      </Button>
                    </>
                  )}
                </td>
              </tr>
            )}

            {/* Data rows */}
            {!loading &&
              !fetchError &&
              filtered.map((perfume: any) => (
                <tr key={perfume._id}>
                  <td className={TD}>
                    {perfume.uri ? (
                      <img
                        src={perfume.uri}
                        alt={perfume.perfumeName}
                        className="h-11 w-11 rounded-lg object-cover"
                      />
                    ) : (
                      <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#f7efe0] text-xs text-(--muted)">
                        —
                      </div>
                    )}
                  </td>
                  <td className={`${TD} font-semibold`}>
                    {perfume.perfumeName}
                  </td>
                  <td className={`${TD} text-(--muted)`}>
                    {perfume.brand?.brandName ?? "—"}
                  </td>
                  <td className={`${TD} text-right font-semibold text-(--brand-strong)`}>
                    ${perfume.price}
                  </td>
                  <td className={`${TD} text-right text-(--muted)`}>
                    {perfume.volume}ml
                  </td>
                  <td className={TD}>
                    <Badge
                      variant={
                        concentrationVariant[perfume.concentration] ?? "outline"
                      }
                    >
                      {perfume.concentration}
                    </Badge>
                  </td>
                  <td className={TD}>
                    <Badge
                      variant={
                        audienceVariant[perfume.targetAudience] ?? "outline"
                      }
                    >
                      {perfume.targetAudience}
                    </Badge>
                  </td>
                  <td className={`${TD} text-right`}>
                    <div className="flex items-center justify-end gap-1.5">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="bg-sky-100 text-sky-700 hover:bg-sky-200 hover:text-sky-800"
                        onClick={() => handleEdit(perfume)}
                      >
                        Edit
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="destructive" size="sm">
                            Delete
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete perfume?</AlertDialogTitle>
                            <AlertDialogDescription>
                              <strong>{perfume.perfumeName}</strong> will be
                              permanently removed. This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDelete(perfume._id)}
                            >
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </DataTableCard>
    </div>
  );
};

export default PerfumeManager;
