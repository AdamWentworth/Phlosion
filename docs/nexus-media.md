# PokeGo Nexus showcase media

The active package is `public/products/pokemon-go-nexus/demo/migration-preview/`.
Its manifest identifies the migration checkout, uncommitted source fingerprint,
production web build, live account data, route coverage, viewports, and asset checksums.

Sign in and capture from the PokeGoNexus checkout:

```sh
cd /path/to/PokeGoNexus/frontend
npm run capture:demo:account:login --workspace apps/web
npm run capture:demo:account --workspace apps/web
```

The terminal prompts for the account and hides the password. The sign-in script
saves an ignored, owner-readable browser session in
`apps/web/.artifacts/account-media/auth-state.json`; credentials and session files
must never enter the media package. The capture command prompts for sign-in itself
when no saved session exists. Use `-- --login` to switch accounts.

The recorder serves the current production web build at the canonical app origin
inside its browser. It reads live services with that account, loads the checkout’s
artwork, and preserves real public share URLs. Account, collection, and trade writes
are blocked; authentication refresh is allowed. Account-screen email addresses and the signed-in trainer card’s private code
and location are hidden before recording. Public and recovery routes use a separate guest context.

Read `apps/web/.artifacts/account-media/latest-package.txt`, then import that package
from this repository:

```sh
npm run import:nexus:media -- /absolute/path/from/latest-package.txt
npm run verify
npm run test:e2e -- tests/e2e/nexus-media.spec.ts tests/e2e/product-showcase.spec.ts
```

The importer requires all 56 scenarios (14 flows × two themes × two viewports),
checksums, route coverage, and paired catalog/personal Raid, Max, and PvP views.
It preserves the previous package under `.artifacts/nexus-import/` and generates
`nexusCaptureScreens.ts` from screenshots available in every layout and theme.
The gallery puts the overall/personal comparisons together. Reference, recovery,
and legal screens remain available in the selector.

`nexusMediaRevision.ts` updates image and video URLs to bypass stale caches.
Restart any running preview after importing: the Next.js image allowlist reads
this revision at startup. The older demos in the parent `demo/` directory are
retained; the active Nexus configuration uses only this verified package.

There are 13 feature videos per theme/viewport. The recorder pauses across route
loads and resumes once visible artwork and content are ready, while preserving
interactions within each feature. Encoding leaves browser request handling active
so authentication can refresh. Interrupted runs can resume with `--resume` and the
run directory; the importer requires every attempt to share the same app source
and production build. Each flow retains its own capture-script provenance. The media test verifies referenced asset hashes,
plays every clip in both themes and layouts, and opens every gallery selection.

This is responsive web footage using a real account. It does not certify physical
Android/iOS behavior or completion of the native release checks. Keep that
boundary explicit in product copy when replacing the package.
