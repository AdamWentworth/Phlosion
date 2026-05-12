import { Archive, Bot, Gamepad2, Globe2, type LucideIcon } from 'lucide-react';

export type Project = {
  name: string;
  status: 'Active build' | 'Prototype' | 'Research system' | 'Desktop release';
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
  tags: string[];
  tagGroups?: TechTagGroup[];
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
    tags: ['React', 'React Router', 'Vite', 'TypeScript', 'Expo', 'Zustand', 'IndexedDB', 'Vitest'],
  },
  {
    label: 'Backend',
    tags: ['Go', 'net/http', 'chi', 'Fiber', 'Node', 'Express', 'MongoDB', 'Kafka', 'MySQL', 'Postgres/PostGIS'],
  },
  {
    label: 'Delivery',
    tags: ['Docker', 'NGINX'],
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
    tags: ['Windows/Linux', 'Release packaging'],
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

export const projects: Project[] = [
  {
    name: 'Pokemon Go Nexus',
    status: 'Active build',
    track: 'Full-stack collection and trade platform',
    audience: 'Pokemon GO collectors, traders, and local communities',
    labRole: 'Full-stack product platform',
    labTrack: 'Collection + trade app',
    deliverySurface:
      'React/Vite web app, Expo mobile path, auth, Pokemon API, users/search/events/location services, receiver/storage pipeline, and NGINX routing.',
    productConstraint:
      'Collection and trade software needs rich variant modeling, trusted account state, location-aware discovery, offline-friendly local storage, live sync, and deployment paths that can support hosted communities.',
    summary:
      'An active full-stack Pokemon GO platform for managing collections, browsing variants, finding trainers, proposing trades, and syncing updates across web/mobile clients and backend services.',
    details:
      'Nexus is built as a product system, not a single app screen: collection management, public trainer views, search/list/map discovery, trade lifecycle flows, cached Pokemon data, service-worker batching, IndexedDB hydration, Kafka-backed persistence, SSE updates, and production-oriented deployment work all sit in one monorepo.',
    proof: [
      {
        label: 'Product surface',
        text: 'The web app covers registration/login, account settings, collection browsing, Pokédex and owned-instance overlays, tag buckets, public trainer collections, search, map results, trade proposals, and trade status review.',
      },
      {
        label: 'Sync model',
        text: 'Client edits update Zustand stores, persist through IndexedDB, queue receiver batches, flow through authenticated Go ingestion into Kafka/MySQL, then return through SSE and missed-update readers.',
      },
      {
        label: 'Service topology',
        text: 'Auth runs on Express/MongoDB; Pokemon data uses Go net/http plus chi over SQLite; users/search/events/receiver/storage/location services use Go, MySQL, Kafka, and PostGIS behind NGINX route namespaces.',
      },
      {
        label: 'Delivery discipline',
        text: 'The repo includes Docker/compose service boundaries, frontend CI workflows, Vitest and browser-proofing paths, service tests, health/readiness probes, metrics, Trivy/SBOM checks, and deployment notes.',
      },
    ],
    repositorySignals: [
      {
        label: 'Frontend workspace',
        text: 'The frontend is a workspace with React 19, React Router 7, Vite 8, TypeScript 6, Zustand stores, shared contracts, shared UI tokens, IndexedDB persistence, SSE context, and Playwright/Vitest coverage.',
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
    tags: flattenTagGroups(nexusTagGroups),
    tagGroups: nexusTagGroups,
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
      label: 'Collection + trade walkthrough',
      metric: 'Trade flow',
      summary:
        'A walkthrough surface for browsing a collection, finding location-aware matches, and moving into the trade flow.',
      steps: ['Open collection', 'Search nearby matches', 'Propose trade'],
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
          label: 'Trade lifecycle',
          text: 'Move from a selected match into proposals, status review, decisions, and completion/cancel flows.',
        },
      ],
    },
  },
  {
    name: 'Jarvin',
    status: 'Research system',
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
    tags: flattenTagGroups(jarvinTagGroups),
    tagGroups: jarvinTagGroups,
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
    tags: flattenTagGroups(cipherTagGroups),
    tagGroups: cipherTagGroups,
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
    tags: flattenTagGroups(autochessTagGroups),
    tagGroups: autochessTagGroups,
    href: 'https://github.com/AdamWentworth/PokemonAutochess',
    icon: Gamepad2,
    accent: 'blue',
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
      summary: 'A systems prototype for board state, scripted gameplay, rendering paths, and packaged tests.',
      steps: ['Place units', 'Resolve combat', 'Record playtest signal'],
    },
  },
];
