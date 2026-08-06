import { cn } from "@/lib/utils";

export default function Card({
  children,
  variant = "default",
  className,
  as: Component = "div",
  ...props
}) {
  return (
    <Component
      className={cn(
        "rounded-2xl bg-white",

        {
          "border border-neutral-200":
            variant === "default",

          "border border-neutral-200 shadow-lg":
            variant === "elevated",

          "shadow-md":
            variant === "shadow",

          "border border-dashed border-neutral-300":
            variant === "dashed",

          "border-0":
            variant === "ghost",
        },

        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}