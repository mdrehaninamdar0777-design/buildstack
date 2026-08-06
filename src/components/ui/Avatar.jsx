import Image from "next/image";
import { cn } from "@/lib/utils";

export default function Avatar({
  src,
  alt,
  fallback,
  size = "md",
  className,
}) {
  const sizes = {
    sm: "h-8 w-8",
    md: "h-10 w-10",
    lg: "h-12 w-12",
    xl: "h-16 w-16",
  };

  const initials =
    fallback ||
    alt
      ?.split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase();

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-full bg-neutral-200",
        sizes[size],
        className
      )}
    >
      {src ? (
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          sizes="64px"
        />
      ) : (
        <span className="flex h-full w-full items-center justify-center text-sm font-semibold text-neutral-700">
          {initials}
        </span>
      )}
    </div>
  );
}