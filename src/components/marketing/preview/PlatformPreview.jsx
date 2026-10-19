"use client";

import { useState } from "react";
import Link from "next/link";
import {
  LayoutDashboard,
  Compass,
  Map,
  Bookmark,
  ArrowRight,
  Flame,
  CheckCircle2,
} from "lucide-react";

const previewTabs = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    id: "learn",
    label: "Learn",
    icon: Compass,
  },
  {
    id: "roadmaps",
    label: "Roadmaps",
    icon: Map,
  },
  {
    id: "bookmarks",
    label: "Bookmarks",
    icon: Bookmark,
  },
];

export default function PlatformPreview() {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <section className="w-full border-t border-neutral-100 bg-neutral-50/50 py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
              The Platform
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">
              Everything in one seamless experience
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-neutral-600 sm:text-base">
              From learning and practicing to tracking your progress and saving resources — BuildStack has it all in one place.
            </p>
          </div>

          <Link
            href="/dashboard"
            className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-black px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-neutral-800"
          >
            Explore the Platform
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Tab Selection */}
        <div className="mt-12 flex flex-wrap gap-3">
          {previewTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`inline-flex items-center gap-2.5 rounded-xl border px-5 py-3 text-sm font-semibold transition ${
                  isActive
                    ? "border-black bg-black text-white shadow-sm"
                    : "border-neutral-200 bg-white text-neutral-700 hover:border-neutral-300 hover:bg-neutral-50"
                }`}
              >
                <Icon className={`h-4 w-4 ${isActive ? "text-white" : "text-neutral-500"}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Preview Screen Mockup */}
        <div className="mt-8 overflow-hidden rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm sm:p-8">
          {activeTab === "dashboard" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-neutral-100 pb-5">
                <div>
                  <h3 className="text-xl font-bold text-neutral-900">Dashboard Overview</h3>
                  <p className="text-xs text-neutral-500">Track your weekly learning velocity and achievements</p>
                </div>
                <div className="flex items-center gap-2 rounded-xl border border-neutral-200 bg-neutral-50 px-3 py-1.5 text-xs font-semibold text-neutral-800">
                  <Flame className="h-4 w-4 fill-orange-500 text-orange-500" />
                  <span>12 Day Streak</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                <div className="rounded-xl border border-neutral-200 p-4">
                  <p className="text-xs text-neutral-500">Total Learning Hours</p>
                  <p className="mt-1 text-2xl font-bold text-neutral-900">87.6 hrs</p>
                  <span className="text-xs font-medium text-emerald-600">↑ 18% vs last week</span>
                </div>
                <div className="rounded-xl border border-neutral-200 p-4">
                  <p className="text-xs text-neutral-500">Completed Skills</p>
                  <p className="mt-1 text-2xl font-bold text-neutral-900">18</p>
                  <span className="text-xs font-medium text-emerald-600">↑ 12% vs last week</span>
                </div>
                <div className="rounded-xl border border-neutral-200 p-4">
                  <p className="text-xs text-neutral-500">Active Roadmaps</p>
                  <p className="mt-1 text-2xl font-bold text-neutral-900">3</p>
                  <span className="text-xs font-medium text-neutral-500">In Progress</span>
                </div>
                <div className="rounded-xl border border-neutral-200 p-4">
                  <p className="text-xs text-neutral-500">Current Streak</p>
                  <p className="mt-1 text-2xl font-bold text-neutral-900">12 days</p>
                  <span className="text-xs font-medium text-emerald-600">↑ 2 days vs last week</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === "learn" && (
            <div className="space-y-6">
              <div className="border-b border-neutral-100 pb-5">
                <h3 className="text-xl font-bold text-neutral-900">Explore 12 Specialized Domains</h3>
                <p className="text-xs text-neutral-500">Curated curriculums with industry-aligned technologies</p>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                <div className="rounded-xl border border-neutral-200 p-4">
                  <span className="inline-block rounded-lg bg-blue-50 px-2 py-1 text-xs font-bold text-blue-600">Web Development</span>
                  <p className="mt-2 text-sm font-semibold text-neutral-900">42 Technologies</p>
                  <p className="text-xs text-neutral-500">HTML, CSS, React, Next.js, Node.js</p>
                </div>
                <div className="rounded-xl border border-neutral-200 p-4">
                  <span className="inline-block rounded-lg bg-emerald-50 px-2 py-1 text-xs font-bold text-emerald-600">Software Development</span>
                  <p className="mt-2 text-sm font-semibold text-neutral-900">38 Technologies</p>
                  <p className="text-xs text-neutral-500">Python, Java, Go, C++, Architecture</p>
                </div>
                <div className="rounded-xl border border-neutral-200 p-4">
                  <span className="inline-block rounded-lg bg-purple-50 px-2 py-1 text-xs font-bold text-purple-600">Artificial Intelligence</span>
                  <p className="mt-2 text-sm font-semibold text-neutral-900">28 Technologies</p>
                  <p className="text-xs text-neutral-500">PyTorch, LLMs, Neural Networks</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === "roadmaps" && (
            <div className="space-y-6">
              <div className="border-b border-neutral-100 pb-5">
                <h3 className="text-xl font-bold text-neutral-900">Step-by-Step Developer Roadmaps</h3>
                <p className="text-xs text-neutral-500">Structured paths designed from foundational concepts to advanced production architecture</p>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between rounded-xl border border-neutral-200 p-4">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                    <div>
                      <p className="text-sm font-bold text-neutral-900">Foundation (HTML, CSS, Modern JS, Git)</p>
                      <p className="text-xs text-neutral-500">5 / 5 Modules Completed</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-emerald-600">Completed</span>
                </div>
                <div className="flex items-center justify-between rounded-xl border border-neutral-200 bg-neutral-50/50 p-4">
                  <div className="flex items-center gap-3">
                    <div className="h-2.5 w-2.5 rounded-full bg-blue-600" />
                    <div>
                      <p className="text-sm font-bold text-neutral-900">Frontend Frameworks (React, Next.js, State Management)</p>
                      <p className="text-xs text-neutral-500">Currently studying: React Hooks</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-blue-600">In Progress (65%)</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === "bookmarks" && (
            <div className="space-y-6">
              <div className="border-b border-neutral-100 pb-5">
                <h3 className="text-xl font-bold text-neutral-900">Saved Learning Resources</h3>
                <p className="text-xs text-neutral-500">Quickly resume where you left off across all topics</p>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div className="rounded-xl border border-neutral-200 p-4">
                  <span className="text-xs font-medium text-neutral-500">Skill Bookmark</span>
                  <p className="mt-1 font-bold text-neutral-900">React.js</p>
                  <p className="text-xs text-neutral-500">65% Completed</p>
                </div>
                <div className="rounded-xl border border-neutral-200 p-4">
                  <span className="text-xs font-medium text-neutral-500">Roadmap Bookmark</span>
                  <p className="mt-1 font-bold text-neutral-900">Frontend Developer</p>
                  <p className="text-xs text-neutral-500">42% Progress</p>
                </div>
                <div className="rounded-xl border border-neutral-200 p-4">
                  <span className="text-xs font-medium text-neutral-500">Resource Bookmark</span>
                  <p className="mt-1 font-bold text-neutral-900">React Official Docs</p>
                  <p className="text-xs text-neutral-500">Documentation</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
