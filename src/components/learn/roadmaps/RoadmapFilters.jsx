"use client";

import { ChevronDown, SlidersHorizontal } from "lucide-react";

function FilterSelect({ value, onChange, options, className = "" }) {
  return (
    <div className={`relative ${className}`}>
      <select
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        className="h-11 w-full appearance-none rounded-xl border border-neutral-200 bg-white px-3.5 pr-9 text-xs sm:text-sm font-medium text-neutral-800 outline-none transition hover:border-neutral-300 focus:border-neutral-400 focus:ring-2 focus:ring-neutral-100"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-500" />
    </div>
  );
}

export default function RoadmapFilters({
  level,
  category,
  duration,
  sort,
  onLevelChange,
  onCategoryChange,
  onDurationChange,
  onSortChange,
}) {
  const levelOptions = [
    { value: "all", label: "All Levels" },
    { value: "Beginner to Advanced", label: "Beginner to Advanced" },
    { value: "Intermediate to Advanced", label: "Intermediate to Advanced" },
  ];

  const categoryOptions = [
    { value: "all", label: "All Categories" },
    { value: "Web Development", label: "Web Development" },
    { value: "Software Development", label: "Software Development" },
    { value: "Artificial Intelligence", label: "Artificial Intelligence" },
    { value: "Data Science", label: "Data Science" },
    { value: "DevOps", label: "DevOps" },
    { value: "Mobile Development", label: "Mobile Development" },
    { value: "Cyber Security", label: "Cyber Security" },
    { value: "Cloud Computing", label: "Cloud Computing" },
  ];

  const durationOptions = [
    { value: "all", label: "Duration" },
    { value: "short", label: "Under 6 Months" },
    { value: "medium", label: "6 – 9 Months" },
    { value: "long", label: "9 – 12 Months" },
  ];

  const sortOptions = [
    { value: "popular", label: "Most Popular" },
    { value: "name", label: "Name" },
    { value: "duration", label: "Duration" },
  ];

  return (
    <div className="flex flex-col gap-3 xl:flex-row xl:items-center">
      <div className="flex items-center gap-2 xl:hidden">
        <SlidersHorizontal className="h-4 w-4 text-neutral-500" />
        <span className="text-sm font-semibold text-neutral-700">
          Filters
        </span>
      </div>

      <FilterSelect
        value={level}
        onChange={onLevelChange}
        options={levelOptions}
        className="w-full xl:w-[180px]"
      />

      <FilterSelect
        value={category}
        onChange={onCategoryChange}
        options={categoryOptions}
        className="w-full xl:w-[200px]"
      />

      <FilterSelect
        value={duration}
        onChange={onDurationChange}
        options={durationOptions}
        className="w-full xl:w-[170px]"
      />

      <div className="xl:ml-auto">
        <FilterSelect
          value={sort}
          onChange={onSortChange}
          options={sortOptions}
          className="w-full xl:w-[190px]"
        />
      </div>
    </div>
  );
}