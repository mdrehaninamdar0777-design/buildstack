import { Lightbulb } from "lucide-react";

export default function SkillComingSoon() {
  return (
    <div className="mt-4 rounded-2xl border border-neutral-200 bg-white p-5">
      <div className="flex items-start gap-3">
        <Lightbulb className="h-5 w-5 shrink-0 text-neutral-700" />

        <div>
          <h3 className="font-semibold text-neutral-900">
            More coming soon!
          </h3>

          <p className="mt-1 text-sm text-neutral-500">
            We&apos;re working on something exciting for quizzes and
            practice. Stay tuned!
          </p>
        </div>
      </div>
    </div>
  );
}