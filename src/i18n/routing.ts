import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  // The two locales we support.
  locales: ["en", "pt-BR"],

  // Default locale used when no locale matches (e.g. on the bare "/" path).
  defaultLocale: "pt-BR",
});

export type Locale = (typeof routing.locales)[number];

// Human-readable labels for the language switcher.
export const localeLabels: Record<Locale, string> = {
  en: "English",
  "pt-BR": "Português",
};
