import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowUpRight,
  BadgeCheck,
  Boxes,
  Building2,
  Code2,
  FileText,
  Layers3,
  MonitorCog,
  PackageCheck,
  Sparkles,
} from 'lucide-react';
import { ProjectIconFrame, ProjectTitle } from '@/components/ProjectBrand';
import { ProductShowcase } from '@/components/ProductShowcase';
import { TechBadgeList } from '@/components/TechBadge';
import { operatingPrinciples, productJudgmentPrinciples, projects } from '@/lib/projects';

const navItems = [
  { href: '#products', label: 'Case studies' },
  { href: '#sites', label: 'Sites' },
  { href: '#demos', label: 'Demos' },
  { href: '#company', label: 'Judgment' },
  { href: '#contact', label: 'Contact' },
];

const labSignals = [
  { label: 'Case studies', value: '04 products + 02 sites', icon: Boxes },
  { label: 'Build range', value: 'Services / AI / desktop / games', icon: Layers3 },
  { label: 'Hiring signal', value: 'Product-minded engineering', icon: BadgeCheck },
];

const principleIcons = [BadgeCheck, MonitorCog, FileText, Building2];

const siteCaseStudies = [
  {
    name: 'AdamWentworth.ca',
    status: 'Live site',
    track: 'Resume and portfolio surface',
    brandStatus: 'Personal branding pending',
    stack: ['Astro', 'TypeScript', 'CSS', 'Vercel'],
    summary:
      'A personal resume site for Adam Wentworth with education, experience, skills, selected projects, SEO metadata, sitemap output, and PDF resume access.',
    deliverySurface:
      'Static Astro site, structured resume content, downloadable PDF, responsive layout, and deployable build output.',
    productConstraint:
      'A resume site has to be fast, direct, scannable, and easy for recruiters to map back to experience and contact paths.',
    href: 'https://adamwentworth.ca',
    brand: 'placeholder',
  },
  {
    name: 'Phlosion.com',
    status: 'Live site',
    track: 'Software product lab surface',
    brandStatus: 'Phlosion brand system',
    stack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Vercel'],
    summary:
      'This product-lab site frames project work as case studies with brand assets, product constraints, demo surfaces, repository evidence, and social metadata.',
    deliverySurface:
      'Next.js App Router site, Tailwind-backed styling, optimized media, generated social card, and responsive showcase sections.',
    productConstraint:
      'A product-lab site has to make varied work feel coherent without flattening the technical depth of each project.',
    href: 'https://phlosion.com',
    brand: 'phlosion',
  },
];

function SiteBrand({ site }: { site: (typeof siteCaseStudies)[number] }) {
  if (site.brand === 'phlosion') {
    return (
      <div className="site-brand-panel site-brand-panel-phlosion" aria-label="Phlosion brand">
        <Image src="/phlosion-mark.png" alt="" width={911} height={911} sizes="72px" />
        <Image
          className="site-brand-wordmark"
          src="/phlosion-wordmark.png"
          alt="Phlosion"
          width={1877}
          height={342}
          sizes="220px"
        />
      </div>
    );
  }

  return (
    <div className="site-brand-panel site-brand-panel-pending" aria-label="AdamWentworth.ca brand pending">
      <span className="site-monogram" aria-hidden="true">
        AW
      </span>
      <span className="site-brand-copy">
        <strong>{site.name}</strong>
        <small>{site.brandStatus}</small>
      </span>
    </div>
  );
}

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
          <a className="header-link" href="https://adamwentworth.ca" target="_blank" rel="noreferrer">
            Resume
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
          <p className="eyebrow">Software product lab</p>
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
            Phlosion is a branded case-study platform for full-stack services, local AI systems, desktop tools,
            websites, and C++ game/runtime work. It shows projects through users, delivery surfaces, architecture, and
            product constraints.
          </p>
          <div className="hero-actions" aria-label="Primary actions">
            <a className="button button-primary" href="#products">
              View case studies
              <ArrowUpRight size={18} aria-hidden="true" />
            </a>
            <a className="button button-secondary" href="https://adamwentworth.ca" target="_blank" rel="noreferrer">
              Resume site
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
          <p className="eyebrow">Product case studies</p>
          <h2 id="products-title">Project work framed as product judgment.</h2>
          <p>
            Each case study connects the technical build to the person it serves, the workflow it supports, the delivery
            surface it exposes, and the constraints a hiring manager can evaluate.
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
                <p className="project-track">
                  {project.productTrack} / {project.caseStudyRole}
                </p>
                <ProjectTitle project={project} />
                <p>{project.summary}</p>
                <p className="product-line-detail">{project.details}</p>
                <dl className="line-facts">
                  <div>
                    <dt>Delivery surface</dt>
                    <dd>{project.deliverySurface}</dd>
                  </div>
                  <div>
                    <dt>User/workflow fit</dt>
                    <dd>{project.productConstraint}</dd>
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
                    View demo surface
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
        <p className="project-disclaimer">
          Pokemon-related projects are portfolio, learning, and community-support work. They are not affiliated with,
          endorsed by, or sponsored by Nintendo, The Pokemon Company, Niantic, or related rights holders.
        </p>
      </section>

      <section id="sites" className="section-wrap site-section" aria-labelledby="sites-title">
        <div className="section-heading">
          <p className="eyebrow">Sites</p>
          <h2 id="sites-title">The portfolio surfaces are part of the work.</h2>
          <p>
            These sites are separated from the product case studies, but they still show practical frontend decisions:
            brand presentation, content modeling, metadata, deployment, responsiveness, and recruiter-facing flows.
          </p>
        </div>
        <div className="site-card-grid">
          {siteCaseStudies.map((site) => (
            <article key={site.name} className="product-line site-card">
              <div className="product-line-top product-line-top-status-only">
                <span className="project-status">{site.status}</span>
              </div>
              <p className="project-track">{site.track}</p>
              <SiteBrand site={site} />
              <h3>{site.name}</h3>
              <p>{site.summary}</p>
              <dl className="line-facts">
                <div>
                  <dt>Brand surface</dt>
                  <dd>{site.brandStatus}</dd>
                </div>
                <div>
                  <dt>Delivery surface</dt>
                  <dd>{site.deliverySurface}</dd>
                </div>
                <div>
                  <dt>User/workflow fit</dt>
                  <dd>{site.productConstraint}</dd>
                </div>
              </dl>
              <TechBadgeList labels={site.stack} ariaLabel={`${site.name} technology stack`} />
              <div className="product-action-row">
                <a href={site.href} target="_blank" rel="noreferrer">
                  Open site
                  <ArrowUpRight size={16} aria-hidden="true" />
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <ProductShowcase />

      <section id="company" className="section-wrap identity-section" aria-labelledby="company-title">
        <div className="identity-panel company-panel">
          <div>
            <p className="eyebrow">Product judgment</p>
            <h2 id="company-title">Engineering decisions tied to users, support, and delivery.</h2>
          </div>
          <div className="identity-grid company-grid">
            {productJudgmentPrinciples.map((principle, index) => {
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
          <p className="eyebrow">Engineering operating model</p>
          <h2 id="process-title">The work is evaluated by how it behaves.</h2>
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
          <p className="eyebrow">For recruiters</p>
          <h2 id="contact-title">Evaluate the work, then get in touch.</h2>
          <p>
            Phlosion complements the resume site by showing product constraints, architecture, testing, deployment, and
            support decisions beyond a traditional resume.
          </p>
        </div>
        <div className="contact-actions">
          <a className="button button-primary" href="mailto:adamjohnwentworth@gmail.com">
            <Sparkles size={18} aria-hidden="true" />
            Email
          </a>
          <a className="button button-secondary" href="https://adamwentworth.ca" target="_blank" rel="noreferrer">
            <FileText size={18} aria-hidden="true" />
            Resume site
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
