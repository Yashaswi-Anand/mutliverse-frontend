'use client';

import { useEffect } from 'react';

/**
 * Keeps `?app=1` attached while reading inside the app.
 *
 * The privacy policy links to the terms and back. Without this, following one
 * of those links drops the flag, and the site chrome the app deliberately hid
 * reappears mid-document — with no obvious way back to where the reader was.
 *
 * Those two links are plain `<a>` rather than next/link on purpose: Link
 * navigates from the href it was given as a prop, not from the DOM attribute,
 * so rewriting the attribute would change what the link looks like without
 * changing where it goes. A full page load between two static documents costs
 * nothing here.
 */
export default function EmbedLinks() {
  useEffect(() => {
    if (!document.documentElement.classList.contains('embedded')) return;

    document.querySelectorAll<HTMLAnchorElement>('a[href^="/"]').forEach((a) => {
      const href = a.getAttribute('href');
      if (!href || href.includes('app=1')) return;
      a.setAttribute('href', href + (href.includes('?') ? '&' : '?') + 'app=1');
    });
  }, []);

  return null;
}
