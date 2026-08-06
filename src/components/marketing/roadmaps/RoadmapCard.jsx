import Image from "next/image";
import Link from "next/link";
import { ProgressBar } from "@/components/ui";
import { ProgressBar, Badge, } from "@/components/ui";


export default function RoadmapCard({
  title,
  slug,
  icon,
  progress = 0,
  modules,
  lessons,
  duration,
  level,
  variant = "default",
}) {
  const isCompact = variant === "compact";

  return (
    <article
      className={`group rounded-2xl border border-neutral-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-neutral-300 hover:shadow-lg ${isCompact ? "p-4" : "p-6"
        }`}
    >
      {/* Icon */}
      <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-neutral-100">
        <Image
          src={icon}
          alt={title}
          width={32}
          height={32}
          className="h-8 w-8 object-contain"
        />
      </div>

      {/* Title */}
      <h3
        className={`font-bold text-neutral-900 ${isCompact ? "text-base" : "text-xl"
          }`}
      >
        {title}
      </h3>

      {/* Full Variant */}
      {!isCompact && (
        <>
          <div className="mt-4 flex flex-wrap gap-2">

            <Badge>{level}</Badge>

            <Badge>{modules} Modules</Badge>

            <Badge>{lessons} Lessons</Badge>

            <Badge>{duration}</Badge>

          </div>
        </>
      )}

      {/* Progress */}
      <div className="mt-6">

        <div className="mb-2 flex items-center justify-between">

          <span className="text-sm text-neutral-500">
            Progress
          </span>

          <span className="text-sm font-semibold text-neutral-900">
            {progress}%
          </span>

        </div>

        <ProgressBar value={progress} />

      </div>

      {/* Button */}
      {!isCompact && (
        <Link
          href={`/roadmaps/${slug}`}
          className="mt-6 flex h-11 items-center justify-center rounded-xl bg-black text-sm font-semibold text-white transition-colors duration-200 hover:bg-neutral-800"
        >
          Continue Learning
        </Link>
      )}
    </article>
  );
}