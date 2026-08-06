import { cn } from "@/lib/utils";

export default function Badge({
  children,
  variant = "default",
  className,
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium",

        {
          "bg-neutral-100 text-neutral-700":
            variant === "default",

          "bg-green-100 text-green-700":
            variant === "success",

          "bg-yellow-100 text-yellow-700":
            variant === "warning",

          "bg-red-100 text-red-700":
            variant === "danger",

          "bg-blue-100 text-blue-700":
            variant === "info",

          "bg-black text-white":
            variant === "primary",
        },

        className
      )}
    >
      {children}
    </span>
  );
}