import { ProgressBar, Card } from "@/components/ui";

const skills = [
  {
    name: "HTML",
    progress: 95,
  },
  {
    name: "CSS",
    progress: 90,
  },
  {
    name: "JavaScript",
    progress: 80,
  },
  {
    name: "React",
    progress: 65,
  },
];

export default function SkillProgress({
  data = skills,
}) {
  return (
    <Card className="p-5">

      <h3 className="text-lg font-bold text-neutral-900">
        Skill Progress
      </h3>

      <div className="mt-6 space-y-5">

        {data.map((skill) => (
          <div key={skill.name}>

            <div className="mb-2 flex justify-between">

              <span className="text-sm font-medium">
                {skill.name}
              </span>

              <span className="text-sm text-neutral-500">
                {skill.progress}%
              </span>

            </div>

            <ProgressBar value={skill.progress} />

          </div>
        ))}

      </div>

    </Card>
  );
}