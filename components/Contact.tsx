"use client";

import { motion } from "framer-motion";
import Button from "./ui/Button";
import Reveal from "./ui/Reveal";

const Contact = () => {
  return (
    <section className="w-full py-20 sm:py-40 justify-center flex items-center z-20" id="contact">
      <div className="flex flex-col items-center text-center">
        <Reveal>
          <h2>
            Contact <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent">
              me.</span>
          </h2>
        </Reveal>

        {/* Available badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-8"
        >
          <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 backdrop-blur-sm text-sm font-medium text-emerald-300 animate-glow-pulse">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Open to new opportunities
          </span>
        </motion.div>

        <p className="mt-6 max-w-md text-white/60 text-base">
          Let&apos;s build something amazing together — whether it&apos;s a project, collaboration, or just a conversation.
        </p>

        <a className="mt-8" href="mailto:asifuchchas123@gmail.com">
          <Button
            title="Let's connect"
            icon={<img src="/assets/send.svg" />}
            position="right"
          />
        </a>
      </div>
    </section>
  );
};

export default Contact;
