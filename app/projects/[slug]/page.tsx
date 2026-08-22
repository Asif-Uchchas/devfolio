import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { projects, getProjectBySlug } from "@/data";
import { StatusBadge } from "@/components/ui/BentoGrid";
import FloatingBar from "@/components/ui/FloatingBar";

interface PageProps {
  params: { slug: string };
}

export const generateStaticParams = () =>
  projects.map((project) => ({ slug: project.slug }));

export function generateMetadata({ params }: PageProps): Metadata {
  const project = getProjectBySlug(params.slug);
  if (!project) return { title: "Project not found" };

  return {
    title: `${project.shortTitle} — Asif Uddin Ahmed`,
    description: project.description,
    openGraph: {
      title: `${project.shortTitle} — Asif Uddin Ahmed`,
      description: project.description,
      images: [project.cover],
    },
  };
}

const Meta = ({ label, value }: { label: string; value: string }) => (
  <div>
    <p className="text-xs uppercase tracking-widest text-white/40 font-semibold">{label}</p>
    <p className="mt-1.5 text-white/90 font-medium">{value}</p>
  </div>
);

const ProjectPage = ({ params }: PageProps) => {
  const project = getProjectBySlug(params.slug);
  if (!project) notFound();

  const index = projects.findIndex((p) => p.slug === project.slug);
  const previous = projects[index - 1];
  const next = projects[index + 1];

  return (
    <main className="relative bg-black-100 flex justify-center items-center flex-col overflow-clip mx-auto sm:px-10 px-5">
      <div className="max-w-7xl w-full py-16 md:py-24">
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-violet-300 transition-colors"
        >
          ← Back to all projects
        </Link>

        <header className="mt-8 space-y-5">
          <div className="flex items-center gap-3 flex-wrap">
            <StatusBadge status={project.status} />
            <span className="text-sm text-white/50 font-medium">{project.year}</span>
            <span className="text-white/20">·</span>
            <span className="text-sm text-white/50 font-medium">{project.org}</span>
          </div>

          <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold max-w-4xl leading-tight">
            <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent">
              {project.shortTitle}
            </span>
          </h1>

          <p className="text-lg md:text-xl text-white/70 max-w-3xl">{project.description}</p>

          {(project.github || project.live) && (
            <div className="flex flex-wrap gap-3 pt-2">
              {project.live && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-violet-500/20 border border-violet-500/40 text-violet-200 font-semibold text-sm hover:bg-violet-500/30 transition-all hover:scale-105"
                >
                  Visit live site ↗
                </a>
              )}
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 border border-white/15 text-white/80 font-semibold text-sm hover:bg-white/10 hover:border-white/30 transition-all hover:scale-105"
                >
                  View source ↗
                </a>
              )}
            </div>
          )}
        </header>

        <figure className="mt-12">
          <div className="relative overflow-hidden rounded-3xl border border-white/10">
            <img src={project.cover} alt={project.coverAlt} className="w-full block" />
          </div>
          {!project.coverIsScreenshot && (
            <figcaption className="mt-3 text-xs text-white/40">
              Generated cover art — this project has no public screenshot.
            </figcaption>
          )}
        </figure>

        <div className="mt-14 grid gap-12 lg:grid-cols-[2fr_1fr]">
          <div className="space-y-10">
            <section>
              <h2 className="text-2xl font-bold mb-4">Overview</h2>
              <p className="text-white/70 leading-relaxed text-lg">{project.overview}</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">What I built</h2>
              <ul className="space-y-3">
                {project.highlights.map((highlight) => (
                  <li key={highlight} className="flex gap-3 text-white/70 leading-relaxed">
                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-violet-400 shrink-0" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          <aside className="space-y-8 lg:border-l lg:border-white/10 lg:pl-10 h-fit">
            <Meta label="Role" value={project.role} />
            <Meta label="Organisation" value={project.org} />
            <Meta label="Year" value={project.year} />

            <div>
              <p className="text-xs uppercase tracking-widest text-white/40 font-semibold">
                Tech stack
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {project.techs.map((tech) => (
                  <span
                    key={tech}
                    className="bg-white/10 text-white text-xs font-semibold px-3 py-1.5 rounded-full border border-white/5"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {project.status === "internal" && (
              <p className="text-xs text-white/40 leading-relaxed">
                Built for an internal client system. Source and live access are not public.
              </p>
            )}
          </aside>
        </div>

        <nav className="mt-20 pt-10 border-t border-white/10 flex justify-between gap-6 flex-wrap">
          {previous ? (
            <Link
              href={`/projects/${previous.slug}`}
              className="group max-w-[45%] focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 rounded-lg"
            >
              <p className="text-xs uppercase tracking-widest text-white/40 font-semibold">
                Previous
              </p>
              <p className="mt-1 font-bold text-white/80 group-hover:text-violet-300 transition-colors">
                ← {previous.shortTitle}
              </p>
            </Link>
          ) : (
            <span />
          )}
          {next && (
            <Link
              href={`/projects/${next.slug}`}
              className="group text-right max-w-[45%] focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 rounded-lg"
            >
              <p className="text-xs uppercase tracking-widest text-white/40 font-semibold">Next</p>
              <p className="mt-1 font-bold text-white/80 group-hover:text-violet-300 transition-colors">
                {next.shortTitle} →
              </p>
            </Link>
          )}
        </nav>
      </div>
      <FloatingBar />
    </main>
  );
};

export default ProjectPage;
