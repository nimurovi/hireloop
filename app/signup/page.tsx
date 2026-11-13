"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Briefcase, Building2, ShieldCheck, Eye, EyeOff, Loader2 } from "lucide-react";

const roles = [
  {
    value: "jobseeker",
    label: "Job Seeker",
    description: "Find your dream job",
    icon: Briefcase,
  },
  {
    value: "recruiter",
    label: "Recruiter",
    description: "Hire top talent",
    icon: Building2,
  },
  {
    value: "admin",
    label: "Admin",
    description: "Manage the platform",
    icon: ShieldCheck,
  },
];

export default function SignUp() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [selectedRole, setSelectedRole] = useState("jobseeker");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setSuccess("");

    const formData = new FormData(event.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    if (!name || !email || !password || !confirmPassword) {
      setError("Please fill in all required fields.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    if (!passwordRegex.test(password)) {
      setError("Password must contain uppercase and lowercase letters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      const { data, error: authError } = await authClient.signUp.email({
        name,
        email,
        password,
        // Better Auth additional field configured in lib/auth.ts
        role: selectedRole,
      });

      if (authError) {
        setError(authError.message || "Registration failed.");
        return;
      }

      if (data) {
        setSuccess("Account created successfully!");
        setTimeout(() => {
          router.push("/");
          router.refresh();
        }, 1000);
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#08090b] px-4 py-10">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="mb-8 text-center">
          <Link href="/" className="mb-6 inline-block">
            <Image src="/logo.png" alt="HireLoop" width={120} height={36} />
          </Link>
          <h2 className="text-2xl font-bold text-white">Create an Account</h2>
          <p className="mt-2 text-sm text-gray-400">
            Join HireLoop and take the next step in your career.
          </p>
        </div>

        {/* Card */}
        <div className="rounded-2xl border border-white/10 bg-[#111316] p-6 sm:p-8">
          {/* Error / Success messages */}
          {error && (
            <div className="mb-4 rounded-lg bg-red-500/10 px-4 py-3 text-sm text-red-400">
              {error}
            </div>
          )}
          {success && (
            <div className="mb-4 rounded-lg bg-green-500/10 px-4 py-3 text-sm text-green-400">
              {success}
            </div>
          )}

          {/* Role Selector */}
          <div className="mb-6">
            <label className="mb-3 block text-sm font-medium text-gray-300">
              I want to join as
            </label>
            <div className="grid grid-cols-3 gap-2">
              {roles.map((role) => {
                const Icon = role.icon;
                const isSelected = selectedRole === role.value;
                return (
                  <button
                    key={role.value}
                    type="button"
                    onClick={() => setSelectedRole(role.value)}
                    className={`flex flex-col items-center gap-1.5 rounded-xl border p-3 text-center transition-all ${
                      isSelected
                        ? "border-[#6c47ff] bg-[#6c47ff]/10 text-white"
                        : "border-white/10 bg-white/5 text-gray-400 hover:border-white/20"
                    }`}
                  >
                    <Icon className={`h-5 w-5 ${isSelected ? "text-[#6c47ff]" : ""}`} />
                    <span className="text-xs font-medium">{role.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-300">
                Full Name
              </label>
              <input
                name="name"
                type="text"
                placeholder="Enter your full name"
                required
                className="h-11 w-full rounded-lg border border-white/10 bg-white/5 px-4 text-sm text-white placeholder:text-gray-500 outline-none transition focus:border-[#6c47ff] focus:ring-2 focus:ring-[#6c47ff]/20"
              />
            </div>

            {/* Email */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-300">
                Email Address
              </label>
              <input
                name="email"
                type="email"
                placeholder="you@example.com"
                required
                className="h-11 w-full rounded-lg border border-white/10 bg-white/5 px-4 text-sm text-white placeholder:text-gray-500 outline-none transition focus:border-[#6c47ff] focus:ring-2 focus:ring-[#6c47ff]/20"
              />
            </div>

            {/* Password */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-300">
                Password
              </label>
              <div className="relative">
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  required
                  className="h-11 w-full rounded-lg border border-white/10 bg-white/5 px-4 pr-10 text-sm text-white placeholder:text-gray-500 outline-none transition focus:border-[#6c47ff] focus:ring-2 focus:ring-[#6c47ff]/20"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              <p className="mt-1.5 text-xs text-gray-500">
                Min 6 chars, with uppercase and lowercase letters.
              </p>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-300">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  name="confirmPassword"
                  type={showConfirm ? "text" : "password"}
                  placeholder="Re-enter your password"
                  required
                  className="h-11 w-full rounded-lg border border-white/10 bg-white/5 px-4 pr-10 text-sm text-white placeholder:text-gray-500 outline-none transition focus:border-[#6c47ff] focus:ring-2 focus:ring-[#6c47ff]/20"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300"
                >
                  {showConfirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <Button
              type="submit"
              disabled={loading}
              className="h-11 w-full rounded-lg bg-[#6c47ff] text-white hover:bg-[#5a38e0] disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating Account...
                </>
              ) : (
                "Create Account"
              )}
            </Button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center gap-3">
            <div className="h-px flex-1 bg-white/10" />
            <span className="text-xs font-medium text-gray-500">OR</span>
            <div className="h-px flex-1 bg-white/10" />
          </div>

          {/* Sign In Link */}
          <p className="text-center text-sm text-gray-400">
            Already have an account?{" "}
            <Link
              href="/signin"
              className="font-semibold text-[#6c47ff] hover:text-[#5a38e0]"
            >
              Sign In
            </Link>
          </p>
        </div>

        {/* Back to Home */}
        <div className="mt-6 text-center">
          <Link
            href="/"
            className="text-sm text-gray-500 transition hover:text-white"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
