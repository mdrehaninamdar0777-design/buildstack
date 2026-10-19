"use client";

import { useState } from "react";
import { ArrowLeft, Camera, X } from "lucide-react";

export default function EditProfileModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    fullName: "Rehan Inamdar",
    username: "rehan.dev",
    bio: "Full Stack Developer | Passionate about building products and solving real-world problems.",
    email: "rehaninamdar@gmail.com",
    college: "SGGS IE&T, Nanded",
    location: "Parbhani, Maharashtra, India",
    website: "https://rehan.dev",
    github: "github.com/rehaninamdar07",
    linkedin: "linkedin.com/in/rehaninamdar07",
  });

  const [savedMessage, setSavedMessage] = useState(false);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    setSavedMessage(true);
    setTimeout(() => {
      setSavedMessage(false);
      onClose();
    }, 500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="relative w-full max-w-2xl rounded-2xl border border-neutral-200 bg-white p-6 shadow-2xl sm:p-8 my-8 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-neutral-100 pb-5">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
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
            onClick={onClose}
            className="rounded-lg p-1.5 text-neutral-400 hover:bg-neutral-100 hover:text-black"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {savedMessage && (
          <div className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-xs text-emerald-800">
            Profile saved successfully!
          </div>
        )}

        {/* Content */}
        <form onSubmit={handleSave} className="mt-6 space-y-6">
          {/* Avatar Upload */}
          <div className="flex items-center gap-5">
            <div className="relative">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-neutral-900 text-2xl font-bold text-white shadow-sm">
                R
              </div>
              <button
                type="button"
                className="absolute bottom-0 right-0 flex h-7 w-7 items-center justify-center rounded-full border border-neutral-200 bg-white shadow-xs hover:bg-neutral-50"
              >
                <Camera className="h-3.5 w-3.5 text-neutral-700" />
              </button>
            </div>

            <div>
              <p className="text-xs font-semibold text-neutral-900">Profile Photo</p>
              <p className="mt-0.5 text-xs text-neutral-500">JPG, PNG. Max size 2MB.</p>
              <button
                type="button"
                className="mt-2.5 rounded-lg border border-neutral-200 bg-white px-3 py-1.5 text-xs font-semibold text-neutral-800 hover:bg-neutral-50"
              >
                Change Photo
              </button>
            </div>
          </div>

          {/* Full Name & Username */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-semibold text-neutral-800">
                Full Name
              </label>
              <input
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="mt-1.5 h-10 w-full rounded-xl border border-neutral-200 px-3.5 text-sm text-neutral-900 outline-none focus:border-neutral-400 focus:ring-1 focus:ring-neutral-200"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-neutral-800">
                Username
              </label>
              <input
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="mt-1.5 h-10 w-full rounded-xl border border-neutral-200 px-3.5 text-sm text-neutral-900 outline-none focus:border-neutral-400 focus:ring-1 focus:ring-neutral-200"
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
                {formData.bio.length}/160
              </span>
            </div>
            <textarea
              name="bio"
              rows={3}
              maxLength={160}
              value={formData.bio}
              onChange={handleChange}
              className="mt-1.5 w-full resize-none rounded-xl border border-neutral-200 p-3 text-sm text-neutral-900 outline-none focus:border-neutral-400 focus:ring-1 focus:ring-neutral-200"
            />
          </div>

          {/* Email & College */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-semibold text-neutral-800">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-1.5 h-10 w-full rounded-xl border border-neutral-200 px-3.5 text-sm text-neutral-900 outline-none focus:border-neutral-400 focus:ring-1 focus:ring-neutral-200"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-neutral-800">
                College
              </label>
              <input
                name="college"
                value={formData.college}
                onChange={handleChange}
                className="mt-1.5 h-10 w-full rounded-xl border border-neutral-200 px-3.5 text-sm text-neutral-900 outline-none focus:border-neutral-400 focus:ring-1 focus:ring-neutral-200"
              />
            </div>
          </div>

          {/* Location & Website */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-semibold text-neutral-800">
                Location
              </label>
              <input
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="mt-1.5 h-10 w-full rounded-xl border border-neutral-200 px-3.5 text-sm text-neutral-900 outline-none focus:border-neutral-400 focus:ring-1 focus:ring-neutral-200"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-neutral-800">
                Website
              </label>
              <input
                name="website"
                value={formData.website}
                onChange={handleChange}
                className="mt-1.5 h-10 w-full rounded-xl border border-neutral-200 px-3.5 text-sm text-neutral-900 outline-none focus:border-neutral-400 focus:ring-1 focus:ring-neutral-200"
              />
            </div>
          </div>

          {/* Github & LinkedIn */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-semibold text-neutral-800">
                Github
              </label>
              <input
                name="github"
                value={formData.github}
                onChange={handleChange}
                className="mt-1.5 h-10 w-full rounded-xl border border-neutral-200 px-3.5 text-sm text-neutral-900 outline-none focus:border-neutral-400 focus:ring-1 focus:ring-neutral-200"
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
                className="mt-1.5 h-10 w-full rounded-xl border border-neutral-200 px-3.5 text-sm text-neutral-900 outline-none focus:border-neutral-400 focus:ring-1 focus:ring-neutral-200"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 border-t border-neutral-100 pt-5">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-neutral-200 bg-white px-5 py-2.5 text-xs font-semibold text-neutral-700 transition hover:bg-neutral-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-xl bg-black px-6 py-2.5 text-xs font-semibold text-white transition hover:bg-neutral-800"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
