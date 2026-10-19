import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

export default function SkillNavigation({ skill }) {
  return (
    <div className="mt-4 grid gap-4 md:grid-cols-2">
      <Link
        href={`/learn/skills/${skill.previousSkill?.slug || "#"}`}
        className="flex items-center justify-between rounded-2xl border border-neutral-200 bg-white px-5 py-5"
      >
        <div className="flex items-center gap-3">
          <ArrowLeft className="h-5 w-5" />

          <div>
            <p className="text-xs text-neutral-500">Previous</p>

            <p className="mt-1 font-semibold text-neutral-900">
              {skill.previousSkill?.name || "Previous Skill"}
            </p>
          </div>
        </div>
      </Link>

      <Link
        href={`/learn/skills/${skill.nextSkill?.slug || "#"}`}
        className="flex items-center justify-between rounded-2xl border border-neutral-200 bg-white px-5 py-5"
      >
        <div className="ml-auto text-right">
          <div className="flex items-center justify-end gap-3">
            <div>
              <p className="text-xs text-neutral-500">Next</p>

              <p className="mt-1 font-semibold text-neutral-900">
                {skill.nextSkill?.name || "Next Skill"}
              </p>
            </div>

            <ArrowRight className="h-5 w-5" />
          </div>
        </div>
      </Link>
    </div>
  );
}