import {
  ArrowRight,
  Clock3,
} from "lucide-react";

import {
  Button,
  Card,
  ProgressBar,
} from "@/components/ui";

export default function ContinueLearningCard({
  title = "React Developer",
  module = "Hooks & State Management",
  progress = 68,
  duration = "12 min left",
}) {
  return (
    <Card className="p-5">

      <div className="flex items-center justify-between">

        <div>

          <p className="text-sm font-medium text-neutral-500">
            Continue Learning
          </p>

          <h3 className="mt-2 text-xl font-bold text-neutral-900">
            {title}
          </h3>

          <p className="mt-1 text-sm text-neutral-500">
            {module}
          </p>

        </div>

        <div className="rounded-xl bg-neutral-100 p-3">

          <Clock3 className="h-6 w-6 text-neutral-700" />

        </div>

      </div>

      <div className="mt-6">

        <div className="mb-2 flex items-center justify-between">

          <span className="text-sm text-neutral-500">
            Progress
          </span>

          <span className="text-sm font-semibold">
            {progress}%
          </span>

        </div>

        <ProgressBar value={progress} />

      </div>

      <div className="mt-6 flex items-center justify-between">

        <span className="text-sm text-neutral-500">
          {duration}
        </span>

        <Button size="sm">

          Continue

          <ArrowRight className="ml-2 h-4 w-4" />

        </Button>

      </div>

    </Card>
  );
}