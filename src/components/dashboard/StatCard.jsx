import { TrendingUp } from "lucide-react";

import { Card } from "@/components/ui";
import { cn } from "@/lib/utils";

export default function StatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  trendColor = "text-green-600",
  className,
}) {
  return (
    <Card
      className={cn(
        "flex items-center justify-between p-5",
        className
      )}
    >
      <div className="flex items-center gap-4">

        <div className="rounded-xl bg-neutral-100 p-3">
          <Icon className="h-6 w-6 text-neutral-900" />
        </div>

        <div>

          <p className="text-sm text-neutral-500">
            {title}
          </p>

          <h3 className="mt-1 text-3xl font-bold text-neutral-900">
            {value}
          </h3>

          {subtitle && (
            <p className="mt-1 text-xs text-neutral-400">
              {subtitle}
            </p>
          )}

        </div>

      </div>

      {trend && (
        <div
          className={cn(
            "flex items-center gap-1 text-sm font-medium",
            trendColor
          )}
        >
          <TrendingUp className="h-4 w-4" />
          {trend}
        </div>
      )}
    </Card>
  );
}