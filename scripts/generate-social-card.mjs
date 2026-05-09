import { readFile } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const publicDir = path.join(process.cwd(), 'public');
const outputPath = path.join(publicDir, 'social-card.png');

const width = 1200;
const height = 630;

function svg(strings, ...values) {
  return String.raw({ raw: strings }, ...values);
}

async function pngBuffer(relativePath, options) {
  return sharp(await readFile(path.join(publicDir, relativePath)))
    .resize(options)
    .png()
    .toBuffer();
}

const background = Buffer.from(svg`
  <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="ember" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(238 114) rotate(57) scale(430 360)">
        <stop stop-color="#FFB41F" stop-opacity="0.42"/>
        <stop offset="1" stop-color="#FFB41F" stop-opacity="0"/>
      </radialGradient>
      <radialGradient id="flare" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(963 156) rotate(128) scale(410 330)">
        <stop stop-color="#FF5A00" stop-opacity="0.26"/>
        <stop offset="1" stop-color="#FF5A00" stop-opacity="0"/>
      </radialGradient>
      <linearGradient id="panel" x1="120" y1="96" x2="1080" y2="552" gradientUnits="userSpaceOnUse">
        <stop stop-color="#FFFDF8" stop-opacity="0.94"/>
        <stop offset="1" stop-color="#FAECD3" stop-opacity="0.88"/>
      </linearGradient>
    </defs>
    <rect width="${width}" height="${height}" fill="#FEF8ED"/>
    <rect width="${width}" height="${height}" fill="url(#ember)"/>
    <rect width="${width}" height="${height}" fill="url(#flare)"/>
    <rect x="72" y="70" width="1056" height="490" rx="28" fill="url(#panel)" stroke="#E6C991" stroke-opacity="0.76" stroke-width="2"/>
    <path d="M88 512C276 480 440 528 612 496C796 462 920 378 1116 424" stroke="#FF5A00" stroke-opacity="0.18" stroke-width="18" stroke-linecap="round"/>
    <path d="M88 526C278 494 454 544 628 510C800 476 930 392 1116 438" stroke="#002B4F" stroke-opacity="0.13" stroke-width="10" stroke-linecap="round"/>
    <text x="402" y="356" fill="#C72916" font-family="Inter, ui-sans-serif, system-ui, sans-serif" font-size="31" font-weight="900" letter-spacing="0">SOFTWARE PRODUCT LAB</text>
    <text x="402" y="414" fill="#33485E" font-family="Inter, ui-sans-serif, system-ui, sans-serif" font-size="34" font-weight="760" letter-spacing="0">Apps, AI systems, tools, and games</text>
    <text x="402" y="460" fill="#33485E" font-family="Inter, ui-sans-serif, system-ui, sans-serif" font-size="34" font-weight="760" letter-spacing="0">built under one owned brand.</text>
  </svg>
`);

const [mark, wordmark] = await Promise.all([
  pngBuffer('phlosion-mark.png', {
    width: 260,
    height: 260,
    fit: 'contain',
  }),
  pngBuffer('phlosion-wordmark.png', {
    width: 640,
    height: 120,
    fit: 'contain',
  }),
]);

const card = await sharp(background)
  .composite([
    { input: mark, left: 124, top: 176 },
    { input: wordmark, left: 394, top: 190 },
  ])
  .png({
    compressionLevel: 9,
    adaptiveFiltering: true,
    effort: 10,
  })
  .toBuffer();

await sharp(card)
  .png({
    compressionLevel: 9,
    adaptiveFiltering: true,
    effort: 10,
  })
  .toFile(outputPath);

console.log(`Generated ${path.relative(process.cwd(), outputPath)}`);
