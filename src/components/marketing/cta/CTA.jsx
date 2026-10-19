import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { BuildStackIcon } from "@/components/shared";

export default function CTA() {
  return (
    <section className="w-full bg-white px-6 py-16 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col items-center justify-between gap-8 rounded-2xl border border-neutral-200 bg-white px-8 py-8 md:flex-row md:px-10 shadow-sm">

          {/* Left Content */}
          <div className="flex items-center gap-5">
            {/* BuildStack Icon */}
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-neutral-200 bg-neutral-50 shadow-sm">
              <BuildStackIcon size={36} className="text-neutral-900" />
            </div>

            {/* Text */}
            <div>
              <h2 className="text-xl font-bold tracking-tight text-neutral-900 lg:text-2xl">
                Ready to start your developer journey?
              </h2>

              <p className="mt-1 text-sm text-neutral-500 lg:text-base">
                Join thousands of developers learning and building every day.
              </p>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <Link
              href="/signup"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-black px-6 text-sm font-semibold text-white transition-colors duration-200 hover:bg-neutral-800"
            >
              Get Started for Free
              <ArrowRight className="h-4 w-4" />
            </Link>

            <Link
              href="/learn/roadmaps"
              className="inline-flex h-11 items-center justify-center rounded-xl border border-neutral-200 bg-white px-6 text-sm font-semibold text-neutral-900 transition-colors duration-200 hover:bg-neutral-50"
            >
              Explore Roadmaps
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}