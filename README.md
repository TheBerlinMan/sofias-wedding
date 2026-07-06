# Sofia & Mateus — Wedding Site

A [Next.js](https://nextjs.org) (App Router) + React + TypeScript + Tailwind CSS
wedding site, internationalized with [next-intl](https://next-intl.dev).

Copy starts in **English** (`en`) and is ready to transition to
**Brazilian Portuguese** (`pt-BR`). A language switcher in the header lets you
move between the two.

## Getting started

```bash
npm run dev      # start the dev server at http://localhost:3000
npm run build    # production build
npm run start    # serve the production build
npm run lint     # lint
```

Visiting `/` redirects to the default locale (`/en`). Each locale is served
under its own path: `/en`, `/pt-BR`.

## How i18n is wired up

| File | Purpose |
| --- | --- |
| `src/i18n/routing.ts` | Locale list, default locale, and switcher labels. **Edit here to add a language.** |
| `src/i18n/request.ts` | Loads the right message catalog per request. |
| `src/i18n/navigation.ts` | Locale-aware `Link`, `useRouter`, `usePathname`, `redirect`. |
| `src/proxy.ts` | Locale detection + redirect (Next.js 16 "proxy" convention). |
| `next.config.ts` | Registers the next-intl plugin. |
| `messages/en.json`, `messages/pt-BR.json` | Translation strings, one file per locale. |
| `src/app/[locale]/` | All pages live under the `[locale]` segment. |
| `src/components/LanguageSwitcher.tsx` | Header dropdown to switch language. |

### Translating to Brazilian Portuguese

Edit `messages/pt-BR.json` — the keys mirror `messages/en.json`. Update the
values as the real copy is finalized. Components reference strings by key
(e.g. `t("hero.rsvp")`), so changing translations never touches component code.

### Adding another language

1. Add the locale code to `locales` in `src/i18n/routing.ts` and a label in
   `localeLabels`.
2. Create `messages/<locale>.json` mirroring the existing keys.

That's it — the switcher and routing pick it up automatically.

> **Note:** `Sofia & Mateus`, the date, and location are placeholders. Names are
> in the JSX (`src/app/[locale]/page.tsx`); the date/location/details strings
> are in the message files.
