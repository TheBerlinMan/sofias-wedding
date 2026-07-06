"use client";

import { content } from "@/content";
import SectionContainer from "./SectionContainer";
import ShapeWrappedText from "./ShapeWrappedText";

export default function ReceptionSection() {
  return (
    <SectionContainer>
      <div className="font-raleway flex flex-col gap-6">
        <ShapeWrappedText text={content.reception.body1} />
        <ShapeWrappedText text={content.reception.body2} />
        <ShapeWrappedText text={content.reception.body3} />
      </div>
    </SectionContainer>
  );
}
