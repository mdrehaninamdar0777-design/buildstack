"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  X,
  Flame,
  User,
  Settings,
  Lock,
  LogOut,
  Trophy,
  Zap,
  Code2,
  ChevronRight,
} from "lucide-react";

export default function AccountDrawer({
  isOpen,
  onClose,
  onOpenEditProfile,
  onOpenChangePassword,
}) {
  const router = useRouter();

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="fixed inset-y-0 right-0 flex max-w-full pl-10">
        <aside className="w-screen max-w-md bg-white shadow-2xl">
          <div className="flex h-full flex-col overflow-y-auto px-6 py-6 sm:px-8">

            {/* Header */}
            <div className="flex items-center justify-between border-b border-neutral-100 pb-5">
              <h2 className="text-lg font-bold text-neutral-900">My Account</h2>
              <button
                type="button"
                onClick={onClose}
                className="rounded-xl p-2 text-neutral-400 transition hover:bg-neutral-100 hover:text-neutral-700"
                aria-label="Close account menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* User Profile Card */}
            <div className="mt-6 flex items-start gap-4">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-neutral-900 text-xl font-bold text-white shadow-sm">
                R
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="text-lg font-bold text-neutral-900 truncate">
                  Rehan Inamdar
                </h3>
                <p className="text-xs text-neutral-500">@rehan.dev</p>

                <div className="mt-2.5 flex items-center gap-2">
                  <div className="flex items-center gap-1.5 rounded-lg border border-neutral-200 bg-neutral-50 px-2 py-0.5 text-xs font-semibold text-neutral-800">
                    <Flame className="h-3.5 w-3.5 fill-orange-500 text-orange-500" />
                    <span>12 Day Streak</span>
                  </div>
                </div>

                <div className="mt-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-medium text-neutral-700">Frontend Developer</span>
                    <span className="font-bold text-neutral-900">65%</span>
                  </div>
                  <div className="mt-1.5 h-1.5 w-full rounded-full bg-neutral-100 overflow-hidden">
                    <div className="h-full rounded-full bg-black" style={{ width: "65%" }} />
                  </div>
                </div>
              </div>
            </div>

            {/* Learning Statistics 2x2 */}
            <div className="mt-8">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-500">
                  Learning Statistics
                </h4>
                <Link
                  href="/dashboard"
                  onClick={onClose}
                  className="text-xs font-medium text-neutral-600 hover:text-black"
                >
                  View All
                </Link>
              </div>

              <div className="mt-3.5 grid grid-cols-2 gap-3">
                <div className="rounded-xl border border-neutral-200 bg-neutral-50/50 p-4">
                  <p className="text-2xl font-bold text-neutral-900">28</p>
                  <p className="mt-1 text-xs text-neutral-500">Skills Completed</p>
                </div>
                <div className="rounded-xl border border-neutral-200 bg-neutral-50/50 p-4">
                  <p className="text-2xl font-bold text-neutral-900">3</p>
                  <p className="mt-1 text-xs text-neutral-500">Roadmaps Enrolled</p>
                </div>
                <div className="rounded-xl border border-neutral-200 bg-neutral-50/50 p-4">
                  <p className="text-2xl font-bold text-neutral-900">18</p>
                  <p className="mt-1 text-xs text-neutral-500">Bookmarks</p>
                </div>
                <div className="rounded-xl border border-neutral-200 bg-neutral-50/50 p-4">
                  <p className="text-2xl font-bold text-neutral-900">82%</p>
                  <p className="mt-1 text-xs text-neutral-500">Quiz Accuracy</p>
                </div>
              </div>
            </div>

            {/* Recent Achievements */}
            <div className="mt-8">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-500">
                  Recent Achievements
                </h4>
                <Link
                  href="/dashboard"
                  onClick={onClose}
                  className="text-xs font-medium text-neutral-600 hover:text-black"
                >
                  View All
                </Link>
              </div>

              <div className="mt-3.5 space-y-2.5">
                <div className="flex items-center gap-3 rounded-xl border border-neutral-200 p-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-neutral-100 text-neutral-900">
                    <Trophy className="h-4 w-4" />
                  </div>
                  <span className="text-xs font-semibold text-neutral-800">
                    First Skill Completed
                  </span>
                </div>
                <div className="flex items-center gap-3 rounded-xl border border-neutral-200 p-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-50 text-orange-500">
                    <Zap className="h-4 w-4 fill-current" />
                  </div>
                  <span className="text-xs font-semibold text-neutral-800">
                    7 Day Streak
                  </span>
                </div>
                <div className="flex items-center gap-3 rounded-xl border border-neutral-200 p-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-blue-500">
                    <Code2 className="h-4 w-4" />
                  </div>
                  <span className="text-xs font-semibold text-neutral-800">
                    React Explorer
                  </span>
                </div>
              </div>
            </div>

            {/* Navigation Actions */}
            <div className="mt-8 space-y-1.5 border-t border-neutral-100 pt-6">
              <Link
                href="/profile"
                onClick={onClose}
                className="flex items-center justify-between rounded-xl px-3 py-3 text-sm font-semibold text-neutral-800 transition hover:bg-neutral-50"
              >
                <span className="flex items-center gap-3">
                  <User className="h-4 w-4 text-neutral-500" />
                  View Full Profile
                </span>
                <ChevronRight className="h-4 w-4 text-neutral-400" />
              </Link>

              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenEditProfile?.();
                }}
                className="flex w-full items-center justify-between rounded-xl px-3 py-3 text-sm font-semibold text-neutral-800 transition hover:bg-neutral-50"
              >
                <span className="flex items-center gap-3">
                  <Settings className="h-4 w-4 text-neutral-500" />
                  Edit Profile
                </span>
                <ChevronRight className="h-4 w-4 text-neutral-400" />
              </button>

              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenChangePassword?.();
                }}
                className="flex w-full items-center justify-between rounded-xl px-3 py-3 text-sm font-semibold text-neutral-800 transition hover:bg-neutral-50"
              >
                <span className="flex items-center gap-3">
                  <Lock className="h-4 w-4 text-neutral-500" />
                  Change Password
                </span>
                <ChevronRight className="h-4 w-4 text-neutral-400" />
              </button>

              <button
                type="button"
                onClick={() => {
                  onClose();
                  router.push("/");
                }}
                className="flex w-full items-center justify-between rounded-xl px-3 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-50"
              >
                <span className="flex items-center gap-3">
                  <LogOut className="h-4 w-4" />
                  Logout
                </span>
                <ChevronRight className="h-4 w-4 text-red-400" />
              </button>
            </div>

          </div>
        </aside>
      </div>
    </div>
  );
}
