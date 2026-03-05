import { useState } from "react";
import type { FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";

import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

import { useAuth } from "../../context/AuthContext";
import { loginSchema } from "../../validates/auth.validate";
import { login, loginWithFirebase } from "../../services/auth.api";
import { signInWithGoogle } from "../../lib/firebase";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

/* ── Page ────────────────────────────────────────────────── */

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const { setUser } = useAuth();
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    try {
      const idToken = await signInWithGoogle();
      const res = await loginWithFirebase(idToken);
      setUser(res.data);
      toast.success("Login success");
      if (res.data.isAdmin) {
        navigate("/admin/brands");
      } else {
        navigate("/");
      }
    } catch {
      toast.error("Google sign-in failed");
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await loginSchema.validate({ email, password });
      const res = await login({ email, password });
      setUser(res.data);
      toast.success("Login success");
      if (res.data.isAdmin) {
        navigate("/admin/brands");
      } else {
        navigate("/");
      }
    } catch (err) {
      if (err instanceof yup.ValidationError) {
        toast.error(err.message);
      } else {
        toast.error("Invalid email or password");
      }
    }
  };

  return (
    <div className="mx-auto flex min-h-[70vh] w-full max-w-md items-center px-4 py-6 sm:px-6">
      <Card className="w-full p-7 sm:p-10">

        {/* Header */}
        <CardHeader className="mb-8 p-0 text-center">
          <p className="eyebrow mb-2">Welcome Back</p>
          <CardTitle className="text-4xl">Sign in</CardTitle>
          <CardDescription className="mt-2">
            Access your fragrance archive
          </CardDescription>
        </CardHeader>

        <CardContent className="p-0">
          <form className="space-y-5" onSubmit={handleSubmit}>

            {/* Email */}
            <div>
              <Label htmlFor="login-email">Email address</Label>
              <Input
                id="login-email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
              />
            </div>

            {/* Password */}
            <div>
              <Label htmlFor="login-password">Password</Label>
              <div className="field-wrap">
                <Input
                  id="login-password"
                  type={showPw ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className="toggle-pw"
                  onClick={() => setShowPw((v) => !v)}
                  aria-label={showPw ? "Hide password" : "Show password"}
                >
                  {showPw
                    ? <EyeSlashIcon className="h-4.5 w-4.5" />
                    : <EyeIcon className="h-4.5 w-4.5" />}
                </button>
              </div>
            </div>

            <Button type="submit" className="w-full py-3 uppercase tracking-wide">
              Sign in
            </Button>

            <div className="relative flex items-center">
              <div className="flex-1 border-t border-(--line)" />
              <span className="mx-3 text-xs text-(--muted)">or</span>
              <div className="flex-1 border-t border-(--line)" />
            </div>

            <Button
              type="button"
              variant="outline"
              className="w-full gap-3 rounded-xl border-(--line) bg-white py-3 text-gray-700 hover:bg-gray-50"
              onClick={handleGoogleLogin}
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Continue with Google
            </Button>
          </form>
        </CardContent>

        <CardFooter className="mt-6 justify-center border-(--line) px-0 pb-0 pt-6">
          <p className="text-sm text-(--muted)">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="font-bold text-[var(--brand-strong)] transition-colors hover:text-[var(--brand)]"
            >
              Create one
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
