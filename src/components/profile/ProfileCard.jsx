import { Pencil } from "lucide-react";

export default function ProfileCard({ profile }) {
  return (
    <section className="rounded-2xl border border-neutral-200 bg-white p-8 shadow-sm">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
        {/* Avatar */}
        <div className="relative shrink-0">
          <div className="flex h-36 w-36 items-center justify-center rounded-full bg-neutral-100 text-6xl font-medium text-neutral-900">
            {profile.avatar}
          </div>

          <button
            type="button"
            aria-label="Change profile picture"
            className="absolute bottom-0 right-0 flex h-11 w-11 items-center justify-center rounded-full border border-neutral-200 bg-white shadow-sm transition hover:bg-neutral-50"
          >
            <Pencil className="h-4 w-4 text-neutral-700" />
          </button>
        </div>

        {/* Profile information */}
        <div>
          <h2 className="text-3xl font-bold text-neutral-900">
            {profile.name}
          </h2>

          <p className="mt-1 text-lg text-neutral-600">
            {profile.role}
          </p>

          <p className="mt-2 text-neutral-500">
            {profile.email}
          </p>

          <button
            type="button"
            className="mt-5 inline-flex items-center gap-2 rounded-lg bg-black px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-neutral-800"
          >
            <Pencil className="h-4 w-4" />
            Edit Profile
          </button>
        </div>
      </div>
    </section>
  );
}