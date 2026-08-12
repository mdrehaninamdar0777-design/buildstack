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
    <div className="space-y-8">
      <DashboardHeader
        title={dashboardHeaderData.title}
        description={dashboardHeaderData.description}
        dateRange={dashboardHeaderData.dateRange}
      />

      <StatsSection
        stats={dashboardStats}
        mode={isPreview ? "preview" : "full"}
      />

      {isPreview ? (
        <WeeklyActivityCard
          data={weeklyActivityData}
          summary={weeklyActivitySummary}
          mode="preview"
        />
      ) : (
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
      )}
    </div>
  );
}