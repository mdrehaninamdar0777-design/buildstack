import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

export default function SearchBar({ className }) {
  return (
    <div
      className={cn(
        "hidden h-11 items-center gap-2.5 rounded-full border border-neutral-200 bg-white px-4 transition-colors duration-200 ease-out focus-within:border-neutral-400 focus-within:ring-2 focus-within:ring-black/5 md:flex md:w-[260px] lg:w-[450px]",
        className
      )}
    >
      <Search className="h-[18px] w-[18px] shrink-0 text-neutral-400" aria-hidden="true" />
      <input
        type="search"
        placeholder="Search roadmaps, topics, resources..."
        aria-label="Search roadmaps, topics, resources"
        className="w-full min-w-0 bg-transparent text-sm text-neutral-700 placeholder:text-neutral-400 focus:outline-none"
      />
    </div>
  );
}

export function MobileSearchTrigger({ className }) {
  return (
    <button
      type="button"
      aria-label="Open search"
      className={cn(
        "flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-neutral-700 transition-colors duration-200 ease-out hover:bg-neutral-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 md:hidden",
        className
      )}
    >
      <Search className="h-5 w-5" aria-hidden="true" />
    </button>
  );
}
