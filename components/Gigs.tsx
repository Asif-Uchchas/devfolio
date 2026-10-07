"use client";

import Link from "next/link";
import { gigs, getProjectBySlug } from "@/data";
import { Sparkle } from "./ui/Sparkle";
import Reveal from "./ui/Reveal";

const Gigs = () => (
  <section id="hire" className="py-20 w-full">
    <Reveal>
      <h3>
        Hire{" "}
        <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent">
          me.
        </span>
      </h3>
    </Reveal>

    <div className="mt-12 space-y-8">
      {gigs.map(({ id, platform, title, headline, summary, url, relatedProjects }) => {
        const examples = relatedProjects
          .map((slug) => getProjectBySlug(slug))
          .filter((project): project is NonNullable<typeof project> => Boolean(project));

        return (
          <Sparkle
            key={id}
            as="div"
            duration={Math.floor(Math.random() * 10000) + 10000}
            className="flex-col items-start text-left p-5 md:p-8 lg:p-10 gap-6"
          >
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-xs font-semibold text-emerald-300">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Available on {platform}
            </span>

            <div className="space-y-3">
              <h4 className="text-xl md:text-2xl lg:text-3xl font-extrabold">
                <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
                  {title}
                </span>
              </h4>
              <p className="text-white/80 text-base md:text-lg">{headline}</p>
              <p className="text-white/60 max-w-2xl">{summary}</p>
            </div>

            {examples.length > 0 && (
              <div className="space-y-3">
                <p className="text-xs uppercase tracking-widest text-white/40 font-semibold">
                  Systems I&apos;ve built
                </p>
                <div className="flex flex-wrap gap-2">
                  {examples.map((project) => (
                    <Link
                      key={project.slug}
                      href={`/projects/${project.slug}`}
                      className="bg-white/10 text-sm font-semibold px-4 py-2 rounded-full border border-transparent transition-all duration-300 hover:bg-violet-500/20 hover:border-violet-500/30 hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400"
                    >
                      {project.shortTitle}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            <div className="flex flex-col sm:flex-row sm:items-center gap-3 pt-2">
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-violet-500/20 border border-violet-500/40 text-violet-100 font-semibold hover:bg-violet-500/30 transition-all hover:scale-[1.03] focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400"
              >
                <img src="/assets/fiverr.svg" alt="" aria-hidden="true" className="w-4 h-4" />
                View gig on {platform} ↗
              </a>
              <p className="text-xs text-white/45">Packages, pricing, and delivery times are on the gig page.</p>
            </div>
          </Sparkle>
        );
      })}
    </div>
  </section>
);

export default Gigs;
