'use client';

import Image from 'next/image';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  ArrowUpRight,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Moon,
  Sun,
  X,
  type LucideIcon,
} from 'lucide-react';
import { ProjectIconFrame } from '@/components/ProjectBrand';
import { getImageSize } from '@/lib/imageSizes';
import { projects, type Project } from '@/lib/projects';

type DemoViewport = 'desktop' | 'mobile';
type DemoThemeId = 'dark' | 'light' | 'standard';

type CapturedDemoMoment = {
  id: string;
  label: string;
  description: string;
  mediaKey: string;
  posterKey?: string;
};

type CapturedScreenshot = {
  id: string;
  label: string;
  imageKey: string;
};

type CapturedDemoTheme = {
  id: DemoThemeId;
  label: string;
  Icon?: LucideIcon;
};

type CapturedMediaConfig = {
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

const desktopMediaSize = { width: 1760, height: 1100 };
const mobileMediaSize = { width: 390, height: 844 };

type CapturedVideoSnapshot = {
  key: string;
  theme: DemoThemeId;
  label: string;
  moment: CapturedDemoMoment;
};

type CapturedLightboxMedia =
  | {
      kind: 'video';
      moment: CapturedDemoMoment;
    }
  | {
      kind: 'screenshot';
      screenshot: CapturedScreenshot;
    };

type CapturedCarouselDirection = 'previous' | 'next';

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
    description: 'Inspect trainer battle data with Shadow Croconaw, party slots, moves, and metadata animated in-place.',
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
  return `${cipherMediaBasePath}/screenshots/cipher-snagem-${
    moment.posterKey ?? moment.mediaKey
  }-${viewport}.png`;
}

function cipherScreenshotPath(_theme: DemoThemeId, imageKey: string, viewport: DemoViewport) {
  return `${cipherMediaBasePath}/screenshots/cipher-snagem-${imageKey}-${viewport}.png`;
}

const nexusMediaConfig: CapturedMediaConfig = {
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

const winRiftMediaConfig: CapturedMediaConfig = {
  productName: 'WinRift',
  visualClassName: 'demo-visual-winrift-media',
  themes: [{ id: 'standard', label: 'Default' }],
  moments: winRiftDemoMoments,
  screenshots: winRiftScreenshots,
  videoPath: winRiftVideoPath,
  posterPath: winRiftPosterPath,
  screenshotPath: winRiftScreenshotPath,
};

const trackExtractMediaConfig: CapturedMediaConfig = {
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

const autochessMediaConfig: CapturedMediaConfig = {
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

const jarvinMediaConfig: CapturedMediaConfig = {
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

const cipherMediaConfig: CapturedMediaConfig = {
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

function CapturedVideoPair({ config, video }: { config: CapturedMediaConfig; video: CapturedVideoSnapshot }) {
  const supportsDesktop = supportsDemoViewport(config, 'desktop');
  const supportsMobile = supportsDemoViewport(config, 'mobile');
  const desktopVideoPath = config.videoPath(video.theme, video.moment.mediaKey, 'desktop');
  const mobileVideoPath = config.videoPath(video.theme, video.moment.mediaKey, 'mobile');

  return (
    <>
      {supportsDesktop && (
        <video
          key={desktopVideoPath}
          className="nexus-demo-video nexus-demo-video-desktop"
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          poster={config.posterPath?.(video.theme, video.moment, 'desktop')}
        >
          <source src={desktopVideoPath} type={config.videoType ?? 'video/webm'} />
        </video>
      )}
      {supportsMobile && (
        <video
          key={mobileVideoPath}
          className="nexus-demo-video nexus-demo-video-mobile"
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          poster={config.posterPath?.(video.theme, video.moment, 'mobile')}
        >
          <source src={mobileVideoPath} type={config.videoType ?? 'video/webm'} />
        </video>
      )}
    </>
  );
}

function supportsDemoViewport(config: CapturedMediaConfig, viewport: DemoViewport) {
  return (config.viewports ?? ['desktop', 'mobile']).includes(viewport);
}

function CapturedMediaVisual({ config, project }: { config: CapturedMediaConfig; project: Project }) {
  const defaultTheme = config.themes[0];
  const [theme, setTheme] = useState<DemoThemeId>(defaultTheme.id);
  const [activeMomentId, setActiveMomentId] = useState(config.moments[0].id);
  const [activeScreenshotId, setActiveScreenshotId] = useState(config.screenshots[0].id);
  const [carouselDirection, setCarouselDirection] = useState<CapturedCarouselDirection>('next');
  const [carouselHasMoved, setCarouselHasMoved] = useState(false);
  const [lightboxMedia, setLightboxMedia] = useState<CapturedLightboxMedia | null>(null);
  const activeMoment = config.moments.find((moment) => moment.id === activeMomentId) ?? config.moments[0];
  const activeScreenshot =
    config.screenshots.find((screenshot) => screenshot.id === activeScreenshotId) ?? config.screenshots[0];
  const activeScreenshotIndex = config.screenshots.findIndex((screenshot) => screenshot.id === activeScreenshot.id);
  const carouselScreenshots = [
    {
      slot: 'previous',
      screenshot:
        config.screenshots[(activeScreenshotIndex - 1 + config.screenshots.length) % config.screenshots.length],
    },
    {
      slot: 'active',
      screenshot: activeScreenshot,
    },
    {
      slot: 'next',
      screenshot: config.screenshots[(activeScreenshotIndex + 1) % config.screenshots.length],
    },
  ];
  const wordmarkSize = project.brand?.wordmark
    ? getImageSize(project.brand.wordmark, { width: 280, height: 88 })
    : null;
  const activeVideo = useMemo<CapturedVideoSnapshot>(
    () => ({
      key: `${theme}-${activeMoment.mediaKey}`,
      theme,
      label: activeMoment.label,
      moment: activeMoment,
    }),
    [activeMoment, theme],
  );
  const activeVideoRef = useRef(activeVideo);
  const videoFrameRef = useRef<HTMLDivElement>(null);
  const imageFrameRef = useRef<HTMLDivElement>(null);
  const lightboxDesktopVideoRef = useRef<HTMLVideoElement>(null);
  const lightboxMobileVideoRef = useRef<HTMLVideoElement>(null);
  const [previousVideo, setPreviousVideo] = useState<CapturedVideoSnapshot | null>(null);
  const lightboxVideoSourceKey = lightboxMedia?.kind === 'video' ? `${theme}-${lightboxMedia.moment.mediaKey}` : null;
  const supportsDesktop = supportsDemoViewport(config, 'desktop');
  const supportsMobile = supportsDemoViewport(config, 'mobile');
  const desktopOnly = supportsDesktop && !supportsMobile;

  useEffect(() => {
    if (activeVideoRef.current.key === activeVideo.key) {
      activeVideoRef.current = activeVideo;
      return undefined;
    }

    setPreviousVideo(activeVideoRef.current);
    activeVideoRef.current = activeVideo;

    const timeout = window.setTimeout(() => {
      setPreviousVideo(null);
    }, 360);

    return () => window.clearTimeout(timeout);
  }, [activeVideo]);

  useEffect(() => {
    if (!lightboxMedia) {
      return undefined;
    }

    const previousOverflow = document.body.style.overflow;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setLightboxMedia(null);
      }
    };
    const handleNativeClick = (event: MouseEvent) => {
      const target = event.target;

      if (!(target instanceof Element)) {
        return;
      }

      if (target.closest('.nexus-media-lightbox-close') || target.classList.contains('nexus-media-lightbox')) {
        setLightboxMedia(null);
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);
    document.addEventListener('click', handleNativeClick);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('click', handleNativeClick);
    };
  }, [lightboxMedia]);

  useEffect(() => {
    if (!lightboxVideoSourceKey) {
      return;
    }

    for (const video of [lightboxDesktopVideoRef.current, lightboxMobileVideoRef.current]) {
      if (!video) {
        continue;
      }

      video.load();
      void video.play().catch(() => {});
    }
  }, [lightboxVideoSourceKey]);

  const changeScreenshot = (direction: -1 | 1) => {
    const nextIndex = (activeScreenshotIndex + direction + config.screenshots.length) % config.screenshots.length;
    setCarouselDirection(direction === 1 ? 'next' : 'previous');
    setCarouselHasMoved(true);
    setActiveScreenshotId(config.screenshots[nextIndex].id);
  };
  const selectScreenshot = useCallback(
    (screenshotId: string) => {
      const nextIndex = config.screenshots.findIndex((screenshot) => screenshot.id === screenshotId);

      if (nextIndex < 0 || nextIndex === activeScreenshotIndex) {
        return;
      }

      const forwardDistance =
        (nextIndex - activeScreenshotIndex + config.screenshots.length) % config.screenshots.length;
      const backwardDistance =
        (activeScreenshotIndex - nextIndex + config.screenshots.length) % config.screenshots.length;
      setCarouselDirection(forwardDistance <= backwardDistance ? 'next' : 'previous');
      setCarouselHasMoved(true);
      setActiveScreenshotId(screenshotId);
    },
    [activeScreenshotIndex, config.screenshots],
  );
  const showLightboxVideo = useCallback((moment: CapturedDemoMoment) => {
    setActiveMomentId(moment.id);
    setLightboxMedia({ kind: 'video', moment });
  }, []);
  const showLightboxScreenshot = useCallback(
    (screenshot: CapturedScreenshot) => {
      selectScreenshot(screenshot.id);
      setLightboxMedia({ kind: 'screenshot', screenshot });
    },
    [selectScreenshot],
  );
  const openVideoLightbox = useCallback(() => showLightboxVideo(activeMoment), [activeMoment, showLightboxVideo]);
  const openScreenshotLightbox = showLightboxScreenshot;
  const changeLightboxMedia = useCallback(
    (direction: -1 | 1) => {
      if (!lightboxMedia) {
        return;
      }

      if (lightboxMedia.kind === 'video') {
        const currentIndex = config.moments.findIndex((moment) => moment.id === lightboxMedia.moment.id);
        const nextMoment = config.moments[(currentIndex + direction + config.moments.length) % config.moments.length];
        showLightboxVideo(nextMoment);
        return;
      }

      const currentIndex = config.screenshots.findIndex((screenshot) => screenshot.id === lightboxMedia.screenshot.id);
      const nextScreenshot =
        config.screenshots[(currentIndex + direction + config.screenshots.length) % config.screenshots.length];
      setCarouselDirection(direction === 1 ? 'next' : 'previous');
      setCarouselHasMoved(true);
      setActiveScreenshotId(nextScreenshot.id);
      setLightboxMedia({ kind: 'screenshot', screenshot: nextScreenshot });
    },
    [config.moments, config.screenshots, lightboxMedia, showLightboxVideo],
  );

  useEffect(() => {
    const frame = videoFrameRef.current;

    if (!frame) {
      return undefined;
    }

    frame.addEventListener('click', openVideoLightbox);

    return () => frame.removeEventListener('click', openVideoLightbox);
  }, [openVideoLightbox]);

  useEffect(() => {
    const frame = imageFrameRef.current;

    if (!frame) {
      return undefined;
    }

    const handleNativeScreenshotClick = (event: MouseEvent) => {
      const target = event.target;

      if (!(target instanceof Element)) {
        return;
      }

      const activeSlide = target.closest<HTMLButtonElement>('.nexus-carousel-slide-active');
      const screenshotId = activeSlide?.dataset.screenshotId;
      const screenshot = config.screenshots.find((item) => item.id === screenshotId);

      if (screenshot) {
        openScreenshotLightbox(screenshot);
      }
    };

    frame.addEventListener('click', handleNativeScreenshotClick);

    return () => frame.removeEventListener('click', handleNativeScreenshotClick);
  }, [config.screenshots, openScreenshotLightbox]);

  const themeClassName = config.themeClassName?.(theme) ?? '';
  const visualClassName = ['demo-visual', 'demo-visual-nexus', config.visualClassName, themeClassName]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={visualClassName}>
      <div className="nexus-media-toolbar">
        {project.brand?.wordmark && wordmarkSize && (
          <span className="nexus-media-brand">
            <Image
              src={project.brand.wordmark}
              alt=""
              width={wordmarkSize.width}
              height={wordmarkSize.height}
              sizes="(max-width: 640px) 150px, 220px"
            />
          </span>
        )}
        {config.themes.length > 1 && (
          <div className="nexus-theme-toggle" role="group" aria-label={`${config.productName} media theme`}>
            {config.themes.map((themeOption) => {
              const Icon = themeOption.Icon;

              return (
                <button
                  key={themeOption.id}
                  type="button"
                  aria-pressed={theme === themeOption.id}
                  onClick={() => setTheme(themeOption.id)}
                >
                  {Icon && <Icon size={14} aria-hidden="true" />}
                  {themeOption.label}
                </button>
              );
            })}
          </div>
        )}
      </div>

      <div className="nexus-media-content">
        <div className="nexus-moment-tabs" role="group" aria-label={`${config.productName} demo moment`}>
          {config.moments.map((moment) => (
            <button
              key={moment.id}
              type="button"
              aria-pressed={activeMoment.id === moment.id}
              onClick={() => setActiveMomentId(moment.id)}
            >
              {moment.label}
            </button>
          ))}
        </div>

        <div
          ref={videoFrameRef}
          className="nexus-media-frame"
          role="button"
          tabIndex={0}
          aria-label={`Enlarge ${activeMoment.label} ${config.productName} video`}
          onMouseUp={openVideoLightbox}
          onClick={openVideoLightbox}
          onKeyDown={(event) => {
            if (event.key === 'Enter' || event.key === ' ') {
              event.preventDefault();
              openVideoLightbox();
            }
          }}
        >
          {previousVideo && (
            <div key={`previous-${previousVideo.key}`} className="nexus-video-layer nexus-video-layer-previous">
              <CapturedVideoPair config={config} video={previousVideo} />
            </div>
          )}
          <div key={`active-${activeVideo.key}`} className="nexus-video-layer nexus-video-layer-active">
            <CapturedVideoPair config={config} video={activeVideo} />
          </div>
          <span className="nexus-media-expand-hitbox" aria-hidden="true">
            <Maximize2 size={16} aria-hidden="true" />
          </span>
        </div>

        <div className="nexus-media-details">
          <strong>{activeMoment.label}</strong>
          <p>{activeMoment.description}</p>
        </div>

        <div className="nexus-image-carousel">
          <div className="nexus-image-header">
            <span>Screens</span>
            <div className="nexus-image-arrows">
              <button
                type="button"
                aria-label={`Previous ${config.productName} screenshot`}
                onClick={() => changeScreenshot(-1)}
              >
                <ChevronLeft size={16} aria-hidden="true" />
              </button>
              <button
                type="button"
                aria-label={`Next ${config.productName} screenshot`}
                onClick={() => changeScreenshot(1)}
              >
                <ChevronRight size={16} aria-hidden="true" />
              </button>
            </div>
          </div>
          <div className="nexus-image-frame" aria-label={`${activeScreenshot.label} screenshot carousel`}>
            <div
              ref={imageFrameRef}
              className={
                carouselHasMoved
                  ? `nexus-image-peek-track nexus-image-peek-track-${carouselDirection}`
                  : 'nexus-image-peek-track'
              }
            >
              {carouselScreenshots.map(({ slot, screenshot }) => {
                const isActive = slot === 'active';

                return (
                  <button
                    key={`${slot}-${screenshot.id}`}
                    type="button"
                    data-screenshot-id={screenshot.id}
                    className={
                      isActive
                        ? 'nexus-carousel-slide nexus-carousel-slide-active'
                        : `nexus-carousel-slide nexus-carousel-slide-peek nexus-carousel-slide-${slot}`
                    }
                    aria-label={`Show ${screenshot.label} screenshot`}
                    aria-current={isActive ? 'true' : undefined}
                    onMouseUp={() => {
                      if (isActive) {
                        openScreenshotLightbox(screenshot);
                      }
                    }}
                    onClick={() => (isActive ? openScreenshotLightbox(screenshot) : selectScreenshot(screenshot.id))}
                  >
                    {supportsDesktop && (
                      <Image
                        className="nexus-carousel-image nexus-carousel-image-desktop"
                        src={config.screenshotPath(theme, screenshot.imageKey, 'desktop')}
                        alt={isActive ? `${screenshot.label} ${config.productName} desktop screenshot` : ''}
                        width={desktopMediaSize.width}
                        height={desktopMediaSize.height}
                        loading={isActive ? 'eager' : 'lazy'}
                        sizes={desktopOnly ? '(max-width: 640px) 260px, 520px' : '(max-width: 640px) 0px, 520px'}
                      />
                    )}
                    {supportsMobile && (
                      <Image
                        className="nexus-carousel-image nexus-carousel-image-mobile"
                        src={config.screenshotPath(theme, screenshot.imageKey, 'mobile')}
                        alt={isActive ? `${screenshot.label} ${config.productName} mobile screenshot` : ''}
                        width={mobileMediaSize.width}
                        height={mobileMediaSize.height}
                        loading={isActive ? 'eager' : 'lazy'}
                        sizes="(max-width: 640px) 260px, 0px"
                      />
                    )}
                    {isActive && (
                      <span className="nexus-carousel-expand-icon" aria-hidden="true">
                        <Maximize2 size={15} />
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
          <div className="nexus-image-tabs" role="group" aria-label={`${config.productName} screenshot selector`}>
            {config.screenshots.map((screenshot) => (
              <button
                key={screenshot.id}
                type="button"
                aria-pressed={activeScreenshot.id === screenshot.id}
                onClick={() => selectScreenshot(screenshot.id)}
              >
                {screenshot.label}
              </button>
            ))}
          </div>
        </div>
      </div>
      {lightboxMedia && (
        <div
          className={desktopOnly ? 'nexus-media-lightbox nexus-media-lightbox-desktop-only' : 'nexus-media-lightbox'}
          role="dialog"
          aria-modal="true"
          aria-label={`${config.productName} enlarged ${
            lightboxMedia.kind === 'video' ? lightboxMedia.moment.label : lightboxMedia.screenshot.label
          } media`}
          onClick={() => setLightboxMedia(null)}
        >
          <div className="nexus-media-lightbox-panel" onClick={(event) => event.stopPropagation()}>
            <div className="nexus-media-lightbox-bar">
              <strong>
                {lightboxMedia.kind === 'video' ? lightboxMedia.moment.label : lightboxMedia.screenshot.label}
              </strong>
              <button
                type="button"
                className="nexus-media-lightbox-close"
                aria-label="Close enlarged media"
                onClick={() => setLightboxMedia(null)}
              >
                <X size={18} aria-hidden="true" />
              </button>
            </div>
            <div className="nexus-media-lightbox-controls">
              <div className="nexus-lightbox-kind-tabs" role="group" aria-label={`${config.productName} media type`}>
                <button
                  type="button"
                  aria-pressed={lightboxMedia.kind === 'video'}
                  onClick={() => showLightboxVideo(activeMoment)}
                >
                  Videos
                </button>
                <button
                  type="button"
                  aria-pressed={lightboxMedia.kind === 'screenshot'}
                  onClick={() => showLightboxScreenshot(activeScreenshot)}
                >
                  Screens
                </button>
              </div>
              <div className="nexus-lightbox-arrows">
                <button
                  type="button"
                  aria-label={`Previous ${config.productName} ${
                    lightboxMedia.kind === 'video' ? 'video' : 'screenshot'
                  }`}
                  onClick={() => changeLightboxMedia(-1)}
                >
                  <ChevronLeft size={16} aria-hidden="true" />
                </button>
                <button
                  type="button"
                  aria-label={`Next ${config.productName} ${lightboxMedia.kind === 'video' ? 'video' : 'screenshot'}`}
                  onClick={() => changeLightboxMedia(1)}
                >
                  <ChevronRight size={16} aria-hidden="true" />
                </button>
              </div>
            </div>
            <div
              className="nexus-media-lightbox-tabs"
              role="group"
              aria-label={`${config.productName} enlarged ${
                lightboxMedia.kind === 'video' ? 'video' : 'screenshot'
              } selector`}
            >
              {lightboxMedia.kind === 'video'
                ? config.moments.map((moment) => (
                    <button
                      key={moment.id}
                      type="button"
                      aria-pressed={lightboxMedia.moment.id === moment.id}
                      onClick={() => showLightboxVideo(moment)}
                    >
                      {moment.label}
                    </button>
                  ))
                : config.screenshots.map((screenshot) => (
                    <button
                      key={screenshot.id}
                      type="button"
                      aria-pressed={lightboxMedia.screenshot.id === screenshot.id}
                      onClick={() => showLightboxScreenshot(screenshot)}
                    >
                      {screenshot.label}
                    </button>
                  ))}
            </div>
            <div className="nexus-media-lightbox-frame">
              {lightboxMedia.kind === 'video' ? (
                <>
                  {supportsDesktop && (
                    <video
                      key={config.videoPath(theme, lightboxMedia.moment.mediaKey, 'desktop')}
                      ref={lightboxDesktopVideoRef}
                      className="nexus-lightbox-video nexus-lightbox-video-desktop"
                      autoPlay
                      loop
                      muted
                      playsInline
                      controls
                      poster={config.posterPath?.(theme, lightboxMedia.moment, 'desktop')}
                    >
                      <source
                        src={config.videoPath(theme, lightboxMedia.moment.mediaKey, 'desktop')}
                        type={config.videoType ?? 'video/webm'}
                      />
                    </video>
                  )}
                  {supportsMobile && (
                    <video
                      key={config.videoPath(theme, lightboxMedia.moment.mediaKey, 'mobile')}
                      ref={lightboxMobileVideoRef}
                      className="nexus-lightbox-video nexus-lightbox-video-mobile"
                      autoPlay
                      loop
                      muted
                      playsInline
                      controls
                      poster={config.posterPath?.(theme, lightboxMedia.moment, 'mobile')}
                    >
                      <source
                        src={config.videoPath(theme, lightboxMedia.moment.mediaKey, 'mobile')}
                        type={config.videoType ?? 'video/webm'}
                      />
                    </video>
                  )}
                </>
              ) : (
                <>
                  {supportsDesktop && (
                    <Image
                      className="nexus-lightbox-image nexus-lightbox-image-desktop"
                      src={config.screenshotPath(theme, lightboxMedia.screenshot.imageKey, 'desktop')}
                      alt={`${lightboxMedia.screenshot.label} ${config.productName} desktop screenshot`}
                      width={desktopMediaSize.width}
                      height={desktopMediaSize.height}
                      sizes={desktopOnly ? '92vw' : '(max-width: 640px) 0px, 92vw'}
                    />
                  )}
                  {supportsMobile && (
                    <Image
                      className="nexus-lightbox-image nexus-lightbox-image-mobile"
                      src={config.screenshotPath(theme, lightboxMedia.screenshot.imageKey, 'mobile')}
                      alt={`${lightboxMedia.screenshot.label} ${config.productName} mobile screenshot`}
                      width={mobileMediaSize.width}
                      height={mobileMediaSize.height}
                      sizes="(max-width: 640px) 88vw, 0px"
                    />
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function DemoVisual({ project }: { project: Project }) {
  if (project.demo.kind === 'nexus') {
    return <CapturedMediaVisual key="nexus" config={nexusMediaConfig} project={project} />;
  }

  if (project.demo.kind === 'winrift') {
    return <CapturedMediaVisual key="winrift" config={winRiftMediaConfig} project={project} />;
  }

  if (project.demo.kind === 'trackextract') {
    return <CapturedMediaVisual key="trackextract" config={trackExtractMediaConfig} project={project} />;
  }

  if (project.demo.kind === 'autochess') {
    return <CapturedMediaVisual key="autochess" config={autochessMediaConfig} project={project} />;
  }

  if (project.demo.kind === 'jarvin') {
    return <CapturedMediaVisual key="jarvin" config={jarvinMediaConfig} project={project} />;
  }

  if (project.demo.kind === 'cipher') {
    return <CapturedMediaVisual key="cipher" config={cipherMediaConfig} project={project} />;
  }

  const lockupSize = project.brand?.darkLockup
    ? getImageSize(project.brand.darkLockup, { width: 340, height: 112 })
    : null;

  return (
    <div className="demo-visual demo-visual-autochess" aria-hidden="true">
      {project.brand?.darkLockup && lockupSize && (
        <div className="autochess-demo-brand">
          <Image
            src={project.brand.darkLockup}
            alt=""
            width={lockupSize.width}
            height={lockupSize.height}
            sizes="260px"
          />
        </div>
      )}
      <div className="battle-board">
        {Array.from({ length: 16 }, (_, index) => (
          <span key={index} className={index === 5 || index === 10 || index === 11 ? 'board-unit' : ''} />
        ))}
      </div>
      <div className="combat-log">
        <span>round 04</span>
        <strong>ability chain resolved</strong>
      </div>
    </div>
  );
}

function projectDemoSlug(project: Project) {
  return project.name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export function ProductShowcase() {
  const [activeProjectName, setActiveProjectName] = useState(projects[0].name);
  const activeProject = projects.find((project) => project.name === activeProjectName) ?? projects[0];
  const demoScenes = activeProject.demo.scenes ?? [];

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const requestedDemo = params.get('demo');

    if (!requestedDemo) {
      return;
    }

    const requested = requestedDemo.toLowerCase();
    const requestedProject = projects.find(
      (project) => project.demo.kind === requested || projectDemoSlug(project) === requested,
    );

    if (requestedProject) {
      const frame = window.requestAnimationFrame(() => {
        setActiveProjectName(requestedProject.name);
      });

      return () => window.cancelAnimationFrame(frame);
    }

    return undefined;
  }, []);

  return (
    <section id="demos" className="section-wrap demo-section" aria-labelledby="demos-title">
      <div className="section-heading">
        <p className="eyebrow">Demos</p>
        <h2 id="demos-title">The products need to be seen in motion.</h2>
        <p>
          This is the lab bench for product footage, screenshots, interface flows, release artifacts, and runtime loops.
          Some views use captured product media; others stage the behavior each build is designed to show.
        </p>
      </div>

      <div className="showcase-shell">
        <div className="showcase-tabs" role="group" aria-label="Product demo selector">
          {projects.map((project) => {
            const isActive = project.name === activeProject.name;
            return (
              <button
                key={project.name}
                type="button"
                aria-pressed={isActive}
                className={isActive ? 'showcase-tab showcase-tab-active' : 'showcase-tab'}
                onClick={() => setActiveProjectName(project.name)}
              >
                <ProjectIconFrame project={project} size={22} inline />
                <span>
                  <strong>{project.name}</strong>
                  <small>{project.demo.label}</small>
                </span>
              </button>
            );
          })}
        </div>

        <article className={`showcase-stage showcase-stage-${activeProject.accent}`}>
          <div className="stage-copy">
            <span className="project-status">{activeProject.status}</span>
            <h3>
              <ProjectIconFrame project={activeProject} size={30} inline />
              {activeProject.demo.label}
            </h3>
            <p>{activeProject.demo.summary}</p>
            <ul className="demo-steps">
              {activeProject.demo.steps.map((step) => (
                <li key={step}>
                  <CheckCircle2 size={16} aria-hidden="true" />
                  {step}
                </li>
              ))}
            </ul>
            {demoScenes.length > 0 && (
              <dl className="demo-scene-list" aria-label={`${activeProject.name} demo moments`}>
                {demoScenes.map((scene) => (
                  <div key={scene.label}>
                    <dt>{scene.label}</dt>
                    <dd>{scene.text}</dd>
                  </div>
                ))}
              </dl>
            )}
            <a href={activeProject.href} target="_blank" rel="noreferrer">
              Open repository
              <ArrowUpRight size={16} aria-hidden="true" />
            </a>
          </div>

          <div className="stage-demo">
            <div className="demo-window">
              <div className="demo-window-bar">
                <span />
                <span />
                <span />
                <strong>{activeProject.demo.metric}</strong>
              </div>
              <DemoVisual project={activeProject} />
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
