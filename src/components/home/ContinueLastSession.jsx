import Link from "next/link";
import { TechIcon } from "@/components/shared";
import { Clock, ArrowRight } from "lucide-react";
import { homeData } from "./home.data";

export default function ContinueLastSession() {
  const { lastSessions } = homeData;

  return (
    <section className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-xs">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-neutral-100 text-neutral-800">
            <Clock className="h-4 w-4" />
          </div>

          <h2 className="text-lg font-bold tracking-tight text-neutral-900">
            Continue From Last Session
          </h2>
        </div>

        <Link
          href="/dashboard"
          className="text-xs font-semibold text-neutral-600 transition hover:text-black"
        >
          View all
        </Link>
      </div>

      <div className="mt-6 divide-y divide-neutral-100">
        {lastSessions.map((session) => (
          <div
            key={session.title}
            className="flex items-center gap-3.5 py-3 first:pt-0 last:pb-0"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-neutral-50 border border-neutral-100 p-1.5 shadow-2xs">
              <TechIcon name={session.icon} className="h-full w-full" />
            </div>

            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-bold text-neutral-900">
                {session.title}
              </p>

              <p className="mt-0.5 truncate text-xs text-neutral-500">
                {session.description}
              </p>
            </div>

            <Link
              href="/learn/skills/react"
              className="inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-neutral-200 px-3.5 py-1.5 text-xs font-semibold text-neutral-900 transition hover:bg-neutral-50"
            >
              <span>Continue</span>
              <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}