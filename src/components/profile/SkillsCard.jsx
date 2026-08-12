import { Code2 } from "lucide-react";

export default function SkillsCard({ skills }) {
  return (
    <section className="rounded-2xl border border-neutral-200 bg-white p-7 shadow-sm">
      <div className="mb-6 flex items-center gap-3">
        <Code2 className="h-5 w-5 text-neutral-900" />

        <h2 className="text-xl font-semibold text-neutral-900">
          Skills
        </h2>
      </div>

      <div className="flex flex-wrap gap-3">
        {skills.map((skill) => (
          <span
            key={skill}
            className="rounded-lg border border-neutral-200 bg-white px-4 py-2 text-sm font-medium text-neutral-800"
          >
            {skill}
          </span>
        ))}
      </div>
    </section>
  );
}