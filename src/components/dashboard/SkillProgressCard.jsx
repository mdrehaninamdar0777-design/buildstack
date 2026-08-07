import Link from "next/link";
import { ChevronRight } from "lucide-react";

import {
  Card,
  ProgressBar,
} from "@/components/ui";

import { cn } from "@/lib/utils";

export default function SkillProgressCard({
  title = "Skill Progress",
  skills = [],
  viewAllHref = "/learn",
  className,
}) {
  return (
    <Card className={cn("p-6", className)}>

      {/* Header */}
      <header className="mb-6 flex items-center justify-between">

        <h2 className="text-lg font-semibold text-neutral-900">
          {title}
        </h2>

        <Link
          href={viewAllHref}
          className="flex items-center gap-1 text-sm font-medium text-neutral-500 transition-colors hover:text-neutral-900"
        >
          View All

          <ChevronRight className="h-4 w-4" />
        </Link>

      </header>

      {/* Skills */}
      {skills.length > 0 ? (
        <div className="space-y-6">

          {skills.map((skill) => (
            <article
              key={skill.id}
              className="space-y-3"
            >

              <div className="flex items-center justify-between">

                <div>

                  <h3 className="font-medium text-neutral-900">
                    {skill.name}
                  </h3>

                  <p className="text-sm text-neutral-500">
                    {skill.level}
                  </p>

                </div>

                <span className="text-sm font-semibold text-neutral-700">
                  {skill.progress}%
                </span>

              </div>

              <ProgressBar value={skill.progress} />

            </article>
          ))}

        </div>
      ) : (
        <div className="flex items-center justify-center rounded-xl border border-dashed border-neutral-200 py-10">

          <p className="text-sm text-neutral-500">
            No skills found.
          </p>

        </div>
      )}

    </Card>
  );
}