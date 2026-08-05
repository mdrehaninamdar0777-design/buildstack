import Link from "next/link";
import { cn } from "@/lib/utils";

export default function AuthButtons({ variant = "desktop", className }) {
  const isCompact = variant === "compact";

  return (
    <div className={cn("flex items-center gap-3", className)}>
      <Link
        href="/login"
        className={cn(
          "flex h-11 items-center justify-center rounded-lg border border-neutral-300 text-sm font-medium text-neutral-900 transition-colors duration-200 ease-out hover:border-neutral-300 hover:bg-neutral-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2",
          isCompact ? "px-4" : "w-[110px]"
        )}
      >
        Log in
      </Link>
      <Link
        href="/signup"
        className={cn(
          "flex h-11 items-center justify-center rounded-lg bg-neutral-900 text-sm font-medium text-white transition-colors duration-200 ease-out hover:bg-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2",
          isCompact ? "px-4" : "w-[120px]"
        )}
      >
        Sign up
      </Link>
    </div>
  );
}
