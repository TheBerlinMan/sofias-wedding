"use client";

import { useTranslations } from "next-intl";
import SectionContainer from "./SectionContainer";
import ShapeWrappedText from "./ShapeWrappedText";

export default function ReceptionSection() {
  const t = useTranslations("reception");

  return (
    <SectionContainer>
      <div className="font-raleway flex flex-col gap-6">
        <ShapeWrappedText text={t("body1")} />
        <ShapeWrappedText text={t("body2")} />
        <ShapeWrappedText text={t("body3")} />
      </div>
    </SectionContainer>
  );
}
