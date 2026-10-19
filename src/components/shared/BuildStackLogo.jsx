import React from "react";
import Link from "next/link";

export function BuildStackIcon({ size = 28, className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 ${className}`}
      aria-hidden="true"
    >
      {/* Top Diamond / Rhombus Tile */}
      <path
        d="M50 12 L86 31 L50 50 L14 31 Z"
        fill="currentColor"
      />
      {/* Middle Chevron Shelf */}
      <path
        d="M14 45 L50 64 L86 45 L86 54 L50 73 L14 54 Z"
        fill="currentColor"
      />
      {/* Bottom Chevron Shelf */}
      <path
        d="M14 68 L50 87 L86 68 L86 77 L50 96 L14 77 Z"
        fill="currentColor"
      />
    </svg>
  );
}

export default function BuildStackLogo({
  href = "/",
  size = 28,
  showText = true,
  className = "",
  textClassName = "",
}) {
  const content = (
    <span className={`inline-flex items-center gap-2.5 font-bold tracking-tight text-neutral-900 ${className}`}>
      <BuildStackIcon size={size} className="text-neutral-900" />
      {showText && (
        <span className={`text-xl font-bold tracking-tight text-neutral-900 ${textClassName}`}>
          BuildStack
        </span>
      )}
    </span>
  );

  if (href) {
    return (
      <Link href={href} className="inline-flex items-center transition-opacity hover:opacity-90">
        {content}
      </Link>
    );
  }

  return content;
}
