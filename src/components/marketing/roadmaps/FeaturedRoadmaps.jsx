import RoadmapGrid from "./RoadmapGrid";
import { roadmapData } from "./roadmap.data";

export default function FeaturedRoadmaps() {
  return (
    <section className="w-full bg-white py-24">
      <div className="mx-auto max-w-6xl px-6">

        {/* Section Heading */}
        <div className="text-center">
          <p className="text-sm font-medium uppercase tracking-wider text-neutral-500">
            Roadmaps
          </p>

          <h2 className="mt-3 text-4xl font-bold tracking-tight text-neutral-900">
            Popular Learning Roadmaps
          </h2>

          <p className="mt-3 text-lg text-neutral-600">
            Start learning with our most popular learning paths.
          </p>
        </div>

        {/* Roadmap Cards */}
        <div className="mt-10">
          <RoadmapGrid roadmaps={roadmapData.slice(0, 3)} />
        </div>

      </div>
    </section>
  );
}