import Link from "next/link";
import Image from "next/image";
import { features, steps, faqs } from "@/content/site";
import { Icon } from "./icon";
import { CommunicationVisual } from "./communication-visual";
import { ReleasePanel } from "./release-panel";
import { release, isPublicRelease } from "@/config/release";
import { JourneyGraphic, LocalRecordingGraphic } from "./journey-graphic";
import { CarrierGraphic } from "./carrier-graphic";

export function Hero() {
  return (
    <section className="hero">
      <div className="container hero-grid">
        <div className="hero-copy">
          <div className="eyebrow">
            <span className="tiny-rule" />
            PERSONAL SAFETY, MADE PRACTICAL
          </div>
          <h1>
            Getting help
            <br />
            shouldn’t be
            <br />
            <span>complicated.</span>
          </h1>
          <p>
            An Android personal safety app that helps you alert and call the
            people you trust.
          </p>
          <div className="hero-actions">
            <Link href="/download" className="button">
              <Icon name="smartphone" />
              Android release status
            </Link>
            <a className="secondary-link" href="#how-it-works">
              See how it works
            </a>
          </div>
          <p className="hero-availability">
            {isPublicRelease(release)
              ? "Verified Android release available."
              : "Public Android download coming soon."}
          </p>
          <p className="hero-note">SMS and calls require cellular service.</p>
        </div>
        <CommunicationVisual />
      </div>
      <div className="hero-foot container">
        <span>PREPARE AHEAD. REACH YOUR PEOPLE.</span>
      </div>
    </section>
  );
}
export function Features() {
  return (
    <>
      <section className="section intro">
        <div className="container intro-grid" data-reveal>
          <div>
            <p className="eyebrow">WHEN WORDS ARE HARD TO FIND</p>
            <h2>
              In an emergency,
              <br />
              small tasks add up.
            </h2>
          </div>
          <div className="intro-message">
            <p className="lead">
              Finding a contact, writing a message, and explaining where you are
              can be difficult when you need help.
            </p>
          </div>
        </div>
      </section>
      <section className="section features-section" id="features">
        <div className="container">
          <div className="section-heading" data-reveal>
            <div>
              <p className="eyebrow">PURPOSEFUL BY DESIGN</p>
              <h2>
                The essentials.
                <br />
                Working together.
              </h2>
            </div>
          </div>
          <div className="feature-grid">
            {features.map((feature) => (
              <article className="feature" key={feature.title} data-reveal>
                <span className="icon-box">
                  <Icon name={feature.icon} />
                </span>
                <h3>{feature.title}</h3>
                <p>{feature.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
export function HowItWorks() {
  return (
    <section className="section how-section" id="how-it-works">
      <div className="container">
        <div className="section-heading" data-reveal>
          <div>
            <p className="eyebrow">A LITTLE PREPARATION GOES A LONG WAY</p>
            <h2>
              Set up calmly.
              <br />
              Act simply.
            </h2>
          </div>
          <p>
            Make your choices ahead of time,
            <br className="desktop-break" /> while you have the space to think.
          </p>
        </div>
        <p className="journey-caption">
          Illustrative setup guide · SOS shown here is not interactive
        </p>
        <ol className="journey">
          {steps.map((step, i) => (
            <li className="journey-stage" key={step.title} data-reveal>
              <JourneyGraphic stage={i} />
              <div className="journey-copy">
                <span className="step-number">0{i + 1}</span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </div>
            </li>
          ))}
        </ol>
        <div className="after-hold" data-reveal>
          <Icon name="radio" />
          <div>
            <h3>What happens after the hold?</h3>
            <p>
              SMS dispatch begins before the primary-contact call. Location
              collection runs in parallel; a usable fix can follow in a separate
              message.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
export { ProductArtwork as AppShowcase } from "./product-artwork";
export function Trust() {
  return (
    <section className="section trust-section" id="privacy">
      <div className="container">
        <div className="section-heading">
          <div>
            <p className="eyebrow">KNOW WHAT TO EXPECT</p>
            <h2>
              Local-first.
              <br />
              Clear about its limits.
            </h2>
          </div>
          <Link className="text-link" href="/privacy">
            Read the privacy draft
          </Link>
        </div>
        <div className="trust-grid" data-reveal>
          <article>
            <CarrierGraphic />
            <h3>SMS and calls use your carrier.</h3>
            <p>
              SOS can start without internet. SMS and calls need cellular
              service, a suitable SIM, and SMS/phone permissions. Carrier
              charges apply.
            </p>
          </article>
          <article className="local-recording-story">
            <LocalRecordingGraphic />
            <Icon name="audio" />
            <h3>Your recordings stay local.</h3>
            <p>
              Recordings stay on your phone; they aren’t automatically uploaded
              or sent to contacts. Microphone access is needed to record.
            </p>
          </article>
          <article>
            <Icon name="users" />
            <h3>Response isn’t guaranteed.</h3>
            <p>
              LIMBUZZ does not dispatch emergency services. An SMS or call
              attempt cannot guarantee delivery, an answer, response, or rescue.
              Contact local emergency services directly when needed.
            </p>
          </article>
        </div>
        <p className="trust-permissions">
          Location sharing needs permission and a usable current fix.
          Notification permission controls whether app alerts are visible.
        </p>
      </div>
    </section>
  );
}
export function InstallGuide() {
  return (
    <div className="install-guide">
      <p className="eyebrow">WHEN THE PUBLIC RELEASE IS READY</p>
      <h2>
        From download
        <br />
        to ready for SOS.
      </h2>
      <figure className="preparation-artwork">
        <Image
          src="/illustrations/prepare-ahead.webp"
          alt="Editorial illustration of a hand beside a phone, keys and a plant, with a blue route line around the phone."
          width={1080}
          height={540}
          sizes="(max-width: 760px) calc(100vw - 40px), (max-width: 1000px) 46vw, 520px"
        />
        <figcaption>Prepare before you need it.</figcaption>
      </figure>
      <ol>
        {[
          [
            "Download & verify",
            "Get the APK here and compare its SHA-256 checksum with the published value before installing.",
          ],
          [
            "Allow this installation",
            "In Android settings, allow installation from the browser or file manager you used. Menu names vary by device. Keep Android security checks enabled.",
          ],
          [
            "Install, then prepare",
            "Open the APK, install LIMBUZZ, then turn off that installation permission. Add your contacts and review the app’s permissions.",
          ],
        ].map(([title, text]) => (
          <li key={title}>
            <h3>{title}</h3>
            <p>{text}</p>
          </li>
        ))}
      </ol>
      <p className="small-copy">
        Stop if Android reports a harmful app or an unexpected signing/update
        conflict. Do not bypass a security warning.
      </p>
    </div>
  );
}
export function DownloadSection() {
  return (
    <section className="section download-section" id="download">
      <div className="container download-grid">
        <ReleasePanel />
        <InstallGuide />
      </div>
    </section>
  );
}
export function FAQ() {
  return (
    <section className="section faq-section" id="faq">
      <div className="container faq-grid">
        <div>
          <p className="eyebrow">A FEW THINGS TO KNOW</p>
          <h2>
            Clear answers.
            <br />
            Before you need them.
          </h2>
        </div>
        <div className="faq-list">
          {faqs.map(([q, a]) => (
            <details key={q}>
              <summary>
                {q}
                <Icon name="chevron" />
              </summary>
              <p>{a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
