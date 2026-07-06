"use client";

import { useLocale, useTranslations } from "next-intl";
import { useTransition } from "react";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing, localeLabels, type Locale } from "@/i18n/routing";

// A small dropdown that switches the active locale while keeping the user
// on the same page. New locales added to `routing.locales` show up here
// automatically.
export default function LanguageSwitcher() {
  const t = useTranslations("language");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  function onSelect(nextLocale: Locale) {
    if (nextLocale === locale) return;
    startTransition(() => {
      // `pathname` here is locale-agnostic; the router re-applies the prefix.
      router.replace(pathname, { locale: nextLocale });
    });
  }

  return (
    <label className="inline-flex items-center gap-2 text-sm">
      <span className="sr-only">{t("label")}</span>
      <select
        aria-label={t("label")}
        value={locale}
        disabled={isPending}
        onChange={(e) => onSelect(e.target.value as Locale)}
        className="rounded-full border border-black/10 bg-white/80 px-3 py-1.5 text-zinc-700 shadow-sm backdrop-blur transition-colors hover:border-black/20 focus:outline-none focus:ring-2 focus:ring-zinc-400 disabled:opacity-60 dark:border-white/15 dark:bg-white/5 dark:text-zinc-200"
      >
        {routing.locales.map((loc) => (
          <option key={loc} value={loc}>
            {localeLabels[loc]}
          </option>
        ))}
      </select>
    </label>
  );
}
