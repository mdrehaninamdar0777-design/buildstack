
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import WelcomeCard from "@/components/dashboard/WelcomeCard";
import ProgressCards from "@/components/dashboard/ProgressCards";
import WeeklyChart from "@/components/dashboard/WeeklyChart";
import RoadmapPreview from "@/components/dashboard/RoadmapPreview";
import ActivityFeed from "@/components/dashboard/ActivityFeed";

export default function DashboardLayout({
    mode = "preview",
}) {
    const isPreview = mode === "preview";
    return (
        <div className="w-full max-w-[720px] rounded-3xl border border-neutral-200 bg-white p-6 shadow-[0_20px_60px_rgba(0,0,0,0.08)]">

            {/* TOP ROW */}
            <div className="grid grid-cols-12 gap-4">

                <aside className="col-span-3">
                    <DashboardSidebar />
                </aside>

                {/* Main */}
                <section
                    className="col-span-9 space-y-4"
                    aria-label="Dashboard content"
                >

                    {/* Welcome */}
                    <WelcomeCard />

                    {/* Stats */}
                    {/* Progress */}
                    <ProgressCards />

                    {/* Placeholder */}
                    <WeeklyChart />
                    <RoadmapPreview />
                    <ActivityFeed />
                </section>
            </div>

        </div>


    );
}