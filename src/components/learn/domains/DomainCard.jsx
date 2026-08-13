import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function DomainCard({ domain }) {
  const Icon = domain.icon;

  return (
    <Link
      href={`/learn/domains/${domain.id}`}
      className="group flex min-h-[190px] flex-col rounded-2xl border border-neutral-200 bg-white p-6 transition hover:-translate-y-0.5 hover:border-neutral-300 hover:shadow-sm"
    >
      {/* Icon */}
      <div
        className={`flex h-14 w-14 items-center justify-center rounded-xl ${domain.iconClassName}`}
      >
        <Icon className="h-7 w-7 text-white" />
      </div>

      {/* Content */}
      <div className="mt-5">
        <h3 className="text-base font-semibold text-neutral-900">
          {domain.title}
        </h3>

        <p className="mt-2 max-w-[230px] text-sm leading-5 text-neutral-500">
          {domain.description}
        </p>
      </div>

      {/* Bottom */}
      <div className="mt-auto flex items-center justify-between pt-6">
        <span className="text-xs font-medium text-neutral-600">
          {domain.technologies} Technologies
        </span>

        <span className="flex h-8 w-8 items-center justify-center rounded-full border border-neutral-200 transition group-hover:border-neutral-400">
          <ArrowRight className="h-4 w-4 text-neutral-700" />
        </span>
      </div>
    </Link>
  );
}