export default function WeeklyChart() {
  const bars = [40, 65, 85, 55, 95, 45, 70];

  return (
    <section className="rounded-2xl border border-neutral-200 bg-white p-5">

      <div className="mb-6 flex items-center justify-between">

        <div>
          <h3 className="text-base font-semibold text-neutral-900">
            Weekly Progress
          </h3>

          <p className="text-sm text-neutral-500">
            This Week
          </p>
        </div>

        <button
          type="button"
          className="text-sm font-medium text-neutral-500 transition-colors hover:text-neutral-900"
        >
          View
        </button>

      </div>

      <div className="flex h-44 items-end justify-between gap-3">

        {bars.map((height, index) => (
          <div
            key={index}
            className="flex flex-1 flex-col items-center gap-2"
          >
            <div
              style={{ height: `${height}%` }}
              className="w-full rounded-full bg-black transition-all"
            />

            <span className="text-xs text-neutral-400">
              {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][index]}
            </span>
          </div>
        ))}

      </div>

    </section>
  );
}