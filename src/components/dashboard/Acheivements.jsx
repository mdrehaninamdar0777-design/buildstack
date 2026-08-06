import {
  Trophy,
  Medal,
  Star,
} from "lucide-react";

import { Card, Badge } from "@/components/ui";

const achievements = [
  {
    icon: Trophy,
    title: "7 Day Streak",
  },
  {
    icon: Medal,
    title: "10 Roadmaps",
  },
  {
    icon: Star,
    title: "Top Learner",
  },
];

export default function Achievements({
  data = achievements,
}) {
  return (
    <Card className="p-5">

      <div className="flex items-center justify-between">

        <h3 className="text-lg font-bold text-neutral-900">
          Achievements
        </h3>

        <Badge>
          {data.length}
        </Badge>

      </div>

      <div className="mt-6 space-y-4">

        {data.map(({ icon: Icon, title }) => (
          <div
            key={title}
            className="flex items-center gap-4"
          >

            <div className="rounded-xl bg-neutral-100 p-3">

              <Icon className="h-5 w-5 text-neutral-700" />

            </div>

            <p className="font-medium text-neutral-800">
              {title}
            </p>

          </div>
        ))}

      </div>

    </Card>
  );
}