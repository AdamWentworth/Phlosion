import type { LucideIcon } from 'lucide-react';

export type Project = {
  name: string;
  status: 'Active build' | 'Engine prototype' | 'Host-run system' | 'Packaged release';
  track: string;
  audience: string;
  labRole: string;
  labTrack: string;
  deliverySurface: string;
  productConstraint: string;
  summary: string;
  details: string;
  proof: {
    label: string;
    text: string;
  }[];
  repositorySignals: {
    label: string;
    text: string;
  }[];
  nextSteps: {
    label: string;
    text: string;
  }[];
  tags: string[];
  tagGroups?: TechTagGroup[];
  href: string;
  icon: LucideIcon;
  accent: 'nexus' | 'winrift' | 'jarvin' | 'cipher' | 'autochess' | 'trackextract';
  brand?: {
    alt: string;
    icon: string;
    iconFrame?: 'light' | 'dark';
    lockupFrame?: 'light' | 'dark';
    lockup?: string;
    rowLockup?: string;
    wordmark?: string;
    darkLockup?: string;
  };
  demo: {
    kind: 'nexus' | 'winrift' | 'jarvin' | 'cipher' | 'autochess' | 'trackextract';
    label: string;
    metric: string;
    summary: string;
    steps: string[];
    scenes?: {
      label: string;
      text: string;
    }[];
  };
};

export type TechTagGroup = {
  label: string;
  tags: string[];
};

export const flattenTagGroups = (groups: TechTagGroup[]) => groups.flatMap((group) => group.tags);
