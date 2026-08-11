# multiverse-frontend

Website for the **Multiverse** Android app — landing page, privacy policy and
terms. Next.js, exported as a static site.

Live at **https://multiverse.socialriser.com**

The privacy policy URL is what Google Play requires in *App content → Privacy
policy* and again in the store listing:

```
https://multiverse.socialriser.com/privacy
```

## Why this is a separate repository

The app's source lives elsewhere and must stay there. The built site is served
publicly, so **anything committed here is effectively public**. Putting the
Flutter source, the BlackBox engine, or `key.properties` in this repo would
publish them. Nothing secret goes in here.

## Why the site is a static export

`next.config.mjs` sets `output: 'export'`, and that is not a stylistic choice.

Hostinger's Git deployment runs `git pull` into the web root and nothing else —
its own documentation says the feature is *"incompatible with Node.js
websites"*, and it never runs a build. A normal Next.js server build would never
start there. A static export is plain HTML, CSS and JS, which that hosting
serves fine.

The consequence: no route handlers, no middleware, no ISR, no server-side data
fetching at request time. This site needs none of them.

`trailingSlash: true` makes the export write `privacy/index.html`, so `/privacy`
resolves through `DirectoryIndex` with no rewrite rules at all.

## Layout

```
app/
  layout.tsx        shell, metadata, pre-paint theme script
  page.tsx          landing page
  privacy/page.tsx  privacy policy   → /privacy
  terms/page.tsx    terms of use     → /terms
  globals.css       the whole design system, light + dark
components/
  SiteHeader.tsx    nav, theme toggle, current-page state
  SiteFooter.tsx
  ScrollReveal.tsx  reveal-on-scroll, with a failsafe (see below)
  Tile.tsx          glass tile, section label, note
  icons.tsx         inline SVGs
public/
  img/              the app's real launcher icon
  .htaccess         https redirect, security headers, caching
```

## Developing

```bash
npm install
npm run dev          # http://localhost:3000
```

To check what actually ships:

```bash
npm run build        # writes out/
npm start            # serves out/ so the export is what you test
```

## Deploying

Push to `main`. That is the whole workflow.

```bash
git add -A
git commit -m "Update privacy policy"
git push
```

GitHub Actions (`.github/workflows/deploy.yml`) builds the site and force-pushes
the contents of `out/` to a **`deploy`** branch. Hostinger is pointed at that
branch and pulls it.

```
main    → source
deploy  → built site, ready to serve   (generated; never edit or commit by hand)
```

### One-time Hostinger setup

1. **hPanel → Websites → socialriser.com → Dashboard → Advanced → Git**
   (the Advanced menu only appears inside a website's dashboard, not on the
   main hPanel page)
2. **Continue with GitHub**, authorise, pick this repository
3. Branch: **`deploy`** — not `main`. `main` holds TypeScript, not a website.
4. Root directory: the subdomain's folder, e.g.
   `domains/multiverse.socialriser.com/public_html`

Auto-deployment is part of the GitHub integration; there is no webhook to wire
up separately.

## Two things that have already bitten this project

**Do not hand-write `-webkit-` prefixes in CSS.** The minifier adds them from
browserslist, and treats a hand-written prefixed line as the same declaration —
keeping only whichever came last. Writing both `backdrop-filter` and
`-webkit-backdrop-filter` left the tiles with only the `-webkit-` form, and the
glass blur silently vanished outside WebKit.

**The scroll reveal must never be able to hide content.** `ScrollReveal.tsx`
adds the hiding class from JavaScript, shows anything already on screen without
waiting for the observer, and after 1.6s *removes* the class outright rather
than adding the "shown" one — because a CSS transition that never receives a
frame never advances, so in a prerendered or background tab the page would stay
blank.

## Keeping the policy honest

The privacy policy describes what the app actually does, not a template. If the
app's behaviour changes, `app/privacy/page.tsx` has to change with it — and the
Play Console **Data safety** form has to match. A mismatch between the two is a
common cause of rejection.

Two things in the current build that the policy specifically covers:

- Device diagnostics (app version, package, device model, Android version, ABI)
  are sent with **every** bug report. There is no on-screen toggle, so the policy
  is the only place the user is told — Data safety must mark this **required**.
- Bug reports are relayed by **FormSubmit**, a third party. Data safety must
  declare data as shared with a third party.

Update the "Last updated" date on any page you change.
