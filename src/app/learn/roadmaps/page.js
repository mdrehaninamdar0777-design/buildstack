"use client";

import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";

import {
  RoadmapHeader,
  RoadmapFilters,
  RoadmapGrid,
} from "@/components/learn/roadmaps";

import { roadmaps } from "@/data/learn/roadmaps.data";

export default function RoadmapsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [level, setLevel] = useState("all");
  const [category, setCategory] = useState("all");
  const [duration, setDuration] = useState("all");
  const [sort, setSort] = useState("popular");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const filteredRoadmaps = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    const filtered = roadmaps.filter((roadmap) => {
      const matchesSearch =
        !query ||
        roadmap.title.toLowerCase().includes(query) ||
        roadmap.description.toLowerCase().includes(query) ||
        roadmap.category.toLowerCase().includes(query) ||
        roadmap.technologies?.some((technology) =>
          technology.toLowerCase().includes(query)
        );

      const matchesLevel =
        level === "all" || roadmap.level === level;

      const matchesCategory =
        category === "all" || roadmap.category === category;

      const matchesDuration = (() => {
        if (duration === "all") return true;

        if (duration === "short") {
          return !roadmap.duration.includes("8") &&
            !roadmap.duration.includes("9") &&
            !roadmap.duration.includes("10") &&
            !roadmap.duration.includes("12");
        }

        if (duration === "medium") {
          return (
            roadmap.duration.includes("6") ||
            roadmap.duration.includes("7") ||
            roadmap.duration.includes("8") ||
            roadmap.duration.includes("9")
          );
        }

        if (duration === "long") {
          return (
            roadmap.duration.includes("9") ||
            roadmap.duration.includes("10") ||
            roadmap.duration.includes("12")
          );
        }

        return true;
      })();

      return (
        matchesSearch &&
        matchesLevel &&
        matchesCategory &&
        matchesDuration
      );
    });

    return [...filtered].sort((a, b) => {
      if (sort === "name") {
        return a.title.localeCompare(b.title);
      }

      if (sort === "duration") {
        return a.duration.localeCompare(b.duration);
      }

      return b.popularity - a.popularity;
    });
  }, [
    searchQuery,
    level,
    category,
    duration,
    sort,
  ]);

  const totalPages = Math.ceil(filteredRoadmaps.length / itemsPerPage) || 1;
  const paginatedRoadmaps = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredRoadmaps.slice(start, start + itemsPerPage);
  }, [filteredRoadmaps, currentPage]);

  const startIndex = filteredRoadmaps.length === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;
  const endIndex = Math.min(currentPage * itemsPerPage, filteredRoadmaps.length);

  return (
    <div className="mx-auto max-w-[1400px] px-6 py-8 lg:px-10">

      <RoadmapHeader />

      {/* Unified Search & Filters Row matching Image 16 */}
      <div className="mt-8 flex flex-col gap-3 lg:flex-row lg:items-center">
        {/* Search input */}
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Search roadmaps..."
            className="h-11 w-full rounded-xl border border-neutral-200 bg-white pl-10 pr-4 text-sm text-neutral-900 outline-none transition placeholder:text-neutral-400 focus:border-neutral-400 focus:ring-2 focus:ring-neutral-100"
          />
        </div>

        {/* Filter dropdowns */}
        <div className="shrink-0">
          <RoadmapFilters
            level={level}
            category={category}
            duration={duration}
            sort={sort}
            onLevelChange={(val) => {
              setLevel(val);
              setCurrentPage(1);
            }}
            onCategoryChange={(val) => {
              setCategory(val);
              setCurrentPage(1);
            }}
            onDurationChange={(val) => {
              setDuration(val);
              setCurrentPage(1);
            }}
            onSortChange={setSort}
          />
        </div>
      </div>

      {/* Roadmaps Grid */}
      <div className="mt-6">
        <RoadmapGrid roadmaps={paginatedRoadmaps} />
      </div>

      {/* Bottom Pagination Strip matching Image 16 */}
      <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-neutral-100 pt-6 sm:flex-row">
        <p className="text-xs text-neutral-500">
          Showing {startIndex} – {endIndex} of {filteredRoadmaps.length} roadmaps
        </p>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-neutral-200 text-neutral-600 transition hover:bg-neutral-50 disabled:opacity-40 disabled:hover:bg-transparent"
            aria-label="Previous page"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
            <button
              key={pageNum}
              type="button"
              onClick={() => setCurrentPage(pageNum)}
              className={`flex h-8 w-8 items-center justify-center rounded-lg text-xs font-semibold transition ${
                currentPage === pageNum
                  ? "bg-black text-white"
                  : "border border-neutral-200 bg-white text-neutral-700 hover:bg-neutral-50"
              }`}
            >
              {pageNum}
            </button>
          ))}

          <button
            type="button"
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-neutral-200 text-neutral-600 transition hover:bg-neutral-50 disabled:opacity-40 disabled:hover:bg-transparent"
            aria-label="Next page"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

    </div>
  );
}