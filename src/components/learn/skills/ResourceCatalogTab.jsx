"use client";

import {
  ExternalLink,
  BookOpen,
  Play,
  Clock3,
  Bookmark,
  CheckCircle2,
} from "lucide-react";
import { getResourcesBySkill } from "@/data/learn/resources.data";
import { addBookmark } from "@/lib/api";
import { useState } from "react";

export default function ResourceCatalogTab({ skillSlug, type = "documentation" }) {
  const resources = getResourcesBySkill(skillSlug, type);
  const [savedIds, setSavedIds] = useState(new Set());

  const handleBookmarkResource = async (resource) => {
    try {
      const bookmarkId = `resource-${resource.id}`;
      const res = await addBookmark({
        id: bookmarkId,
        type: "resource",
        title: resource.title,
        category: resource.source,
        level: resource.difficulty,
        href: resource.url,
      });
      if (res?.success) {
        setSavedIds((prev) => new Set([...prev, resource.id]));
      }
    } catch (err) {
      console.error("[ResourceCatalogTab] Error saving bookmark:", err);
    }
  };

  if (resources.length === 0) {
    return (
      <div className="p-8 text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-neutral-100 text-neutral-400">
          {type === "video" ? (
            <Play className="h-6 w-6" />
          ) : (
            <BookOpen className="h-6 w-6" />
          )}
        </div>
        <h4 className="mt-3 text-sm font-bold text-neutral-900">
          {type === "video"
            ? "Video Courses Coming Soon"
            : "Documentation Guides Coming Soon"}
        </h4>
        <p className="mt-1 text-xs text-neutral-500">
          Curated official resources are regularly updated for this skill.
        </p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="grid gap-4 sm:grid-cols-2">
        {resources.map((resource) => {
          const isSaved = savedIds.has(resource.id);
          return (
            <div
              key={resource.id}
              className="flex flex-col rounded-2xl border border-neutral-200 bg-white p-5 shadow-2xs transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="flex items-start justify-between gap-3">
                <span className="rounded-full bg-neutral-100 px-2.5 py-0.5 text-[11px] font-semibold text-neutral-700">
                  {resource.source}
                </span>

                <span className="text-[11px] font-medium text-neutral-400">
                  {resource.difficulty}
                </span>
              </div>

              <h4 className="mt-3 text-base font-bold text-neutral-900 line-clamp-2">
                {resource.title}
              </h4>

              <p className="mt-2 text-xs leading-5 text-neutral-600 line-clamp-3">
                {resource.description}
              </p>

              <div className="mt-4 flex items-center gap-1.5 text-xs text-neutral-400">
                <Clock3 className="h-3.5 w-3.5" />
                <span>Estimated duration: {resource.duration}</span>
              </div>

              <div className="mt-5 flex items-center gap-2 pt-3 border-t border-neutral-100">
                <a
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 flex-1 items-center justify-center gap-1.5 rounded-xl bg-black text-xs font-semibold text-white transition hover:bg-neutral-800"
                >
                  {type === "video" ? (
                    <>
                      <Play className="h-3 w-3 fill-white" />
                      Watch Video
                    </>
                  ) : (
                    <>
                      Read Guide
                      <ExternalLink className="h-3 w-3" />
                    </>
                  )}
                </a>

                <button
                  type="button"
                  onClick={() => handleBookmarkResource(resource)}
                  title={isSaved ? "Saved to Bookmarks" : "Bookmark this resource"}
                  className={`flex h-9 w-9 items-center justify-center rounded-xl border transition ${
                    isSaved
                      ? "border-emerald-200 bg-emerald-50 text-emerald-600"
                      : "border-neutral-200 bg-white text-neutral-500 hover:bg-neutral-50 hover:text-neutral-900"
                  }`}
                >
                  {isSaved ? (
                    <CheckCircle2 className="h-4 w-4" />
                  ) : (
                    <Bookmark className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
