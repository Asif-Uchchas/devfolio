"use client";

import React from "react";
import { socialMedia } from "@/data";

interface SocialsProps {
  /** The floating bar only has room for the main few. */
  variant?: "primary" | "all";
  size?: "sm" | "lg";
}

export const Socials = ({ variant = "primary", size = "sm" }: SocialsProps): JSX.Element => {
  const links = variant === "all" ? socialMedia : socialMedia.filter((s) => s.primary);
  const box = size === "lg" ? "w-12 h-12" : "w-10 h-10";
  const icon = size === "lg" ? 24 : 20;

  return (
    <div className="flex items-center justify-center flex-wrap gap-1">
      {links.map(({ id, link, img, name }) => (
        <a
          key={id}
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          title={name}
          aria-label={name}
          className={`${box} cursor-pointer flex justify-center items-center rounded-full transform transition-all duration-300 ease-in-out hover:scale-110 hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400`}
        >
          <img src={img} alt="" aria-hidden="true" width={icon} height={icon} />
        </a>
      ))}
    </div>
  );
};
