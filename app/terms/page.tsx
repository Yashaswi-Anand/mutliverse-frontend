import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Use',
  description: 'Terms of use for the Multiverse Android app.',
  alternates: { canonical: '/terms/' },
};

export default function Terms() {
  return (
    <div className="doc">
      <div className="wrap">
        <h1>Terms of Use</h1>
        <p className="doc-meta">
          Applies to the Android app <strong>Multiverse</strong>
        </p>

        <p>
          By installing or using Multiverse you agree to what is set out below.
          If you do not agree, please uninstall the app.
        </p>

        <h2 data-reveal>1. What Multiverse is</h2>

        <p>
          Multiverse is a utility that runs additional copies of apps already
          installed on your own device, each with its own separate storage. It is
          provided free of charge, with no account and no subscription.
        </p>

        <h2 data-reveal>2. Use it on your own apps and your own accounts</h2>

        <p>You agree to use Multiverse only to:</p>
        <ul>
          <li>
            run apps you have legitimately obtained and are entitled to use, and
          </li>
          <li>
            sign in to accounts that belong to you, or that you are authorised to
            use.
          </li>
        </ul>

        <p>You agree not to use Multiverse to:</p>
        <ul>
          <li>
            break another app&apos;s terms of service, or evade a ban or
            restriction placed on you;
          </li>
          <li>
            create fake or automated accounts, or manipulate votes, ratings or
            rewards;
          </li>
          <li>access someone else&apos;s account without their permission;</li>
          <li>
            circumvent licensing, copy protection, or payment on any app.
          </li>
        </ul>

        <p>
          Whether cloning a particular app is permitted is between you and that
          app&apos;s own terms. Multiverse gives you a tool; how you use it is
          your responsibility.
        </p>

        <h2 data-reveal>3. Third-party apps are not ours</h2>

        <p>
          Apps you clone are made by other companies. Their names, icons and
          trademarks belong to them. Multiverse is not affiliated with, endorsed
          by, or sponsored by any of them, and the developer of Multiverse has no
          control over how they behave, what they collect, or whether they keep
          working inside a clone.
        </p>

        <h2 data-reveal>4. Limitations you should expect</h2>

        <p>
          Cloning has real limits, and it is only fair to state them rather than
          promise otherwise:
        </p>
        <ul>
          <li>
            <strong>Some apps ask not to be cloned, and Multiverse obeys.</strong>{' '}
            An app can declare that it will not run inside a container. When one
            does, it is left out of the list of apps you can clone, and any
            existing clone of it will not open. This is deliberate and there is
            no way to override it — the app&apos;s own wishes about where it runs
            are not ours to overrule.
          </li>
          <li>Some apps refuse to run without Google Play services.</li>
          <li>
            &quot;Sign in with Google&quot; generally does not work inside a
            clone, because that check happens on Google&apos;s servers.
          </li>
          <li>
            Some apps detect the sandbox and stop, or behave unexpectedly in it.
          </li>
          <li>
            Voice recording does not work inside a clone, so the microphone
            permission is not requested at all.
          </li>
          <li>
            An update to an app, or to Android itself, can break cloning for that
            app at any time.
          </li>
        </ul>

        <h2 data-reveal>5. Your data is your responsibility</h2>

        <p>
          Clone data lives inside Multiverse&apos;s private storage on your
          device. If you uninstall Multiverse, delete a clone, or clear the
          app&apos;s data, that clone&apos;s data is gone and cannot be
          recovered. There is no cloud backup, because there is no server. Keep
          your own backups of anything you cannot afford to lose.
        </p>

        <h2 data-reveal>6. No warranty</h2>

        <p>
          Multiverse is provided &quot;as is&quot;, without warranty of any kind.
          It is not guaranteed to be uninterrupted, error-free, or compatible
          with any particular app or device.
        </p>

        <h2 data-reveal>7. Limitation of liability</h2>

        <p>
          To the extent permitted by law, the developer is not liable for any
          indirect or consequential loss arising from your use of Multiverse —
          including lost data, a lost or suspended account with a third-party
          service, or lost profits.
        </p>

        <h2 data-reveal>8. Changes</h2>

        <p>
          These terms may be updated. This page is kept in step with the app, so
          it always describes the version currently on Google Play, and
          continuing to use the app means you accept the terms as they read here.
          Material changes are noted in the app&apos;s release notes on Google
          Play.
        </p>

        <h2 data-reveal>9. Contact</h2>

        <p>
          <a href="mailto:contact@socialriser.com">contact@socialriser.com</a>
        </p>

        <p>
          See also the <a href="/privacy/">Privacy Policy</a>.
        </p>
      </div>
    </div>
  );
}
