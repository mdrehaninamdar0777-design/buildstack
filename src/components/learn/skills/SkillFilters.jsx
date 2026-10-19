"use client";

import { ChevronDown } from "lucide-react";

function SelectFilter({ value, onChange, options }) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(event) => onChange?.(event.target.value)}
        className="h-11 appearance-none rounded-xl border border-neutral-200 bg-white px-4 pr-10 text-sm font-medium text-neutral-800 outline-none transition hover:border-neutral-300 focus:border-neutral-400"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-500" />
    </div>
  );
}

export default function SkillFilters({
  category,
  level,
  sort,
  onCategoryChange,
  onLevelChange,
  onSortChange,
}) {
  return (
    <div className="flex flex-wrap gap-3">
      <SelectFilter
        value={category}
        onChange={onCategoryChange}
        options={[
          { value: "all", label: "All Categories" },
          { value: "Web Development", label: "Web Development" },
          { value: "Backend Development", label: "Backend Development" },
          { value: "Database", label: "Database" },
          { value: "Software Development", label: "Software Development" },
          { value: "DevOps", label: "DevOps" },
          { value: "Developer Tools", label: "Developer Tools" },
        ]}
      />

      <SelectFilter
        value={level}
        onChange={onLevelChange}
        options={[
          { value: "all", label: "All Levels" },
          { value: "Beginner", label: "Beginner" },
          { value: "Intermediate", label: "Intermediate" },
          { value: "Advanced", label: "Advanced" },
        ]}
      />

      <SelectFilter
        value={sort}
        onChange={onSortChange}
        options={[
          { value: "recommended", label: "Recommended" },
          { value: "name", label: "Name" },
          { value: "progress", label: "Progress" },
        ]}
      />
    </div>
  );
}