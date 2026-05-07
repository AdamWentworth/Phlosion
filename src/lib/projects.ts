import { Archive, Bot, Gamepad2, Globe2, type LucideIcon } from 'lucide-react';

export type Project = {
  name: string;
  status: 'Active build' | 'Prototype' | 'Research system' | 'Desktop release';
  track: string;
  audience: string;
  companyRole: string;
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
    companyRole: 'Flagship web/mobile product system',
    summary: 'A full-stack Pokemon GO coordination platform with web/mobile clients and service-oriented backend work.',
    details:
      'Phlosion treats Nexus as a product system: live updates, geospatial search, event flow, durable storage, deployment wiring, and user-facing interaction design.',
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
