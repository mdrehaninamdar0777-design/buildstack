import Link from "next/link";
import { TechIcon } from "@/components/shared";
import { Sparkles } from "lucide-react";
import { homeData } from "./home.data";

export default function RecommendedSkills() {
  const { recommendedSkills } = homeData;

  return (
    <section className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-xs">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-neutral-100 text-neutral-800">
            <Sparkles className="h-4 w-4" />
          </div>

          <h2 className="text-lg font-bold tracking-tight text-neutral-900">
            Recommended Skills
          </h2>
        </div>

        <Link
          href="/learn/skills"
          className="text-xs font-semibold text-neutral-600 transition hover:text-black"
        >
          View all
        </Link>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3 xl:grid-cols-4">
        {recommendedSkills.map((skill) => (
          <Link
            key={skill.title}
            href={`/learn/skills/${skill.title.toLowerCase().replace(/[^a-z0-9]/g, "")}`}
            className="group rounded-xl border border-neutral-200 p-3.5 transition-all duration-200 hover:-translate-y-0.5 hover:border-neutral-400 hover:shadow-2xs"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-neutral-50 border border-neutral-100 p-1.5 shadow-2xs">
                <TechIcon name={skill.icon || skill.title} className="h-full w-full" />
              </div>

              <div className="min-w-0 flex-1">
                <h3 className="truncate text-sm font-bold text-neutral-900 group-hover:text-black">
                  {skill.title}
                </h3>

                <p className="mt-0.5 truncate text-xs text-neutral-500">
                  {skill.level}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}