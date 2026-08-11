import type { Metadata } from 'next';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
import ScrollReveal from '@/components/ScrollReveal';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://multiverse.socialriser.com'),
  title: {
    default: 'Multiverse — Multiple accounts, one phone',
    template: '%s — Multiverse',
  },
  description:
    'Multiverse runs extra copies of an app on the same phone, each with its own storage and its own login. No account, no ads, no tracking.',
  icons: {
    icon: '/img/favicon.png',
    apple: '/img/icon.png',
  },
  openGraph: {
    type: 'website',
    url: '/',
    title: 'Multiverse — Multiple accounts, one phone',
    description:
      'Run extra copies of an app on the same phone, each with its own storage and its own login.',
    images: ['/img/icon.png'],
  },
};

export const viewport = {
  themeColor: '#0b0c10',
};

/*
  Applies a pinned theme before the first paint.

  It has to be inline and it has to run before the body renders, or a visitor
  who chose light gets a frame of dark first. React cannot do this — any
  component runs after hydration, which is far too late — so this is one of the
  few places a raw script tag is the right answer rather than a shortcut.
*/
const themeScript = `try{var t=localStorage.getItem('theme');if(t)document.documentElement.dataset.theme=t;}catch(e){}`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <a className="skip" href="#main">
          Skip to content
        </a>
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
        <ScrollReveal />
      </body>
    </html>
  );
}
