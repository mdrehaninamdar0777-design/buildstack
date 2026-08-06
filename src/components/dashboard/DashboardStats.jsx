import { Flame, CircleDashed } from "lucide-react";

import { Card } from "@/components/ui";

const stats = [
  {
    id: 1,
    title: "Day Streak",
    value: "12",
    icon: Flame,
    iconColor: "text-orange-500",
  },
  {
    id: 2,
    title: "Progress",
    value: "68%",
    icon: CircleDashed,
    iconColor: "text-green-500",
  },
];

export default function DashboardStats({
  items = stats,
}) {
  return (
    <div className="grid grid-cols-2 gap-4">

      {items.map(({ id, title, value, icon: Icon, iconColor }) => (
        <Card
          key={id}
          className="p-5"
        >

          <div className="flex items-center gap-4">

            <div className="rounded-xl bg-neutral-100 p-3">
              <Icon className={`h-5 w-5 ${iconColor}`} />
            </div>

            <div>

              <p className="text-2xl font-bold text-neutral-900">
                {value}
              </p>

              <p className="text-sm text-neutral-500">
                {title}
              </p>

            </div>

          </div>

        </Card>
      ))}

    </div>
  );
}