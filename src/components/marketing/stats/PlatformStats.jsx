import { Map, Code, FileText, Users, Clock } from "lucide-react";

const stats = [
  {
    icon: Map,
    value: "50+",
    label: "Learning Paths",
  },
  {
    icon: Code,
    value: "600+",
    label: "Skills",
  },
  {
    icon: FileText,
    value: "5000+",
    label: "Resources",
  },
  {
    icon: Users,
    value: "10K+",
    label: "Developers",
  },
  {
    icon: Clock,
    value: "1M+",
    label: "Learning Hours",
  },
];

export default function PlatformStats() {
  return (
    <section className="w-full border-y border-neutral-100 bg-white py-12">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-5 md:gap-4">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="flex flex-col items-center justify-center text-center sm:flex-row sm:gap-4 sm:text-left"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-neutral-200 bg-neutral-50 text-neutral-800">
                  <Icon className="h-5 w-5" />
                </div>
                <div className="mt-2 sm:mt-0">
                  <p className="text-2xl font-bold tracking-tight text-neutral-900">
                    {stat.value}
                  </p>
                  <p className="text-xs font-medium text-neutral-500">
                    {stat.label}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
