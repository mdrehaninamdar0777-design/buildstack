import {
  CircleHelp,
  CheckCircle2,
  Target,
} from "lucide-react";

export default function SkillOverviewCards({ skill }) {
  return (
    <div className="grid gap-4 lg:grid-cols-3">
      <InfoCard
        icon={CircleHelp}
        title="Overview"
        action="View Overview →"
      >
        {skill.overview}
      </InfoCard>

      <InfoCard
        icon={CheckCircle2}
        title="Prerequisites"
        action="View All Prerequisites →"
      >
        <ul className="space-y-3">
          {skill.prerequisites?.map((item) => (
            <li key={item}>• {item}</li>
          ))}
        </ul>
      </InfoCard>

      <InfoCard
        icon={Target}
        title="Learning Outcomes"
        action="View All Outcomes →"
      >
        <ul className="space-y-3">
          {skill.outcomes?.map((item) => (
            <li key={item}>• {item}</li>
          ))}
        </ul>
      </InfoCard>
    </div>
  );
}

function InfoCard({ icon: Icon, title, action, children }) {
  return (
    <section className="flex min-h-[230px] flex-col rounded-2xl border border-neutral-200 bg-white p-5">
      <div className="flex items-center gap-3">
        <Icon className="h-6 w-6 text-neutral-800" />

        <h2 className="text-lg font-semibold text-neutral-900">
          {title}
        </h2>
      </div>

      <div className="mt-5 text-sm leading-7 text-neutral-600">
        {children}
      </div>

      <button
        type="button"
        className="mt-auto pt-5 text-left text-sm font-semibold text-neutral-900"
      >
        {action}
      </button>
    </section>
  );
}