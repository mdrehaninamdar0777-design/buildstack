"use client";

import { useState } from "react";
import {
  ArrowDownUp,
  ChevronDown,
  LayoutGrid,
  Sparkles,
  Flame,
  TrendingUp,
  List,
} from "lucide-react";

const DOMAIN_LIST_FILTERS = [
  { id: "all", label: "All Domains", icon: LayoutGrid },
  { id: "popular", label: "Popular", icon: Flame },
  { id: "new", label: "New", icon: Sparkles },
  { id: "trending", label: "Trending", icon: TrendingUp },
];

const DETAIL_FILTERS = [
  "All (42)",
  "Frontend (18)",
  "Backend (14)",
  "Database (6)",
  "Tools (10)",
];

export default function DomainFilters({
  mode = "domains", // "domains" for /learn/domains list, "detail" for /learn/domains/[domain]
  activeFilter,
  onFilterChange,
}) {
  const [activeTab, setActiveTab] = useState("all");
  const [viewMode, setViewMode] = useState("grid");

  if (mode === "detail") {
    return (
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap gap-2">
          {DETAIL_FILTERS.map((filter, index) => {
            const active = activeFilter === filter || (index === 0 && !activeFilter);
            return (
              <button
                key={filter}
                type="button"
                onClick={() => onFilterChange?.(filter)}
                className={`rounded-full px-4 py-2 text-xs sm:text-sm font-semibold transition ${
                  active
                    ? "bg-black text-white shadow-xs"
                    : "border border-neutral-200 bg-white text-neutral-700 hover:bg-neutral-50"
                }`}
              >
                {filter}
              </button>
            );
          })}
        </div>

        <button
          type="button"
          className="inline-flex h-10 items-center justify-between gap-2.5 rounded-xl border border-neutral-200 bg-white px-3.5 text-xs sm:text-sm font-semibold text-neutral-800 hover:bg-neutral-50"
        >
          <ArrowDownUp className="h-3.5 w-3.5 text-neutral-500" />
          <span>Most Popular</span>
          <ChevronDown className="h-3.5 w-3.5 text-neutral-400" />
        </button>
      </div>
    );
  }

  // Domain List Mode (Image 8)
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      {/* Category Pills */}
      <div className="flex flex-wrap items-center gap-2">
        {DOMAIN_LIST_FILTERS.map((item) => {
          const Icon = item.icon;
          const active = activeTab === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setActiveTab(item.id)}
              className={`flex items-center gap-2 rounded-full px-4 py-2 text-xs sm:text-sm font-semibold transition ${
                active
                  ? "bg-black text-white shadow-xs"
                  : "border border-neutral-200 bg-white text-neutral-700 hover:bg-neutral-50"
              }`}
            >
              <Icon className="h-3.5 w-3.5" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>

      {/* Grid / List View Toggle */}
      <div className="flex items-center rounded-xl border border-neutral-200 bg-white p-1">
        <button
          type="button"
          onClick={() => setViewMode("grid")}
          className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
            viewMode === "grid"
              ? "bg-neutral-100 text-neutral-900"
              : "text-neutral-500 hover:text-neutral-900"
          }`}
        >
          <LayoutGrid className="h-3.5 w-3.5" />
          <span>Grid</span>
        </button>

        <button
          type="button"
          onClick={() => setViewMode("list")}
          className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
            viewMode === "list"
              ? "bg-neutral-100 text-neutral-900"
              : "text-neutral-500 hover:text-neutral-900"
          }`}
        >
          <List className="h-3.5 w-3.5" />
          <span>List</span>
        </button>
      </div>
    </div>
  );
}