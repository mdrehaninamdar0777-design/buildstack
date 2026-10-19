import SkillCard from "./SkillCard";

export default function SkillGrid({ skills = [] }) {
  if (!skills.length) {
    return (
      <div className="rounded-2xl border border-dashed border-neutral-300 bg-white px-6 py-16 text-center">
        <h3 className="text-lg font-semibold text-neutral-900">
          No skills found
        </h3>

        <p className="mt-2 text-sm text-neutral-500">
          Try changing your search or filters.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
      {skills.map((skill) => (
        <SkillCard key={skill.id} skill={skill} />
      ))}
    </div>
  );
}