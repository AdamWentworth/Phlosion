import { Archive, Bot, Gamepad2, Globe2, type LucideIcon } from 'lucide-react';

export type Project = {
  name: string;
  status: 'Active build' | 'Prototype' | 'Research system' | 'Desktop release';
  track: string;
  audience: string;
  companyRole: string;
  productLine: string;
  ownedSurface: string;
  commercialPath: string;
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
  tags: string[];
  href: string;
  icon: LucideIcon;
  accent: 'orange' | 'green' | 'blue' | 'cream';
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
    kind: 'nexus' | 'jarvin' | 'cipher' | 'autochess';
    label: string;
    metric: string;
    summary: string;
    steps: string[];
  };
};

export const projects: Project[] = [
  {
    name: 'Pokemon Go Nexus',
    status: 'Active build',
    track: 'Full-stack coordination system',
    audience: 'Pokemon GO players and local communities',
    companyRole: 'Flagship service-app product line',
    productLine: 'Apps & subscription services',
    ownedSurface: 'Web/mobile clients, event workflows, location search, update delivery, and service infrastructure.',
    commercialPath: 'Subscription features for coordination, alerts, hosted communities, and power-user tools.',
    summary:
      'A full-stack Pokemon GO coordination platform with React web/mobile clients, Go and Express services, Kafka event sync, geospatial search, and persistent storage.',
    details:
      'Nexus is the flagship service-app track: the value is in the accounts, live event workflows, location intelligence, durable storage, deployment wiring, and user-facing coordination tools around the shared player interest.',
    proof: [
      {
        label: 'Service map',
        text: 'The monorepo separates authentication, Pokemon data, location, receiver/storage, search, users, events, NGINX, tests, and frontend workspaces.',
      },
      {
        label: 'Live data flow',
        text: 'Frontend batches flow through authenticated Go receivers into Kafka, storage consumers, MySQL persistence, and SSE-driven readers.',
      },
      {
        label: 'Location intelligence',
        text: 'PostGIS-backed location services and search readers support nearby-player and nearby-activity workflows instead of simple static lists.',
      },
      {
        label: 'Delivery surface',
        text: 'Docker, NGINX, service docs, backups, Vitest coverage, and shared frontend packages make the system closer to a hosted product.',
      },
    ],
    repositorySignals: [
      {
        label: 'Pokemon API',
        text: 'Current API is Go net/http plus chi over SQLite with response caching, gzip/ETag support, health checks, readiness checks, and internal cache endpoints.',
      },
      {
        label: 'Go services',
        text: 'Location, receiver, search, users, and events services use Fiber, Kafka, GORM/MySQL, PostGIS, JWT, Prometheus, and structured logging.',
      },
      {
        label: 'Client state',
        text: 'The React client workspaces include live update flows, IndexedDB state, shared packages, and web/mobile-facing product surfaces.',
      },
    ],
    tags: [
      'React',
      'TypeScript',
      'Go',
      'net/http',
      'chi',
      'Fiber',
      'Kafka',
      'MySQL',
      'Postgres/PostGIS',
      'Node',
      'Express',
      'MongoDB',
      'Docker',
      'NGINX',
      'Vitest',
    ],
    href: 'https://github.com/AdamWentworth/Go',
    icon: Globe2,
    accent: 'orange',
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
      label: 'Raid coordination surface',
      metric: 'Event sync',
      summary: 'A live operations view for local events, nearby players, location search, and update delivery.',
      steps: ['Find nearby activity', 'Publish event state', 'Sync mobile clients'],
    },
  },
  {
    name: 'Jarvin',
    status: 'Research system',
    track: 'Local AI assistant platform',
    audience: 'Personal automation and host-run AI workflows',
    companyRole: 'AI systems and integration lab',
    productLine: 'AI systems',
    ownedSurface:
      'Assistant clients, tool routing, local model workflows, memory, voice loops, and host orchestration.',
    commercialPath: 'Private assistant workflows, local-first tooling, and future managed automation products.',
    summary:
      'A private host-run assistant platform around local models, voice workflows, memory, safe tools, integrations, planning, and shared desktop/mobile clients.',
    details:
      'Jarvin is the AI systems lab: not a custom foundation model, but the product software around local models that makes voice, memory, tools, integrations, and proactive assistant behavior feel useful.',
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
    tags: ['Python', 'FastAPI', 'React', 'Tauri', 'SQLite', 'llama.cpp', 'Ollama', 'Whisper ASR'],
    href: 'https://github.com/AdamWentworth/Jarvin',
    icon: Bot,
    accent: 'green',
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
    name: 'Cipher Snagem Editor',
    status: 'Desktop release',
    track: 'Cross-platform desktop tooling',
    audience: 'Pokemon Colosseum and XD modding communities',
    companyRole: 'Preservation-grade desktop product line',
    productLine: 'Desktop tools',
    ownedSurface: 'Avalonia UI, parser/codec systems, safe workspace flows, tests, packaging scripts, and releases.',
    commercialPath: 'Open-source releases today, with future support, documentation, downloads, or adjacent tooling.',
    summary:
      'A Windows-first, cross-platform .NET/Avalonia remake of legacy Pokemon Colosseum and XD modding tools with safe workspace flows and release packaging.',
    details:
      'Cipher turns preservation into release-grade tooling: a modern desktop UI over studied legacy behavior, safe ISO workspace boundaries, parser/codec coverage, documentation, and downloadable release artifacts.',
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
        text: 'Release packaging covers Windows portable zips, Ubuntu/Debian packages, Linux portable archives, and repeatable GitHub release workflow notes.',
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
    tags: ['.NET 10', 'AvaloniaUI', 'C#', 'GameCube ISO', 'Binary formats', 'Windows/Linux', 'Release packaging'],
    href: 'https://github.com/AdamWentworth/CipherSnagemEditor',
    icon: Archive,
    accent: 'cream',
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
    status: 'Prototype',
    track: 'Systems-heavy game prototype',
    audience: 'Strategy game experiments and engine work',
    companyRole: 'Games and runtime architecture track',
    productLine: 'Games & runtime R&D',
    ownedSurface: 'Game loop architecture, combat simulation, scripting, rendering experiments, tests, and tooling.',
    commercialPath: 'Prototype-to-product exploration for original games, tooling, reusable systems, or demos.',
    summary:
      'An engine-first C++20 auto-battler prototype with SDL2 platform work, OpenGL and Direct3D 12 rendering, Lua gameplay, VFX tooling, content pipelines, and tests.',
    details:
      'Autochess is the games and runtime systems track: the current game is one client of a reusable engine, with board state, combat simulation, renderer parity, scripting, data cooking, tooling, and release exploration.',
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
    tags: ['C++20', 'SDL2', 'OpenGL', 'Direct3D 12', 'Lua', 'sol2', 'CMake', 'JSON', 'vcpkg'],
    href: 'https://github.com/AdamWentworth/PokemonAutochess',
    icon: Gamepad2,
    accent: 'blue',
    brand: {
      alt: 'Pokemon Autochess',
      icon: '/products/pokemon-autochess/autochess-mark-transparent.png',
      iconFrame: 'dark',
      lockupFrame: 'dark',
      wordmark: '/products/pokemon-autochess/autochess-wordmark-transparent.png',
      darkLockup: '/products/pokemon-autochess/autochess-lockup-transparent.png',
    },
    demo: {
      kind: 'autochess',
      label: 'Runtime combat sandbox',
      metric: 'Engine systems',
      summary: 'A systems prototype for board state, scripted gameplay, rendering paths, and packaged tests.',
      steps: ['Place units', 'Resolve combat', 'Record playtest signal'],
    },
  },
];

export const operatingPrinciples = [
  'Every product track needs a clear user, workflow, and release surface.',
  'Demos should expose real behavior: state, feedback, data, tooling, or runtime systems.',
  'Infrastructure, testing, packaging, and documentation are treated as product features.',
  'Client polish and backend architecture should make the same promise from different angles.',
];

export const companyPrinciples = [
  {
    label: 'Own The Software Layer',
    detail:
      'Phlosion is the home for the app code, service workflows, UI systems, docs, releases, and product direction behind each project.',
  },
  {
    label: 'Build Revenue Paths',
    detail:
      'Some tracks may stay open-source or experimental, while others can become subscriptions, hosted services, support tools, or downloadable products.',
  },
  {
    label: 'Show Real Behavior',
    detail:
      'The site should keep moving toward demos, screenshots, changelogs, downloads, and concrete proof of what each product does.',
  },
  {
    label: 'Respect The Context',
    detail:
      'When products serve existing communities or fan interests, Phlosion presents and commercializes the software services it creates.',
  },
];
