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

export default function DashboardSidebar({
  mode = "full",
}) {
  const isPreview = mode === "preview";

  return (
    <aside
      className={
        isPreview
          ? "flex w-48 flex-col border-r border-neutral-200 bg-white p-4"
          : "flex w-64 flex-col border-r border-neutral-200 bg-white p-6"
      }
    >
      <h2
        className={
          isPreview
            ? "text-xl font-bold text-neutral-900"
            : "text-2xl font-bold text-neutral-900"
        }
      >
        BuildStack
      </h2>

      <nav
        className={
          isPreview
            ? "mt-6 flex flex-1 flex-col gap-1"
            : "mt-8 flex flex-1 flex-col gap-2"
        }
      >
        {navigation.map(({ label, icon: Icon, active }) => (
          <button
            key={label}
            type="button"
            className={`flex items-center rounded-lg font-medium transition-colors duration-200 ${
              isPreview
                ? "gap-2 px-3 py-2 text-sm"
                : "gap-3 px-3 py-2.5 text-base"
            } ${
              active
                ? "bg-neutral-100 text-neutral-900"
                : "text-neutral-500 hover:bg-neutral-50 hover:text-neutral-900"
            }`}
          >
            <Icon
              className={
                isPreview
                  ? "h-4 w-4"
                  : "h-5 w-5"
              }
            />

            <span>{label}</span>
          </button>
        ))}
      </nav>

      <button
        type="button"
        className={`flex items-center rounded-lg text-neutral-500 transition-colors hover:bg-neutral-50 hover:text-neutral-900 ${
          isPreview
            ? "gap-2 px-3 py-2 text-sm"
            : "gap-3 px-3 py-2.5 text-base"
        }`}
      >
        <Settings
          className={
            isPreview
              ? "h-4 w-4"
              : "h-5 w-5"
          }
        />

        <span>Settings</span>
      </button>

      <div
        className={
          isPreview
            ? "mt-4 flex items-center gap-3 border-t border-neutral-200 pt-4"
            : "mt-6 flex items-center gap-3 border-t border-neutral-200 pt-6"
        }
      >
        <div
          className={
            isPreview
              ? "flex h-10 w-10 items-center justify-center rounded-full bg-black text-sm font-semibold text-white"
              : "flex h-12 w-12 items-center justify-center rounded-full bg-black text-base font-semibold text-white"
          }
        >
          R
        </div>

        <div>
          <p className="font-semibold text-neutral-900">
            Rehan
          </p>

          <p
            className={
              isPreview
                ? "text-xs text-neutral-500"
                : "text-sm text-neutral-500"
            }
          >
            @rehan.dev
          </p>
        </div>
      </div>
    </aside>
  );
}