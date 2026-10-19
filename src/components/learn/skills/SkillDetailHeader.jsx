import {
  BarChart3,
  BookOpen,
  Clock3,
  Folder,
  CheckCircle2,
  Bookmark,
  Play,
  Check,
} from "lucide-react";
import { TechIcon } from "@/components/shared";

export default function SkillDetailHeader({ skill }) {

  return (
    <section className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-xs lg:p-8">
      <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
        <div>
          <div className="flex items-start gap-5">
            {/* Tech Logo */}
            <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-2xl bg-neutral-50 border border-neutral-200 shadow-2xs p-4">
              <TechIcon name={skill.name} className="h-full w-full" />
            </div>

            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2.5">
                <h1 className="text-3xl font-bold tracking-tight text-neutral-950 sm:text-4xl">
                  {skill.name}
                </h1>

                {/* Verified Badge */}
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-neutral-900 text-white" title="Verified Skill">
                  <Check className="h-3 w-3 stroke-[3]" />
                </span>
              </div>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-neutral-600 sm:text-base sm:leading-7">
                {skill.description}
              </p>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-5 border-t border-neutral-100 pt-6 md:grid-cols-4">
            <Stat
              icon={BarChart3}
              label="Difficulty"
              value={skill.level}
            />

            <Stat
              icon={Clock3}
              label="Estimated Time"
              value={skill.duration}
            />

            <Stat
              icon={BookOpen}
              label="Lessons"
              value={skill.lessons}
            />

            <Stat
              icon={Folder}
              label="Category"
              value={skill.category}
            />
          </div>
        </div>

        {/* Progress box */}
        <div className="flex flex-col justify-between rounded-xl bg-neutral-50/50 p-5 border border-neutral-100 lg:bg-transparent lg:p-0 lg:border-0">
          <div>
            <p className="text-xs font-medium text-neutral-500">
              Your Progress
            </p>

            <p className="mt-1 text-3xl font-bold text-neutral-950 sm:text-4xl">
              {skill.progress}%
            </p>

            <div className="mt-3 h-2 overflow-hidden rounded-full bg-neutral-200">
              <div
                className="h-full rounded-full bg-black transition-all duration-500"
                style={{ width: `${skill.progress}%` }}
              />
            </div>

            <p className="mt-2 text-xs text-neutral-500">
              {Math.round((skill.lessons * skill.progress) / 100)} /{" "}
              {skill.lessons} lessons completed
            </p>
          </div>

          <div className="mt-5 space-y-2.5">
            <button
              type="button"
              className="flex h-10 w-full items-center justify-center gap-2 rounded-xl bg-black text-xs font-semibold text-white transition hover:bg-neutral-800"
            >
              <Play className="h-3.5 w-3.5 fill-white" />
              Resume Learning
            </button>

            <button
              type="button"
              className="flex h-10 w-full items-center justify-center gap-2 rounded-xl border border-neutral-200 bg-white text-xs font-semibold text-neutral-900 transition hover:bg-neutral-50"
            >
              <Bookmark className="h-3.5 w-3.5" />
              Bookmark
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({ icon: Icon, label, value }) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-neutral-50 text-neutral-600 border border-neutral-100">
        <Icon className="h-4 w-4 text-neutral-700" />
      </div>

      <div>
        <p className="text-[11px] font-medium text-neutral-400">{label}</p>
        <p className="text-xs font-semibold text-neutral-900 sm:text-sm">{value}</p>
      </div>
    </div>
  );
}