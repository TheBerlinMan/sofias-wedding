"use client";

import { useTranslations } from "next-intl";
import SectionContainer from "./SectionContainer";

export default function CeremonySection() {
  const t = useTranslations("ceremony");

  return (
    <SectionContainer>
      <div className="font-raleway flex flex-col gap-6">
        <p>{t("invitation")}</p>
        <div>
          <h3 className="font-sans text-2xl font-bold sm:text-3xl">
            {t("timeLabel")}
          </h3>
          <p>
            {t.rich("when", {
              bold: (chunks) => <strong className="font-bold">{chunks}</strong>,
            })}
          </p>
        </div>
        <div>
          <h3 className="font-sans text-2xl font-bold sm:text-3xl">
            {t("locationLabel")}
          </h3>
          <p>{t("addressLine1")}</p>
          <p>{t("addressLine2")}</p>
        </div>
        <div>
          <h3 className="font-sans text-2xl font-bold sm:text-3xl">
            {t("dressCodeLabel")}
          </h3>
          <p>{t("dressCode")}</p>
          <p>{t("dressCodeNote")}</p>
        </div>
      </div>
    </SectionContainer>
  );
}
