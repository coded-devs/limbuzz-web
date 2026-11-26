"use client";

import Image from "next/image";
import { Maximize2, X } from "lucide-react";
import { useRef, useState } from "react";

const slides = [
  {
    title: "Emergency mode",
    detail: "Review activity and recovery status while an emergency is active.",
    kind: "emergency",
    image: "/illustrations/limbuzz-emergency-view-concept.webp",
    alt: "Illustrative LIMBUZZ emergency view showing an active session, recovery notice, and action status cards.",
  },
  {
    title: "Active notification",
    detail:
      "An Android foreground notification keeps the active emergency visible.",
    kind: "notification",
    image: "/illustrations/limbuzz-notification-concept.webp",
    alt: "Illustrative Android notification shade showing a LIMBUZZ emergency notification among example device notices.",
  },
  {
    title: "Emergency SMS",
    detail: "An example of what an outgoing alert can communicate.",
    kind: "sms",
    image: "/illustrations/outgoing-alert.svg",
    alt: "Diagram of an example outgoing emergency text asking a trusted contact for help.",
  },
  {
    title: "Your chosen people",
    detail: "LIMBUZZ attempts an SMS to each saved emergency contact.",
    kind: "contacts",
    image: "/illustrations/contact-alerts.svg",
    alt: "Diagram showing SMS attempts branching from one phone to three chosen contacts.",
  },
] as const;

export function InsideLimbuzz() {
  const [active, setActive] = useState(0);
  const [preview, setPreview] = useState(0);
  const track = useRef<HTMLDivElement>(null);
  const dragStart = useRef<number | null>(null);
  const previewDialog = useRef<HTMLDialogElement>(null);

  function openPreview(index: number) {
    setPreview(index);
    if (!previewDialog.current?.open) previewDialog.current?.showModal();
  }

  function select(index: number) {
    const next = Math.max(0, Math.min(slides.length - 1, index));
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
      className="section inside-section"
      aria-labelledby="inside-title"
      id="inside-limbuzz"
    >
      <div className="container inside-layout">
        <div className="inside-intro" id="app-preview">
          <div>
            <h2 id="inside-title">Inside LIMBUZZ</h2>
          </div>
          <p>
            Explore key moments from an emergency alert. Select a view or swipe
            to explore.
          </p>
        </div>
        <div className="inside-gallery">
          <div className="inside-gallery-heading" aria-hidden="true">
            <span>LIMBUZZ IN ACTION</span>
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
            aria-label="LIMBUZZ product views"
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
                    {index >= 2 ? "SMS delivery depends on your carrier." : ""}
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
                    aria-label={`Expand ${slide.title} image`}
                    onClick={() => openPreview(index)}
                  >
                    <Maximize2 size={15} aria-hidden="true" />
                    <span>View larger</span>
                  </button>
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
                aria-label={`Show ${slide.title}, view ${index + 1} of ${slides.length}`}
                onClick={() => select(index)}
              >
                <span className="inside-selector-index" aria-hidden="true">
                  0{index + 1}
                </span>
                <span className="inside-selector-label" aria-hidden="true">
                  {slide.title}
                </span>
                <span className="inside-selector-progress" aria-hidden="true" />
              </button>
            ))}
          </div>
        </div>
      </div>
      <dialog
        className="inside-preview-dialog"
        ref={previewDialog}
        aria-label={`${slides[preview].title} image`}
      >
        <div className="inside-preview-head">
          <span>{slides[preview].title}</span>
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
        <p>{preview >= 2 ? "SMS delivery depends on your carrier." : ""}</p>
      </dialog>
    </section>
  );
}
