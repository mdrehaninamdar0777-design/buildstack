import DashboardSidebar from "./DashboardSidebar";
import DashboardHeader from "./DashboardHeader";

import StatsSection from "./StatsSection";
import WeeklyActivityCard from "./WeeklyActivityCard";
import AchievementsCard from "./AchievementsCard";
import LearningCalendarCard from "./LearningCalendarCard";
import RoadmapPreviewCard from "./RoadmapPreviewCard";
import SkillProgressCard from "./SkillProgressCard";
import RecentActivityCard from "./RecentActivityCard";

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
} from "./dashboard.data";

export default function DashboardLayout({
    mode = "preview",
}) {
    const isPreview = mode === "preview";

    return (
  <div
    className={
      isPreview
        ? "h-[520px] w-[760px] overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-xl"
        : "flex min-h-screen bg-neutral-50"
    }
  >
    <div className="flex h-full w-full">
      <DashboardSidebar mode={mode} />

      <main
        className={
          isPreview
            ? "flex-1 overflow-hidden p-5"
            : "flex-1 overflow-y-auto p-8"
        }
      >
        <DashboardHeader
          title={dashboardHeaderData.title}
          description={dashboardHeaderData.description}
          dateRange={dashboardHeaderData.dateRange}
        />

        <div
          className={
            isPreview
              ? "mt-5 space-y-5"
              : "mt-8 space-y-8"
          }
        >
          <StatsSection
            stats={dashboardStats}
          />

          <div className="grid grid-cols-12 gap-6">
            <section className="col-span-8">
              <WeeklyActivityCard
                data={weeklyActivityData}
                summary={weeklyActivitySummary}
              />
            </section>

            <section className="col-span-4">
              <AchievementsCard
                achievements={achievements}
              />
            </section>

            <section className="col-span-6">
              <LearningCalendarCard
                data={learningCalendarData}
              />
            </section>

            <section className="col-span-6">
              <RoadmapPreviewCard
                roadmaps={activeRoadmaps}
              />
            </section>

            <section className="col-span-6">
              <SkillProgressCard
                skills={skillProgressData}
              />
            </section>

            <section className="col-span-6">
              <RecentActivityCard
                activities={activityFeedData}
              />
            </section>
          </div>
        </div>
      </main>
    </div>
  </div>
);
}