"use client";

import { content } from "@/content";
import SectionContainer from "./SectionContainer";
import ShapeWrappedText from "./ShapeWrappedText";

export default function RsvpSection() {
  return (
    <SectionContainer>
      <div className="font-raleway flex flex-col gap-6">
        <ShapeWrappedText text={content.rsvp.intro} />
        <ShapeWrappedText text={content.rsvp.deadline} />
        <a
          href={content.rsvp.url}
          target="_blank"
          rel="noopener noreferrer"
          className="font-sans text-2xl font-bold underline underline-offset-4 sm:text-3xl px-4 py-2"
        >
          {content.rsvp.button}
        </a>
        <ShapeWrappedText text={content.rsvp.followUp} />
        <ShapeWrappedText text={content.rsvp.thanks} />
      </div>
    </SectionContainer>
  );
}
