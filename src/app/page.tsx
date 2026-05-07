import {
  ArrowUpRight,
  Boxes,
  CheckCircle2,
  Code2,
  Layers3,
  Radio,
  ShieldCheck,
  Sparkles,
  Terminal,
} from 'lucide-react';
import { operatingPrinciples, projects } from '@/lib/projects';

const navItems = [
  { href: '#projects', label: 'Projects' },
  { href: '#process', label: 'Process' },
  { href: '#identity', label: 'Identity' },
  { href: '#contact', label: 'Contact' },
];

const labSignals = [
  { label: 'Product systems', value: '03', icon: Boxes },
  { label: 'Build tracks', value: 'AI / Web / Games', icon: Layers3 },
  { label: 'Release mode', value: 'Iterative', icon: Radio },
];

export default function Home() {
  return (
    <main>
      <section className="hero-shell" aria-labelledby="hero-title">
        <div className="hero-scene" aria-hidden="true">
          <div className="scene-grid" />
          <div className="scene-panel scene-panel-primary">
            <div className="scene-bar">
              <span />
              <span />
              <span />
            </div>
            <div className="scene-terminal">
              <p>phlosion build graph</p>
              <strong>projects/products/experiments</strong>
              <div className="scene-lines">
                <span />
                <span />
                <span />
              </div>
            </div>
          </div>
          <div className="scene-panel scene-panel-secondary">
            <span>ship-ready paths</span>
            <strong>
              demo {'->'} feedback {'->'} release
            </strong>
          </div>
          <div className="scene-panel scene-panel-tertiary">
            <span>local systems</span>
            <strong>tools + memory + clients</strong>
          </div>
        </div>

        <header className="site-header">
          <a className="brand-lockup" href="/" aria-label="Phlosion home">
            <span className="brand-mark">Ph</span>
            <span>Phlosion</span>
          </a>
          <nav className="site-nav" aria-label="Primary navigation">
            {navItems.map((item) => (
              <a key={item.href} href={item.href}>
                {item.label}
              </a>
            ))}
          </nav>
          <a className="header-link" href="https://adamwentworth.ca" target="_blank" rel="noreferrer">
            Founder profile
            <ArrowUpRight size={16} aria-hidden="true" />
          </a>
        </header>

        <div className="hero-content">
          <p className="eyebrow">Software product lab</p>
          <h1 id="hero-title">Phlosion</h1>
          <p className="hero-lede">
            A branded home for ambitious software experiments that are being shaped into useful products, demos, and
            production-ready systems.
          </p>
          <div className="hero-actions" aria-label="Primary actions">
            <a className="button button-primary" href="#projects">
              Explore projects
              <ArrowUpRight size={18} aria-hidden="true" />
            </a>
            <a
              className="button button-secondary"
              href="https://github.com/AdamWentworth"
              target="_blank"
              rel="noreferrer"
            >
              <Code2 size={18} aria-hidden="true" />
              GitHub
            </a>
          </div>
          <dl className="signal-row" aria-label="Phlosion lab signals">
            {labSignals.map((signal) => {
              const Icon = signal.icon;
              return (
                <div key={signal.label}>
                  <dt>
                    <Icon size={16} aria-hidden="true" />
                    {signal.label}
                  </dt>
                  <dd>{signal.value}</dd>
                </div>
              );
            })}
          </dl>
        </div>
      </section>

      <section id="projects" className="section-wrap project-section" aria-labelledby="projects-title">
        <div className="section-heading">
          <p className="eyebrow">Projects</p>
          <h2 id="projects-title">Product tracks, not resume bullets.</h2>
          <p>
            AdamWentworth.ca can stay focused on hiring signal. Phlosion is where owned projects get deeper product
            framing, demos, changelogs, and release stories.
          </p>
        </div>
        <div className="project-grid">
          {projects.map((project) => {
            const Icon = project.icon;
            return (
              <article key={project.name} className={`project-card project-card-${project.accent}`}>
                <div className="project-card-header">
                  <span className="project-icon">
                    <Icon size={22} aria-hidden="true" />
                  </span>
                  <span className="project-status">{project.status}</span>
                </div>
                <h3>{project.name}</h3>
                <p>{project.summary}</p>
                <p className="project-detail">{project.details}</p>
                <ul className="tag-list" aria-label={`${project.name} technology tags`}>
                  {project.tags.map((tag) => (
                    <li key={tag}>{tag}</li>
                  ))}
                </ul>
                <a href={project.href} target="_blank" rel="noreferrer">
                  View repository
                  <ArrowUpRight size={16} aria-hidden="true" />
                </a>
              </article>
            );
          })}
        </div>
      </section>

      <section id="process" className="section-wrap process-section" aria-labelledby="process-title">
        <div className="section-heading">
          <p className="eyebrow">Process</p>
          <h2 id="process-title">Built like the project might have users.</h2>
        </div>
        <div className="process-grid">
          {operatingPrinciples.map((principle, index) => (
            <div key={principle} className="process-item">
              <span>{String(index + 1).padStart(2, '0')}</span>
              <p>{principle}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="identity" className="section-wrap identity-section" aria-labelledby="identity-title">
        <div className="identity-panel">
          <div>
            <p className="eyebrow">Site roles</p>
            <h2 id="identity-title">Two homes with different jobs.</h2>
          </div>
          <div className="identity-grid">
            <article>
              <CheckCircle2 size={20} aria-hidden="true" />
              <h3>Phlosion.com</h3>
              <p>Brand, product pages, demos, changelogs, launch notes, and the owned project ecosystem.</p>
            </article>
            <article>
              <ShieldCheck size={20} aria-hidden="true" />
              <h3>AdamWentworth.ca</h3>
              <p>
                Recruiter-friendly resume signal, work history, education, contact details, and concise case studies.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section id="contact" className="section-wrap contact-section" aria-labelledby="contact-title">
        <div>
          <p className="eyebrow">Next</p>
          <h2 id="contact-title">Make the lab real, one release at a time.</h2>
          <p>
            The first version is a clean brand shell. From here, each project can earn a page with screenshots, demos,
            architecture notes, release history, and a sharper product promise.
          </p>
        </div>
        <div className="contact-actions">
          <a className="button button-primary" href="mailto:adamjohnwentworth@gmail.com">
            <Sparkles size={18} aria-hidden="true" />
            Start a conversation
          </a>
          <a className="button button-secondary" href="https://adamwentworth.ca" target="_blank" rel="noreferrer">
            <Terminal size={18} aria-hidden="true" />
            AdamWentworth.ca
          </a>
        </div>
      </section>
    </main>
  );
}
