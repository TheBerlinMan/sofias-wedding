import Image from "next/image";
import { setRequestLocale } from "next-intl/server";
import SectionsNav from "@/components/sections/SectionsNav";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

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
      <SectionsNav />
    </div>
  );
}
