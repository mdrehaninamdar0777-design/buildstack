import { ExternalLink, Github, Globe, Link, Linkedin } from "lucide-react";

function LinkIcon({ type }) {
  if (type === "github") {
    return <Github className="h-6 w-6 text-neutral-900" />;
  }

  if (type === "linkedin") {
    return <Linkedin className="h-6 w-6 text-blue-600" />;
  }

  return <Globe className="h-6 w-6 text-neutral-900" />;
}

export default function SocialLinksCard({ links }) {
  return (
    <section className="rounded-2xl border border-neutral-200 bg-white p-7 shadow-sm">
      <div className="mb-6 flex items-center gap-3">
        <Link className="h-5 w-5 text-neutral-900" />

        <h2 className="text-xl font-semibold text-neutral-900">
          Social / Links
        </h2>
      </div>

      <div className="space-y-3">
        {links.map((link) => (
          <a
            key={link.id}
            href={link.href}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-between rounded-xl border border-neutral-200 px-5 py-3.5 transition hover:bg-neutral-50"
          >
            <div className="flex min-w-0 items-center gap-4">
              <LinkIcon type={link.type} />

              <div className="min-w-0">
                <p className="font-medium text-neutral-900">
                  {link.name}
                </p>

                <p className="truncate text-sm text-neutral-500">
                  {link.url}
                </p>
              </div>
            </div>

            <ExternalLink className="h-5 w-5 shrink-0 text-neutral-500" />
          </a>
        ))}
      </div>
    </section>
  );
}