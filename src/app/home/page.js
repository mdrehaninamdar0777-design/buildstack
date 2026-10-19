import HomeHeader from "@/components/home/HomeHeader";
import ContinueLearning from "@/components/home/ContinueLearning";
import TodaysGoal from "@/components/home/TodaysGoal";
import RecommendedRoadmaps from "@/components/home/RecommendedRoadmaps";
import RecommendedSkills from "@/components/home/RecommendedSkills";
import ContinueLastSession from "@/components/home/ContinueLastSession";
import QuickActions from "@/components/home/QuickActions";
import AppNavbar from "@/components/layout/AppNavbar";

export default function HomePage() {
    return (
        <main className="min-h-screen bg-white">
            <AppNavbar />

            <div className="mx-auto max-w-[1400px] px-6 py-8 lg:px-10">

                {/* Home page content */}
                {/* Welcome */}
                <HomeHeader />

                {/* Continue Learning */}
                <div className="mt-7">
                    <ContinueLearning />
                </div>

                {/* Goal + Roadmaps */}
                <div className="mt-5 grid gap-5 lg:grid-cols-[0.85fr_1.15fr]">
                    <TodaysGoal />
                    <RecommendedRoadmaps />
                </div>

                {/* Skills + Last Session */}
                <div className="mt-5 grid gap-5 lg:grid-cols-2">
                    <RecommendedSkills />
                    <ContinueLastSession />
                </div>

                {/* Quick Actions */}
                <div className="mt-5">
                    <QuickActions />
                </div>

            </div>
        </main>
    );
}