"use client";

import { useTranslations } from "next-intl";
import SectionContainer from "./SectionContainer";
import ShapeWrappedText from "./ShapeWrappedText";

export default function RsvpSection() {
  const t = useTranslations("rsvp");

  return (
    <SectionContainer>
      <div className="font-raleway flex flex-col gap-6">
        <ShapeWrappedText text={t("intro")} />
        <ShapeWrappedText text={t("deadline")} />
        <a
          href="#"
          className="font-sans text-2xl font-bold underline underline-offset-4 sm:text-3xl px-4 py-2"
        >
          {t("button")}
        </a>
        <ShapeWrappedText text={t("followUp")} />
        <ShapeWrappedText text={t("thanks")} />
      </div>
    </SectionContainer>
  );
}
