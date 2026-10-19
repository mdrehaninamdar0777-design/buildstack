import Link from "next/link";
import { ChevronRight, Code2 } from "lucide-react";
import { Card } from "@/components/ui";
import { cn } from "@/lib/utils";
import { TechIcon } from "@/components/shared";

const skillColors = {
  React: "bg-blue-600",
  JavaScript: "bg-amber-500",
  "Node.js": "bg-emerald-600",
  MongoDB: "bg-green-600",
  TypeScript: "bg-blue-600",
};

export default function SkillProgressCard({
  title = "Skill Progress",
  skills = [],
  viewAllHref = "/learn/skills",
  className,
}) {
  return (
    <Card className={cn("p-6", className)}>
      {/* Header */}
      <header className="mb-6 flex items-center justify-between">
        <h2 className="text-lg font-bold text-neutral-900">{title}</h2>

        <Link
          href={viewAllHref}
          className="flex items-center gap-1 text-xs font-semibold text-neutral-600 transition hover:text-black"
        >
          View all
          <ChevronRight className="h-4 w-4" />
        </Link>
      </header>

      {/* Skills */}
      {skills.length > 0 ? (
        <div className="space-y-4">
          {skills.map((skill) => {
            const barColor = skillColors[skill.name] || "bg-black";
            return (
              <article key={skill.id} className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-neutral-50 border border-neutral-100 p-0.5">
                      <TechIcon name={skill.name} className="h-full w-full" />
                    </span>
                    <span className="font-bold text-neutral-900">
                      {skill.name}
                    </span>
                  </div>

                  <span className="font-semibold text-neutral-700">
                    {skill.progress}%
                  </span>
                </div>

                <div className="h-2 w-full overflow-hidden rounded-full bg-neutral-100">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${barColor}`}
                    style={{ width: `${skill.progress}%` }}
                  />
                </div>
              </article>
            );
          })}
        </div>
      ) : (
        <div className="flex items-center justify-center rounded-xl border border-dashed border-neutral-200 py-10">
          <p className="text-sm text-neutral-500">No skills found.</p>
        </div>
      )}
    </Card>
  );
}