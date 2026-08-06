import {
  DashboardHeader,
  DashboardSidebar,
} from "@/components/dashboard";

import {
  RoadmapGrid,
  RoadmapSearch,
  RoadmapFilters,
  RoadmapTabs,
} from "@/components/roadmaps";

export default function RoadmapsPage() {
  return (
    <main className="min-h-screen bg-neutral-50">

      <div className="mx-auto max-w-7xl px-6 py-8">

        <DashboardHeader title="Roadmaps" />

        <div className="mt-8 grid grid-cols-12 gap-6">

          <aside className="col-span-3">
            <DashboardSidebar />
          </aside>

          <section className="col-span-9">

            <RoadmapSearch />

            <div className="mt-6">
              <RoadmapFilters />
            </div>

            <div className="mt-6">
              <RoadmapTabs />
            </div>

            <div className="mt-8">
              <RoadmapGrid />
            </div>

          </section>

        </div>

      </div>

    </main>
  );
}