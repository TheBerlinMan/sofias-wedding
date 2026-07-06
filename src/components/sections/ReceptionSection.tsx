"use client";

import { useTranslations } from "next-intl";
import SectionContainer from "./SectionContainer";

export default function ReceptionSection() {
  const t = useTranslations("reception");

  return (
    <SectionContainer>
      <div className="font-raleway flex flex-col gap-6">
        <p>{t("body1")}</p>
        <p>{t("body2")}</p>
        <p>{t("body3")}</p>
      </div>
    </SectionContainer>
  );
}
