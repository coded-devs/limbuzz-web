import Link from "next/link";
import Image from "next/image";
import { faqs } from "@/content/site";
import { Icon } from "./icon";
import { communityUrl } from "@/config/site";

export function Hero() {
  return (
    <section className="signal-cover">
      <div className="container cover-spread">
        <div className="cover-copy">
          <h1>
            One hold.
            <br />
            <span>Your people.</span>
          </h1>
          <p>
            Hold SOS for three seconds in LIMBUZZ. Your Android phone starts
            texting your emergency contacts, then calls the person you chose.
          </p>
          <div className="cover-actions">
            <Link href="/download" className="button">
              <Icon name="download" />
              Download the app (Android)
            </Link>
            {communityUrl ? (
              <a className="community-action" href={communityUrl.href}>
                <Icon name="users" />
                Join the community
              </a>
            ) : (
              <button className="community-action" disabled>
                <Icon name="users" />
                Join the community
              </button>
            )}
          </div>
        </div>
        <figure className="cover-art">
          <Image
            src="/illustrations/signal-journey.webp"
            alt="Editorial illustration of a phone connecting people across a city."
            width={1440}
            height={1080}
            sizes="(max-width: 760px) 100vw, 53vw"
            preload
          />
        </figure>
      </div>
    </section>
  );
}

const chapters = [
  {
    id: "prepare",
    nav: "Prepare",
    title: "Choose your circle.",
    body: "Add trusted people as emergency contacts. Pick one primary contact for the call, and tell them what an alert from you means.",
    note: "Allow SMS and phone access before you need SOS.",
  },
  {
    id: "activate",
    nav: "Activate",
    title: "Hold for three seconds.",
    body: "Press and hold SOS in the Android app. If you release early, activation stops. Complete the hold to begin the alert.",
    note: "You can start SOS without an internet connection.",
  },
  {
    id: "alert",
    nav: "Alert",
    title: "Text first. Then call.",
    body: "LIMBUZZ attempts an SMS to each chosen contact before calling your primary contact. Your first alert goes ahead without waiting for GPS.",
    note: "With permission and a usable fix, location can follow in a separate SMS.",
  },
  {
    id: "close-session",
    nav: "Finish",
    title: "Close the loop.",
    body: "When you end the session, LIMBUZZ attempts an all-clear to contacts already alerted. Afterwards, you can review the session history on your phone.",
    note: "Any emergency audio stays on your phone. Recording requires microphone access.",
  },
] as const;

function ChapterArt({ index }: { index: number }) {
  if (index === 0)
    return (
      <Image
        className="circle-art"
        src="/illustrations/trusted-people.webp"
        width={1280}
        height={853}
        sizes="(max-width: 760px) 90vw, 44vw"
        alt="Illustration of a woman selecting her trusted circle."
      />
    );
  if (index === 1)
    return (
      <div
        className="hold-plate"
        aria-label="Illustration of a three-second hold"
      >
        <span className="duration">
          3<span>sec</span>
        </span>
        <div className="duration-track">
          <i />
          <i />
          <i />
        </div>
        <span>Hold SOS in the app</span>
      </div>
    );
  if (index === 2)
    return (
      <div className="dispatch-plate" aria-label="Illustrated alert order">
        <div>
          <Icon name="message" />
          <span>01</span>
          <strong>SMS attempts</strong>
        </div>
        <div>
          <Icon name="phone" />
          <span>02</span>
          <strong>Primary call</strong>
        </div>
      </div>
    );
  return (
    <div
      className="record-plate"
      aria-label="Illustration of audio stored on the phone"
    >
      <Icon name="audio" />
      <svg viewBox="0 0 300 90" aria-hidden="true">
        <path d="M0 45H300" stroke="currentColor" opacity=".4" />
        {[
          8, 18, 34, 50, 30, 66, 80, 38, 26, 56, 44, 14, 26, 72, 48, 26, 10, 34,
          54, 38, 16, 8,
        ].map((h, i) => (
          <path
            key={i}
            d={`M${12 + i * 13} ${45 - h / 2}v${h}`}
            stroke="currentColor"
            strokeWidth="5"
            strokeLinecap="round"
          />
        ))}
      </svg>
      <strong>Stored on your phone</strong>
    </div>
  );
}

export function HowItWorks() {
  return (
    <section id="how-it-works" className="field-guide">
      <div className="container">
        <header className="guide-heading">
          <h2>Follow an alert.</h2>
          <nav aria-label="Jump to a step">
            {chapters.map((c, i) => (
              <a key={c.id} href={`#${c.id}`}>
                <span>0{i + 1}</span>
                {c.nav}
              </a>
            ))}
          </nav>
        </header>
        <ol className="guide-chapters">
          {chapters.map((c, i) => (
            <li key={c.id} id={c.id}>
              <div className="chapter-text">
                <span className="chapter-index">0{i + 1} / 04</span>
                <h3>{c.title}</h3>
                <p>{c.body}</p>
                <p className="chapter-note">{c.note}</p>
              </div>
              <figure className={`chapter-art plate-${i}`}>
                <ChapterArt index={i} />
              </figure>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function Trust() {
  return (
    <section className="coverage-band" id="privacy">
      <div className="container">
        <h2 id="features">Know the limits.</h2>
        <div>
          <p>
            SMS and calls need cellular service, a suitable SIM and phone
            permissions. Carrier charges may apply. Delivery and response depend
            on your carrier and contacts.
          </p>
          <p>
            LIMBUZZ contacts your people. In an emergency, contact local
            emergency services directly.
          </p>
          <Link href="/privacy" className="text-link">
            Read the privacy draft
          </Link>
        </div>
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
export function FAQ() {
  return (
    <section className="section faq-section" id="faq">
      <div className="container faq-grid">
        <div>
          <h2>Common questions</h2>
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
