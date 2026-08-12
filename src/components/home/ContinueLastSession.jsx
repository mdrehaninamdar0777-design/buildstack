import { homeData } from "./home.data";

const iconStyles = {
  React: "bg-blue-50 text-blue-500",
  JS: "bg-yellow-50 text-yellow-600",
  Notes: "bg-purple-50 text-purple-600",
};

export default function ContinueLastSession() {
  const { lastSessions } = homeData;

  return (
    <section className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-xl">◷</span>

          <h2 className="text-lg font-bold text-neutral-900">
            Continue From Last Session
          </h2>
        </div>

        <button className="text-sm font-medium text-neutral-600 hover:text-black">
          View all
        </button>
      </div>

      <div className="mt-6 divide-y divide-neutral-100">
        {lastSessions.map((session) => (
          <div
            key={session.title}
            className="flex items-center gap-4 py-3 first:pt-0 last:pb-0"
          >
            <div
              className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-xs font-bold ${
                iconStyles[session.icon]
              }`}
            >
              {session.icon}
            </div>

            <div className="min-w-0 flex-1">
              <p className="text-sm font-bold text-neutral-900">
                {session.title}
              </p>

              <p className="mt-1 text-xs text-neutral-500">
                {session.description}
              </p>
            </div>

            <button
              type="button"
              className="shrink-0 rounded-lg border border-neutral-200 px-4 py-2 text-xs font-semibold text-neutral-900 hover:bg-neutral-50"
            >
              Continue
              <span className="ml-3">→</span>
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}