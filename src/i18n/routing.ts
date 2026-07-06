import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  // The two locales we support. Start in English; Brazilian Portuguese is
  // wired up and ready for copy to be translated over time.
  locales: ["en", "pt-BR"],

  // Default locale used when no locale matches (e.g. on the bare "/" path).
  defaultLocale: "en",
});

export type Locale = (typeof routing.locales)[number];

// Human-readable labels for the language switcher.
export const localeLabels: Record<Locale, string> = {
  en: "English",
  "pt-BR": "Português",
};
