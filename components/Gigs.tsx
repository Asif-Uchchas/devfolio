"use client";

import Link from "next/link";
import { gigs, getProjectBySlug } from "@/data";
import type { Gig } from "@/data";
import { Sparkle } from "./ui/Sparkle";
import Reveal from "./ui/Reveal";

const BulletList = ({ items }: { items: string[] }) => (
  <ul className="space-y-2">
    {items.map((item) => (
      <li key={item} className="flex gap-3 text-white/70 leading-relaxed">
        <span className="mt-2 w-1.5 h-1.5 rounded-full bg-violet-400 shrink-0" />
        <span>{item}</span>
      </li>
    ))}
  </ul>
);

const Label = ({ children }: { children: React.ReactNode }) => (
  <p className="text-xs uppercase tracking-widest text-white/40 font-semibold mb-3">{children}</p>
);

const GigCard = ({ gig }: { gig: Gig }) => {
  const examples = gig.relatedProjects
    .map((slug) => getProjectBySlug(slug))
    .filter((project): project is NonNullable<typeof project> => Boolean(project));

  return (
    <div className="space-y-8">
      <Sparkle
        as="div"
        duration={Math.floor(Math.random() * 10000) + 10000}
        className="flex-col items-start text-left p-5 md:p-8 lg:p-10 gap-7"
      >
        <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-xs font-semibold text-emerald-300">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          Available on {gig.platform}
        </span>

        <div className="space-y-3">
          <h4 className="text-xl md:text-2xl lg:text-3xl font-extrabold">
            <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
              {gig.title}
            </span>
          </h4>
          <p className="text-white/80 text-base md:text-lg max-w-3xl">{gig.tagline}</p>
          <p className="text-white/50 text-sm">
            Built with <span className="text-white/70 font-medium">{gig.stack}</span>
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 w-full">
          <div>
            <Label>What you get</Label>
            <BulletList items={gig.deliverables} />
          </div>
          <div className="space-y-7">
            <div>
              <Label>Great for</Label>
              <BulletList items={gig.idealFor} />
            </div>
            <div>
              <Label>Why me</Label>
              <BulletList items={gig.whyMe} />
            </div>
          </div>
        </div>

        {examples.length > 0 && (
          <div>
            <Label>Systems I&apos;ve built</Label>
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
      </Sparkle>

      <div>
        <Label>Packages</Label>
        <div className="grid gap-4 lg:gap-6 md:grid-cols-3">
          {gig.packages.map((pkg) => (
            <div
              key={pkg.name}
              className="flex flex-col rounded-3xl border border-white/10 bg-white/[0.03] p-6 transition-all duration-300 hover:border-violet-500/30 hover:bg-white/[0.05]"
            >
              <p className="text-sm font-semibold text-violet-300">{pkg.name}</p>
              <p className="mt-2 text-4xl font-extrabold">
                ${pkg.price}
                <span className="ml-1 text-sm font-medium text-white/40">USD</span>
              </p>
              <p className="mt-2 text-xs font-semibold text-white/50">
                {pkg.deliveryDays}-day delivery · {pkg.revisions} revisions
              </p>
              <p className="mt-4 text-sm text-white/60">{pkg.summary}</p>
              <ul className="mt-5 space-y-2 text-sm text-white/75">
                {pkg.includes.map((item) => (
                  <li key={item} className="flex gap-2.5">
                    <span aria-hidden="true" className="text-violet-400">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p className="mt-4 text-xs text-white/45">{gig.packageNote}</p>
      </div>

      <div>
        <Label>Common questions</Label>
        <div className="rounded-3xl border border-white/10 bg-white/[0.03] divide-y divide-white/10 overflow-hidden">
          {gig.faqs.map(({ question, answer }) => (
            <details key={question} className="group px-5 md:px-6">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 text-left font-semibold text-white/85 focus:outline-none focus-visible:text-violet-300 [&::-webkit-details-marker]:hidden">
                {question}
                <span
                  aria-hidden="true"
                  className="shrink-0 text-violet-300 transition-transform duration-300 group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="pb-5 text-white/65 leading-relaxed">{answer}</p>
            </details>
          ))}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center gap-3">
        <a
          href={gig.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-violet-500/20 border border-violet-500/40 text-violet-100 font-semibold hover:bg-violet-500/30 transition-all hover:scale-[1.03] focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400"
        >
          <img src="/assets/fiverr.svg" alt="" aria-hidden="true" className="w-4 h-4" />
          View gig on {gig.platform} ↗
        </a>
        <p className="text-xs text-white/45">Not sure which package fits? Message me before ordering.</p>
      </div>
    </div>
  );
};

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

    <div className="mt-12 space-y-16">
      {gigs.map((gig) => (
        <GigCard key={gig.id} gig={gig} />
      ))}
    </div>
  </section>
);

export default Gigs;
