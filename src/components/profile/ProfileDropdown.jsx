"use client";

import {
  LogOut,
  Settings,
  LockKeyhole,
  UserRound,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

export default function ProfileDropdown({ onClose }) {
  const router = useRouter();
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    onClose?.();
    try {
      await logout();
      router.push("/");
    } catch (err) {
      console.error("[ProfileDropdown] Logout error:", err);
      router.push("/");
    }
  };

  const displayName = user?.displayName || user?.email?.split("@")[0] || "User";
  const userInitial = (displayName?.[0] || "U").toUpperCase();
  const userEmail = user?.email || "";

  return (
    <div className="absolute right-0 top-14 z-50 w-72 overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-lg">
      {/* User */}
      <div className="flex items-center gap-3 border-b border-neutral-200 p-5">
        {user?.photoURL ? (
          <img
            src={user.photoURL}
            alt={displayName}
            className="h-11 w-11 rounded-full object-cover shadow-xs"
          />
        ) : (
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-neutral-100 font-semibold text-neutral-900">
            {userInitial}
          </div>
        )}

        <div className="min-w-0 flex-1">
          <p className="truncate font-semibold text-neutral-900">
            {displayName}
          </p>

          <p className="truncate text-sm text-neutral-500">
            {userEmail}
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

        <Link
          href="/settings"
          onClick={onClose}
          className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-sm text-neutral-700 hover:bg-neutral-50"
        >
          <Settings className="h-4 w-4" />
          Account Settings
        </Link>

        <Link
          href="/change-password"
          onClick={onClose}
          className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-sm text-neutral-700 hover:bg-neutral-50"
        >
          <LockKeyhole className="h-4 w-4" />
          Change Password
        </Link>
      </div>

      <div className="border-t border-neutral-200 p-2">
        <button
          type="button"
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-sm text-red-600 hover:bg-red-50"
        >
          <LogOut className="h-4 w-4" />
          Logout
        </button>
      </div>
    </div>
  );
}