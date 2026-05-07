import { Bot, Gamepad2, Globe2, type LucideIcon } from 'lucide-react';

export type Project = {
  name: string;
  status: 'Active build' | 'Prototype' | 'Research system';
  summary: string;
  details: string;
  tags: string[];
  href: string;
  icon: LucideIcon;
  accent: 'orange' | 'green' | 'blue';
};

export const projects: Project[] = [
  {
    name: 'Pokemon Go Nexus',
    status: 'Active build',
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
    summary: 'A private host-run assistant around local models, voice workflows, memory, tools, and integrations.',
    details:
      'Jarvin is the AI systems lab: practical model-adjacent software, local-first infrastructure, safe tool execution, and clients that connect back to a trusted machine.',
    tags: ['FastAPI', 'Tauri', 'SQLite', 'llama.cpp', 'Voice'],
    href: 'https://github.com/AdamWentworth/Jarvin',
    icon: Bot,
    accent: 'green',
  },
  {
    name: 'Pokemon Autochess',
    status: 'Prototype',
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
