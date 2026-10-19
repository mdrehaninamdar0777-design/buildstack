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

export default function DashboardLayout({ mode = "preview" }) {
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
          {/* Full-width Weekly Learning Activity Chart */}
          <section className="col-span-12">
            <WeeklyActivityCard
              data={weeklyActivityData}
              summary={weeklyActivitySummary}
              mode="full"
            />
          </section>

          {/* Row 2: Achievements (6 cols) & Learning Calendar (6 cols) */}
          <section className="col-span-12 lg:col-span-6">
            <AchievementsCard achievements={achievements} />
          </section>

          <section className="col-span-12 lg:col-span-6">
            <LearningCalendarCard data={learningCalendarData} />
          </section>

          {/* Row 3: Active Roadmaps (6 cols) & Skill Progress (6 cols) */}
          <section className="col-span-12 lg:col-span-6">
            <RoadmapPreviewCard roadmaps={activeRoadmaps} />
          </section>

          <section className="col-span-12 lg:col-span-6">
            <SkillProgressCard skills={skillProgressData} />
          </section>

          {/* Row 4: Full-width Recent Activity (12 cols) */}
          <section className="col-span-12">
            <RecentActivityCard activities={activityFeedData} />
          </section>
        </div>
      )}
    </div>
  );
}