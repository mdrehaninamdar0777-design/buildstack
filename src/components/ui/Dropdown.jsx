import { cn } from "@/lib/utils";

export default function Dropdown({
  children,
  className,
}) {
  return (
    <div
      className={cn(
        "absolute right-0 mt-2 min-w-[220px] rounded-xl border border-neutral-200 bg-white p-2 shadow-lg",
        className
      )}
    >
      {children}
    </div>
  );
}