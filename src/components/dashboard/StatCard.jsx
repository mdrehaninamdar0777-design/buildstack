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
  mode = "full",
}) {
  const isPreview = mode === "preview";

  return (
    <Card
      className={cn(
        "flex items-center",
        isPreview
          ? "min-w-0 gap-2 p-3"
          : "justify-between p-5",
        className
      )}
    >
      {/* Icon */}
      <div
        className={cn(
          "shrink-0 rounded-xl bg-neutral-100",
          isPreview ? "p-2" : "p-3"
        )}
      >
        <Icon
          className={cn(
            "text-neutral-900",
            isPreview ? "h-5 w-5" : "h-6 w-6"
          )}
        />
      </div>

      {/* Content */}
      <div className="min-w-0 flex-1">
        <p
          className={cn(
            "text-neutral-500",
            isPreview
              ? "text-[11px] leading-tight"
              : "text-sm"
          )}
        >
          {title}
        </p>

        <h3
          className={cn(
            "font-bold text-neutral-900",
            isPreview
              ? "mt-1 whitespace-nowrap text-xl"
              : "mt-1 text-3xl"
          )}
        >
          {value}
        </h3>

        {subtitle && (
          <p
            className={cn(
              "text-neutral-400",
              isPreview
                ? "mt-1 whitespace-nowrap text-[9px]"
                : "mt-1 text-xs"
            )}
          >
            {subtitle}
          </p>
        )}
      </div>

      {/* Trend */}
      {trend && (
        <div
          className={cn(
            "flex shrink-0 items-center gap-1 font-medium",
            isPreview ? "text-[10px]" : "text-sm",
            trendColor
          )}
        >
          <TrendingUp
            className={
              isPreview ? "h-3 w-3" : "h-4 w-4"
            }
          />

          {trend}
        </div>
      )}
    </Card>
  );
}