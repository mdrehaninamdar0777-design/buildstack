import { Trophy, Flame, Target, Award,} from "lucide-react";
export const welcomeData = {
  greeting: "Good Morning",
  username: "Rehan",
  message: "Keep learning. Keep building.",
};

export const progressData = {
  streak: 12,
  progress: 68,
};

export const continueLearningData = {
  title: "React Developer",
  module: "Hooks & State Management",
  progress: 68,
  duration: "12 min left",
};

export const learningCalendarData = {
  streak: 12,
  nextSession: "Today • 7:00 PM",
};

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