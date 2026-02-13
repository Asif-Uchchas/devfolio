"use client";

import React from "react";
import { workExperience } from "@/data";
import { Sparkle } from "./ui/Sparkle";

const Experience = (): JSX.Element => (
  <section id="experience" className="sm:py-20 w-full">
    <h3 className="title">
      My{' '}
      <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent">
        experience.
      </span>
    </h3>

    <div className="w-full mt-12 relative">
      {/* Timeline connector line */}
      <div className="absolute left-6 md:left-8 top-0 bottom-0 w-[2px] bg-gradient-to-b from-violet-500/50 via-cyan-500/30 to-transparent hidden sm:block" />

      <div className="space-y-8">
        {workExperience.map(({ id, company, title, period, location, desc, skills, isCurrent }) => (
          <div key={id} className="relative">
            {/* Timeline dot */}
            <div className="absolute left-4 md:left-6 top-8 hidden sm:block z-10">
              <div className={`w-4 h-4 rounded-full border-2 ${isCurrent
                  ? "bg-emerald-400 border-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.5)]"
                  : "bg-violet-500 border-violet-500"
                }`} />
            </div>

            <div className="sm:ml-16">
              <Sparkle duration={Math.floor(Math.random() * 10000) + 10000}>
                <div className={`p-3 md:p-5 lg:p-10 ${isCurrent ? "ring-1 ring-violet-500/30 rounded-3xl" : ""}`}>
                  <div className="text-start">
                    <div className="flex justify-between items-start flex-wrap gap-2">
                      <div>
                        <div className="flex items-center gap-3">
                          <h3 className="text-justify text-lg lg:text-3xl font-extrabold">{company}</h3>
                          {isCurrent && (
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                              Current
                            </span>
                          )}
                        </div>
                        <p className="text-xl md:text-2xl font-bold mt-3">
                          <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
                            {title}
                          </span>
                        </p>
                      </div>

                      <div className="text-end opacity-80">
                        <p>{period}</p>
                        <p>{location}</p>
                      </div>
                    </div>

                    <p className="my-5 text-white/70">{desc}</p>

                    <div className="flex flex-wrap gap-2 mt-10">
                      {skills.map((skill: string) => (
                        <div
                          key={skill}
                          className="bg-white/10 text-sm font-semibold px-4 py-2 rounded-full shadow-lg hover:bg-violet-500/20 transition-all duration-300 ease-in-out border border-transparent hover:border-violet-500/30 hover:scale-105"
                        >
                          {skill}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Sparkle>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Experience;
