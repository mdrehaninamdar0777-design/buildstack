"use client";

import {
  LogOut,
  Settings,
  LockKeyhole,
  UserRound,
} from "lucide-react";
import Link from "next/link";

export default function ProfileDropdown({ onClose }) {
  return (
    <div className="absolute right-0 top-14 z-50 w-72 overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-lg">
      {/* User */}
      <div className="flex items-center gap-3 border-b border-neutral-200 p-5">
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-neutral-100 font-semibold text-neutral-900">
          R
        </div>

        <div>
          <p className="font-semibold text-neutral-900">
            Rehan
          </p>

          <p className="text-sm text-neutral-500">
            rehan@example.com
          </p>
        </div>
      </div>

      {/* Menu */}
      <div className="p-2">
        <Link
          href="/profile"
          onClick={onClose}
          className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm text-neutral-700 hover:bg-neutral-50"
        >
          <UserRound className="h-4 w-4" />
          View Profile
        </Link>

        <button
          type="button"
          className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-sm text-neutral-700 hover:bg-neutral-50"
        >
          <Settings className="h-4 w-4" />
          Account Settings
        </button>

        <button
          type="button"
          className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-sm text-neutral-700 hover:bg-neutral-50"
        >
          <LockKeyhole className="h-4 w-4" />
          Change Password
        </button>
      </div>

      <div className="border-t border-neutral-200 p-2">
        <button
          type="button"
          className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-sm text-neutral-700 hover:bg-neutral-50"
        >
          <LogOut className="h-4 w-4" />
          Logout
        </button>
      </div>
    </div>
  );
}