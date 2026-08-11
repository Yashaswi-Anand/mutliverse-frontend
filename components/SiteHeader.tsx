'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const NAV = [
  { href: '/', label: 'Home' },
  { href: '/privacy/', label: 'Privacy' },
  { href: '/terms/', label: 'Terms' },
];

export default function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [isLight, setIsLight] = useState(false);

  /*
    The theme itself is applied before paint by the inline script in the
    layout. This only reads back what that decided, so the button can show the
    right glyph — doing it in an effect means the first server-rendered pass
    does not disagree with the client and trigger a hydration warning.
  */
  useEffect(() => {
    const pinned = document.documentElement.dataset.theme;
    setIsLight(
      pinned
        ? pinned === 'light'
        : window.matchMedia('(prefers-color-scheme: light)').matches,
    );
  }, []);

  /* Close the menu on navigation — on a phone the page has already changed. */
  useEffect(() => setOpen(false), [pathname]);

  const toggleTheme = () => {
    const next = isLight ? 'dark' : 'light';
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem('theme', next);
    } catch {
      /* private mode — the choice just will not persist */
    }
    setIsLight(!isLight);
  };

  return (
    <header className="site-header">
      <div className="wrap">
        <Link className="brand" href="/">
          <Image src="/img/icon.png" alt="" width={30} height={30} priority />
          Multiverse
        </Link>

        <nav className={`nav${open ? ' open' : ''}`} id="nav">
          {NAV.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              aria-current={pathname === href ? 'page' : undefined}
            >
              {label}
            </Link>
          ))}
          <a href="mailto:anandyash1711@gmail.com">Contact</a>
        </nav>

        <button
          className="icon-btn"
          type="button"
          onClick={toggleTheme}
          aria-label={isLight ? 'Switch to dark theme' : 'Switch to light theme'}
        >
          {isLight ? <SunIcon /> : <MoonIcon />}
        </button>

        <button
          className="icon-btn nav-toggle"
          type="button"
          aria-expanded={open}
          aria-controls="nav"
          aria-label="Menu"
          onClick={() => setOpen((v) => !v)}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            <path d="M4 7h16M4 12h16M4 17h16" />
          </svg>
        </button>
      </div>
    </header>
  );
}

function SunIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" />
    </svg>
  );
}
