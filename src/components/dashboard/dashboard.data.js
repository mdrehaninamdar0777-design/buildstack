import {
  Award,
  BookOpen,
  Clock3,
  Flame,
  Map,
  Target,
  Trophy,
} from "lucide-react";

export const dashboardStats = [
  {
    id: 1,
    title: "Total Learning Hours",
    value: "87.6 hrs",
    change: "+18%",
    description: "vs last week",
    icon: Clock3,
  },
  {
    id: 2,
    title: "Completed Skills",
    value: "18",
    change: "+12%",
    description: "vs last week",
    icon: BookOpen,
  },
  {
    id: 3,
    title: "Active Roadmaps",
    value: "3",
    change: "0%",
    description: "vs last week",
    icon: Map,
  },
  {
    id: 4,
    title: "Current Streak",
    value: "12 Days",
    change: "+2 Days",
    description: "vs last week",
    icon: Flame,
  },
];

export const weeklyActivityData = [
  { day: "Mon", hours: 2.5 },
  { day: "Tue", hours: 3.2 },
  { day: "Wed", hours: 2.8 },
  { day: "Thu", hours: 4.5 },
  { day: "Fri", hours: 5.3 },
  { day: "Sat", hours: 4.8 },
  { day: "Sun", hours: 3.6 },
];



export const achievements = [
  {
    id: 1,
    title: "First Roadmap Completed",
    description: "Completed the React Roadmap",
    earnedAt: "15 May 2026",
    icon: Trophy,
    iconContainerClassName: "bg-yellow-100",
    iconClassName: "text-yellow-600",
  },
  {
    id: 2,
    title: "12 Day Streak",
    description: "Learned continuously for 12 days",
    earnedAt: "18 May 2026",
    icon: Flame,
    iconContainerClassName: "bg-orange-100",
    iconClassName: "text-orange-600",
  },
  {
    id: 3,
    title: "100 Lessons Completed",
    description: "Completed 100 lessons",
    earnedAt: "20 May 2026",
    icon: Target,
    iconContainerClassName: "bg-green-100",
    iconClassName: "text-green-600",
  },
  {
    id: 4,
    title: "Top Performer",
    description: "Top 10% this month",
    earnedAt: "25 May 2026",
    icon: Award,
    iconContainerClassName: "bg-blue-100",
    iconClassName: "text-blue-600",
  },
];

export const activeRoadmaps = [
  {
    id: 1,
    title: "React.js",
    level: "Intermediate",
    progress: 68,
  },
  {
    id: 2,
    title: "Node.js",
    level: "Beginner",
    progress: 35,
  },
  {
    id: 3,
    title: "MongoDB",
    level: "Intermediate",
    progress: 82,
  },
];

export const skillProgressData = [
  {
    id: 1,
    name: "HTML",
    level: "Advanced",
    progress: 95,
  },
  {
    id: 2,
    name: "CSS",
    level: "Advanced",
    progress: 90,
  },
  {
    id: 3,
    name: "JavaScript",
    level: "Intermediate",
    progress: 80,
  },
  {
    id: 4,
    name: "React",
    level: "Intermediate",
    progress: 65,
  },
];

export const activityFeedData = [
  {
    id: 1,
    title: "Completed React Hooks",
    description: "Finished the React Hooks module.",
    time: "2 hours ago",
  },
  {
    id: 2,
    title: "Started Node.js Roadmap",
    description: "Began the Backend Development roadmap.",
    time: "Yesterday",
  },
  {
    id: 3,
    title: "Achievement Unlocked",
    description: "Earned the 12 Day Streak badge.",
    time: "2 days ago",
  },
];
export const weeklyActivitySummary = {
  title: "Great job! You're improving.",
  description: "You learned 18% more compared to last week.",
  actionLabel: "View Insights",
};
export const learningCalendarData = {
  month: "May 2026",
  weeks: [
    [0, 0, 1, 2, 0, 3, 1],
    [1, 0, 2, 0, 1, 4, 2],
    [2, 1, 0, 3, 2, 1, 4],
    [0, 2, 1, 0, 4, 3, 2],
    [1, 0, 2, 4, 2, 1, 3],
  ],
};
export const dashboardHeaderData = {
  title: "Dashboard",
  description: "Track your learning progress and achievements.",
  dateRange: "May 12 – May 18, 2025",
};