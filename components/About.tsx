import React from "react";
import { Sparkle } from "./ui/Sparkle";
import { myTechStack } from "@/data";
import Reveal from "./ui/Reveal";

const About = () => (
  <section id="about" className="py-20 w-full space-y-10">
    <Reveal>
      <h3 className="mb-10">
        About{' '}
        <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent">
          me.
        </span>
      </h3>
    </Reveal>
    <div className="sm:flex grid-cols-[2fr_1fr] gap-6 space-y-5 sm:space-y-0">
      <Sparkle
        duration={Math.floor(Math.random() * 10000) + 10000}
        className="flex-col text-left p-3 md:p-5 lg:p-10 gap-5 min-h-full"
      >
        <p className="text-white/80">
          Hey! I&apos;m Asif, a Fullstack Software Engineer currently building secure banking solutions at <span className="text-violet-300 font-semibold">Trust Bank PLC</span>. Previously at Opus Technology, where I delivered multiple enterprise-grade systems for the Bangladesh Police.
        </p>
        <p className="text-white/80">
          My core stack includes ASP.NET Core, Angular, Next.js, and SQL Server. I&apos;m passionate about crafting robust, scalable applications — and I&apos;m always exploring new technologies like Python and FastAPI.
        </p>
        <p className="text-white/80">
          Got something in mind or just want to chat? Whether it&apos;s a new project or a cool idea, I&apos;d love to
          connect — don&apos;t be shy!
        </p>
      </Sparkle>

      <div
        className="relative overflow-hidden rounded-3xl border border-white/[0.1] transition duration-200 shadow-input dark:shadow-none flex flex-col space-y-4 p-10"
      >
        <p className="text-lg lg:text-3xl font-extrabold">
          <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent">
            My tech Stack!
          </span>
        </p>

        <div className="flex flex-wrap gap-3 py-4">
          {myTechStack.map((skill) => (
            <div
              key={skill}
              className="bg-white/10 text-white text-sm font-semibold px-4 py-2 rounded-full shadow-lg hover:bg-violet-500/20 hover:border-violet-500/30 border border-transparent transition-all duration-300 ease-in-out hover:scale-105 cursor-default"
            >
              {skill}
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default About;
