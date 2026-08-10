/* ============================================================
   Multiverse — shared script
   Deliberately small. The site is three static pages; anything
   that needs a framework does not belong here.
   ============================================================ */

(function () {
  'use strict';

  var root = document.documentElement;

  /* ---------- theme toggle ----------
     Mirrors the app's Appearance setting. Three states in effect: whatever
     the OS says (no stored value), or light/dark pinned by the visitor.

     The value is applied by a tiny inline script in <head> so the page never
     paints the wrong theme first. This block only wires up the button. */

  var themeBtn = document.querySelector('[data-theme-toggle]');

  if (themeBtn) {
    var systemPrefersLight = window.matchMedia('(prefers-color-scheme: light)');

    var label = function () {
      var isLight = root.dataset.theme
        ? root.dataset.theme === 'light'
        : systemPrefersLight.matches;
      themeBtn.setAttribute(
        'aria-label',
        isLight ? 'Switch to dark theme' : 'Switch to light theme'
      );
    };

    label();

    themeBtn.addEventListener('click', function () {
      var isLight = root.dataset.theme
        ? root.dataset.theme === 'light'
        : systemPrefersLight.matches;
      var next = isLight ? 'dark' : 'light';
      root.dataset.theme = next;
      try { localStorage.setItem('theme', next); } catch (e) { /* private mode */ }
      label();
    });

    /* Follow the OS if the visitor never pinned a theme. */
    systemPrefersLight.addEventListener('change', function () {
      if (!root.dataset.theme) label();
    });
  }

  /* ---------- footer year ---------- */

  document.querySelectorAll('[data-year]').forEach(function (el) {
    el.textContent = String(new Date().getFullYear());
  });

  /* ---------- mobile nav ---------- */

  var toggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('.nav');

  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
    });

    /* Tapping a link closes the menu — on a phone the page has already
       changed underneath it. */
    nav.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') {
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('open')) {
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.focus();
      }
    });
  }

  /* ---------- current page in the nav ----------
     Done here rather than by hand in each file so adding a page cannot leave
     a stale highlight behind. Matches on the file stem, so it works whether
     the URL is /privacy or /privacy.html — the host serves both. */

  var stem = location.pathname
    .replace(/\/+$/, '').split('/').pop().replace(/\.html$/, '') || 'index';

  document.querySelectorAll('.nav a[href]').forEach(function (a) {
    var target = a.getAttribute('href')
      .split(/[?#]/)[0].replace(/\/+$/, '').split('/').pop()
      .replace(/\.html$/, '') || 'index';
    if (target === stem) a.setAttribute('aria-current', 'page');
  });

  /* ---------- scroll reveal ----------
     The .reveal class (which starts an element invisible) is added HERE, not
     in the HTML. If this script fails to load, or the browser has no
     IntersectionObserver, the markup was never hidden in the first place, so
     the page still reads normally. Hiding in CSS and revealing in JS is how
     these things end up as blank pages.

     Anyone who has asked for reduced motion is skipped entirely. */

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!reduced && 'IntersectionObserver' in window) {
    var targets = document.querySelectorAll('[data-reveal]');

    if (targets.length) {
      targets.forEach(function (el) { el.classList.add('reveal'); });

      var show = function (el) {
        if (el.classList.contains('in')) return;

        /* Stagger siblings so a row of tiles arrives as a sequence rather
           than all at once. Capped, or a long list ends up waiting. */
        var group = el.parentElement
          ? Array.prototype.filter.call(
              el.parentElement.children,
              function (c) { return c.hasAttribute('data-reveal'); })
          : [];
        var i = group.indexOf(el);
        el.style.setProperty('--d', Math.min(i, 6) * 70 + 'ms');
        el.classList.add('in');
      };

      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          show(entry.target);
          io.unobserve(entry.target);
        });
      }, { rootMargin: '0px 0px -8% 0px', threshold: 0.06 });

      targets.forEach(function (el) { io.observe(el); });

      /* Anything already on screen is shown right away rather than waiting
         for the observer's first callback: above the fold there is nothing
         to "reveal on scroll", and the delay reads as a flash of empty page. */
      requestAnimationFrame(function () {
        targets.forEach(function (el) {
          var r = el.getBoundingClientRect();
          if (r.top < window.innerHeight && r.bottom > 0) {
            show(el);
            io.unobserve(el);
          }
        });
      });

      /* Last resort, and deliberately not the same mechanism as above.
         .reveal is dropped outright rather than .in being added, so the
         element ends up with no opacity rule and no transition at all.
         Adding .in would still leave it at opacity 0 anywhere frames are not
         being produced — a prerendered or background tab, a headless
         renderer — because a CSS transition that never gets a frame never
         advances. A decorative animation must never be able to hide the
         content it decorates. */
      setTimeout(function () {
        targets.forEach(function (el) {
          io.unobserve(el);
          el.classList.remove('reveal');
        });
      }, 1600);
    }
  }
})();
