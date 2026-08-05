"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const LINKS = [
  { label: "Home", href: "/" },
  { label: "Learn", href: "/learn" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function NavLinks({ className, onLinkClick }) {
  const pathname = usePathname();

  return (
    <ul className={cn("flex items-center gap-10", className)}>
      {LINKS.map(({ label, href }) => {
        const isActive = pathname === href;

        return (
          <li key={href}>
            <Link
              href={href}
              onClick={onLinkClick}
              aria-current={isActive ? "page" : undefined}
              className={cn(
                "relative inline-block py-1 text-[15px] font-medium outline-none transition-colors duration-200 ease-out",
                "after:absolute after:-bottom-2 after:left-0 after:h-[2px] after:w-full after:origin-left after:scale-x-0 after:bg-black after:transition-transform after:duration-200 after:ease-out after:content-['']",
                "focus-visible:rounded-sm focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2",
                isActive
                  ? "text-black after:scale-x-100"
                  : "text-neutral-500 hover:text-neutral-900 hover:after:scale-x-100 hover:after:bg-black"
              )}
            >
              {label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
