"use client";

import { useMemo, useState } from "react";

import {
  BookmarkHeader,
  BookmarkFilters,
  BookmarkGrid,
} from "@/components/learn/bookmarks";

import { bookmarks } from "@/data/learn/bookmarks.data";

export default function BookmarksPage() {
  const [filter, setFilter] = useState("all");
  const [sort, setSort] = useState("recently_saved");

  const filteredBookmarks = useMemo(() => {
    let result = bookmarks;

    if (filter === "skills") {
      result = bookmarks.filter((b) => b.type === "skill");
    } else if (filter === "roadmaps") {
      result = bookmarks.filter((b) => b.type === "roadmap");
    } else if (filter === "resources") {
      result = bookmarks.filter((b) => b.type === "resource");
    }

    return result;
  }, [filter]);

  return (
    <div className="mx-auto max-w-[1400px] px-6 py-10 lg:px-10">
      {/* Header with stats */}
      <BookmarkHeader />

      {/* Filters */}
      <div className="mt-8">
        <BookmarkFilters
          filter={filter}
          onFilterChange={setFilter}
          sort={sort}
          onSortChange={setSort}
        />
      </div>

      {/* Grid */}
      <div className="mt-8">
        <BookmarkGrid bookmarks={filteredBookmarks} />
      </div>
    </div>
  );
}