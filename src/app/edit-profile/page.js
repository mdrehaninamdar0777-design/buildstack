"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import {
  ArrowLeft,
  Camera,
  MapPin,
  Mail,
  User,
  BriefcaseBusiness,
} from "lucide-react";

import AppNavbar from "@/components/layout/AppNavbar";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { useUserProfile } from "@/hooks/useUserProfile";
import { updateUserProfile } from "@/lib/api";

function EditProfileFormCard({
  dbProfile,
  displayName,
  email,
  photoURL,
  initials,
  refreshProfile,
}) {
  const fileInputRef = useRef(null);
  const [profileImage, setProfileImage] = useState(null);

  const [formData, setFormData] = useState(() => ({
    fullName: dbProfile?.name || displayName || "",
    jobTitle: dbProfile?.role || "",
    bio: dbProfile?.bio || "",
    location: dbProfile?.location || "",
  }));

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const imageUrl = URL.createObjectURL(file);
    setProfileImage(imageUrl);
  };

  // ── Validation ─────────────────────────────────────────────────────────────
  function validate() {
    const name = formData.fullName.trim();
    if (!name) return "Full name is required.";
    if (name.length > 128) return "Full name must be 128 characters or fewer.";
    if (formData.jobTitle.length > 128) return "Job title must be 128 characters or fewer.";
    if (formData.bio.length > 1000) return "Bio must be 1000 characters or fewer.";
    if (formData.location.length > 128) return "Location must be 128 characters or fewer.";
    return null;
  }

  // ── Save handler ───────────────────────────────────────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    try {
      const payload = {
        name: formData.fullName.trim(),
        role: formData.jobTitle.trim(),
        bio: formData.bio.trim(),
        location: formData.location.trim(),
      };

      await updateUserProfile(payload);

      // Refresh shared profile so Navbar, Profile page, Home page all update
      await refreshProfile();

      setSuccess("Profile updated successfully!");

      // Clear success after a moment
      setTimeout(() => setSuccess(""), 4000);
    } catch (err) {
      console.error("[EditProfilePage] Save failed:", err);
      const message =
        err.isNetworkError
          ? "Cannot reach the server. Please ensure the backend is running."
          : err.message || "Failed to save profile. Please try again.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  // Current avatar to display: local file > Firebase photoURL > initials
  const avatarSrc = profileImage || photoURL || null;
  const avatarInitial = initials || (displayName?.[0]?.toUpperCase() ?? "U");

  return (
    <>
      {/* Status messages */}
      {error && (
        <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}
      {success && (
        <div className="mb-6 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
          {success}
        </div>
      )}

      {/* Main Card */}
      <form onSubmit={handleSubmit}>
        <div className="rounded-2xl border border-neutral-200 bg-white shadow-sm">
          {/* Profile Information Header */}
          <div className="border-b border-neutral-200 px-6 py-6 lg:px-8">
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-neutral-100">
                <User className="h-5 w-5 text-neutral-700" />
              </div>

              <div>
                <h2 className="text-lg font-semibold text-neutral-900">
                  Profile Information
                </h2>

                <p className="mt-1 text-sm text-neutral-500">
                  Update your personal information shown on your profile.
                </p>
              </div>
            </div>
          </div>

          {/* Form Content */}
          <div className="space-y-8 px-6 py-8 lg:px-8">
            {/* Profile Photo */}
            <div>
              <label className="text-sm font-semibold text-neutral-900">
                Profile Photo
              </label>

              <div className="mt-4 flex items-center gap-5">
                {/* Avatar */}
                <div className="relative">
                  <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-full bg-neutral-100 text-4xl font-medium text-neutral-700">
                    {avatarSrc ? (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img
                        src={avatarSrc}
                        alt="Profile"
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      avatarInitial
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="absolute bottom-0 right-0 flex h-8 w-8 items-center justify-center rounded-full border border-neutral-200 bg-white shadow-sm transition hover:bg-neutral-50"
                  >
                    <Camera className="h-4 w-4 text-neutral-700" />
                  </button>
                </div>

                <div>
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="rounded-lg border border-neutral-300 bg-white px-4 py-2 text-sm font-semibold text-neutral-900 transition hover:bg-neutral-50"
                  >
                    Change Photo
                  </button>

                  <p className="mt-2 text-xs text-neutral-500">
                    JPG, PNG or WEBP. Maximum 5MB.
                  </p>

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/png,image/jpeg,image/webp"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </div>
              </div>
            </div>

            {/* Full Name + Email */}
            <div className="grid gap-6 md:grid-cols-2">
              {/* Full Name */}
              <div>
                <label
                  htmlFor="fullName"
                  className="mb-2 block text-sm font-medium text-neutral-900"
                >
                  Full Name <span className="text-red-500">*</span>
                </label>

                <div className="relative">
                  <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />

                  <input
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    disabled={loading}
                    className="h-11 w-full rounded-lg border border-neutral-200 bg-white pl-10 pr-4 text-sm text-neutral-900 outline-none transition placeholder:text-neutral-400 focus:border-neutral-400 focus:ring-2 focus:ring-neutral-100 disabled:opacity-60"
                    placeholder="Enter your full name"
                  />
                </div>
              </div>

              {/* Email (read-only) */}
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-neutral-900"
                >
                  Email Address
                </label>

                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />

                  <input
                    id="email"
                    type="email"
                    value={email}
                    readOnly
                    disabled
                    title="Email is managed by Firebase Authentication"
                    className="h-11 w-full rounded-lg border border-neutral-200 bg-neutral-50 pl-10 pr-4 text-sm text-neutral-400 outline-none cursor-not-allowed"
                  />
                </div>
                <p className="mt-1 text-xs text-neutral-400">
                  Managed by your sign-in method
                </p>
              </div>
            </div>

            {/* Job Title */}
            <div>
              <label
                htmlFor="jobTitle"
                className="mb-2 block text-sm font-medium text-neutral-900"
              >
                Job Title
              </label>

              <div className="relative">
                <BriefcaseBusiness className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />

                <input
                  id="jobTitle"
                  name="jobTitle"
                  value={formData.jobTitle}
                  onChange={handleChange}
                  disabled={loading}
                  className="h-11 w-full rounded-lg border border-neutral-200 bg-white pl-10 pr-4 text-sm text-neutral-900 outline-none transition placeholder:text-neutral-400 focus:border-neutral-400 focus:ring-2 focus:ring-neutral-100 disabled:opacity-60"
                  placeholder="e.g. Full Stack Developer"
                />
              </div>
            </div>

            {/* Bio */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label
                  htmlFor="bio"
                  className="block text-sm font-medium text-neutral-900"
                >
                  Bio
                </label>
                <span className="text-xs text-neutral-400">
                  {formData.bio.length}/1000
                </span>
              </div>

              <textarea
                id="bio"
                name="bio"
                rows={5}
                maxLength={1000}
                value={formData.bio}
                onChange={handleChange}
                disabled={loading}
                className="w-full resize-none rounded-lg border border-neutral-200 bg-white px-4 py-3 text-sm leading-6 text-neutral-900 outline-none transition placeholder:text-neutral-400 focus:border-neutral-400 focus:ring-2 focus:ring-neutral-100 disabled:opacity-60"
                placeholder="Tell something about yourself..."
              />

              <p className="mt-2 text-xs text-neutral-500">
                Write a short description about yourself and what you do.
              </p>
            </div>

            {/* Location */}
            <div>
              <label
                htmlFor="location"
                className="mb-2 block text-sm font-medium text-neutral-900"
              >
                Location
              </label>

              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />

                <input
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  disabled={loading}
                  className="h-11 w-full rounded-lg border border-neutral-200 bg-white pl-10 pr-4 text-sm text-neutral-900 outline-none transition placeholder:text-neutral-400 focus:border-neutral-400 focus:ring-2 focus:ring-neutral-100 disabled:opacity-60"
                  placeholder="e.g. Maharashtra, India"
                />
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="flex flex-col-reverse gap-3 border-t border-neutral-200 px-6 py-5 sm:flex-row sm:justify-end lg:px-8">
            <Link
              href="/profile"
              className="inline-flex h-11 items-center justify-center rounded-lg border border-neutral-300 bg-white px-5 text-sm font-semibold text-neutral-900 transition hover:bg-neutral-50"
            >
              Cancel
            </Link>

            <button
              type="submit"
              disabled={loading}
              className="inline-flex h-11 items-center justify-center rounded-lg bg-black px-6 text-sm font-semibold text-white transition hover:bg-neutral-800 disabled:opacity-60"
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>
      </form>
    </>
  );
}

/**
 * /edit-profile — full-page edit profile form.
 *
 * Pre-populates from the MongoDB profile (dbProfile) when available,
 * falling back to Firebase user data. Saves via PUT /api/users/me and
 * calls refreshProfile() so all surfaces update without a full page reload.
 */
export default function EditProfilePage() {
  const { displayName, email, initials, photoURL, dbProfile, refreshProfile } =
    useUserProfile();

  return (
    <ProtectedRoute>
      <main className="min-h-screen bg-neutral-50">
        {/* Shared Navbar */}
        <AppNavbar />

        <div className="mx-auto max-w-5xl px-6 py-10 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <Link
              href="/profile"
              className="mb-5 inline-flex items-center gap-2 text-sm font-medium text-neutral-500 transition hover:text-neutral-900"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Profile
            </Link>

            <h1 className="text-3xl font-bold tracking-tight text-neutral-900">
              Edit Profile
            </h1>

            <p className="mt-2 text-neutral-500">
              Update your profile information and personal details.
            </p>
          </div>

          <EditProfileFormCard
            key={dbProfile?._id || dbProfile?.updatedAt || "initial"}
            dbProfile={dbProfile}
            displayName={displayName}
            email={email}
            photoURL={photoURL}
            initials={initials}
            refreshProfile={refreshProfile}
          />
        </div>
      </main>
    </ProtectedRoute>
  );
}