import { autochessProject } from './projects/autochess';
import { binderLedgerProject } from './projects/binderledger';
import { cipherProject } from './projects/cipher';
import { jarvinProject } from './projects/jarvin';
import { nexusProject } from './projects/nexus';
import { trackExtractProject } from './projects/trackextract';
import { winRiftProject } from './projects/winrift';
import type { Project } from './projects/types';

export type { Project, TechTagGroup } from './projects/types';

const productOrder: Record<Project['demo']['kind'], number> = {
  nexus: 0,
  winrift: 1,
  trackextract: 2,
  autochess: 3,
  jarvin: 4,
  binderledger: 5,
  cipher: 6,
};

const productCatalog: Project[] = [
  nexusProject,
  winRiftProject,
  trackExtractProject,
  autochessProject,
  jarvinProject,
  binderLedgerProject,
  cipherProject,
];

export const projects = [...productCatalog].sort(
  (left, right) => productOrder[left.demo.kind] - productOrder[right.demo.kind],
);
