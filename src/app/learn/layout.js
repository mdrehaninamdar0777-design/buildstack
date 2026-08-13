import AppNavbar from "@/components/layout/AppNavbar";
import LearnSidebar from "@/components/learn/LearnSidebar";

export default function LearnLayout({ children }) {
  return (
    <div className="min-h-screen bg-white text-neutral-900">
      <AppNavbar />

      <div className="flex min-h-[calc(100vh-80px)]">
        <aside className="hidden w-[280px] shrink-0 border-r border-neutral-200 bg-white lg:block">
          <LearnSidebar />
        </aside>

        <main className="min-w-0 flex-1 bg-white">
          {children}
        </main>
      </div>
    </div>
  );
}