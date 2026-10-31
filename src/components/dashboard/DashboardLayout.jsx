"use client";

import { useMemo } from "react";
import DashboardHeader from "./DashboardHeader";
import StatsSection from "./StatsSection";
import WeeklyActivityCard from "./WeeklyActivityCard";
import AchievementsCard from "./AchievementsCard";
import LearningCalendarCard from "./LearningCalendarCard";
import RoadmapPreviewCard from "./RoadmapPreviewCard";
import SkillProgressCard from "./SkillProgressCard";
import RecentActivityCard from "./RecentActivityCard";

import { useUserProfile } from "@/hooks/useUserProfile";
import { useDashboardData } from "@/hooks/useDashboardData";

import {
  dashboardHeaderData,
  dashboardStats,
  weeklyActivityData,
  weeklyActivitySummary,
  learningCalendarData,
  achievements,
  activeRoadmaps,
  skillProgressData,
  activityFeedData,
  getCurrentWeekDateRange,
  getRealDashboardStats,
  getRealWeeklyActivity,
  getRealWeeklySummary,
  getRealCalendarData,
} from "./dashboard.data";

import { Clock3, BookOpen, Map, Flame } from "lucide-react";

export default function DashboardLayout({ mode = "preview" }) {
  const isPreview = mode === "preview";
  const { firstName, dbProfile } = useUserProfile();

  // ── Directly fetch from GET /api/users/me/dashboard when in full mode ───────
  const {
    dashboard,
    error: dashboardError,
    refreshDashboard,
  } = useDashboardData(!isPreview);

  // ── Personalization ────────────────────────────────────────────────────────
  const realHeaderTitle = useMemo(() => {
    if (isPreview) return dashboardHeaderData.title;
    return firstName ? `Welcome back, ${firstName}!` : "Dashboard";
  }, [isPreview, firstName]);

  const realDateRange = useMemo(() => {
    if (isPreview) return dashboardHeaderData.dateRange;
    return getCurrentWeekDateRange();
  }, [isPreview]);

  // ── Stats from GET /api/users/me/dashboard with fallback to dbProfile ───────
  const stats = useMemo(() => {
    if (isPreview) return dashboardStats;

    if (dashboard?.stats) {
      const hours = dashboard.stats.totalLearningHours || "0.0";
      const skillsCount = dashboard.stats.completedSkillsCount || 0;
      const roadmapsCount = dashboard.stats.activeRoadmapsCount || 0;
      const streak = dashboard.stats.streakDays || 0;

      return [
        {
          id: 1,
          title: "Total Learning Hours",
          value: `${hours} hrs`,
          subtitle: Number(hours) > 0 ? "Logged learning time" : "Start learning to log hours",
          icon: Clock3,
        },
        {
          id: 2,
          title: "Completed Skills",
          value: `${skillsCount}`,
          subtitle: skillsCount > 0 ? "Skills in profile" : "Add skills in your profile",
          icon: BookOpen,
        },
        {
          id: 3,
          title: "Active Roadmaps",
          value: `${roadmapsCount}`,
          subtitle: roadmapsCount > 0 ? "In progress" : "No enrolled roadmaps",
          icon: Map,
        },
        {
          id: 4,
          title: "Current Streak",
          value: `${streak} days`,
          subtitle: streak > 0 ? "Keep the momentum going!" : "Learn today to start a streak",
          icon: Flame,
        },
      ];
    }

    return getRealDashboardStats(dbProfile);
  }, [isPreview, dashboard, dbProfile]);

  const weeklyData = useMemo(() => {
    if (isPreview) return weeklyActivityData;
    if (dashboard?.weeklyActivity && dashboard.weeklyActivity.length > 0) {
      return dashboard.weeklyActivity;
    }
    return getRealWeeklyActivity(dbProfile);
  }, [isPreview, dashboard, dbProfile]);

  const weeklySummary = useMemo(() => {
    if (isPreview) return weeklyActivitySummary;
    return getRealWeeklySummary(weeklyData);
  }, [isPreview, weeklyData]);

  const calendarData = useMemo(() => {
    if (isPreview) return learningCalendarData;
    return getRealCalendarData();
  }, [isPreview]);

  const enrolledRoadmaps = useMemo(() => {
    if (isPreview) return activeRoadmaps;
    if (dashboard?.enrolledRoadmaps) return dashboard.enrolledRoadmaps;
    return dbProfile?.enrolledRoadmaps || [];
  }, [isPreview, dashboard, dbProfile]);

  const userSkills = useMemo(() => {
    if (isPreview) return skillProgressData;
    if (dashboard?.skills) return dashboard.skills;
    return dbProfile?.skills || [];
  }, [isPreview, dashboard, dbProfile]);

  const userAchievements = useMemo(() => {
    if (isPreview) return achievements;
    if (dashboard?.achievements) return dashboard.achievements;
    return dbProfile?.achievements || [];
  }, [isPreview, dashboard, dbProfile]);

  const userRecentActivity = useMemo(() => {
    if (isPreview) return activityFeedData;
    if (dashboard?.recentActivity) return dashboard.recentActivity;
    return dbProfile?.recentActivity || [];
  }, [isPreview, dashboard, dbProfile]);

  return (
    <div className="space-y-8">
      {/* Header */}
      <DashboardHeader
        title={realHeaderTitle}
        description={dashboardHeaderData.description}
        dateRange={realDateRange}
      />

      {/* Non-intrusive backend error banner with retry option */}
      {!isPreview && dashboardError && (
        <div className="flex items-center justify-between rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-xs text-amber-800">
          <span>Backend sync notice: Unable to refresh real-time metrics ({dashboardError}). Showing cached profile data.</span>
          <button
            type="button"
            onClick={refreshDashboard}
            className="ml-3 font-semibold underline hover:text-amber-950"
          >
            Retry
          </button>
        </div>
      )}

      {/* Stats Cards Section */}
      <StatsSection
        stats={stats}
        mode={isPreview ? "preview" : "full"}
      />

      {isPreview ? (
        <WeeklyActivityCard
          data={weeklyData}
          summary={weeklySummary}
          mode="preview"
        />
      ) : (
        <div className="grid grid-cols-12 gap-6">
          {/* Full-width Weekly Learning Activity Chart */}
          <section className="col-span-12">
            <WeeklyActivityCard
              data={weeklyData}
              summary={weeklySummary}
              mode="full"
            />
          </section>

          {/* Row 2: Achievements (6 cols) & Learning Calendar (6 cols) */}
          <section className="col-span-12 lg:col-span-6">
            <AchievementsCard achievements={userAchievements} />
          </section>

          <section className="col-span-12 lg:col-span-6">
            <LearningCalendarCard data={calendarData} />
          </section>

          {/* Row 3: Active Roadmaps (6 cols) & Skill Progress (6 cols) */}
          <section className="col-span-12 lg:col-span-6">
            <RoadmapPreviewCard roadmaps={enrolledRoadmaps} />
          </section>

          <section className="col-span-12 lg:col-span-6">
            <SkillProgressCard skills={userSkills} />
          </section>

          {/* Row 4: Full-width Recent Activity (12 cols) */}
          <section className="col-span-12">
            <RecentActivityCard activities={userRecentActivity} />
          </section>
        </div>
      )}
    </div>
  );
}