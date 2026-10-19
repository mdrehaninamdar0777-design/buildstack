import Link from "next/link";
import { TechIcon } from "@/components/shared";

export default function TechnologyCard({ technology }) {
  return (
    <Link
      href={`/learn/skills/${technology.id}`}
      className="group flex flex-col items-center rounded-2xl border border-neutral-200 bg-white p-5 text-center transition-all duration-200 hover:-translate-y-0.5 hover:border-neutral-300 hover:shadow-xs"
    >
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-neutral-50 border border-neutral-100 p-2.5 shadow-2xs transition-transform duration-200 group-hover:scale-105">
        <TechIcon name={technology.name} className="h-full w-full" />
      </div>

      <h3 className="mt-3 text-sm font-semibold text-neutral-900 group-hover:text-black">
        {technology.name}
      </h3>

      <span className="mt-2 inline-flex rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium text-neutral-600">
        {technology.difficulty}
      </span>
    </Link>
  );
}