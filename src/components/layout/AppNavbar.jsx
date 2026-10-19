"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import {
  User,
  Settings,
  Lock,
  LogOut,
  Search,
  ChevronDown,
  Flame,
  Sun,
  Menu,
} from "lucide-react";
import { BuildStackLogo } from "@/components/shared";
import {
  AccountDrawer,
  EditProfileModal,
  ChangePasswordModal,
} from "@/components/profile";

export default function AppNavbar({ onToggleMobileSidebar }) {
  const pathname = usePathname();
  const router = useRouter();

  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [accountDrawerOpen, setAccountDrawerOpen] = useState(false);
  const [editProfileOpen, setEditProfileOpen] = useState(false);
  const [changePasswordOpen, setChangePasswordOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const isActive = (href) => {
    if (href === "/home") return pathname === "/home";
    if (href === "/learn") return pathname.startsWith("/learn");
    if (href === "/dashboard") return pathname === "/dashboard";
    return pathname === href;
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      router.push("/search");
    }
  };

  const handleLogout = () => {
    setProfileDropdownOpen(false);
    router.push("/");
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-neutral-200 bg-white">
        <div className="mx-auto flex h-20 max-w-[1400px] items-center px-4 sm:px-6 lg:px-10">

          {/* Mobile hamburger */}
          <button
            type="button"
            onClick={onToggleMobileSidebar}
            className="mr-3 rounded-xl p-2 text-neutral-600 hover:bg-neutral-100 lg:hidden"
            aria-label="Toggle navigation"
          >
            <Menu className="h-5 w-5" />
          </button>

          {/* Logo */}
          <div className="shrink-0">
            <BuildStackLogo href="/home" size={28} />
          </div>

          {/* Center Navigation */}
          <nav className="ml-8 hidden items-center gap-2 md:flex lg:ml-10">
            <Link
              href="/home"
              className={`rounded-xl px-4 py-2 text-sm font-semibold transition ${
                isActive("/home")
                  ? "bg-neutral-900 text-white"
                  : "text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900"
              }`}
            >
              Home
            </Link>

            <Link
              href="/learn"
              className={`rounded-xl px-4 py-2 text-sm font-semibold transition ${
                isActive("/learn")
                  ? "bg-neutral-900 text-white"
                  : "text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900"
              }`}
            >
              Learn
            </Link>

            <Link
              href="/dashboard"
              className={`rounded-xl px-4 py-2 text-sm font-semibold transition ${
                isActive("/dashboard")
                  ? "bg-neutral-900 text-white"
                  : "text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900"
              }`}
            >
              Dashboard
            </Link>
          </nav>

          {/* Search bar */}
          <form
            onSubmit={handleSearchSubmit}
            className="ml-auto hidden items-center md:flex"
          >
            <div className="flex h-11 w-64 items-center rounded-xl border border-neutral-200 bg-white px-3.5 transition focus-within:border-neutral-400 lg:w-80">
              <Search className="mr-2.5 h-4 w-4 shrink-0 text-neutral-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search roadmaps, skills, topics..."
                className="w-full bg-transparent text-xs text-neutral-900 outline-none placeholder:text-neutral-400 sm:text-sm"
              />
            </div>
          </form>

          {/* Right Header Controls */}
          <div className="ml-4 flex items-center gap-3 sm:gap-4">

            {/* Streak Pill */}
            <div className="flex items-center gap-1.5 rounded-xl border border-neutral-200 bg-neutral-50 px-3 py-1.5 text-xs font-semibold text-neutral-800">
              <Flame className="h-4 w-4 fill-orange-500 text-orange-500" />
              <span>12</span>
            </div>

            {/* Theme / Light-Dark Toggle Button */}
            <button
              type="button"
              className="hidden rounded-xl border border-neutral-200 p-2 text-neutral-600 transition hover:bg-neutral-100 hover:text-neutral-900 sm:flex"
              aria-label="Toggle theme"
            >
              <Sun className="h-4 w-4" />
            </button>

            {/* User Avatar Menu Trigger */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setProfileDropdownOpen((prev) => !prev)}
                className="flex items-center gap-2.5 rounded-xl p-1 transition hover:bg-neutral-50"
                aria-expanded={profileDropdownOpen}
                aria-haspopup="menu"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-neutral-900 text-xs font-bold text-white shadow-xs">
                  R
                </div>
                <span className="hidden text-sm font-semibold text-neutral-900 lg:block">
                  Rehan
                </span>
                <ChevronDown
                  className={`hidden h-4 w-4 text-neutral-400 transition-transform lg:block ${
                    profileDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Dropdown Menu */}
              {profileDropdownOpen && (
                <div className="absolute right-0 top-full z-50 mt-2 w-64 overflow-hidden rounded-2xl border border-neutral-200 bg-white p-2 shadow-xl">
                  <div className="border-b border-neutral-100 p-3">
                    <p className="font-bold text-neutral-900">Rehan Inamdar</p>
                    <p className="truncate text-xs text-neutral-500">
                      rehan@example.com
                    </p>
                  </div>

                  <div className="space-y-1 py-1">
                    <Link
                      href="/profile"
                      onClick={() => setProfileDropdownOpen(false)}
                      className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-semibold text-neutral-700 transition hover:bg-neutral-50 hover:text-neutral-900"
                    >
                      <User className="h-4 w-4 text-neutral-400" />
                      View Profile
                    </Link>

                    <button
                      type="button"
                      onClick={() => {
                        setProfileDropdownOpen(false);
                        setAccountDrawerOpen(true);
                      }}
                      className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-semibold text-neutral-700 transition hover:bg-neutral-50 hover:text-neutral-900"
                    >
                      <Settings className="h-4 w-4 text-neutral-400" />
                      My Account & Stats
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setProfileDropdownOpen(false);
                        setEditProfileOpen(true);
                      }}
                      className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-semibold text-neutral-700 transition hover:bg-neutral-50 hover:text-neutral-900"
                    >
                      <Settings className="h-4 w-4 text-neutral-400" />
                      Edit Profile
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setProfileDropdownOpen(false);
                        setChangePasswordOpen(true);
                      }}
                      className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-semibold text-neutral-700 transition hover:bg-neutral-50 hover:text-neutral-900"
                    >
                      <Lock className="h-4 w-4 text-neutral-400" />
                      Change Password
                    </button>
                  </div>

                  <div className="border-t border-neutral-100 pt-1">
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-semibold text-red-600 transition hover:bg-red-50"
                    >
                      <LogOut className="h-4 w-4" />
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>
      </header>

      {/* Account Slide-Over Drawer */}
      <AccountDrawer
        isOpen={accountDrawerOpen}
        onClose={() => setAccountDrawerOpen(false)}
        onOpenEditProfile={() => setEditProfileOpen(true)}
        onOpenChangePassword={() => setChangePasswordOpen(true)}
      />

      {/* Edit Profile Modal */}
      <EditProfileModal
        isOpen={editProfileOpen}
        onClose={() => setEditProfileOpen(false)}
      />

      {/* Change Password Modal */}
      <ChangePasswordModal
        isOpen={changePasswordOpen}
        onClose={() => setChangePasswordOpen(false)}
      />
    </>
  );
}