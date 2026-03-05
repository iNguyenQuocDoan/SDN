import { useState } from "react";
import type { FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";

import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

import { useAuth } from "../../context/AuthContext";
import { register, loginWithFirebase } from "../../services/auth.api";
import { registerSchema } from "../../validates/auth.validate";
import { signInWithGoogle } from "../../lib/firebase";
import { Button } from "@/components/ui/button";

/* ── Page ────────────────────────────────────────────────── */

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [YOB, setYOB] = useState(2000);
  const [gender, setGender] = useState(true);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { setUser } = useAuth();
  const navigate = useNavigate();

  const handleGoogleRegister = async () => {
    try {
      const idToken = await signInWithGoogle();
      const res = await loginWithFirebase(idToken);
      setUser(res.data);
      toast.success("Registration success");
      navigate("/");
    } catch (err: any) {
      const msg = err?.code || err?.message || "Google sign-up failed";
      toast.error(msg);
      console.error("Google register error:", err);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrors({});
    try {
      await registerSchema.validate(
        { name, email, password, YOB, gender },
        { abortEarly: false },
      );
      await register({ name, email, password, YOB, gender });
      toast.success("Registration success");
      navigate("/login");
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
        toast.error("Registration failed");
      }
    }
  };

  const fe = (field: string) => errors[field];

  return (
    <div className="mx-auto flex min-h-[70vh] w-full max-w-md items-center px-4 py-6 sm:px-6">
      <div className="panel w-full p-7 sm:p-10">

        {/* Header */}
        <div className="mb-8 text-center">
          <p className="eyebrow mb-2">New Member</p>
          <h1 className="font-display text-4xl">Create account</h1>
          <p className="mt-2 text-sm text-[var(--muted)]">
            Join the fragrance community
          </p>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit}>

          {/* Name */}
          <div>
            <label
              htmlFor="reg-name"
              className="mb-1.5 block text-sm font-semibold text-[var(--muted)]"
            >
              Full name
            </label>
            <input
              id="reg-name"
              type="text"
              className={`field min-h-[48px] ${fe("name") ? "border-[var(--danger)]" : ""}`}
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoComplete="name"
            />
            {fe("name") && (
              <p className="mt-1 text-xs font-semibold text-[var(--danger)]">
                {fe("name")}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="reg-email"
              className="mb-1.5 block text-sm font-semibold text-[var(--muted)]"
            >
              Email address
            </label>
            <input
              id="reg-email"
              type="email"
              className={`field min-h-[48px] ${fe("email") ? "border-[var(--danger)]" : ""}`}
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />
            {fe("email") && (
              <p className="mt-1 text-xs font-semibold text-[var(--danger)]">
                {fe("email")}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="reg-password"
              className="mb-1.5 block text-sm font-semibold text-[var(--muted)]"
            >
              Password
            </label>
            <div className="field-wrap">
              <input
                id="reg-password"
                type={showPw ? "text" : "password"}
                className={`field min-h-[48px] ${fe("password") ? "border-[var(--danger)]" : ""}`}
                placeholder="Create a strong password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="new-password"
              />
              <button
                type="button"
                className="toggle-pw"
                onClick={() => setShowPw((v) => !v)}
                aria-label={showPw ? "Hide password" : "Show password"}
              >
                {showPw ? <EyeSlashIcon className="h-4.5 w-4.5" /> : <EyeIcon className="h-4.5 w-4.5" />}
              </button>
            </div>
            {fe("password") ? (
              <p className="mt-1 text-xs font-semibold text-[var(--danger)]">
                {fe("password")}
              </p>
            ) : (
              <p className="mt-1 text-xs text-[var(--muted)]">
                Min 8 chars · uppercase · lowercase · number · special character
              </p>
            )}
          </div>

          {/* YOB + Gender */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor="reg-yob"
                className="mb-1.5 block text-sm font-semibold text-[var(--muted)]"
              >
                Year of birth
              </label>
              <input
                id="reg-yob"
                type="number"
                className={`field min-h-[48px] ${fe("YOB") ? "border-[var(--danger)]" : ""}`}
                value={YOB}
                min={1900}
                max={new Date().getFullYear()}
                onChange={(e) => setYOB(Number(e.target.value))}
              />
              {fe("YOB") && (
                <p className="mt-1 text-xs font-semibold text-[var(--danger)]">
                  {fe("YOB")}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="reg-gender"
                className="mb-1.5 block text-sm font-semibold text-[var(--muted)]"
              >
                Gender
              </label>
              <select
                id="reg-gender"
                className={`field min-h-[48px] ${fe("gender") ? "border-[var(--danger)]" : ""}`}
                value={String(gender)}
                onChange={(e) => setGender(e.target.value === "true")}
              >
                <option value="true">Male</option>
                <option value="false">Female</option>
              </select>
              {fe("gender") && (
                <p className="mt-1 text-xs font-semibold text-[var(--danger)]">
                  {fe("gender")}
                </p>
              )}
            </div>
          </div>

          <Button type="submit" size="lg" className="w-full py-3 uppercase tracking-wide">
            Create account
          </Button>

          <div className="relative flex items-center">
            <div className="flex-1 border-t border-[color:var(--line)]" />
            <span className="mx-3 text-xs text-[var(--muted)]">or</span>
            <div className="flex-1 border-t border-[color:var(--line)]" />
          </div>

          <button
            type="button"
            onClick={handleGoogleRegister}
            className="flex w-full items-center justify-center gap-3 rounded-xl border border-[color:var(--line)] bg-white py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Sign up with Google
          </button>
        </form>

        {/* Footer */}
        <div className="mt-6 border-t border-[color:var(--line)] pt-6 text-center">
          <p className="text-sm text-[var(--muted)]">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-bold text-[var(--brand-strong)] transition-colors hover:text-[var(--brand)]"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
