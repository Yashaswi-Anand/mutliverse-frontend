import type { ReactNode } from 'react';

/** A glass feature tile — the app's clone-card treatment, on the web. */
export function Tile({
  icon,
  title,
  children,
}: {
  icon: ReactNode;
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="tile" data-reveal>
      <div className="tile-icon">{icon}</div>
      <h3>{title}</h3>
      <p>{children}</p>
    </div>
  );
}

/**
 * The small uppercase accent heading that sits above each section, matching
 * how the app labels the groups on its Settings screen.
 */
export function SectionLabel({
  icon,
  children,
}: {
  icon: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="section-label" data-reveal>
      {icon}
      {children}
    </div>
  );
}

/** One caveat in the "worth knowing" list. */
export function Note({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="note" data-reveal>
      <span className="dot" aria-hidden="true" />
      <p>
        <strong>{title}</strong> {children}
      </p>
    </div>
  );
}
