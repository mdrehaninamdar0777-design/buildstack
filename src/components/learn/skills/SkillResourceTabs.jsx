"use client";

import {
  FileText,
  Video,
  Link2,
  Brain,
  Code2,
} from "lucide-react";

const tabs = [
  {
    id: "notes",
    label: "Notes",
    icon: FileText,
  },
  {
    id: "videos",
    label: "Video Lectures",
    icon: Video,
  },
  {
    id: "documentation",
    label: "Documentation",
    icon: Link2,
  },
  {
    id: "quiz",
    label: "Quiz",
    icon: Brain,
  },
  {
    id: "practice",
    label: "Practice",
    icon: Code2,
  },
];

export default function SkillResourceTabs({
  activeTab,
  onChange,
}) {
  return (
    <div className="flex overflow-x-auto border-b border-neutral-100 bg-neutral-50/50 p-2 sm:p-3 gap-1.5 sm:gap-2">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const active = activeTab === tab.id;

        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onChange(tab.id)}
            className={`flex min-w-max items-center justify-center gap-2 rounded-xl px-4 py-2 text-xs sm:text-sm font-semibold transition ${
              active
                ? "bg-black text-white shadow-xs"
                : "text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900"
            }`}
          >
            <Icon className="h-4 w-4" />
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}