"use client";

import { content } from "@/content";
import SectionContainer from "./SectionContainer";
import ShapeWrappedText from "./ShapeWrappedText";

export default function CeremonySection() {
  // The raw message marks the date/time with <bold> tags; extract them so
  // ShapeWrappedText can re-apply bolding on its computed lines.
  const whenRaw = content.ceremony.when;
  const whenEmphasize = Array.from(
    whenRaw.matchAll(/<bold>(.*?)<\/bold>/g),
    (m) => m[1],
  );
  const whenText = whenRaw.replace(/<\/?bold>/g, "");

  return (
    <SectionContainer>
      <div className="font-raleway flex flex-col gap-6">
        <ShapeWrappedText text={content.ceremony.invitation} />
        <div>
          <h3 className="mr-2 font-sans text-2xl font-bold sm:mr-0 sm:text-3xl">
            {content.ceremony.timeLabel}
          </h3>
          <ShapeWrappedText text={whenText} emphasize={whenEmphasize} />
        </div>
        <div>
          <h3 className="mr-2 font-sans text-2xl font-bold sm:mr-0 sm:text-3xl">
            {content.ceremony.locationLabel}
          </h3>
          <a
            href={content.ceremony.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block cursor-pointer underline underline-offset-4 sm:no-underline sm:hover:underline"
          >
            <ShapeWrappedText text={content.ceremony.addressLine1} />
            <ShapeWrappedText text={content.ceremony.addressLine2} />
          </a>
        </div>
        <div>
          <h3 className="mr-2 font-sans text-2xl font-bold sm:mr-0 sm:text-3xl">
            {content.ceremony.dressCodeLabel}
          </h3>
          <ShapeWrappedText text={content.ceremony.dressCode} />
          <ShapeWrappedText text={content.ceremony.dressCodeNote} />
        </div>
      </div>
    </SectionContainer>
  );
}
