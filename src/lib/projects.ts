import { Bot, Disc3, Gamepad2, MapPinned, Music2, Swords, type LucideIcon } from 'lucide-react';

export type Project = {
  name: string;
  status: 'Active build' | 'Engine prototype' | 'Host-run system' | 'Packaged release';
  track: string;
  audience: string;
  labRole: string;
  labTrack: string;
  deliverySurface: string;
  productConstraint: string;
  summary: string;
  details: string;
  proof: {
    label: string;
    text: string;
  }[];
  repositorySignals: {
    label: string;
    text: string;
  }[];
  nextSteps: {
    label: string;
    text: string;
  }[];
  tags: string[];
  tagGroups?: TechTagGroup[];
  href: string;
  icon: LucideIcon;
  accent: 'nexus' | 'winrift' | 'jarvin' | 'cipher' | 'autochess' | 'trackextract';
  brand?: {
    alt: string;
    icon: string;
    iconFrame?: 'light' | 'dark';
    lockupFrame?: 'light' | 'dark';
    lockup?: string;
    rowLockup?: string;
    wordmark?: string;
    darkLockup?: string;
  };
  demo: {
    kind: 'nexus' | 'winrift' | 'jarvin' | 'cipher' | 'autochess' | 'trackextract';
    label: string;
    metric: string;
    summary: string;
    steps: string[];
    scenes?: {
      label: string;
      text: string;
    }[];
  };
};

export type TechTagGroup = {
  label: string;
  tags: string[];
};

const flattenTagGroups = (groups: TechTagGroup[]) => groups.flatMap((group) => group.tags);

const nexusTagGroups = [
  {
    label: 'Frontend',
    tags: ['React', 'TypeScript', 'Vite', 'Expo', 'Vitest'],
  },
  {
    label: 'Backend',
    tags: ['Go', 'net/http', 'chi', 'Fiber', 'Node', 'Express', 'MongoDB', 'Kafka', 'MySQL', 'Postgres/PostGIS'],
  },
  {
    label: 'Delivery',
    tags: ['Docker', 'NGINX', 'GitHub Actions'],
  },
] satisfies TechTagGroup[];

const winRiftTagGroups = [
  {
    label: 'Frontend',
    tags: ['React', 'TypeScript', 'Vite', 'TanStack Query', 'Vitest'],
  },
  {
    label: 'Core analytics',
    tags: ['Go', 'net/http', 'ClickHouse', 'Riot API'],
  },
  {
    label: 'Delivery',
    tags: ['Docker', 'GitHub Actions'],
  },
] satisfies TechTagGroup[];

const jarvinTagGroups = [
  {
    label: 'Host service',
    tags: ['Python', 'FastAPI', 'SQLite'],
  },
  {
    label: 'Local AI loop',
    tags: ['llama.cpp', 'Ollama', 'Whisper ASR'],
  },
  {
    label: 'Client surfaces',
    tags: ['React', 'Tauri'],
  },
] satisfies TechTagGroup[];

const trackExtractTagGroups = [
  {
    label: 'Desktop shell',
    tags: ['React', 'TypeScript', 'Vite', 'Tauri', 'Rust'],
  },
  {
    label: 'ML engine',
    tags: ['Python', 'Demucs', 'audio-separator', 'FFmpeg'],
  },
  {
    label: 'Workflow data',
    tags: ['JSON', 'Vitest', 'GitHub Actions'],
  },
] satisfies TechTagGroup[];

const cipherTagGroups = [
  {
    label: 'Desktop app',
    tags: ['.NET 10', 'AvaloniaUI', 'C#'],
  },
  {
    label: 'Game data',
    tags: ['GameCube ISO', 'Binary formats'],
  },
  {
    label: 'Release targets',
    tags: ['Windows', 'Linux', 'Release packaging'],
  },
] satisfies TechTagGroup[];

const autochessTagGroups = [
  {
    label: 'Runtime core',
    tags: ['C++20', 'CMake', 'vcpkg'],
  },
  {
    label: 'Platform + rendering',
    tags: ['SDL2', 'OpenGL', 'Direct3D 12'],
  },
  {
    label: 'Gameplay data',
    tags: ['Lua', 'sol2', 'JSON'],
  },
] satisfies TechTagGroup[];

const productOrder: Record<Project['demo']['kind'], number> = {
  nexus: 0,
  winrift: 1,
  trackextract: 2,
  autochess: 3,
  jarvin: 4,
  cipher: 5,
};

const productCatalog: Project[] = [
  {
    name: 'Pokemon Go Nexus',
    status: 'Active build',
    track: 'Full-stack collection and trade platform',
    audience: 'Pokemon Go collectors, traders, and local communities',
    labRole: 'Full-stack product platform',
    labTrack: 'Collection + trade app',
    deliverySurface:
      'React/Vite web app, Expo mobile path, auth, Pokemon API, users/search/events/location services, receiver/storage pipeline, and NGINX routing.',
    productConstraint:
      'Collection and trade software needs rich variant modeling, trusted account state, location-aware discovery, offline-friendly local storage, live sync, and deployment paths that can support hosted communities.',
    summary:
      'An active full-stack Pokemon Go platform for managing collections, browsing variants, finding trainers, proposing trades, and syncing updates across web/mobile clients and backend services.',
    details:
      'Nexus is built as a product system, not a single app screen: collection management, public trainer views, search/list/map discovery, trade lifecycle flows, cached Pokemon data, service-worker batching, offline cache hydration, Kafka-backed persistence, SSE updates, and production-oriented deployment work all sit in one monorepo.',
    proof: [
      {
        label: 'Product surface',
        text: 'The web app covers registration/login, account settings, collection browsing, Pokédex and owned-instance overlays, tag buckets, public trainer collections, search, map results, trade proposals, and trade status review.',
      },
      {
        label: 'Sync model',
        text: 'Client edits update local state, persist for offline recovery, queue receiver batches, flow through authenticated Go ingestion into Kafka/MySQL, then return through SSE and missed-update readers.',
      },
      {
        label: 'Service topology',
        text: 'Auth runs on Express/MongoDB; Pokemon data uses Go net/http plus chi over SQLite; users/search/events/receiver/storage/location services use Go, MySQL, Kafka, and PostGIS behind NGINX route namespaces.',
      },
      {
        label: 'Delivery discipline',
        text: 'The repo includes Docker/compose service boundaries, GitHub Actions CI/deploy workflows, Vitest and browser-proofing paths, service tests, health/readiness probes, metrics, Trivy/SBOM checks, and deployment notes.',
      },
    ],
    repositorySignals: [
      {
        label: 'Frontend workspace',
        text: 'The frontend is a workspace with React 19, TypeScript 6, Vite 8, Expo mobile work, shared contracts, shared UI tokens, SSE context, and Playwright/Vitest coverage.',
      },
      {
        label: 'Mobile path',
        text: 'The Expo React Native app consumes shared contracts and has shipped vertical slices for auth, trainer search, Pokemon catalog, collection editing, search, trades, account/register, and mutation sync.',
      },
      {
        label: 'Backend services',
        text: 'The backend combines the cached Go Pokemon API, hardened auth, user overview/public snapshots, trade/wanted search, location autocomplete/geocode/reverse lookup, receiver ingestion, storage persistence, and events streaming.',
      },
    ],
    nextSteps: [
      {
        label: 'Next build',
        text: 'The strongest next step is frontend product work: turning the existing service depth into a smoother collection, discovery, and trade-planning experience.',
      },
      {
        label: 'Expansion path',
        text: 'The backend can keep growing through paired service and interface features, such as community matching, notifications, calculators, and ranking signals.',
      },
      {
        label: 'Blocker',
        text: 'The backend is close to production-ready; the harder remaining work is time and a UI/UX layer that makes the complex data and trade flows feel clear enough to trust.',
      },
      {
        label: 'Release path',
        text: 'If the product becomes production viable, the deployment target should move from local server hardware toward cloud hosting with the existing CI/deploy workflow shape.',
      },
    ],
    tags: flattenTagGroups(nexusTagGroups),
    tagGroups: nexusTagGroups,
    href: 'https://github.com/AdamWentworth/Go',
    icon: MapPinned,
    accent: 'nexus',
    brand: {
      alt: 'Pokemon Go Nexus',
      icon: '/products/pokemon-go-nexus/nexus-logo.png',
      iconFrame: 'light',
      lockupFrame: 'dark',
      lockup: '/products/pokemon-go-nexus/nexus-lockup-with-mark-transparent.png',
      wordmark: '/products/pokemon-go-nexus/nexus-wordmark-transparent.png',
    },
    demo: {
      kind: 'nexus',
      label: 'App walkthrough',
      metric: 'App demo',
      summary:
        'A walkthrough surface for browsing a collection, searching Pokemon, inspecting map results, and reviewing account workflows.',
      steps: ['Open collection', 'Search and map', 'Inspect workflows'],
      scenes: [
        {
          label: 'Collection workspace',
          text: 'Browse variants, owned instances, caught/trade/wanted states, and tag-driven views.',
        },
        {
          label: 'Search and map',
          text: 'Switch between trainer search, Pokemon filters, list results, and map-backed discovery.',
        },
        {
          label: 'Workflow depth',
          text: 'Move through instance overlays, account lifecycle, edit surfaces, and trade-planning paths as the product grows.',
        },
      ],
    },
  },
  {
    name: 'WinRift',
    status: 'Active build',
    track: 'League build matchup analytics',
    audience: 'League of Legends ranked players, build researchers, and matchup-focused analysts',
    labRole: 'Full-stack analytics platform',
    labTrack: 'Game analytics app',
    deliverySurface:
      'React/Vite web app, Go API, Riot-aware collector worker, monitor process, ClickHouse schema/read models, Docker Compose stack, and private-LAN deployment flow.',
    productConstraint:
      'Game analytics software needs trustworthy collection, patch-aware storage, rate-limit discipline, fast read models, and UI that explains matchup-specific choices without pretending live data is deterministic coaching.',
    summary:
      'A full-stack League of Legends analytics rebuild for matchup-specific builds, champion guides, live match scouting, summoner profiles, tier lists, and win-condition analysis.',
    details:
      'WinRift collects Riot match and timeline payloads, normalizes builds and matchup context into ClickHouse, serves precomputed analytics through a Go API, and presents practical champion, rune, item, summoner, and live-game views in a React app.',
    proof: [
      {
        label: 'Product surface',
        text: 'The app supports universal champion/Riot ID lookup, champion guides, role-aware build advice, tier lists, summoner profiles, live match scouting, and win-condition reads.',
      },
      {
        label: 'Collection model',
        text: 'A Go worker collects Riot match, timeline, rank, and alias data with per-platform budgets, Retry-After backoff, auth-failure exits, and raw payload retention for current and recent patches.',
      },
      {
        label: 'Analytics store',
        text: 'ClickHouse stores raw payloads, normalized participants, matchups, events, and summary/read-model tables so older raw data can be archived while app-facing trends stay available.',
      },
      {
        label: 'Operations loop',
        text: 'Docker Compose runs ClickHouse, API, worker, monitor, and web surfaces; GitHub Actions builds core images, deploys to a private server, and keeps monitor/alerting paths documented.',
      },
    ],
    repositorySignals: [
      {
        label: 'Web workspace',
        text: 'The frontend uses React 19, TypeScript, Vite, TanStack Query, Vitest, Testing Library, and route performance smoke tests for champion, summoner, tier-list, and live-match flows.',
      },
      {
        label: 'Go core',
        text: 'The core workspace owns the API, collector worker, monitor, patch archive tool, Riot proxying, static-data cache, analytics endpoints, and ClickHouse integration.',
      },
      {
        label: 'Docs and safety',
        text: 'The repo includes architecture, Riot API behavior, data dictionary, collector runbook, ClickHouse queries, patch lifecycle, storage policy, policy-safe live UX, public readiness, and deployment notes.',
      },
    ],
    nextSteps: [
      {
        label: 'Next build',
        text: 'The strongest next step is validating worker health, email alerting, and collection quality against the production-style private server setup.',
      },
      {
        label: 'Analytics path',
        text: 'Tier-list and win-condition scoring should keep being tested against larger samples so the read models stay useful instead of merely decorative.',
      },
      {
        label: 'Frontend path',
        text: 'More smoke/e2e coverage around live-match and champion-guide flows would protect the most user-facing routes as the analytics surface grows.',
      },
      {
        label: 'Release path',
        text: 'Before any public API deployment, the project needs tighter public access policy, stronger auth boundaries, and a clear stance on Riot-owned assets and live-game UX.',
      },
    ],
    tags: flattenTagGroups(winRiftTagGroups),
    tagGroups: winRiftTagGroups,
    href: 'https://github.com/AdamWentworth/WinRift',
    icon: Swords,
    accent: 'winrift',
    brand: {
      alt: 'WinRift',
      icon: '/products/winrift/winrift-icon.png',
      iconFrame: 'dark',
      lockupFrame: 'dark',
      wordmark: '/products/winrift/winrift-wordmark.png',
      darkLockup: '/products/winrift/winrift-logo-tall-compact.png',
    },
    demo: {
      kind: 'winrift',
      label: 'Matchup analytics dashboard',
      metric: 'Build matchup',
      summary:
        'A League analytics surface for moving from lookup into champion guides, matchup-aware builds, live scouting, and win-condition reads.',
      steps: ['Search champion or Riot ID', 'Compare matchup builds', 'Scout live win conditions'],
      scenes: [
        {
          label: 'Champion guide',
          text: 'Read role-aware items, runes, spells, skill paths, matchup filters, and confidence signals from precomputed analytics.',
        },
        {
          label: 'Live scout',
          text: 'Resolve a Riot ID, inspect participants, ranks, roles, spells, runes, and open focused build or win-condition modes.',
        },
        {
          label: 'Patch-aware storage',
          text: 'Keep current and recent raw patches while preserving long-lived summaries for fast app-facing reads.',
        },
      ],
    },
  },
  {
    name: 'Jarvin',
    status: 'Host-run system',
    track: 'Local AI assistant platform',
    audience: 'Personal automation and host-run AI workflows',
    labRole: 'Model-adjacent product engineering',
    labTrack: 'Local AI system',
    deliverySurface:
      'Assistant clients, tool routing, local model workflows, memory, voice loops, and host orchestration.',
    productConstraint:
      'Useful assistants need privacy boundaries, inspectable tools, persistent memory, and clients that make local model work feel practical.',
    summary:
      'A private host-run assistant platform around local models, voice workflows, memory, safe tools, integrations, planning, and shared desktop/mobile clients.',
    details:
      'Jarvin is not a custom foundation model; it demonstrates the product software around local models: voice, memory, tools, integrations, and proactive assistant behavior that can be evaluated and owned.',
    proof: [
      {
        label: 'Local host',
        text: 'A FastAPI service started from the trusted machine owns ASR, local LLM routing, TTS, persistence, integrations, and frontend serving.',
      },
      {
        label: 'Voice loop',
        text: 'Remote phone voice captures microphone audio, uploads it for host transcription, routes the turn through chat/tools, and plays reply audio on the client.',
      },
      {
        label: 'Client surfaces',
        text: 'A shared React shell powers the browser app, Tauri desktop app, and Tauri Android shell without splitting product UI into separate codebases.',
      },
      {
        label: 'Tool domains',
        text: 'Deterministic planners and tools handle weather, reminders, routines, workspace/repo tasks, web research, calendar actions, and daily briefs.',
      },
    ],
    repositorySignals: [
      {
        label: 'Assistant boundary',
        text: 'Natural-language flexibility is routed through constrained planners so side effects can stay inspectable, confirmable, and host-controlled.',
      },
      {
        label: 'Persistence',
        text: 'SQLite stores conversation, profile, reminder, and routine state on the host, keeping clients thin and replaceable.',
      },
      {
        label: 'Local model layer',
        text: 'llama.cpp and optional Ollama backends sit behind a runtime router, with Whisper ASR and local TTS completing the voice path.',
      },
    ],
    nextSteps: [
      {
        label: 'Next build',
        text: 'The next meaningful work is research: better planning loops, clearer tool-evaluation boundaries, and stronger tests for instruction following.',
      },
      {
        label: 'Blocker',
        text: 'Local model quality is the main constraint. Stronger GPUs would make larger local LLMs practical and reduce the amount of product logic spent compensating for weak instruction following.',
      },
      {
        label: 'Product path',
        text: 'The platform can become more useful by tightening the assistant loop around reliable memory, voice behavior, and controlled tool execution rather than chasing novelty.',
      },
    ],
    tags: flattenTagGroups(jarvinTagGroups),
    tagGroups: jarvinTagGroups,
    href: 'https://github.com/AdamWentworth/Jarvin',
    icon: Bot,
    accent: 'jarvin',
    brand: {
      alt: 'Jarvin',
      icon: '/products/jarvin/jarvin-icon-clean.png',
      iconFrame: 'dark',
      lockupFrame: 'dark',
      wordmark: '/products/jarvin/jarvin-wordmark-white.png',
      darkLockup: '/products/jarvin/jarvin-lockup-dark.png',
    },
    demo: {
      kind: 'jarvin',
      label: 'Host-run assistant loop',
      metric: 'Local-first AI',
      summary: 'A private assistant surface for voice capture, local model work, tool execution, and memory updates.',
      steps: ['Capture request', 'Route tool safely', 'Store useful context'],
    },
  },
  {
    name: 'Track Extract',
    status: 'Active build',
    track: 'Local-first desktop stem separation',
    audience: 'Producers, engineers, DJs, remixers, and creators',
    labRole: 'Desktop AI workflow engineering',
    labTrack: 'Audio separation app',
    deliverySurface:
      'Tauri 2 desktop shell, React/TypeScript interface, thin Rust command bridge, Python ML engine, model/workflow registries, job events, stem preview, and export paths.',
    productConstraint:
      'Local ML audio tools need predictable project folders, curated model choices, safe installs, cancellable offline jobs, progress feedback, and exports that fit real DAW workflows.',
    summary:
      'A local-first desktop app for importing audio, choosing curated stem-separation workflows, running offline AI renders, previewing stems, and exporting DAW-ready files.',
    details:
      'Track Extract wraps stem-separation models in a practical desktop workflow: audio import, project/session management, curated workflows, model registry state, background jobs, progress events, local previews, and stable export naming all sit around a Python-owned engine.',
    proof: [
      {
        label: 'Producer workflow',
        text: 'The app supports drag/drop and file-picker import, TrackExtract Projects folder creation, workflow/model selection, queued/preparing/running/complete/failed/cancelled job states, stem preview, and export formats.',
      },
      {
        label: 'Engine boundary',
        text: 'Rust stays intentionally thin: it handles desktop plumbing, command/event forwarding, process cancellation, local media URLs, path resolution, and the bridge to the Python engine.',
      },
      {
        label: 'Separation providers',
        text: 'Python owns Demucs, audio-separator, and stub/test render providers, plus project/session state, jobs, installs, catalog sync, output folders, and model registry semantics.',
      },
      {
        label: 'Workflow depth',
        text: 'The registry covers quick vocal splits, full six-stem separation, instrument-only renders, custom workflows, and multi-step vocal cleanup chains inspired by UVR-style processing.',
      },
    ],
    repositorySignals: [
      {
        label: 'App shell',
        text: 'The UI is a React 19 and TypeScript Vite app inside Tauri 2, with browser development mode sharing the same local Python engine state as the desktop window.',
      },
      {
        label: 'Python package',
        text: 'The canonical engine is packaged as trackextract_engine and exposes python -m trackextract_engine for the Rust bridge and future CLI/service paths.',
      },
      {
        label: 'Verification',
        text: 'The local check path covers registry generation/validation, workflow validation, Python engine tests, frontend tests, production frontend build, Rust tests, linting, and formatting.',
      },
    ],
    nextSteps: [
      {
        label: 'Next build',
        text: 'The key release step is packaging the Python engine cleanly so non-developer desktop installs can run the separation workflow without manual environment setup.',
      },
      {
        label: 'Model path',
        text: 'The model catalog can grow into more curated installable workflows, especially around audio-separator discovery, UVR references, source links, and license-aware install states.',
      },
      {
        label: 'Workflow path',
        text: 'Batch processing, resumable jobs, stronger cancellation behavior, and DAW export templates would turn the prototype into a smoother studio utility.',
      },
    ],
    tags: flattenTagGroups(trackExtractTagGroups),
    tagGroups: trackExtractTagGroups,
    href: 'https://github.com/AdamWentworth/TrackExtract',
    icon: Music2,
    accent: 'trackextract',
    brand: {
      alt: 'Track Extract',
      icon: '/products/trackextract/trackextract-logo-mini.png',
      iconFrame: 'dark',
      lockupFrame: 'dark',
      wordmark: '/products/trackextract/trackextract-logo-text-white.png',
      darkLockup: '/products/trackextract/trackextract-logo-row-white.png',
    },
    demo: {
      kind: 'trackextract',
      label: 'Stem separation workflow',
      metric: 'Offline render',
      summary:
        'A local desktop workflow for importing audio, running curated AI stem separation, previewing stems, and exporting DAW-ready files.',
      steps: ['Import track', 'Render stems locally', 'Preview and export'],
      scenes: [
        {
          label: 'Workflow selection',
          text: 'Choose vocal, instrumental, six-stem, instrument-only, or cleanup-chain presets before launching a render.',
        },
        {
          label: 'Job engine',
          text: 'Bridge long-running Python jobs through Tauri events so progress, cancellation, and state snapshots stay visible.',
        },
        {
          label: 'Studio output',
          text: 'Preview generated stems and export named audio files in formats that fit DAW handoff.',
        },
      ],
    },
  },
  {
    name: 'Cipher Snagem Editor',
    status: 'Packaged release',
    track: 'Cross-platform desktop tooling',
    audience: 'Pokemon Colosseum and XD modding communities',
    labRole: 'Cross-platform support tooling',
    labTrack: 'Desktop tooling',
    deliverySurface: 'Avalonia UI, parser/codec systems, safe workspace flows, tests, packaging scripts, and releases.',
    productConstraint:
      'Community tools need familiar workflows, Windows support, safe file boundaries, documentation, and releases that non-authors can actually run.',
    summary:
      'A Windows-first, cross-platform .NET/Avalonia remake of legacy Pokemon Colosseum and XD modding tools with safe workspace flows and release packaging.',
    details:
      'Cipher studies prior Swift/macOS tooling and turns that preservation work into release-grade support software: a modern desktop UI, safe ISO workspace boundaries, parser/codec coverage, documentation, and downloadable artifacts.',
    proof: [
      {
        label: 'Release targets',
        text: 'One shared codebase ships separate Colosseum Tool and Pokemon XD: Gale of Darkness tool targets for the two legacy workflows.',
      },
      {
        label: 'Parity focus',
        text: 'The project studies original Swift/macOS tools, storyboards, parsers, binary formats, and behavior to preserve familiar editor workflows.',
      },
      {
        label: 'Data safety',
        text: 'The repo excludes game files and centers safe ISO workspace flows, generated artifacts, local fixtures, and clear legal/data hygiene boundaries.',
      },
      {
        label: 'Distribution',
        text: 'GitHub Actions-backed release packaging covers Windows portable zips, Ubuntu/Debian packages, Linux portable archives, and repeatable release workflow notes.',
      },
    ],
    repositorySignals: [
      {
        label: '.NET desktop stack',
        text: 'The app targets net10.0 with Avalonia UI, Fluent styling, CommunityToolkit.Mvvm, nullable C#, and shared editor libraries.',
      },
      {
        label: 'Verification',
        text: 'Tests cover codec, archive, schema, parity, texture, script, patching, UI contracts, and smoke/probe workflows.',
      },
      {
        label: 'Project scope',
        text: 'The README explicitly frames this as the stable legacy-editor parity line, not a general-purpose authoring suite.',
      },
    ],
    nextSteps: [
      {
        label: 'Current state',
        text: 'The core scope is essentially complete: a Windows/Linux-friendly GUI path for the original Swift/macOS editor concept, with packaging and release hygiene.',
      },
      {
        label: 'Future path',
        text: 'A later, separate version could become a deeper modding suite for authoring-heavy work like VFX, Pokemon models, animations, and richer game-data editing.',
      },
      {
        label: 'Blocker',
        text: 'That expansion is a different product scope, with more reverse-engineering risk and more content-authoring complexity than the parity-focused editor line.',
      },
    ],
    tags: flattenTagGroups(cipherTagGroups),
    tagGroups: cipherTagGroups,
    href: 'https://github.com/AdamWentworth/CipherSnagemEditor',
    icon: Disc3,
    accent: 'cipher',
    brand: {
      alt: 'Cipher Snagem Editor',
      icon: '/products/cipher-snagem-editor/cipher-snagem-mark-transparent.png',
      iconFrame: 'dark',
      lockupFrame: 'dark',
      wordmark: '/products/cipher-snagem-editor/cipher-snagem-wordmark-transparent.png',
      darkLockup: '/products/cipher-snagem-editor/cipher-snagem-lockup-transparent.png',
    },
    demo: {
      kind: 'cipher',
      label: 'Desktop editor workflow',
      metric: 'Release builds',
      summary: 'A desktop tooling flow for opening game workspaces, editing structured data, and packaging releases.',
      steps: ['Open clean ISO', 'Edit supported tables', 'Rebuild release artifact'],
    },
  },
  {
    name: 'Pokemon Autochess',
    status: 'Engine prototype',
    track: 'Systems-heavy game prototype',
    audience: 'Strategy game experiments and engine work',
    labRole: 'C++ systems learning lab',
    labTrack: 'Game/runtime prototype',
    deliverySurface: 'Game loop architecture, combat simulation, scripting, rendering experiments, tests, and tooling.',
    productConstraint:
      'A game prototype needs fast iteration, deterministic runtime behavior, renderer flexibility, content validation, and tests that keep experiments honest.',
    summary:
      'An engine-first C++20 auto-battler prototype with SDL2 platform work, OpenGL and Direct3D 12 rendering, Lua gameplay, VFX tooling, content pipelines, and tests.',
    details:
      'Autochess is a learning-focused runtime systems project: the current game is one client of reusable engine work around board state, combat simulation, renderer parity, scripting, data cooking, tooling, and packaged tests.',
    proof: [
      {
        label: 'Engine layers',
        text: 'CMake targets separate engine core, platform, rendering, runtime, VFX support, game objects, executable, tools, tests, and aggregate builds.',
      },
      {
        label: 'Rendering',
        text: 'The project maintains OpenGL and Direct3D 12 backend work with shared presentation rules, shader/resource caches, model loading, and smoke paths.',
      },
      {
        label: 'Gameplay runtime',
        text: 'GameRuntime and GameSession wire placement, combat, rounds, shop, movement, bench/cards, unit interaction, UI, battle feed, and health bars.',
      },
      {
        label: 'Tooling',
        text: 'VFX previewers, JSON config validation, content cooking, packaged bundles, release scripts, installer support, and headless tests support repeatable iteration.',
      },
    ],
    repositorySignals: [
      {
        label: 'C++ stack',
        text: 'The vcpkg manifest includes SDL2, SDL2_ttf, glad, GLM, Lua, sol2, nlohmann-json, fastgltf, and stb.',
      },
      {
        label: 'Game scripting',
        text: 'Lua scripts drive combat timing, shop roll logic, UI/debug events, state flow, phase transitions, and tuning overrides.',
      },
      {
        label: 'Test posture',
        text: 'The repo includes headless smoke tests, invariants, optional GL smoke draw, optional runtime smoke, CI build/test/data validation, and debug state snapshots.',
      },
    ],
    nextSteps: [
      {
        label: 'Next build',
        text: 'The prototype needs more playable content: additional 3D Pokemon models, attacks, mechanics, VFX, and staged encounters that move closer to a Kanto-inspired progression.',
      },
      {
        label: 'Blocker',
        text: 'The main constraint is the 3D world, VFX, and content layer. The runtime has useful systems, but a complete game needs authored stages, richer assets, visual feedback, tuning, and playtesting.',
      },
      {
        label: 'Product path',
        text: 'The right direction is to keep engine work tied to visible gameplay stages so rendering, scripting, combat, and VFX improvements stay grounded in playable behavior.',
      },
    ],
    tags: flattenTagGroups(autochessTagGroups),
    tagGroups: autochessTagGroups,
    href: 'https://github.com/AdamWentworth/PokemonAutochess',
    icon: Gamepad2,
    accent: 'autochess',
    brand: {
      alt: 'Pokemon Autochess',
      icon: '/products/pokemon-autochess/autochess-mark-transparent.png',
      iconFrame: 'dark',
      lockupFrame: 'dark',
      wordmark: '/products/pokemon-autochess/autochess-wordmark-transparent.png',
      darkLockup: '/products/pokemon-autochess/autochess-mark-alt-transparent.png',
    },
    demo: {
      kind: 'autochess',
      label: 'Runtime combat sandbox',
      metric: 'Engine systems',
      summary:
        'A captured engine prototype showing starter units, evolution-line staging, Route 1 combat, and debug roster scale.',
      steps: ['Stage starters', 'Resolve Route 1 combat', 'Inspect debug rosters'],
      scenes: [
        {
          label: 'Starter staging',
          text: 'Show Bulbasaur, Charmander, and Squirtle together and individually across the current evolution-line coverage.',
        },
        {
          label: 'Route 1 combat',
          text: 'Capture level-1 starter encounters against Pidgey and Rattata with health bars, combat HUD, and battle feed.',
        },
        {
          label: 'Debug roster',
          text: 'Use repeatable snapshots to present denser board states until the game receives upgraded authored content.',
        },
      ],
    },
  },
];

export const projects = [...productCatalog].sort(
  (left, right) => productOrder[left.demo.kind] - productOrder[right.demo.kind],
);
