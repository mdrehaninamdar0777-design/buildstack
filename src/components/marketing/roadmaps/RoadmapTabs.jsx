import { Button } from "@/components/ui";

const tabs = [
  "Popular",
  "Newest",
  "Trending",
];

export default function RoadmapTabs({
  active = "Popular",
}) {
  return (
    <div className="flex items-center gap-3">

      {tabs.map((tab) => (
        <Button
          key={tab}
          variant={
            active === tab
              ? "primary"
              : "ghost"
          }
          size="sm"
        >
          {tab}
        </Button>
      ))}

    </div>
  );
}