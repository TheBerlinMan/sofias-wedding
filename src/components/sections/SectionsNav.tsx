"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
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
  const t = useTranslations("nav");
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
        className="absolute top-4 right-4 z-10 flex h-9 w-9 shrink-0 flex-col items-center justify-center gap-1.5 sm:hidden"
      >
        <span className="h-0.5 w-6 bg-[#6B835B]" />
        <span className="h-0.5 w-6 bg-[#6B835B]" />
        <span className="h-0.5 w-6 bg-[#6B835B]" />
      </button>

      <div className="animate-fade-in absolute inset-x-0 top-24 bottom-4 flex flex-col items-end gap-3 sm:top-56 sm:bottom-6 sm:items-center sm:gap-6">
        {menuOpen ? (
          <nav className="mr-4 flex flex-col items-end gap-3 text-2xl font-normal text-[#6B835B] sm:hidden">
            {SECTION_KEYS.map((key) => (
              <button
                key={key}
                type="button"
                onClick={() => selectSection(key)}
                className={
                  active === key ? "underline underline-offset-4" : ""
                }
              >
                {t(key)}
              </button>
            ))}
          </nav>
        ) : null}

        <nav className="hidden shrink-0 text-2xl font-normal text-[#6B835B] sm:flex sm:flex-row sm:justify-center sm:gap-10 sm:pb-4">
          {SECTION_KEYS.map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => selectSection(key)}
              className={active === key ? "underline underline-offset-4" : ""}
            >
              {t(key)}
            </button>
          ))}
        </nav>

        {ActivePanel ? (
          <div className="min-h-0 w-full flex-1 overflow-y-auto">
            <ActivePanel />
          </div>
        ) : null}
      </div>
    </>
  );
}
