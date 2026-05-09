import { readdir, rename, rm, stat } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const publicDir = path.join(process.cwd(), 'public');
const supportedExtensions = new Set(['.png']);
const skippedFiles = new Set(['public/products/pokemon-autochess/autochess-mark-alt-transparent.png']);

async function collectImages(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = await Promise.all(
    entries.map(async (entry) => {
      const fullPath = path.join(directory, entry.name);

      if (entry.isDirectory()) {
        return collectImages(fullPath);
      }

      if (entry.isFile() && supportedExtensions.has(path.extname(entry.name).toLowerCase())) {
        const relativePath = path.relative(process.cwd(), fullPath);

        if (skippedFiles.has(relativePath)) {
          return [];
        }

        return [fullPath];
      }

      return [];
    }),
  );

  return files.flat();
}

function formatBytes(bytes) {
  if (bytes < 1024) {
    return `${bytes} B`;
  }

  if (bytes < 1024 * 1024) {
    return `${(bytes / 1024).toFixed(1)} KB`;
  }

  return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
}

async function optimizePng(filePath) {
  const before = (await stat(filePath)).size;
  const tempPath = `${filePath}.optimized`;

  await sharp(filePath)
    .png({
      compressionLevel: 9,
      adaptiveFiltering: true,
      effort: 10,
    })
    .toFile(tempPath);

  const after = (await stat(tempPath)).size;

  if (after >= before) {
    await rm(tempPath);
    return { filePath, before, after: before, saved: 0, changed: false };
  }

  await rename(tempPath, filePath);
  return { filePath, before, after, saved: before - after, changed: true };
}

const images = await collectImages(publicDir);
const results = [];

for (const image of images) {
  results.push(await optimizePng(image));
}

const changed = results.filter((result) => result.changed);
const beforeTotal = results.reduce((sum, result) => sum + result.before, 0);
const afterTotal = results.reduce((sum, result) => sum + result.after, 0);

for (const result of changed) {
  const relativePath = path.relative(process.cwd(), result.filePath);
  console.log(`${relativePath}: ${formatBytes(result.before)} -> ${formatBytes(result.after)}`);
}

console.log(
  `Optimized ${changed.length}/${results.length} files: ${formatBytes(beforeTotal)} -> ${formatBytes(afterTotal)} (${formatBytes(
    beforeTotal - afterTotal,
  )} saved)`,
);
