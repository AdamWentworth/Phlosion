import fs from 'node:fs';
import path from 'node:path';
import { createHash } from 'node:crypto';

const repo = path.resolve(import.meta.dirname, '..');
const input = process.argv[2];
if (!input) throw new Error('Usage: npm run import:nexus:media -- /absolute/path/to/package');
const source = path.resolve(input);
const manifest = JSON.parse(fs.readFileSync(path.join(source, 'manifest.json'), 'utf8'));
if (manifest.schemaVersion !== 1 || manifest.renderer !== 'responsive-web' || manifest.flows?.length !== 56) {
  throw new Error('Expected a complete responsive web capture package.');
}
if (manifest.flows.some((flow) => flow.runtimeErrors.length)) throw new Error('Capture contains runtime errors.');
const filenames = new Set();
for (const asset of manifest.assets) {
  if (!/^(videos|posters|screenshots)\/[a-z0-9-]+\.(webm|webp)$/.test(asset.file) || filenames.has(asset.file)) {
    throw new Error(`Invalid or duplicate package path: ${asset.file}`);
  }
  filenames.add(asset.file);
  const data = fs.readFileSync(path.join(source, asset.file));
  if (data.length !== asset.bytes || createHash('sha256').update(data).digest('hex') !== asset.sha256) {
    throw new Error(`Asset checksum mismatch: ${asset.file}`);
  }
}

const destination = path.join(repo, 'public/products/pokemon-go-nexus/demo/migration-preview');
const stamp = new Date().toISOString().replace(/[:.]/g, '-');
const stage = path.join(repo, '.artifacts/nexus-import', stamp);
fs.mkdirSync(stage, { recursive: true });
for (const file of [...filenames, 'manifest.json']) {
  fs.mkdirSync(path.dirname(path.join(stage, file)), { recursive: true });
  fs.copyFileSync(path.join(source, file), path.join(stage, file));
}
fs.mkdirSync(path.dirname(destination), { recursive: true });
if (fs.existsSync(destination)) {
  const backup = path.join(repo, '.artifacts/nexus-import', `${stamp}-previous`);
  fs.renameSync(destination, backup);
  console.log(`Previous preview preserved at ${backup}`);
}
fs.renameSync(stage, destination);
const revision = createHash('sha256').update(JSON.stringify(manifest)).digest('hex').slice(0, 16);
fs.writeFileSync(
  path.join(repo, 'src/lib/nexusMediaRevision.ts'),
  `// Updated by import:nexus:media after verifying the capture package.\nexport const nexusMediaRevision = '${revision}';\n`,
);
console.log(
  `Imported ${filenames.size} verified assets from ${manifest.source.branch} (${manifest.source.commit.slice(0, 8)}).`,
);
