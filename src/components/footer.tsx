import Image from "next/image";
import Link from "next/link";
export function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          <div>
            <Link href="/" className="brand">
              <Image src="/brand/icon.png" alt="" width={38} height={38} />
              <span>LIMBUZZ</span>
            </Link>
            <p>Personal safety for Android.</p>
          </div>
          <nav aria-label="Footer navigation">
            <Link href="/download">Android release status</Link>
            <Link href="/releases">Release notes</Link>
            <Link href="/privacy">Privacy</Link>
            <Link href="/terms">Terms</Link>
            <Link href="/support">Support</Link>
          </nav>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} LIMBUZZ</span>
          <span>
            A communication tool. Not a replacement for emergency services.
          </span>
        </div>
      </div>
    </footer>
  );
}
