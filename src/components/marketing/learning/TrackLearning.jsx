import { Button } from "@/components/ui";

const learningPoints = [
  "Continue where you left off",
  "Monitor your weekly progress",
  "Track your streaks and achievements",
  "Manage bookmarks and notes",
];

export default function TrackLearning() {
  return (
   <section className="w-full bg-white py-24">
      <div className="mx-auto max-w-6xl px-6 text-center">

        {/* Label */}
        <p className="text-sm font-medium uppercase tracking-wider text-neutral-500">
          Track & Improve
        </p>

        {/* Heading */}
        <h2 className="mt-4 text-4xl font-bold tracking-tight text-neutral-900 md:text-5xl">
          Track Your Learning Journey in One Place
        </h2>

        {/* Description */}
        <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-neutral-600">
          Visualize your progress, stay consistent, and achieve your
          learning goals.
        </p>

        {/* Learning Points */}
        <div className="mx-auto mt-10 flex max-w-5xl flex-wrap items-center justify-center gap-x-8 gap-y-4">
          {learningPoints.map((point) => (
            <div
              key={point}
              className="flex items-center gap-2 text-sm text-neutral-700"
            >
              <span className="text-base font-semibold text-neutral-900">
                ✓
              </span>

              <span>{point}</span>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-10 flex justify-center">
          <Button href="/dashboard">
            Explore Dashboard →
          </Button>
        </div>

      </div>
    </section>
  );
}