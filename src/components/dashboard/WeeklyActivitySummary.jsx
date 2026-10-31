import Link from "next/link";
import { TrendingUp } from "lucide-react";

import { Button } from "@/components/ui";
import { cn } from "@/lib/utils";

export default function WeeklyActivitySummary({
  title,
  description,
  actionLabel,
  actionHref = "/learn",
  onAction,
  className,
}) {
  return (
    <div
      className={cn(
        "mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between rounded-2xl bg-neutral-50 p-5",
        className
      )}
    >
      <div className="flex items-center gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-100">
          <TrendingUp className="h-6 w-6 text-blue-600" />
        </div>

        <div>
          <h3 className="font-semibold text-neutral-900">
            {title}
          </h3>

          <p className="mt-1 text-sm text-neutral-500">
            {description}
          </p>
        </div>
      </div>

      {actionLabel && (
        onAction ? (
          <Button
            variant="secondary"
            onClick={onAction}
            className="self-start sm:self-auto"
          >
            {actionLabel}
          </Button>
        ) : (
          <Link href={actionHref} className="self-start sm:self-auto">
            <Button variant="secondary">
              {actionLabel}
            </Button>
          </Link>
        )
      )}
    </div>
  );
}