"use client";

import { useState } from "react";
import { projects } from "@/data";
import { BentoGrid, BentoGridItem } from "./ui/BentoGrid";
import Reveal from "./ui/Reveal";
import { motion } from "framer-motion";

type FilterType = "all" | "personal" | "work";

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState<FilterType>("all");

  const filteredProjects =
    activeFilter === "all"
      ? projects
      : projects.filter((project) => project.type === activeFilter);

  const filters: { label: string; value: FilterType }[] = [
    { label: "All", value: "all" },
    { label: "Personal", value: "personal" },
    { label: "Work", value: "work" },
  ];

  return (
    <section id="projects" className="py-20">
      <Reveal>
        <h3>
          My{" "}
          <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent">
            Projects.
          </span>
        </h3>
      </Reveal>

      {/* Filter Tabs */}
      <div className="flex justify-center gap-2 mt-10">
        {filters.map(({ label, value }) => (
          <button
            key={value}
            onClick={() => setActiveFilter(value)}
            className={`relative px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${activeFilter === value
                ? "text-white"
                : "text-white/50 hover:text-white/80"
              }`}
          >
            {activeFilter === value && (
              <motion.div
                layoutId="activeFilter"
                className="absolute inset-0 bg-violet-500/20 border border-violet-500/30 rounded-full"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
            <span className="relative z-10">{label}</span>
          </button>
        ))}
      </div>

      <BentoGrid className="w-full py-12">
        {filteredProjects.map((item) => (
          <BentoGridItem key={item.id} {...item} />
        ))}
      </BentoGrid>
    </section>
  );
};

export default Projects;