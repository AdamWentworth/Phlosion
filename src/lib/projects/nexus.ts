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
};
