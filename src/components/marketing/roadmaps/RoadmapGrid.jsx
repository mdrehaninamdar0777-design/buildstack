import RoadmapCard from "./RoadmapCard";
import { roadmapData } from "./roadmap.data";

export default function RoadmapGrid({ roadmaps = roadmapData }) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {roadmaps.map((roadmap) => (
        <RoadmapCard key={roadmap.id} {...roadmap} />
      ))}
    </div>
  );
}