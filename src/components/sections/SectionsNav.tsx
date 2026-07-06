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
  const [active, setActive] = useState<SectionKey | null>(null);

  const ActivePanel = active ? SECTIONS[active] : null;

  return (
    <div className="animate-fade-in absolute inset-x-0 top-56 bottom-6 flex flex-col items-center gap-6">
      <nav className="flex shrink-0 flex-col items-center gap-6 pt-2 pb-4 text-2xl font-normal text-[#6B835B] sm:flex-row sm:justify-center sm:gap-10">
        {SECTION_KEYS.map((key) => (
          <button
            key={key}
            type="button"
            onClick={() =>
              setActive((current) => (current === key ? null : key))
            }
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
  );
}
