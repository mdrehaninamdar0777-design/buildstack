"use client";

import { useState } from "react";
import { Settings, Globe, Palette } from "lucide-react";

export default function AccountPreferencesCard() {
  const [theme, setTheme] = useState("System");
  const [language, setLanguage] = useState("English");

  return (
    <section className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-neutral-100">
          <Settings className="h-5 w-5 text-neutral-700" />
        </div>

        <div>
          <h2 className="text-lg font-semibold text-neutral-900">
            Account Preferences
          </h2>

          <p className="text-sm text-neutral-500">
            Customize your BuildStack experience.
          </p>
        </div>
      </div>

      <div className="mt-6 space-y-5">
        <div className="flex items-center justify-between gap-6 border-b border-neutral-100 pb-5">
          <div className="flex items-center gap-3">
            <Palette className="h-5 w-5 text-neutral-500" />

            <div>
              <p className="text-sm font-medium text-neutral-900">
                Theme
              </p>

              <p className="text-sm text-neutral-500">
                Choose your preferred appearance.
              </p>
            </div>
          </div>

          <select
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            className="rounded-lg border border-neutral-200 bg-white px-3 py-2 text-sm outline-none focus:border-neutral-400"
          >
            <option>System</option>
            <option>Light</option>
            <option>Dark</option>
          </select>
        </div>

        <div className="flex items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <Globe className="h-5 w-5 text-neutral-500" />

            <div>
              <p className="text-sm font-medium text-neutral-900">
                Language
              </p>

              <p className="text-sm text-neutral-500">
                Select your preferred language.
              </p>
            </div>
          </div>

          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="rounded-lg border border-neutral-200 bg-white px-3 py-2 text-sm outline-none focus:border-neutral-400"
          >
            <option>English</option>
          </select>
        </div>
      </div>
    </section>
  );
}