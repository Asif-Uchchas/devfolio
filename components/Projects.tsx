"use client";

import { projects } from "@/data";
import { BentoGrid, BentoGridItem } from "./ui/BentoGrid";
import Reveal from "./ui/Reveal";

const Projects = () => {
  const personalProjects = projects.filter((project) => project.type === 'personal');
  const workProjects = projects.filter((project) => project.type === 'work');

  return (
    <section id="projects" className="py-20">
      <Reveal>
         <h3>
          Personal{" "}
          <span className="bg-gradient-to-r from-primaryBlue to-secondaryBlue bg-clip-text text-transparent">
            Projects.</span>
        </h3>
      </Reveal>
      <BentoGrid className="w-full py-20">
        {personalProjects.map((item, i) => (
          <BentoGridItem
            key={item.id}
            {...item}
          />
        ))}
      </BentoGrid>

      <Reveal>
         <h3>
          Work{" "}
          <span className="bg-gradient-to-r from-primaryBlue to-secondaryBlue bg-clip-text text-transparent">
            Projects.</span>
        </h3>
      </Reveal>
      <BentoGrid className="w-full py-20">
        {workProjects.map((item, i) => (
          <BentoGridItem
            key={item.id}
            {...item}
          />
        ))}
      </BentoGrid>
    </section>
  );
};

export default Projects;