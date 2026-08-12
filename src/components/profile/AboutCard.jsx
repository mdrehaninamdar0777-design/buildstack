import { CalendarDays, MapPin, UserRound } from "lucide-react";

export default function AboutCard({ about }) {
  return (
    <section className="rounded-2xl border border-neutral-200 bg-white p-7 shadow-sm">
      {/* Header */}
      <div className="mb-6 flex items-center gap-3">
        <UserRound className="h-5 w-5 text-neutral-900" />

        <h2 className="text-xl font-semibold text-neutral-900">
          About
        </h2>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1.5fr_1fr_0.8fr]">
        {/* About text */}
        <div>
          <h3 className="font-medium text-neutral-900">
            {about.title}
          </h3>

          <p className="mt-2 max-w-2xl leading-7 text-neutral-500">
            {about.description}
          </p>
        </div>

        {/* Location */}
        <div className="border-neutral-200 lg:border-l lg:pl-8">
          <div className="flex items-start gap-3">
            <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-neutral-900" />

            <div>
              <p className="text-sm text-neutral-500">
                Location
              </p>

              <p className="mt-1 font-medium text-neutral-900">
                {about.location}
              </p>
            </div>
          </div>
        </div>

        {/* Joined */}
        <div className="border-neutral-200 lg:border-l lg:pl-8">
          <div className="flex items-start gap-3">
            <CalendarDays className="mt-0.5 h-5 w-5 shrink-0 text-neutral-900" />

            <div>
              <p className="text-sm text-neutral-500">
                Joined
              </p>

              <p className="mt-1 font-medium text-neutral-900">
                {about.joined}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}