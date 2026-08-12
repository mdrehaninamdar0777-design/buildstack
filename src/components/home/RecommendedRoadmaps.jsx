import { homeData } from "./home.data";

const iconStyles = {
  Node: "bg-green-50 text-green-600",
  DevOps: "bg-blue-50 text-blue-600",
  AI: "bg-orange-50 text-orange-500",
};

export default function RecommendedRoadmaps() {
  const { recommendedRoadmaps } = homeData;

  return (
    <section className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-xl">▣</span>

          <h2 className="text-lg font-bold text-neutral-900">
            Recommended Roadmaps
          </h2>
        </div>

        <button className="text-sm font-medium text-neutral-600 hover:text-black">
          View all
        </button>
      </div>

      <div className="mt-7 grid divide-y sm:grid-cols-3 sm:divide-x sm:divide-y-0">
        {recommendedRoadmaps.map((roadmap) => (
          <div
            key={roadmap.title}
            className="px-4 py-4 first:pl-0 last:pr-0"
          >
            <div className="flex items-start gap-3">
              <div
                className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-sm font-bold ${
                  iconStyles[roadmap.icon]
                }`}
              >
                {roadmap.icon}
              </div>

              <div>
                <h3 className="text-sm font-bold text-neutral-900">
                  {roadmap.title}
                </h3>

                <span className="mt-2 inline-block rounded-full bg-neutral-100 px-3 py-1 text-xs text-neutral-600">
                  {roadmap.level}
                </span>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between text-xs text-neutral-600">
              <span>{roadmap.duration}</span>
              <span className="font-semibold text-neutral-900">
                {roadmap.progress}%
              </span>
            </div>

            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-neutral-100">
              <div
                className="h-full rounded-full bg-black"
                style={{ width: `${roadmap.progress}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}