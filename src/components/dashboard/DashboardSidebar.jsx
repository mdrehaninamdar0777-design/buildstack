"use client";

import Link from "next/link";
import {
  LayoutDashboard,
  Map,
  GraduationCap,
  BarChart3,
  Bookmark,
  FileText,
  Settings,
} from "lucide-react";
import { useUserProfile } from "@/hooks/useUserProfile";

const navigation = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard",
    active: true,
  },
  {
    label: "Roadmaps",
    icon: Map,
    href: "/learn",
  },
  {
    label: "My Learning",
    icon: GraduationCap,
    href: "/learn",
  },
  {
    label: "Progress",
    icon: BarChart3,
    href: "/dashboard",
  },
  {
    label: "Bookmarks",
    icon: Bookmark,
    href: "/bookmarks",
  },
  {
    label: "Notes",
    icon: FileText,
    href: "/dashboard",
  },
];

export default function DashboardSidebar({ mode = "full" }) {
  const isPreview = mode === "preview";
  const { displayName, email, photoURL, initials } = useUserProfile();

  const userDisplayName = isPreview
    ? displayName || "Developer"
    : displayName || "Developer";

  const userHandle = email
    ? `@${email.split("@")[0]}`
    : "@developer";

  const userInitial = initials || "U";

  return (
    <aside
      className={
        isPreview
          ? "flex w-48 flex-col border-r border-neutral-200 bg-white p-4"
          : "flex w-64 flex-col border-r border-neutral-200 bg-white p-6"
      }
    >
      <h2
        className={
          isPreview
            ? "text-xl font-bold text-neutral-900"
            : "text-2xl font-bold text-neutral-900"
        }
      >
        BuildStack
      </h2>

      <nav
        className={
          isPreview
            ? "mt-6 flex flex-1 flex-col gap-1"
            : "mt-8 flex flex-1 flex-col gap-2"
        }
      >
        {navigation.map(({ label, icon: Icon, href, active }) => (
          <Link
            key={label}
            href={href || "/dashboard"}
            className={`flex items-center rounded-lg font-medium transition-colors duration-200 ${
              isPreview
                ? "gap-2 px-3 py-2 text-sm"
                : "gap-3 px-3 py-2.5 text-base"
            } ${
              active
                ? "bg-neutral-100 text-neutral-900"
                : "text-neutral-500 hover:bg-neutral-50 hover:text-neutral-900"
            }`}
          >
            <Icon
              className={
                isPreview
                  ? "h-4 w-4"
                  : "h-5 w-5"
              }
            />

            <span>{label}</span>
          </Link>
        ))}
      </nav>

      <Link
        href="/settings"
        className={`flex items-center rounded-lg text-neutral-500 transition-colors hover:bg-neutral-50 hover:text-neutral-900 ${
          isPreview
            ? "gap-2 px-3 py-2 text-sm"
            : "gap-3 px-3 py-2.5 text-base"
        }`}
      >
        <Settings
          className={
            isPreview
              ? "h-4 w-4"
              : "h-5 w-5"
          }
        />

        <span>Settings</span>
      </Link>

      <Link
        href="/profile"
        className={
          isPreview
            ? "mt-4 flex items-center gap-3 border-t border-neutral-200 pt-4 hover:opacity-90 transition"
            : "mt-6 flex items-center gap-3 border-t border-neutral-200 pt-6 hover:opacity-90 transition"
        }
      >
        <div
          className={
            isPreview
              ? "flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-black text-sm font-semibold text-white"
              : "flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full bg-black text-base font-semibold text-white"
          }
        >
          {photoURL ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={photoURL}
              alt={userDisplayName}
              className="h-full w-full object-cover"
            />
          ) : (
            userInitial
          )}
        </div>

        <div className="min-w-0 flex-1">
          <p className="truncate font-semibold text-neutral-900">
            {userDisplayName}
          </p>

          <p
            className={
              isPreview
                ? "truncate text-xs text-neutral-500"
                : "truncate text-sm text-neutral-500"
            }
          >
            {userHandle}
          </p>
        </div>
      </Link>
    </aside>
  );
}