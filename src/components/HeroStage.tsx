"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { content } from "@/content";
import SectionsNav from "@/components/sections/SectionsNav";
import { useMusic, MusicToggleButton } from "@/components/MusicProvider";
import { useIsMobile } from "@/lib/useIsMobile";

// The page always opens as a splash: both palms, the monogram centered, and
// an Enter button. Entering starts the music, fades out the splash, and
// fades in the content — nav, the small header monogram, and (on mobile)
// slides the right palm further off to make room. On desktop, the monogram
// additionally flies from its splash position to its header slot (a FLIP
// animation via a cloned element, since the two are unrelated flex/absolute
// layouts and can't be cross-faded into a single CSS transition).
export default function HeroStage() {
  const [entered, setEntered] = useState(false);
  // Gates the real header monogram's own visibility on desktop, separately
  // from the content div's fade — otherwise it would appear mid-flight and
  // double up with the flying clone still travelling toward it.
  const [headerMonogramVisible, setHeaderMonogramVisible] = useState(false);
  const { start } = useMusic();
  const isMobile = useIsMobile();

  const splashMonogramRef = useRef<HTMLDivElement>(null);
  const headerMonogramRef = useRef<HTMLDivElement>(null);
  const flyingMonogramRef = useRef<HTMLImageElement>(null);

  function handleEnter() {
    const splashEl = splashMonogramRef.current;
    const headerEl = headerMonogramRef.current;
    const flyingEl = flyingMonogramRef.current;
    const from = splashEl?.getBoundingClientRect();
    const to = headerEl?.getBoundingClientRect();

    setEntered(true);
    start();

    if (isMobile || !flyingEl || !from || !to) {
      setHeaderMonogramVisible(true);
      return;
    }

    // Hide the splash monogram instantly instead of letting it fade with the
    // rest of the overlay (500ms) — otherwise it lingers at the origin spot
    // while the flying clone has already moved on, reading as lag.
    if (splashEl) splashEl.style.visibility = "hidden";

    flyingEl.style.opacity = "1";
    flyingEl
      .animate(
        [
          {
            top: `${from.top}px`,
            left: `${from.left}px`,
            width: `${from.width}px`,
            height: `${from.height}px`,
          },
          {
            top: `${to.top}px`,
            left: `${to.left}px`,
            width: `${to.width}px`,
            height: `${to.height}px`,
          },
        ],
        { duration: 900, easing: "cubic-bezier(0.22, 1, 0.36, 1)", fill: "forwards" },
      )
      .finished.then(() => {
        // Reveal the real monogram and hide the clone in the same tick via
        // direct DOM writes (not React state) so the swap lands on the same
        // frame — going through a state update/re-render here left a
        // one-frame gap between the two, which read as a flicker.
        if (headerEl) headerEl.style.visibility = "visible";
        flyingEl.style.opacity = "0";
        setHeaderMonogramVisible(true);
      })
      .catch(() => {
        if (headerEl) headerEl.style.visibility = "visible";
        flyingEl.style.opacity = "0";
        setHeaderMonogramVisible(true);
      });
  }

  return (
    <>
      <Image
        src="/assets/palm-column-left.webp"
        alt=""
        width={876}
        height={2560}
        priority
        aria-hidden
        className={`animate-slide-in-left pointer-events-none absolute bottom-0 left-0 h-full w-auto select-none transition-transform duration-700 ease-in ${
          entered ? "max-sm:-translate-x-10" : ""
        }`}
      />
      <Image
        src="/assets/palm-column-right.webp"
        alt=""
        width={876}
        height={2560}
        priority
        aria-hidden
        className={`animate-slide-in-right pointer-events-none absolute right-0 bottom-0 h-full w-auto select-none transition-transform duration-700 ease-in ${
          entered ? "max-sm:translate-x-full" : ""
        }`}
      />

      {/* Splash overlay */}
      <div
        className={`absolute inset-0 z-20 flex flex-col items-center justify-center gap-10 transition-opacity duration-500 ${
          entered ? "pointer-events-none opacity-0" : ""
        }`}
      >
        <div ref={splashMonogramRef} className="animate-slide-in-down w-28 sm:w-44">
          <Image
            src="/assets/monogram.webp"
            alt=""
            width={1348}
            height={1400}
            priority
            className="h-auto w-full drop-shadow-2xl"
          />
        </div>
        <button
          type="button"
          onClick={handleEnter}
          className="animate-fade-in px-6 py-2 font-sans text-3xl font-bold text-[#6B835B] underline underline-offset-4"
        >
          {content.splash.enter}
        </button>
      </div>

      {/* Main content. Kept mounted (opacity, not display) so its load
          animations don't restart on enter and the shape-aware text can
          measure its real layout from the start. */}
      <div
        className={`transition-opacity duration-500 ${
          entered ? "" : "pointer-events-none opacity-0"
        }`}
      >
        <div
          ref={headerMonogramRef}
          aria-hidden
          className={`animate-slide-in-down pointer-events-none absolute right-4 bottom-4 w-10 select-none sm:top-10 sm:right-0 sm:bottom-auto sm:left-0 sm:mx-auto sm:w-32 ${
            headerMonogramVisible ? "" : "sm:invisible"
          }`}
        >
          <Image
            src="/assets/monogram.webp"
            alt=""
            width={1348}
            height={1400}
            priority
            className="relative h-auto w-full drop-shadow-2xl sm:drop-shadow-none"
          />
        </div>
        <SectionsNav />
        <MusicToggleButton className="fixed top-4 right-16 z-30 sm:top-auto sm:right-auto sm:bottom-6 sm:left-1/2 sm:-translate-x-1/2" />
      </div>

      {/* Desktop-only flying clone: FLIP-animated from the splash monogram's
          rect to the header monogram's rect on enter, then hidden once the
          real header monogram (faded in above) has taken over. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        ref={flyingMonogramRef}
        src="/assets/monogram.webp"
        alt=""
        aria-hidden
        className="pointer-events-none fixed z-40 hidden w-0 opacity-0 select-none sm:block sm:drop-shadow-2xl"
      />
    </>
  );
}
