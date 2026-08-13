import { Search, X } from "lucide-react";

export default function SearchBar({ value, onChange }) {
  const handleClear = () => {
    onChange("");
  };

  return (
    <div className="relative">
      <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-neutral-400" />

      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search roadmaps, skills, topics, resources..."
        className="h-14 w-full rounded-xl border border-neutral-200 bg-white pl-12 pr-12 text-sm text-neutral-900 outline-none transition placeholder:text-neutral-400 focus:border-neutral-400 focus:ring-2 focus:ring-neutral-100"
      />

      {value && (
        <button
          type="button"
          onClick={handleClear}
          className="absolute right-4 top-1/2 flex -translate-y-1/2 items-center justify-center text-neutral-400 transition hover:text-neutral-900"
          aria-label="Clear search"
        >
          <X className="h-5 w-5" />
        </button>
      )}
    </div>
  );
}