"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Reveal from "./ui/Reveal";
import { Socials } from "./ui/Socials";
import { contact } from "@/data";

type Channel = "email" | "whatsapp" | "telegram";

const channels: { value: Channel; label: string; icon: string; note: string }[] = [
  { value: "email", label: "Email", icon: "/assets/send.svg", note: "Opens your mail app with the message ready" },
  { value: "whatsapp", label: "WhatsApp", icon: "/assets/whatsapp.svg", note: "Opens WhatsApp with the message ready" },
  { value: "telegram", label: "Telegram", icon: "/assets/telegram.svg", note: "Copies the message, then opens the chat" },
];

const Contact = () => {
  const [channel, setChannel] = useState<Channel>("email");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [copied, setCopied] = useState<"email" | "message" | null>(null);

  const trimmedName = name.trim();
  const trimmedMessage = message.trim();

  const body = [
    trimmedName ? `Hi Asif — I'm ${trimmedName}.` : "Hi Asif,",
    "",
    trimmedMessage || "I came across your portfolio and would like to get in touch.",
  ].join("\n");

  const subject = trimmedName
    ? `Portfolio enquiry from ${trimmedName}`
    : "Enquiry from your portfolio";

  const flash = (what: "email" | "message") => {
    setCopied(what);
    setTimeout(() => setCopied(null), 2000);
  };

  const copy = async (text: string, what: "email" | "message") => {
    try {
      await navigator.clipboard.writeText(text);
      flash(what);
    } catch {
      // Clipboard is unavailable in insecure contexts and some in-app browsers.
      window.prompt("Copy this:", text);
    }
  };

  // Real anchors rather than window.open: a popup blocker will not swallow them,
  // they survive the await that a clipboard write would otherwise introduce, and
  // they can be right-clicked or copied like any other link.
  const href =
    channel === "email"
      ? `mailto:${contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
      : channel === "whatsapp"
        ? `https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(body)}`
        : `https://t.me/${contact.telegramHandle}`;

  // Telegram's t.me links cannot carry a prefilled message for a direct chat, so
  // the message goes to the clipboard as the link opens.
  const onSend = () => {
    if (channel !== "telegram") return;
    navigator.clipboard?.writeText(body).then(
      () => flash("message"),
      () => undefined
    );
  };

  const active = channels.find((c) => c.value === channel)!;

  return (
    <section className="w-full py-20 sm:py-32 flex justify-center items-center z-20" id="contact">
      <div className="flex flex-col items-center text-center w-full max-w-2xl">
        <Reveal>
          <h2>
            Contact{" "}
            <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent">
              me.
            </span>
          </h2>
        </Reveal>

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
          Let&apos;s build something amazing together — whether it&apos;s a project,
          collaboration, or just a conversation. Write a note and pick how you&apos;d like to
          send it.
        </p>

        <div className="mt-10 w-full rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-sm p-5 sm:p-8 text-left">
          <fieldset>
            <legend className="text-xs uppercase tracking-widest text-white/40 font-semibold mb-3">
              Send via
            </legend>
            <div className="grid grid-cols-3 gap-2">
              {channels.map(({ value, label, icon }) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setChannel(value)}
                  aria-pressed={channel === value}
                  className={`flex items-center justify-center gap-2 px-3 py-3 rounded-2xl border text-sm font-semibold transition-all duration-300 ${
                    channel === value
                      ? "bg-violet-500/20 border-violet-500/40 text-white"
                      : "bg-white/5 border-white/10 text-white/60 hover:text-white/90 hover:border-white/25"
                  }`}
                >
                  <img src={icon} alt="" aria-hidden="true" className="w-4 h-4" />
                  {label}
                </button>
              ))}
            </div>
          </fieldset>

          <div className="mt-6 space-y-4">
            <div>
              <label htmlFor="contact-name" className="block text-sm font-medium text-white/70 mb-2">
                Your name <span className="text-white/35">(optional)</span>
              </label>
              <input
                id="contact-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Jane Doe"
                className="w-full rounded-2xl bg-black/30 border border-white/10 px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-violet-500/50 transition-colors"
              />
            </div>

            <div>
              <label htmlFor="contact-message" className="block text-sm font-medium text-white/70 mb-2">
                Message
              </label>
              <textarea
                id="contact-message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={4}
                placeholder="I'd like to talk about…"
                className="w-full rounded-2xl bg-black/30 border border-white/10 px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-violet-500/50 transition-colors resize-y"
              />
            </div>
          </div>

          <div className="mt-6 flex flex-col sm:flex-row sm:items-center gap-3">
            <a
              href={href}
              onClick={onSend}
              {...(channel === "email"
                ? {}
                : { target: "_blank", rel: "noopener noreferrer" })}
              data-testid="send-link"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-violet-500/20 border border-violet-500/40 text-violet-100 font-semibold hover:bg-violet-500/30 transition-all hover:scale-[1.03] focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400"
            >
              <img src={active.icon} alt="" aria-hidden="true" className="w-4 h-4" />
              Send via {active.label}
            </a>
            <p className="text-xs text-white/45">{active.note}</p>
          </div>

          <div className="mt-6 pt-5 border-t border-white/10 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
            <span className="text-white/40">Prefer to copy?</span>
            <button
              type="button"
              onClick={() => copy(contact.email, "email")}
              className="text-violet-300 hover:text-violet-200 font-medium transition-colors"
            >
              {copied === "email" ? "Email copied ✓" : contact.email}
            </button>
            <span className="text-white/20">·</span>
            <a
              href={`https://wa.me/${contact.whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-violet-300 hover:text-violet-200 font-medium transition-colors"
            >
              {contact.whatsappDisplay}
            </a>
            {copied === "message" && (
              <span className="text-emerald-300 font-medium">Message copied ✓</span>
            )}
          </div>
        </div>

        <div className="mt-10">
          <p className="text-xs uppercase tracking-widest text-white/40 font-semibold mb-3">
            Or find me on
          </p>
          <Socials variant="all" size="lg" />
        </div>
      </div>
    </section>
  );
};

export default Contact;
