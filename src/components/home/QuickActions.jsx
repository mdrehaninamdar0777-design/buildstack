import Link from "next/link";
import {
  Map,
  Sparkles,
  FileText,
  HelpCircle,
  ChevronRight,
  Zap,
} from "lucide-react";
import { homeData } from "./home.data";

const ACTION_ICONS = {
  Roadmaps: Map,
  Skills: Sparkles,
  Notes: FileText,
  Quiz: HelpCircle,
};

export default function QuickActions() {
  const { quickActions } = homeData;

  return (
    <section className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-xs">
      <div className="flex items-center gap-2.5">
        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-50 text-amber-600">
          <Zap className="h-4 w-4 fill-amber-500 text-amber-500" />
        </div>

        <h2 className="text-lg font-bold tracking-tight text-neutral-900">
          Quick Actions
        </h2>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {quickActions.map((action) => {
          const Icon = ACTION_ICONS[action.icon] || Map;

          return (
            <Link
              key={action.title}
              href={action.href || "/learn"}
              className="group flex items-center gap-3.5 rounded-xl border border-neutral-200 bg-white p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-neutral-400 hover:bg-neutral-50/60 hover:shadow-2xs"
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-neutral-100 text-neutral-800 transition-colors duration-200 group-hover:bg-neutral-900 group-hover:text-white">
                <Icon className="h-5 w-5" strokeWidth={1.8} />
              </div>

              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-bold text-neutral-900">
                  {action.title}
                </p>

                <p className="mt-0.5 truncate text-xs text-neutral-500">
                  {action.description}
                </p>
              </div>

              <ChevronRight className="h-4 w-4 shrink-0 text-neutral-400 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-neutral-900" />
            </Link>
          );
        })}
      </div>
    </section>
  );
}