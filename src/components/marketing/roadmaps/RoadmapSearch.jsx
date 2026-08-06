import { Search } from "lucide-react";
import { Input } from "@/components/ui";

export default function RoadmapSearch({
  placeholder = "Search roadmaps...",
}) {
  return (
    <div className="relative w-full">

      <Search
        className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400"
      />

      <Input
        placeholder={placeholder}
        className="pl-11"
      />

    </div>
  );
}