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
  engineeringProof: string[];
  summary: string;
  details: string;
  tags: string[];
  href: string;
  icon: LucideIcon;
  accent: 'orange' | 'green' | 'blue' | 'cream';
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
    engineeringProof: [
      'Service-oriented backend with event, user, location, and storage boundaries.',
      'Kafka-backed update flow for live event synchronization.',
      'Geospatial persistence and deployment wiring for product-scale workflows.',
    ],
    summary: 'A full-stack coordination platform with web/mobile clients and service-oriented backend work.',
    details:
      'Nexus is valuable because of the service layer Phlosion builds: accounts, events, geospatial search, live updates, durable storage, deployment wiring, and user-facing interaction design.',
    tags: ['React', 'Go', 'Kafka', 'PostGIS', 'Docker'],
    href: 'https://github.com/AdamWentworth/Go',
    icon: Globe2,
    accent: 'orange',
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
    engineeringProof: [
      'Host-run architecture for local models, tools, and trusted machine access.',
      'Tauri and API clients shaped around voice, memory, and automation loops.',
      'Tool execution boundaries designed around evaluation and user control.',
    ],
    summary: 'A private host-run assistant around local models, voice workflows, memory, tools, and integrations.',
    details:
      'Jarvin is the AI systems lab: practical model-adjacent software, local-first infrastructure, safe tool execution, and clients that connect back to a trusted machine.',
    tags: ['FastAPI', 'Tauri', 'SQLite', 'llama.cpp', 'Voice'],
    href: 'https://github.com/AdamWentworth/Jarvin',
    icon: Bot,
    accent: 'green',
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
    engineeringProof: [
      'Cross-platform Avalonia desktop UI over shared editor workflows.',
      'Parser, codec, archive, and workspace systems covered by targeted tests.',
      'Release packaging scripts for Windows and Linux distribution paths.',
    ],
    summary: 'A Windows-first, cross-platform .NET/Avalonia remake of legacy Pokemon Colosseum and XD modding tools.',
    details:
      'Cipher turns a preservation project into release-grade software: shared desktop code, safe ISO workspace flows, parser and codec coverage, packaging scripts, and Windows/Linux release targets.',
    tags: ['.NET 10', 'Avalonia', 'C#', 'GameCube ISO', 'Binary formats', 'Windows/Linux'],
    href: 'https://github.com/AdamWentworth/CipherSnagemEditor',
    icon: Archive,
    accent: 'cream',
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
    engineeringProof: [
      'C++ runtime architecture with scripting and gameplay iteration loops.',
      'Rendering experiments across SDL2 and Direct3D 12 paths.',
      'Packaged content, smoke tests, and tooling for repeatable playtest feedback.',
    ],
    summary: 'An engine-first C++ auto-battler prototype with rendering paths, Lua gameplay, tooling, and tests.',
    details:
      'Autochess is the systems and games track: runtime architecture, rendering experiments, scripting, packaged content, smoke tests, and iteration on play feel.',
    tags: ['C++20', 'SDL2', 'Direct3D 12', 'Lua', 'CMake'],
    href: 'https://github.com/AdamWentworth/PokemonAutochess',
    icon: Gamepad2,
    accent: 'blue',
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

export const engineeringPractices = [
  {
    label: 'Architecture',
    detail:
      'Products are framed around clients, services, data flow, tool boundaries, and release surfaces instead of isolated code snippets.',
  },
  {
    label: 'Interface Quality',
    detail:
      'The site and product surfaces prioritize responsive layouts, accessible controls, visual hierarchy, and clear interaction states.',
  },
  {
    label: 'Release Discipline',
    detail:
      'Build checks, type checks, dependency audits, packaging notes, docs, and changelogs are treated as product infrastructure.',
  },
  {
    label: 'Systems Range',
    detail:
      'Phlosion spans web services, local AI workflows, desktop apps, binary tooling, and game/runtime systems under one product brand.',
  },
];
