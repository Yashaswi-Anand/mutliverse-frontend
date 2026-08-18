import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'What the Multiverse Android app does and does not do with your information.',
  alternates: { canonical: '/privacy/' },
};

export default function Privacy() {
  return (
    <div className="doc">
      <div className="wrap">
        <h1>Privacy Policy</h1>
        {/* <p className="doc-meta">
          Applies to the Android app <strong>Multiverse</strong>
        </p> */}

        <p>
          Multiverse lets you run more than one copy of an app on the same phone,
          each with its own separate storage and login. This page explains
          exactly what the app does and does not do with your information.
        </p>

        <div className="callout" data-reveal>
          <p>
            <strong>The short version.</strong> Multiverse has no account, no
            analytics, no advertising and no tracking. Nothing is transmitted
            anywhere unless you choose to send a bug report from inside the app.
            Everything else — your clones, their data, and your app-lock PIN —
            stays on your device.
          </p>
        </div>

        <h2 data-reveal>1. Information sent off your device</h2>

        <p>
          There is exactly one feature that transmits anything:{' '}
          <strong>Settings → Report a bug / Send feedback</strong>. Nothing is
          sent until you press <strong>Submit</strong>. If you never use it,
          Multiverse sends nothing at all.
        </p>

        <p>When you submit a report, the following is included:</p>

        <div className="table-scroll">
          <table>
            <thead>
              <tr>
                <th>What</th>
                <th>Why</th>
                <th>Optional?</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>The message you type</td>
                <td>To understand the problem or suggestion</td>
                <td>Required</td>
              </tr>
              <tr>
                <td>App version and package name</td>
                <td>To know which build the report came from</td>
                <td>Always included</td>
              </tr>
              <tr>
                <td>
                  Device make and model, Android version, CPU ABI
                  <br />
                  <em>(for example: TECNO LJ8k, Android 15, arm64-v8a)</em>
                </td>
                <td>To reproduce device-specific problems</td>
                <td>Always included</td>
              </tr>
              <tr>
                <td>Your email address</td>
                <td>Only so the developer can reply</td>
                <td>Optional — leave it blank and none is sent</td>
              </tr>
              <tr>
                <td>Up to 3 screenshots you attach</td>
                <td>To show the problem</td>
                <td>Optional — you choose each one</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p>
          Reports are delivered by email to the developer through{' '}
          <a href="https://formsubmit.co" rel="nofollow noopener">
            FormSubmit
          </a>
          , a form-to-email relay. FormSubmit passes the message on and receives
          nothing beyond what is listed above.
        </p>

        <p>
          <strong>Deliberately not collected in a report:</strong> no device
          serial number, no advertising ID, no <code>ANDROID_ID</code>, no phone
          number, no accounts on the device, no location, and no contents of your
          cloned apps.
        </p>

        <h2 data-reveal>2. Information kept only on your device</h2>

        <ul>
          <li>
            <strong>Your clones and everything inside them.</strong> Cloned apps
            run in a sandbox inside Multiverse&apos;s own private storage. Their
            logins, messages, files and settings never leave your phone through
            Multiverse.
          </li>
          <li>
            <strong>Your app-lock PIN.</strong> The PIN itself is never stored.
            What is saved is a salted SHA-256 hash of it, so reading the
            app&apos;s storage — even on a rooted phone, or out of a backup —
            does not reveal your PIN. It is never transmitted. It also cannot be
            recovered: if you forget it, the only way back is to turn the app
            lock off and set it again.
          </li>
          <li>
            <strong>Fingerprint and biometrics.</strong> Unlocking uses
            Android&apos;s own biometric prompt. Multiverse never sees or stores
            your fingerprint; Android only tells the app whether the check
            passed.
          </li>
          <li>
            <strong>Your preferences.</strong> Clone names, ordering, sort choice
            and theme.
          </li>
        </ul>

        <p>Uninstalling Multiverse removes all of it.</p>

        <h2 data-reveal>3. Permissions, and why they exist</h2>

        <p>
          This is the part most often misunderstood, so it is worth stating
          plainly: <strong>the permissions Multiverse requests are for the apps
          you clone, not for Multiverse itself.</strong> A cloned app runs inside
          Multiverse, so it can only use a capability if Multiverse holds it.
        </p>

        <div className="table-scroll">
          <table>
            <thead>
              <tr>
                <th>Permission</th>
                <th>Who actually uses it</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Camera</td>
                <td>
                  A cloned app, when you use its camera — document scans, profile
                  photos, QR codes
                </td>
              </tr>
              <tr>
                <td>Contacts</td>
                <td>A cloned messaging app, to find your contacts</td>
              </tr>
              <tr>
                <td>Location (foreground only)</td>
                <td>A cloned delivery, maps or ride app</td>
              </tr>
              <tr>
                <td>Photos you choose</td>
                <td>
                  Attaching a screenshot to a bug report, and cloned apps picking
                  images. Android&apos;s own picker hands over only the images
                  you select
                </td>
              </tr>
              <tr>
                <td>Notifications</td>
                <td>So a cloned app can notify you</td>
              </tr>
              <tr>
                <td>Biometric / fingerprint</td>
                <td>The Multiverse app lock</td>
              </tr>
              <tr>
                <td>Internet</td>
                <td>
                  Cloned apps&apos; own network use, and sending a bug report
                </td>
              </tr>
              <tr>
                <td>Running in the background</td>
                <td>
                  Keeping your clones alive after you leave Multiverse, so a
                  cloned messaging app can still receive messages. Android
                  requires a visible notification while this runs, and you can
                  switch the whole thing off in <em>Settings</em>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <p>
          Multiverse itself does not read your contacts, does not use your
          camera, and does not collect your location. Android still asks you
          before any of these is granted, and you can revoke them at any time in{' '}
          <em>Settings → Apps → Multiverse → Permissions</em>.
        </p>

        <p>
          <strong>Deliberately not requested at all:</strong> the microphone,
          background location, SMS, and the call log. The microphone was removed
          rather than kept unused — a permission that is never going to be
          honestly usable should not sit in the install prompt.
        </p>

        <h2 data-reveal>4. What Multiverse does not do</h2>

        <ul>
          <li>No user accounts and no sign-in.</li>
          <li>No analytics, telemetry, crash-reporting SDK or usage tracking.</li>
          <li>No advertising and no advertising identifiers.</li>
          <li>No selling or sharing of personal information with anyone.</li>
          <li>No profile building, and no data used to train anything.</li>
          <li>No reading of your cloned apps&apos; contents by the developer.</li>
        </ul>

        <h2 data-reveal>5. How long reports are kept</h2>

        <p>
          Bug reports arrive as ordinary email in the developer&apos;s inbox and
          are kept only as long as needed to look into the issue. You can ask for
          a report of yours to be deleted by writing to the address below —
          include roughly when you sent it, so it can be found.
        </p>

        <h2 data-reveal>6. Children</h2>

        <p>
          Multiverse is a utility for managing your own apps. It is not directed
          at children and is not designed for or marketed to anyone under 13.
        </p>

        <h2 data-reveal>7. Security</h2>

        <p>
          Reports are uploaded over HTTPS. The app-lock PIN is stored only as a
          salted hash. Each clone&apos;s data lives in its own directory inside
          the app&apos;s private storage, which Android keeps separate from other
          apps. No system is perfectly secure — but nothing is stored on a server
          belonging to the developer, because there is no such server.
        </p>

        <h2 data-reveal>8. Changes to this policy</h2>

        <p>
          This page is kept in step with the app, so what you read here describes
          the version currently on Google Play rather than a snapshot from some
          earlier date. Material changes are also noted in the app&apos;s release
          notes on Google Play, which is where the dated history lives.
        </p>

        <h2 data-reveal>9. Contact</h2>

        <p>
          Questions about this policy, or a request to delete a report you sent:
          <br />
          <a href="mailto:contact@socialriser.com">contact@socialriser.com</a>
        </p>

        <p>
          See also the <a href="/terms/">Terms of Use</a>.
        </p>
      </div>
    </div>
  );
}
