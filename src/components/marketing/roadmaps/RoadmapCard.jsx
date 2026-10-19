import Link from "next/link";
import { ProgressBar, Badge } from "@/components/ui";
import { Code2, Server, Layers, Cpu } from "lucide-react";

const roadmapIcons = {
  "frontend-developer": {
    icon: Code2,
    color: "text-blue-500 bg-blue-50 border-blue-100",
  },
  "backend-developer": {
    icon: Server,
    color: "text-emerald-500 bg-emerald-50 border-emerald-100",
  },
  "full-stack-developer": {
    icon: Layers,
    color: "text-neutral-900 bg-neutral-100 border-neutral-200",
  },
  "ai-engineer": {
    icon: Cpu,
    color: "text-purple-500 bg-purple-50 border-purple-100",
  },
};

export default function RoadmapCard({
  title,
  slug,
  description,
  progress = 0,
  modules,
  skills,
  duration,
  level,
}) {
  const meta = roadmapIcons[slug] || {
    icon: Code2,
    color: "text-neutral-900 bg-neutral-50 border-neutral-200",
  };
  const Icon = meta.icon;

  return (
    <article className="group flex flex-col justify-between rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-neutral-300 hover:shadow-md">
      <div>
        {/* Header Icon + Level Badge */}
        <div className="flex items-start justify-between">
          <div
            className={`flex h-12 w-12 items-center justify-center rounded-xl border ${meta.color}`}
          >
            <Icon className="h-6 w-6 stroke-[1.75]" />
          </div>
          <span className="rounded-full border border-neutral-200 bg-neutral-50 px-2.5 py-1 text-xs font-semibold text-neutral-600">
            {level}
          </span>
        </div>

        {/* Title & Description */}
        <h3 className="mt-5 text-lg font-bold text-neutral-900">
          {title}
        </h3>
        <p className="mt-2 text-xs leading-5 text-neutral-500 line-clamp-2">
          {description}
        </p>

        {/* Metrics Row */}
        <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-neutral-500">
          <span>{modules} Modules</span>
          <span>•</span>
          <span>{skills} Skills</span>
          <span>•</span>
          <span>{duration}</span>
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-neutral-100">
        {/* Progress Bar */}
        <div className="mb-2 flex items-center justify-between text-xs">
          <span className="text-neutral-500">Progress</span>
          <span className="font-semibold text-neutral-900">{progress}%</span>
        </div>
        <ProgressBar value={progress} />

        {/* CTA Button */}
        <Link
          href={`/learn/roadmaps/${slug}`}
          className="mt-5 flex h-10 w-full items-center justify-center rounded-xl bg-black text-xs font-semibold text-white transition hover:bg-neutral-800"
        >
          Start Learning
        </Link>
      </div>
    </article>
  );
}