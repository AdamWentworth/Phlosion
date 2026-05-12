'use client';

import { useId, useState, type ReactNode } from 'react';

type AnimatedDetailsProps = {
  children: ReactNode;
  className?: string;
  summary: string;
};

export function AnimatedDetails({ children, className, summary }: AnimatedDetailsProps) {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const buttonId = `${panelId}-summary`;

  return (
    <div className={className} data-open={open ? 'true' : 'false'}>
      <button
        id={buttonId}
        type="button"
        className="repository-details-summary"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((current) => !current)}
      >
        {summary}
      </button>
      <div
        id={panelId}
        className="repository-details-panel"
        role="region"
        aria-labelledby={buttonId}
        aria-hidden={!open}
      >
        <div className="repository-details-panel-inner">{children}</div>
      </div>
    </div>
  );
}
