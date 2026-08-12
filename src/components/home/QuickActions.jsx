import { homeData } from "./home.data";

export default function QuickActions() {
  const { quickActions } = homeData;

  return (
    <section className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
      <div className="flex items-center gap-3">
        <span className="text-xl">⚡</span>

        <h2 className="text-lg font-bold text-neutral-900">
          Quick Actions
        </h2>
      </div>

      <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {quickActions.map((action) => (
          <button
            key={action.title}
            type="button"
            className="flex items-center gap-4 rounded-xl border border-neutral-200 p-4 text-left transition hover:border-neutral-400 hover:bg-neutral-50"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-neutral-50 text-sm font-bold text-neutral-800">
              {action.icon}
            </div>

            <div className="min-w-0 flex-1">
              <p className="text-sm font-bold text-neutral-900">
                {action.title}
              </p>

              <p className="mt-1 text-xs text-neutral-500">
                {action.description}
              </p>
            </div>

            <span className="text-lg text-neutral-900">›</span>
          </button>
        ))}
      </div>
    </section>
  );
}