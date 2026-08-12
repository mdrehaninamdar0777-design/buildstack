import { homeData } from "./home.data";

export default function TodaysGoal() {
  const { todaysGoal } = homeData;

  return (
    <section className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
      <div className="flex items-center gap-3">
        <span className="text-2xl">🎯</span>

        <h2 className="text-lg font-bold text-neutral-900">
          Today&apos;s Goal
        </h2>
      </div>

      <div className="mt-7 grid items-center gap-6 sm:grid-cols-[1fr_auto]">
        <div>
          <h3 className="text-base font-bold text-neutral-900">
            {todaysGoal.title}
          </h3>

          <p className="mt-2 max-w-md text-sm leading-6 text-neutral-600">
            {todaysGoal.description}
          </p>

          <p className="mt-7 text-sm text-neutral-600">
            ◷ &nbsp; {todaysGoal.duration}
          </p>
        </div>

        <div className="flex flex-col items-center gap-5">
          <div className="relative flex h-20 w-20 items-center justify-center rounded-full border-[7px] border-green-500">
            <span className="text-lg font-bold text-neutral-900">
              {todaysGoal.progress}%
            </span>
          </div>

          <button
            type="button"
            className="rounded-xl bg-black px-7 py-3 text-sm font-semibold text-white hover:bg-neutral-800"
          >
            Start Goal
          </button>
        </div>
      </div>
    </section>
  );
}