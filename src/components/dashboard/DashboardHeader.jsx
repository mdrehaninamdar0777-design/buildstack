import { Bell, Search } from "lucide-react";

import {
  Avatar,
  Input,
} from "@/components/ui";

export default function DashboardHeader({
  title = "Dashboard",
  user = {
    name: "Rehan",
    avatar: "",
  },
}) {
  return (
    <header className="flex items-center justify-between gap-6">

      {/* Left */}
      <div>

        <h1 className="text-3xl font-bold text-neutral-900">
          {title}
        </h1>

        <p className="mt-1 text-neutral-500">
          Welcome back! Continue your learning journey.
        </p>

      </div>

      {/* Right */}
      <div className="flex items-center gap-4">

        <div className="relative hidden md:block">

          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />

          <Input
            placeholder="Search..."
            className="w-64 pl-10"
          />

        </div>

        <button
          className="rounded-xl border border-neutral-200 p-3 transition hover:bg-neutral-50"
          aria-label="Notifications"
        >
          <Bell className="h-5 w-5" />
        </button>

        <Avatar
          src={user.avatar}
          alt={user.name}
          fallback={user.name}
        />

      </div>

    </header>
  );
}