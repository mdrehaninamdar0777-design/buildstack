import { Link2, Box, Code2 } from "lucide-react";

const benefits = [
  {
    icon: Link2,
    title: "Learn with Structure",
    description:
      "Well-structured roadmaps that break complex topics into simple, actionable steps for better understanding.",
  },
  {
    icon: Box,
    title: "Stay Consistent",
    description:
      "Build streaks, set goals, and track your progress to stay motivated and consistent every day.",
  },
  {
    icon: Code2,
    title: "Build Real Skills",
    description:
      "Apply what you learn with projects, resources, and real-world examples to build strong foundations.",
  },
];

export default function WhyBuildStack() {
  return (
    <section className="w-full bg-white py-24">
      <div className="mx-auto max-w-6xl px-6">

        {/* Section Heading */}
        <div className="text-center">
          <p className="text-sm font-medium uppercase tracking-wider text-neutral-500">
            Why BuildStack
          </p>
        </div>

        {/* Benefits */}
        <div className="mt-12 grid grid-cols-1 divide-y divide-neutral-200 md:grid-cols-3 md:divide-x md:divide-y-0">
          {benefits.map((benefit) => {
            const Icon = benefit.icon;

            return (
              <div
                key={benefit.title}
                className="px-8 py-6 text-center md:py-4"
              >
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl border border-neutral-200 bg-white">
                  <Icon className="h-6 w-6 text-neutral-900" />
                </div>

                <h3 className="mt-5 text-lg font-bold text-neutral-900">
                  {benefit.title}
                </h3>

                <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-neutral-600">
                  {benefit.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}