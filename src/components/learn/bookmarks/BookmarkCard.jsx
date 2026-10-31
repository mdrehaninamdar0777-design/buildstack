import Link from "next/link";
import {
  ArrowRight,
  Bookmark,
  Map,
  FileText,
  Clock3,
  ExternalLink,
  MoreHorizontal,
} from "lucide-react";
import { TechIcon } from "@/components/shared";

function SkillBookmarkCard({ bookmark, onRemove }) {
  return (
    <div className="flex flex-col rounded-2xl border border-neutral-200 bg-white p-5 transition hover:-translate-y-0.5 hover:shadow-md">
      {/* Top Row */}
      <div className="flex items-start justify-between">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-neutral-50 border border-neutral-200 p-2 shadow-2xs">
          <TechIcon name={bookmark.title} className="h-full w-full" />
        </div>
        <button
          type="button"
          onClick={() => onRemove && onRemove(bookmark.id)}
          title="Remove bookmark"
          className="flex h-8 w-8 items-center justify-center rounded-lg text-neutral-400 hover:bg-neutral-100"
        >
          <MoreHorizontal className="h-4 w-4" />
        </button>
      </div>

      {/* Title + Level */}
      <div className="mt-4">
        <div className="flex items-center gap-2">
          <h3 className="text-base font-semibold text-neutral-900">
            {bookmark.title}
          </h3>
          {bookmark.level && (
            <span className="rounded-full bg-neutral-100 px-2.5 py-0.5 text-xs text-neutral-600">
              {bookmark.level}
            </span>
          )}
        </div>
        <p className="mt-0.5 text-xs text-neutral-400">{bookmark.category}</p>
      </div>

      {/* Progress Bar */}
      <div className="mt-4">
        <div className="mb-1.5 flex items-center justify-between text-xs">
          <span className="text-neutral-500">Progress</span>
          <span className="font-semibold text-neutral-900">{bookmark.progress || 0}%</span>
        </div>
        <div className="h-1.5 overflow-hidden rounded-full bg-neutral-100">
          <div
            className="h-full rounded-full bg-neutral-900"
            style={{ width: `${bookmark.progress || 0}%` }}
          />
        </div>
      </div>

      {/* Meta */}
      <div className="mt-3 flex items-center justify-between text-xs text-neutral-400">
        <span className="flex items-center gap-1">
          <Bookmark className="h-3.5 w-3.5 fill-neutral-700 text-neutral-700" />
          {bookmark.savedOn ? `Saved on ${bookmark.savedOn}` : "Saved"}
        </span>
      </div>

      {/* Action Row */}
      <div className="mt-4 flex items-center gap-2">
        <Link
          href={bookmark.href || `/learn/skills/${bookmark.title?.toLowerCase().replace(/[^a-z0-9]/g, "-")}`}
          className="flex h-9 flex-1 items-center justify-center rounded-lg bg-neutral-900 text-sm font-semibold text-white transition hover:bg-neutral-700"
        >
          Continue →
        </Link>
        <button
          type="button"
          onClick={() => onRemove && onRemove(bookmark.id)}
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-neutral-200 text-neutral-900 hover:bg-neutral-50"
          aria-label="Remove bookmark"
          title="Remove bookmark"
        >
          <Bookmark className="h-4 w-4 fill-neutral-900" />
        </button>
      </div>
    </div>
  );
}

function RoadmapBookmarkCard({ bookmark, onRemove }) {
  return (
    <div className="flex flex-col rounded-2xl border border-neutral-200 bg-white p-5 transition hover:-translate-y-0.5 hover:shadow-md">
      {/* Top Row */}
      <div className="flex items-start justify-between">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-neutral-100 text-neutral-700">
          <Map className="h-5 w-5" strokeWidth={1.8} />
        </div>
        <button
          type="button"
          onClick={() => onRemove && onRemove(bookmark.id)}
          title="Remove bookmark"
          className="flex h-8 w-8 items-center justify-center rounded-lg text-neutral-400 hover:bg-neutral-100"
        >
          <MoreHorizontal className="h-4 w-4" />
        </button>
      </div>

      {/* Title */}
      <div className="mt-4">
        <h3 className="text-base font-semibold text-neutral-900">
          {bookmark.title}
        </h3>
        <p className="mt-0.5 text-xs text-neutral-400">{bookmark.category}</p>
      </div>

      {/* Progress Bar */}
      <div className="mt-4">
        <div className="h-1.5 overflow-hidden rounded-full bg-neutral-100">
          <div
            className="h-full rounded-full bg-neutral-900"
            style={{ width: `${bookmark.progress || 0}%` }}
          />
        </div>
        <div className="mt-1.5 text-right text-xs font-semibold text-neutral-900">
          {bookmark.progress || 0}%
        </div>
      </div>

      {/* Meta */}
      <div className="mt-3 flex items-center justify-between text-xs text-neutral-400">
        <span className="flex items-center gap-1 font-medium text-neutral-700">
          <Bookmark className="h-3 w-3 fill-neutral-700 text-neutral-700" />
          {bookmark.savedOn ? `Saved on ${bookmark.savedOn}` : "Saved"}
        </span>
      </div>

      {/* Action Row */}
      <div className="mt-4 flex items-center gap-2">
        <Link
          href={bookmark.href || `/learn/roadmaps/${bookmark.id.replace("roadmap-", "")}`}
          className="flex h-9 flex-1 items-center justify-center rounded-lg border border-neutral-200 text-sm font-semibold text-neutral-900 transition hover:border-neutral-900"
        >
          Resume Roadmap →
        </Link>
        <button
          type="button"
          onClick={() => onRemove && onRemove(bookmark.id)}
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-neutral-200 text-neutral-900 hover:bg-neutral-50"
          aria-label="Remove bookmark"
          title="Remove bookmark"
        >
          <Bookmark className="h-4 w-4 fill-neutral-900" />
        </button>
      </div>
    </div>
  );
}

function ResourceBookmarkCard({ bookmark, onRemove }) {
  return (
    <div className="flex flex-col rounded-2xl border border-neutral-200 bg-white p-5 transition hover:-translate-y-0.5 hover:shadow-md">
      {/* Top Row */}
      <div className="flex items-start justify-between">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-neutral-100 text-neutral-700">
          <FileText className="h-5 w-5" strokeWidth={1.8} />
        </div>
        <button
          type="button"
          onClick={() => onRemove && onRemove(bookmark.id)}
          title="Remove bookmark"
          className="flex h-8 w-8 items-center justify-center rounded-lg text-neutral-400 hover:bg-neutral-100"
        >
          <MoreHorizontal className="h-4 w-4" />
        </button>
      </div>

      {/* Title */}
      <div className="mt-4">
        <h3 className="text-base font-semibold text-neutral-900">
          {bookmark.title}
        </h3>
        <p className="mt-0.5 text-xs text-neutral-400">{bookmark.category}</p>
      </div>

      {/* Meta */}
      <div className="mt-3 flex items-center justify-between text-xs text-neutral-400">
        <span className="flex items-center gap-1 font-medium text-neutral-700">
          <Bookmark className="h-3 w-3 fill-neutral-700 text-neutral-700" />
          {bookmark.savedOn ? `Saved on ${bookmark.savedOn}` : "Saved"}
        </span>
      </div>

      {/* Action Row */}
      <div className="mt-auto pt-4 flex items-center gap-2">
        <a
          href={bookmark.href}
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-9 flex-1 items-center justify-center gap-1.5 rounded-lg border border-neutral-200 text-sm font-semibold text-neutral-900 transition hover:border-neutral-900"
        >
          Open
          <ExternalLink className="h-3.5 w-3.5" />
        </a>
        <button
          type="button"
          onClick={() => onRemove && onRemove(bookmark.id)}
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-neutral-200 text-neutral-900 hover:bg-neutral-50"
          aria-label="Remove bookmark"
          title="Remove bookmark"
        >
          <Bookmark className="h-4 w-4 fill-neutral-900" />
        </button>
      </div>
    </div>
  );
}

export default function BookmarkCard({ bookmark, onRemove }) {
  if (bookmark.type === "skill") {
    return <SkillBookmarkCard bookmark={bookmark} onRemove={onRemove} />;
  }
  if (bookmark.type === "roadmap") {
    return <RoadmapBookmarkCard bookmark={bookmark} onRemove={onRemove} />;
  }
  return <ResourceBookmarkCard bookmark={bookmark} onRemove={onRemove} />;
}