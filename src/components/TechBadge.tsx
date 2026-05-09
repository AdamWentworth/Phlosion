import type { CSSProperties } from 'react';
import Image from 'next/image';
import { Code2 } from 'lucide-react';
import { getImageSize } from '@/lib/imageSizes';
import { getTechIcon, type CustomTechIcon } from '@/lib/techIcons';

type TechBadgeProps = {
  label: string;
};

type TechBadgeListProps = {
  labels: string[];
  ariaLabel: string;
  className?: string;
};

type TechBadgeStyle = CSSProperties & {
  '--tech-color': string;
};

function CustomTechIconGlyph({ kind }: { kind: CustomTechIcon }) {
  if (kind === 'fiber') {
    return (
      <svg aria-hidden="true" className="tech-badge-svg" viewBox="0 0 24 24">
        <path d="M2.2 6h10.7l-1 2.6H1.1L2.2 6Z" />
        <path d="M5.1 10.8h10.7l-1.1 2.7H4l1.1-2.7Z" />
        <path d="M1.2 15.7h10.7l-1.1 2.7H0.1l1.1-2.7Z" />
        <path d="M16.3 6h7.2l-.9 2.6h-7.3l1-2.6Z" opacity="0.36" />
      </svg>
    );
  }

  if (kind === 'chi') {
    return (
      <svg aria-hidden="true" className="tech-badge-svg" viewBox="0 0 24 24">
        <path d="M4.7 8.5c0-2.5 1.6-4 4.2-4h3.5v3.1H9.3c-.9 0-1.4.4-1.4 1.2v1.5h4.5v3H7.9v1.6c0 .8.5 1.2 1.4 1.2h3.1v3.2H8.9c-2.6 0-4.2-1.5-4.2-4.1V8.5Z" />
        <path
          d="M13.1 4.5h3.4v5.1c.7-.7 1.6-1 2.8-1 2.6 0 4.1 1.6 4.1 4.4v6.3H20v-5.9c0-1.1-.5-1.7-1.5-1.7-1.1 0-2 .7-2 2.1v5.5h-3.4V4.5Z"
          opacity="0.88"
        />
        <circle cx="21.2" cy="4.9" r="2.3" />
      </svg>
    );
  }

  if (kind === 'sdl') {
    return (
      <svg aria-hidden="true" className="tech-badge-svg" viewBox="0 0 24 24">
        <path d="M3.1 15.6c4.7 4.4 14.3 3.1 18-3.1l1.2.9C18.2 21 6.7 22 2 17l1.1-1.4Z" opacity="0.42" />
        <circle cx="19.2" cy="14.3" r="1.6" />
        <circle cx="15.5" cy="17.1" r="1" opacity="0.72" />
        <circle cx="10.7" cy="18.1" r="0.8" opacity="0.62" />
        <text x="10.7" y="11.6" textAnchor="middle" fontSize="9.2" fontWeight="900">
          SDL
        </text>
      </svg>
    );
  }

  if (kind === 'direct3d') {
    return (
      <svg aria-hidden="true" className="tech-badge-svg" viewBox="0 0 24 24">
        <path d="M0.6 4h4.7l2.9 4.7L11.1 4h4.7l-5.1 8 5.3 8h-4.7l-3.1-4.9L5.1 20H0.4l5.4-8L0.6 4Z" />
        <rect x="16.4" y="4" width="3.2" height="16" rx="0.8" />
        <rect x="20.8" y="4" width="3.2" height="16" rx="0.8" />
        <path
          d="M1.2 7.1h3.5l1 1.6H2.2l-1-1.6Zm12.8 0h1.1l-1 1.6h-1.2l1.1-1.6Zm2.9 0h2.2v1.6h-2.2V7.1Zm4.4 0h2.2v1.6h-2.2V7.1ZM3.5 11.2h3.1l1 1.6H4.5l-1-1.6Zm6.4 0h2.8l-1 1.6H8.9l1-1.6Zm7 0h2.2v1.6h-2.2v-1.6Zm4.4 0h2.2v1.6h-2.2v-1.6ZM2 15.3h3.1l-1.1 1.6H1l1-1.6Zm10.8 0h2.8l1.1 1.6h-2.9l-1-1.6Zm4.1 0h2.2v1.6h-2.2v-1.6Zm4.4 0h2.2v1.6h-2.2v-1.6Z"
          opacity="0.3"
        />
      </svg>
    );
  }

  if (kind === 'csharp') {
    return (
      <svg aria-hidden="true" className="tech-badge-svg tech-badge-svg-text" viewBox="0 0 24 24">
        <path d="M4 6.2 12 2l8 4.2v11.6L12 22l-8-4.2V6.2Z" opacity="0.22" />
        <text x="12" y="15.5" textAnchor="middle" fontSize="8.4" fontWeight="900">
          C#
        </text>
      </svg>
    );
  }

  if (kind === 'gamecube') {
    return (
      <svg aria-hidden="true" className="tech-badge-svg" viewBox="0 0 24 24">
        <path d="M12 2.4 21 7v10l-9 4.6L3 17V7l9-4.6Zm0 3.7L7 8.6v5.1l5 2.5 5-2.5V8.6l-5-2.5Z" />
        <path d="M7 8.6 12 11l5-2.4M12 11v5.2" opacity="0.45" />
      </svg>
    );
  }

  if (kind === 'binary') {
    return (
      <svg aria-hidden="true" className="tech-badge-svg tech-badge-svg-text" viewBox="0 0 24 24">
        <text x="12" y="10" textAnchor="middle" fontSize="6.3" fontWeight="900">
          0101
        </text>
        <text x="12" y="17.2" textAnchor="middle" fontSize="6.3" fontWeight="900" opacity="0.72">
          1100
        </text>
      </svg>
    );
  }

  if (kind === 'http') {
    return (
      <svg aria-hidden="true" className="tech-badge-svg tech-badge-svg-text" viewBox="0 0 24 24">
        <path d="M4 6h16v12H4V6Zm2 3v6h12V9H6Z" opacity="0.28" />
        <text x="12" y="15" textAnchor="middle" fontSize="6.4" fontWeight="900">
          HTTP
        </text>
      </svg>
    );
  }

  if (kind === 'voice') {
    return (
      <svg aria-hidden="true" className="tech-badge-svg" viewBox="0 0 24 24">
        <rect x="9" y="3" width="6" height="11" rx="3" />
        <path d="M6 10h2c0 3 1.5 5 4 5s4-2 4-5h2c0 3.8-2 6.5-5 7v3h3v2H8v-2h3v-3c-3-.5-5-3.2-5-7Z" opacity="0.55" />
      </svg>
    );
  }

  return (
    <svg aria-hidden="true" className="tech-badge-svg" viewBox="0 0 24 24">
      <path d="M5 4h14v4H5V4Zm0 6h14v4H5v-4Zm0 6h14v4H5v-4Z" />
      <path d="M8 6h8M8 12h8M8 18h8" opacity="0.35" />
    </svg>
  );
}

export function TechBadge({ label }: TechBadgeProps) {
  const icon = getTechIcon(label);
  const color = icon?.kind === 'simple' ? `#${icon.icon.hex}` : (icon?.color ?? '#00436f');
  const imageSize = icon?.kind === 'image' ? getImageSize(icon.src, { width: 18, height: 18 }) : null;

  return (
    <span className="tech-badge" style={{ '--tech-color': color } as TechBadgeStyle}>
      <span className="tech-badge-icon" aria-hidden="true">
        {icon?.kind === 'simple' ? (
          <svg className="tech-badge-svg" viewBox="0 0 24 24">
            <path d={icon.icon.path} />
          </svg>
        ) : null}
        {icon?.kind === 'image' ? (
          <Image
            className={icon.className}
            src={icon.src}
            alt={icon.alt}
            width={imageSize?.width ?? 18}
            height={imageSize?.height ?? 18}
            sizes="18px"
            unoptimized={icon.src.endsWith('.svg')}
          />
        ) : null}
        {icon?.kind === 'custom' ? <CustomTechIconGlyph kind={icon.custom} /> : null}
        {!icon ? <Code2 size={15} /> : null}
      </span>
      <span>{label}</span>
    </span>
  );
}

export function TechBadgeList({ labels, ariaLabel, className }: TechBadgeListProps) {
  const listClassName = className ? `tech-badge-list ${className}` : 'tech-badge-list';

  return (
    <ul className={listClassName} aria-label={ariaLabel}>
      {labels.map((label) => (
        <li key={label}>
          <TechBadge label={label} />
        </li>
      ))}
    </ul>
  );
}
