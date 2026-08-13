import {
  DomainHeader,
  DomainFilters,
  DomainGrid,
} from "@/components/learn/domains";

import { domains } from "@/data/learn/domains.data";

export default function DomainsPage() {
  return (
    <div className="mx-auto max-w-[1400px] px-6 py-10 lg:px-10">
      <DomainHeader />

      <div className="mt-8">
        <DomainFilters />
      </div>

      <div className="mt-6">
        <DomainGrid domains={domains} />
      </div>
    </div>
  );
}