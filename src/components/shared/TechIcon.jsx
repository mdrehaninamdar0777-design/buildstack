"use client";

import React from "react";
import {
  Code2,
  Database,
  Terminal,
  Cpu,
  Globe,
  Server,
  Cloud,
  Infinity as InfinityIcon,
  Sparkles,
  Layers,
  FileText,
  HelpCircle,
  ShieldCheck,
  Smartphone,
  Gamepad2,
  Box,
  Palette,
  BarChart3,
  Flame,
  Radio,
  Lock,
} from "lucide-react";

/**
 * High-quality SVG technology logos and domain symbols
 * for the BuildStack learning platform.
 */
export function TechIcon({ name, className = "h-5 w-5", size }) {
  if (!name) {
    return <Code2 className={className} size={size} />;
  }

  const normalized = String(name).trim().toLowerCase();

  // Explicit dimensions style if size is provided
  const style = size ? { width: size, height: size } : undefined;

  switch (normalized) {
    // React
    case "react":
    case "react.js":
    case "reactjs":
      return (
        <svg
          viewBox="-11.5 -10.23174 23 20.46348"
          className={className}
          style={style}
          role="img"
          aria-label="React"
        >
          <circle cx="0" cy="0" r="2.05" fill="#61DAFB" />
          <g stroke="#61DAFB" strokeWidth="1" fill="none">
            <ellipse rx="11" ry="4.2" />
            <ellipse rx="11" ry="4.2" transform="rotate(60)" />
            <ellipse rx="11" ry="4.2" transform="rotate(120)" />
          </g>
        </svg>
      );

    // JavaScript
    case "javascript":
    case "js":
      return (
        <svg
          viewBox="0 0 64 64"
          className={className}
          style={style}
          role="img"
          aria-label="JavaScript"
        >
          <rect width="64" height="64" rx="10" fill="#F7DF1E" />
          <path
            d="M18 47c2.8 1.8 5.6 2.8 8.8 2.8 4.8 0 8-2.4 8-8.2V19h-7.6v22.6c0 2.2-1.1 3.2-2.7 3.2-1.3 0-2.4-.6-3.8-1.7L18 47zm23.6 0c3.2 1.8 7 2.8 10.7 2.8 7 0 11.2-3.8 11.2-9.2 0-5.4-4-7.8-9.1-9.8-3.4-1.3-5.3-2.4-5.3-4.3 0-1.6 1.3-2.7 3.8-2.7 2.4 0 4.5.9 6.2 2l2.7-4.8c-2.4-1.6-5.4-2.4-8.8-2.4-6.4 0-10.7 3.8-10.7 8.6 0 5.2 3.8 7.6 8.6 9.5 3.8 1.5 5.9 2.6 5.9 4.9 0 2-1.6 3.3-4.3 3.3-3 0-5.6-1.1-7.5-2.7l-2.7 4.8z"
            fill="#000000"
          />
        </svg>
      );

    // TypeScript
    case "typescript":
    case "ts":
      return (
        <svg
          viewBox="0 0 64 64"
          className={className}
          style={style}
          role="img"
          aria-label="TypeScript"
        >
          <rect width="64" height="64" rx="10" fill="#3178C6" />
          <path
            d="M13 25h18v5.5H24.5V49H18.5V30.5H13V25zm22.5 13.8c2.8 1.6 5.8 2.5 8.9 2.5 3.3 0 5.1-1.3 5.1-3.2 0-2-1.8-2.9-4.9-4-4.5-1.6-8.1-3.7-8.1-8.5 0-4.8 3.8-8.1 9.8-8.1 3.5 0 6.6.9 9 2.4l-2.4 4.8c-2-1.2-4.3-1.9-6.6-1.9-2.8 0-4.2 1.2-4.2 2.8 0 1.8 1.7 2.6 4.7 3.7 4.8 1.8 8.3 3.9 8.3 8.8 0 5.2-4 8.5-10.8 8.5-4 0-7.6-1.1-10.2-2.9l2.4-4.9z"
            fill="#FFFFFF"
          />
        </svg>
      );

    // Node.js
    case "node":
    case "node.js":
    case "nodejs":
      return (
        <svg
          viewBox="0 0 64 64"
          className={className}
          style={style}
          role="img"
          aria-label="Node.js"
        >
          <polygon
            points="32,4 58,19 58,49 32,64 6,49 6,19"
            fill="#5FA04E"
          />
          <path
            d="M32 15l16 9.2v18.4L32 52 16 42.6V24.2L32 15z"
            fill="#3E7B35"
          />
          <text
            x="32"
            y="39"
            textAnchor="middle"
            fontFamily="system-ui, -apple-system, sans-serif"
            fontSize="15"
            fontWeight="800"
            fill="#FFFFFF"
          >
            JS
          </text>
        </svg>
      );

    // Next.js
    case "next":
    case "next.js":
    case "nextjs":
      return (
        <svg
          viewBox="0 0 180 180"
          className={className}
          style={style}
          role="img"
          aria-label="Next.js"
        >
          <circle cx="90" cy="90" r="90" fill="#000000" />
          <path
            d="M149.5 149.5L78.8 56.4H56.4V123.6H69.9V73.5L134.4 157.9c4.9-2.5 9.7-5.3 14.1-8.4z"
            fill="#FFFFFF"
          />
          <path
            d="M110.1 56.4H123.6V123.6H110.1z"
            fill="#FFFFFF"
          />
        </svg>
      );

    // HTML / HTML5
    case "html":
    case "html5":
      return (
        <svg
          viewBox="0 0 64 64"
          className={className}
          style={style}
          role="img"
          aria-label="HTML5"
        >
          <path d="M10 6l4.5 45.5L32 57l17.5-5.5L54 6H10z" fill="#E34F26" />
          <path d="M32 10.5v42.5l14-4.4L49.2 10.5H32z" fill="#EF652A" />
          <path
            d="M20.5 18h23l-.7 7.5H28.4l.6 6.5h14.5l-1.5 15-10 2.8-10-2.8-.7-7.5h6.5l.3 3.5 3.9 1 3.9-1 .6-6.5H20l-.5-8.5z"
            fill="#FFFFFF"
          />
        </svg>
      );

    // CSS / CSS3
    case "css":
    case "css3":
      return (
        <svg
          viewBox="0 0 64 64"
          className={className}
          style={style}
          role="img"
          aria-label="CSS3"
        >
          <path d="M10 6l4.5 45.5L32 57l17.5-5.5L54 6H10z" fill="#1572B6" />
          <path d="M32 10.5v42.5l14-4.4L49.2 10.5H32z" fill="#33A9DC" />
          <path
            d="M20.5 18h23l-.7 7.5H28.4l.6 6.5h14.5l-1.5 15-10 2.8-10-2.8-.7-7.5h6.5l.3 3.5 3.9 1 3.9-1 .6-6.5H20l-.5-8.5z"
            fill="#FFFFFF"
          />
        </svg>
      );

    // Docker
    case "docker":
      return (
        <svg
          viewBox="0 0 64 64"
          className={className}
          style={style}
          role="img"
          aria-label="Docker"
        >
          <path
            d="M59.4 29.5c-.8-.6-2.6-.7-4.1-.2-.5-2.8-2.6-4.9-5.3-5.2-.4 0-.9 0-1.3.1-1.3-4.7-5.5-8.1-10.6-8.1v.9c0 1.9-.9 3.6-2.4 4.7H13.6c-1.3 0-2.5.4-3.5 1.1-6.1 4.3-5.9 13.9-4.7 18.2 2.7 9.8 11.6 15 22.6 15 17.5 0 27.7-10.7 28.5-22.3.8-.4 2.1-1.4 2.9-4.2zM21 21.6h5.2v4.8H21v-4.8zm6.5 0h5.2v4.8h-5.2v-4.8zm-13 6h5.2v4.8h-5.2v-4.8zm6.5 0h5.2v4.8H21v-4.8zm6.5 0h5.2v4.8h-5.2v-4.8zm6.5 0h5.2v4.8H34v-4.8zm-13 6h5.2v4.8H21v-4.8zm6.5 0h5.2v4.8h-5.2v-4.8zm6.5 0h5.2v4.8H34v-4.8zm6.5 0h5.2v4.8h-5.2v-4.8z"
            fill="#2496ED"
          />
        </svg>
      );

    // MongoDB
    case "mongodb":
    case "mongodb-db":
      return (
        <svg
          viewBox="0 0 64 64"
          className={className}
          style={style}
          role="img"
          aria-label="MongoDB"
        >
          <path
            d="M32 6c-1.5 5.5-9 15.5-9 26 0 11.5 8 18.5 9 26 1-7.5 9-14.5 9-26 0-10.5-7.5-20.5-9-26z"
            fill="#47A248"
          />
          <path
            d="M32 6v52c1-7.5 9-14.5 9-26 0-10.5-7.5-20.5-9-26z"
            fill="#499D4A"
          />
          <path
            d="M32 56c-.5 0-1-.5-1-1v-8c0-.6.4-1 1-1s1 .4 1 1v8c0 .5-.5 1-1 1z"
            fill="#FFFFFF"
          />
        </svg>
      );

    // Python
    case "python":
    case "py":
      return (
        <svg
          viewBox="0 0 64 64"
          className={className}
          style={style}
          role="img"
          aria-label="Python"
        >
          <path
            d="M31.8 6c-8.2 0-13.8 3.6-13.8 10.5v5.5h14v2H18.2C10.5 24 5 28.5 5 36.2s5.5 12.8 13.2 12.8h4.5v-6.2c0-5 4.2-9 9.2-9h14v-2c0-8.2-6.5-15.8-14.1-15.8zM24 12a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5z"
            fill="#3776AB"
          />
          <path
            d="M32.2 58c8.2 0 13.8-3.6 13.8-10.5v-5.5h-14v-2h13.8C53.5 40 59 35.5 59 27.8s-5.5-12.8-13.2-12.8h-4.5v6.2c0 5-4.2 9-9.2 9h-14v2C18.1 40.4 24.6 48 32.2 48zm7.8-6a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z"
            fill="#FFD438"
          />
        </svg>
      );

    // Git / GitHub
    case "git":
    case "git & github":
      return (
        <svg
          viewBox="0 0 64 64"
          className={className}
          style={style}
          role="img"
          aria-label="Git"
        >
          <path
            d="M60.4 28.7L35.3 3.6c-1.8-1.8-4.8-1.8-6.6 0L22 10.3l8.4 8.4c1.9-.6 4.2-.2 5.7 1.3 1.6 1.6 2 3.9 1.3 5.8l8.1 8.1c1.9-.7 4.2-.3 5.8 1.3 2.3 2.3 2.3 6 0 8.3-2.3 2.3-6 2.3-8.3 0-1.7-1.7-2.1-4.2-1.2-6.3L34.1 29.5v13.8c.6.3 1.2.7 1.7 1.2 2.3 2.3 2.3 6 0 8.3-2.3 2.3-6 2.3-8.3 0-2.3-2.3-2.3-6 0-8.3.6-.6 1.3-1 2.1-1.3V29.1c-.8-.3-1.5-.7-2.1-1.3-1.7-1.7-2.1-4.2-1.2-6.3L17.8 13.2 3.6 27.4c-1.8 1.8-1.8 4.8 0 6.6l25.1 25.1c1.8 1.8 4.8 1.8 6.6 0l25.1-25.1c1.8-1.8 1.8-4.8 0-6.6z"
            fill="#F05032"
          />
        </svg>
      );

    case "github":
      return (
        <svg
          viewBox="0 0 64 64"
          className={className}
          style={style}
          role="img"
          aria-label="GitHub"
        >
          <path
            d="M32 6C17.6 6 6 17.6 6 32c0 11.5 7.5 21.3 17.8 24.7 1.3.2 1.8-.6 1.8-1.3v-4.5c-7.2 1.6-8.7-3.5-8.7-3.5-1.2-3-2.9-3.8-2.9-3.8-2.4-1.6.2-1.6.2-1.6 2.6.2 4 2.7 4 2.7 2.3 4 6.1 2.8 7.6 2.2.2-1.7.9-2.8 1.7-3.5-5.8-.7-11.8-2.9-11.8-12.8 0-2.8 1-5.1 2.7-6.9-.3-.7-1.2-3.3.3-6.8 0 0 2.2-.7 7.1 2.6 2.1-.6 4.3-.9 6.5-.9s4.4.3 6.5.9c4.9-3.3 7.1-2.6 7.1-2.6 1.5 3.5.6 6.1.3 6.8 1.7 1.8 2.7 4.1 2.7 6.9 0 10-6.1 12.1-11.9 12.8 1 1 1.8 2.6 1.8 5.3v7.9c0 .7.5 1.5 1.8 1.3C50.5 53.3 58 43.5 58 32 58 17.6 46.4 6 32 6z"
            fill="#181717"
          />
        </svg>
      );

    // Express.js
    case "express":
    case "expressjs":
    case "express.js":
      return (
        <svg
          viewBox="0 0 64 64"
          className={className}
          style={style}
          role="img"
          aria-label="Express.js"
        >
          <rect width="64" height="64" rx="10" fill="#18181B" />
          <text
            x="32"
            y="42"
            textAnchor="middle"
            fontFamily="system-ui, -apple-system, sans-serif"
            fontSize="26"
            fontWeight="800"
            fill="#FFFFFF"
          >
            ex
          </text>
        </svg>
      );

    // SQL / Databases
    case "sql":
    case "database":
      return (
        <svg
          viewBox="0 0 64 64"
          className={className}
          style={style}
          role="img"
          aria-label="SQL"
        >
          <rect width="64" height="64" rx="10" fill="#336791" />
          <text
            x="32"
            y="42"
            textAnchor="middle"
            fontFamily="system-ui, -apple-system, sans-serif"
            fontSize="22"
            fontWeight="800"
            fill="#FFFFFF"
          >
            SQL
          </text>
        </svg>
      );

    // PostgreSQL
    case "postgresql":
    case "postgres":
      return (
        <svg
          viewBox="0 0 64 64"
          className={className}
          style={style}
          role="img"
          aria-label="PostgreSQL"
        >
          <rect width="64" height="64" rx="10" fill="#336791" />
          <text
            x="32"
            y="43"
            textAnchor="middle"
            fontFamily="system-ui, -apple-system, sans-serif"
            fontSize="24"
            fontWeight="800"
            fill="#FFFFFF"
          >
            PG
          </text>
        </svg>
      );

    // MySQL
    case "mysql":
      return (
        <svg
          viewBox="0 0 64 64"
          className={className}
          style={style}
          role="img"
          aria-label="MySQL"
        >
          <rect width="64" height="64" rx="10" fill="#00758F" />
          <text
            x="32"
            y="42"
            textAnchor="middle"
            fontFamily="system-ui, -apple-system, sans-serif"
            fontSize="18"
            fontWeight="800"
            fill="#FFFFFF"
          >
            MySQL
          </text>
        </svg>
      );

    // SQLite
    case "sqlite":
      return (
        <svg
          viewBox="0 0 64 64"
          className={className}
          style={style}
          role="img"
          aria-label="SQLite"
        >
          <rect width="64" height="64" rx="10" fill="#003B57" />
          <text
            x="32"
            y="42"
            textAnchor="middle"
            fontFamily="system-ui, -apple-system, sans-serif"
            fontSize="16"
            fontWeight="800"
            fill="#0097DA"
          >
            SQLite
          </text>
        </svg>
      );

    // Redis
    case "redis":
      return (
        <svg
          viewBox="0 0 64 64"
          className={className}
          style={style}
          role="img"
          aria-label="Redis"
        >
          <rect width="64" height="64" rx="10" fill="#DC382D" />
          <path
            d="M16 28l16-8 16 8-16 8-16-8zm0 8l16 8 16-8v6l-16 8-16-8v-6z"
            fill="#FFFFFF"
          />
        </svg>
      );

    // Firebase
    case "firebase":
      return (
        <svg
          viewBox="0 0 64 64"
          className={className}
          style={style}
          role="img"
          aria-label="Firebase"
        >
          <path
            d="M14 47.5L25 15.2c.4-1.2 2.1-1.2 2.5 0l7 21.3-20.5 11z"
            fill="#FFA000"
          />
          <path
            d="M37.8 28.5L34.5 20c-.5-1.2-2.2-1.2-2.7 0L14 47.5l23.8-19z"
            fill="#F57C00"
          />
          <path
            d="M32 58l18-10.5L44 10.5c-.5-1.3-2.4-1.3-2.9 0L14 47.5 32 58z"
            fill="#FFCA28"
          />
        </svg>
      );

    // AWS
    case "aws":
      return (
        <svg
          viewBox="0 0 64 64"
          className={className}
          style={style}
          role="img"
          aria-label="AWS"
        >
          <rect width="64" height="64" rx="10" fill="#232F3E" />
          <text
            x="32"
            y="35"
            textAnchor="middle"
            fontFamily="system-ui, -apple-system, sans-serif"
            fontSize="18"
            fontWeight="800"
            fill="#FF9900"
          >
            aws
          </text>
          <path
            d="M18 43c9 4 19 4 28 0"
            stroke="#FF9900"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
          />
        </svg>
      );

    // Kubernetes
    case "kubernetes":
    case "k8s":
      return (
        <svg
          viewBox="0 0 64 64"
          className={className}
          style={style}
          role="img"
          aria-label="Kubernetes"
        >
          <rect width="64" height="64" rx="10" fill="#326CE5" />
          <circle cx="32" cy="32" r="14" fill="none" stroke="#FFFFFF" strokeWidth="4" />
          <circle cx="32" cy="32" r="5" fill="#FFFFFF" />
        </svg>
      );

    // Android
    case "android":
      return (
        <svg
          viewBox="0 0 64 64"
          className={className}
          style={style}
          role="img"
          aria-label="Android"
        >
          <path
            d="M17 29h30c0-8.3-6.7-15-15-15s-15 6.7-15 15zm8-6a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm14 0a2 2 0 1 1 0-4 2 2 0 0 1 0 4zM16 32v18h6v8h5v-8h10v8h5v-8h6V32H16z"
            fill="#3DDC84"
          />
          <path d="M21 16l-4-7m26 7l4-7" stroke="#3DDC84" strokeWidth="3" strokeLinecap="round" />
        </svg>
      );

    // Kotlin
    case "kotlin":
      return (
        <svg
          viewBox="0 0 64 64"
          className={className}
          style={style}
          role="img"
          aria-label="Kotlin"
        >
          <rect width="64" height="64" rx="10" fill="#7F52FF" />
          <polygon points="12,12 52,12 32,32 52,52 12,52" fill="#FFFFFF" />
        </svg>
      );

    // Java
    case "java":
      return (
        <svg
          viewBox="0 0 64 64"
          className={className}
          style={style}
          role="img"
          aria-label="Java"
        >
          <rect width="64" height="64" rx="10" fill="#EA2D2E" />
          <path
            d="M20 44c8 2 16 2 24 0M22 48c6 1.5 14 1.5 20 0M30 18c2 4-4 8 0 12M35 16c2 4-4 8 0 12"
            stroke="#FFFFFF"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
          />
        </svg>
      );

    // REST APIs / API
    case "rest-apis":
    case "rest apis":
    case "api":
    case "apis":
      return (
        <div
          className={`flex items-center justify-center rounded-xl bg-blue-600 text-white font-extrabold text-xs ${className}`}
          style={style}
        >
          API
        </div>
      );

    // Authentication
    case "authentication":
    case "auth":
      return (
        <div
          className={`flex items-center justify-center rounded-xl bg-emerald-600 text-white ${className}`}
          style={style}
        >
          <Lock className="h-4 w-4" />
        </div>
      );

    // Snowflake
    case "snowflake":
      return (
        <div
          className={`flex items-center justify-center rounded-xl bg-cyan-500 text-white font-extrabold text-sm ${className}`}
          style={style}
        >
          ❄
        </div>
      );

    // dbt
    case "dbt":
      return (
        <div
          className={`flex items-center justify-center rounded-xl bg-orange-600 text-white font-extrabold text-xs ${className}`}
          style={style}
        >
          dbt
        </div>
      );

    // DevOps
    case "devops":
      return (
        <div
          className={`flex items-center justify-center rounded-xl bg-blue-600 text-white ${className}`}
          style={style}
        >
          <InfinityIcon className="h-5 w-5" />
        </div>
      );

    // AI
    case "ai":
    case "artificial-intelligence":
    case "machine-learning":
    case "machine learning":
      return (
        <div
          className={`flex items-center justify-center rounded-xl bg-purple-600 text-white ${className}`}
          style={style}
        >
          <Sparkles className="h-5 w-5" />
        </div>
      );

    // Notes
    case "notes":
      return (
        <div
          className={`flex items-center justify-center rounded-xl bg-amber-500 text-white ${className}`}
          style={style}
        >
          <FileText className="h-5 w-5" />
        </div>
      );

    // Roadmaps
    case "roadmaps":
      return (
        <div
          className={`flex items-center justify-center rounded-xl bg-blue-600 text-white ${className}`}
          style={style}
        >
          <Layers className="h-5 w-5" />
        </div>
      );

    // Skills
    case "skills":
      return (
        <div
          className={`flex items-center justify-center rounded-xl bg-emerald-600 text-white ${className}`}
          style={style}
        >
          <Code2 className="h-5 w-5" />
        </div>
      );

    // Quiz
    case "quiz":
      return (
        <div
          className={`flex items-center justify-center rounded-xl bg-indigo-600 text-white ${className}`}
          style={style}
        >
          <HelpCircle className="h-5 w-5" />
        </div>
      );

    // Fallback
    default:
      return (
        <div
          className={`flex items-center justify-center rounded-xl bg-neutral-900 text-white ${className}`}
          style={style}
        >
          <Code2 className="h-4 w-4" />
        </div>
      );
  }
}

export default TechIcon;
