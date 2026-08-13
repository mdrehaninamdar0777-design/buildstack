"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  User,
  Settings,
  Lock,
  LogOut,
  Search,
  ChevronDown,
} from "lucide-react";
import { useState } from "react";

export default function AppNavbar() {
  const pathname = usePathname();
  const router = useRouter();

  const [profileOpen, setProfileOpen] = useState(false);

  const isActive = (href) => pathname === href;

  const handleLogout = () => {
    setProfileOpen(false);

    // Authentication will be connected later.
    router.push("/");
  };

  return (
    <header className="w-full border-b border-neutral-200 bg-white">
      <div className="mx-auto flex h-20 max-w-[1400px] items-center px-6 lg:px-10">
        {/* Logo */}
        <Link
          href="/home"
          className="flex shrink-0 items-center gap-2"
        >
          <span className="text-2xl font-bold text-neutral-900">
            ◈
          </span>

          <span className="text-xl font-bold tracking-tight text-neutral-900">
            BuildStack
          </span>
        </Link>

        {/* Navigation */}
        <nav className="ml-12 flex items-center gap-8">
          <Link
            href="/home"
            className={`text-sm transition-colors ${
              isActive("/home")
                ? "font-semibold text-neutral-900"
                : "font-medium text-neutral-600 hover:text-neutral-900"
            }`}
          >
            Home
          </Link>

          <Link
            href="/learn"
            className={`text-sm transition-colors ${
              isActive("/learn")
                ? "font-semibold text-neutral-900"
                : "font-medium text-neutral-600 hover:text-neutral-900"
            }`}
          >
            Learn
          </Link>

          <Link
            href="/dashboard"
            className={`text-sm transition-colors ${
              isActive("/dashboard")
                ? "font-semibold text-neutral-900"
                : "font-medium text-neutral-600 hover:text-neutral-900"
            }`}
          >
            Dashboard
          </Link>
        </nav>

        {/* Search */}
        <div className="ml-auto hidden lg:flex">
          <div className="flex h-11 w-[340px] items-center rounded-xl border border-neutral-200 bg-white px-4">
            <Search className="mr-3 h-4 w-4 text-neutral-400" />

            <span className="flex-1 text-sm text-neutral-400">
              Search roadmaps, topics, resources...
            </span>

            <span className="rounded-md border border-neutral-200 px-2 py-1 text-xs text-neutral-500">
              ⌘ K
            </span>
          </div>
        </div>

        {/* Profile */}
        <div className="relative ml-6">
          <button
            type="button"
            onClick={() => setProfileOpen((prev) => !prev)}
            className="flex items-center gap-3 rounded-xl px-2 py-2 transition-colors hover:bg-neutral-50"
            aria-expanded={profileOpen}
            aria-haspopup="menu"
          >
            {/* Avatar */}
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-100 text-sm font-semibold text-neutral-700">
              R
            </div>

            {/* Name */}
            <span className="hidden text-sm font-semibold text-neutral-900 sm:block">
              Rehan
            </span>

            <ChevronDown
              className={`h-4 w-4 text-neutral-500 transition-transform ${
                profileOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {/* Dropdown */}
          {profileOpen && (
            <div className="absolute right-0 top-full z-50 mt-3 w-72 overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-lg">
              {/* User information */}
              <div className="border-b border-neutral-200 p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-neutral-100 text-sm font-semibold text-neutral-700">
                    R
                  </div>

                  <div className="min-w-0">
                    <p className="font-semibold text-neutral-900">
                      Rehan
                    </p>

                    <p className="truncate text-sm text-neutral-500">
                      rehan@example.com
                    </p>
                  </div>
                </div>
              </div>

              {/* Menu */}
              <div className="p-2">
                <Link
                  href="/profile"
                  onClick={() => setProfileOpen(false)}
                  className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm text-neutral-700 transition-colors hover:bg-neutral-50 hover:text-neutral-900"
                >
                  <User className="h-4 w-4" />

                  <span>View Profile</span>
                </Link>

                <Link
                  href="/settings"
                  onClick={() => setProfileOpen(false)}
                  className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm text-neutral-700 transition-colors hover:bg-neutral-50 hover:text-neutral-900"
                >
                  <Settings className="h-4 w-4" />

                  <span>Account Settings</span>
                </Link>

                <Link
                  href="/change-password"
                  onClick={() => setProfileOpen(false)}
                  className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm text-neutral-700 transition-colors hover:bg-neutral-50 hover:text-neutral-900"
                >
                  <Lock className="h-4 w-4" />

                  <span>Change Password</span>
                </Link>
              </div>

              {/* Logout */}
              <div className="border-t border-neutral-200 p-2">
                <button
                  type="button"
                  onClick={handleLogout}
                  className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm text-neutral-700 transition-colors hover:bg-neutral-50 hover:text-neutral-900"
                >
                  <LogOut className="h-4 w-4" />

                  <span>Logout</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}