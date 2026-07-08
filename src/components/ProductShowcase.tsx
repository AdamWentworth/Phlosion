'use client';

import Image from 'next/image';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ArrowUpRight, CheckCircle2, ChevronLeft, ChevronRight, Maximize2, X } from 'lucide-react';
import { ProjectIconFrame } from '@/components/ProjectBrand';
import {
  autochessMediaConfig,
  cipherMediaConfig,
  jarvinMediaConfig,
  nexusMediaConfig,
  trackExtractMediaConfig,
  winRiftMediaConfig,
  type CapturedDemoMoment,
  type CapturedMediaConfig,
  type CapturedScreenshot,
  type DemoThemeId,
  type DemoViewport,
} from '@/components/productShowcaseMedia';
import { getImageSize } from '@/lib/imageSizes';
import { projects, type Project } from '@/lib/projects';

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

const mediaConfigsByDemoKind = {
  nexus: nexusMediaConfig,
  winrift: winRiftMediaConfig,
  trackextract: trackExtractMediaConfig,
  autochess: autochessMediaConfig,
  jarvin: jarvinMediaConfig,
  cipher: cipherMediaConfig,
} satisfies Record<Project['demo']['kind'], CapturedMediaConfig>;

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
  const config = mediaConfigsByDemoKind[project.demo.kind];

  return <CapturedMediaVisual key={project.demo.kind} config={config} project={project} />;
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

          <div id="demo-stage" className="stage-demo">
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
