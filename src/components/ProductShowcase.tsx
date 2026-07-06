'use client';

import Image from 'next/image';
import { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowUpRight, CheckCircle2, ChevronLeft, ChevronRight, Moon, Sun, type LucideIcon } from 'lucide-react';
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
  themes: CapturedDemoTheme[];
  moments: CapturedDemoMoment[];
  screenshots: CapturedScreenshot[];
  videoPath: (theme: DemoThemeId, mediaKey: string, viewport: DemoViewport) => string;
  posterPath?: (theme: DemoThemeId, moment: CapturedDemoMoment, viewport: DemoViewport) => string;
  screenshotPath: (theme: DemoThemeId, imageKey: string, viewport: DemoViewport) => string;
  themeClassName?: (theme: DemoThemeId) => string;
};

type CapturedVideoSnapshot = {
  key: string;
  theme: DemoThemeId;
  label: string;
  moment: CapturedDemoMoment;
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

function CapturedVideoPair({ config, video }: { config: CapturedMediaConfig; video: CapturedVideoSnapshot }) {
  return (
    <>
      <video
        className="nexus-demo-video nexus-demo-video-desktop"
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        poster={config.posterPath?.(video.theme, video.moment, 'desktop')}
      >
        <source src={config.videoPath(video.theme, video.moment.mediaKey, 'desktop')} type="video/webm" />
      </video>
      <video
        className="nexus-demo-video nexus-demo-video-mobile"
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        poster={config.posterPath?.(video.theme, video.moment, 'mobile')}
      >
        <source src={config.videoPath(video.theme, video.moment.mediaKey, 'mobile')} type="video/webm" />
      </video>
    </>
  );
}

function CapturedMediaVisual({ config, project }: { config: CapturedMediaConfig; project: Project }) {
  const defaultTheme = config.themes[0];
  const [theme, setTheme] = useState<DemoThemeId>(defaultTheme.id);
  const [activeMomentId, setActiveMomentId] = useState(config.moments[0].id);
  const [activeScreenshotId, setActiveScreenshotId] = useState(config.screenshots[0].id);
  const [carouselDirection, setCarouselDirection] = useState<CapturedCarouselDirection>('next');
  const [carouselHasMoved, setCarouselHasMoved] = useState(false);
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
  const [previousVideo, setPreviousVideo] = useState<CapturedVideoSnapshot | null>(null);

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

  const changeScreenshot = (direction: -1 | 1) => {
    const nextIndex = (activeScreenshotIndex + direction + config.screenshots.length) % config.screenshots.length;
    setCarouselDirection(direction === 1 ? 'next' : 'previous');
    setCarouselHasMoved(true);
    setActiveScreenshotId(config.screenshots[nextIndex].id);
  };
  const selectScreenshot = (screenshotId: string) => {
    const nextIndex = config.screenshots.findIndex((screenshot) => screenshot.id === screenshotId);

    if (nextIndex < 0 || nextIndex === activeScreenshotIndex) {
      return;
    }

    const forwardDistance = (nextIndex - activeScreenshotIndex + config.screenshots.length) % config.screenshots.length;
    const backwardDistance =
      (activeScreenshotIndex - nextIndex + config.screenshots.length) % config.screenshots.length;
    setCarouselDirection(forwardDistance <= backwardDistance ? 'next' : 'previous');
    setCarouselHasMoved(true);
    setActiveScreenshotId(screenshotId);
  };

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

        <div className="nexus-media-frame" aria-label={`${activeMoment.label} demo video`}>
          {previousVideo && (
            <div key={`previous-${previousVideo.key}`} className="nexus-video-layer nexus-video-layer-previous">
              <CapturedVideoPair config={config} video={previousVideo} />
            </div>
          )}
          <div key={`active-${activeVideo.key}`} className="nexus-video-layer nexus-video-layer-active">
            <CapturedVideoPair config={config} video={activeVideo} />
          </div>
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
                    className={
                      isActive
                        ? 'nexus-carousel-slide nexus-carousel-slide-active'
                        : `nexus-carousel-slide nexus-carousel-slide-peek nexus-carousel-slide-${slot}`
                    }
                    aria-label={`Show ${screenshot.label} screenshot`}
                    aria-current={isActive ? 'true' : undefined}
                    onClick={() => selectScreenshot(screenshot.id)}
                  >
                    <Image
                      className="nexus-carousel-image nexus-carousel-image-desktop"
                      src={config.screenshotPath(theme, screenshot.imageKey, 'desktop')}
                      alt={isActive ? `${screenshot.label} ${config.productName} desktop screenshot` : ''}
                      width={1440}
                      height={1000}
                      sizes="(max-width: 640px) 0px, 520px"
                    />
                    <Image
                      className="nexus-carousel-image nexus-carousel-image-mobile"
                      src={config.screenshotPath(theme, screenshot.imageKey, 'mobile')}
                      alt={isActive ? `${screenshot.label} ${config.productName} mobile screenshot` : ''}
                      width={390}
                      height={844}
                      sizes="(max-width: 640px) 260px, 0px"
                    />
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

  if (project.demo.kind === 'jarvin') {
    const lockup = project.brand?.darkLockup ?? '/products/jarvin/jarvin-lockup-dark.png';
    const lockupSize = getImageSize(lockup, { width: 310, height: 310 });

    return (
      <div className="demo-visual demo-visual-jarvin" aria-hidden="true">
        <div className="jarvin-demo-brand">
          <Image src={lockup} alt="" width={lockupSize.width} height={lockupSize.height} sizes="310px" />
        </div>
        <div className="jarvin-demo-flow">
          <div className="assistant-thread">
            <span className="thread-user">voice: plan tomorrow</span>
            <span className="thread-tool">tool: calendar + memory</span>
            <span className="thread-result">ready: brief generated</span>
          </div>
          <div className="memory-stack">
            <span />
            <span />
            <span />
          </div>
        </div>
      </div>
    );
  }

  if (project.demo.kind === 'trackextract') {
    const lockup = project.brand?.darkLockup ?? '/products/trackextract/trackextract-logo-row-white.png';
    const lockupSize = getImageSize(lockup, { width: 368, height: 100 });

    return (
      <div className="demo-visual demo-visual-trackextract" aria-hidden="true">
        <div className="trackextract-demo-brand">
          <Image src={lockup} alt="" width={lockupSize.width} height={lockupSize.height} sizes="368px" />
        </div>
        <div className="trackextract-wave-panel">
          <div className="trackextract-waveform">
            {Array.from({ length: 32 }, (_, index) => (
              <span key={index} />
            ))}
          </div>
          <div className="trackextract-render-status">
            <span>import ready</span>
            <strong>stems rendering</strong>
            <span>export queued</span>
          </div>
        </div>
        <div className="trackextract-stem-stack">
          <span>
            <strong>Vocals</strong>
            <em />
          </span>
          <span>
            <strong>Drums</strong>
            <em />
          </span>
          <span>
            <strong>Bass</strong>
            <em />
          </span>
          <span>
            <strong>Other</strong>
            <em />
          </span>
        </div>
      </div>
    );
  }

  if (project.demo.kind === 'cipher') {
    const lockupSize = project.brand?.darkLockup
      ? getImageSize(project.brand.darkLockup, { width: 360, height: 164 })
      : null;

    return (
      <div className="demo-visual demo-visual-cipher" aria-hidden="true">
        {project.brand?.darkLockup && lockupSize && (
          <div className="cipher-demo-brand">
            <Image
              src={project.brand.darkLockup}
              alt=""
              width={lockupSize.width}
              height={lockupSize.height}
              sizes="360px"
            />
          </div>
        )}
        <div className="editor-toolbar">
          <span>Colosseum Tool</span>
          <strong>workspace clean</strong>
        </div>
        <div className="editor-table">
          <span>Trainer</span>
          <span>Pokemon</span>
          <span>Patch</span>
          <strong>Miror B.</strong>
          <strong>Ludicolo</strong>
          <strong>valid</strong>
          <strong>Evice</strong>
          <strong>Slaking</strong>
          <strong>queued</strong>
        </div>
      </div>
    );
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

export function ProductShowcase() {
  const [activeProjectName, setActiveProjectName] = useState(projects[0].name);
  const activeProject = projects.find((project) => project.name === activeProjectName) ?? projects[0];
  const demoScenes = activeProject.demo.scenes ?? [];

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
