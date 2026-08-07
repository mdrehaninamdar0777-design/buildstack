import {
  Trophy,
  Flame,
  Target,
  Award,
} from "lucide-react";

import { Card } from "@/components/ui";

const achievements = [
  {
    id: 1,
    title: "First Roadmap Completed",
    description: "Completed your first roadmap",
    date: "May 15, 2025",
    icon: Trophy,
    bg: "bg-yellow-100",
    color: "text-yellow-600",
  },
  {
    id: 2,
    title: "12 Day Streak",
    description: "Keep learning every day",
    date: "May 18, 2025",
    icon: Flame,
    bg: "bg-orange-100",
    color: "text-orange-600",
  },
  {
    id: 3,
    title: "100 Lessons Completed",
    description: "Completed 100 lessons",
    date: "May 14, 2025",
    icon: Target,
    bg: "bg-green-100",
    color: "text-green-600",
  },
  {
    id: 4,
    title: "90% Quiz Accuracy",
    description: "Scored 90% or more in a quiz",
    date: "May 12, 2025",
    icon: Award,
    bg: "bg-blue-100",
    color: "text-blue-600",
  },
];

export default function AchievementsCard() {
  return (
    <Card className="p-6">

      {/* Header */}
      <div className="mb-6 flex items-center justify-between">

        <h2 className="text-xl font-bold text-neutral-900">
          Achievements
        </h2>

        <button className="text-sm font-medium text-neutral-500 transition hover:text-neutral-900">
          View all
        </button>

      </div>

      {/* Achievement List */}
      <div className="space-y-6">

        {achievements.map(
          ({
            id,
            title,
            description,
            date,
            icon: Icon,
            bg,
            color,
          }) => (
            <div
              key={id}
              className="flex items-start gap-4"
            >

              <div
                className={`flex h-12 w-12 items-center justify-center rounded-xl ${bg}`}
              >
                <Icon
                  className={`h-6 w-6 ${color}`}
                />
              </div>

              <div className="flex-1">

                <h3 className="font-semibold text-neutral-900">
                  {title}
                </h3>

                <p className="mt-1 text-sm text-neutral-500">
                  {description}
                </p>

                <p className="mt-1 text-xs text-neutral-400">
                  {date}
                </p>

              </div>

            </div>
          )
        )}

      </div>

    </Card>
  );
}