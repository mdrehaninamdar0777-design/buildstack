import {
  Award,
  BookOpen,
  Clock3,
  Flame,
  Map,
  Target,
  Trophy,
} from "lucide-react";

export const dashboardHeaderData = {
  title: "Dashboard",
  description: "Track your learning progress and achievements.",
  dateRange: "May 12 – May 18, 2025",
};

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
    value: "12 days",
    change: "+2 days",
    description: "vs last week",
    icon: Flame,
  },
];

export const weeklyActivityData = [
  { day: "Mon", hours: 9.2 },
  { day: "Tue", hours: 12.1 },
  { day: "Wed", hours: 14.8 },
  { day: "Thu", hours: 8.3 },
  { day: "Fri", hours: 16.7 },
  { day: "Sat", hours: 18.9 },
  { day: "Sun", hours: 7.6 },
];

export const weeklyActivitySummary = {
  title: "Great job! You learned 18% more this week.",
  description: "Keep up the momentum!",
  actionLabel: "View Insights",
};

export const achievements = [
  {
    id: 1,
    title: "First Roadmap Completed",
    description: "Completed your first roadmap",
    earnedAt: "May 15, 2025",
    icon: Trophy,
    iconContainerClassName: "bg-amber-100",
    iconClassName: "text-amber-600",
  },
  {
    id: 2,
    title: "12 Day Streak",
    description: "Keep learning every day",
    earnedAt: "May 18, 2025",
    icon: Flame,
    iconContainerClassName: "bg-blue-100",
    iconClassName: "text-blue-600",
  },
  {
    id: 3,
    title: "100 Lessons Completed",
    description: "Completed 100 lessons",
    earnedAt: "May 14, 2025",
    icon: Target,
    iconContainerClassName: "bg-emerald-100",
    iconClassName: "text-emerald-600",
  },
  {
    id: 4,
    title: "90% Quiz Accuracy",
    description: "Scored 90% or more in a quiz",
    earnedAt: "May 12, 2025",
    icon: Award,
    iconContainerClassName: "bg-indigo-100",
    iconClassName: "text-indigo-600",
  },
];

export const activeRoadmaps = [
  {
    id: 1,
    title: "Frontend Developer",
    modules: "26 / 62 modules",
    progress: 42,
  },
  {
    id: 2,
    title: "Backend Developer",
    modules: "12 / 65 modules",
    progress: 18,
  },
  {
    id: 3,
    title: "AI Fundamentals",
    modules: "5 / 58 modules",
    progress: 8,
  },
];

export const skillProgressData = [
  {
    id: 1,
    name: "React",
    progress: 70,
    color: "bg-blue-500",
  },
  {
    id: 2,
    name: "JavaScript",
    progress: 90,
    color: "bg-amber-500",
  },
  {
    id: 3,
    name: "Node.js",
    progress: 35,
    color: "bg-emerald-500",
  },
  {
    id: 4,
    name: "MongoDB",
    progress: 20,
    color: "bg-green-600",
  },
  {
    id: 5,
    name: "TypeScript",
    progress: 60,
    color: "bg-blue-600",
  },
];

export const activityFeedData = [
  {
    id: 1,
    title: 'Completed "React Hooks" lesson',
    type: "react",
    time: "2h ago",
  },
  {
    id: 2,
    title: 'Added notes for "Flexbox in CSS"',
    type: "notes",
    time: "5h ago",
  },
  {
    id: 3,
    title: "Scored 9/10 in JavaScript Quiz",
    type: "js",
    time: "Yesterday",
  },
  {
    id: 4,
    title: 'Started "Docker Basics"',
    type: "docker",
    time: "Yesterday",
  },
  {
    id: 5,
    title: 'Completed "Git & GitHub" lesson',
    type: "git",
    time: "2 days ago",
  },
];

export const learningCalendarData = {
  month: "May 2025",
  weeks: [
    [0, 1, 0, 1, 2, 0, 1],
    [0, 1, 1, 1, 2, 3, 2],
    [1, 1, 2, 3, 1, 2, 3],
    [1, 1, 1, 3, 1, 1, 2],
    [1, 1, 2, 1, 2, 1, 0],
  ],
};