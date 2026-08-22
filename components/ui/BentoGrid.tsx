"use client";

import Link from "next/link";
import { projectGradients } from "@/data";
import type { Project, ProjectStatus } from "@/data";
import { cn } from "@/lib/utils";

interface BentoGridProps {
  className?: string;
  children?: React.ReactNode;
}

export const BentoGrid: React.FC<BentoGridProps> = ({ className, children }) => (
  <div
    className={cn(
      "grid grid-cols-1 md:grid-cols-6 lg:grid-cols-5 md:grid-row-7 gap-4 lg:gap-8 mx-auto",
      className
    )}
  >
    {children}
  </div>
);

const statusLabels: Record<ProjectStatus, string> = {
  live: "Live",
  internal: "Internal",
  archived: "Archived",
};

const statusStyles: Record<ProjectStatus, string> = {
  live: "bg-emerald-500/10 border-emerald-500/30 text-emerald-300",
  internal: "bg-white/5 border-white/15 text-white/60",
  archived: "bg-white/5 border-white/15 text-white/50",
};

export const StatusBadge = ({ status }: { status: ProjectStatus }) => (
  <span
    className={cn(
      "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[11px] font-semibold tracking-wide uppercase",
      statusStyles[status]
    )}
  >
    {status === "live" && (
      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
    )}
    {statusLabels[status]}
  </span>
);

export const BentoGridItem: React.FC<Project> = ({
  className,
  slug,
  title,
  description,
  cover,
  coverAlt,
  status,
  year,
  gradient = 0,
  titleClassName,
  github,
  live,
  techs = [],
}) => (
  <div
    className={cn(
      "row-span-1 relative overflow-hidden rounded-3xl border border-white/10 group/bento hover:shadow-xl hover:shadow-violet-500/10 transition-all duration-500 flex flex-col hover:border-violet-500/30 hover:scale-[1.02] focus-within:border-violet-500/40",
      className
    )}
  >
    {/* Cover art sits behind everything, dimmed so text stays readable. */}
    <img
      src={cover}
      alt={coverAlt}
      loading="lazy"
      className="absolute inset-0 h-full w-full object-cover object-top opacity-70 group-hover/bento:opacity-90 group-hover/bento:scale-105 transition-all duration-700"
    />

    <div
      className={cn(
        "absolute inset-0 bg-gradient-to-br opacity-30 transition-opacity duration-500 group-hover/bento:opacity-40",
        projectGradients[gradient % projectGradients.length]
      )}
    />
    {/* Bottom scrim keeps the copy legible over any cover. */}
    <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/75 to-black/20" />
    <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.3)_1px,transparent_0)] bg-[size:24px_24px]" />

    {/* Full-card click target. Kept as a sibling so the external links below
        are never nested inside another anchor. */}
    <Link
      href={`/projects/${slug}`}
      aria-label={`View ${title} case study`}
      className="absolute inset-0 z-20 rounded-3xl focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400"
    />

    <div
      className={cn(
        titleClassName,
        "relative z-10 md:h-full min-h-56 flex flex-col justify-end gap-4 px-5 py-5 lg:py-8 group-hover/bento:translate-x-1 transition duration-300"
      )}
    >
      <div className="flex items-center gap-2 flex-wrap">
        <StatusBadge status={status} />
        <span className="text-[11px] font-semibold text-white/50 tracking-wide">{year}</span>
      </div>

      <p className="text-lg lg:text-2xl max-w-96 font-bold">{title}</p>
      <p className="font-extralight md:max-w-[90%] md:text-xs lg:text-sm text-sm opacity-75">
        {description}
      </p>

      <div className="flex flex-wrap gap-2">
        {techs.map((tech) => (
          <div
            key={tech}
            className="bg-white/10 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg border border-white/5"
          >
            {tech}
          </div>
        ))}
      </div>

      <div className="flex items-center gap-3 pt-1">
        <span className="text-sm font-semibold text-violet-300 group-hover/bento:text-violet-200 transition-colors">
          View details →
        </span>
      </div>
    </div>

    {/* Raised above the card-wide link so these stay independently clickable. */}
    {(github || live) && (
      <div className="absolute top-5 right-5 z-30 flex items-center gap-2">
        {github && (
          <a
            href={github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${title} source on GitHub`}
            className="p-2 rounded-full bg-black/50 backdrop-blur-sm border border-white/10 hover:border-violet-400/50 hover:bg-black/70 transition-all duration-200 hover:scale-110"
          >
            <img src="/assets/git.svg" alt="" aria-hidden="true" className="w-5 h-5" />
          </a>
        )}
        {live && (
          <a
            href={live}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${title} live site`}
            className="p-2 rounded-full bg-black/50 backdrop-blur-sm border border-white/10 hover:border-violet-400/50 hover:bg-black/70 transition-all duration-200 hover:scale-110"
          >
            <img src="/assets/link.svg" alt="" aria-hidden="true" className="w-5 h-5" />
          </a>
        )}
      </div>
    )}
  </div>
);
