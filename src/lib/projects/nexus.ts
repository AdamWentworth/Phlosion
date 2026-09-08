import { MapPinned } from 'lucide-react';
import { flattenTagGroups, type Project, type TechTagGroup } from './types';

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

export const nexusProject: Project = {
  name: 'Pokemon Go Nexus',
  status: 'Active build',
  track: 'Full-stack collection and trade platform',
  audience: 'Pokemon Go collectors, traders, and local communities',
  labRole: 'Full-stack product platform',
  labTrack: 'Collection + trade app',
  deliverySurface:
    'React/Vite web app, Expo React Native preview, shared product logic, and services for accounts, Pokemon data, discovery, trades, and live sync.',
  productConstraint:
    'Collection and trade software needs rich variant modeling, trusted account state, location-aware discovery, offline-friendly local storage, live sync, and deployment paths that can support hosted communities.',
  summary:
    'Manage a Pokemon Go collection, plan raid and Max Battle teams, compare PvP options, find nearby trainers, and organize trades in one connected workspace.',
  details:
    'The app connects variant and instance tracking with a regional Pokédex, raid counters, Max Battle planning, PvP rankings and team tools, community rankings, trainer profiles, friends, and shareable Trade Boards. Local persistence and queued sync support collection work between connections.',
  proof: [
    {
      label: 'Product surface',
      text: 'Collection tags and instance editing, a regional Pokédex, raid and Max Battle planners, PvP rankings and IV analysis, trainer search and maps, community rankings, trade preferences and activity, shareable boards, friends, and account security.',
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
      text: 'The native migration branch implements the main app routes with Expo React Native and shared product logic. Browser parity and workflow checks support the preview; physical-device, standalone-build, and iOS release checks remain open. The production mobile default remains the WebView shell.',
    },
    {
      label: 'Backend services',
      text: 'The backend combines the cached Go Pokemon API, hardened auth, user overview/public snapshots, trade/wanted search, location autocomplete/geocode/reverse lookup, receiver ingestion, storage persistence, and events streaming.',
    },
  ],
  nextSteps: [
    {
      label: 'Native validation',
      text: 'Build the current native preview and complete physical-device route, navigation, performance, and trade workflow checks before changing the mobile release default.',
    },
    {
      label: 'Product refinement',
      text: 'Refine collection, discovery, and trade workflows using the existing raid, Max Battle, PvP, and community tools as part of the complete trainer journey.',
    },
    {
      label: 'Evidence boundary',
      text: 'The showcase runs the migration branch’s responsive web interface against live services using a real trainer account. It pairs overall rankings with the trainer’s own Pokémon; private profile and account fields are hidden. Native release checks remain separate.',
    },
    {
      label: 'Release path',
      text: 'Keep web delivery and native rollout decisions tied to their own verified builds, with updated capture coverage and deployment checks before each release.',
    },
  ],
  tags: flattenTagGroups(nexusTagGroups),
  tagGroups: nexusTagGroups,
  href: 'https://github.com/AdamWentworth/PokeGoNexus',
  icon: MapPinned,
  accent: 'nexus',
  brand: {
    alt: 'Pokemon Go Nexus',
    icon: '/products/pokemon-go-nexus/nexus-logo-mark-transparent.png',
    iconFrame: 'light',
    lockupFrame: 'dark',
    lockup: '/products/pokemon-go-nexus/nexus-lockup-v2-transparent.png',
    wordmark: '/products/pokemon-go-nexus/nexus-wordmark-transparent.png',
  },
  demo: {
    kind: 'nexus',
    label: 'App walkthrough',
    metric: 'App demo',
    summary:
      'Explore a real trainer’s collection, trades, and community. Compare overall Raid, Max, and PvP results with My Pokémon in desktop and mobile web layouts; the native app remains in preview.',
    steps: ['Collect and discover', 'Plan your battles', 'Connect and trade'],
    scenes: [
      {
        label: 'Collection workspace',
        text: 'Browse variants, owned instances, caught/trade/wanted states, and tag-driven views.',
      },
      {
        label: 'Battle tools',
        text: 'Compare overall recommendations with your own raid attackers, Max Battle parties, complete PvP teams, and caught Pokémon IV ranks.',
      },
      {
        label: 'Trainer community',
        text: 'Find trainers, compare community demand, review trade activity, share a Trade Board, and manage friends and account settings.',
      },
    ],
  },
};
