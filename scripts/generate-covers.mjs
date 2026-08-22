/**
 * Generates abstract cover art for projects that have no real screenshot.
 * Deterministic: same slug always produces the same composition.
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const OUT = join(dirname(fileURLToPath(import.meta.url)), "..", "public", "assets", "covers");

const palettes = [
  ["#7c3aed", "#d946ef", "#22d3ee"],
  ["#10b981", "#2dd4bf", "#3b82f6"],
  ["#f97316", "#fb7185", "#a855f7"],
  ["#3b82f6", "#818cf8", "#8b5cf6"],
  ["#ec4899", "#f87171", "#eab308"],
  ["#06b6d4", "#60a5fa", "#6366f1"],
  ["#14b8a6", "#34d399", "#84cc16"],
  ["#f59e0b", "#fb923c", "#ef4444"],
  ["#6366f1", "#c084fc", "#ec4899"],
  ["#f43f5e", "#e879f9", "#8b5cf6"],
];

// deterministic PRNG so covers never change between runs
function rng(seed) {
  let h = 2166136261;
  for (const ch of seed) {
    h ^= ch.charCodeAt(0);
    h = Math.imul(h, 16777619);
  }
  return () => {
    h += 0x6d2b79f5;
    let t = h;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const W = 1200;
const H = 750;

function cover({ slug, monogram, gradient, motif }) {
  const [a, b, c] = palettes[gradient % palettes.length];
  const r = rng(slug);
  const glow = (cx, cy, rad, col, op) =>
    `<circle cx="${cx}" cy="${cy}" r="${rad}" fill="url(#g-${col.slice(1)})" opacity="${op}"/>`;

  // scattered geometry, seeded per project
  const shapes = [];
  for (let i = 0; i < 7; i++) {
    const x = 90 + r() * (W - 260);
    const y = 90 + r() * (H - 220);
    const s = 26 + r() * 92;
    const col = [a, b, c][Math.floor(r() * 3)];
    const op = (0.10 + r() * 0.20).toFixed(2);
    const rot = Math.floor(r() * 90);
    if (motif === "ring") {
      shapes.push(`<circle cx="${x.toFixed(0)}" cy="${y.toFixed(0)}" r="${(s / 2).toFixed(0)}" fill="none" stroke="${col}" stroke-width="${(1.5 + r() * 3).toFixed(1)}" opacity="${op}"/>`);
    } else if (motif === "bar") {
      shapes.push(`<rect x="${x.toFixed(0)}" y="${y.toFixed(0)}" width="${(s * 1.7).toFixed(0)}" height="${(10 + r() * 16).toFixed(0)}" rx="8" fill="${col}" opacity="${op}" transform="rotate(${rot} ${x.toFixed(0)} ${y.toFixed(0)})"/>`);
    } else if (motif === "grid") {
      shapes.push(`<rect x="${x.toFixed(0)}" y="${y.toFixed(0)}" width="${s.toFixed(0)}" height="${s.toFixed(0)}" rx="14" fill="none" stroke="${col}" stroke-width="2" opacity="${op}" transform="rotate(${rot} ${x.toFixed(0)} ${y.toFixed(0)})"/>`);
    } else {
      shapes.push(`<polygon points="${x.toFixed(0)},${y.toFixed(0)} ${(x + s).toFixed(0)},${(y + s * 0.35).toFixed(0)} ${(x + s * 0.4).toFixed(0)},${(y + s).toFixed(0)}" fill="${col}" opacity="${op}"/>`);
    }
  }

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-label="${slug} cover art">
  <defs>
    <radialGradient id="g-${a.slice(1)}"><stop offset="0%" stop-color="${a}" stop-opacity="0.85"/><stop offset="100%" stop-color="${a}" stop-opacity="0"/></radialGradient>
    <radialGradient id="g-${b.slice(1)}"><stop offset="0%" stop-color="${b}" stop-opacity="0.85"/><stop offset="100%" stop-color="${b}" stop-opacity="0"/></radialGradient>
    <radialGradient id="g-${c.slice(1)}"><stop offset="0%" stop-color="${c}" stop-opacity="0.85"/><stop offset="100%" stop-color="${c}" stop-opacity="0"/></radialGradient>
    <linearGradient id="txt-${slug}" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${a}"/><stop offset="55%" stop-color="${b}"/><stop offset="100%" stop-color="${c}"/>
    </linearGradient>
    <pattern id="dots-${slug}" width="26" height="26" patternUnits="userSpaceOnUse">
      <circle cx="1.5" cy="1.5" r="1.5" fill="#ffffff" opacity="0.16"/>
    </pattern>
  </defs>
  <rect width="${W}" height="${H}" fill="#07030f"/>
  ${glow(W * 0.16, H * 0.2, 430, a, 0.55)}
  ${glow(W * 0.86, H * 0.26, 380, c, 0.45)}
  ${glow(W * 0.52, H * 0.94, 420, b, 0.4)}
  <rect width="${W}" height="${H}" fill="url(#dots-${slug})"/>
  ${shapes.join("\n  ")}
  <text x="${W / 2}" y="${H / 2}" text-anchor="middle" dominant-baseline="central"
        font-family="ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Helvetica, Arial, sans-serif"
        font-size="230" font-weight="800" letter-spacing="10"
        fill="url(#txt-${slug})" opacity="0.92">${monogram}</text>
  <rect x="0.5" y="0.5" width="${W - 1}" height="${H - 1}" fill="none" stroke="#ffffff" stroke-opacity="0.09" rx="26"/>
</svg>`;
}

const specs = JSON.parse(process.argv[2]);
mkdirSync(OUT, { recursive: true });
for (const s of specs) {
  writeFileSync(join(OUT, `${s.slug}.svg`), cover(s));
  console.log("wrote", `${s.slug}.svg`);
}
