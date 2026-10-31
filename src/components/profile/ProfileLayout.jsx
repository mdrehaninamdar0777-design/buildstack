"use client";

import ProfileHeader from "./ProfileHeader";
import ProfileCard from "./ProfileCard";
import AboutCard from "./AboutCard";
import SkillsCard from "./SkillsCard";
import SocialLinksCard from "./SocialLinksCard";

import { profileData } from "./profile.data";
import { useUserProfile } from "@/hooks/useUserProfile";

export default function ProfileLayout() {
  const { displayName, email, photoURL, initials } = useUserProfile();

  // Merge live Firebase user data into profileData for display
  const profile = {
    ...profileData,
    name: displayName,
    email,
    // Use photoURL if available, otherwise fall back to initial letter
    avatar: photoURL ? null : initials || profileData.avatar,
    photoURL: photoURL || null,
  };

  return (
    <div>
      <ProfileHeader />

      <div className="space-y-7">
        {/* Profile */}
        <ProfileCard profile={profile} />

        {/* About */}
        <AboutCard about={profileData.about} />

        {/* Skills + Social Links */}
        <div className="grid gap-7 lg:grid-cols-2">
          <SkillsCard skills={profileData.skills} />

          <SocialLinksCard links={profileData.links} />
        </div>
      </div>
    </div>
  );
}