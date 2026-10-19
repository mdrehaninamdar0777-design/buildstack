"use client";

import { ChevronDown, LayoutGrid, Code2, Map, FileText } from "lucide-react";

const FILTER_TABS = [
  { value: "all", label: "All", icon: LayoutGrid },
  { value: "skills", label: "Skills", icon: Code2 },
  { value: "roadmaps", label: "Roadmaps", icon: Map },
  { value: "resources", label: "Resources", icon: FileText },
];

const SORT_OPTIONS = [
  { value: "recently_saved", label: "Recently Saved" },
  { value: "recently_viewed", label: "Recently Viewed" },
  { value: "name", label: "Name" },
  { value: "progress", label: "Progress" },
];

export default function BookmarkFilters({
  filter,
  onFilterChange,
  sort,
  onSortChange,
}) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      {/* Tab Filters */}
      <div className="flex items-center gap-2">
        {FILTER_TABS.map((tab) => {
          const Icon = tab.icon;
          const active = filter === tab.value;

          return (
            <button
              key={tab.value}
              type="button"
              onClick={() => onFilterChange(tab.value)}
              className={`inline-flex h-9 items-center gap-2 rounded-lg px-4 text-sm font-medium transition ${
                active
                  ? "bg-neutral-900 text-white"
                  : "border border-neutral-200 bg-white text-neutral-700 hover:bg-neutral-50"
              }`}
            >
              <Icon className="h-4 w-4" strokeWidth={1.8} />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Sort Dropdown */}
      <div className="relative ml-auto">
        <select
          value={sort}
          onChange={(e) => onSortChange?.(e.target.value)}
          className="h-9 appearance-none rounded-lg border border-neutral-200 bg-white pl-4 pr-9 text-sm font-medium text-neutral-800 outline-none focus:border-neutral-400"
        >
          {SORT_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-500" />
      </div>
    </div>
  );
}