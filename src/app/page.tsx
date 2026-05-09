import Image from 'next/image';
import Link from 'next/link';
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
  Sparkles,
} from 'lucide-react';
import { ProjectIconFrame, ProjectTitle } from '@/components/ProjectBrand';
import { ProductShowcase } from '@/components/ProductShowcase';
import { TechBadgeList } from '@/components/TechBadge';
import { companyPrinciples, operatingPrinciples, projects } from '@/lib/projects';

const navItems = [
  { href: '#products', label: 'Products' },
  { href: '#demos', label: 'Demos' },
  { href: '#company', label: 'Company' },
  { href: '#contact', label: 'Contact' },
];

const labSignals = [
  { label: 'Owned products', value: '04', icon: Boxes },
  { label: 'Software domains', value: 'Apps / AI / Tools / Games', icon: Layers3 },
  { label: 'Business surfaces', value: 'Services / releases / support', icon: Radio },
];

const principleIcons = [BadgeCheck, CircleDollarSign, FileText, Building2];

export default function Home() {
  return (
    <main>
      <section className="hero-shell" aria-labelledby="hero-title">
        <header className="site-header">
          <Link className="brand-lockup" href="/" aria-label="Phlosion home">
            <span className="brand-mark" aria-hidden="true">
              <Image src="/phlosion-mark.png" alt="" width={911} height={911} sizes="42px" loading="eager" />
            </span>
            <Image
              className="brand-wordmark"
              src="/phlosion-wordmark.png"
              alt="Phlosion"
              width={1877}
              height={342}
              sizes="150px"
              loading="eager"
            />
          </Link>
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
          <Image
            className="hero-brand-mark"
            src="/phlosion-mark.png"
            alt=""
            width={911}
            height={911}
            sizes="(max-width: 640px) 86px, 132px"
            aria-hidden="true"
            loading="eager"
            preload
          />
          <p className="eyebrow">Independent software company</p>
          <h1 id="hero-title" className="hero-wordmark-title">
            <Image
              className="hero-title-wordmark"
              src="/phlosion-wordmark.png"
              alt="Phlosion"
              width={1877}
              height={342}
              sizes="(max-width: 760px) 100vw, 680px"
              loading="eager"
              preload
            />
          </h1>
          <p className="hero-lede">
            Phlosion is a software company brand for owned apps, AI systems, tools, and games. It exists to build, show,
            release, and eventually commercialize the software products created under one roof.
          </p>
          <div className="hero-actions" aria-label="Primary actions">
            <a className="button button-primary" href="#demos">
              View demos
              <ArrowUpRight size={18} aria-hidden="true" />
            </a>
            <a className="button button-secondary" href="#products">
              Explore products
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
          <h2 id="products-title">Product lines under the Phlosion brand.</h2>
          <p>
            Each product line gets a public-facing shape: who it serves, what Phlosion owns, how it can be shown, and
            what path it could take toward a real release or service.
          </p>
        </div>
        <div className="product-line-grid">
          {projects.map((project) => {
            const hasBrandTitle = Boolean(project.brand?.wordmark);
            return (
              <article key={project.name} className={`product-line product-line-${project.accent}`}>
                <div className={hasBrandTitle ? 'product-line-top product-line-top-status-only' : 'product-line-top'}>
                  {!hasBrandTitle && <ProjectIconFrame project={project} size={32} />}
                  <span className="project-status">{project.status}</span>
                </div>
                <p className="project-track">{project.productLine}</p>
                <ProjectTitle project={project} />
                <p>{project.summary}</p>
                <p className="product-line-detail">{project.details}</p>
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
                <dl className="product-proof-list" aria-label={`${project.name} product detail`}>
                  {project.proof.slice(0, 2).map((proof) => (
                    <div key={proof.label}>
                      <dt>{proof.label}</dt>
                      <dd>{proof.text}</dd>
                    </div>
                  ))}
                </dl>
                <TechBadgeList
                  labels={project.tags}
                  ariaLabel={`${project.name} technology stack`}
                  className="tech-badge-list-compact"
                />
                <details className="repository-details product-repository-details">
                  <summary>Repository details</summary>
                  <dl className="project-evidence-grid" aria-label={`${project.name} deeper implementation details`}>
                    {project.proof.slice(2).map((proof) => (
                      <div key={proof.label}>
                        <dt>{proof.label}</dt>
                        <dd>{proof.text}</dd>
                      </div>
                    ))}
                  </dl>
                  <div className="repository-signals">
                    <h4>Repo signals</h4>
                    <ul>
                      {project.repositorySignals.map((signal) => (
                        <li key={signal.label}>
                          <strong>{signal.label}</strong>
                          <span>{signal.text}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </details>
                <div className="product-action-row">
                  <a href="#demos">
                    View product surface
                    <ArrowUpRight size={16} aria-hidden="true" />
                  </a>
                  <a href={project.href} target="_blank" rel="noreferrer">
                    View repository
                    <ArrowUpRight size={16} aria-hidden="true" />
                  </a>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <ProductShowcase />

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
