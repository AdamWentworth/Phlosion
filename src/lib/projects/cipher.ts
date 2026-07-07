import { Disc3 } from 'lucide-react';
import { flattenTagGroups, type Project, type TechTagGroup } from './types';

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
    tags: ['Windows', 'Linux', 'Release packaging'],
  },
] satisfies TechTagGroup[];

export const cipherProject: Project = {
  name: 'Cipher Snagem Editor',
  status: 'Packaged release',
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
      text: 'GitHub Actions-backed release packaging covers Windows portable zips, Ubuntu/Debian packages, Linux portable archives, and repeatable release workflow notes.',
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
  nextSteps: [
    {
      label: 'Current state',
      text: 'The core scope is essentially complete: a Windows/Linux-friendly GUI path for the original Swift/macOS editor concept, with packaging and release hygiene.',
    },
    {
      label: 'Future path',
      text: 'A later, separate version could become a deeper modding suite for authoring-heavy work like VFX, Pokemon models, animations, and richer game-data editing.',
    },
    {
      label: 'Blocker',
      text: 'That expansion is a different product scope, with more reverse-engineering risk and more content-authoring complexity than the parity-focused editor line.',
    },
  ],
  tags: flattenTagGroups(cipherTagGroups),
  tagGroups: cipherTagGroups,
  href: 'https://github.com/AdamWentworth/CipherSnagemEditor',
  icon: Disc3,
  accent: 'cipher',
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
};
