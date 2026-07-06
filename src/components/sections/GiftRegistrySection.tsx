"use client";

import { useTranslations } from "next-intl";
import SectionContainer from "./SectionContainer";

export default function GiftRegistrySection() {
  const t = useTranslations("registry");

  return (
    <SectionContainer>
      <div className="font-raleway flex flex-col gap-6">
        <p>{t("body")}</p>
        <a
          href="#"
          className="font-sans text-2xl font-bold underline underline-offset-4 sm:text-3xl px-4 py-2"
        >
          {t("cta")}
        </a>
        <p>{t("thanks")}</p>
      </div>
    </SectionContainer>
  );
}
