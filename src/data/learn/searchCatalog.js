import { roadmaps } from "./roadmaps.data";
import { skills } from "./skills.data";
import { domains } from "./domains.data";

/**
 * Returns a unified, normalized array of search items covering all
 * existing roadmaps, skills, and domains in BuildStack.
 *
 * Each item contains:
 * - id: unique string
 * - slug: item identifier for routing
 * - type: "Roadmaps" | "Skills" | "Domains"
 * - title: display title
 * - description: brief summary
 * - level: difficulty rating
 * - duration: estimated duration or lessons/tech count
 * - category: parent domain or topic
 * - technologies: array of associated tools
 * - href: target detail page route
 */
export function getUnifiedSearchIndex() {
  const roadmapItems = (roadmaps || []).map((r) => ({
    id: `roadmap-${r.slug || r.id}`,
    slug: r.slug || r.id,
    type: "Roadmaps",
    title: r.title,
    description: r.description || `Comprehensive roadmap for ${r.title}.`,
    level: r.level || "Beginner to Advanced",
    duration: r.duration || `${r.skills || 0} skills`,
    category: r.category || "Web Development",
    technologies: r.technologies || [],
    href: `/learn/roadmaps/${r.slug || r.id}`,
  }));

  const skillItems = (skills || []).map((s) => ({
    id: `skill-${s.slug || s.id}`,
    slug: s.slug || s.id,
    type: "Skills",
    title: s.name,
    description: s.description || `Master ${s.name} fundamentals and applications.`,
    level: s.level || "Beginner",
    duration: s.duration || `${s.lessons || 0} Lessons`,
    category: s.category || "Development",
    technologies: [s.name],
    href: `/learn/skills/${s.slug || s.id}`,
  }));

  const domainItems = (domains || []).map((d) => ({
    id: `domain-${d.slug || d.id}`,
    slug: d.slug || d.id,
    type: "Domains",
    title: d.title,
    description: d.description || `Explore ${d.title} roadmaps and technologies.`,
    level: d.difficulty || "Beginner to Advanced",
    duration: d.duration || `${d.technologies || 0} Technologies`,
    category: d.title,
    technologies: [],
    href: `/learn/domains/${d.slug || d.id}`,
  }));

  return [...roadmapItems, ...skillItems, ...domainItems];
}

export default getUnifiedSearchIndex;
