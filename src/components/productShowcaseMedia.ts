import { Moon, Sun, type LucideIcon } from 'lucide-react';

export type DemoViewport = 'desktop' | 'mobile';
export type DemoThemeId = 'dark' | 'light' | 'standard';

export type CapturedDemoMoment = {
  id: string;
  label: string;
  description: string;
  mediaKey: string;
  posterKey?: string;
};

export type CapturedScreenshot = {
  id: string;
  label: string;
  imageKey: string;
};

export type CapturedDemoTheme = {
  id: DemoThemeId;
  label: string;
  Icon?: LucideIcon;
};

export type CapturedMediaConfig = {
  productName: string;
  visualClassName?: string;
  viewports?: DemoViewport[];
  themes: CapturedDemoTheme[];
  moments: CapturedDemoMoment[];
  screenshots: CapturedScreenshot[];
  videoPath: (theme: DemoThemeId, mediaKey: string, viewport: DemoViewport) => string;
  videoType?: string;
  posterPath?: (theme: DemoThemeId, moment: CapturedDemoMoment, viewport: DemoViewport) => string;
  screenshotPath: (theme: DemoThemeId, imageKey: string, viewport: DemoViewport) => string;
  themeClassName?: (theme: DemoThemeId) => string;
};

const nexusDemoMoments: CapturedDemoMoment[] = [
  {
    id: 'collection',
    label: 'Collection',
    description: 'Favorites-first collection browsing with owned-instance overlays and live Pokemon artwork.',
    mediaKey: 'collection-overlay',
  },
  {
    id: 'search',
    label: 'Search',
    description: 'Pokemon filters, list results, location context, and the map-backed discovery surface.',
    mediaKey: 'search-results',
  },
  {
    id: 'edit',
    label: 'Edit Instance',
    description: 'A caught instance edit flow with moves, IVs, location autocomplete, date, and ball metadata.',
    mediaKey: 'workflow-instance-edit',
  },
  {
    id: 'account',
    label: 'Account',
    description: 'Registration, account details, profile edits, and cleanup in one end-to-end lifecycle.',
    mediaKey: 'auth-lifecycle',
  },
];

const nexusScreenshots: CapturedScreenshot[] = [
  {
    id: 'collection',
    label: 'Collection',
    imageKey: 'collection',
  },
  {
    id: 'overlay',
    label: 'Overlay',
    imageKey: 'instance-overlay',
  },
  {
    id: 'list',
    label: 'List',
    imageKey: 'search-results-list',
  },
  {
    id: 'map',
    label: 'Map',
    imageKey: 'search-results-map',
  },
];

const nexusMediaBasePath = '/products/pokemon-go-nexus/demo';

function nexusVideoPath(theme: DemoThemeId, mediaKey: string, viewport: DemoViewport) {
  return `${nexusMediaBasePath}/videos/${theme}-${mediaKey}-${viewport}.webm`;
}

function nexusPosterPath(theme: DemoThemeId, moment: CapturedDemoMoment, viewport: DemoViewport) {
  return `${nexusMediaBasePath}/posters/${theme}-${moment.mediaKey}-${viewport}.png`;
}

function nexusScreenshotPath(theme: DemoThemeId, imageKey: string, viewport: DemoViewport) {
  return `${nexusMediaBasePath}/screenshots/${theme}-${imageKey}-${viewport}.png`;
}

const winRiftDemoMoments: CapturedDemoMoment[] = [
  {
    id: 'champion',
    label: 'Champion Discovery',
    description: 'Champion lookup into guide details with matchup-aware build, rune, and spell context.',
    mediaKey: 'champion-discovery',
    posterKey: 'champion-guide',
  },
  {
    id: 'tier-list',
    label: 'Tier List',
    description: 'Patch-aware champion tiers, role filters, and summary views for browsing the meta.',
    mediaKey: 'tier-list',
    posterKey: 'tier-list',
  },
  {
    id: 'summoner',
    label: 'Summoner Profile',
    description: 'Riot ID lookup, recent match context, ranked identity, and account-level scouting.',
    mediaKey: 'summoner-profile',
    posterKey: 'summoner-profile',
  },
  {
    id: 'live',
    label: 'Live Match',
    description: 'Live participants, focused build analysis, and win-condition reads for the current lobby.',
    mediaKey: 'live-match-analysis',
    posterKey: 'live-match',
  },
];

const winRiftScreenshots: CapturedScreenshot[] = [
  {
    id: 'home',
    label: 'Home',
    imageKey: 'home',
  },
  {
    id: 'directory',
    label: 'Directory',
    imageKey: 'champion-directory',
  },
  {
    id: 'guide',
    label: 'Guide',
    imageKey: 'champion-guide',
  },
  {
    id: 'tiers',
    label: 'Tier List',
    imageKey: 'tier-list',
  },
  {
    id: 'profile',
    label: 'Profile',
    imageKey: 'summoner-profile',
  },
  {
    id: 'match',
    label: 'Live Match',
    imageKey: 'live-match',
  },
  {
    id: 'builds',
    label: 'Builds',
    imageKey: 'live-builds',
  },
  {
    id: 'conditions',
    label: 'Win Conditions',
    imageKey: 'win-conditions',
  },
];

const winRiftMediaBasePath = '/products/winrift/demo';

function winRiftVideoPath(_theme: DemoThemeId, mediaKey: string, viewport: DemoViewport) {
  return `${winRiftMediaBasePath}/videos/winrift-${mediaKey}-${viewport}.webm`;
}

function winRiftPosterPath(_theme: DemoThemeId, moment: CapturedDemoMoment, viewport: DemoViewport) {
  return `${winRiftMediaBasePath}/screenshots/winrift-${moment.posterKey ?? moment.mediaKey}-${viewport}.png`;
}

function winRiftScreenshotPath(_theme: DemoThemeId, imageKey: string, viewport: DemoViewport) {
  return `${winRiftMediaBasePath}/screenshots/winrift-${imageKey}-${viewport}.png`;
}

const trackExtractDemoMoments: CapturedDemoMoment[] = [
  {
    id: 'import',
    label: 'Import',
    description: 'Import a demo track, select a six-stem workflow, render stems, and inspect the generated preview.',
    mediaKey: 'import-run',
    posterKey: 'workspace',
  },
  {
    id: 'models',
    label: 'Models',
    description: 'Filter model status, task, and backend metadata while choosing or installing workflow models.',
    mediaKey: 'model-library',
    posterKey: 'model-library',
  },
  {
    id: 'cleanup',
    label: 'Cleanup',
    description: 'Prepare a multi-step vocal cleanup workflow, install its required models, and run the chain.',
    mediaKey: 'cleanup-chain',
    posterKey: 'cleanup-chain',
  },
  {
    id: 'export',
    label: 'Export',
    description: 'Review generated stems, solo or mute parts, choose an export format, and export the selected stems.',
    mediaKey: 'preview-export',
    posterKey: 'rendered-stems',
  },
];

const trackExtractScreenshots: CapturedScreenshot[] = [
  {
    id: 'workspace',
    label: 'Workspace',
    imageKey: 'workspace',
  },
  {
    id: 'stems',
    label: 'Stems',
    imageKey: 'rendered-stems',
  },
  {
    id: 'models',
    label: 'Models',
    imageKey: 'model-library',
  },
  {
    id: 'cleanup',
    label: 'Setup',
    imageKey: 'cleanup-chain',
  },
];

const trackExtractMediaBasePath = '/products/trackextract/demo';

function trackExtractVideoPath(theme: DemoThemeId, mediaKey: string, viewport: DemoViewport) {
  return `${trackExtractMediaBasePath}/videos/trackextract-${theme}-${mediaKey}-${viewport}.webm`;
}

function trackExtractPosterPath(theme: DemoThemeId, moment: CapturedDemoMoment, viewport: DemoViewport) {
  return `${trackExtractMediaBasePath}/screenshots/trackextract-${theme}-${
    moment.posterKey ?? moment.mediaKey
  }-${viewport}.png`;
}

function trackExtractScreenshotPath(theme: DemoThemeId, imageKey: string, viewport: DemoViewport) {
  return `${trackExtractMediaBasePath}/screenshots/trackextract-${theme}-${imageKey}-${viewport}.png`;
}

const autochessDemoMoments: CapturedDemoMoment[] = [
  {
    id: 'trio',
    label: 'Starter Trio',
    description: 'Bulbasaur, Charmander, and Squirtle staged together to show the current board renderer.',
    mediaKey: 'starter-trio',
  },
  {
    id: 'bulbasaur-combat',
    label: 'Bulbasaur Combat',
    description: 'A level-1 Route 1 encounter against Pidgey and Rattata with combat HUD and battle feed.',
    mediaKey: 'bulbasaur-route1-combat',
  },
  {
    id: 'charmander-combat',
    label: 'Charmander Combat',
    description: 'A level-1 Charmander fight against Route 1 enemies showing attack resolution and health bars.',
    mediaKey: 'charmander-route1-combat',
  },
  {
    id: 'squirtle-combat',
    label: 'Squirtle Combat',
    description: 'A level-1 Squirtle encounter against Pidgey and Rattata in the scripted combat sandbox.',
    mediaKey: 'squirtle-route1-combat',
  },
  {
    id: 'bulbasaur',
    label: 'Bulbasaur Line',
    description: 'Starter-line content coverage with Bulbasaur and Ivysaur represented in the current build.',
    mediaKey: 'bulbasaur-line',
  },
  {
    id: 'charmander',
    label: 'Charmander Line',
    description: 'Charmander, Charmeleon, and Charizard staged with the tail-fire rendering path visible.',
    mediaKey: 'charmander-line',
  },
  {
    id: 'squirtle',
    label: 'Squirtle Line',
    description: 'Squirtle and Wartortle staged as a snapshot of the water-starter content path.',
    mediaKey: 'squirtle-line',
  },
  {
    id: 'roster',
    label: 'Dense Roster',
    description: 'A larger debug board with bench and roster density for stress-testing layout and readability.',
    mediaKey: 'dense-roster',
  },
  {
    id: 'menu',
    label: 'Menu',
    description: 'Runtime entry surface for launch, settings, and mode setup before moving into the board loop.',
    mediaKey: 'menu',
  },
];

const autochessScreenshots: CapturedScreenshot[] = [
  {
    id: 'trio',
    label: 'Starter Trio',
    imageKey: 'starter-trio',
  },
  {
    id: 'bulbasaur-combat',
    label: 'Bulbasaur Fight',
    imageKey: 'bulbasaur-route1-combat',
  },
  {
    id: 'charmander-combat',
    label: 'Charmander Fight',
    imageKey: 'charmander-route1-combat',
  },
  {
    id: 'squirtle-combat',
    label: 'Squirtle Fight',
    imageKey: 'squirtle-route1-combat',
  },
  {
    id: 'bulbasaur',
    label: 'Bulbasaur',
    imageKey: 'bulbasaur-line',
  },
  {
    id: 'charmander',
    label: 'Charmander',
    imageKey: 'charmander-line',
  },
  {
    id: 'squirtle',
    label: 'Squirtle',
    imageKey: 'squirtle-line',
  },
  {
    id: 'roster',
    label: 'Roster',
    imageKey: 'dense-roster',
  },
  {
    id: 'menu',
    label: 'Menu',
    imageKey: 'menu',
  },
];

const autochessMediaBasePath = '/products/pokemon-autochess/demo';

function autochessVideoPath(_theme: DemoThemeId, mediaKey: string, viewport: DemoViewport) {
  return `${autochessMediaBasePath}/videos/pokemon-autochess-${mediaKey}-${viewport}.mp4`;
}

function autochessPosterPath(_theme: DemoThemeId, moment: CapturedDemoMoment, viewport: DemoViewport) {
  return `${autochessMediaBasePath}/posters/pokemon-autochess-${moment.mediaKey}-${viewport}.png`;
}

function autochessScreenshotPath(_theme: DemoThemeId, imageKey: string, viewport: DemoViewport) {
  return `${autochessMediaBasePath}/screenshots/pokemon-autochess-${imageKey}-${viewport}.png`;
}

const jarvinDemoMoments: CapturedDemoMoment[] = [
  {
    id: 'morning',
    label: 'Morning Brief',
    description: 'Typed assistant chat with a weather-backed morning brief and local host status in view.',
    mediaKey: 'morning-brief',
    posterKey: 'morning-brief',
  },
  {
    id: 'task',
    label: 'Host Task',
    description: 'Approval-gated host task review for local workspace inspection without mutating files.',
    mediaKey: 'host-task-approval',
    posterKey: 'host-task-approval',
  },
  {
    id: 'settings',
    label: 'Settings',
    description: 'Host connection, voice, profile, diagnostics, model, and device controls in one desktop surface.',
    mediaKey: 'settings-tour',
    posterKey: 'settings-voice',
  },
  {
    id: 'guardrails',
    label: 'Guardrails',
    description: 'Trust and approval controls for deciding when Jarvin can perform local host actions.',
    mediaKey: 'approval-guardrails',
    posterKey: 'host-task-approval',
  },
];

const jarvinScreenshots: CapturedScreenshot[] = [
  {
    id: 'workspace',
    label: 'Workspace',
    imageKey: 'chat-workspace',
  },
  {
    id: 'brief',
    label: 'Brief',
    imageKey: 'morning-brief',
  },
  {
    id: 'task',
    label: 'Task',
    imageKey: 'host-task-approval',
  },
  {
    id: 'general',
    label: 'General',
    imageKey: 'settings-general',
  },
  {
    id: 'voice',
    label: 'Voice',
    imageKey: 'settings-voice',
  },
  {
    id: 'profile',
    label: 'Profile',
    imageKey: 'settings-profile',
  },
  {
    id: 'diagnostics',
    label: 'Diagnostics',
    imageKey: 'settings-diagnostics',
  },
];

const jarvinMediaBasePath = '/products/jarvin/demo';

function jarvinVideoPath(_theme: DemoThemeId, mediaKey: string, viewport: DemoViewport) {
  return `${jarvinMediaBasePath}/videos/jarvin-${mediaKey}-${viewport}.webm`;
}

function jarvinPosterPath(_theme: DemoThemeId, moment: CapturedDemoMoment, viewport: DemoViewport) {
  return `${jarvinMediaBasePath}/screenshots/jarvin-${moment.posterKey ?? moment.mediaKey}-${viewport}.png`;
}

function jarvinScreenshotPath(_theme: DemoThemeId, imageKey: string, viewport: DemoViewport) {
  return `${jarvinMediaBasePath}/screenshots/jarvin-${imageKey}-${viewport}.png`;
}

const cipherDemoMoments: CapturedDemoMoment[] = [
  {
    id: 'workspace',
    label: 'Workspace',
    description: 'Open a Colosseum ISO and review the loaded editor workspace, tool list, and project log.',
    mediaKey: 'workspace-loaded',
    posterKey: 'workspace',
  },
  {
    id: 'pokemon-stats',
    label: 'Pokemon Editor',
    description: 'Browse starter Pokemon records and inspect stats, typing, abilities, move slots, and evolution data.',
    mediaKey: 'pokemon-stats',
    posterKey: 'pokemon-stats',
  },
  {
    id: 'move-editor',
    label: 'Move Editor',
    description: 'Review move records with type, category, targeting, power, accuracy, PP, and behavior flags in view.',
    mediaKey: 'move-editor',
    posterKey: 'move-editor',
  },
  {
    id: 'verde',
    label: 'Trainer Editor 1',
    description: 'Review Shadow Bayleef and the surrounding story battle party in the trainer editor.',
    mediaKey: 'trainer-verde',
    posterKey: 'trainer-editor',
  },
  {
    id: 'rosso',
    label: 'Trainer Editor 2',
    description: 'Show Shadow Quilava alongside editable party, move, and battle metadata fields.',
    mediaKey: 'trainer-rosso',
    posterKey: 'trainer-editor',
  },
  {
    id: 'bluno',
    label: 'Trainer Editor 3',
    description:
      'Inspect trainer battle data with Shadow Croconaw, party slots, moves, and metadata animated in-place.',
    mediaKey: 'trainer-bluno',
    posterKey: 'trainer-editor',
  },
];

const cipherScreenshots: CapturedScreenshot[] = [
  {
    id: 'workspace',
    label: 'Workspace',
    imageKey: 'workspace',
  },
  {
    id: 'trainer',
    label: 'Trainer',
    imageKey: 'trainer-editor',
  },
  {
    id: 'stats',
    label: 'Pokemon Stats',
    imageKey: 'pokemon-stats',
  },
  {
    id: 'moves',
    label: 'Moves',
    imageKey: 'move-editor',
  },
];

const cipherMediaBasePath = '/products/cipher-snagem-editor/demo';
const cipherMediaVersion = '20260707-stats-selection-sync';

function cipherVideoPath(_theme: DemoThemeId, mediaKey: string, viewport: DemoViewport) {
  return `${cipherMediaBasePath}/videos/cipher-snagem-${mediaKey}-${viewport}.mp4?v=${cipherMediaVersion}`;
}

function cipherPosterPath(_theme: DemoThemeId, moment: CapturedDemoMoment, viewport: DemoViewport) {
  return `${cipherMediaBasePath}/screenshots/cipher-snagem-${moment.posterKey ?? moment.mediaKey}-${viewport}.png`;
}

function cipherScreenshotPath(_theme: DemoThemeId, imageKey: string, viewport: DemoViewport) {
  return `${cipherMediaBasePath}/screenshots/cipher-snagem-${imageKey}-${viewport}.png`;
}

export const nexusMediaConfig: CapturedMediaConfig = {
  productName: 'PokeGo Nexus',
  themes: [
    { id: 'dark', label: 'Dark', Icon: Moon },
    { id: 'light', label: 'Light', Icon: Sun },
  ],
  moments: nexusDemoMoments,
  screenshots: nexusScreenshots,
  videoPath: nexusVideoPath,
  posterPath: nexusPosterPath,
  screenshotPath: nexusScreenshotPath,
  themeClassName: (theme) => `nexus-media-theme-${theme}`,
};

export const winRiftMediaConfig: CapturedMediaConfig = {
  productName: 'WinRift',
  visualClassName: 'demo-visual-winrift-media',
  themes: [{ id: 'standard', label: 'Default' }],
  moments: winRiftDemoMoments,
  screenshots: winRiftScreenshots,
  videoPath: winRiftVideoPath,
  posterPath: winRiftPosterPath,
  screenshotPath: winRiftScreenshotPath,
};

export const trackExtractMediaConfig: CapturedMediaConfig = {
  productName: 'TrackExtract',
  visualClassName: 'demo-visual-trackextract-media demo-visual-desktop-only',
  viewports: ['desktop'],
  themes: [
    { id: 'dark', label: 'Dark', Icon: Moon },
    { id: 'light', label: 'Light', Icon: Sun },
  ],
  moments: trackExtractDemoMoments,
  screenshots: trackExtractScreenshots,
  videoPath: trackExtractVideoPath,
  posterPath: trackExtractPosterPath,
  screenshotPath: trackExtractScreenshotPath,
  themeClassName: (theme) => `nexus-media-theme-${theme}`,
};

export const autochessMediaConfig: CapturedMediaConfig = {
  productName: 'Pokemon Autochess',
  visualClassName: 'demo-visual-autochess-media demo-visual-desktop-only',
  viewports: ['desktop'],
  themes: [{ id: 'standard', label: 'Default' }],
  moments: autochessDemoMoments,
  screenshots: autochessScreenshots,
  videoPath: autochessVideoPath,
  videoType: 'video/mp4',
  posterPath: autochessPosterPath,
  screenshotPath: autochessScreenshotPath,
};

export const jarvinMediaConfig: CapturedMediaConfig = {
  productName: 'Jarvin',
  visualClassName: 'demo-visual-jarvin-media demo-visual-desktop-only',
  viewports: ['desktop'],
  themes: [{ id: 'standard', label: 'Default' }],
  moments: jarvinDemoMoments,
  screenshots: jarvinScreenshots,
  videoPath: jarvinVideoPath,
  posterPath: jarvinPosterPath,
  screenshotPath: jarvinScreenshotPath,
};

export const cipherMediaConfig: CapturedMediaConfig = {
  productName: 'Cipher Snagem Editor',
  visualClassName: 'demo-visual-cipher-media demo-visual-desktop-only',
  viewports: ['desktop'],
  themes: [{ id: 'standard', label: 'Default' }],
  moments: cipherDemoMoments,
  screenshots: cipherScreenshots,
  videoPath: cipherVideoPath,
  videoType: 'video/mp4',
  posterPath: cipherPosterPath,
  screenshotPath: cipherScreenshotPath,
};
