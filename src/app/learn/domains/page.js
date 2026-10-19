import Link from "next/link";
import { Star, ArrowRight } from "lucide-react";
import {
  DomainHeader,
  DomainFilters,
  DomainGrid,
} from "@/components/learn/domains";

import { domains } from "@/data/learn/domains.data";

export default function DomainsPage() {
  return (
    <div className="mx-auto max-w-[1400px] px-6 py-8 lg:px-10">
      <DomainHeader />

      <div className="mt-6">
        <DomainFilters />
      </div>

      <div className="mt-6">
        <DomainGrid domains={domains} />
      </div>

      {/* Assessment Banner matching Image 8 */}
      <div className="mt-8 flex flex-col items-start justify-between gap-4 rounded-2xl border border-neutral-200 bg-white p-6 shadow-2xs sm:flex-row sm:items-center">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-black text-white">
            <Star className="h-5 w-5" />
          </div>

          <div>
            <h3 className="text-base font-bold text-neutral-900">
              Not sure where to start?
            </h3>
            <p className="mt-0.5 text-xs text-neutral-500 sm:text-sm">
              Take our quick assessment and we&apos;ll suggest the best learning path for you.
            </p>
          </div>
        </div>

        <Link
          href="/learn/roadmaps"
          className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-black px-5 py-2.5 text-xs sm:text-sm font-semibold text-white transition hover:bg-neutral-800"
        >
          <span>Find My Path</span>
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}