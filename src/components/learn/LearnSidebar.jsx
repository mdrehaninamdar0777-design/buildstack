"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Globe,
  Laptop,
  Workflow,
  Bookmark,
  Flame,
  ArrowRight,
  HelpCircle,
  Check,
  Code2,
} from "lucide-react";

const navigationItems = [
  {
    label: "Domains",
    href: "/learn/domains",
    aliases: ["/learn", "/learn/domains"],
    icon: Globe,
  },
  {
    label: "Skills",
    href: "/learn/skills",
    aliases: ["/learn/skills"],
    icon: Laptop,
  },
  {
    label: "Roadmaps",
    href: "/learn/roadmaps",
    aliases: ["/learn/roadmaps"],
    icon: Workflow,
  },
  {
    label: "Bookmarks",
    href: "/learn/bookmarks",
    aliases: ["/learn/bookmarks"],
    icon: Bookmark,
  },
];

const streakDays = [
  { day: "M", completed: true },
  { day: "T", completed: true },
  { day: "W", completed: true },
  { day: "T", completed: true },
  { day: "F", completed: true },
  { day: "S", completed: false },
  { day: "S", completed: false },
];

export default function LearnSidebar({ onLinkClick }) {
  const pathname = usePathname();

  const isItemActive = (item) => {
    if (item.href === "/learn/domains" && (pathname === "/learn" || pathname.startsWith("/learn/domains"))) {
      return true;
    }
    return pathname.startsWith(item.href);
  };

  return (
    <div className="flex h-full flex-col justify-between p-6">
      <div>
        {/* Section label */}
        <p className="mb-4 text-[11px] font-bold uppercase tracking-wider text-neutral-400">
          Learn
        </p>

        {/* Navigation Items */}
        <nav className="space-y-1.5">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const active = isItemActive(item);

            return (
              <Link
                key={item.label}
                href={item.href}
                onClick={onLinkClick}
                className={`flex items-center gap-3.5 rounded-xl px-4 py-3 text-sm font-semibold transition ${
                  active
                    ? "bg-black text-white shadow-xs"
                    : "text-neutral-700 hover:bg-neutral-100 hover:text-black"
                }`}
              >
                <Icon className={`h-4 w-4 ${active ? "text-white" : "text-neutral-500"}`} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom Interactive Widgets */}
      <div className="mt-8 space-y-4 pt-6 border-t border-neutral-100">

        {/* Continue Learning Mini Card */}
        <div className="rounded-2xl border border-neutral-200 bg-neutral-50/50 p-4 shadow-2xs">
          <p className="text-[11px] font-semibold text-neutral-500">
            Continue Learning
          </p>

          <div className="mt-3 flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-cyan-50 border border-cyan-100 text-cyan-600">
              <Code2 className="h-5 w-5" />
            </div>
            <div className="min-w-0 flex-1">
              <h4 className="text-xs font-bold text-neutral-900 truncate">
                React
              </h4>
              <p className="text-[11px] text-neutral-500">
                72% Completed
              </p>
            </div>
          </div>

          <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-neutral-200">
            <div className="h-full rounded-full bg-black" style={{ width: "72%" }} />
          </div>

          <Link
            href="/learn/skills/react"
            onClick={onLinkClick}
            className="mt-3.5 flex items-center justify-center gap-2 rounded-xl bg-black px-3 py-2 text-xs font-semibold text-white transition hover:bg-neutral-800"
          >
            <span>Continue Learning</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {/* Daily Streak Card with 7-Day Checklist */}
        <div className="rounded-2xl border border-neutral-200 bg-white p-4 shadow-2xs">
          <p className="text-[11px] font-semibold text-neutral-500">
            Daily Streak
          </p>

          <div className="mt-2 flex items-center gap-2">
            <Flame className="h-5 w-5 fill-orange-500 text-orange-500" />
            <span className="text-xl font-black text-neutral-900">12</span>
            <span className="text-xs font-medium text-neutral-500">Days</span>
          </div>

          {/* 7-Day Checklist (M T W T F S S) */}
          <div className="mt-3 flex items-center justify-between">
            {streakDays.map((streak, idx) => (
              <div key={idx} className="flex flex-col items-center gap-1">
                <span className="text-[10px] font-medium text-neutral-400">
                  {streak.day}
                </span>
                <div
                  className={`flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold ${
                    streak.completed
                      ? "bg-black text-white"
                      : "border border-neutral-300 bg-transparent text-transparent"
                  }`}
                >
                  {streak.completed && <Check className="h-3 w-3 stroke-[2.5]" />}
                </div>
              </div>
            ))}
          </div>

          <Link
            href="/dashboard"
            onClick={onLinkClick}
            className="mt-3.5 flex items-center justify-center gap-1.5 rounded-xl border border-neutral-200 py-2 text-xs font-semibold text-neutral-800 transition hover:bg-neutral-50"
          >
            <span>View All Progress</span>
            <ArrowRight className="h-3 w-3" />
          </Link>
        </div>

        {/* Help & Support */}
        <Link
          href="/support"
          onClick={onLinkClick}
          className="flex items-center justify-between px-2 text-xs font-semibold text-neutral-600 transition hover:text-black"
        >
          <span className="flex items-center gap-2.5">
            <HelpCircle className="h-4 w-4" />
            Help & Support
          </span>
          <ArrowRight className="h-3.5 w-3.5 text-neutral-400" />
        </Link>

      </div>
    </div>
  );
}