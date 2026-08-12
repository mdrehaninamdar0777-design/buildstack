import { homeData } from "./home.data";

export default function RecommendedSkills() {
  const { recommendedSkills } = homeData;

  return (
    <section className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-xl">▱</span>

          <h2 className="text-lg font-bold text-neutral-900">
            Recommended Skills
          </h2>
        </div>

        <button className="text-sm font-medium text-neutral-600 hover:text-black">
          View all
        </button>
      </div>

      <div className="mt-7 grid grid-cols-2 gap-3 xl:grid-cols-4">
        {recommendedSkills.map((skill) => (
          <div
            key={skill.title}
            className="rounded-xl border border-neutral-200 p-4 transition hover:border-neutral-400"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-neutral-50 text-xs font-bold text-neutral-800">
                {skill.icon}
              </div>

              <div>
                <h3 className="text-sm font-bold text-neutral-900">
                  {skill.title}
                </h3>

                <p className="mt-1 text-xs text-neutral-500">
                  {skill.level}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}