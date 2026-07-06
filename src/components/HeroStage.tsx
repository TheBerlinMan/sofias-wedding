"use client";

import { useState } from "react";
import Image from "next/image";
import { content } from "@/content";
import SectionsNav from "@/components/sections/SectionsNav";

// On mobile the page opens as a splash: both palms, the monogram centered,
// and an Enter button. Entering slides the right palm off and fades in the
// content, hamburger, and the small bottom-right monogram. Desktop (sm+)
// never shows the splash and keeps the original layout/choreography.
export default function HeroStage() {
  const [entered, setEntered] = useState(false);

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

      {/* Mobile-only splash overlay */}
      <div
        className={`absolute inset-0 z-20 flex flex-col items-center justify-center gap-10 transition-opacity duration-500 sm:hidden ${
          entered ? "pointer-events-none opacity-0" : ""
        }`}
      >
        <div className="animate-slide-in-down w-28">
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
          onClick={() => setEntered(true)}
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
          entered ? "" : "max-sm:pointer-events-none max-sm:opacity-0"
        }`}
      >
        <div
          aria-hidden
          className="animate-slide-in-down pointer-events-none absolute right-4 bottom-4 w-10 select-none sm:top-10 sm:right-0 sm:bottom-auto sm:left-0 sm:mx-auto sm:w-32"
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
      </div>
    </>
  );
}
