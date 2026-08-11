'use client';

import { useEffect } from 'react';

/**
 * Reveals anything marked `data-reveal` as it scrolls into view.
 *
 * Mounted once in the layout and works on the DOM directly rather than
 * wrapping every element, so the pages stay plain markup and there is one
 * observer instead of thirty.
 *
 * The important part is that it CANNOT hide content:
 *
 *   - `.reveal`, the class that sets opacity 0, is added here rather than in
 *     the markup. If this never runs, nothing was ever hidden.
 *   - Anything already on screen is shown immediately instead of waiting for
 *     the observer's first callback, which otherwise reads as a flash of empty
 *     page above the fold.
 *   - A timeout removes `.reveal` outright as a last resort. Adding the
 *     "shown" class would not be enough: a CSS transition that never receives
 *     a frame never advances, so in a prerendered or background tab the page
 *     would stay blank. Dropping the class leaves no opacity rule at all.
 *
 * Skipped entirely for anyone who has asked for reduced motion.
 */
export default function ScrollReveal() {
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced || !('IntersectionObserver' in window)) return;

    const targets = Array.from(
      document.querySelectorAll<HTMLElement>('[data-reveal]'),
    );
    if (targets.length === 0) return;

    targets.forEach((el) => el.classList.add('reveal'));

    const show = (el: HTMLElement) => {
      if (el.classList.contains('in')) return;
      // Stagger siblings so a row of tiles arrives as a sequence rather than
      // all at once. Capped, or a long list ends up waiting.
      const group = el.parentElement
        ? Array.from(el.parentElement.children).filter((c) =>
            c.hasAttribute('data-reveal'),
          )
        : [];
      const i = group.indexOf(el);
      el.style.setProperty('--d', `${Math.min(i, 6) * 70}ms`);
      el.classList.add('in');
    };

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          show(entry.target as HTMLElement);
          io.unobserve(entry.target);
        });
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.06 },
    );

    targets.forEach((el) => io.observe(el));

    const first = requestAnimationFrame(() => {
      targets.forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.top < window.innerHeight && r.bottom > 0) {
          show(el);
          io.unobserve(el);
        }
      });
    });

    const failsafe = window.setTimeout(() => {
      targets.forEach((el) => {
        io.unobserve(el);
        el.classList.remove('reveal');
      });
    }, 1600);

    return () => {
      cancelAnimationFrame(first);
      window.clearTimeout(failsafe);
      io.disconnect();
    };
  }, []);

  return null;
}
