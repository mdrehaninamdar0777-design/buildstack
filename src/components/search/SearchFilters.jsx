export default function SearchFilters({
  activeFilter,
  onFilterChange,
}) {
  const filters = [
    "All",
    "Roadmaps",
    "Skills",
    "Topics",
    "Resources",
  ];

  return (
    <div className="flex flex-wrap items-center gap-2">
      {filters.map((filter) => {
        const isActive = activeFilter === filter;

        return (
          <button
            key={filter}
            type="button"
            onClick={() => onFilterChange(filter)}
            className={`rounded-lg border px-4 py-2 text-sm font-medium transition ${
              isActive
                ? "border-black bg-black text-white"
                : "border-neutral-200 bg-white text-neutral-600 hover:border-neutral-300 hover:text-neutral-900"
            }`}
          >
            {filter}
          </button>
        );
      })}
    </div>
  );
}