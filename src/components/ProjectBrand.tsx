import Image from 'next/image';
import type { Project } from '@/lib/projects';
import { getImageSize } from '@/lib/imageSizes';

type ProjectIconFrameProps = {
  project: Project;
  size: number;
  inline?: boolean;
};

function ProjectIconGraphic({ project, size }: { project: Project; size: number }) {
  const Icon = project.icon;

  if (project.brand?.icon) {
    const imageSize = getImageSize(project.brand.icon, { width: size, height: size });

    return (
      <Image
        className="project-icon-image"
        src={project.brand.icon}
        alt=""
        width={imageSize.width}
        height={imageSize.height}
        sizes={`${size}px`}
      />
    );
  }

  return <Icon size={size} aria-hidden="true" />;
}

function ProjectTypeIconGraphic({ project, size }: { project: Project; size: number }) {
  const Icon = project.icon;

  return <Icon size={size} aria-hidden="true" />;
}

export function ProjectIconFrame({ project, size, inline = false }: ProjectIconFrameProps) {
  const brandFrameClass =
    project.brand?.iconFrame === 'dark' ? 'project-icon-branded' : project.brand?.icon ? 'project-icon-logo' : '';
  const className = [
    'project-icon',
    brandFrameClass,
    `project-icon-${project.demo.kind}`,
    inline ? 'project-icon-inline' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <span className={className}>
      <ProjectIconGraphic project={project} size={size} />
    </span>
  );
}

export function ProjectTypeIconFrame({ project, size, inline = false }: ProjectIconFrameProps) {
  const className = [
    'project-icon',
    'project-type-icon',
    `project-type-icon-${project.demo.kind}`,
    inline ? 'project-icon-inline' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <span className={className} aria-label={`${project.track} project type`}>
      <ProjectTypeIconGraphic project={project} size={size} />
    </span>
  );
}

export function ProjectTitle({ project }: { project: Project }) {
  if (project.brand?.wordmark) {
    const iconSize = getImageSize(project.brand.icon, { width: 72, height: 72 });
    const wordmarkSize = getImageSize(project.brand.wordmark, { width: 180, height: 64 });
    const lockupFrame = project.brand.lockupFrame ?? project.brand.iconFrame;
    const bannerClass =
      lockupFrame === 'dark'
        ? `product-brand-banner product-brand-banner-row product-brand-banner-${project.demo.kind} product-brand-banner-lockup-dark`
        : `product-brand-banner product-brand-banner-row product-brand-banner-${project.demo.kind} product-brand-banner-lockup-light`;

    return (
      <h3 className="project-title-branded">
        <span className={bannerClass}>
          <span className="product-brand-mark" aria-hidden="true">
            <Image src={project.brand.icon} alt="" width={iconSize.width} height={iconSize.height} sizes="72px" />
          </span>
          <Image
            className="product-brand-wordmark"
            src={project.brand.wordmark}
            alt={project.brand.alt}
            width={wordmarkSize.width}
            height={wordmarkSize.height}
            sizes="122px"
          />
        </span>
      </h3>
    );
  }

  return <h3>{project.name}</h3>;
}
