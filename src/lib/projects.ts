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
  },
];

export const operatingPrinciples = [
  'Projects should have a product shape, not just a repo shape.',
  'AI belongs in the workflow when the system can still be evaluated, owned, and improved.',
  'Infrastructure, testing, and documentation count as product work.',
  'Client-facing polish and backend architecture should reinforce each other.',
];
