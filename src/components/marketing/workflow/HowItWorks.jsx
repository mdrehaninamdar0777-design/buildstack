import {
  LayoutGrid,
  BookOpen,
  Code2,
  PenTool,
  FolderGit2,
  Trophy,
} from "lucide-react";

const steps = [
  {
    step: 1,
    icon: LayoutGrid,
    title: "Choose a Domain",
    description: "Pick a domain you want to master.",
  },
  {
    step: 2,
    icon: BookOpen,
    title: "Follow Roadmap",
    description: "Follow a structured roadmap designed by experts.",
  },
  {
    step: 3,
    icon: Code2,
    title: "Learn Skills",
    description: "Learn skills through curated resources and lessons.",
  },
  {
    step: 4,
    icon: PenTool,
    title: "Practice & Quiz",
    description: "Practice what you learn and test your knowledge with quizzes.",
  },
  {
    step: 5,
    icon: FolderGit2,
    title: "Build Projects",
    description: "Apply your knowledge by building real-world projects.",
  },
  {
    step: 6,
    icon: Trophy,
    title: "Become Job Ready",
    description: "Track your progress and become a confident developer.",
  },
];

export default function HowItWorks() {
  return (
    <section className="w-full bg-white py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
            How BuildStack Works
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">
            Your learning journey, step by step
          </h2>
        </div>

        <div className="mt-16 grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-6 lg:gap-6">
          {steps.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="flex flex-col items-center text-center"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-neutral-200 bg-neutral-50 text-neutral-900 shadow-sm transition hover:border-neutral-300 hover:bg-neutral-100">
                  <Icon className="h-6 w-6 stroke-[1.75]" />
                </div>
                <h3 className="mt-4 text-sm font-bold text-neutral-900">
                  {item.title}
                </h3>
                <p className="mt-2 text-xs leading-5 text-neutral-500">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
