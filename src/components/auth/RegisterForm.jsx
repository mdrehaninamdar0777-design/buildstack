"use client";

import { useState } from "react";
import Link from "next/link";
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ShieldCheck,
  Chrome,
  Github,
} from "lucide-react";

export default function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
   <div className="w-full max-w-[460px]">
      {/* Register Card */}
     <div className="rounded-xl border border-neutral-200 bg-white px-6 py-6 shadow-sm sm:px-7 sm:py-7">
        
        {/* Logo */}
        <div className="text-center">
          <div className="flex items-center justify-center gap-2">
            <span className="text-2xl font-bold text-neutral-900">◈</span>
            <span className="text-2xl font-bold tracking-tight text-neutral-900">
              BuildStack
            </span>
          </div>

         <h1 className="mt-4 text-3xl font-bold tracking-tight text-neutral-900">
            Create Your Account
          </h1>

          <p className="mt-2 text-sm text-neutral-500">
            Start your developer journey with BuildStack.
          </p>
        </div>

        {/* Form */}
        <form className="mt-7 space-y-4">
          
          {/* Full Name */}
          <div>
            <label
              htmlFor="name"
              className="mb-2 block text-sm font-semibold text-neutral-900"
            >
              Full Name
            </label>

            <div className="relative">
              <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-500" />

              <input
                id="name"
                type="text"
                placeholder="Enter your full name"
                className="h-11 w-full rounded-lg border border-neutral-200 bg-white pl-10 pr-4 text-sm text-neutral-900 outline-none transition focus:border-neutral-400 focus:ring-2 focus:ring-neutral-100"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-semibold text-neutral-900"
            >
              Email Address
            </label>

            <div className="relative">
              <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-500" />

              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                className="h-11 w-full rounded-lg border border-neutral-200 bg-white pl-10 pr-4 text-sm text-neutral-900 outline-none transition focus:border-neutral-400 focus:ring-2 focus:ring-neutral-100"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-semibold text-neutral-900"
            >
              Password
            </label>

            <div className="relative">
              <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-500" />

              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Create a strong password"
                className="h-11 w-full rounded-lg border border-neutral-200 bg-white pl-10 pr-11 text-sm text-neutral-900 outline-none transition focus:border-neutral-400 focus:ring-2 focus:ring-neutral-100"
              />

              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-neutral-900"
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>

            {/* Password Strength */}
            <div className="mt-2">
              <div className="flex gap-1">
                <div className="h-1 flex-1 rounded-full bg-neutral-500" />
                <div className="h-1 flex-1 rounded-full bg-neutral-200" />
                <div className="h-1 flex-1 rounded-full bg-neutral-200" />
              </div>

              <p className="mt-2 text-xs text-neutral-500">
                Password strength:{" "}
                <span className="font-medium text-red-500">Weak</span>
              </p>
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label
              htmlFor="confirmPassword"
              className="mb-2 block text-sm font-semibold text-neutral-900"
            >
              Confirm Password
            </label>

            <div className="relative">
              <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-500" />

              <input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm your password"
                className="h-11 w-full rounded-lg border border-neutral-200 bg-white pl-10 pr-11 text-sm text-neutral-900 outline-none transition focus:border-neutral-400 focus:ring-2 focus:ring-neutral-100"
              />

              <button
                type="button"
                onClick={() =>
                  setShowConfirmPassword((prev) => !prev)
                }
                aria-label={
                  showConfirmPassword
                    ? "Hide confirm password"
                    : "Show confirm password"
                }
                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-neutral-900"
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>

          {/* Terms */}
          <div className="flex items-start gap-2 pt-1">
            <input
              id="terms"
              type="checkbox"
              className="mt-0.5 h-4 w-4 rounded border-neutral-300"
            />

            <label
              htmlFor="terms"
              className="text-xs leading-5 text-neutral-600"
            >
              I agree to the{" "}
              <Link
                href="/terms"
                className="font-medium text-neutral-900 underline"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                href="/privacy"
                className="font-medium text-neutral-900 underline"
              >
                Privacy Policy
              </Link>
              .
            </label>
          </div>

          {/* Create Account */}
          <button
            type="submit"
            className="flex h-11 w-full items-center justify-center rounded-lg bg-black text-sm font-semibold text-white transition hover:bg-neutral-800"
          >
            Create Account
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3 py-1">
            <div className="h-px flex-1 bg-neutral-200" />
            <span className="text-xs text-neutral-500">
              or continue with
            </span>
            <div className="h-px flex-1 bg-neutral-200" />
          </div>

          {/* Social Buttons */}
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              className="flex h-11 items-center justify-center gap-2 rounded-lg border border-neutral-200 bg-white text-sm font-medium text-neutral-900 transition hover:bg-neutral-50"
            >
              <Chrome className="h-4 w-4" />
              Continue with Google
            </button>

            <button
              type="button"
              className="flex h-11 items-center justify-center gap-2 rounded-lg border border-neutral-200 bg-white text-sm font-medium text-neutral-900 transition hover:bg-neutral-50"
            >
              <Github className="h-4 w-4" />
              Continue with GitHub
            </button>
          </div>

          {/* Login */}
          <p className="pt-1 text-center text-sm text-neutral-500">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-semibold text-neutral-900 hover:underline"
            >
              Log in
            </Link>
          </p>
        </form>
      </div>

      {/* Security Message */}
      <div className="mt-5 flex items-center justify-center gap-3">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-neutral-100">
          <ShieldCheck className="h-5 w-5 text-neutral-900" />
        </div>

        <div>
          <p className="text-sm font-semibold text-neutral-900">
            Your account is protected with secure authentication.
          </p>

          <p className="mt-1 text-xs text-neutral-500">
            Your information is encrypted and securely stored.
          </p>
        </div>
      </div>
    </div>
  );
}