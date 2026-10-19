"use client";

import { useMemo, useState } from "react";

import {
  SkillHeader,
  SkillFilters,
  SkillGrid,
} from "@/components/learn/skills";

import { skills } from "@/data/learn/skills.data";

export default function SkillsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [level, setLevel] = useState("all");
  const [sort, setSort] = useState("recommended");

  const filteredSkills = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    const results = skills.filter((skill) => {
      const matchesSearch =
        !query ||
        skill.name.toLowerCase().includes(query) ||
        skill.description.toLowerCase().includes(query) ||
        skill.category.toLowerCase().includes(query);

      const matchesCategory =
        category === "all" || skill.category === category;

      const matchesLevel =
        level === "all" || skill.level === level;

      return matchesSearch && matchesCategory && matchesLevel;
    });

    return [...results].sort((a, b) => {
      if (sort === "name") {
        return a.name.localeCompare(b.name);
      }

      if (sort === "progress") {
        return b.progress - a.progress;
      }

      return b.progress - a.progress;
    });
  }, [searchQuery, category, level, sort]);

  return (
    <div className="mx-auto max-w-[1400px] px-6 py-10 lg:px-10">
      <SkillHeader />

      <div className="mt-8 flex flex-col gap-4 xl:flex-row xl:items-center">
        <div className="flex-1">
          <input
            type="text"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            placeholder="Search skills..."
            className="h-12 w-full rounded-xl border border-neutral-200 bg-white px-4 text-sm text-neutral-900 outline-none placeholder:text-neutral-400 focus:border-neutral-400"
          />
        </div>

        <SkillFilters
          category={category}
          level={level}
          sort={sort}
          onCategoryChange={setCategory}
          onLevelChange={setLevel}
          onSortChange={setSort}
        />
      </div>

      <div className="mt-8">
        <div className="mb-5">
          <h2 className="text-xl font-semibold text-neutral-900">
            Explore Skills
          </h2>

          <p className="mt-1 text-sm text-neutral-500">
            {filteredSkills.length}{" "}
            {filteredSkills.length === 1 ? "skill" : "skills"} available
          </p>
        </div>

        <SkillGrid skills={filteredSkills} />
      </div>
    </div>
  );
}