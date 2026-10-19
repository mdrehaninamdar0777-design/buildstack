import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Clock3,
  Layers,
  Code2,
  Terminal,
  Cloud,
  Sparkles,
  BarChart3,
  Smartphone,
  Database,
  Shield,
  Cpu,
} from "lucide-react";

import { TechIcon } from "@/components/shared";

const ROADMAP_ICONS = {
  "frontend-developer": Code2,
  "backend-developer": Terminal,
  "full-stack-developer": Layers,
  "devops-engineer": Cloud,
  "ai-engineer": Sparkles,
  "data-scientist": BarChart3,
  "android-developer": Smartphone,
  "data-engineer": Database,
  "cyber-security": Shield,
  "machine-learning-engineer": Cpu,
  "cloud-engineer": Cloud,
  "software-developer": Code2,
};

function TechBadge({ tech }) {
  return (
    <span
      className="flex h-7 w-7 items-center justify-center rounded-lg border border-neutral-200 bg-neutral-50 p-1 shadow-2xs"
      title={tech}
    >
      <TechIcon name={tech} className="h-full w-full" />
    </span>
  );
}

export default function RoadmapCard({ roadmap }) {
  const Icon = ROADMAP_ICONS[roadmap.slug] || Code2;

  return (
    <Link
      href={`/learn/roadmaps/${roadmap.slug}`}
      className="group flex h-full flex-col rounded-2xl border border-neutral-200 bg-white p-5 transition duration-200 hover:-translate-y-0.5 hover:border-neutral-300 hover:shadow-lg"
    >
      {/* Top Header: Roadmap Icon + Technology icons */}
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-black text-white shadow-xs">
          <Icon className="h-5 w-5" strokeWidth={1.8} />
        </div>

        <div className="flex flex-wrap items-center gap-1.5">
          {roadmap.technologies?.slice(0, 4).map((tech) => (
            <TechBadge key={tech} tech={tech} />
          ))}
        </div>
      </div>

      {/* Title */}
      <h2 className="text-lg font-bold tracking-tight text-neutral-950 transition group-hover:text-black">
        {roadmap.title}
      </h2>

      {/* Level */}
      <div className="mt-2.5">
        <span className="inline-flex rounded-full bg-neutral-100 px-2.5 py-0.5 text-xs font-medium text-neutral-600">
          {roadmap.level}
        </span>
      </div>

      {/* Description */}
      <p className="mt-3 line-clamp-2 text-xs leading-5 text-neutral-600">
        {roadmap.description}
      </p>

      {/* Stats */}
      <div className="mt-auto pt-5">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-neutral-500">
          <div className="flex items-center gap-1.5">
            <Clock3 className="h-3.5 w-3.5 text-neutral-400" />
            <span>{roadmap.duration}</span>
          </div>

          <div className="flex items-center gap-1.5">
            <BookOpen className="h-3.5 w-3.5 text-neutral-400" />
            <span>{roadmap.skills} Skills</span>
          </div>

          <div className="flex items-center gap-1.5">
            <Layers className="h-3.5 w-3.5 text-neutral-400" />
            <span>{roadmap.resources}</span>
          </div>
        </div>

        {/* View Roadmap Action */}
        <div className="mt-4">
          <span className="flex h-10 w-full items-center justify-center gap-2 rounded-xl border border-neutral-200 bg-white text-xs font-semibold text-neutral-900 transition group-hover:border-neutral-900 group-hover:bg-neutral-900 group-hover:text-white">
            View Roadmap
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
          </span>
        </div>
      </div>
    </Link>
  );
}