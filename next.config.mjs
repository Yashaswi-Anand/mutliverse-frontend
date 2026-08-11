/** @type {import('next').NextConfig} */
const nextConfig = {
  /*
    Static export, and not negotiable for this project.

    Hostinger's Git deployment runs `git pull` into the web root and nothing
    else — it never runs a build, and its own documentation says the feature is
    "incompatible with Node.js websites". A normal Next.js server build would
    therefore never start there. `output: 'export'` produces plain HTML, CSS and
    JS in out/, which is exactly what that hosting can serve.

    The consequence to remember: no server components fetching at request time,
    no route handlers, no middleware, no ISR. This site needs none of them.
  */
  output: 'export',

  /*
    /privacy is emitted as privacy/index.html rather than privacy.html, so the
    clean URL works on any static host with no rewrite rules at all — which is
    what the old .htaccess mod_rewrite block existed to fake.
  */
  trailingSlash: true,

  /*
    next/image needs a server to optimise on the fly, and there is no server.
    Unoptimised means the files are served exactly as they sit in public/.
  */
  images: { unoptimized: true },
};

export default nextConfig;
