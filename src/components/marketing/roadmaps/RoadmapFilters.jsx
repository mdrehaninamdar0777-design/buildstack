import { Button } from "@/components/ui";

const filters = [
  "All",
  "Frontend",
  "Backend",
  "Full Stack",
  "DevOps",
  "AI",
];

export default function RoadmapFilters({
  active = "All",
}) {
  return (
    <div className="flex flex-wrap gap-3">

      {filters.map((filter) => (
        <Button
          key={filter}
          variant={
            active === filter
              ? "primary"
              : "secondary"
          }
          size="sm"
        >
          {filter}
        </Button>
      ))}

    </div>
  );
}