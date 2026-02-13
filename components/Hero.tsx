"use client";

import { useEffect, useState } from "react";
import Button from "./ui/Button";
import Reveal from "./ui/Reveal";
import { Spotlight } from "./ui/Spotlight";
import { motion } from "framer-motion";

const roles = [
  "Junior Software Engineer",
  "Fullstack Developer",
  "Problem Solver",
];

const Hero = () => {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentRole = roles[roleIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (!isDeleting && displayText === currentRole) {
      timeout = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && displayText === "") {
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % roles.length);
    } else {
      const speed = isDeleting ? 40 : 80;
      timeout = setTimeout(() => {
        setDisplayText(
          isDeleting
            ? currentRole.substring(0, displayText.length - 1)
            : currentRole.substring(0, displayText.length + 1)
        );
      }, speed);
    }

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, roleIndex]);

  return (
    <div className="pb-20 pt-36 relative">
      <div>
        <Spotlight
          className="-top-40 -left-10 md:-left-32 md:-top-20 h-screen"
          fill="white"
        />
        <Spotlight
          className="h-[100vh] w-[50vw] top-10 left-full"
          fill="secondaryBlue"
        />
        <Spotlight className="left-80 top-28 h-[100vh] w-[50vw]" fill="secondaryBlue" />
      </div>
      <div className="text-center my-20 mx-auto max-w-[900px] justify-center flex flex-col ">
        {/* Current company badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mx-auto mb-6"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-violet-500/30 bg-violet-500/10 backdrop-blur-sm text-sm font-medium text-violet-300">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Currently at Trust Bank PLC
          </span>
        </motion.div>

        <Reveal>
          <h1 className="text-center text-4xl md:text-6xl lg:text-8xl font-extrabold">
            Hey, I&apos;m {''}
            <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent">
              Asif Uddin Ahmed!
            </span>
          </h1>
        </Reveal>

        <div className="my-6 h-[48px] md:h-[56px] lg:h-[72px] flex items-center justify-center">
          <h2 className="title text-xl md:text-3xl lg:text-5xl">
            I&apos;m a{" "}
            <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
              {displayText}
            </span>
            <span className="inline-block w-[3px] h-[1em] bg-violet-400 ml-1 animate-typing-cursor align-middle" />
          </h2>
        </div>

        <p className="max-w-[700px] mx-auto text-white/70">
          Fullstack Software Engineer at <span className="text-violet-300 font-semibold">Trust Bank PLC</span>, building secure
          banking solutions. Experienced with ASP.NET Core, Angular, Next.js, and SQL Server — delivering
          high-traffic, user-friendly web applications.
        </p>
        <a className="mt-10 mx-auto" href="#contact">
          <Button
            title="Contact me"
            icon={<img src="assets/send.svg" />}
            position="right"
          />
        </a>
      </div>
    </div>
  );
};

export default Hero;
