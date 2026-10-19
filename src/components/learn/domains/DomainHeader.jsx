import { BarChart3, BookOpen, Clock3, Globe2, Code2 } from "lucide-react";
import { TechIcon } from "@/components/shared";

export default function DomainHeader({ domain }) {
  // When used on the domains list page (no domain prop), render a simple heading.
  if (!domain) {
    return (
      <div className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight text-neutral-950">
          Domains
        </h1>
        <p className="mt-2 text-base text-neutral-600">
          Explore technologies, roadmaps and learning resources.
        </p>
      </div>
    );
  }

  const Icon = domain.icon;

  return (
    <>
      {/* Breadcrumb */}
      <div className="mb-6 flex items-center gap-2 text-sm text-neutral-500">
        <span>Learn</span>
        <span>›</span>
        <span>Domains</span>
        <span>›</span>
        <span className="font-medium text-neutral-900">
          {domain.title}
        </span>
      </div>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="flex flex-col gap-8 xl:flex-row xl:items-center xl:justify-between">
          <div className="flex items-start gap-6">
            <div
              className={`flex h-24 w-24 shrink-0 items-center justify-center rounded-2xl ${domain.iconClassName}`}
            >
              <Icon className="h-12 w-12 text-white" />
            </div>

            <div>
              <h1 className="text-4xl font-bold tracking-tight text-neutral-950">
                {domain.title}
              </h1>

              <p className="mt-3 max-w-2xl text-base leading-7 text-neutral-600">
                Learn to build modern websites and web applications from
                scratch and become a job-ready developer.
              </p>
            </div>
          </div>

          {/* Decorative illustration */}
          <div className="hidden h-32 w-72 items-center justify-center xl:flex">
            <div className="grid grid-cols-3 gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-neutral-50 border border-neutral-200 p-2 shadow-2xs">
                <TechIcon name="HTML" className="h-full w-full" />
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-neutral-50 border border-neutral-200 p-2 shadow-2xs">
                <TechIcon name="CSS" className="h-full w-full" />
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-neutral-50 border border-neutral-200 p-2 shadow-2xs">
                <TechIcon name="JavaScript" className="h-full w-full" />
              </div>
              <div className="col-span-2 flex h-12 items-center justify-center rounded-xl border border-neutral-200 bg-white px-3 shadow-2xs">
                <span className="text-xs font-bold text-neutral-800">
                  BuildStack
                </span>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-neutral-50 border border-neutral-200 p-2 shadow-2xs">
                <TechIcon name="React" className="h-full w-full" />
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-8 rounded-2xl border border-neutral-200 bg-white p-5">
          <div className="grid grid-cols-2 gap-5 lg:grid-cols-4">

            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <Code2 className="h-6 w-6" />
              </div>

              <div>
                <p className="text-2xl font-bold text-neutral-900">
                  {domain.technologies}
                </p>
                <p className="text-xs text-neutral-500">
                  Technologies
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50">
                <BookOpen className="h-6 w-6 text-blue-600" />
              </div>

              <div>
                <p className="text-2xl font-bold text-neutral-900">
                  {domain.roadmaps}
                </p>
                <p className="text-xs text-neutral-500">
                  Roadmaps
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50">
                <BarChart3 className="h-6 w-6 text-blue-600" />
              </div>

              <div>
                <p className="text-sm font-bold text-neutral-900">
                  {domain.difficulty}
                </p>
                <p className="text-xs text-neutral-500">
                  Difficulty Level
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-50">
                <Clock3 className="h-6 w-6 text-orange-500" />
              </div>

              <div>
                <p className="text-sm font-bold text-neutral-900">
                  {domain.duration}
                </p>
                <p className="text-xs text-neutral-500">
                  Estimated Duration
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}