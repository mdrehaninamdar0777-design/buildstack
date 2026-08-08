import FeatureCard from "./FeatureCard";
import { features } from "./features.data";

export default function Features() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-6">

        {/* Section Heading */}
        <div className="mx-auto max-w-2xl text-center">

          <p className="text-xs font-medium uppercase tracking-wider text-neutral-500">
            Features
          </p>

          <h2 className="mt-3 text-3xl font-bold tracking-tight text-neutral-900 md:text-4xl">
            Everything You Need to Learn Efficiently
          </h2>

          <p className="mt-4 text-base leading-7 text-neutral-500">
            Powerful features to make your learning journey smooth and
            effective.
          </p>

        </div>

        {/* Feature Grid */}
        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">

          {features.map((feature) => (
            <FeatureCard
              key={feature.title}
              {...feature}
            />
          ))}

        </div>

      </div>
    </section>
  );
}