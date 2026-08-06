import RoadmapCard from "./RoadmapCard";
import { roadmapData } from "./roadmap.data";

export default function RoadmapGrid({
  roadmaps = roadmapData,
  variant = "default",
}) {
  return (
    <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

      {roadmaps.map((roadmap) => (
        <RoadmapCard
          key={roadmap.id}
          {...roadmap}
          variant={variant}
        />
      ))}

    </section>
  );
}