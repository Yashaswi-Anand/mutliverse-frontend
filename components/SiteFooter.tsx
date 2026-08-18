import Link from 'next/link';
import Image from 'next/image';

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="footer-brand">
          <Image src="/img/icon.png" alt="" width={22} height={22} />
          {/*
            Rendered at build time, not from the browser's clock. A static
            export is rebuilt on every push, so this stays current without a
            client component just to print a number.
          */}
          <span>&copy; {new Date().getFullYear()} Multiverse</span>
        </div>
        <div className="footer-links">
          <Link href="/privacy/">Privacy</Link>
          <Link href="/terms/">Terms</Link>
          <a href="mailto:contact@socialriser.com">Contact</a>
        </div>
      </div>
    </footer>
  );
}
