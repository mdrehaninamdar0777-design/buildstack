import { Button } from "@/components/ui";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Star } from "lucide-react";
import Image from "next/image";

import {
  heroContent,
  heroButtons,
  heroStats,
  heroAvatars,
} from "./hero.data";

export default function Hero() {
  return (
    <section className="bg-white">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 py-16 lg:grid-cols-2 lg:gap-16 lg:py-20">

        {/* Left Content */}
        <div className="max-w-xl">

          {/* Social Proof Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-neutral-50 px-3.5 py-1.5 text-xs font-semibold text-neutral-800 shadow-sm">
            <span className="flex text-amber-500">
              <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
              <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
              <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
              <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
              <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
            </span>
            <span>{heroContent.badge}</span>
          </div>

          {/* Heading */}
          <h1 className="mt-6 text-4xl font-black leading-tight tracking-tight text-neutral-900 sm:text-5xl lg:text-6xl">
            {heroContent.title}
          </h1>

          {/* Description */}
          <p className="mt-5 text-base leading-7 text-neutral-600 sm:text-lg sm:leading-8">
            {heroContent.description}
          </p>

          {/* CTA Buttons */}
          <div className="mt-8 flex flex-wrap gap-4">
            <Button href={heroButtons.primary.href} className="px-6 py-3 text-sm">
              {heroButtons.primary.label} →
            </Button>

            <Button
              href={heroButtons.secondary.href}
              variant="secondary"
              className="px-6 py-3 text-sm"
            >
              {heroButtons.secondary.label}
            </Button>
          </div>

          {/* Social Proof */}
          <div className="mt-10 flex items-center gap-4">
            <div className="flex -space-x-2.5">
              {heroAvatars.map((avatar) => (
                <div
                  key={avatar.id}
                  className="relative h-10 w-10 overflow-hidden rounded-full border-2 border-white shadow-sm"
                >
                  <Image
                    src={avatar.image}
                    alt="Developer Avatar"
                    fill
                    sizes="40px"
                    className="object-cover"
                    unoptimized
                  />
                </div>
              ))}
            </div>

            <div className="text-xs sm:text-sm">
              <p className="font-semibold text-neutral-900">
                Join {(heroStats.developers / 1000).toFixed(0)}K+ developers
              </p>
              <p className="text-neutral-500">
                who are learning and growing together.
              </p>
            </div>
          </div>

        </div>

        {/* Right Content */}
        <div className="min-w-0 overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-50/50 p-4 shadow-sm sm:p-6">
          <DashboardLayout mode="preview" />
        </div>

      </div>
    </section>
  );
}