"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  LogOut,
  Settings,
  LockKeyhole,
  UserRound,
} from "lucide-react";

export default function AppNavbar() {
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target)
      ) {
        setProfileOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
            className="text-sm font-semibold text-neutral-900"
          >
            Home
          </Link>

          <Link
            href="/learn"
            className="text-sm font-medium text-neutral-600 transition-colors hover:text-neutral-900"
          >
            Learn
          </Link>

          <Link
            href="/dashboard"
            className="text-sm font-medium text-neutral-600 transition-colors hover:text-neutral-900"
          >
            Dashboard
          </Link>
        </nav>

        {/* Search */}
        <div className="ml-auto hidden lg:flex">
          <div className="flex h-11 w-[340px] items-center rounded-xl border border-neutral-200 bg-white px-4">
            <span className="mr-3 text-lg text-neutral-400">
              ⌕
            </span>

            <span className="flex-1 text-sm text-neutral-400">
              Search roadmaps, topics, resources...
            </span>

            <span className="rounded-md border border-neutral-200 px-2 py-1 text-xs text-neutral-500">
              ⌘ K
            </span>
          </div>
        </div>

        {/* User / Profile */}
        <div
          ref={profileRef}
          className="relative ml-6"
        >
          <button
            type="button"
            onClick={() => setProfileOpen((prev) => !prev)}
            className="flex items-center gap-3 rounded-lg px-2 py-1.5 transition-colors hover:bg-neutral-50"
            aria-expanded={profileOpen}
            aria-haspopup="menu"
          >
            {/* Avatar */}
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-neutral-100 text-sm font-semibold text-neutral-700">
              R
            </div>

            {/* Name */}
            <span className="hidden text-sm font-semibold text-neutral-900 sm:block">
              Rehan
            </span>

            {/* Arrow */}
            <span
              className={`text-xs text-neutral-500 transition-transform ${
                profileOpen ? "rotate-180" : ""
              }`}
            >
              ▾
            </span>
          </button>

          {/* Profile Dropdown */}
          {profileOpen && (
            <div
              className="absolute right-0 top-14 z-50 w-72 overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-xl"
              role="menu"
            >
              {/* User Information */}
              <div className="flex items-center gap-3 border-b border-neutral-200 p-5">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-neutral-100 text-base font-semibold text-neutral-700">
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

              {/* Menu Items */}
              <div className="p-2">

                {/* View Profile */}
                <Link
                  href="/profile"
                  onClick={() => setProfileOpen(false)}
                  className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-50 hover:text-neutral-900"
                  role="menuitem"
                >
                  <UserRound className="h-4 w-4" />

                  <span>
                    View Profile
                  </span>
                </Link>

                {/* Account Settings */}
                <button
                  type="button"
                  className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-50 hover:text-neutral-900"
                  role="menuitem"
                >
                  <Settings className="h-4 w-4" />

                  <span>
                    Account Settings
                  </span>
                </button>

                {/* Change Password */}
                <button
                  type="button"
                  className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-50 hover:text-neutral-900"
                  role="menuitem"
                >
                  <LockKeyhole className="h-4 w-4" />

                  <span>
                    Change Password
                  </span>
                </button>
              </div>

              {/* Logout */}
              <div className="border-t border-neutral-200 p-2">
                <button
                  type="button"
                  className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-50 hover:text-neutral-900"
                  role="menuitem"
                >
                  <LogOut className="h-4 w-4" />

                  <span>
                    Logout
                  </span>
                </button>
              </div>
            </div>
          )}
        </div>

      </div>
    </header>
  );
}