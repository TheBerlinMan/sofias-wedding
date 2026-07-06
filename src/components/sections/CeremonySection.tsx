"use client";

import { useTranslations } from "next-intl";
import SectionContainer from "./SectionContainer";
import ShapeWrappedText from "./ShapeWrappedText";

export default function CeremonySection() {
  const t = useTranslations("ceremony");

  // The raw message marks the date/time with <bold> tags; extract them so
  // ShapeWrappedText can re-apply bolding on its computed lines.
  const whenRaw = t.raw("when") as string;
  const whenEmphasize = Array.from(
    whenRaw.matchAll(/<bold>(.*?)<\/bold>/g),
    (m) => m[1],
  );
  const whenText = whenRaw.replace(/<\/?bold>/g, "");

  return (
    <SectionContainer>
      <div className="font-raleway flex flex-col gap-6">
        <ShapeWrappedText text={t("invitation")} />
        <div>
          <h3 className="font-sans text-2xl font-bold sm:text-3xl">
            {t("timeLabel")}
          </h3>
          <ShapeWrappedText text={whenText} emphasize={whenEmphasize} />
        </div>
        <div>
          <h3 className="font-sans text-2xl font-bold sm:text-3xl">
            {t("locationLabel")}
          </h3>
          <ShapeWrappedText text={t("addressLine1")} />
          <ShapeWrappedText text={t("addressLine2")} />
        </div>
        <div>
          <h3 className="font-sans text-2xl font-bold sm:text-3xl">
            {t("dressCodeLabel")}
          </h3>
          <ShapeWrappedText text={t("dressCode")} />
          <ShapeWrappedText text={t("dressCodeNote")} />
        </div>
      </div>
    </SectionContainer>
  );
}
