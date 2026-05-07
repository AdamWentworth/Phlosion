import {
  ArrowUpRight,
  BadgeCheck,
  Boxes,
  Building2,
  CircleDollarSign,
  Code2,
  FileText,
  Layers3,
  MonitorCog,
  PackageCheck,
  Radio,
  Rocket,
  Sparkles,
} from 'lucide-react';
import { ProductShowcase } from '@/components/ProductShowcase';
import { companyPrinciples, engineeringPractices, operatingPrinciples, projects } from '@/lib/projects';

const navItems = [
  { href: '#products', label: 'Products' },
  { href: '#demos', label: 'Demos' },
  { href: '#engineering', label: 'Engineering' },
  { href: '#company', label: 'Company' },
  { href: '#contact', label: 'Contact' },
];

const labSignals = [
  { label: 'Owned products', value: '04', icon: Boxes },
  { label: 'Software domains', value: 'Apps / AI / Tools / Games', icon: Layers3 },
  { label: 'Business surfaces', value: 'Services / releases / support', icon: Radio },
];

const companySignals = [
  {
    label: 'Apps & Services',
    detail: 'Web/mobile products, hosted workflows, subscriptions, and community coordination software.',
    icon: Rocket,
  },
  {
    label: 'Tools & Releases',
    detail: 'Desktop applications, downloads, docs, changelogs, packaging, and support-ready release systems.',
    icon: PackageCheck,
  },
  {
    label: 'AI & Games',
    detail: 'Local assistants, automation workflows, game prototypes, runtime systems, and product experiments.',
    icon: MonitorCog,
  },
];

const principleIcons = [BadgeCheck, CircleDollarSign, FileText, Building2];
const engineeringIcons = [Layers3, MonitorCog, PackageCheck, Code2];

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
              <strong>portfolio / demos / releases</strong>
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
          <a className="header-link" href="https://github.com/AdamWentworth" target="_blank" rel="noreferrer">
            Source
            <ArrowUpRight size={16} aria-hidden="true" />
          </a>
        </header>

        <div className="hero-content">
          <p className="eyebrow">Independent software company</p>
          <h1 id="hero-title">Phlosion</h1>
          <p className="hero-lede">
            Phlosion is a software company brand for owned apps, AI systems, tools, and games. It exists to build, show,
            release, and eventually commercialize the software products created under one roof.
          </p>
          <div className="hero-actions" aria-label="Primary actions">
            <a className="button button-primary" href="#demos">
              View demos
              <ArrowUpRight size={18} aria-hidden="true" />
            </a>
            <a className="button button-secondary" href="#projects">
              Explore portfolio
              <ArrowUpRight size={18} aria-hidden="true" />
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

      <section id="products" className="section-wrap product-lines-section" aria-labelledby="products-title">
        <div className="section-heading">
          <p className="eyebrow">Products</p>
          <h2 id="products-title">A company home for owned software.</h2>
          <p>
            Each Phlosion product line has a defined audience, owned software surface, and business path. Repos still
            matter, but the company site presents the products themselves.
          </p>
        </div>
        <div className="product-line-grid">
          {projects.map((project) => {
            const Icon = project.icon;
            return (
              <article key={project.name} className={`product-line product-line-${project.accent}`}>
                <div className="product-line-top">
                  <span className="project-icon">
                    <Icon size={22} aria-hidden="true" />
                  </span>
                  <span className="project-status">{project.status}</span>
                </div>
                <p className="project-track">{project.productLine}</p>
                <h3>{project.name}</h3>
                <p>{project.summary}</p>
                <dl className="line-facts">
                  <div>
                    <dt>Phlosion owns</dt>
                    <dd>{project.ownedSurface}</dd>
                  </div>
                  <div>
                    <dt>Commercial path</dt>
                    <dd>{project.commercialPath}</dd>
                  </div>
                </dl>
                <a href="#demos">
                  View product surface
                  <ArrowUpRight size={16} aria-hidden="true" />
                </a>
              </article>
            );
          })}
        </div>
      </section>

      <ProductShowcase />

      <section id="engineering" className="section-wrap engineering-section" aria-labelledby="engineering-title">
        <div className="section-heading">
          <p className="eyebrow">Engineering</p>
          <h2 id="engineering-title">Engineering evidence in product context.</h2>
          <p>
            Phlosion keeps the technical layer visible where it helps people trust the products: architecture, interface
            quality, release discipline, and systems depth.
          </p>
        </div>
        <div className="engineering-grid" aria-label="Engineering practice areas">
          {engineeringPractices.map((practice, index) => {
            const Icon = engineeringIcons[index] ?? Code2;
            return (
              <article key={practice.label}>
                <Icon size={20} aria-hidden="true" />
                <h3>{practice.label}</h3>
                <p>{practice.detail}</p>
              </article>
            );
          })}
        </div>
        <div className="proof-matrix" aria-label="Technical evidence by product">
          {projects.map((project) => {
            const Icon = project.icon;
            return (
              <article key={project.name} className={`proof-card proof-card-${project.accent}`}>
                <div>
                  <span className="project-icon">
                    <Icon size={20} aria-hidden="true" />
                  </span>
                  <p className="project-track">{project.track}</p>
                  <h3>{project.name}</h3>
                </div>
                <ul>
                  {project.engineeringProof.map((proof) => (
                    <li key={proof}>{proof}</li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>
      </section>

      <section id="projects" className="section-wrap project-section" aria-labelledby="projects-title">
        <div className="section-heading">
          <p className="eyebrow">Technical Registry</p>
          <h2 id="projects-title">The product lines are backed by real systems.</h2>
          <p>
            Phlosion products can be shown as demos, but they also need the practical engineering beneath them:
            services, clients, tests, packaging, docs, and operational workflows.
          </p>
        </div>
        <div className="portfolio-panel" aria-label="Company portfolio positioning">
          {companySignals.map((signal) => {
            const Icon = signal.icon;
            return (
              <article key={signal.label}>
                <Icon size={20} aria-hidden="true" />
                <h3>{signal.label}</h3>
                <p>{signal.detail}</p>
              </article>
            );
          })}
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
                <p className="project-track">{project.track}</p>
                <p>{project.summary}</p>
                <p className="project-detail">{project.details}</p>
                <dl className="project-meta" aria-label={`${project.name} product context`}>
                  <div>
                    <dt>Audience</dt>
                    <dd>{project.audience}</dd>
                  </div>
                  <div>
                    <dt>Phlosion role</dt>
                    <dd>{project.companyRole}</dd>
                  </div>
                </dl>
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

      <section id="company" className="section-wrap identity-section" aria-labelledby="company-title">
        <div className="identity-panel company-panel">
          <div>
            <p className="eyebrow">Company Model</p>
            <h2 id="company-title">Built to own, ship, and operate products.</h2>
          </div>
          <div className="identity-grid company-grid">
            {companyPrinciples.map((principle, index) => {
              const Icon = principleIcons[index] ?? BadgeCheck;
              return (
                <article key={principle.label}>
                  <Icon size={20} aria-hidden="true" />
                  <h3>{principle.label}</h3>
                  <p>{principle.detail}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section id="process" className="section-wrap process-section" aria-labelledby="process-title">
        <div className="section-heading">
          <p className="eyebrow">Operating Model</p>
          <h2 id="process-title">Products should be able to become businesses.</h2>
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

      <section id="capabilities" className="section-wrap identity-section" aria-labelledby="capabilities-title">
        <div className="identity-panel">
          <div>
            <p className="eyebrow">Capabilities</p>
            <h2 id="capabilities-title">Software built with visible behavior.</h2>
          </div>
          <div className="identity-grid">
            <article>
              <MonitorCog size={20} aria-hidden="true" />
              <h3>Interactive Surfaces</h3>
              <p>
                Dashboards, desktop editors, assistant clients, game loops, and workflows that can be shown directly.
              </p>
            </article>
            <article>
              <PackageCheck size={20} aria-hidden="true" />
              <h3>Release Systems</h3>
              <p>Builds, tests, docs, packaging, downloads, and changelogs that make projects easier to trust.</p>
            </article>
          </div>
        </div>
      </section>

      <section id="contact" className="section-wrap contact-section" aria-labelledby="contact-title">
        <div>
          <p className="eyebrow">Next</p>
          <h2 id="contact-title">Build and operate the next product line.</h2>
          <p>
            Phlosion is organized around software ownership: working demos, stronger release pages, technical writeups,
            product operations, and revenue paths for tools that become real services.
          </p>
        </div>
        <div className="contact-actions">
          <a className="button button-primary" href="mailto:adamjohnwentworth@gmail.com">
            <Sparkles size={18} aria-hidden="true" />
            Contact Phlosion
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
      </section>
    </main>
  );
}
