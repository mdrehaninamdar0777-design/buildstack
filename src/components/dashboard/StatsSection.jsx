import {
  Clock3,
  BookOpen,
  Map,
  Flame,
} from "lucide-react";

import StatCard from "./StatCard";

const stats = [
  {
    title: "Total Learning Hours",
    value: "87.6 hrs",
    subtitle: "↑ 18% vs last week",
    icon: Clock3,
    trend: "",
  },
  {
    title: "Completed Skills",
    value: "18",
    subtitle: "↑ 12% vs last week",
    icon: BookOpen,
    trend: "",
  },
  {
    title: "Active Roadmaps",
    value: "3",
    subtitle: "0% vs last week",
    icon: Map,
    trend: "",
  },
  {
    title: "Current Streak",
    value: "12 days",
    subtitle: "↑ 2 days vs last week",
    icon: Flame,
    trend: "",
  },
];

export default function StatsSection() {
  return (
    <section className="grid grid-cols-4 gap-5">

      {stats.map((item) => (
        <StatCard
          key={item.title}
          {...item}
        />
      ))}

    </section>
  );
}