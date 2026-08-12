import ProfileHeader from "./ProfileHeader";
import ProfileCard from "./ProfileCard";
import AboutCard from "./AboutCard";
import SkillsCard from "./SkillsCard";
import SocialLinksCard from "./SocialLinksCard";

import { profileData } from "./profile.data";

export default function ProfileLayout() {
  return (
    <div>
      <ProfileHeader />

      <div className="space-y-7">
        {/* Profile */}
        <ProfileCard profile={profileData} />

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