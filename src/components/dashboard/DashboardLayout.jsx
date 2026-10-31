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

export default function DashboardLayout({ mode = "preview" }) {
  const isPreview = mode === "preview";
  const { firstName, dbProfile } = useUserProfile();

  // ── Real Data computation for authenticated full mode ─────────────────────
  const realHeaderTitle = useMemo(() => {
    if (isPreview) return dashboardHeaderData.title;
    return firstName ? `Welcome back, ${firstName}!` : "Dashboard";
  }, [isPreview, firstName]);

  const realDateRange = useMemo(() => {
    if (isPreview) return dashboardHeaderData.dateRange;
    return getCurrentWeekDateRange();
  }, [isPreview]);

  const stats = useMemo(() => {
    if (isPreview) return dashboardStats;
    return getRealDashboardStats(dbProfile);
  }, [isPreview, dbProfile]);

  const weeklyData = useMemo(() => {
    if (isPreview) return weeklyActivityData;
    return getRealWeeklyActivity(dbProfile);
  }, [isPreview, dbProfile]);

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
    return dbProfile?.enrolledRoadmaps || [];
  }, [isPreview, dbProfile?.enrolledRoadmaps]);

  const userSkills = useMemo(() => {
    if (isPreview) return skillProgressData;
    return dbProfile?.skills || [];
  }, [isPreview, dbProfile?.skills]);

  const userAchievements = useMemo(() => {
    if (isPreview) return achievements;
    return dbProfile?.achievements || [];
  }, [isPreview, dbProfile?.achievements]);

  const userRecentActivity = useMemo(() => {
    if (isPreview) return activityFeedData;
    return dbProfile?.recentActivity || [];
  }, [isPreview, dbProfile?.recentActivity]);

  return (
    <div className="space-y-8">
      <DashboardHeader
        title={realHeaderTitle}
        description={dashboardHeaderData.description}
        dateRange={realDateRange}
      />

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