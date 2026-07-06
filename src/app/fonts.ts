import localFont from "next/font/local";

export const natalyaMonoline = localFont({
  src: [
    {
      path: "./fonts/natalya-monoline/NatalyaMonoline-Thin.woff2",
      weight: "100",
      style: "italic",
    },
    {
      path: "./fonts/natalya-monoline/NatalyaMonoline-Light.woff2",
      weight: "300",
      style: "italic",
    },
    {
      path: "./fonts/natalya-monoline/NatalyaMonoline-Regular.woff2",
      weight: "400",
      style: "italic",
    },
    {
      path: "./fonts/natalya-monoline/NatalyaMonoline-Bold.woff2",
      weight: "700",
      style: "italic",
    },
    {
      path: "./fonts/natalya-monoline/NatalyaMonoline-Black.woff2",
      weight: "900",
      style: "italic",
    },
  ],
  variable: "--font-natalya-monoline",
  display: "swap",
});
