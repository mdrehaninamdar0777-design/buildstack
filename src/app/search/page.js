"use client";

import { Suspense, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";

import AppNavbar from "@/components/layout/AppNavbar";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { getUnifiedSearchIndex } from "@/data/learn/searchCatalog";

import {
  SearchHeader,
  SearchBar,
  SearchFilters,
  SearchResultCard,
} from "@/components/search";

function SearchContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") || "";
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [activeFilter, setActiveFilter] = useState("All");

  const [prevInitialQuery, setPrevInitialQuery] = useState(initialQuery);
  if (prevInitialQuery !== initialQuery) {
    setPrevInitialQuery(initialQuery);
    setSearchQuery(initialQuery);
  }

  // Load the unified catalog covering all roadmaps, skills, and domains
  const allItems = useMemo(() => getUnifiedSearchIndex(), []);

  const filteredResults = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return allItems.filter((result) => {
      const matchesFilter =
        activeFilter === "All" || result.type === activeFilter;

      const matchesSearch =
        query === "" ||
        result.title.toLowerCase().includes(query) ||
        result.description.toLowerCase().includes(query) ||
        result.type.toLowerCase().includes(query) ||
        result.category?.toLowerCase().includes(query) ||
        result.level?.toLowerCase().includes(query) ||
        result.technologies?.some((t) => t.toLowerCase().includes(query));

      return matchesFilter && matchesSearch;
    });
  }, [allItems, searchQuery, activeFilter]);

  return (
    <div className="mx-auto max-w-5xl px-6 py-10 lg:px-8">
      {/* Header */}
      <SearchHeader />

      {/* Search Input + Category Filters Card */}
      <section className="space-y-4 rounded-2xl border border-neutral-200 bg-white p-5 shadow-xs">
        <SearchBar value={searchQuery} onChange={setSearchQuery} />
        <div className="border-t border-neutral-100 pt-3">
          <SearchFilters
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
          />
        </div>
      </section>

      {/* Results Header */}
      <div className="mt-8 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-neutral-900">
            {searchQuery
              ? "Search Results"
              : activeFilter === "All"
              ? "Explore Catalog"
              : activeFilter}
          </h2>

          <p className="mt-1 text-xs text-neutral-500">
            {filteredResults.length}{" "}
            {filteredResults.length === 1 ? "result" : "results"} found
          </p>
        </div>
      </div>

      {/* Results */}
      <div className="mt-5 space-y-3">
        {filteredResults.length > 0 ? (
          filteredResults.map((result) => (
            <SearchResultCard key={result.id} result={result} />
          ))
        ) : (
          <div className="rounded-2xl border border-neutral-200 bg-white px-6 py-16 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-neutral-100 text-neutral-500 font-bold">
              ⌕
            </div>

            <h3 className="mt-4 text-base font-bold text-neutral-900">
              No results found
            </h3>

            <p className="mx-auto mt-2 max-w-md text-xs leading-5 text-neutral-500">
              We couldn&apos;t find anything matching your search. Try another
              keyword or choose a different category.
            </p>

            <button
              type="button"
              onClick={() => {
                setSearchQuery("");
                setActiveFilter("All");
              }}
              className="mt-5 rounded-xl bg-black px-5 py-2.5 text-xs font-semibold text-white transition hover:bg-neutral-800"
            >
              Clear Search
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <ProtectedRoute>
      <main className="min-h-screen bg-neutral-50">
        <AppNavbar />
        <Suspense fallback={<div className="mx-auto max-w-5xl px-6 py-10 text-neutral-500">Loading search...</div>}>
          <SearchContent />
        </Suspense>
      </main>
    </ProtectedRoute>
  );
}