import { Code2, Map, FileText, Clock3 } from "lucide-react";
import { bookmarkStats } from "@/data/learn/bookmarks.data";

const stats = [
  {
    icon: Code2,
    value: bookmarkStats.savedSkills,
    label: "Saved Skills",
    sublabel: "Total bookmarked skills",
  },
  {
    icon: Map,
    value: bookmarkStats.savedRoadmaps,
    label: "Saved Roadmaps",
    sublabel: "Total bookmarked roadmaps",
  },
  {
    icon: FileText,
    value: bookmarkStats.savedResources,
    label: "Saved Resources",
    sublabel: "Total bookmarked resources",
  },
  {
    icon: Clock3,
    value: bookmarkStats.recentlyAdded,
    label: "Recently Added",
    sublabel: "In the last 7 days",
  },
];

export default function BookmarkHeader() {
  return (
    <div>
      {/* Page Title */}
      <div className="flex items-center gap-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-black text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-7 w-7"
          >
            <path
              fillRule="evenodd"
              d="M6.32 2.577a49.255 49.255 0 0 1 11.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 0 1-1.085.67L12 18.089l-7.165 3.583A.75.75 0 0 1 3.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93Z"
              clipRule="evenodd"
            />
          </svg>
        </div>

        <div>
          <h1 className="text-3xl font-bold tracking-tight text-neutral-900">
            Bookmarks
          </h1>
          <p className="mt-1 text-sm text-neutral-500">
            Your saved learning resources. Continue where you left off.
          </p>
        </div>
      </div>

      {/* Stats Strip */}
      <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="flex items-center gap-4 rounded-2xl border border-neutral-200 bg-white p-5"
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-neutral-100">
                <Icon className="h-5 w-5 text-neutral-700" strokeWidth={1.8} />
              </div>

              <div>
                <div className="text-2xl font-bold text-neutral-900">
                  {stat.value}
                </div>
                <div className="text-xs font-medium text-neutral-700">
                  {stat.label}
                </div>
                <div className="mt-0.5 text-xs text-neutral-400">
                  {stat.sublabel}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}