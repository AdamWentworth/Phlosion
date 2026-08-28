import { BookOpen } from 'lucide-react';
import { flattenTagGroups, type Project, type TechTagGroup } from './types';

const binderLedgerTagGroups = [
  {
    label: 'Universal client',
    tags: ['Expo', 'React', 'TypeScript', 'TanStack Query'],
  },
  {
    label: 'API + data',
    tags: ['Go', 'net/http', 'PostgreSQL'],
  },
  {
    label: 'Vision + delivery',
    tags: ['Python', 'OpenCV', 'Tesseract OCR', 'Docker', 'GitHub Actions'],
  },
] satisfies TechTagGroup[];

export const binderLedgerProject: Project = {
  name: 'BinderLedger',
  status: 'Active build',
  track: 'Condition-aware trading card collection and market platform',
  audience: 'Legacy trading card collectors tracking exact printings, conditions, and market movement',
  labRole: 'Full-stack self-hosted product platform',
  labTrack: 'Collection + market app',
  deliverySurface:
    'Universal Expo client for web, iOS, and Android; Go JSON API; PostgreSQL catalog; ingestion workers; OpenCV/Tesseract recognition; and resource-conscious Docker operations.',
  productConstraint:
    'Collector software must distinguish exact printings and conditions, preserve source and price quality signals, stay inside provider quotas, protect private card media, and make uncertain recognition results reviewable.',
  summary:
    'A condition-aware catalog, collection, watchlist, market, and assisted-recognition platform for legacy trading cards, beginning with English Pokemon printings from the Wizards era through the EX era.',
  details:
    'BinderLedger treats a collectible as more than a card name. Set, edition, finish, language, grading state, and condition remain explicit across catalog search, collection records, watchlists, market history, and scan candidates, all behind a universal Expo client and a small-server Go/PostgreSQL platform.',
  proof: [
    {
      label: 'Exact-printing catalog',
      text: 'Catalog records preserve set, edition, finish, language, variant, and card numbering so distinct printings are not collapsed into one result.',
    },
    {
      label: 'Condition-aware market',
      text: 'Near Mint, Lightly Played, Moderately Played, Heavily Played, and Damaged observations remain separate, with movement snapshots plus stale and thin-data indicators.',
    },
    {
      label: 'Collector workflows',
      text: 'The responsive client covers catalog and set browsing, card details, collection state, printing- or set-level watchlists, market rankings, movers, and native camera capture.',
    },
    {
      label: 'Assisted recognition',
      text: 'A Python worker combines perspective correction, image features, and OCR to rank verified candidates while keeping final card confirmation with the collector.',
    },
  ],
  repositorySignals: [
    {
      label: 'Clear system boundaries',
      text: 'Expo owns presentation and device capabilities, the Go API owns domain rules and JSON contracts, PostgreSQL is the source of truth, and workers stay behind those boundaries.',
    },
    {
      label: 'Quota-aware ingestion',
      text: 'Collection jobs cache provider responses, resume interrupted work, upsert idempotently, enforce request budgets, and keep raw payloads and downloaded media outside the repository.',
    },
    {
      label: 'Operational discipline',
      text: 'CI verifies the client and Go services, builds and scans deployment images, emits software bills of materials, and deploys commit-addressed containers to a constrained private-network host.',
    },
  ],
  nextSteps: [
    {
      label: 'Release boundary',
      text: 'Accounts, ownership, named lists, and isolated staging need to land before the current trusted-network API can become a wider multi-user product.',
    },
    {
      label: 'Catalog path',
      text: 'Continue the approved pre-Diamond-and-Pearl catalog expansion while preserving provider budgets, exact identifiers, condition history, and explicit data-quality signals.',
    },
    {
      label: 'Recognition path',
      text: 'Evaluate recognition against trustworthy real-device photographs and resolve provider-plan and card-image rights before broadening distribution.',
    },
  ],
  tags: flattenTagGroups(binderLedgerTagGroups),
  tagGroups: binderLedgerTagGroups,
  href: 'https://github.com/AdamWentworth/BinderLedger',
  icon: BookOpen,
  accent: 'binderledger',
  brand: {
    alt: 'BinderLedger',
    icon: '/products/binderledger/binderledger-icon.png',
    iconFrame: 'dark',
    lockupFrame: 'dark',
    wordmark: '/products/binderledger/binderledger-wordmark.png',
    darkLockup: '/products/binderledger/binderledger-mark.png',
  },
  demo: {
    kind: 'binderledger',
    label: 'Catalog + market walkthrough',
    metric: 'Live data demo',
    summary:
      'A responsive walkthrough of exact-printing discovery, condition-specific card details, set browsing, market history, rankings, and individual movers.',
    steps: ['Browse exact printings', 'Inspect condition values', 'Compare market movement'],
    scenes: [
      {
        label: 'Catalog exploration',
        text: 'Filter collected sets and printings, adjust card density, open condition-aware details, and switch into the set directory.',
      },
      {
        label: 'Market movement',
        text: 'Move from market health and price history into set rankings, card movers, and the observations behind a selected change.',
      },
      {
        label: 'Universal surface',
        text: 'Compare the same information architecture at desktop and phone sizes from one Expo client.',
      },
    ],
  },
};
