"use client";

import { useState } from "react";
import Image from "next/image";
import { content } from "@/content";
import CeremonySection from "./CeremonySection";
import ReceptionSection from "./ReceptionSection";
import GiftRegistrySection from "./GiftRegistrySection";
import RsvpSection from "./RsvpSection";

const SECTIONS = {
  ceremony: CeremonySection,
  reception: ReceptionSection,
  rsvp: RsvpSection,
  registry: GiftRegistrySection,
} as const;

type SectionKey = keyof typeof SECTIONS;
const SECTION_KEYS = Object.keys(SECTIONS) as SectionKey[];

export default function SectionsNav() {
  const [active, setActive] = useState<SectionKey | null>("ceremony");
  const [menuOpen, setMenuOpen] = useState(false);

  const ActivePanel = active ? SECTIONS[active] : null;

  function selectSection(key: SectionKey) {
    setActive((current) => (current === key ? null : key));
    setMenuOpen(false);
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setMenuOpen((open) => !open)}
        aria-label="Toggle menu"
        aria-expanded={menuOpen}
        className="absolute top-4 right-4 z-30 flex h-9 w-9 shrink-0 flex-col items-center justify-center gap-1.5 sm:hidden"
      >
        <span
          className={`h-0.5 w-6 bg-[#6B835B] transition-transform duration-300 ${menuOpen ? "translate-y-2 rotate-45" : ""}`}
        />
        <span
          className={`h-0.5 w-6 bg-[#6B835B] transition-opacity duration-300 ${menuOpen ? "opacity-0" : ""}`}
        />
        <span
          className={`h-0.5 w-6 bg-[#6B835B] transition-transform duration-300 ${menuOpen ? "-translate-y-2 -rotate-45" : ""}`}
        />
      </button>

      {/* Mobile slide-in menu panel */}
      <div
        className={`absolute inset-0 z-20 sm:hidden ${menuOpen ? "" : "pointer-events-none"}`}
        aria-hidden={!menuOpen}
      >
        <div
          onClick={() => setMenuOpen(false)}
          className={`absolute inset-0 bg-black/20 transition-opacity duration-300 ${menuOpen ? "opacity-100" : "opacity-0"}`}
        />
        <nav
          className={`absolute inset-y-0 right-0 flex w-60 flex-col items-end gap-8 bg-cover bg-center bg-no-repeat px-8 pt-24 shadow-xl transition-transform duration-300 ease-out ${menuOpen ? "translate-x-0" : "translate-x-full"}`}
          style={{ backgroundImage: "url('/assets/website-background.webp')" }}
        >
          {SECTION_KEYS.map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => selectSection(key)}
              className={`text-right text-2xl font-normal text-[#6B835B] ${
                active === key ? "underline underline-offset-4" : ""
              }`}
            >
              {content.nav[key]}
            </button>
          ))}
          <Image
            src="/assets/monogram.webp"
            alt=""
            width={1348}
            height={1400}
            aria-hidden
            className="pointer-events-none absolute right-4 bottom-4 h-auto w-10 select-none drop-shadow-2xl"
          />
        </nav>
      </div>

      <div className="animate-fade-in absolute inset-x-0 top-16 bottom-16 flex flex-col items-end gap-3 sm:top-56 sm:bottom-6 sm:items-center sm:gap-6">
        <nav className="hidden shrink-0 text-2xl font-normal text-[#6B835B] sm:flex sm:flex-row sm:justify-center sm:gap-10 sm:pb-4">
          {SECTION_KEYS.map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => selectSection(key)}
              className={active === key ? "underline underline-offset-4" : ""}
            >
              {content.nav[key]}
            </button>
          ))}
        </nav>

        {active && ActivePanel ? (
          <div
            key={active}
            className="animate-section-fade-in min-h-0 w-full flex-1 overflow-y-auto"
          >
            <h2 className="mr-6 text-right font-sans text-2xl font-bold text-[#6B835B] sm:hidden">
              {content.nav[active]}
            </h2>
            <ActivePanel />
          </div>
        ) : null}
      </div>
    </>
  );
}
