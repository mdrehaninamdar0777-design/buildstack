import { homeData } from "./home.data";

export default function ContinueLearning() {
  const { continueLearning } = homeData;

  return (
    <section className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm lg:p-8">
      <div className="grid items-center gap-8 lg:grid-cols-[140px_1fr_auto_280px]">

        {/* Icon */}
        <div className="flex h-36 w-36 items-center justify-center rounded-[2rem] bg-neutral-50">
          <div className="text-6xl">⌨</div>
        </div>

        {/* Content */}
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xl text-yellow-500">★</span>

            <span className="text-base font-semibold text-neutral-900">
              Continue Learning
            </span>
          </div>

          <h2 className="mt-3 text-2xl font-bold tracking-tight text-neutral-900">
            {continueLearning.title}
          </h2>

          <p className="mt-3 text-base text-neutral-600">
            <span className="mr-2">⌖</span>
            Current Module:{" "}
            <span className="font-semibold text-blue-600">
              {continueLearning.currentModule}
            </span>
          </p>

          <div className="mt-5 flex items-center gap-4">
            <div className="h-3 flex-1 overflow-hidden rounded-full bg-neutral-100">
              <div
                className="h-full rounded-full bg-black"
                style={{ width: `${continueLearning.progress}%` }}
              />
            </div>

            <span className="text-lg font-bold text-neutral-900">
              {continueLearning.progress}%
            </span>
          </div>

          <div className="mt-6 flex flex-wrap gap-8">
            <div>
              <p className="text-sm text-neutral-500">
                ◷ &nbsp;Estimated Time Left
              </p>

              <p className="mt-1 font-semibold text-neutral-900">
                {continueLearning.estimatedTime}
              </p>
            </div>

            <div className="h-10 w-px bg-neutral-200" />

            <div>
              <p className="text-sm text-neutral-500">
                ▣ &nbsp;Last Session
              </p>

              <p className="mt-1 font-semibold text-neutral-900">
                {continueLearning.lastSession}
              </p>
            </div>
          </div>
        </div>

        {/* Button */}
        <button
          type="button"
          className="rounded-xl bg-black px-7 py-4 text-sm font-semibold text-white transition hover:bg-neutral-800"
        >
          Resume Learning
          <span className="ml-4">→</span>
        </button>

        {/* Illustration placeholder */}
        <div className="hidden h-40 items-center justify-center rounded-2xl bg-neutral-50 lg:flex">
          <div className="text-center">
            <div className="text-6xl">💻</div>
            <p className="mt-2 text-xs font-medium text-neutral-400">
              Learning Workspace
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}