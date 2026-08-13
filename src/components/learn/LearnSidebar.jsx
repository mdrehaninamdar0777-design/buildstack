import Link from "next/link";
import {
  Globe,
  Laptop,
  Workflow,
  Bookmark,
  Zap,
  Flame,
  ArrowRight,
  HelpCircle,
} from "lucide-react";

const navigationItems = [
  {
    label: "Domains",
    href: "/learn/domains",
    icon: Globe,
  },
  {
    label: "Skills",
    href: "/learn/skills",
    icon: Laptop,
  },
  {
    label: "Roadmaps",
    href: "/learn/roadmaps",
    icon: Workflow,
  },
  {
    label: "Bookmarks",
    href: "/learn/bookmarks",
    icon: Bookmark,
  },
];

export default function LearnSidebar() {
  return (
    <aside className="hidden w-[280px] shrink-0 border-r border-neutral-200 bg-white lg:flex lg:min-h-[calc(100vh-80px)] lg:flex-col">
      <div className="flex flex-1 flex-col px-7 py-8">

        {/* Section label */}
        <p className="mb-5 text-xs font-medium uppercase tracking-wide text-neutral-500">
          Learn
        </p>

        {/* Navigation */}
        <nav className="space-y-2">
          {navigationItems.map((item) => {
            const Icon = item.icon;

            return (
              <Link
                key={item.label}
                href={item.href}
                className="group flex items-center gap-4 rounded-xl px-4 py-3.5 text-sm font-medium text-neutral-800 transition hover:bg-neutral-100"
              >
                <Icon className="h-5 w-5 text-neutral-700" />

                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Quick Start */}
        <div className="mt-auto pt-10">
          <div className="rounded-xl border border-neutral-200 bg-white p-5">

            <div className="flex items-center gap-2">
              <Zap className="h-5 w-5 fill-current text-neutral-900" />

              <h3 className="text-sm font-semibold text-neutral-900">
                Quick Start
              </h3>
            </div>

            <p className="mt-3 text-xs leading-5 text-neutral-500">
              Pick up where you left off and keep your streak alive.
            </p>

            <Link
              href="/learn/roadmaps"
              className="mt-4 flex items-center justify-center gap-2 rounded-lg bg-black px-4 py-3 text-xs font-semibold text-white transition hover:bg-neutral-800"
            >
              Continue Learning
              <ArrowRight className="h-4 w-4" />
            </Link>

            {/* Streak */}
            <div className="mt-4 rounded-lg border border-neutral-200 px-4 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Flame className="h-5 w-5 fill-orange-500 text-orange-500" />

                  <span className="text-xl font-semibold text-neutral-900">
                    12
                  </span>
                </div>

                <ArrowRight className="h-4 w-4 text-neutral-500" />
              </div>

              <p className="mt-1 text-xs text-neutral-500">
                Day Streak
              </p>
            </div>

            {/* Progress */}
            <Link
              href="/dashboard"
              className="mt-4 flex items-center justify-center gap-2 rounded-lg border border-neutral-200 px-4 py-3 text-xs font-medium text-neutral-800 transition hover:bg-neutral-50"
            >
              View Progress
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        {/* Help */}
        <Link
          href="/support"
          className="mt-8 flex items-center justify-between px-1 text-sm text-neutral-700"
        >
          <span className="flex items-center gap-3">
            <HelpCircle className="h-5 w-5" />
            Help & Support
          </span>

          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </aside>
  );
}