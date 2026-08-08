import { Calendar, Download } from "lucide-react";

import { Button } from "@/components/ui";

export default function DashboardHeader({
  title,
  description,
  dateRange,
}) {
  return (
    <header className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-neutral-900">
          {title}
        </h1>

        <p className="mt-2 text-neutral-500">
          {description}
        </p>
      </div>

      <div className="flex items-center gap-3">
        <Button
          variant="secondary"
          className="gap-2"
        >
          <Calendar className="h-4 w-4" />
          {dateRange}
        </Button>

        <Button className="gap-2">
          <Download className="h-4 w-4" />
          Export Report
        </Button>
      </div>
    </header>
  );
}