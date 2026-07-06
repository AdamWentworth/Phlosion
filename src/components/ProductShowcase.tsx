'use client';

import Image from 'next/image';
import { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowUpRight, CheckCircle2, ChevronLeft, ChevronRight, Moon, Sun } from 'lucide-react';
import { ProjectIconFrame } from '@/components/ProjectBrand';
import { getImageSize } from '@/lib/imageSizes';
import { projects, type Project } from '@/lib/projects';

type NexusDemoTheme = 'dark' | 'light';

type NexusDemoMoment = {
  id: string;
  label: string;
  description: string;
  mediaKey: string;
};

type NexusScreenshot = {
  id: string;
  label: string;
  imageKey: string;
};

type NexusVideoSnapshot = {
  key: string;
  theme: NexusDemoTheme;
  label: string;
  mediaKey: string;
};

type NexusCarouselDirection = 'previous' | 'next';

const nexusDemoMoments: NexusDemoMoment[] = [
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

const nexusScreenshots: NexusScreenshot[] = [
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

function nexusVideoPath(theme: NexusDemoTheme, mediaKey: string, viewport: 'desktop' | 'mobile') {
  return `${nexusMediaBasePath}/videos/${theme}-${mediaKey}-${viewport}.webm`;
}

function nexusPosterPath(theme: NexusDemoTheme, mediaKey: string, viewport: 'desktop' | 'mobile') {
  return `${nexusMediaBasePath}/posters/${theme}-${mediaKey}-${viewport}.png`;
}

function nexusScreenshotPath(theme: NexusDemoTheme, imageKey: string, viewport: 'desktop' | 'mobile') {
  return `${nexusMediaBasePath}/screenshots/${theme}-${imageKey}-${viewport}.png`;
}

function NexusVideoPair({ video }: { video: NexusVideoSnapshot }) {
  return (
    <>
      <video
        className="nexus-demo-video nexus-demo-video-desktop"
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        poster={nexusPosterPath(video.theme, video.mediaKey, 'desktop')}
      >
        <source src={nexusVideoPath(video.theme, video.mediaKey, 'desktop')} type="video/webm" />
      </video>
      <video
        className="nexus-demo-video nexus-demo-video-mobile"
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        poster={nexusPosterPath(video.theme, video.mediaKey, 'mobile')}
      >
        <source src={nexusVideoPath(video.theme, video.mediaKey, 'mobile')} type="video/webm" />
      </video>
    </>
  );
}

function NexusMediaVisual({ project }: { project: Project }) {
  const [theme, setTheme] = useState<NexusDemoTheme>('dark');
  const [activeMomentId, setActiveMomentId] = useState(nexusDemoMoments[0].id);
  const [activeScreenshotId, setActiveScreenshotId] = useState(nexusScreenshots[0].id);
  const [carouselDirection, setCarouselDirection] = useState<NexusCarouselDirection>('next');
  const [carouselHasMoved, setCarouselHasMoved] = useState(false);
  const activeMoment = nexusDemoMoments.find((moment) => moment.id === activeMomentId) ?? nexusDemoMoments[0];
  const activeScreenshot =
    nexusScreenshots.find((screenshot) => screenshot.id === activeScreenshotId) ?? nexusScreenshots[0];
  const activeScreenshotIndex = nexusScreenshots.findIndex((screenshot) => screenshot.id === activeScreenshot.id);
  const carouselScreenshots = [
    {
      slot: 'previous',
      screenshot: nexusScreenshots[(activeScreenshotIndex - 1 + nexusScreenshots.length) % nexusScreenshots.length],
    },
    {
      slot: 'active',
      screenshot: activeScreenshot,
    },
    {
      slot: 'next',
      screenshot: nexusScreenshots[(activeScreenshotIndex + 1) % nexusScreenshots.length],
    },
  ];
  const wordmarkSize = project.brand?.wordmark
    ? getImageSize(project.brand.wordmark, { width: 280, height: 88 })
    : null;
  const activeVideo = useMemo<NexusVideoSnapshot>(
    () => ({
      key: `${theme}-${activeMoment.mediaKey}`,
      theme,
      label: activeMoment.label,
      mediaKey: activeMoment.mediaKey,
    }),
    [activeMoment.label, activeMoment.mediaKey, theme],
  );
  const activeVideoRef = useRef(activeVideo);
  const [previousVideo, setPreviousVideo] = useState<NexusVideoSnapshot | null>(null);

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
    const nextIndex = (activeScreenshotIndex + direction + nexusScreenshots.length) % nexusScreenshots.length;
    setCarouselDirection(direction === 1 ? 'next' : 'previous');
    setCarouselHasMoved(true);
    setActiveScreenshotId(nexusScreenshots[nextIndex].id);
  };
  const selectScreenshot = (screenshotId: string) => {
    const nextIndex = nexusScreenshots.findIndex((screenshot) => screenshot.id === screenshotId);

    if (nextIndex < 0 || nextIndex === activeScreenshotIndex) {
      return;
    }

    const forwardDistance = (nextIndex - activeScreenshotIndex + nexusScreenshots.length) % nexusScreenshots.length;
    const backwardDistance = (activeScreenshotIndex - nextIndex + nexusScreenshots.length) % nexusScreenshots.length;
    setCarouselDirection(forwardDistance <= backwardDistance ? 'next' : 'previous');
    setCarouselHasMoved(true);
    setActiveScreenshotId(screenshotId);
  };

  return (
    <div className={`demo-visual demo-visual-nexus nexus-media-theme-${theme}`}>
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
        <div className="nexus-theme-toggle" role="group" aria-label="PokeGo Nexus media theme">
          <button type="button" aria-pressed={theme === 'dark'} onClick={() => setTheme('dark')}>
            <Moon size={14} aria-hidden="true" />
            Dark
          </button>
          <button type="button" aria-pressed={theme === 'light'} onClick={() => setTheme('light')}>
            <Sun size={14} aria-hidden="true" />
            Light
          </button>
        </div>
      </div>

      <div className="nexus-media-content">
        <div className="nexus-moment-tabs" role="group" aria-label="PokeGo Nexus demo moment">
          {nexusDemoMoments.map((moment) => (
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
              <NexusVideoPair video={previousVideo} />
            </div>
          )}
          <div key={`active-${activeVideo.key}`} className="nexus-video-layer nexus-video-layer-active">
            <NexusVideoPair video={activeVideo} />
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
              <button type="button" aria-label="Previous PokeGo Nexus screenshot" onClick={() => changeScreenshot(-1)}>
                <ChevronLeft size={16} aria-hidden="true" />
              </button>
              <button type="button" aria-label="Next PokeGo Nexus screenshot" onClick={() => changeScreenshot(1)}>
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
                      src={nexusScreenshotPath(theme, screenshot.imageKey, 'desktop')}
                      alt={isActive ? `${screenshot.label} PokeGo Nexus ${theme} desktop screenshot` : ''}
                      width={1440}
                      height={900}
                      sizes="(max-width: 640px) 0px, 520px"
                    />
                    <Image
                      className="nexus-carousel-image nexus-carousel-image-mobile"
                      src={nexusScreenshotPath(theme, screenshot.imageKey, 'mobile')}
                      alt={isActive ? `${screenshot.label} PokeGo Nexus ${theme} mobile screenshot` : ''}
                      width={390}
                      height={844}
                      sizes="(max-width: 640px) 260px, 0px"
                    />
                  </button>
                );
              })}
            </div>
          </div>
          <div className="nexus-image-tabs" role="group" aria-label="PokeGo Nexus screenshot selector">
            {nexusScreenshots.map((screenshot) => (
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
    return <NexusMediaVisual project={project} />;
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

  if (project.demo.kind === 'winrift') {
    const lockup = project.brand?.darkLockup ?? '/products/winrift/winrift-logo-tall-compact.png';
    const lockupSize = getImageSize(lockup, { width: 476, height: 335 });
    const championGuide = '/products/winrift/screenshots/champion-guide.png';
    const championGuideSize = getImageSize(championGuide, { width: 1440, height: 1200 });
    const homepage = '/products/winrift/screenshots/homepage.png';
    const homepageSize = getImageSize(homepage, { width: 1440, height: 1000 });
    const liveMatch = '/products/winrift/screenshots/live-match.png';
    const liveMatchSize = getImageSize(liveMatch, { width: 1440, height: 1050 });

    return (
      <div className="demo-visual demo-visual-winrift" aria-hidden="true">
        <div className="winrift-demo-brand">
          <Image src={lockup} alt="" width={lockupSize.width} height={lockupSize.height} sizes="150px" />
        </div>
        <div className="winrift-screen-stack">
          <div className="winrift-main-screen">
            <Image
              src={championGuide}
              alt=""
              width={championGuideSize.width}
              height={championGuideSize.height}
              sizes="(max-width: 640px) 100vw, 420px"
            />
          </div>
          <div className="winrift-secondary-screens">
            <span>
              <Image src={homepage} alt="" width={homepageSize.width} height={homepageSize.height} sizes="190px" />
            </span>
            <span>
              <Image src={liveMatch} alt="" width={liveMatchSize.width} height={liveMatchSize.height} sizes="190px" />
            </span>
          </div>
        </div>
        <div className="winrift-stat-panel">
          <span>
            <small>Champion page</small>
            <strong>24,613 games</strong>
          </span>
          <span>
            <small>Build lens</small>
            <strong>vs. Champion</strong>
          </span>
          <span>
            <small>Live scout</small>
            <strong>10 players</strong>
          </span>
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
