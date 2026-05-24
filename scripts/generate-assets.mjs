import sharp from "sharp";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PUBLIC = path.resolve(__dirname, "..", "public");
const SRC_ICON = path.join(PUBLIC, "favicon.svg");

const ICON_OUTPUTS = [
  { name: "icon-16.png", size: 16 },
  { name: "icon-32.png", size: 32 },
  { name: "icon-48.png", size: 48 },
  { name: "icon-180.png", size: 180 },
  { name: "icon-192.png", size: 192 },
  { name: "icon-512.png", size: 512 },
  { name: "apple-touch-icon.png", size: 180 },
];

async function generateIcons() {
  const svg = await fs.readFile(SRC_ICON);
  for (const { name, size } of ICON_OUTPUTS) {
    const out = path.join(PUBLIC, name);
    await sharp(svg, { density: 300 })
      .resize(size, size)
      .png({ compressionLevel: 9 })
      .toFile(out);
    console.log(`  ✓ ${name} (${size}×${size})`);
  }
}

async function generateOgFallback() {
  const out = path.join(PUBLIC, "og-default.png");
  const host = (
    process.env.NEXT_PUBLIC_SITE_URL || "https://twitdownloader.app"
  )
    .replace(/^https?:\/\//, "")
    .replace(/\/$/, "");
  const svg = Buffer.from(`
    <svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="g1" cx="18%" cy="20%" r="60%">
          <stop offset="0%" stop-color="#d4ff3a" stop-opacity="0.18"/>
          <stop offset="100%" stop-color="#d4ff3a" stop-opacity="0"/>
        </radialGradient>
      </defs>
      <rect width="1200" height="630" fill="#0a0a0b"/>
      <rect width="1200" height="630" fill="url(#g1)"/>
      <g transform="translate(72, 72)">
        <rect x="0" y="0" width="44" height="44" rx="10" fill="#d4ff3a"/>
        <text x="22" y="32" font-family="serif" font-size="28" font-weight="700" fill="#0a0a0b" text-anchor="middle">X</text>
        <text x="60" y="32" font-family="sans-serif" font-size="28" font-weight="600" fill="#e8e6e2">TwitDownloader</text>
      </g>
      <text x="72" y="370" font-family="sans-serif" font-size="78" font-weight="500" fill="#fafaf7" letter-spacing="-2">Download Twitter (X)</text>
      <text x="72" y="450" font-family="sans-serif" font-size="78" font-weight="500" fill="#fafaf7" letter-spacing="-2">video, GIF, image online</text>
      <text x="72" y="510" font-family="sans-serif" font-size="30" fill="#8d8a82">Free. No sign-up. HD up to 1080p.</text>
      <g transform="translate(72, 560)">
        <circle cx="5" cy="5" r="5" fill="#d4ff3a"/>
        <text x="20" y="10" font-family="sans-serif" font-size="18" fill="#5a5751" letter-spacing="3">FREE · NO SIGN-UP · HD</text>
      </g>
      <text x="1128" y="570" font-family="sans-serif" font-size="22" fill="#8d8a82" text-anchor="end">${host}</text>
    </svg>
  `);
  await sharp(svg).png({ compressionLevel: 9 }).toFile(out);
  console.log(`  ✓ og-default.png (1200×630)`);
}

console.log("Generating assets...");
await generateIcons();
await generateOgFallback();
console.log("Done.");
