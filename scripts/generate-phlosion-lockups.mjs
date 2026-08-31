import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const root = process.cwd();
const publicDir = path.join(root, 'public');
const brandDir = path.join(publicDir, 'brand');

const markPath = path.join(brandDir, 'phlosion-mark.png');
const wordmarkPath = path.join(brandDir, 'phlosion-wordmark-blue.png');

const canvas = { width: 1536, height: 587 };
const colors = {
  blue: { r: 1, g: 41, b: 105 },
  cream: { r: 251, g: 242, b: 218 },
};

function isOrangeAccent(red, green, blue) {
  return red > 120 && red > green * 1.25 && blue < 100;
}

async function recolorWordmark(source, color) {
  const { data, info } = await sharp(source).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const pixels = Buffer.from(data);

  for (let index = 0; index < pixels.length; index += 4) {
    if (pixels[index + 3] === 0 || isOrangeAccent(pixels[index], pixels[index + 1], pixels[index + 2])) {
      continue;
    }

    pixels[index] = color.r;
    pixels[index + 1] = color.g;
    pixels[index + 2] = color.b;
  }

  return sharp(pixels, { raw: info }).png({ compressionLevel: 9, adaptiveFiltering: true, effort: 10 }).toBuffer();
}

async function fitTransparent(source, size) {
  return sharp(source)
    .trim()
    .resize({ ...size, fit: 'inside', withoutEnlargement: false })
    .png({ compressionLevel: 9, adaptiveFiltering: true, effort: 10 })
    .toBuffer({ resolveWithObject: true });
}

async function composeLockup(mark, wordmark) {
  const fittedMark = await fitTransparent(mark, { width: 570, height: 570 });
  const fittedWordmark = await fitTransparent(wordmark, { width: 920, height: 180 });

  return sharp({
    create: {
      ...canvas,
      channels: 4,
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    },
  })
    .composite([
      {
        input: fittedMark.data,
        left: 16,
        top: Math.round((canvas.height - fittedMark.info.height) / 2),
      },
      {
        input: fittedWordmark.data,
        left: 600,
        top: Math.round((canvas.height - fittedWordmark.info.height) / 2),
      },
    ])
    .png({ compressionLevel: 9, adaptiveFiltering: true, effort: 10 })
    .toBuffer();
}

await mkdir(brandDir, { recursive: true });

const [mark, wordmarkSource] = await Promise.all([readFile(markPath), readFile(wordmarkPath)]);
const [blueWordmark, creamWordmark] = await Promise.all([
  recolorWordmark(wordmarkSource, colors.blue),
  recolorWordmark(wordmarkSource, colors.cream),
]);
const [blueLockup, creamLockup] = await Promise.all([
  composeLockup(mark, blueWordmark),
  composeLockup(mark, creamWordmark),
]);

await Promise.all([
  writeFile(wordmarkPath, blueWordmark),
  writeFile(path.join(brandDir, 'phlosion-wordmark-cream.png'), creamWordmark),
  writeFile(path.join(brandDir, 'phlosion-lockup-horizontal-blue.png'), blueLockup),
  writeFile(path.join(brandDir, 'phlosion-lockup-horizontal-cream.png'), creamLockup),
]);

console.log('Generated Phlosion blue and cream wordmark/lockup variants.');
