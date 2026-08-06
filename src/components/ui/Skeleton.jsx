import { cn } from "@/lib/utils";

export default function Skeleton({
  className,
}) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-xl bg-neutral-200",
        className
      )}
    />
  );
}