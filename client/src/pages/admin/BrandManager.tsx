/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import * as yup from "yup";

import { create, getAll, update, remove } from "../../services/brand.api";
import { brandSchema } from "../../validates/brand.validate";
import { PageHeader } from "@/components/admin/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
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

const fmtDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

const BrandManager = () => {
  const [brands, setBrands] = useState<any[]>([]);
  const [brandName, setBrandName] = useState("");
  const [createError, setCreateError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingName, setEditingName] = useState("");
  const [editError, setEditError] = useState("");

  const fetchBrands = async () => {
    const res = await getAll();
    setBrands(res.data);
  };

  const handleCreate = async () => {
    try {
      await brandSchema.validate({ brandName });
      setCreateError("");
      await create({ brandName });
      setBrandName("");
      setShowForm(false);
      fetchBrands();
      toast.success("Brand created successfully!");
    } catch (err) {
      if (err instanceof yup.ValidationError) {
        setCreateError(err.message);
      } else {
        toast.error("Failed to create brand. Please try again.");
      }
    }
  };

  const handleUpdate = async (id: string) => {
    if (!editingId) return;
    try {
      await brandSchema.validate({ brandName: editingName });
      setEditError("");
      await update(id, { brandName: editingName });
      setEditingId(null);
      setEditingName("");
      fetchBrands();
      toast.success("Brand updated successfully");
    } catch (err) {
      if (err instanceof yup.ValidationError) {
        setEditError(err.message);
      } else {
        toast.error("Failed to update brand");
      }
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await remove(id);
      fetchBrands();
      toast.success("Brand deleted successfully");
    } catch {
      toast.error("Failed to delete brand");
    }
  };

  useEffect(() => {
    void (async () => {
      await fetchBrands();
    })();
  }, []);

  return (
    <div className="py-4">
      <PageHeader
        title="Brand Management"
        subtitle="All brands "
        actions={
          <Button onClick={() => setShowForm(!showForm)}>
            {showForm ? "Cancel" : "+ Add Brand"}
          </Button>
        }
      />

      {showForm && (
        <Card className="mb-6">
          <CardContent className="pt-6">
            <Label htmlFor="brand-name">Brand Name</Label>
            <Input
              id="brand-name"
              value={brandName}
              onChange={(e) => { setBrandName(e.target.value); setCreateError(""); }}
              placeholder="e.g. Chanel, Dior, Gucci"
              className="mb-1"
              error={!!createError}
              onKeyDown={(e) => e.key === "Enter" && handleCreate()}
            />
            {createError && <p className="mb-3 mt-1 text-xs font-semibold text-(--danger)">{createError}</p>}
            <div className={createError ? "" : "mt-4"}>
              <Button onClick={handleCreate}>Save</Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="table-shell">
        <table className="w-full">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wide text-(--muted)">
                Brand Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wide text-(--muted)">
                Products
              </th>
              <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wide text-(--muted)">
                Created At
              </th>
              <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wide text-(--muted)">
                Updated At
              </th>
              <th className="px-6 py-3 text-right text-xs font-bold uppercase tracking-wide text-(--muted)">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {brands.map((brand: any) => (
              <tr key={brand._id}>
                <td className="px-6 py-4">
                  {editingId === brand._id ? (
                    <div>
                    <Input
                      value={editingName}
                      onChange={(e) => { setEditingName(e.target.value); setEditError(""); }}
                      onKeyDown={(e) =>
                        e.key === "Enter" && handleUpdate(brand._id)
                      }
                      className="max-w-xs"
                      error={!!editError}
                    />
                    {editError && <p className="mt-1 text-xs font-semibold text-(--danger)">{editError}</p>}
                    </div>
                  ) : (
                    <span className="font-semibold">{brand.brandName}</span>
                  )}
                </td>
                <td className="px-6 py-4 text-sm">
                  <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold ${brand.perfumeCount > 0 ? "bg-blue-100 text-blue-700" : "bg-gray-100 text-gray-500"}`}>
                    {brand.perfumeCount ?? 0}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-(--muted)">
                  {brand.createdAt ? fmtDate(brand.createdAt) : "—"}
                </td>
                <td className="px-6 py-4 text-sm text-(--muted)">
                  {brand.updatedAt ? fmtDate(brand.updatedAt) : "—"}
                </td>
                <td className="space-x-2 px-6 py-4 text-right">
                  {editingId === brand._id ? (
                    <>
                      <Button
                        size="sm"
                        className="rounded-lg bg-emerald-500 hover:bg-emerald-600"
                        onClick={() => handleUpdate(brand._id)}
                      >
                        Save
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="rounded-lg"
                        onClick={() => setEditingId(null)}
                      >
                        Cancel
                      </Button>
                    </>
                  ) : (
                    <Button
                      size="sm"
                      variant="ghost"
                      className="rounded-lg bg-sky-100 text-sky-700 hover:bg-sky-200 hover:text-sky-800"
                      onClick={() => {
                        setEditingId(brand._id);
                        setEditingName(brand.brandName);
                      }}
                    >
                      Edit
                    </Button>
                  )}
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="destructive"
                        size="sm"
                        className="rounded-lg"
                      >
                        Delete
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete brand?</AlertDialogTitle>
                        <AlertDialogDescription asChild>
                          <div>
                            {brand.perfumeCount > 0 ? (
                              <>
                                Brand <strong>{brand.brandName}</strong> currently has{" "}
                                <strong>{brand.perfumeCount} product{brand.perfumeCount > 1 ? "s" : ""}</strong>.
                                Deleting this brand will permanently remove all associated perfumes.
                                Do you want to proceed?
                              </>
                            ) : (
                              <>
                                Are you sure you want to permanently delete brand{" "}
                                <strong>{brand.brandName}</strong>?
                              </>
                            )}
                          </div>
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleDelete(brand._id)}
                        >
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
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
