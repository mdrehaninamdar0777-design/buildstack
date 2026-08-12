"use client";

import Link from "next/link";
import { useState } from "react";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="w-full max-w-[460px]">
      <div className="rounded-xl border border-neutral-200 bg-white px-6 py-7 shadow-sm sm:px-7">
        
        {/* Logo */}
        <div className="flex justify-center">
          <Link
            href="/"
            className="flex items-center gap-2 text-2xl font-bold tracking-tight text-neutral-900"
          >
            <span className="text-2xl">◈</span>
            <span>BuildStack</span>
          </Link>
        </div>

        {/* Heading */}
        <div className="mt-5 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-neutral-900">
            Welcome Back
          </h1>

          <p className="mt-2 text-sm text-neutral-500">
            Continue your developer learning journey.
          </p>
        </div>

        {/* Form */}
        <form className="mt-8 space-y-5">

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-semibold text-neutral-900"
            >
              Email Address
            </label>

            <div className="flex h-11 items-center rounded-lg border border-neutral-200 bg-white px-3 focus-within:border-neutral-400">
              <span className="mr-3 text-neutral-500">✉</span>

              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                className="w-full bg-transparent text-sm text-neutral-900 outline-none placeholder:text-neutral-400"
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

            <div className="flex h-11 items-center rounded-lg border border-neutral-200 bg-white px-3 focus-within:border-neutral-400">
              <span className="mr-3 text-neutral-500">🔒</span>

              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className="w-full bg-transparent text-sm text-neutral-900 outline-none placeholder:text-neutral-400"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="ml-2 text-sm text-neutral-500 hover:text-neutral-900"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? "◉" : "◌"}
              </button>
            </div>
          </div>

          {/* Remember + Forgot */}
          <div className="flex items-center justify-between">
            <label className="flex cursor-pointer items-center gap-2 text-sm text-neutral-600">
              <input
                type="checkbox"
                className="h-4 w-4 rounded border-neutral-300"
              />

              <span>Remember me</span>
            </label>

            <Link
              href="/forgot-password"
              className="text-sm text-neutral-600 transition-colors hover:text-neutral-900"
            >
              Forgot password?
            </Link>
          </div>

          {/* Sign In */}
          <button
            type="submit"
            className="flex h-11 w-full items-center justify-center rounded-lg bg-black text-sm font-semibold text-white transition-colors hover:bg-neutral-800"
          >
            Sign In
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3">
            <div className="h-px flex-1 bg-neutral-200" />

            <span className="text-xs text-neutral-500">
              or continue with
            </span>

            <div className="h-px flex-1 bg-neutral-200" />
          </div>

          {/* Social Login */}
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              className="flex h-11 items-center justify-center gap-2 rounded-lg border border-neutral-200 bg-white text-sm font-medium text-neutral-900 transition-colors hover:bg-neutral-50"
            >
              <span className="font-bold">G</span>
              Continue with Google
            </button>

            <button
              type="button"
              className="flex h-11 items-center justify-center gap-2 rounded-lg border border-neutral-200 bg-white text-sm font-medium text-neutral-900 transition-colors hover:bg-neutral-50"
            >
              <span className="font-bold">◉</span>
              Continue with GitHub
            </button>
          </div>

          {/* Signup Link */}
          <p className="text-center text-sm text-neutral-500">
            Don't have an account?{" "}
            <Link
              href="/signup"
              className="font-semibold text-neutral-900 hover:underline"
            >
              Create Account
            </Link>
          </p>
        </form>
      </div>

      {/* Security Message */}
      <div className="mt-7 flex items-start justify-center gap-3 px-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-neutral-100 text-lg">
          🛡
        </div>

        <div>
          <p className="text-sm font-semibold text-neutral-900">
            Protected with secure authentication.
          </p>

          <p className="mt-1 max-w-xs text-sm leading-5 text-neutral-500">
            Your account and personal information are encrypted and securely protected.
          </p>
        </div>
      </div>
    </div>
  );
}