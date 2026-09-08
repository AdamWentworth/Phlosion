import { autochessProject } from './projects/autochess';
import { binderLedgerProject } from './projects/binderledger';
import { cipherProject } from './projects/cipher';
import { havenProject } from './projects/haven';
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
  haven: 3,
  autochess: 4,
  jarvin: 5,
  binderledger: 6,
  cipher: 7,
};

const productCatalog: Project[] = [
  nexusProject,
  winRiftProject,
  trackExtractProject,
  havenProject,
  autochessProject,
  jarvinProject,
  binderLedgerProject,
  cipherProject,
];

export const projects = [...productCatalog].sort(
  (left, right) => productOrder[left.demo.kind] - productOrder[right.demo.kind],
);
