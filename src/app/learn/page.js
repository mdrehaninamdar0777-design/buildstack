

import {
 
 
  LearnHeader,
  DomainGrid,
  DomainFilters,
} from "@/components/learn";

import { domains } from "@/data/learn/domains.data";

export default function LearnPage() {
  return (
    <main className="min-h-screen bg-white">

      

      <div className="flex">

       

        {/* Main Content */}
        <section className="min-w-0 flex-1">

          <div className="mx-auto max-w-[1400px] px-6 py-10 lg:px-10">

            {/* Header */}
            <LearnHeader />

            {/* Filters */}
            <div className="mt-8">
              <DomainFilters />
            </div>

            {/* Domain Grid */}
            <div className="mt-8">
              <DomainGrid domains={domains} />
            </div>

            {/* Find My Path */}
            <div className="mt-8 rounded-2xl border border-neutral-200 bg-white p-6 lg:p-7">
              <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

                <div className="flex items-center gap-5">

                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-black">
                    <span className="text-2xl text-white">
                      ☆
                    </span>
                  </div>

                  <div>
                    <h2 className="text-base font-semibold text-neutral-900">
                      Not sure where to start?
                    </h2>

                    <p className="mt-1 max-w-xl text-sm text-neutral-500">
                      Take our quick assessment and we&apos;ll suggest the best
                      learning path for you.
                    </p>
                  </div>

                </div>

                <button
                  type="button"
                  className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-black px-5 py-3 text-sm font-semibold text-white transition hover:bg-neutral-800"
                >
                  Find My Path
                  <span>→</span>
                </button>

              </div>
            </div>

          </div>

        </section>
      </div>
    </main>
  );
}