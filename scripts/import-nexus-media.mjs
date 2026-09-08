import fs from 'node:fs';
import path from 'node:path';
import { createHash } from 'node:crypto';
import { format, resolveConfig } from 'prettier';

const repo = path.resolve(import.meta.dirname, '..');
const input = process.argv[2];
if (!input) throw new Error('Usage: npm run import:nexus:media -- /absolute/path/to/package');
const source = path.resolve(input);
const manifest = JSON.parse(fs.readFileSync(path.join(source, 'manifest.json'), 'utf8'));
if (
  manifest.schemaVersion !== 1 ||
  manifest.renderer !== 'responsive-web' ||
  manifest.dataMode !== 'live-account' ||
  manifest.flows?.length !== 56
) {
  throw new Error(
    'Expected a complete live-account responsive web capture package. Run capture:demo:account in PokeGoNexus.',
  );
}
if (manifest.flows.some((flow) => flow.runtimeErrors.length)) throw new Error('Capture contains runtime errors.');
if (manifest.dataMode === 'live-account' && manifest.fullCoverage !== true) {
  throw new Error('Account media must pass the complete route coverage check.');
}
const attempts = manifest.captureAttempts ?? [];
if (
  !attempts.length ||
  attempts.some(
    (attempt) =>
      attempt.appSourceSha256 !== manifest.source.appSourceSha256 || attempt.buildSha256 !== manifest.buildSha256,
  )
) {
  throw new Error('All capture attempts must use the same app source and production build.');
}
if (manifest.flows.some((flow) => !attempts.some((attempt) => attempt.sourceSha256 === flow.sourceSha256))) {
  throw new Error('A capture flow has no matching source provenance.');
}
const combinations = ['dark-desktop', 'dark-mobile', 'light-desktop', 'light-mobile'];
const requiredFlows = [
  'account',
  'collection',
  'guide',
  'home',
  'max',
  'pokedex',
  'pvp',
  'raid',
  'rankings',
  'references',
  'search',
  'social',
  'trade-board',
  'trades',
];
for (const combination of combinations) {
  const entries = manifest.flows.filter((flow) => `${flow.theme}-${flow.viewport}` === combination);
  if (
    entries.length !== requiredFlows.length ||
    requiredFlows.some((key) => entries.filter((flow) => flow.flow === key).length !== 1)
  ) {
    throw new Error(`Incomplete feature coverage: ${combination}`);
  }
  if (manifest.dataMode === 'live-account') {
    const shots = entries.flatMap((flow) => flow.shots);
    for (const [key, scope] of Object.entries({
      raid: 'catalog',
      'raid-owned': 'owned',
      'raid-counters': 'catalog',
      'raid-owned-counters': 'owned',
      max: 'catalog',
      'max-owned': 'owned',
      'max-boss-teams': 'catalog',
      'max-owned-party': 'owned',
      pvp: 'catalog',
      'pvp-owned': 'owned',
      'pvp-team-builder': 'catalog',
      'pvp-owned-team-builder': 'owned',
      'pvp-battle': 'catalog',
      'pvp-owned-battle': 'owned',
      'pvp-iv-rank': 'catalog',
      'pvp-owned-iv-rank': 'owned',
    })) {
      if (!shots.some((shot) => shot.key === key && shot.scope === scope))
        throw new Error(`Missing ${scope} comparison: ${key}/${combination}`);
    }
  }
}
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

for (const flow of manifest.flows) {
  for (const shot of flow.shots) {
    if (!filenames.has(shot.file)) throw new Error(`Screenshot missing from package: ${shot.file}`);
  }
  if (flow.video && !filenames.has(flow.video)) throw new Error(`Video missing from package: ${flow.video}`);
  if (flow.video) {
    const poster = flow.video.replace(/^videos\//, 'posters/').replace(/\.webm$/, '.webp');
    if (!filenames.has(poster)) throw new Error(`Poster missing from package: ${poster}`);
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
if (manifest.dataMode === 'live-account') {
  const screensByCombination = combinations.map((combination) =>
    manifest.flows
      .filter((flow) => `${flow.theme}-${flow.viewport}` === combination)
      .flatMap((flow) => flow.shots.map((shot) => ({ ...shot, group: flow.label }))),
  );
  const preferred = [
    'collection-favorites',
    'collection',
    'instance-overlay',
    'raid',
    'raid-owned',
    'raid-counters',
    'raid-owned-counters',
    'max',
    'max-owned',
    'max-boss-teams',
    'max-owned-party',
    'pvp',
    'pvp-owned',
    'pvp-team-builder',
    'pvp-owned-team-builder',
    'pvp-team-results',
    'pvp-owned-team-results',
    'pvp-battle',
    'pvp-owned-battle',
    'pvp-iv-rank',
    'pvp-owned-iv-rank',
    'pokedex',
    'search-results-map',
  ];
  const common = screensByCombination[0].filter((shot) =>
    screensByCombination.every((shots) => shots.some((candidate) => candidate.key === shot.key)),
  );
  const byKey = new Map(common.map((shot) => [shot.key, shot]));
  const ordered = [
    ...preferred.filter((key) => byKey.has(key)),
    ...common.map((shot) => shot.key).filter((key) => !preferred.includes(key) && key !== 'public-trade-board'),
    ...(byKey.has('public-trade-board') ? ['public-trade-board'] : []),
  ];
  const screens = ordered.map((key) => ({
    id: key,
    label: byKey.get(key).label,
    imageKey: key,
    group: byKey.get(key).group,
  }));
  fs.writeFileSync(
    path.join(repo, 'src/lib/nexusCaptureScreens.ts'),
    await format(
      `// Generated from the verified account capture package.\nexport const nexusCaptureScreens = ${JSON.stringify(screens, null, 2)};\n`,
      { ...(await resolveConfig(path.join(repo, 'src/lib/nexusCaptureScreens.ts'))), parser: 'typescript' },
    ),
  );
}
console.log(
  `Imported ${filenames.size} verified assets from ${manifest.source.branch} (${manifest.source.commit.slice(0, 8)}).`,
);
