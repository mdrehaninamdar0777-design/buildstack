import {
  ArrowRight,
  Code2,
  Database,
  Monitor,
  Server,
} from "lucide-react";

import TechnologyCard from "./TechnologyCard";

const sectionIcons = {
  Frontend: Monitor,
  Backend: Server,
  Database: Database,
};

const sectionColors = {
  Frontend: "text-blue-600",
  Backend: "text-green-600",
  Database: "text-indigo-600",
};

export default function TechnologySection({
  title,
  technologies,
  count,
}) {
  const Icon = sectionIcons[title] || Code2;
  const iconColor = sectionColors[title] || "text-neutral-700";

  return (
    <section className="rounded-2xl border border-neutral-200 bg-white p-4 lg:p-5">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Icon className={`h-6 w-6 ${iconColor}`} />

          <h2 className="text-xl font-semibold text-neutral-900">
            {title}
          </h2>

          <span className="rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium text-neutral-700">
            {count} Technologies
          </span>
        </div>

        <button
          type="button"
          className="hidden items-center gap-2 text-sm font-medium text-neutral-700 hover:text-neutral-900 sm:flex"
        >
          View All
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-6">
        {technologies.map((technology) => (
          <TechnologyCard
            key={technology.id}
            technology={technology}
          />
        ))}
      </div>
    </section>
  );
}