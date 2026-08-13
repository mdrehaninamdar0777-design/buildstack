import {
  DomainHeader,
  TechnologySection,
} from "@/components/learn/domains";

import { domains } from "@/data/learn/domains.data";

export default async function DomainPage({ params }) {
  const { domain } = await params;

  const currentDomain = domains.find((item) => {
  const itemSlug =
    item.slug ||
    item.name?.toLowerCase().trim().replace(/\s+/g, "-");

  return itemSlug === domain;
});

  if (!currentDomain) {
    return (
      <div className="px-6 py-10">
        <h1 className="text-2xl font-bold">
          Domain Not Found
        </h1>

        <p className="mt-2 text-neutral-600">
          The requested learning domain could not be found.
        </p>
      </div>
    );
  }

  return (
    <div className="px-6 py-8 lg:px-8">
      {/* Breadcrumb + Domain Header */}
      <DomainHeader domain={currentDomain} />

      {/* Technology Sections */}
      <div className="mt-6 space-y-4">
        {currentDomain.sections?.map((section) => (
          <TechnologySection
            key={section.id}
            section={section}
          />
        ))}
      </div>
    </div>
  );
}