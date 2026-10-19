"use client";

import { use, useMemo, useState } from "react";

import {
  DomainHeader,
  DomainFilters,
  TechnologySection,
} from "@/components/learn/domains";

import {
  domains,
  domainTechnologies,
} from "@/data/learn/domains.data";

export default function DomainDetailPage({ params }) {
  const { domain: slug } = use(params);

  const domain = domains.find(
    (item) => item.slug === slug
  );

  const technologies = useMemo(() => domainTechnologies[slug] || [], [slug]);

  const [activeFilter, setActiveFilter] = useState(null);

  const filteredTechnologies = useMemo(() => {
    if (!activeFilter || activeFilter.startsWith("All")) {
      return technologies;
    }

    if (activeFilter.startsWith("Frontend")) {
      return technologies.filter(
        (item) => item.category === "Frontend"
      );
    }

    if (activeFilter.startsWith("Backend")) {
      return technologies.filter(
        (item) => item.category === "Backend"
      );
    }

    if (activeFilter.startsWith("Database")) {
      return technologies.filter(
        (item) => item.category === "Database"
      );
    }

    if (activeFilter.startsWith("Tools")) {
      return technologies.filter(
        (item) => item.category === "Tools"
      );
    }

    return technologies;
  }, [activeFilter, technologies]);

  if (!domain) {
    return (
      <div className="px-6 py-16 lg:px-10">
        <h1 className="text-3xl font-bold text-neutral-900">
          Domain Not Found
        </h1>

        <p className="mt-2 text-neutral-500">
          The requested learning domain could not be found.
        </p>
      </div>
    );
  }

  const frontend = filteredTechnologies.filter(
    (item) => item.category === "Frontend"
  );

  const backend = filteredTechnologies.filter(
    (item) => item.category === "Backend"
  );

  const database = filteredTechnologies.filter(
    (item) => item.category === "Database"
  );

  return (
    <div className="mx-auto max-w-[1400px] px-6 py-8 lg:px-10">

      <DomainHeader domain={domain} />

      <div className="mt-6">
        <DomainFilters
          mode="detail"
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
        />
      </div>

      {frontend.length > 0 && (
        <div className="mt-4">
          <TechnologySection
            title="Frontend Development"
            count={18}
            technologies={frontend}
          />
        </div>
      )}

      {backend.length > 0 && (
        <div className="mt-4">
          <TechnologySection
            title="Backend Development"
            count={14}
            technologies={backend}
          />
        </div>
      )}

      {database.length > 0 && (
        <div className="mt-4">
          <TechnologySection
            title="Database & Storage"
            count={6}
            technologies={database}
          />
        </div>
      )}

      {filteredTechnologies.length === 0 && (
        <div className="mt-6 rounded-2xl border border-dashed border-neutral-300 px-6 py-16 text-center">
          <h2 className="text-lg font-semibold text-neutral-900">
            No technologies found
          </h2>

          <p className="mt-2 text-sm text-neutral-500">
            Try another category.
          </p>
        </div>
      )}
    </div>
  );
}