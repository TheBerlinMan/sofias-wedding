import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("nav");

  return (
    <div
      className="fixed inset-0 flex flex-col overflow-hidden bg-white bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/assets/website-background.webp')" }}
    >
      <Image
        src="/assets/palm-column-left.webp"
        alt=""
        width={876}
        height={2560}
        priority
        aria-hidden
        className="animate-slide-in-left pointer-events-none absolute bottom-0 left-0 h-full w-auto -translate-x-10 select-none sm:translate-x-0"
      />
      <Image
        src="/assets/palm-column-right.webp"
        alt=""
        width={876}
        height={2560}
        priority
        aria-hidden
        className="animate-slide-in-right pointer-events-none absolute bottom-0 right-0 h-full w-auto translate-x-10 select-none sm:translate-x-0"
      />
      <div
        aria-hidden
        className="animate-slide-in-down pointer-events-none absolute inset-x-0 top-[30px] mx-auto w-[4.5rem] select-none sm:top-10 sm:w-32"
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
      <nav className="animate-fade-in absolute inset-x-0 top-56 flex flex-col items-center gap-6 text-2xl font-normal text-[#6B835B] sm:top-56 sm:flex-row sm:justify-center sm:gap-10 sm:text-2xl">
        <a href="#home">{t("home")}</a>
        <a href="#story">{t("story")}</a>
        <a href="#details">{t("details")}</a>
        <a href="#rsvp">{t("rsvp")}</a>
        <a href="#registry">{t("registry")}</a>
      </nav>
    </div>
  );
}
