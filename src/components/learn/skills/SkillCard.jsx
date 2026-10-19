import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Clock3,
} from "lucide-react";
import { TechIcon } from "@/components/shared";

export default function SkillCard({ skill }) {
  return (
    <Link
      href={`/learn/skills/${skill.slug}`}
      className="group flex h-full flex-col rounded-2xl border border-neutral-200 bg-white p-5 transition duration-200 hover:-translate-y-0.5 hover:border-neutral-300 hover:shadow-lg"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-neutral-50 border border-neutral-200 p-2 shadow-2xs">
          <TechIcon name={skill.name} className="h-full w-full" />
        </div>

        <span className="rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium text-neutral-600">
          {skill.level}
        </span>
      </div>

      <h2 className="mt-4 text-base font-bold text-neutral-900 transition group-hover:text-black">
        {skill.name}
      </h2>

      <p className="mt-2 line-clamp-2 text-xs leading-5 text-neutral-500">
        {skill.description}
      </p>

      <div className="mt-4 flex items-center gap-4 text-xs text-neutral-500">
        <span className="flex items-center gap-1.5">
          <BookOpen className="h-3.5 w-3.5 text-neutral-400" />
          {skill.lessons} Lessons
        </span>

        <span className="flex items-center gap-1.5">
          <Clock3 className="h-3.5 w-3.5 text-neutral-400" />
          {skill.duration}
        </span>
      </div>

      <div className="mt-auto pt-5">
        <div className="flex items-center justify-between text-xs">
          <span className="font-medium text-neutral-400">
            Progress
          </span>

          <span className="font-bold text-neutral-900">
            {skill.progress}%
          </span>
        </div>

        <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-neutral-100">
          <div
            className="h-full rounded-full bg-black transition-all duration-500"
            style={{ width: `${skill.progress}%` }}
          />
        </div>

        <div className="mt-4 flex items-center justify-between border-t border-neutral-100 pt-3">
          <span className="text-xs font-semibold text-neutral-900">
            View Skill
          </span>

          <span className="flex h-7 w-7 items-center justify-center rounded-full border border-neutral-200 transition group-hover:border-neutral-900 group-hover:bg-neutral-900 group-hover:text-white">
            <ArrowRight className="h-3.5 w-3.5" />
          </span>
        </div>
      </div>
    </Link>
  );
}