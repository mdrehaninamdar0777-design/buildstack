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
    <div className="flex min-h-screen bg-neutral-50">

      <DashboardSidebar />

      <main className="flex-1 overflow-y-auto p-8">

        <DashboardHeader />

        <div className="mt-8 space-y-8">

          <StatsSection />

          <div className="grid grid-cols-12 gap-6">

            {/* Weekly Activity */}
            <section className="col-span-8">
              <WeeklyActivityCard />
            </section>

            {/* Achievements */}
            <section className="col-span-4">
              <AchievementsCard
                achievements={achievements}
              />
            </section>

            {/* Learning Calendar */}
            <section className="col-span-6">
              <LearningCalendarCard />
            </section>

            {/* Active Roadmaps */}
            <section className="col-span-6">
              <RoadmapPreviewCard
                roadmaps={activeRoadmaps}
              />
            </section>

            {/* Skill Progress */}
            <section className="col-span-6">
              <SkillProgressCard
                skills={skillProgressData}
              />
            </section>

            {/* Recent Activity */}
            <section className="col-span-6">
              <RecentActivityCard
                activities={activityFeedData}
              />
            </section>

          </div>

        </div>

      </main>

    </div>
  );
}