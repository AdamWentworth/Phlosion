import { ShieldCheck } from 'lucide-react';
import { flattenTagGroups, type Project, type TechTagGroup } from './types';

const havenTagGroups = [
  {
    label: 'Hub + trust',
    tags: ['Go', 'SQLite', 'WebAuthn', 'net/http'],
  },
  {
    label: 'Console + desktop',
    tags: ['React', 'TypeScript', 'Vite', 'Electron'],
  },
  {
    label: 'Endpoints + delivery',
    tags: ['Windows', 'Linux', 'Docker', 'GitHub Actions'],
  },
] satisfies TechTagGroup[];

export const havenProject: Project = {
  name: 'HAVEN',
  status: 'Active build',
  track: 'Self-hosted observatory for personal infrastructure security',
  audience: 'People maintaining trusted computers, private-network services, and managed appliances at home',
  labRole: 'Security-focused systems product',
  labTrack: 'Home infrastructure security',
  deliverySurface:
    'Go and SQLite hub; unprivileged Windows and Linux agents; responsive React console; hardened Electron client; and a resource-bounded Docker deployment path.',
  productConstraint:
    'Security posture has to stay explainable and privacy-bounded: report only evidence HAVEN can verify, keep credentials and payloads out of collection, and never turn constrained owner actions into an arbitrary remote shell.',
  summary:
    'A self-hosted security observatory for understanding trusted computers, private-network services, managed appliances, browser posture, and account hygiene.',
  details:
    'HAVEN centralizes the view without centralizing collection. Native agents observe their own hosts and send bounded, mutually authenticated reports to a Go hub, while the console separates verified protection, expected services, findings, and unavailable evidence instead of compressing them into an opaque security score.',
  proof: [
    {
      label: 'Cross-platform posture',
      text: 'Unprivileged Windows and Linux collectors report explainable update, firewall, encryption, boot-integrity, remote-access, listener, and agent-health evidence.',
    },
    {
      label: 'Service-aware networking',
      text: 'HAVEN distinguishes enrolled peers, observed private endpoints, expected listeners, service drift, and grouped Internet relationships without packet capture or retained remote-endpoint history.',
    },
    {
      label: 'Broader security context',
      text: 'Managed-appliance health, browser hardening, privacy-bounded cookie-domain metadata, and an encrypted account-hygiene notebook bring related owner decisions into one surface.',
    },
    {
      label: 'Controlled response loop',
      text: 'Server-classified alerts, acknowledgement and snooze controls, generic encrypted push messages, diagnostics, backups, and constrained passkey-confirmed actions favor review over alarmism.',
    },
  ],
  repositorySignals: [
    {
      label: 'Explicit trust boundaries',
      text: 'The design documents what HAVEN can verify, what stays owner-reported, and what it intentionally refuses to collect or control.',
    },
    {
      label: 'Hardened surfaces',
      text: 'TLS 1.3 mutual authentication protects agent reports, sensitive owner state is encrypted at rest, and the Electron client exposes no Node, filesystem, shell, preload, or IPC bridge.',
    },
    {
      label: 'Verification discipline',
      text: 'Go and frontend invariant tests, race detection, coverage gates, vulnerability checks, signed release inputs, bounded fixtures, and a synthetic-only portfolio mode support safer iteration.',
    },
  ],
  nextSteps: [
    {
      label: 'Pre-release hardening',
      text: 'Continue threat-model review, upgrade and recovery testing, schema-compatibility work, and long-running observation tests before treating HAVEN as dependable infrastructure.',
    },
    {
      label: 'Distribution path',
      text: 'Finish repeatable signing, installation, update, and rollback paths for the hub, Windows and Linux agents, and desktop client.',
    },
    {
      label: 'Coverage without overreach',
      text: 'Broaden useful endpoint and appliance evidence only where it remains read-only, explainable, portable, and inside the documented privacy boundary.',
    },
  ],
  tags: flattenTagGroups(havenTagGroups),
  tagGroups: havenTagGroups,
  href: 'https://github.com/AdamWentworth/Haven',
  icon: ShieldCheck,
  accent: 'haven',
  brand: {
    alt: 'HAVEN',
    icon: '/products/haven/haven-app-icon.svg',
    iconFrame: 'dark',
    lockupFrame: 'dark',
    wordmark: '/products/haven/haven-wordmark.svg',
  },
  demo: {
    kind: 'haven',
    label: 'Security observatory walkthrough',
    metric: 'Synthetic-only demo',
    summary:
      'A portfolio-safe walkthrough of the real HAVEN console using invented devices, observations, account profiles, and security events.',
    steps: ['Review current posture', 'Trace device and network evidence', 'Inspect continuity and recovery'],
    scenes: [
      {
        label: 'Overview to evidence',
        text: 'Move from the household summary into enrolled-device posture and browser-specific evidence without losing the source or confidence of each observation.',
      },
      {
        label: 'Network to accounts',
        text: 'Review service exposure and appliance coverage, then compare it with privacy-bounded account readiness and the activity ledger.',
      },
      {
        label: 'Operations and recovery',
        text: 'Confirm runtime health, compatibility, backup scope, and repair guidance from the same responsive console.',
      },
    ],
  },
};
