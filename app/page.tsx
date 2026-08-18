import Image from 'next/image';
import Link from 'next/link';
import { Tile, SectionLabel, Note } from '@/components/Tile';
import {
  GridIcon,
  CopyIcon,
  BellIcon,
  LockIcon,
  PencilIcon,
  NoAdsIcon,
  MoonIcon,
  InfoIcon,
  SupportIcon,
} from '@/components/icons';

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="wrap">
          <Image
            className="hero-icon"
            src="/img/icon.png"
            alt="Multiverse app icon"
            width={96}
            height={96}
            priority
          />
          <span className="eyebrow" data-reveal>
            For Android
          </span>
          <h1 data-reveal>
            <span className="grad">Multiple accounts.</span>
            <br />
            One phone.
          </h1>
          <p className="lead" data-reveal>
            Multiverse runs extra copies of an app alongside the original — each
            with its own storage, its own login, its own notifications. Work and
            personal, without signing out.
          </p>
          <div className="btn-row" data-reveal>
            <a className="btn btn-primary" href="#features">
              See what it does
            </a>
            <Link className="btn btn-ghost" href="/privacy/">
              Privacy policy
            </Link>
          </div>
        </div>
      </section>

      <section id="features" className="section-alt">
        <div className="wrap">
          <SectionLabel icon={<GridIcon />}>Features</SectionLabel>
          <h2 data-reveal>What it does</h2>

          <div className="grid">
            <Tile icon={<CopyIcon />} title="Real separate copies">
              Every clone gets its own private storage. Several logins to the
              same service stay open at once, and none of them signs the others
              out.
            </Tile>

            <Tile icon={<BellIcon />} title="Notifications still work">
              A clone can notify you like any other app. A second messenger you
              have to keep opening by hand is not worth installing.
            </Tile>

            <Tile icon={<LockIcon />} title="App lock">
              Fingerprint or a PIN in front of the whole app. The PIN is never
              stored — only a salted hash of it, which cannot be reversed.
            </Tile>

            <Tile icon={<PencilIcon />} title="Name them yourself">
              Rename and reorder clones so the list reads the way you think —
              &quot;Work&quot;, &quot;Personal&quot;, a person&apos;s name —
              instead of &quot;App 2&quot;.
            </Tile>

            <Tile icon={<NoAdsIcon />} title="No account, no ads">
              No sign-up, no advertising, no analytics and no tracking. There is
              nothing to log in to, because there is no server.
            </Tile>

            <Tile icon={<MoonIcon />} title="Light and dark">
              Follows your system theme, or pin it from Settings — the same
              choice this page gives you in the corner above.
            </Tile>
          </div>
        </div>
      </section>

      <section>
        <div className="wrap">
          <SectionLabel icon={<InfoIcon />}>Before you install</SectionLabel>
          <h2 data-reveal>Worth knowing</h2>
          <p data-reveal>
            Cloning is not magic, and it is fairer to say so here than to let you
            find out afterwards.
          </p>

          <div className="notes">
            <Note title="Apps that insist on Google Play services may not run.">
              Some apps — banking and trading ones in particular — check for Play
              services and refuse to start without them.
            </Note>
            <Note title="&quot;Sign in with Google&quot; generally will not work in a clone.">
              That check happens on Google&apos;s servers, not on your phone, so
              there is nothing an app on your side can do about it.
            </Note>
            <Note title="Some apps simply resist being cloned.">
              A few detect the sandbox and stop; others behave oddly inside it.
              If one misbehaves, tell us from <em>Settings → Report a bug</em>.
            </Note>
            <Note title="Some apps ask not to be cloned, and we listen.">
              An app can declare that it will not run inside a container. Those
              apps are left out of the list, and Multiverse will not open a clone
              of one. There is no override.
            </Note>
            <Note title="Permissions belong to the clones, not to Multiverse.">
              A cloned app can only use the camera or your contacts if Multiverse
              holds that permission — so Multiverse asks on the clone&apos;s
              behalf, and never uses them itself. The microphone is not requested
              at all. The <Link href="/privacy/">privacy policy</Link> spells this
              out.
            </Note>
          </div>
        </div>
      </section>

      <section className="section-alt">
        <div className="wrap">
          <SectionLabel icon={<SupportIcon />}>Support</SectionLabel>
          <h2 data-reveal>Found a problem?</h2>
          <p data-reveal>
            There is a bug report form inside the app —{' '}
            <strong>Settings → Report a bug</strong>. You can attach screenshots,
            and it sends straight to the developer. Or write to{' '}
            <a href="mailto:anandyash1711@gmail.com">anandyash1711@gmail.com</a>.
          </p>
        </div>
      </section>
    </>
  );
}
