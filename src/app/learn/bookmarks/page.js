"use client";

import { useMemo, useState, useEffect } from "react";
import {
  BookmarkHeader,
  BookmarkFilters,
  BookmarkGrid,
} from "@/components/learn/bookmarks";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { getBookmarks, removeBookmark } from "@/lib/api";
import { Loader2 } from "lucide-react";

export default function BookmarksPage() {
  const [filter, setFilter] = useState("all");
  const [sort, setSort] = useState("recently_saved");
  const [userBookmarks, setUserBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    getBookmarks()
      .then((res) => {
        if (isMounted && res?.success) {
          setUserBookmarks(res.bookmarks || []);
        }
      })
      .catch((err) => {
        console.error("[BookmarksPage] Error fetching bookmarks:", err);
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const handleRemove = async (bookmarkId) => {
    setUserBookmarks((prev) => prev.filter((b) => b.id !== bookmarkId));
    try {
      await removeBookmark(bookmarkId);
    } catch (err) {
      console.error("[BookmarksPage] Error removing bookmark:", err);
    }
  };

  const filteredBookmarks = useMemo(() => {
    let result = [...userBookmarks];

    if (filter === "skills") {
      result = result.filter((b) => b.type === "skill");
    } else if (filter === "roadmaps") {
      result = result.filter((b) => b.type === "roadmap");
    } else if (filter === "resources") {
      result = result.filter((b) => b.type === "resource");
    }

    if (sort === "recently_saved") {
      result.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
    } else if (sort === "title") {
      result.sort((a, b) => (a.title || "").localeCompare(b.title || ""));
    } else if (sort === "progress") {
      result.sort((a, b) => (b.progress || 0) - (a.progress || 0));
    }

    return result;
  }, [userBookmarks, filter, sort]);

  const customStats = useMemo(() => {
    const savedSkills = userBookmarks.filter((b) => b.type === "skill").length;
    const savedRoadmaps = userBookmarks.filter((b) => b.type === "roadmap").length;
    const savedResources = userBookmarks.filter((b) => b.type === "resource").length;
    const recentlyAdded = userBookmarks.length > 0 ? userBookmarks.slice(0, 5).length : 0;

    return {
      savedSkills,
      savedRoadmaps,
      savedResources,
      recentlyAdded,
    };
  }, [userBookmarks]);

  return (
    <ProtectedRoute>
      <div className="mx-auto max-w-[1400px] px-6 py-10 lg:px-10">
        {/* Header with stats */}
        <BookmarkHeader customStats={customStats} />

        {/* Filters */}
        <div className="mt-8">
          <BookmarkFilters
            filter={filter}
            onFilterChange={setFilter}
            sort={sort}
            onSortChange={setSort}
          />
        </div>

        {/* Grid or Loader */}
        <div className="mt-8">
          {loading ? (
            <div className="flex h-64 items-center justify-center">
              <Loader2 className="h-8 w-8 animate-spin text-neutral-400" />
            </div>
          ) : (
            <BookmarkGrid bookmarks={filteredBookmarks} onRemove={handleRemove} />
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
}