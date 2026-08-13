"use client";

import { useMemo, useState } from "react";

import AppNavbar from "@/components/layout/AppNavbar";

import {
  SearchHeader,
  SearchFilters,
  SearchResultCard,
} from "@/components/search";

const searchData = [
  {
    id: 1,
    type: "Roadmaps",
    title: "Frontend Developer Roadmap",
    description:
      "Learn HTML, CSS, JavaScript, React, and modern frontend development step by step.",
    level: "Intermediate",
    duration: "12 Weeks",
    progress: 42,
  },
  {
    id: 2,
    type: "Roadmaps",
    title: "Backend Developer Roadmap",
    description:
      "Build backend development skills with Node.js, Express.js, APIs, databases, and authentication.",
    level: "Beginner",
    duration: "8 Weeks",
    progress: 30,
  },
  {
    id: 3,
    type: "Roadmaps",
    title: "Full Stack Developer Roadmap",
    description:
      "Learn frontend, backend, databases, APIs, deployment, and full-stack application development.",
    level: "Intermediate",
    duration: "16 Weeks",
    progress: 25,
  },
  {
    id: 4,
    type: "Skills",
    title: "React.js",
    description:
      "Build interactive user interfaces using components, props, state, hooks, and modern React.",
    level: "Intermediate",
    duration: "24 Lessons",
  },
  {
    id: 5,
    type: "Skills",
    title: "JavaScript",
    description:
      "Strengthen your JavaScript fundamentals including functions, objects, arrays, promises, and ES6+.",
    level: "Intermediate",
    duration: "32 Lessons",
  },
  {
    id: 6,
    type: "Skills",
    title: "Node.js",
    description:
      "Learn server-side JavaScript, APIs, modules, asynchronous programming, and backend development.",
    level: "Beginner",
    duration: "20 Lessons",
  },
  {
    id: 7,
    type: "Topics",
    title: "React Hooks",
    description:
      "Understand useState, useEffect, useContext, custom hooks, and modern React patterns.",
    level: "Intermediate",
    duration: "12 Lessons",
  },
  {
    id: 8,
    type: "Topics",
    title: "REST APIs",
    description:
      "Learn how REST APIs work and how frontend applications communicate with backend services.",
    level: "Beginner",
    duration: "8 Lessons",
  },
  {
    id: 9,
    type: "Resources",
    title: "JavaScript Practice Exercises",
    description:
      "Practice JavaScript concepts with coding exercises designed to strengthen your fundamentals.",
    level: "Beginner",
    duration: "25 Exercises",
  },
  {
    id: 10,
    type: "Resources",
    title: "React Hooks Notes",
    description:
      "Quick reference notes covering the most important React Hooks and their practical usage.",
    level: "Intermediate",
    duration: "10 min read",
  },
];

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredResults = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return searchData.filter((result) => {
      const matchesFilter =
        activeFilter === "All" || result.type === activeFilter;

      const matchesSearch =
        query === "" ||
        result.title.toLowerCase().includes(query) ||
        result.description.toLowerCase().includes(query) ||
        result.type.toLowerCase().includes(query) ||
        result.level?.toLowerCase().includes(query);

      return matchesFilter && matchesSearch;
    });
  }, [searchQuery, activeFilter]);

  return (
    <main className="min-h-screen bg-neutral-50">

      {/* Shared logged-in navbar */}
      <AppNavbar />

      <div className="mx-auto max-w-5xl px-6 py-10 lg:px-8">

        {/* Header */}
        <SearchHeader />

        {/* Search Card */}
       <section className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
  <SearchFilters
    activeFilter={activeFilter}
    onFilterChange={setActiveFilter}
  />
</section>

        {/* Results Header */}
        <div className="mt-10 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-neutral-900">
              {searchQuery
                ? "Search Results"
                : activeFilter === "All"
                ? "Explore"
                : activeFilter}
            </h2>

            <p className="mt-1 text-sm text-neutral-500">
              {filteredResults.length}{" "}
              {filteredResults.length === 1
                ? "result"
                : "results"}{" "}
              found
            </p>
          </div>
        </div>

        {/* Results */}
        <div className="mt-5 space-y-3">
          {filteredResults.length > 0 ? (
            filteredResults.map((result) => (
              <SearchResultCard
                key={result.id}
                result={result}
              />
            ))
          ) : (
            <div className="rounded-2xl border border-neutral-200 bg-white px-6 py-16 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-neutral-100">
                <span className="text-lg">⌕</span>
              </div>

              <h3 className="mt-4 font-semibold text-neutral-900">
                No results found
              </h3>

              <p className="mx-auto mt-2 max-w-md text-sm text-neutral-500">
                We couldn't find anything matching your search. Try another
                keyword or choose a different category.
              </p>

              <button
                type="button"
                onClick={() => {
                  setSearchQuery("");
                  setActiveFilter("All");
                }}
                className="mt-5 rounded-lg bg-black px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-neutral-800"
              >
                Clear Search
              </button>
            </div>
          )}
        </div>

      </div>
    </main>
  );
}