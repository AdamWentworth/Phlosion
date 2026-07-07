import { Music2 } from 'lucide-react';
import { flattenTagGroups, type Project, type TechTagGroup } from './types';

const trackExtractTagGroups = [
  {
    label: 'Desktop shell',
    tags: ['React', 'TypeScript', 'Vite', 'Tauri', 'Rust'],
  },
  {
    label: 'ML engine',
    tags: ['Python', 'Demucs', 'audio-separator', 'FFmpeg'],
  },
  {
    label: 'Workflow data',
    tags: ['JSON', 'Vitest', 'GitHub Actions'],
  },
] satisfies TechTagGroup[];

export const trackExtractProject: Project = {
  name: 'Track Extract',
  status: 'Active build',
  track: 'Local-first desktop stem separation',
  audience: 'Producers, engineers, DJs, remixers, and creators',
  labRole: 'Desktop AI workflow engineering',
  labTrack: 'Audio separation app',
  deliverySurface:
    'Tauri 2 desktop shell, React/TypeScript interface, thin Rust command bridge, Python ML engine, model/workflow registries, job events, stem preview, and export paths.',
  productConstraint:
    'Local ML audio tools need predictable project folders, curated model choices, safe installs, cancellable offline jobs, progress feedback, and exports that fit real DAW workflows.',
  summary:
    'A local-first desktop app for importing audio, choosing curated stem-separation workflows, running offline AI renders, previewing stems, and exporting DAW-ready files.',
  details:
    'Track Extract wraps stem-separation models in a practical desktop workflow: audio import, project/session management, curated workflows, model registry state, background jobs, progress events, local previews, and stable export naming all sit around a Python-owned engine.',
  proof: [
    {
      label: 'Producer workflow',
      text: 'The app supports drag/drop and file-picker import, TrackExtract Projects folder creation, workflow/model selection, queued/preparing/running/complete/failed/cancelled job states, stem preview, and export formats.',
    },
    {
      label: 'Engine boundary',
      text: 'Rust stays intentionally thin: it handles desktop plumbing, command/event forwarding, process cancellation, local media URLs, path resolution, and the bridge to the Python engine.',
    },
    {
      label: 'Separation providers',
      text: 'Python owns Demucs, audio-separator, and stub/test render providers, plus project/session state, jobs, installs, catalog sync, output folders, and model registry semantics.',
    },
    {
      label: 'Workflow depth',
      text: 'The registry covers quick vocal splits, full six-stem separation, instrument-only renders, custom workflows, and multi-step vocal cleanup chains inspired by UVR-style processing.',
    },
  ],
  repositorySignals: [
    {
      label: 'App shell',
      text: 'The UI is a React 19 and TypeScript Vite app inside Tauri 2, with browser development mode sharing the same local Python engine state as the desktop window.',
    },
    {
      label: 'Python package',
      text: 'The canonical engine is packaged as trackextract_engine and exposes python -m trackextract_engine for the Rust bridge and future CLI/service paths.',
    },
    {
      label: 'Verification',
      text: 'The local check path covers registry generation/validation, workflow validation, Python engine tests, frontend tests, production frontend build, Rust tests, linting, and formatting.',
    },
  ],
  nextSteps: [
    {
      label: 'Next build',
      text: 'The key release step is packaging the Python engine cleanly so non-developer desktop installs can run the separation workflow without manual environment setup.',
    },
    {
      label: 'Model path',
      text: 'The model catalog can grow into more curated installable workflows, especially around audio-separator discovery, UVR references, source links, and license-aware install states.',
    },
    {
      label: 'Workflow path',
      text: 'Batch processing, resumable jobs, stronger cancellation behavior, and DAW export templates would turn the prototype into a smoother studio utility.',
    },
  ],
  tags: flattenTagGroups(trackExtractTagGroups),
  tagGroups: trackExtractTagGroups,
  href: 'https://github.com/AdamWentworth/TrackExtract',
  icon: Music2,
  accent: 'trackextract',
  brand: {
    alt: 'Track Extract',
    icon: '/products/trackextract/trackextract-logo-mini.png',
    iconFrame: 'dark',
    lockupFrame: 'dark',
    wordmark: '/products/trackextract/trackextract-logo-text-white.png',
    darkLockup: '/products/trackextract/trackextract-logo-row-white.png',
  },
  demo: {
    kind: 'trackextract',
    label: 'Stem separation workflow',
    metric: 'Offline render',
    summary:
      'A local desktop workflow for importing audio, running curated AI stem separation, previewing stems, and exporting DAW-ready files.',
    steps: ['Import track', 'Render stems locally', 'Preview and export'],
    scenes: [
      {
        label: 'Workflow selection',
        text: 'Choose vocal, instrumental, six-stem, instrument-only, or cleanup-chain presets before launching a render.',
      },
      {
        label: 'Job engine',
        text: 'Bridge long-running Python jobs through Tauri events so progress, cancellation, and state snapshots stay visible.',
      },
      {
        label: 'Studio output',
        text: 'Preview generated stems and export named audio files in formats that fit DAW handoff.',
      },
    ],
  },
};
