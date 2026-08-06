import RoadmapGrid from "./RoadmapGrid";
import { roadmapData } from "./roadmap.data";

export default function FeaturedRoadmaps() {
  return (
    <section className="space-y-8">

      <div className="flex items-center justify-between">

        <div>

          <h2 className="text-3xl font-bold text-neutral-900">
            Featured Roadmaps
          </h2>

          <p className="mt-2 text-neutral-600">
            Start learning with our most popular learning paths.
          </p>

        </div>

      </div>

      <RoadmapGrid
        roadmaps={roadmapData.slice(0, 3)}
      />

    </section>
  );
}