import type { Metadata } from "next";
import { content } from "@/content";
import MusicProvider from "@/components/MusicProvider";
import { natalyaMonoline, raleway } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: content.metadata.title,
  description: content.metadata.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${natalyaMonoline.variable} ${raleway.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <MusicProvider>{children}</MusicProvider>
      </body>
    </html>
  );
}
