"use client";

import { use, useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
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
  CheckCircle2,
  Loader2,
  Trash2,
} from "lucide-react";

import { roadmaps } from "@/data/learn/roadmaps.data";
import { TechIcon } from "@/components/shared";
import { useAuth } from "@/contexts/AuthContext";
import {
  getMyRoadmaps,
  enrollRoadmap,
  unenrollRoadmap,
  toggleLesson,
  getBookmarks,
  addBookmark,
  removeBookmark,
} from "@/lib/api";

const ROADMAP_SECTIONS_TEMPLATES = {
  default: [
    {
      id: "foundation",
      title: "Foundation & Core Principles",
      icon: Trophy,
      iconColor: "text-amber-500",
      skills: [
        { id: "f-html", name: "HTML5 Semantic Structure", duration: "1 Week", badge: "Essential", tech: "HTML" },
        { id: "f-css", name: "Modern CSS3 & Flexbox/Grid", duration: "1 Week", badge: "Essential", tech: "CSS" },
        { id: "f-js", name: "JavaScript ES6+ Fundamentals", duration: "2 Weeks", badge: "Essential", tech: "JavaScript" },
        { id: "f-git", name: "Git Version Control", duration: "3 Days", badge: "Essential", tech: "Git" },
        { id: "f-gh", name: "GitHub Collaboration & CI", duration: "2 Days", badge: "Essential", tech: "GitHub" },
      ],
    },
    {
      id: "frameworks",
      title: "Frontend Frameworks & UI Architecture",
      icon: Atom,
      iconColor: "text-cyan-500",
      skills: [
        { id: "fw-react", name: "React 19 Components & Hooks", duration: "3 Weeks", badge: "Crucial", tech: "React" },
        { id: "fw-nextjs", name: "Next.js App Router & SSR", duration: "2 Weeks", badge: "Industry Standard", tech: "Next.js" },
        { id: "fw-tailwind", name: "Tailwind CSS Design Systems", duration: "1 Week", badge: "Styling", tech: "CSS" },
        { id: "fw-ts", name: "TypeScript Type Safety", duration: "2 Weeks", badge: "Recommended", tech: "TypeScript" },
      ],
    },
    {
      id: "backend",
      title: "Backend Services & APIs",
      icon: Server,
      iconColor: "text-emerald-500",
      skills: [
        { id: "b-node", name: "Node.js Runtime & Event Loop", duration: "2 Weeks", badge: "Backend", tech: "Node.js" },
        { id: "b-express", name: "Express.js REST APIs", duration: "1 Week", badge: "API", tech: "Node.js" },
        { id: "b-mongo", name: "MongoDB & Mongoose Schemas", duration: "2 Weeks", badge: "Database", tech: "MongoDB" },
        { id: "b-auth", name: "Authentication & JWT / Firebase Auth", duration: "1 Week", badge: "Security", tech: "JavaScript" },
      ],
    },
    {
      id: "state-mgmt",
      title: "State Management & Data Caching",
      icon: Layers,
      iconColor: "text-purple-500",
      skills: [
        { id: "sm-context", name: "React Context & Reducers", duration: "1 Week", badge: "Core", tech: "React" },
        { id: "sm-query", name: "TanStack Query & Async Caching", duration: "1 Week", badge: "Data Fetching", tech: "React" },
        { id: "sm-zustand", name: "Zustand & Global State", duration: "1 Week", badge: "Modern", tech: "JavaScript" },
      ],
    },
    {
      id: "testing",
      title: "Testing, Reliability & Quality Assurance",
      icon: FlaskConical,
      iconColor: "text-emerald-600",
      skills: [
        { id: "t-unit", name: "Unit Testing with Vitest / Jest", duration: "1 Week", badge: "Testing", tech: "JavaScript" },
        { id: "t-rtl", name: "React Testing Library Components", duration: "1 Week", badge: "Testing", tech: "React" },
        { id: "t-e2e", name: "End-to-End Testing with Playwright", duration: "1 Week", badge: "E2E", tech: "JavaScript" },
      ],
    },
    {
      id: "deployment",
      title: "DevOps, Containerization & Cloud Deployment",
      icon: Triangle,
      iconColor: "text-neutral-900",
      skills: [
        { id: "d-docker", name: "Docker Container Basics", duration: "1 Week", badge: "DevOps", tech: "Docker" },
        { id: "d-vercel", name: "Vercel / Cloud Edge Hosting", duration: "3 Days", badge: "Deployment", tech: "Next.js" },
        { id: "d-cicd", name: "GitHub Actions Workflows", duration: "1 Week", badge: "Automation", tech: "GitHub" },
      ],
    },
    {
      id: "career",
      title: "Portfolio, System Design & Interview Prep",
      icon: Briefcase,
      iconColor: "text-indigo-500",
      skills: [
        { id: "c-portfolio", name: "Production Portfolio Project", duration: "2 Weeks", badge: "Showcase", tech: "React" },
        { id: "c-interview", name: "Frontend System Design & DSA", duration: "2 Weeks", badge: "Career", tech: "JavaScript" },
      ],
    },
  ],
};

function SkillIcon({ tech }) {
  return (
    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-neutral-200 bg-neutral-50 p-1">
      <TechIcon name={tech} className="h-full w-full" />
    </span>
  );
}

export default function RoadmapDetailPage({ params }) {
  const { roadmap: roadmapSlug } = use(params);
  const { user } = useAuth();
  const router = useRouter();

  const roadmap = roadmaps.find((r) => r.slug === roadmapSlug);

  const sections = ROADMAP_SECTIONS_TEMPLATES.default;

  // Flatten all skills/lessons to compute totals
  const allLessons = useMemo(() => {
    return sections.flatMap((section) =>
      section.skills.map((s) => ({
        ...s,
        sectionId: section.id,
        sectionTitle: section.title,
      }))
    );
  }, [sections]);

  const totalLessonsCount = allLessons.length;

  // State
  const [enrolled, setEnrolled] = useState(false);
  const [completedLessons, setCompletedLessons] = useState([]);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [expandedSections, setExpandedSections] = useState({
    foundation: true,
    frameworks: true,
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [loadingAction, setLoadingAction] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  // Load enrollment and bookmark status
  useEffect(() => {
    let isMounted = true;
    async function loadRoadmapStatus() {
      if (!user) {
        setInitialLoading(false);
        return;
      }
      try {
        const [myRoadmapsRes, bookmarksRes] = await Promise.allSettled([
          getMyRoadmaps(),
          getBookmarks(),
        ]);

        if (!isMounted) return;

        if (myRoadmapsRes.status === "fulfilled" && myRoadmapsRes.value?.success) {
          const enrollments = myRoadmapsRes.value.roadmaps || [];
          const current = enrollments.find((r) => r.roadmapId === roadmapSlug);
          if (current) {
            setEnrolled(true);
            setCompletedLessons(current.completedLessons || []);
          } else {
            setEnrolled(false);
            setCompletedLessons([]);
          }
        }

        if (bookmarksRes.status === "fulfilled" && bookmarksRes.value?.success) {
          const list = bookmarksRes.value.bookmarks || [];
          setIsBookmarked(list.some((b) => b.id === `roadmap-${roadmapSlug}`));
        }
      } catch (err) {
        console.error("[RoadmapPage] Error loading roadmap data:", err);
      } finally {
        if (isMounted) setInitialLoading(false);
      }
    }

    loadRoadmapStatus();
    return () => {
      isMounted = false;
    };
  }, [user, roadmapSlug]);

  // Derived progress
  const completedCount = completedLessons.length;
  const progressPercent =
    totalLessonsCount > 0
      ? Math.min(100, Math.round((completedCount / totalLessonsCount) * 100))
      : 0;

  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (circumference * progressPercent) / 100;

  // Toggle enrollment
  const handleEnrollToggle = async () => {
    if (!user) {
      router.push("/login");
      return;
    }
    setLoadingAction(true);
    try {
      if (enrolled) {
        await unenrollRoadmap(roadmapSlug);
        setEnrolled(false);
        setCompletedLessons([]);
      } else {
        await enrollRoadmap(roadmapSlug, {
          title: roadmap.title,
          level: roadmap.level,
          totalLessons: totalLessonsCount,
          totalModules: sections.length,
        });
        setEnrolled(true);
      }
    } catch (err) {
      console.error("[RoadmapPage] Enrollment toggle failed:", err);
    } finally {
      setLoadingAction(false);
    }
  };

  // Toggle lesson completion
  const handleToggleLesson = async (lessonId, lessonTitle) => {
    if (!user) {
      router.push("/login");
      return;
    }

    const isCurrentlyDone = completedLessons.includes(lessonId);
    const newCompleted = isCurrentlyDone
      ? completedLessons.filter((id) => id !== lessonId)
      : [...completedLessons, lessonId];

    // Optimistic UI update
    setCompletedLessons(newCompleted);
    setEnrolled(true);

    try {
      await toggleLesson(roadmapSlug, lessonId, {
        completed: !isCurrentlyDone,
        lessonTitle,
        roadmapTitle: roadmap.title,
        totalLessons: totalLessonsCount,
      });
    } catch (err) {
      console.error("[RoadmapPage] Lesson toggle failed:", err);
      // Rollback on failure
      setCompletedLessons(completedLessons);
    }
  };

  // Toggle bookmark
  const handleToggleBookmark = async () => {
    if (!user) {
      router.push("/login");
      return;
    }

    const bookmarkId = `roadmap-${roadmapSlug}`;
    const nextState = !isBookmarked;
    setIsBookmarked(nextState);

    try {
      if (nextState) {
        await addBookmark({
          id: bookmarkId,
          type: "roadmap",
          title: roadmap.title,
          category: roadmap.category,
          level: roadmap.level,
          progress: progressPercent,
          href: `/learn/roadmaps/${roadmapSlug}`,
        });
      } else {
        await removeBookmark(bookmarkId);
      }
    } catch (err) {
      console.error("[RoadmapPage] Bookmark toggle error:", err);
      setIsBookmarked(!nextState);
    }
  };

  // Toggle section accordion
  const toggleSection = (sectionId) => {
    setExpandedSections((prev) => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }));
  };

  // Expand / Collapse all
  const handleToggleAll = () => {
    const allExpanded = Object.keys(expandedSections).length === sections.length &&
      Object.values(expandedSections).every(Boolean);

    if (allExpanded) {
      setExpandedSections({});
    } else {
      const next = {};
      sections.forEach((s) => (next[s.id] = true));
      setExpandedSections(next);
    }
  };

  // Filter sections by search query
  const filteredSections = useMemo(() => {
    if (!searchQuery.trim()) return sections;
    const q = searchQuery.toLowerCase().trim();
    return sections
      .map((sec) => {
        const matchingSkills = sec.skills.filter(
          (s) =>
            s.name.toLowerCase().includes(q) ||
            s.tech.toLowerCase().includes(q) ||
            s.badge.toLowerCase().includes(q)
        );
        if (sec.title.toLowerCase().includes(q) || matchingSkills.length > 0) {
          return {
            ...sec,
            skills: matchingSkills.length > 0 ? matchingSkills : sec.skills,
          };
        }
        return null;
      })
      .filter(Boolean);
  }, [sections, searchQuery]);

  if (!roadmap) {
    return (
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
        <h1 className="text-3xl font-bold text-neutral-900">Roadmap Not Found</h1>
        <p className="mt-2 text-neutral-500">The requested roadmap could not be found.</p>
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
        <span className="font-medium text-neutral-900">{roadmap.title}</span>
      </div>

      {/* Roadmap Header */}
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

                {enrolled && (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-neutral-900 px-3 py-1 text-xs font-semibold text-white">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                    Enrolled
                  </span>
                )}
              </div>

              <p className="mt-2.5 max-w-2xl text-sm leading-6 text-neutral-600">
                {roadmap.description ||
                  `Become a job-ready ${roadmap.title} by learning modern technologies step by step.`}
              </p>

              <div className="mt-5 flex flex-wrap items-center gap-5 text-xs text-neutral-600 sm:text-sm">
                <span className="inline-flex items-center gap-1.5">
                  <BookOpen className="h-4 w-4 text-neutral-500" />
                  {totalLessonsCount} Lessons
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
                  {roadmap.category}
                </span>
              </div>
            </div>
          </div>

          {/* Right Progress Box */}
          <div className="w-full shrink-0 xl:w-[320px]">
            <p className="text-xs font-medium text-neutral-500">Overall Progress</p>

            <div className="mt-1 flex items-baseline justify-between">
              <span className="text-3xl font-bold text-neutral-950">{progressPercent}%</span>
              <span className="text-xs font-medium text-neutral-500">
                {completedCount} of {totalLessonsCount} completed
              </span>
            </div>

            <div className="mt-2.5 h-2 overflow-hidden rounded-full bg-neutral-100">
              <div
                className="h-full rounded-full bg-black transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            <button
              type="button"
              onClick={handleEnrollToggle}
              disabled={loadingAction || initialLoading}
              className={`mt-4 flex h-10 w-full items-center justify-center gap-2 rounded-xl text-xs font-semibold transition ${
                enrolled
                  ? "border border-neutral-300 bg-neutral-100 text-neutral-800 hover:bg-neutral-200"
                  : "bg-black text-white hover:bg-neutral-800"
              }`}
            >
              {loadingAction ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : enrolled ? (
                <>
                  <Play className="h-3.5 w-3.5 fill-current" />
                  Continue Learning
                </>
              ) : (
                <>
                  <Play className="h-3.5 w-3.5 fill-white" />
                  Enroll in Roadmap
                </>
              )}
            </button>

            <div className="mt-2.5 flex items-center gap-2">
              <button
                type="button"
                onClick={handleToggleBookmark}
                className={`flex h-10 flex-1 items-center justify-center gap-2 rounded-xl border text-xs font-semibold transition ${
                  isBookmarked
                    ? "border-black bg-neutral-900 text-white"
                    : "border-neutral-200 bg-white text-neutral-900 hover:bg-neutral-50"
                }`}
              >
                <Bookmark className={`h-3.5 w-3.5 ${isBookmarked ? "fill-white" : ""}`} />
                {isBookmarked ? "Bookmarked" : "Bookmark Roadmap"}
              </button>

              {enrolled && (
                <button
                  type="button"
                  onClick={handleEnrollToggle}
                  title="Unenroll from this roadmap"
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-neutral-200 bg-white text-neutral-500 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Layout */}
      <div className="mt-6 grid gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
        {/* Roadmap Timeline Accordion */}
        <section>
          {/* Search in roadmap + Expand All */}
          <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative w-full sm:max-w-[280px]">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search in roadmap..."
                className="h-10 w-full rounded-xl border border-neutral-200 bg-white pl-9 pr-3 text-xs outline-none transition focus:border-neutral-400 sm:text-sm"
              />
            </div>

            <button
              type="button"
              onClick={handleToggleAll}
              className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-neutral-200 bg-white px-4 text-xs font-medium text-neutral-800 hover:bg-neutral-50 sm:text-sm"
            >
              <Expand className="h-3.5 w-3.5" />
              Expand / Collapse All
            </button>
          </div>

          {/* Sections List */}
          <div className="relative space-y-3">
            {filteredSections.map((section) => {
              const SectionIcon = section.icon;
              const isExpanded = !!expandedSections[section.id];
              const sectionLessonIds = section.skills.map((s) => s.id);
              const sectionCompletedCount = sectionLessonIds.filter((id) =>
                completedLessons.includes(id)
              ).length;
              const isSectionComplete =
                section.skills.length > 0 &&
                sectionCompletedCount === section.skills.length;

              return (
                <div
                  key={section.id}
                  className="rounded-2xl border border-neutral-200 bg-white transition"
                >
                  <div
                    onClick={() => toggleSection(section.id)}
                    className="flex cursor-pointer items-center justify-between px-5 py-4 select-none"
                  >
                    <div className="flex items-center gap-3.5">
                      <span
                        className={`flex h-8 w-8 items-center justify-center rounded-full ${
                          isSectionComplete
                            ? "bg-emerald-500/10 text-emerald-600"
                            : "bg-neutral-50 text-neutral-500"
                        }`}
                      >
                        <SectionIcon className={`h-4 w-4 ${section.iconColor}`} />
                      </span>

                      <div className="flex flex-wrap items-center gap-3">
                        <h2 className="text-sm font-bold text-neutral-900 sm:text-base">
                          {section.title}
                        </h2>

                        <span
                          className={`rounded-full px-2.5 py-0.5 text-[11px] font-medium ${
                            isSectionComplete
                              ? "bg-emerald-100 text-emerald-800"
                              : "bg-neutral-100 text-neutral-600"
                          }`}
                        >
                          {sectionCompletedCount} / {section.skills.length} Completed
                        </span>
                      </div>
                    </div>

                    <ChevronDown
                      className={`h-4 w-4 text-neutral-400 transition-transform duration-200 ${
                        isExpanded ? "rotate-180" : ""
                      }`}
                    />
                  </div>

                  {/* Expanded Skills & Lessons */}
                  {isExpanded && (
                    <div className="border-t border-neutral-100 px-4 pb-4 pt-2">
                      <div className="space-y-1">
                        {section.skills.map((skill) => {
                          const isDone = completedLessons.includes(skill.id);
                          return (
                            <div
                              key={skill.id}
                              className="flex items-center justify-between rounded-xl px-3 py-2.5 transition hover:bg-neutral-50"
                            >
                              <div className="flex items-center gap-3">
                                <button
                                  type="button"
                                  onClick={() => handleToggleLesson(skill.id, skill.name)}
                                  className={`flex h-6 w-6 items-center justify-center rounded-lg border transition ${
                                    isDone
                                      ? "border-black bg-black text-white"
                                      : "border-neutral-300 bg-white text-transparent hover:border-black"
                                  }`}
                                  aria-label={`Toggle lesson ${skill.name}`}
                                >
                                  <Check className="h-3.5 w-3.5 stroke-[3]" />
                                </button>

                                <SkillIcon tech={skill.tech} />

                                <span
                                  className={`text-sm font-medium ${
                                    isDone ? "text-neutral-400 line-through" : "text-neutral-900"
                                  }`}
                                >
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

                                <Link
                                  href={`/learn/skills/${skill.tech.toLowerCase().replace(/[^a-z0-9]/g, "-")}`}
                                  className="text-neutral-400 hover:text-neutral-900 transition"
                                >
                                  <ArrowRight className="h-3.5 w-3.5" />
                                </Link>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* Right Sticky Progress Panel */}
        <aside className="h-fit rounded-2xl border border-neutral-200 bg-white p-6 shadow-xs">
          <h2 className="text-sm font-bold text-neutral-900">Roadmap Progress</h2>

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
                  {completedCount} / {totalLessonsCount} Completed
                </span>
              </div>
            </div>
          </div>

          <div className="mt-6 space-y-4 border-t border-neutral-100 pt-5">
            <div>
              <p className="text-[11px] font-medium text-neutral-400">Current Focus</p>
              <div className="mt-1.5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-md bg-neutral-50 border border-neutral-200 p-1">
                    <TechIcon name={roadmap.technologies?.[0] || "Code2"} className="h-full w-full" />
                  </span>
                  <span className="text-xs font-semibold text-neutral-900">
                    {roadmap.technologies?.[0] || "Foundations"}
                  </span>
                </div>
                <span className="rounded-full bg-neutral-100 px-2 py-0.5 text-[10px] font-medium text-neutral-600">
                  {enrolled ? "In Progress" : "Not Started"}
                </span>
              </div>
            </div>

            <div>
              <p className="text-[11px] font-medium text-neutral-400">Next Step</p>
              <div className="mt-1.5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-md bg-neutral-50 border border-neutral-200 p-1">
                    <TechIcon name={roadmap.technologies?.[1] || "React"} className="h-full w-full" />
                  </span>
                  <span className="text-xs font-semibold text-neutral-900">
                    {roadmap.technologies?.[1] || "Next Milestone"}
                  </span>
                </div>
                <span className="rounded-full bg-neutral-100 px-2 py-0.5 text-[10px] font-medium text-neutral-600">
                  Upcoming
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-[11px] font-medium text-neutral-400">Total Duration</p>
                <p className="mt-0.5 text-xs font-semibold text-neutral-900">
                  {roadmap.duration}
                </p>
              </div>

              <div>
                <p className="text-[11px] font-medium text-neutral-400">Category</p>
                <p className="mt-0.5 text-xs font-semibold text-neutral-900">
                  {roadmap.category}
                </p>
              </div>
            </div>
          </div>

          {/* Stay consistent tip card */}
          <div className="mt-6 rounded-xl border border-neutral-200 bg-neutral-50 p-3.5">
            <div className="flex gap-2.5">
              <Lightbulb className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" />
              <div>
                <h3 className="text-xs font-bold text-neutral-900">Stay consistent!</h3>
                <p className="mt-0.5 text-[11px] leading-4 text-neutral-500">
                  Complete lessons daily to maintain your streak and earn mastery badges.
                </p>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}