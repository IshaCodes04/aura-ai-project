import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import AuthLayout from "@/components/AuthLayout";
import axios from "axios";

const Signup = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "https://aura-ai-a4wr.onrender.com";

  // ✅ Google Login Handler
  const handleGoogleLogin = () => {
    window.open(`${BACKEND_URL}/api/auth/google`, "_self");
  };

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      setSubmitting(true);

      const res = await axios.post(
        `${BACKEND_URL}/api/auth/register`,
        {
          email: form.email,
          fullName: {
            firstName: form.firstname,
            lastName: form.lastname,
          },
          password: form.password,
          confirmPassword: form.confirmPassword,
        },
        { withCredentials: true }
      );

      console.log("Signup response:", res);

      if (res.status === 201 || res.status === 200) {
        // Token save karo agar response mein hai
        if (res.data.token) {
          localStorage.setItem("token", res.data.token);
        }
        navigate("/chat");
      }
    } catch (err: any) {
      console.error("Signup error:", err);
      alert(err?.response?.data?.message || "Registration failed");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <AuthLayout
      title="Create Your"
      titleHighlight="Aura AI Account"
      subtitle="Join thousands of users using Aura AI to simplify tasks and boost productivity with intelligent automation."
      supportingText="Start free. Upgrade anytime. No credit card required."
    >
      <form onSubmit={handleSubmit} className="space-y-3">
        <h2 className="text-2xl font-bold text-card-foreground text-center mb-5">
          Create Account
        </h2>

        {/* First Name */}
        <div>
          <label className="block text-sm font-semibold text-card-foreground mb-2">
            Firstname
          </label>
          <input
            type="text"
            placeholder="John Doe"
            className="input-field"
            value={form.firstname}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setForm({ ...form, firstname: e.target.value })}
            required
          />
        </div>

        {/* Last Name */}
        <div>
          <label className="block text-sm font-semibold text-card-foreground mb-2">
            Lastname
          </label>
          <input
            type="text"
            placeholder="John Doe"
            className="input-field"
            value={form.lastname}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setForm({ ...form, lastname: e.target.value })}
            required
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-semibold text-card-foreground mb-2">
            Email
          </label>
          <input
            type="email"
            placeholder="your@email.com"
            className="input-field"
            value={form.email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setForm({ ...form, email: e.target.value })}
            required
          />
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm font-semibold text-card-foreground mb-2">
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              className="input-field pr-12"
              value={form.password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setForm({ ...form, password: e.target.value })}
              required
            />
            <button
              type="button"
              className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Confirm Password */}
        <div>
          <label className="block text-sm font-semibold text-card-foreground mb-2">
            Confirm Password
          </label>
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="••••••••"
              className="input-field pr-12"
              value={form.confirmPassword}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setForm({ ...form, confirmPassword: e.target.value })
              }
              required
            />
            <button
              type="button"
              className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Sign Up Button */}
        <button type="submit" className="btn-primary w-full mt-3">
          Sign Up
        </button>

        {/* Divider */}
        <div className="my-3 flex items-center gap-4">
          <div className="h-px flex-1 bg-border" />
          <span className="text-sm text-muted-foreground">
            or continue with
          </span>
          <div className="h-px flex-1 bg-border" />
        </div>

        {/* Google Login Button */}
        <div className="space-y-3">
          <button
            type="button"
            className="btn-social"
            onClick={handleGoogleLogin}
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Continue with Google
          </button>
        </div>

        {/* Login Link */}
        <p className="text-center text-muted-foreground mt-4">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-orange-500 hover:text-orange-600 font-bold transition-colors"
          >
            Log in
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
};

export default Signup;
