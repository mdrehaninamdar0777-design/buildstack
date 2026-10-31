import StatCard from "./StatCard";

export default function StatsSection({
  stats,
  mode = "full",
}) {
  const isPreview = mode === "preview";

  return (
    <section
      className={
        isPreview
          ? "grid grid-cols-4 gap-3"
          : "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
      }
    >
      {stats.map((stat) => (
        <StatCard
          key={stat.title}
          {...stat}
          mode={mode}
        />
      ))}
    </section>
  );
}