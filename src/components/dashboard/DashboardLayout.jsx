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
          ? "h-[500px] overflow-hidden space-y-4 origin-top"
          : "mt-8 space-y-8"
      }
    >
      {isPreview ? (
        <>
          <DashboardHeader
            title={dashboardHeaderData.title}
            description={dashboardHeaderData.description}
            dateRange={dashboardHeaderData.dateRange}
          />

          <StatsSection
            stats={dashboardStats}
            mode="preview"
          />

          <WeeklyActivityCard
            data={weeklyActivityData}
            summary={weeklyActivitySummary}
            mode="preview"
          />
        </>
      ) : (
        <>
          <DashboardHeader
            title={dashboardHeaderData.title}
            description={dashboardHeaderData.description}
            dateRange={dashboardHeaderData.dateRange}
          />

          <StatsSection
            stats={dashboardStats}
            mode="full"
          />

          <div className="grid grid-cols-12 gap-6">
            <section className="col-span-8">
              <WeeklyActivityCard
                data={weeklyActivityData}
                summary={weeklyActivitySummary}
                mode="full"
              />
            </section>

            <section className="col-span-4">
              <AchievementsCard achievements={achievements} />
            </section>

            <section className="col-span-6">
              <LearningCalendarCard data={learningCalendarData} />
            </section>

            <section className="col-span-6">
              <RoadmapPreviewCard roadmaps={activeRoadmaps} />
            </section>

            <section className="col-span-6">
              <SkillProgressCard skills={skillProgressData} />
            </section>

            <section className="col-span-6">
              <RecentActivityCard activities={activityFeedData} />
            </section>
          </div>
        </>
      )}
    </div>
  );
}
