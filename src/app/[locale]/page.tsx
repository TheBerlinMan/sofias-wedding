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
        className="animate-slide-in-left pointer-events-none absolute bottom-0 left-0 h-full w-auto select-none"
      />
      <Image
        src="/assets/palm-column-right.webp"
        alt=""
        width={876}
        height={2560}
        priority
        aria-hidden
        className="animate-slide-in-right pointer-events-none absolute bottom-0 right-0 h-full w-auto select-none"
      />
      <Image
        src="/assets/monogram.webp"
        alt=""
        width={1348}
        height={1400}
        priority
        aria-hidden
        className="animate-slide-in-down pointer-events-none absolute inset-x-0 top-6 mx-auto w-24 select-none sm:top-10 sm:w-32"
      />
      <nav className="animate-fade-in absolute inset-x-0 top-[10.5rem] flex justify-center gap-8 text-lg text-zinc-800 sm:top-56 sm:text-2xl">
        <a href="#home">{t("home")}</a>
        <a href="#story">{t("story")}</a>
        <a href="#details">{t("details")}</a>
        <a href="#rsvp">{t("rsvp")}</a>
        <a href="#registry">{t("registry")}</a>
      </nav>
    </div>
  );
}
