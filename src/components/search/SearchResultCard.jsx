import {
  ArrowRight,
  BookOpen,
  Code2,
  FileText,
  Map,
  PlayCircle,
} from "lucide-react";

const typeIcons = {
  Roadmaps: Map,
  Skills: Code2,
  Topics: BookOpen,
  Resources: FileText,
};

export default function SearchResultCard({ result }) {
  const Icon = typeIcons[result.type] || PlayCircle;

  return (
    <article className="group rounded-xl border border-neutral-200 bg-white p-5 transition hover:border-neutral-300 hover:shadow-sm">
      <div className="flex items-start gap-4">

        {/* Icon */}
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-neutral-100">
          <Icon className="h-5 w-5 text-neutral-700" />
        </div>

        {/* Content */}
        <div className="min-w-0 flex-1">

          <div className="flex flex-wrap items-center gap-2">
            <h3 className="font-semibold text-neutral-900">
              {result.title}
            </h3>

            <span className="rounded-full bg-neutral-100 px-2.5 py-1 text-xs font-medium text-neutral-600">
              {result.type}
            </span>
          </div>

          <p className="mt-2 text-sm leading-6 text-neutral-500">
            {result.description}
          </p>

          {/* Additional information */}
          <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-neutral-500">

            {result.level && (
              <span className="rounded-full border border-neutral-200 px-2.5 py-1">
                {result.level}
              </span>
            )}

            {result.duration && (
              <span>
                {result.duration}
              </span>
            )}

            {result.progress !== undefined && (
              <div className="flex items-center gap-2">
                <div className="h-1.5 w-20 overflow-hidden rounded-full bg-neutral-100">
                  <div
                    className="h-full rounded-full bg-black"
                    style={{
                      width: `${result.progress}%`,
                    }}
                  />
                </div>

                <span>{result.progress}%</span>
              </div>
            )}
          </div>
        </div>

        {/* Arrow */}
        <button
          type="button"
          className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-neutral-200 text-neutral-500 transition group-hover:border-neutral-300 group-hover:text-neutral-900"
          aria-label={`Open ${result.title}`}
        >
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </article>
  );
}