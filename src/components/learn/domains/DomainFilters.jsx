import {
  Grid2X2,
  List,
  Flame,
  Star,
  TrendingUp,
} from "lucide-react";

const filters = [
  {
    label: "All Domains",
    icon: Grid2X2,
  },
  {
    label: "Popular",
    icon: Flame,
  },
  {
    label: "New",
    icon: Star,
  },
  {
    label: "Trending",
    icon: TrendingUp,
  },
];

export default function DomainFilters() {
  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

      <div className="flex flex-wrap gap-2">
        {filters.map((filter, index) => {
          const Icon = filter.icon;

          return (
            <button
              key={filter.label}
              type="button"
              className={
                index === 0
                  ? "flex items-center gap-2 rounded-full bg-black px-5 py-2.5 text-sm font-medium text-white"
                  : "flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-5 py-2.5 text-sm font-medium text-neutral-700 transition hover:bg-neutral-50"
              }
            >
              <Icon className="h-4 w-4" />
              {filter.label}
            </button>
          );
        })}
      </div>

      <div className="flex items-center rounded-xl border border-neutral-200 bg-white p-1">
        <button
          type="button"
          className="flex items-center gap-2 rounded-lg bg-neutral-100 px-5 py-2 text-sm font-medium text-neutral-900"
        >
          <Grid2X2 className="h-4 w-4" />
          Grid
        </button>

        <button
          type="button"
          className="flex items-center gap-2 rounded-lg px-5 py-2 text-sm text-neutral-600"
        >
          <List className="h-4 w-4" />
          List
        </button>
      </div>
    </div>
  );
}