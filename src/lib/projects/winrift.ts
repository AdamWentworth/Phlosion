import { Swords } from 'lucide-react';
import { flattenTagGroups, type Project, type TechTagGroup } from './types';

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

export const winRiftProject: Project = {
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
};
