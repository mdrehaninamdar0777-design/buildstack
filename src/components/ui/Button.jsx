import Link from "next/link";
import { cn } from "@/lib/utils";

export default function Button({
  children,
  href,
  variant = "primary",
  size = "md",
  type = "button",
  className,
  ...props
}) {
  const classes = cn(
    "inline-flex items-center justify-center rounded-xl font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",

    {
      "bg-black text-white hover:bg-neutral-800":
        variant === "primary",

      "border border-neutral-300 bg-white text-neutral-900 hover:bg-neutral-50":
        variant === "secondary",

      "text-neutral-700 hover:bg-neutral-100":
        variant === "ghost",

      "h-10 px-4 text-sm": size === "sm",

      "h-11 px-6 text-sm": size === "md",

      "h-12 px-8 text-base": size === "lg",
    },

    className
  );

  if (href) {
    return (
      <Link
        href={href}
        className={classes}
        {...props}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={classes}
      {...props}
    >
      {children}
    </button>
  );
}