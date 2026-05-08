'use client';

import { useState } from 'react';
import { ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { TechBadgeList } from '@/components/TechBadge';
import { projects, type Project } from '@/lib/projects';

function ProjectIconGraphic({ project, size }: { project: Project; size: number }) {
  const Icon = project.icon;

  if (project.brand?.icon) {
    return <img className="project-icon-image" src={project.brand.icon} alt="" width={size} height={size} />;
  }

  return <Icon size={size} aria-hidden="true" />;
}

function ProjectIconFrame({ project, size }: { project: Project; size: number }) {
  const brandFrameClass =
    project.brand?.iconFrame === 'dark' ? 'project-icon-branded' : project.brand?.icon ? 'project-icon-logo' : '';
  const kindClass = `project-icon-${project.demo.kind}`;
  const className = brandFrameClass
    ? `project-icon ${brandFrameClass} ${kindClass} project-icon-inline`
    : `project-icon ${kindClass} project-icon-inline`;

  return (
    <span className={className}>
      <ProjectIconGraphic project={project} size={size} />
    </span>
  );
}

function DemoVisual({ project }: { project: Project }) {
  if (project.demo.kind === 'nexus') {
    return (
      <div className="demo-visual demo-visual-nexus" aria-hidden="true">
        <div className="demo-map">
          {project.brand?.lockup && (
            <span className="nexus-demo-brand">
              <img src={project.brand.lockup} alt="" />
            </span>
          )}
          <span className="demo-pin demo-pin-primary" />
          <span className="demo-pin demo-pin-secondary" />
          <span className="demo-pin demo-pin-tertiary" />
          <div className="demo-route" />
        </div>
        <div className="demo-feed">
          <span>Raid lobby opened</span>
          <strong>12 trainers nearby</strong>
          <span>Kafka event delivered</span>
        </div>
      </div>
    );
  }

  if (project.demo.kind === 'jarvin') {
    return (
      <div className="demo-visual demo-visual-jarvin" aria-hidden="true">
        <div className="jarvin-demo-brand">
          <img src={project.brand?.darkLockup ?? '/products/jarvin/jarvin-lockup-dark.png'} alt="" />
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

  if (project.demo.kind === 'cipher') {
    return (
      <div className="demo-visual demo-visual-cipher" aria-hidden="true">
        {project.brand?.darkLockup && (
          <div className="cipher-demo-brand">
            <img src={project.brand.darkLockup} alt="" />
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

  return (
    <div className="demo-visual demo-visual-autochess" aria-hidden="true">
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

  return (
    <section id="demos" className="section-wrap demo-section" aria-labelledby="demos-title">
      <div className="section-heading">
        <p className="eyebrow">Demos</p>
        <h2 id="demos-title">Product surfaces, not static claims.</h2>
        <p>
          Each Phlosion project is framed around a working surface: the user flow, system feedback, release artifact, or
          runtime loop that makes the software tangible.
        </p>
      </div>

      <div className="showcase-shell">
        <div className="showcase-tabs" role="tablist" aria-label="Product demo selector">
          {projects.map((project) => {
            const isActive = project.name === activeProject.name;
            return (
              <button
                key={project.name}
                type="button"
                role="tab"
                aria-selected={isActive}
                className={isActive ? 'showcase-tab showcase-tab-active' : 'showcase-tab'}
                onClick={() => setActiveProjectName(project.name)}
              >
                <ProjectIconFrame project={project} size={22} />
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
              <ProjectIconFrame project={activeProject} size={30} />
              {activeProject.demo.label}
            </h3>
            <p>{activeProject.demo.summary}</p>
            <dl className="stage-facts" aria-label={`${activeProject.name} company context`}>
              <div>
                <dt>Owned surface</dt>
                <dd>{activeProject.ownedSurface}</dd>
              </div>
              <div>
                <dt>Commercial path</dt>
                <dd>{activeProject.commercialPath}</dd>
              </div>
            </dl>
            <ul className="demo-steps">
              {activeProject.demo.steps.map((step) => (
                <li key={step}>
                  <CheckCircle2 size={16} aria-hidden="true" />
                  {step}
                </li>
              ))}
            </ul>
            <dl className="stage-proof-grid" aria-label={`${activeProject.name} implementation details`}>
              {activeProject.proof.slice(0, 3).map((proof) => (
                <div key={proof.label}>
                  <dt>{proof.label}</dt>
                  <dd>{proof.text}</dd>
                </div>
              ))}
            </dl>
            <TechBadgeList
              labels={activeProject.tags.slice(0, 8)}
              ariaLabel={`${activeProject.name} technology stack`}
              className="tech-badge-list-stage"
            />
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
