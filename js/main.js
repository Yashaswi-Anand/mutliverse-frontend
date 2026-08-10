/* ============================================================
   Multiverse — shared script
   Deliberately small. The site is three static pages; anything
   that needs a framework does not belong here.
   ============================================================ */

(function () {
  'use strict';

  /* Footer year, so the copyright line never goes stale. */
  document.querySelectorAll('[data-year]').forEach(function (el) {
    el.textContent = String(new Date().getFullYear());
  });

  /* Mobile nav.
     The button carries aria-expanded so screen readers get the state, not
     just the sighted layout. */
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('.nav');

  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
    });

    /* Tapping a link should close the menu — on a phone the page has already
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

  /* Mark the current page in the nav.
     Done here rather than by hand in each file so that adding a page cannot
     leave a stale highlight behind. Matches on the file stem, which keeps it
     working whether the URL is /privacy or /privacy.html — .htaccess serves
     both. */
  var stem = location.pathname
    .replace(/\/+$/, '')
    .split('/')
    .pop()
    .replace(/\.html$/, '') || 'index';

  document.querySelectorAll('.nav a[href]').forEach(function (a) {
    var target = a.getAttribute('href')
      .split(/[?#]/)[0]
      .replace(/\/+$/, '')
      .split('/')
      .pop()
      .replace(/\.html$/, '') || 'index';

    if (target === stem) a.setAttribute('aria-current', 'page');
  });
})();
