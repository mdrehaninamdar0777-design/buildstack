import {
  CheckCircle2,
  BookOpen,
  Trophy,
} from "lucide-react";

const activities = [
  {
    id: 1,
    title: "Completed React Hooks",
    time: "2h ago",
    icon: CheckCircle2,
    color: "text-green-600",
    bg: "bg-green-100",
  },
  {
    id: 2,
    title: "Started Next.js Roadmap",
    time: "Yesterday",
    icon: BookOpen,
    color: "text-blue-600",
    bg: "bg-blue-100",
  },
  {
    id: 3,
    title: "7 Day Learning Streak",
    time: "2 days ago",
    icon: Trophy,
    color: "text-yellow-600",
    bg: "bg-yellow-100",
  },
];

export default function ActivityFeed() {
  return (
    <section className="rounded-2xl border border-neutral-200 bg-white p-5">

      <div className="mb-5 flex items-center justify-between">

        <h3 className="text-base font-semibold text-neutral-900">
          Recent Activity
        </h3>

        <button
          type="button"
          className="text-sm font-medium text-neutral-500 transition hover:text-neutral-900"
        >
          View all
        </button>

      </div>

      <div className="space-y-4">

        {activities.map((activity) => {
          const Icon = activity.icon;

          return (
            <div
              key={activity.id}
              className="flex items-center gap-4 rounded-xl border border-neutral-100 p-3 transition hover:bg-neutral-50"
            >
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-full ${activity.bg}`}
              >
                <Icon className={`h-5 w-5 ${activity.color}`} />
              </div>

              <div className="flex-1">

                <h4 className="text-sm font-medium text-neutral-900">
                  {activity.title}
                </h4>

                <p className="text-xs text-neutral-500">
                  {activity.time}
                </p>

              </div>

            </div>
          );
        })}

      </div>

    </section>
  );
}