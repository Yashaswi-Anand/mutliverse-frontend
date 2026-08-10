# multiverse-frontend

Public website for the **Multiverse** Android app — landing page, privacy policy
and terms.

Live at **https://multiverse.socialriser.com**

The privacy policy URL is what Google Play requires in *App content → Privacy
policy* and again in the store listing:

```
https://multiverse.socialriser.com/privacy
```

## Why this is a separate repository

The app's source lives elsewhere and must stay there. Hostinger deploys by
running `git pull` straight into the web root, so **everything in this repo is
publicly reachable**. Putting the Flutter source, the BlackBox engine, or
`key.properties` in here would publish them.

Nothing secret goes in this repository.

## Layout

```
index.html      landing page
privacy.html    privacy policy   also reachable at /privacy
terms.html      terms of use     also reachable at /terms
css/style.css   shared styles, light + dark
js/main.js      footer year, mobile nav, current-page highlight
.htaccess       https redirect, clean URLs, security headers, caching
```

### Two URL forms, on purpose

Pages link to each other as `/privacy.html`, because that resolves on **any**
server — including the local one below, which does not read `.htaccess`. Linking
to `/privacy` meant the site's own navigation returned 404 during development.

On the live host `.htaccess` also serves `/privacy` and `/terms` without the
extension. That is the tidier public address, and it is what `rel="canonical"`
and the Play Console listing use. Nothing redirects between the two — both just
work.

No build step. No dependencies. Plain HTML, CSS and JS, because Hostinger's git
deployment only pulls — it does not run npm.

## Editing

Open the `.html` file and edit it. To preview locally, open the file in a
browser, or serve the folder so that the absolute `/css/...` paths resolve:

```bash
python -m http.server 8000
```

then visit http://localhost:8000

### After changing css/style.css or js/main.js

Both are cached for a week (see `.htaccess`). Bump the query string in every
page that loads them so returning visitors get the new copy:

```html
<link rel="stylesheet" href="/css/style.css?v=2">
<script src="/js/main.js?v=2"></script>
```

## Deploying

Push to `main`. Hostinger's webhook pulls the change and the site updates —
there is nothing to upload by hand.

```bash
git add -A
git commit -m "Update privacy policy"
git push
```

## Keeping the policy honest

The privacy policy describes what the app actually does, not a template. If the
app's behaviour changes, this file has to change with it — and the Play Console
**Data safety** form has to match. A mismatch between the two is a common cause
of rejection.

Two things in the current build that the policy specifically covers:

- Device diagnostics (app version, package, device model, Android version, ABI)
  are sent with **every** bug report. There is no on-screen toggle, so the policy
  is the only place the user is told — Data safety must mark this **required**.
- Bug reports are relayed by **FormSubmit**, a third party. Data safety must
  declare data as shared with a third party.

Update the "Last updated" date at the top of any page you change.
