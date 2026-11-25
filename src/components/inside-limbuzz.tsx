"use client";

import Image from "next/image";
import { Maximize2, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const slides = [
  {
    title: "Emergency mode",
    short: "Mode",
    detail: "Review activity and recovery status while an emergency is active.",
    kind: "emergency",
    image: "/illustrations/limbuzz-emergency-view-concept.webp",
    alt: "Illustrative LIMBUZZ emergency view showing an active session, recovery notice, and action status cards.",
  },
  {
    title: "Active notification",
    short: "Notice",
    detail:
      "An Android foreground notification keeps the active emergency visible.",
    kind: "notification",
    image: "/illustrations/limbuzz-notification-concept.webp",
    alt: "Illustrative Android notification shade showing a LIMBUZZ emergency notification among example device notices.",
  },
  {
    title: "Emergency SMS",
    short: "SMS",
    detail: "The example alert text your phone attempts to send.",
    kind: "sms",
    image: "/illustrations/limbuzz-sms-concept-user.png",
    alt: "Illustrative SMS artwork showing the LIMBUZZ alert text with example Delivered labels. Those labels do not verify actual SMS delivery.",
  },
  {
    title: "Your chosen people",
    short: "People",
    detail: "LIMBUZZ attempts an SMS to each saved emergency contact.",
    kind: "contacts",
    image: "/illustrations/limbuzz-multiple-sms-concept-user.png",
    alt: "Illustrative messages-list artwork showing example LIMBUZZ alerts to several named contacts, example delivery indicators, and a profile photo. These are not verified delivery outcomes.",
  },
] as const;

export function InsideLimbuzz() {
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [inView, setInView] = useState(false);
  const [pageVisible, setPageVisible] = useState(true);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [preview, setPreview] = useState(0);
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const dragStart = useRef<number | null>(null);
  const previewDialog = useRef<HTMLDialogElement>(null);

  function openPreview(index: number) {
    setPlaying(false);
    setPreview(index);
    if (!previewDialog.current?.open) previewDialog.current?.showModal();
  }

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotion = () => setReducedMotion(media.matches);
    updateMotion();
    media.addEventListener("change", updateMotion);
    return () => media.removeEventListener("change", updateMotion);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.2 },
    );
    if (section.current) observer.observe(section.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const updateVisibility = () => setPageVisible(!document.hidden);
    updateVisibility();
    document.addEventListener("visibilitychange", updateVisibility);
    return () =>
      document.removeEventListener("visibilitychange", updateVisibility);
  }, []);

  useEffect(() => {
    if (
      !playing ||
      reducedMotion ||
      !inView ||
      !pageVisible ||
      hovered ||
      focused
    )
      return;
    const timer = window.setTimeout(() => {
      select((active + 1) % slides.length, false);
    }, 2000);
    return () => window.clearTimeout(timer);
  }, [active, playing, reducedMotion, inView, pageVisible, hovered, focused]);

  function select(index: number, manual = true) {
    const next = Math.max(0, Math.min(slides.length - 1, index));
    if (manual) setPlaying(false);
    setActive(next);
    const item = track.current?.children[next] as HTMLElement | undefined;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (item && window.matchMedia("(max-width: 900px)").matches) {
      track.current?.scrollTo({
        left: item.offsetLeft - track.current.offsetLeft,
        behavior: media.matches ? "instant" : "smooth",
      });
    }
  }

  function syncSwipe() {
    if (!track.current) return;
    const width = track.current.clientWidth;
    if (width)
      setActive(
        Math.max(
          0,
          Math.min(
            slides.length - 1,
            Math.round(track.current.scrollLeft / width),
          ),
        ),
      );
  }

  return (
    <section
      ref={section}
      className="section inside-section"
      aria-labelledby="inside-title"
      id="inside-limbuzz"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocusCapture={() => setFocused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget))
          setFocused(false);
      }}
    >
      <div className="container inside-layout">
        <div className="inside-intro">
          <div>
            <p className="eyebrow">A CLOSER LOOK</p>
            <h2 id="inside-title">Inside LIMBUZZ.</h2>
          </div>
          <p>
            Four illustrated moments from an emergency alert. Select a view or
            swipe to explore.
          </p>
        </div>
        <div
          className={`inside-gallery${playing && !reducedMotion && inView && pageVisible && !hovered && !focused ? " is-advancing" : ""}`}
        >
          <div className="inside-gallery-heading" aria-hidden="true">
            <span>PRODUCT STORY / ILLUSTRATIVE</span>
            <span>
              0{active + 1} / 0{slides.length}
            </span>
          </div>
          <div
            className="inside-track"
            ref={track}
            role="region"
            tabIndex={0}
            onScroll={syncSwipe}
            onPointerDown={(event) => {
              setPlaying(false);
              dragStart.current = event.clientX;
            }}
            onPointerUp={(event) => {
              if (dragStart.current === null) return;
              const distance = event.clientX - dragStart.current;
              dragStart.current = null;
              if (
                window.matchMedia("(max-width: 900px)").matches ||
                Math.abs(distance) < 50
              )
                return;
              select(active + (distance < 0 ? 1 : -1));
            }}
            onPointerCancel={() => {
              dragStart.current = null;
            }}
            onKeyDown={(event) => {
              if (event.key === "ArrowRight") {
                event.preventDefault();
                select(active + 1);
              }
              if (event.key === "ArrowLeft") {
                event.preventDefault();
                select(active - 1);
              }
            }}
            aria-label="LIMBUZZ illustrative product views"
          >
            {slides.map((slide, index) => (
              <figure
                className={
                  index === active ? "inside-slide is-active" : "inside-slide"
                }
                key={slide.title}
              >
                <figcaption className="inside-slide-copy">
                  <span className="inside-slide-number">
                    0{index + 1} / 0{slides.length}
                  </span>
                  <h3>{slide.title}</h3>
                  <p>{slide.detail}</p>
                  <small>
                    {index >= 2
                      ? "Concept artwork. Delivery marks shown are examples, not verified outcomes."
                      : "Illustrative preview based on LIMBUZZ features."}
                  </small>
                </figcaption>
                <div className={`inside-stage inside-stage-${slide.kind}`}>
                  <div className="inside-phone">
                    <Image
                      src={slide.image}
                      width={941}
                      height={1672}
                      sizes="(max-width: 900px) 285px, 350px"
                      alt={slide.alt}
                    />
                  </div>
                  <button
                    className="inside-expand"
                    type="button"
                    aria-label={`Expand ${slide.title} illustrative image`}
                    onClick={() => openPreview(index)}
                  >
                    <Maximize2 size={15} aria-hidden="true" />
                    <span>View larger</span>
                  </button>
                  {index >= 2 && (
                    <span className="inside-art-badge">
                      DELIVERY UNVERIFIED
                    </span>
                  )}
                </div>
              </figure>
            ))}
          </div>
          <div
            className="inside-pagination"
            aria-label="Choose a showcase view"
          >
            {slides.map((slide, index) => (
              <button
                className={
                  index === active
                    ? "inside-selector is-active"
                    : "inside-selector"
                }
                key={slide.title}
                type="button"
                aria-current={index === active ? "true" : undefined}
                aria-label={`Show ${slide.title} and stop automatic slides, view ${index + 1} of ${slides.length}`}
                onClick={() => select(index)}
              >
                <span className="inside-selector-index" aria-hidden="true">
                  0{index + 1}
                </span>
                <span className="inside-selector-label" aria-hidden="true">
                  {slide.short}
                </span>
                <span className="inside-selector-progress" aria-hidden="true" />
              </button>
            ))}
          </div>
        </div>
        <p className="inside-disclosure">
          Concept images, not verified app captures. The SMS artwork contains
          example delivery marks and a profile image; delivery, response, and
          identity are not verified.
        </p>
      </div>
      <dialog
        className="inside-preview-dialog"
        ref={previewDialog}
        aria-label={`${slides[preview].title} illustrative image`}
      >
        <div className="inside-preview-head">
          <span>
            {slides[preview].title} <small>Illustrative concept</small>
          </span>
          <button
            type="button"
            aria-label="Close enlarged image"
            onClick={() => previewDialog.current?.close()}
          >
            <X size={20} aria-hidden="true" />
          </button>
        </div>
        <Image
          src={slides[preview].image}
          width={941}
          height={1672}
          sizes="(max-width: 600px) 90vw, 460px"
          alt={slides[preview].alt}
          loading="eager"
        />
        <p>
          {preview >= 2
            ? "Example delivery marks are part of this concept image; actual SMS delivery is unverified."
            : "Illustrative preview based on LIMBUZZ features, not a verified app capture."}
        </p>
      </dialog>
    </section>
  );
}
