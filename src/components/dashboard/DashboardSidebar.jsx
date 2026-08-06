import {
  LayoutDashboard,
  Map,
  GraduationCap,
  BarChart3,
  Bookmark,
  FileText,
  Settings,
} from "lucide-react";

const navigation = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    active: true,
  },
  {
    label: "Roadmaps",
    icon: Map,
  },
  {
    label: "My Learning",
    icon: GraduationCap,
  },
  {
    label: "Progress",
    icon: BarChart3,
  },
  {
    label: "Bookmarks",
    icon: Bookmark,
  },
  {
    label: "Notes",
    icon: FileText,
  },
];

export default function DashboardSidebar() {
  return (
    <aside className="flex h-full min-h-[520px] flex-col rounded-2xl border border-neutral-200 bg-white p-5">

      <h2 className="text-lg font-bold text-neutral-900">
        BuildStack
      </h2>

      <nav className="mt-8 flex flex-1 flex-col gap-2">

        {navigation.map(({ label, icon: Icon, active }) => (
          <button
            key={label}
            type="button"
            className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors duration-200 ${
              active
                ? "bg-neutral-100 text-neutral-900"
                : "text-neutral-500 hover:bg-neutral-50 hover:text-neutral-900"
            }`}
          >
            <Icon className="h-4 w-4" />

            <span>{label}</span>
          </button>
        ))}

      </nav>

      <button
        type="button"
        className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-neutral-500 transition-colors hover:bg-neutral-50 hover:text-neutral-900"
      >
        <Settings className="h-4 w-4" />

        <span>Settings</span>
      </button>

      <div className="mt-5 flex items-center gap-3 border-t border-neutral-200 pt-5">

        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-black text-sm font-semibold text-white">
          R
        </div>

        <div>

          <p className="text-sm font-semibold text-neutral-900">
            Rehan
          </p>

          <p className="text-xs text-neutral-500">
            @rehan.dev
          </p>

        </div>

      </div>

    </aside>
  );
}