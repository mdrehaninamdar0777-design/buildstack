import {
  Brain,
  Code2,
  Link2,
  Video,
} from "lucide-react";

export default function SkillResourceCards({ skill }) {
  const name = skill.name || "React";

  const cards = [
    {
      icon: Video,
      title: "Video Lectures",
      description: `Watch step-by-step video lectures to learn ${name} visually and practically.`,
      action: "Browse Videos",
    },
    {
      icon: Link2,
      title: "Documentation",
      description: `Access official ${name} documentation and trusted resources.`,
      action: "View Documentation",
    },
    {
      icon: Brain,
      title: "Quiz",
      description: "Test your understanding with quizzes and track your progress.",
      action: "Start Quiz",
    },
    {
      icon: Code2,
      title: "Practice",
      description: "Solve practice questions and coding challenges to strengthen your skills.",
      action: "Start Practice",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.title}
            className="flex flex-col justify-between rounded-2xl border border-neutral-200 bg-white p-5 shadow-2xs"
          >
            <div>
              <Icon className="h-6 w-6 text-neutral-800" />

              <h3 className="mt-4 font-semibold text-neutral-900">
                {card.title}
              </h3>

              <p className="mt-2 text-xs leading-5 text-neutral-500">
                {card.description}
              </p>
            </div>

            <button
              type="button"
              className="mt-5 w-fit rounded-xl border border-neutral-200 px-3.5 py-2 text-xs font-semibold text-neutral-800 transition hover:bg-neutral-50 hover:border-neutral-300"
            >
              {card.action} →
            </button>
          </div>
        );
      })}
    </div>
  );
}