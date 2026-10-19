"use client";

import { useState } from "react";
import AppNavbar from "@/components/layout/AppNavbar";
import LearnSidebar from "@/components/learn/LearnSidebar";
import { X } from "lucide-react";

export default function LearnLayout({ children }) {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white text-neutral-900">
      <AppNavbar onToggleMobileSidebar={() => setMobileSidebarOpen((prev) => !prev)} />

      <div className="flex min-h-[calc(100vh-80px)]">
        {/* Desktop Sidebar */}
        <aside className="hidden w-[280px] shrink-0 border-r border-neutral-200 bg-white lg:block">
          <LearnSidebar />
        </aside>

        {/* Mobile Sidebar Drawer */}
        {mobileSidebarOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div
              className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
              onClick={() => setMobileSidebarOpen(false)}
              aria-hidden="true"
            />
            <div className="fixed inset-y-0 left-0 w-80 max-w-[85vw] bg-white shadow-2xl">
              <div className="flex h-full flex-col">
                <div className="flex items-center justify-between border-b border-neutral-100 p-4">
                  <span className="text-sm font-bold text-neutral-900">Navigation</span>
                  <button
                    type="button"
                    onClick={() => setMobileSidebarOpen(false)}
                    className="rounded-lg p-1.5 text-neutral-400 hover:bg-neutral-100 hover:text-black"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
                <div className="flex-1 overflow-y-auto">
                  <LearnSidebar onLinkClick={() => setMobileSidebarOpen(false)} />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Main Content Area */}
        <main className="min-w-0 flex-1 bg-white">
          {children}
        </main>
      </div>
    </div>
  );
}