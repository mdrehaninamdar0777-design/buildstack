import { Card } from "@/components/ui";

export default function FeatureCard({
  title,
  description,
  icon: Icon,
}) {
  return (
    <Card className="h-full p-6 transition-shadow duration-200 hover:shadow-md">
      <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-neutral-200 bg-white">
        <Icon className="h-6 w-6 text-neutral-900" />
      </div>

      <h3 className="mt-5 text-lg font-semibold text-neutral-900">
        {title}
      </h3>

      <p className="mt-3 text-sm leading-6 text-neutral-500">
        {description}
      </p>
    </Card>
  );
}