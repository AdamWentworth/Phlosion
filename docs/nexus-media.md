# PokeGo Nexus showcase media

The active showcase package lives in
`public/products/pokemon-go-nexus/demo/migration-preview/`. Its `manifest.json`
identifies the capture revision, uncommitted source fingerprint, production web
build, synthetic data, route coverage, viewport sizes, and asset checksums.

Generate a new package from the PokeGoNexus checkout:

```sh
cd /path/to/PokeGoNexus/frontend
npm run capture:demo:branch --workspace apps/web
```

Read `apps/web/.artifacts/branch-media/latest-package.txt`, then import that package
from this repository:

```sh
npm run import:nexus:media -- /absolute/path/from/latest-package.txt
npm run test:e2e -- tests/e2e/nexus-media.spec.ts tests/e2e/product-showcase.spec.ts
```

The importer verifies checksums before replacing the preview folder and preserves
any previous preview under `.artifacts/nexus-import/`. It also updates
`nexusMediaRevision.ts` so image optimization and browser caches request the new
revision of each asset. The older live-account demo assets remain in the parent
`demo/` directory. Only the migration preview package
is referenced by the current Nexus configuration.

Restart an already running preview after import; the Next.js image allowlist reads
the generated revision when the server starts.

The showcase offers 13 feature clips and a gallery covering all main routes in
dark/light desktop/mobile layouts. Gallery selection uses a dropdown so reference,
recovery, and legal screens remain accessible without filling the page with tabs.
The media test verifies every referenced asset against the manifest, plays every
clip in both themes at each viewport, and opens every gallery selection.

This is responsive web footage from the native migration branch with demo data.
It is not physical Android/iOS footage or evidence that native release gates have
passed. Keep that distinction in the product copy when replacing this package.
