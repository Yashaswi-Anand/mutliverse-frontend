'use client';

import { useEffect } from 'react';

/**
 * Carries the whole incoming query string across internal links while reading
 * inside the app.
 *
 * The privacy policy links to the terms and back. Without this, following one
 * of those links drops the flag, and the site chrome the app deliberately hid
 * reappears mid-document — with no obvious way back to where the reader was.
 *
 * It forwards the entire query rather than re-adding `app=1` alone, because the
 * app now sends a cache-busting `v=<build>` alongside it. The host serves these
 * documents with only `s-maxage`, which says nothing to a browser, so Chrome
 * caches them on a lifetime of its own invention and can go on showing a
 * superseded policy — measured on a real device, not assumed. The app defeats
 * that by asking for a URL no earlier build could hold. Re-adding only `app=1`
 * here would throw the token away at exactly the wrong moment: the reader would
 * arrive at a fresh privacy policy, tap through to the terms, and be handed a
 * stale one.
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

    const query = location.search.slice(1);
    if (!query) return;

    document.querySelectorAll<HTMLAnchorElement>('a[href^="/"]').forEach((a) => {
      const href = a.getAttribute('href');
      if (!href || href.includes('app=1')) return;
      a.setAttribute('href', href + (href.includes('?') ? '&' : '?') + query);
    });
  }, []);

  return null;
}
