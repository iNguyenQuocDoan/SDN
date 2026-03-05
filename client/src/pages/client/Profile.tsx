/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, type FormEvent } from "react";
import { toast } from "react-toastify";

import { useAuth } from "../../context/AuthContext";
import { updateProfile, changePassword } from "../../services/member.api";
import { Button } from "@/components/ui/button";

const Profile = () => {
  const { user, setUser } = useAuth();
  const [name, setName] = useState(user?.name || "");
  const [YOB, setYOB] = useState(user?.YOB || 2000);
  const [gender, setGender] = useState(user?.gender ?? true);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleUpdateProfile = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const res = await updateProfile({ name, YOB, gender });
      setUser(res.data);
      toast.success("Profile updated");
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to update profile");
    }
  };

  const handleChangePassword = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await changePassword({ oldPassword, newPassword });
      toast.success("Password changed");
      setOldPassword("");
      setNewPassword("");
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to change password");
    }
  };

  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-6 px-4 py-8 sm:px-6 sm:py-10">
      <header>
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-[var(--muted)]">
          Account Center
        </p>
        <h1 className="font-display mt-2 text-4xl">My profile</h1>
      </header>

      <section className="panel p-6 sm:p-8">
        <h2 className="mb-4 text-lg font-bold">Profile information</h2>
        <form className="grid gap-4 sm:grid-cols-2" onSubmit={handleUpdateProfile}>
          <div className="sm:col-span-2">
            <label className="mb-1 block text-sm font-semibold text-[var(--muted)]">
              Name
            </label>
            <input
              type="text"
              className="field"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-semibold text-[var(--muted)]">
              Year of Birth
            </label>
            <input
              type="number"
              className="field"
              value={YOB}
              onChange={(e) => setYOB(Number(e.target.value))}
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-semibold text-[var(--muted)]">
              Gender
            </label>
            <select
              title="Gender"
              className="field"
              value={String(gender)}
              onChange={(e) => setGender(e.target.value === "true")}
            >
              <option value="true">Male</option>
              <option value="false">Female</option>
            </select>
          </div>
          <div className="sm:col-span-2">
            <Button type="submit" size="lg">
              Update profile
            </Button>
          </div>
        </form>
      </section>

      <section className="panel p-6 sm:p-8">
        <h2 className="mb-4 text-lg font-bold">Change password</h2>
        <form className="grid gap-4 sm:grid-cols-2" onSubmit={handleChangePassword}>
          <div>
            <label className="mb-1 block text-sm font-semibold text-[var(--muted)]">
              Current password
            </label>
            <input
              type="password"
              className="field"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-semibold text-[var(--muted)]">
              New password
            </label>
            <input
              type="password"
              className="field"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          <div className="sm:col-span-2">
            <Button type="submit" size="lg">
              Change password
            </Button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default Profile;
