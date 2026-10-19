import Link from "next/link";
import BookmarkCard from "./BookmarkCard";

function SectionHeader({ title, onViewAll }) {
  return (
    <div className="mb-4 flex items-center justify-between">
      <h2 className="text-lg font-semibold text-neutral-900">{title}</h2>
      <Link
        href="#"
        className="text-sm font-medium text-neutral-500 hover:text-neutral-900 transition"
      >
        View all
      </Link>
    </div>
  );
}

export default function BookmarkGrid({ bookmarks }) {
  const skills = bookmarks.filter((b) => b.type === "skill");
  const roadmaps = bookmarks.filter((b) => b.type === "roadmap");
  const resources = bookmarks.filter((b) => b.type === "resource");

  if (bookmarks.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-neutral-300 px-6 py-16 text-center">
        <h2 className="text-lg font-semibold text-neutral-900">
          No bookmarks found
        </h2>
        <p className="mt-2 text-sm text-neutral-500">
          Start bookmarking skills, roadmaps, and resources to see them here.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      {skills.length > 0 && (
        <section>
          <SectionHeader title="Skills" />
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {skills.map((bookmark) => (
              <BookmarkCard key={bookmark.id} bookmark={bookmark} />
            ))}
          </div>
        </section>
      )}

      {roadmaps.length > 0 && (
        <section>
          <SectionHeader title="Roadmaps" />
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {roadmaps.map((bookmark) => (
              <BookmarkCard key={bookmark.id} bookmark={bookmark} />
            ))}
          </div>
        </section>
      )}

      {resources.length > 0 && (
        <section>
          <SectionHeader title="Resources" />
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {resources.map((bookmark) => (
              <BookmarkCard key={bookmark.id} bookmark={bookmark} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}