"use client";

import { useState } from "react";
import { User, Mail } from "lucide-react";

import { Button, Input } from "@/components/ui";

export default function PersonalInformationCard() {
  const [name, setName] = useState("Rehan");
  const [email, setEmail] = useState("rehan@example.com");

  return (
    <section className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-neutral-100">
          <User className="h-5 w-5 text-neutral-700" />
        </div>

        <div>
          <h2 className="text-lg font-semibold text-neutral-900">
            Personal Information
          </h2>

          <p className="text-sm text-neutral-500">
            Update your personal account information.
          </p>
        </div>
      </div>

      <div className="mt-6 grid gap-5 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium text-neutral-700">
            Full Name
          </label>

          <div className="relative">
            <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />

            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-neutral-700">
            Email Address
          </label>

          <div className="relative">
            <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />

            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
      </div>

      <div className="mt-6 flex justify-end">
        <Button>
          Save Changes
        </Button>
      </div>
    </section>
  );
}