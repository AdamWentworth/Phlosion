import { readFile } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const publicDir = path.join(process.cwd(), 'public');
const brandDir = path.join(publicDir, 'brand');
const outputPath = path.join(brandDir, 'phlosion-social-card.png');

const width = 1200;
const height = 630;

function svg(strings, ...values) {
  return String.raw({ raw: strings }, ...values);
}

async function pngBuffer(relativePath, options) {
  return sharp(await readFile(path.join(brandDir, relativePath)))
    .resize({
      ...options,
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .png()
    .toBuffer();
}

const background = Buffer.from(svg`
  <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="ember" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(188 132) rotate(49) scale(474 408)">
        <stop stop-color="#FF5A00" stop-opacity="0.24"/>
        <stop offset="1" stop-color="#FFB41F" stop-opacity="0"/>
      </radialGradient>
      <radialGradient id="flare" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(963 156) rotate(128) scale(410 330)">
        <stop stop-color="#FFB41F" stop-opacity="0.13"/>
        <stop offset="1" stop-color="#FF5A00" stop-opacity="0"/>
      </radialGradient>
      <linearGradient id="panel" x1="120" y1="96" x2="1080" y2="552" gradientUnits="userSpaceOnUse">
        <stop stop-color="#0B1C2D" stop-opacity="0.98"/>
        <stop offset="1" stop-color="#07111F" stop-opacity="0.98"/>
      </linearGradient>
      <linearGradient id="accent" x1="92" y1="526" x2="1108" y2="444" gradientUnits="userSpaceOnUse">
        <stop stop-color="#FF5A00"/>
        <stop offset="0.54" stop-color="#FFB41F"/>
        <stop offset="1" stop-color="#FF5A00"/>
      </linearGradient>
    </defs>
    <rect width="${width}" height="${height}" fill="#050B13"/>
    <rect width="${width}" height="${height}" fill="url(#ember)"/>
    <rect width="${width}" height="${height}" fill="url(#flare)"/>
    <rect x="72" y="70" width="1056" height="490" rx="28" fill="url(#panel)" stroke="#FFF2D8" stroke-opacity="0.15" stroke-width="2"/>
    <rect x="456" y="170" width="3" height="320" rx="1.5" fill="#FFF2D8" fill-opacity="0.12"/>
    <path d="M92 522C282 490 450 534 626 504C798 474 930 468 1108 500" stroke="url(#accent)" stroke-opacity="0.72" stroke-width="7" stroke-linecap="round"/>
    <path d="M92 536C284 504 456 548 634 518C806 488 936 482 1108 514" stroke="#FFF2D8" stroke-opacity="0.1" stroke-width="3" stroke-linecap="round"/>
    <text x="486" y="352" fill="#FF7B32" font-family="Inter, ui-sans-serif, system-ui, sans-serif" font-size="29" font-weight="900" letter-spacing="0">SOFTWARE PRODUCT LAB</text>
    <text x="486" y="414" fill="#F5F8FC" font-family="Arial, Helvetica, sans-serif" font-size="28" font-weight="700" letter-spacing="0">Product builds for services, AI systems,</text>
    <text x="486" y="456" fill="#F5F8FC" font-family="Arial, Helvetica, sans-serif" font-size="28" font-weight="700" letter-spacing="0">desktop tools, websites, and games.</text>
  </svg>
`);

const [mark, wordmark] = await Promise.all([
  pngBuffer('phlosion-mark.png', {
    width: 320,
    height: 320,
    fit: 'contain',
  }),
  pngBuffer('phlosion-wordmark-cream.png', {
    width: 610,
    height: 112,
    fit: 'contain',
  }),
]);

const card = await sharp(background)
  .composite([
    { input: mark, left: 112, top: 150 },
    { input: wordmark, left: 478, top: 190 },
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
