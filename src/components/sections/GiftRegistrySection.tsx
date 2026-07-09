"use client";

import { content } from "@/content";
import SectionContainer from "./SectionContainer";
import ShapeWrappedText from "./ShapeWrappedText";

export default function GiftRegistrySection() {
  return (
    <SectionContainer>
      <div className="font-raleway flex flex-col gap-6">
        <ShapeWrappedText text={content.registry.body} />
        <a
          href={content.registry.url}
          target="_blank"
          rel="noopener noreferrer"
          className="font-sans text-2xl font-bold underline underline-offset-4 sm:text-3xl px-4 py-2"
        >
          {content.registry.cta}
        </a>
        <ShapeWrappedText text={content.registry.thanks} />
      </div>
    </SectionContainer>
  );
}
