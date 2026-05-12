import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowUpRight,
  Code2,
  FileText,
  GitBranch,
  Layers,
  ListChecks,
  Sparkles,
  Workflow,
  type LucideIcon,
} from 'lucide-react';
import { ProjectTitle, ProjectTypeIconFrame } from '@/components/ProjectBrand';
import { ProductShowcase } from '@/components/ProductShowcase';
import { TechBadgeGroupList, TechBadgeList } from '@/components/TechBadge';
import { projects, type Project } from '@/lib/projects';

const navItems = [
  { href: '#products', label: 'Products' },
  { href: '#sites', label: 'Sites' },
  { href: '#demos', label: 'Demos' },
  { href: '#contact', label: 'Contact' },
];

const siteBuilds = [
  {
    name: 'AdamWentworth.ca',
    status: 'Live site',
    track: 'Resume site build',
    brandStatus: 'Adam Wentworth brand system',
    stack: ['Astro', 'TypeScript', 'CSS', 'Vercel'],
    summary:
      'A personal resume site with education, experience, skills, selected projects, SEO metadata, sitemap output, and PDF resume access.',
    deliverySurface:
      'Static Astro site, structured resume content, downloadable PDF, responsive layout, and deployable build output.',
    productConstraint:
      'A resume surface has to stay fast, direct, scannable, and easy to connect back to experience, project work, and contact paths.',
    href: 'https://adamwentworth.ca',
    brand: 'resume',
  },
  {
    name: 'Phlosion.com',
    status: 'Live site',
    track: 'Software product lab surface',
    brandStatus: 'Phlosion brand system',
    stack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Vercel'],
    summary:
      'This product-lab site collects software builds with brand assets, product constraints, demo surfaces, repository evidence, and social metadata.',
    deliverySurface:
      'Next.js App Router site, Tailwind-backed styling, optimized media, generated social card, and responsive showcase sections.',
    productConstraint:
      'A product-lab site has to make varied work feel coherent without flattening the technical depth or product direction of each build.',
    href: 'https://phlosion.com',
    brand: 'phlosion',
  },
];

function SiteBrand({ site }: { site: (typeof siteBuilds)[number] }) {
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

  if (site.brand === 'resume') {
    return (
      <div className="site-brand-panel site-brand-panel-resume" aria-label="Adam Wentworth brand">
        <Image
          className="site-brand-resume-mark"
          src="/sites/adam-wentworth/aw-mark.png"
          alt=""
          width={640}
          height={640}
          sizes="92px"
        />
        <Image
          className="site-brand-resume-wordmark"
          src="/sites/adam-wentworth/aw-wordmark.png"
          alt=""
          width={1270}
          height={205}
          sizes="(max-width: 640px) 62vw, 360px"
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

type ProductDetailSectionProps = {
  icon: LucideIcon;
  title: string;
  text?: string;
  entries?: {
    label: string;
    text: string;
  }[];
};

function ProductDetailSection({ icon: Icon, title, text, entries }: ProductDetailSectionProps) {
  return (
    <section className="product-detail-section" aria-label={title}>
      <span className="product-detail-section-icon" aria-hidden="true">
        <Icon size={16} strokeWidth={2.4} />
      </span>
      <div className="product-detail-section-content">
        <h4>{title}</h4>
        {text ? <p className="product-detail-section-text">{text}</p> : null}
        {entries?.length ? (
          <dl className="product-detail-entry-list">
            {entries.map((entry) => (
              <div key={entry.label}>
                <dt>{entry.label}</dt>
                <dd>{entry.text}</dd>
              </div>
            ))}
          </dl>
        ) : null}
      </div>
    </section>
  );
}

function ProductDetails({ project }: { project: Project }) {
  return (
    <div className="product-detail-stack">
      <ProductDetailSection icon={Layers} title="Product scope" text={project.details} />
      <ProductDetailSection
        icon={Workflow}
        title="Workflow and surface"
        entries={[
          { label: 'Delivery surface', text: project.deliverySurface },
          { label: 'User/workflow fit', text: project.productConstraint },
        ]}
      />
      <ProductDetailSection icon={ListChecks} title="System behavior" entries={project.proof} />
      <ProductDetailSection icon={GitBranch} title="Codebase signals" entries={project.repositorySignals} />
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
            Phlosion is a software product lab for full-stack services, local AI systems, desktop tools, web surfaces,
            and C++ game/runtime work. The lab keeps the software itself in focus: what it does, how it is built, and
            where each build could go next.
          </p>
          <div className="hero-actions" aria-label="Primary actions">
            <a className="button button-primary" href="#products">
              Explore products
              <ArrowUpRight size={18} aria-hidden="true" />
            </a>
            <a className="button button-secondary" href="#demos">
              View demos
              <ArrowUpRight size={18} aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>

      <section id="products" className="section-wrap product-lines-section" aria-labelledby="products-title">
        <div className="section-heading">
          <p className="eyebrow">Products</p>
          <h2 id="products-title">Software experiments built like products.</h2>
          <p>
            Each build starts from a real workflow or learning goal, then follows through into architecture, interface
            design, testing, packaging, documentation, and release paths.
          </p>
        </div>
        <div className="product-line-grid">
          {projects.map((project) => {
            const hasBrandTitle = Boolean(project.brand?.wordmark);
            return (
              <article key={project.name} className={`product-line product-line-${project.accent}`}>
                <div className="product-line-top">
                  <ProjectTypeIconFrame project={project} size={24} />
                  <span className="project-status">{project.status}</span>
                </div>
                <h3 className="product-name">{project.name}</h3>
                {hasBrandTitle && <ProjectTitle project={project} />}
                <p className="project-track">
                  {project.labTrack} / {project.labRole}
                </p>
                <p>{project.summary}</p>
                {project.tagGroups ? (
                  <TechBadgeGroupList
                    groups={project.tagGroups}
                    ariaLabel={`${project.name} technology stack`}
                    className="tech-badge-groups-compact"
                  />
                ) : (
                  <TechBadgeList
                    labels={project.tags}
                    ariaLabel={`${project.name} technology stack`}
                    className="tech-badge-list-compact"
                  />
                )}
                <details className="repository-details product-repository-details">
                  <summary>More details</summary>
                  <ProductDetails project={project} />
                </details>
                <div className="product-action-row">
                  <a href="#demos">
                    View demo
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
          <p className="eyebrow">Site builds</p>
          <h2 id="sites-title">The web surfaces are part of the lab.</h2>
          <p>
            The resume site and Phlosion itself are treated as software work too: brand presentation, content modeling,
            metadata, deployment, responsiveness, and clear navigation paths.
          </p>
        </div>
        <div className="site-card-grid">
          {siteBuilds.map((site) => (
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

      <section id="contact" className="section-wrap contact-section" aria-labelledby="contact-title">
        <div>
          <p className="eyebrow">Contact</p>
          <h2 id="contact-title">Resume, GitHub, and email.</h2>
          <p>
            AdamWentworth.ca covers background and experience. Phlosion keeps the software builds, product direction,
            and implementation evidence in focus.
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
