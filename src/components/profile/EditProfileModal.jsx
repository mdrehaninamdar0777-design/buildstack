"use client";

import { useState } from "react";
import { ArrowLeft, Camera, X } from "lucide-react";
import { useUserProfile } from "@/hooks/useUserProfile";
import { updateUserProfile } from "@/lib/api";

function EditProfileModalDialog({ onClose }) {
  const { displayName, email, initials, dbProfile, refreshProfile } = useUserProfile();

  const [formData, setFormData] = useState(() => ({
    fullName: dbProfile?.name || displayName || "",
    role: dbProfile?.role || "",
    bio: dbProfile?.bio || "",
    location: dbProfile?.location || "",
    github: dbProfile?.links?.find((l) => l.type === "github")?.url || "",
    linkedin: dbProfile?.links?.find((l) => l.type === "linkedin")?.url || "",
    website: dbProfile?.links?.find((l) => l.type === "portfolio")?.url || "",
  }));

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ── Validation ────────────────────────────────────────────────────────────
  function validate() {
    const name = formData.fullName.trim();
    if (!name) return "Full name is required.";
    if (name.length > 128) return "Full name must be 128 characters or fewer.";
    if (formData.role.length > 128) return "Role must be 128 characters or fewer.";
    if (formData.bio.length > 1000) return "Bio must be 1000 characters or fewer.";
    if (formData.location.length > 128) return "Location must be 128 characters or fewer.";
    return null;
  }

  // ── Build the links array for the backend ─────────────────────────────────
  function buildLinks() {
    const links = [];
    if (formData.github.trim()) {
      links.push({
        name: "GitHub",
        url: formData.github.trim(),
        href: formData.github.trim().startsWith("http")
          ? formData.github.trim()
          : `https://${formData.github.trim()}`,
        type: "github",
      });
    }
    if (formData.linkedin.trim()) {
      links.push({
        name: "LinkedIn",
        url: formData.linkedin.trim(),
        href: formData.linkedin.trim().startsWith("http")
          ? formData.linkedin.trim()
          : `https://${formData.linkedin.trim()}`,
        type: "linkedin",
      });
    }
    if (formData.website.trim()) {
      links.push({
        name: "Portfolio",
        url: formData.website.trim(),
        href: formData.website.trim().startsWith("http")
          ? formData.website.trim()
          : `https://${formData.website.trim()}`,
        type: "portfolio",
      });
    }
    return links;
  }

  // ── Save handler ──────────────────────────────────────────────────────────
  const handleSave = async (e) => {
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
        role: formData.role.trim(),
        bio: formData.bio.trim(),
        location: formData.location.trim(),
        links: buildLinks(),
      };

      await updateUserProfile(payload);

      // Refresh shared profile data so Navbar, Profile page, etc. update
      await refreshProfile();

      setSuccess("Profile updated successfully!");
      setTimeout(() => {
        setSuccess("");
        onClose();
      }, 1000);
    } catch (err) {
      console.error("[EditProfileModal] Save failed:", err);
      const message =
        err.isNetworkError
          ? "Cannot reach the server. Please ensure the backend is running."
          : err.message || "Failed to save profile. Please try again.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setError("");
    setSuccess("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
        onClick={handleClose}
        aria-hidden="true"
      />

      <div className="relative w-full max-w-2xl rounded-2xl border border-neutral-200 bg-white p-6 shadow-2xl sm:p-8 my-8 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-neutral-100 pb-5">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleClose}
              className="rounded-lg p-1.5 text-neutral-500 hover:bg-neutral-100 hover:text-black"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <div>
              <h2 className="text-lg font-bold text-neutral-900">Edit Profile</h2>
              <p className="text-xs text-neutral-500">
                Update your personal information
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={handleClose}
            className="rounded-lg p-1.5 text-neutral-400 hover:bg-neutral-100 hover:text-black"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Status messages */}
        {error && (
          <div className="mt-4 rounded-xl border border-red-200 bg-red-50 p-3 text-xs text-red-700">
            {error}
          </div>
        )}
        {success && (
          <div className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-xs text-emerald-800">
            {success}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSave} className="mt-6 space-y-6">
          {/* Avatar (display only — photo upload not yet implemented) */}
          <div className="flex items-center gap-5">
            <div className="relative">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-neutral-900 text-2xl font-bold text-white shadow-sm">
                {initials || "U"}
              </div>
              <button
                type="button"
                disabled
                className="absolute bottom-0 right-0 flex h-7 w-7 items-center justify-center rounded-full border border-neutral-200 bg-white shadow-xs opacity-50 cursor-not-allowed"
                title="Photo upload coming soon"
              >
                <Camera className="h-3.5 w-3.5 text-neutral-700" />
              </button>
            </div>

            <div>
              <p className="text-xs font-semibold text-neutral-900">Profile Photo</p>
              <p className="mt-0.5 text-xs text-neutral-500">JPG, PNG. Max size 2MB.</p>
              <button
                type="button"
                disabled
                className="mt-2.5 rounded-lg border border-neutral-200 bg-white px-3 py-1.5 text-xs font-semibold text-neutral-400 cursor-not-allowed"
              >
                Change Photo
              </button>
            </div>
          </div>

          {/* Full Name & Role */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-semibold text-neutral-800">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                disabled={loading}
                placeholder="Your full name"
                className="mt-1.5 h-10 w-full rounded-xl border border-neutral-200 px-3.5 text-sm text-neutral-900 outline-none focus:border-neutral-400 focus:ring-1 focus:ring-neutral-200 disabled:opacity-60"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-neutral-800">
                Job Title / Role
              </label>
              <input
                name="role"
                value={formData.role}
                onChange={handleChange}
                disabled={loading}
                placeholder="e.g. Full Stack Developer"
                className="mt-1.5 h-10 w-full rounded-xl border border-neutral-200 px-3.5 text-sm text-neutral-900 outline-none focus:border-neutral-400 focus:ring-1 focus:ring-neutral-200 disabled:opacity-60"
              />
            </div>
          </div>

          {/* Bio */}
          <div>
            <div className="flex items-center justify-between">
              <label className="block text-xs font-semibold text-neutral-800">
                Bio
              </label>
              <span className="text-[11px] text-neutral-400">
                {formData.bio.length}/1000
              </span>
            </div>
            <textarea
              name="bio"
              rows={3}
              maxLength={1000}
              value={formData.bio}
              onChange={handleChange}
              disabled={loading}
              placeholder="Tell people about yourself..."
              className="mt-1.5 w-full resize-none rounded-xl border border-neutral-200 p-3 text-sm text-neutral-900 outline-none focus:border-neutral-400 focus:ring-1 focus:ring-neutral-200 disabled:opacity-60"
            />
          </div>

          {/* Email (read-only — managed by Firebase) & Location */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-semibold text-neutral-800">
                Email
              </label>
              <input
                type="email"
                value={email}
                readOnly
                disabled
                title="Email is managed by Firebase Authentication"
                className="mt-1.5 h-10 w-full rounded-xl border border-neutral-200 bg-neutral-50 px-3.5 text-sm text-neutral-400 outline-none cursor-not-allowed"
              />
              <p className="mt-1 text-[10px] text-neutral-400">Managed by your sign-in method</p>
            </div>
            <div>
              <label className="block text-xs font-semibold text-neutral-800">
                Location
              </label>
              <input
                name="location"
                value={formData.location}
                onChange={handleChange}
                disabled={loading}
                placeholder="e.g. Maharashtra, India"
                className="mt-1.5 h-10 w-full rounded-xl border border-neutral-200 px-3.5 text-sm text-neutral-900 outline-none focus:border-neutral-400 focus:ring-1 focus:ring-neutral-200 disabled:opacity-60"
              />
            </div>
          </div>

          {/* Social links */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-semibold text-neutral-800">
                GitHub
              </label>
              <input
                name="github"
                value={formData.github}
                onChange={handleChange}
                disabled={loading}
                placeholder="github.com/username"
                className="mt-1.5 h-10 w-full rounded-xl border border-neutral-200 px-3.5 text-sm text-neutral-900 outline-none focus:border-neutral-400 focus:ring-1 focus:ring-neutral-200 disabled:opacity-60"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-neutral-800">
                LinkedIn
              </label>
              <input
                name="linkedin"
                value={formData.linkedin}
                onChange={handleChange}
                disabled={loading}
                placeholder="linkedin.com/in/username"
                className="mt-1.5 h-10 w-full rounded-xl border border-neutral-200 px-3.5 text-sm text-neutral-900 outline-none focus:border-neutral-400 focus:ring-1 focus:ring-neutral-200 disabled:opacity-60"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-neutral-800">
              Website / Portfolio
            </label>
            <input
              name="website"
              value={formData.website}
              onChange={handleChange}
              disabled={loading}
              placeholder="https://yoursite.com"
              className="mt-1.5 h-10 w-full rounded-xl border border-neutral-200 px-3.5 text-sm text-neutral-900 outline-none focus:border-neutral-400 focus:ring-1 focus:ring-neutral-200 disabled:opacity-60"
            />
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 border-t border-neutral-100 pt-5">
            <button
              type="button"
              onClick={handleClose}
              disabled={loading}
              className="rounded-xl border border-neutral-200 bg-white px-5 py-2.5 text-xs font-semibold text-neutral-700 transition hover:bg-neutral-50 disabled:opacity-60"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="rounded-xl bg-black px-6 py-2.5 text-xs font-semibold text-white transition hover:bg-neutral-800 disabled:opacity-60"
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

/**
 * EditProfileModal
 *
 * Pre-populates from the MongoDB profile (dbProfile) when available,
 * falling back to Firebase user data. Saves to PUT /api/users/me and
 * calls refreshProfile() so all surfaces update immediately.
 */
export default function EditProfileModal({ isOpen, onClose }) {
  const { dbProfile } = useUserProfile();

  if (!isOpen) return null;

  return (
    <EditProfileModalDialog
      key={dbProfile?._id || dbProfile?.updatedAt || "initial"}
      onClose={onClose}
    />
  );
}
