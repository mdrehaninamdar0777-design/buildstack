"use client";

import ProfileHeader from "./ProfileHeader";
import ProfileCard from "./ProfileCard";
import AboutCard from "./AboutCard";
import SkillsCard from "./SkillsCard";
import SocialLinksCard from "./SocialLinksCard";

import { profileData } from "./profile.data";
import { useUserProfile } from "@/hooks/useUserProfile";

export default function ProfileLayout() {
  const { displayName, email, photoURL, initials, dbProfile } = useUserProfile();

  // Merge live Firebase user data with MongoDB profile data.
  // MongoDB fields (bio, role, skills, links) take priority over static profileData.
  const profile = {
    ...profileData,
    name: displayName,
    email,
    avatar: photoURL ? null : initials || profileData.avatar,
    photoURL: photoURL || null,
    // Override with DB data when available
    role: dbProfile?.role || profileData.role,
  };

  const about = {
    ...profileData.about,
    title: dbProfile?.role || profileData.about.title,
    description: dbProfile?.bio || profileData.about.description,
    location: dbProfile?.location || profileData.about.location,
  };

  const skills = dbProfile?.skills?.length ? dbProfile.skills : profileData.skills;
  const links = dbProfile?.links?.length ? dbProfile.links : profileData.links;

  return (
    <div>
      <ProfileHeader />

      <div className="space-y-7">
        {/* Profile */}
        <ProfileCard profile={profile} />

        {/* About */}
        <AboutCard about={about} />

        {/* Skills + Social Links */}
        <div className="grid gap-7 lg:grid-cols-2">
          <SkillsCard skills={skills} />

          <SocialLinksCard links={links} />
        </div>
      </div>
    </div>
  );
}