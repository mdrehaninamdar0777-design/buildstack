"use client";

import { use, useState } from "react";

import {
  SkillDetailHeader,
  SkillOverviewCards,
  SkillResourceTabs,
  NotesSection,
  SkillResourceCards,
  SkillComingSoon,
  SkillNavigation,
} from "@/components/learn/skills";

import { skills } from "@/data/learn/skills.data";

export default function SkillDetailPage({ params }) {
  const { skill: slug } = use(params);

  const skill = skills.find(
    (item) => item.slug === slug
  );

  const [activeTab, setActiveTab] = useState("notes");

  if (!skill) {
    return (
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
        <h1 className="text-3xl font-bold text-neutral-900">
          Skill Not Found
        </h1>

        <p className="mt-2 text-neutral-500">
          The requested skill could not be found.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[1400px] px-6 py-8 lg:px-10">

      {/* Breadcrumb */}
      <div className="mb-6 flex flex-wrap items-center gap-2 text-sm text-neutral-500">
        <span>Learn</span>
        <span>›</span>
        <span>Skills</span>
        <span>›</span>
        <span className="font-medium text-neutral-900">
          {skill.name}
        </span>
      </div>

      {/* Header */}
      <SkillDetailHeader skill={skill} />

      {/* Overview */}
      {skill.overview && (
        <div className="mt-4">
          <SkillOverviewCards skill={skill} />
        </div>
      )}

      {/* Resources */}
      <section className="mt-4 overflow-hidden rounded-2xl border border-neutral-200 bg-white">
        <SkillResourceTabs
          activeTab={activeTab}
          onChange={setActiveTab}
        />

        {activeTab === "notes" && (
          <NotesSection notes={skill.notes} />
        )}

        {activeTab !== "notes" && (
          <div className="p-5">
            <div className="rounded-xl border border-neutral-200 bg-white px-6 py-12 text-center">
              <h3 className="text-lg font-semibold text-neutral-900">
                {activeTab === "videos"
                  ? "Video Lectures"
                  : activeTab === "documentation"
                    ? "Documentation"
                    : activeTab === "quiz"
                      ? "Quiz"
                      : "Practice"}
              </h3>

              <p className="mt-2 text-sm text-neutral-500">
                This section is ready for the actual learning content.
              </p>
            </div>
          </div>
        )}
      </section>

      {/* Resource cards */}
      <div className="mt-4">
        <SkillResourceCards skill={skill} />
      </div>

      {/* Coming soon */}
      <SkillComingSoon />

      {/* Navigation */}
      <SkillNavigation skill={skill} />
    </div>
  );
}