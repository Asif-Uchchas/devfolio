"use client";

import { projectGradients } from "@/data";
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

interface BentoGridItemProps {
  className?: string;
  id: number;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  link?: string;
  github?: string;
  gradient?: number;
  titleClassName?: string;
  techs?: string[];
}


export const BentoGridItem: React.FC<BentoGridItemProps> = ({
  className,
  id,
  title,
  description,
  link,
  github,
  gradient = 0,
  titleClassName,
  techs = [],
}) => (
  <div
    className={cn(
      "row-span-1 relative overflow-hidden rounded-3xl border border-white/10 group/bento hover:shadow-xl hover:shadow-violet-500/10 transition-all duration-500 flex flex-col space-y-4 hover:border-violet-500/30 hover:scale-[1.02]",
      className
    )}
  >
    <div className={cn(id === 6 && "flex justify-center", "h-full")}>
      {/* Gradient Background */}
      <div className={cn(
        "absolute inset-0 bg-gradient-to-br opacity-60 transition-opacity duration-500 group-hover/bento:opacity-90",
        projectGradients[gradient % projectGradients.length]
      )} />

      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.3)_1px,transparent_0)] bg-[size:24px_24px]" />

      <div className={cn(id === 5 && "w-full opacity-80", "absolute right-0 -bottom-5")} />

      <div
        className={cn(
          titleClassName,
          "group-hover/bento:translate-x-2 transition duration-200 relative md:h-full min-h-40 flex flex-col px-5 py-5 lg:py-10"
        )}
      >
        <div className="flex items-end gap-5">
          <div className="space-y-10">
            {github && (
              <a
                href={github}
                target="_blank"
                rel="noopener noreferrer"
                className="cursor-pointer"
              >
                <img
                  src="assets/git.svg"
                  alt="GitHub"
                  className="min-w-8 transform transition-all duration-300 ease-in-out hover:scale-110 hover:fill-red-600 mb-2"
                />
              </a>
            )}

            {link && (
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="cursor-pointer"
              >
                <img
                  src="assets/link.svg"
                  alt="External link"
                  className="min-w-8 transform transition-all duration-300 ease-in-out hover:scale-110 hover:fill-red-600 mb-2"
                />
              </a>
            )}
          </div>

          <div className="space-y-6">
            <p className="text-lg lg:text-3xl max-w-96 font-bold z-10">{title}</p>
            <p className="font-extralight md:max-w-[80%] md:text-xs lg:text-base text-sm z-10 opacity-70">
              {description}
            </p>

            <div className="flex flex-wrap gap-2 py-1">
              {techs.map((tech) => (
                <div
                  key={tech}
                  className="bg-white/10 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg hover:bg-white/20 transition duration-200 ease-in-out border border-white/5"
                >
                  {tech}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
