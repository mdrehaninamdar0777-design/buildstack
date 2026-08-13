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

export default function EditProfilePage() {
  const fileInputRef = useRef(null);

  const [profileImage, setProfileImage] = useState(null);

  const [formData, setFormData] = useState({
    fullName: "Rehan",
    email: "rehan@example.com",
    jobTitle: "Full Stack Developer",
    bio: "Passionate about building web applications and learning modern technologies. Always exploring new tools and improving my skills.",
    location: "Maharashtra, India",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const imageUrl = URL.createObjectURL(file);
    setProfileImage(imageUrl);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Updated Profile:", formData);

    alert("Profile updated successfully!");
  };

  return (
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
                      {profileImage ? (
                        <img
                          src={profileImage}
                          alt="Profile"
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        "R"
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
                    Full Name
                  </label>

                  <div className="relative">
                    <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />

                    <input
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      className="h-11 w-full rounded-lg border border-neutral-200 bg-white pl-10 pr-4 text-sm text-neutral-900 outline-none transition placeholder:text-neutral-400 focus:border-neutral-400 focus:ring-2 focus:ring-neutral-100"
                      placeholder="Enter your full name"
                    />
                  </div>
                </div>

                {/* Email */}
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
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="h-11 w-full rounded-lg border border-neutral-200 bg-white pl-10 pr-4 text-sm text-neutral-900 outline-none transition placeholder:text-neutral-400 focus:border-neutral-400 focus:ring-2 focus:ring-neutral-100"
                      placeholder="Enter your email"
                    />
                  </div>
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
                    className="h-11 w-full rounded-lg border border-neutral-200 bg-white pl-10 pr-4 text-sm text-neutral-900 outline-none transition placeholder:text-neutral-400 focus:border-neutral-400 focus:ring-2 focus:ring-neutral-100"
                    placeholder="e.g. Full Stack Developer"
                  />
                </div>
              </div>

              {/* Bio */}
              <div>
                <label
                  htmlFor="bio"
                  className="mb-2 block text-sm font-medium text-neutral-900"
                >
                  Bio
                </label>

                <textarea
                  id="bio"
                  name="bio"
                  rows={5}
                  value={formData.bio}
                  onChange={handleChange}
                  className="w-full resize-none rounded-lg border border-neutral-200 bg-white px-4 py-3 text-sm leading-6 text-neutral-900 outline-none transition placeholder:text-neutral-400 focus:border-neutral-400 focus:ring-2 focus:ring-neutral-100"
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
                    className="h-11 w-full rounded-lg border border-neutral-200 bg-white pl-10 pr-4 text-sm text-neutral-900 outline-none transition placeholder:text-neutral-400 focus:border-neutral-400 focus:ring-2 focus:ring-neutral-100"
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
                className="inline-flex h-11 items-center justify-center rounded-lg bg-black px-6 text-sm font-semibold text-white transition hover:bg-neutral-800"
              >
                Save Changes
              </button>
            </div>

          </div>
        </form>
      </div>
    </main>
  );
}