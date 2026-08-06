import { cn } from "@/lib/utils";

export default function Tooltip({
  text,
  children,
  className,
}) {
  return (
    <div className="group relative inline-flex">

      {children}

      <div
        className={cn(
          "pointer-events-none absolute left-1/2 top-full z-50 mt-2 -translate-x-1/2 rounded-lg bg-neutral-900 px-3 py-2 text-xs text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100",
          className
        )}
      >
        {text}
      </div>

    </div>
  );
}