import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  BarChart3,
  Bookmark,
  BookOpen,
  Check,
  ChevronDown,
  Clock3,
  Expand,
  FileText,
  Lightbulb,
  Search,
  Trophy,
  Atom,
  Server,
  Layers,
  FlaskConical,
  Triangle,
  Briefcase,
  Play,
} from "lucide-react";

import { roadmaps } from "@/data/learn/roadmaps.data";
import { TechIcon } from "@/components/shared";

function getRoadmap(slug) {
  return roadmaps.find((roadmap) => roadmap.slug === slug);
}

const roadmapSections = [
  {
    id: "foundation",
    title: "Foundation",
    completed: 5,
    total: 5,
    icon: Trophy,
    iconColor: "text-amber-500",
    completedSection: true,
    skills: [
      { name: "HTML", duration: "1 Week", badge: "Essential", tech: "HTML" },
      { name: "CSS", duration: "1 Week", badge: "Essential", tech: "CSS" },
      { name: "JavaScript", duration: "2 Weeks", badge: "Essential", tech: "JS" },
      { name: "Git", duration: "3 Days", badge: "Essential", tech: "Git" },
      { name: "GitHub", duration: "2 Days", badge: "Essential", tech: "GitHub" },
    ],
  },
  {
    id: "frontend-frameworks",
    title: "Frontend Frameworks",
    completed: 0,
    total: 4,
    icon: Atom,
    iconColor: "text-cyan-500",
    completedSection: false,
    skills: [],
  },
  {
    id: "backend-basics",
    title: "Backend Basics",
    completed: 0,
    total: 6,
    icon: Server,
    iconColor: "text-emerald-500",
    completedSection: false,
    skills: [],
  },
  {
    id: "state-management",
    title: "State Management",
    completed: 0,
    total: 4,
    icon: Layers,
    iconColor: "text-purple-500",
    completedSection: false,
    skills: [],
  },
  {
    id: "testing",
    title: "Testing",
    completed: 0,
    total: 4,
    icon: FlaskConical,
    iconColor: "text-emerald-600",
    completedSection: false,
    skills: [],
  },
  {
    id: "deployment",
    title: "Deployment",
    completed: 0,
    total: 4,
    icon: Triangle,
    iconColor: "text-neutral-900",
    completedSection: false,
    skills: [],
  },
  {
    id: "portfolio-interview",
    title: "Portfolio & Interview Preparation",
    completed: 0,
    total: 6,
    icon: Briefcase,
    iconColor: "text-indigo-500",
    completedSection: false,
    skills: [],
  },
];

function SkillIcon({ tech }) {
  return (
    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-neutral-200 bg-neutral-50 p-1">
      <TechIcon name={tech} className="h-full w-full" />
    </span>
  );
}

export default async function RoadmapDetailPage({ params }) {
  const { roadmap: roadmapSlug } = await params;

  const roadmap = getRoadmap(roadmapSlug);

  if (!roadmap) {
    return (
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
        <h1 className="text-3xl font-bold text-neutral-900">
          Roadmap Not Found
        </h1>

        <p className="mt-2 text-neutral-500">
          The requested roadmap could not be found.
        </p>

        <Link
          href="/learn/roadmaps"
          className="mt-6 inline-flex items-center gap-2 rounded-lg bg-black px-5 py-3 text-sm font-semibold text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Roadmaps
        </Link>
      </div>
    );
  }

  const isFrontend = roadmap.slug === "frontend-developer";
  const progressPercent = isFrontend ? 65 : 0;
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (circumference * progressPercent) / 100;

  return (
    <div className="mx-auto max-w-[1400px] px-6 py-8 lg:px-10">

      {/* Breadcrumb */}
      <div className="mb-6 flex items-center gap-2 text-sm text-neutral-500">
        <Link href="/learn" className="transition hover:text-neutral-900">
          Learn
        </Link>
        <span>›</span>
        <Link href="/learn/roadmaps" className="transition hover:text-neutral-900">
          Roadmaps
        </Link>
        <span>›</span>
        <span className="font-medium text-neutral-900">
          {roadmap.title}
        </span>
      </div>

      {/* Roadmap Header matching Image 15 */}
      <section className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-xs lg:p-8">
        <div className="flex flex-col gap-8 xl:flex-row xl:items-center xl:justify-between">

          {/* Left info */}
          <div className="flex min-w-0 items-start gap-6">
            <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-2xl bg-black text-white shadow-xs p-5">
              <TechIcon name={roadmap.technologies?.[0] || "Code2"} className="h-full w-full" />
            </div>

            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="text-3xl font-bold tracking-tight text-neutral-950 sm:text-4xl">
                  {roadmap.title}
                </h1>

                <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                  {roadmap.level}
                </span>
              </div>

              <p className="mt-2.5 max-w-2xl text-sm leading-6 text-neutral-600">
                Become a job-ready {roadmap.title} by learning modern web technologies step by step.
              </p>

              <div className="mt-5 flex flex-wrap items-center gap-5 text-xs text-neutral-600 sm:text-sm">
                <span className="inline-flex items-center gap-1.5">
                  <BookOpen className="h-4 w-4 text-neutral-500" />
                  {roadmap.skills} Skills
                </span>

                <span className="inline-flex items-center gap-1.5">
                  <FileText className="h-4 w-4 text-neutral-500" />
                  {roadmap.resources}
                </span>

                <span className="inline-flex items-center gap-1.5">
                  <Clock3 className="h-4 w-4 text-neutral-500" />
                  {roadmap.duration}
                </span>

                <span className="inline-flex items-center gap-1.5">
                  <BarChart3 className="h-4 w-4 text-neutral-500" />
                  {roadmap.level}
                </span>
              </div>
            </div>
          </div>

          {/* Right Progress Box */}
          <div className="w-full shrink-0 xl:w-[320px]">
            <p className="text-xs font-medium text-neutral-500">
              Overall Progress
            </p>

            <div className="mt-1 flex items-baseline justify-between">
              <span className="text-3xl font-bold text-neutral-950">
                {progressPercent}%
              </span>
            </div>

            <div className="mt-2.5 h-2 overflow-hidden rounded-full bg-neutral-100">
              <div
                className="h-full rounded-full bg-black transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            <p className="mt-2 text-xs text-neutral-500">
              {isFrontend
                ? "31 of 48 skills completed"
                : `0 of ${roadmap.skills} skills completed`}
            </p>

            <button
              type="button"
              className="mt-4 flex h-10 w-full items-center justify-center gap-2 rounded-xl bg-black text-xs font-semibold text-white transition hover:bg-neutral-800"
            >
              <Play className="h-3.5 w-3.5 fill-white" />
              Resume Learning
            </button>

            <button
              type="button"
              className="mt-2.5 flex h-10 w-full items-center justify-center gap-2 rounded-xl border border-neutral-200 bg-white text-xs font-semibold text-neutral-900 transition hover:bg-neutral-50"
            >
              <Bookmark className="h-3.5 w-3.5" />
              Bookmark Roadmap
            </button>
          </div>
        </div>
      </section>

      {/* Main Content Layout */}
      <div className="mt-6 grid gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">

        {/* Roadmap Timeline Accordion matching Image 15 */}
        <section>
          {/* Search in roadmap + Expand All */}
          <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative w-full sm:max-w-[280px]">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
              <input
                type="text"
                placeholder="Search in roadmap..."
                className="h-10 w-full rounded-xl border border-neutral-200 bg-white pl-9 pr-3 text-xs outline-none transition focus:border-neutral-400 sm:text-sm"
              />
            </div>

            <button
              type="button"
              className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-neutral-200 bg-white px-4 text-xs font-medium text-neutral-800 hover:bg-neutral-50 sm:text-sm"
            >
              <Expand className="h-3.5 w-3.5" />
              Expand All
            </button>
          </div>

          {/* Sections List */}
          <div className="relative space-y-3">
            {roadmapSections.map((section) => {
              const SectionIcon = section.icon;

              return (
                <div
                  key={section.id}
                  className="rounded-2xl border border-neutral-200 bg-white transition"
                >
                  <div className="flex cursor-pointer items-center justify-between px-5 py-4">
                    <div className="flex items-center gap-3.5">
                      <span
                        className={`flex h-8 w-8 items-center justify-center rounded-full ${
                          section.completedSection
                            ? "bg-amber-500/10 text-amber-600"
                            : "bg-neutral-50 text-neutral-500"
                        }`}
                      >
                        <SectionIcon className={`h-4 w-4 ${section.iconColor}`} />
                      </span>

                      <div className="flex flex-wrap items-center gap-3">
                        <h2 className="text-sm font-bold text-neutral-900 sm:text-base">
                          {section.title}
                        </h2>

                        <span className="rounded-full bg-neutral-100 px-2.5 py-0.5 text-[11px] font-medium text-neutral-600">
                          {section.completed} / {section.total} Completed
                        </span>
                      </div>
                    </div>

                    <ChevronDown
                      className={`h-4 w-4 text-neutral-400 transition-transform ${
                        section.completedSection ? "rotate-180" : ""
                      }`}
                    />
                  </div>

                  {/* Expanded Foundation skills */}
                  {section.completedSection && section.skills.length > 0 && (
                    <div className="border-t border-neutral-100 px-4 pb-4 pt-2">
                      <div className="space-y-1">
                        {section.skills.map((skill) => (
                          <div
                            key={skill.name}
                            className="flex items-center justify-between rounded-xl px-3 py-2.5 transition hover:bg-neutral-50"
                          >
                            <div className="flex items-center gap-3">
                              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-black text-white">
                                <Check className="h-3 w-3 stroke-[3]" />
                              </span>

                              <SkillIcon tech={skill.tech} />

                              <span className="text-sm font-semibold text-neutral-900">
                                {skill.name}
                              </span>

                              <span className="rounded-md bg-neutral-100 px-2 py-0.5 text-[10px] font-medium text-neutral-600">
                                {skill.badge}
                              </span>
                            </div>

                            <div className="flex items-center gap-4 text-xs text-neutral-500">
                              <span className="inline-flex items-center gap-1.5">
                                <Clock3 className="h-3.5 w-3.5 text-neutral-400" />
                                {skill.duration}
                              </span>

                              <ArrowRight className="h-3.5 w-3.5 text-neutral-400" />
                            </div>
                          </div>
                        ))}
                      </div>

                      <button
                        type="button"
                        className="mt-3 flex w-full items-center justify-center rounded-xl border border-neutral-200 py-2 text-xs font-semibold text-neutral-800 transition hover:bg-neutral-50"
                      >
                        View All Skills in this Section
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* Right Sticky Progress Panel matching Image 15 */}
        <aside className="h-fit rounded-2xl border border-neutral-200 bg-white p-6 shadow-xs">
          <h2 className="text-sm font-bold text-neutral-900">
            Roadmap Progress
          </h2>

          {/* SVG Circular Progress Gauge */}
          <div className="mt-5 flex justify-center">
            <div className="relative flex h-36 w-36 items-center justify-center">
              <svg className="h-36 w-36 -rotate-90 transform" viewBox="0 0 128 128">
                {/* Background Ring */}
                <circle
                  cx="64"
                  cy="64"
                  r={radius}
                  stroke="currentColor"
                  strokeWidth="10"
                  fill="transparent"
                  className="text-neutral-100"
                />
                {/* Foreground Progress */}
                <circle
                  cx="64"
                  cy="64"
                  r={radius}
                  stroke="currentColor"
                  strokeWidth="10"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  fill="transparent"
                  className="text-black transition-all duration-700"
                />
              </svg>

              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="text-3xl font-extrabold text-neutral-950">
                  {progressPercent}%
                </span>
                <span className="mt-0.5 text-[10px] font-medium text-neutral-500">
                  {isFrontend ? "31 / 48 Skills Completed" : `0 / ${roadmap.skills} Skills Completed`}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-6 space-y-4 border-t border-neutral-100 pt-5">
            <div>
              <p className="text-[11px] font-medium text-neutral-400">
                Current Skill
              </p>
              <div className="mt-1.5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-md bg-neutral-50 border border-neutral-200 p-1">
                    <TechIcon name="React" className="h-full w-full" />
                  </span>
                  <span className="text-xs font-semibold text-neutral-900">
                    React
                  </span>
                </div>
                <span className="rounded-full bg-neutral-100 px-2 py-0.5 text-[10px] font-medium text-neutral-600">
                  In Progress
                </span>
              </div>
            </div>

            <div>
              <p className="text-[11px] font-medium text-neutral-400">
                Next Skill
              </p>
              <div className="mt-1.5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-md bg-neutral-50 border border-neutral-200 p-1">
                    <TechIcon name="Next.js" className="h-full w-full" />
                  </span>
                  <span className="text-xs font-semibold text-neutral-900">
                    Next.js
                  </span>
                </div>
                <span className="rounded-full bg-neutral-100 px-2 py-0.5 text-[10px] font-medium text-neutral-600">
                  Upcoming
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-[11px] font-medium text-neutral-400">
                  Estimated Completion
                </p>
                <p className="mt-0.5 text-xs font-semibold text-neutral-900">
                  2 Months
                </p>
              </div>

              <div>
                <p className="text-[11px] font-medium text-neutral-400">
                  Total Duration
                </p>
                <p className="mt-0.5 text-xs font-semibold text-neutral-900">
                  {roadmap.duration}
                </p>
              </div>
            </div>
          </div>

          {/* Stay consistent tip card */}
          <div className="mt-6 rounded-xl border border-neutral-200 bg-neutral-50 p-3.5">
            <div className="flex gap-2.5">
              <Lightbulb className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" />
              <div>
                <h3 className="text-xs font-bold text-neutral-900">
                  Stay consistent!
                </h3>
                <p className="mt-0.5 text-[11px] leading-4 text-neutral-500">
                  Learn a little every day and achieve big.
                </p>
              </div>
            </div>
          </div>
        </aside>
      </div>

    </div>
  );
}