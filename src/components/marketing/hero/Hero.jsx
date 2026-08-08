import { Button } from "@/components/ui";
import DashboardLayout from "@/components/dashboard/DashboardLayout";

import {
  heroContent,
  heroButtons,
  heroStats,
  heroAvatars,
} from "./hero.data";

export default function Hero() {
  return (
    <section className="bg-white">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 py-20 lg:grid-cols-2 lg:gap-16">

        {/* Left Content */}
        <div className="max-w-xl">

          {/* Badge */}
          <div className="inline-flex items-center rounded-full border border-neutral-200 bg-white px-4 py-2 text-sm font-medium text-neutral-700 shadow-sm">
            🔗 {heroContent.badge}
          </div>

          {/* Heading */}
          <h1 className="mt-8 text-5xl font-black leading-tight tracking-tight text-neutral-900 lg:text-6xl">
            {heroContent.title}
          </h1>

          {/* Description */}
          <p className="mt-6 text-lg leading-8 text-neutral-600">
            {heroContent.description}
          </p>

          {/* CTA Buttons */}
          <div className="mt-10 flex flex-wrap gap-4">

            <Button href={heroButtons.primary.href}>
              {heroButtons.primary.label} →
            </Button>

            <Button
              href={heroButtons.secondary.href}
              variant="secondary"
            >
              {heroButtons.secondary.label}
            </Button>

          </div>

          {/* Social Proof */}
          <div className="mt-10 flex items-center gap-5">

            <div className="flex -space-x-3">
              {heroAvatars.map((avatar) => (
                <img
                  key={avatar.id}
                  src={avatar.image}
                  alt="Developer Avatar"
                  className="h-10 w-10 rounded-full border-2 border-white object-cover"
                />
              ))}
            </div>

            <div>

              <div className="flex items-center gap-2">

                <span className="text-yellow-500">
                  ★★★★★
                </span>

                <span className="font-semibold text-neutral-900">
                  {heroStats.rating}
                </span>

                <span className="text-sm text-neutral-500">
                  ({(heroStats.reviews / 1000).toFixed(1)}k+ reviews)
                </span>

              </div>

              <p className="mt-1 text-sm text-neutral-500">
                Join{" "}
                {(heroStats.developers / 1000).toFixed(0)}
                K+ developers learning together.
              </p>

            </div>

          </div>

        </div>

        {/* Right Content */}
        <div className="min-w-0">
          <DashboardLayout mode="preview" />
        </div>

      </div>
    </section>
  );
}