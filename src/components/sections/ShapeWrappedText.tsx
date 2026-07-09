"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  prepareWithSegments,
  layoutNextLine,
  clearCache,
  type LayoutCursor,
} from "@chenglou/pretext";
import { useIsMobile } from "@/lib/useIsMobile";
import { useHeroSize } from "@/components/HeroFrame";
import { getPalmRightEdgePx } from "@/lib/palmShapeProfile";

// Must match the left palm tree's mobile `-translate-x-10` class in page.tsx.
const PALM_TRANSLATE_X_PX = -40;
const TREE_GAP_PX = 20;
const RIGHT_MARGIN_PX = 16; // matches the content panel's `mr-4`
const CONTAINER_MAX_WIDTH_RATIO = 0.75; // matches SectionContainer's `max-w-[75%]`
// Below this available width we don't squeeze text into the sliver next to
// the tree — we emit an empty spacer line and resume where the tree narrows.
const MIN_LINE_WIDTH_PX = 96;
// Absorbs sub-pixel disagreement between canvas measurement and DOM
// rendering. The div is right-aligned, so extra width extends toward the
// tree-side gap, never past the right margin.
const WIDTH_BUFFER_PX = 2;
const MAX_LINES = 150;

type FontSpec = { font: string; lineHeightPx: number };
type Run = { text: string; bold: boolean };

// Splits already-wrapped line texts into bold/normal runs. Line breaks are
// treated as single spaces: the lines are re-joined, each `emphasize`
// substring is located by character offset in that joined stream, and the
// bold ranges are mapped back onto the lines they intersect. This survives a
// substring being split across any line boundary (or several), regardless of
// where the wrap engine chose to break.
function markEmphasis(lineTexts: string[], emphasize: string[]): Run[][] {
  // Pretext hangs the breaking space off the end of the line (CSS behavior),
  // so line texts may already end with " ". Only insert a separator when the
  // break consumed the space, or matching would trip on double spaces.
  let joined = "";
  const lineStarts: number[] = [];
  for (const lineText of lineTexts) {
    if (
      joined !== "" &&
      lineText !== "" &&
      !joined.endsWith(" ") &&
      !lineText.startsWith(" ")
    ) {
      joined += " ";
    }
    lineStarts.push(joined.length);
    joined += lineText;
  }

  const ranges: { start: number; end: number }[] = [];
  for (const e of emphasize) {
    if (!e) continue;
    let from = 0;
    for (;;) {
      const idx = joined.indexOf(e, from);
      if (idx === -1) break;
      ranges.push({ start: idx, end: idx + e.length });
      from = idx + e.length;
    }
  }
  ranges.sort((a, b) => a.start - b.start);

  return lineTexts.map((lineText, i) => {
    const lineStart = lineStarts[i];
    const lineEnd = lineStart + lineText.length;
    const runs: Run[] = [];
    let pos = lineStart;
    for (const range of ranges) {
      if (range.start >= lineEnd || range.end <= pos) continue;
      const boldStart = Math.max(range.start, lineStart);
      const boldEnd = Math.min(range.end, lineEnd);
      if (boldStart > pos) {
        runs.push({ text: joined.slice(pos, boldStart), bold: false });
      }
      runs.push({ text: joined.slice(boldStart, boldEnd), bold: true });
      pos = boldEnd;
    }
    if (pos < lineEnd) {
      runs.push({ text: joined.slice(pos, lineEnd), bold: false });
    }
    return runs;
  });
}

function renderRuns(runs: Run[]) {
  return runs.map((run, i) =>
    run.bold ? (
      <strong key={i} className="font-extrabold">
        {run.text}
      </strong>
    ) : (
      <span key={i}>{run.text}</span>
    ),
  );
}

export default function ShapeWrappedText({
  text,
  emphasize = [],
}: {
  text: string;
  emphasize?: string[];
}) {
  const isMobile = useIsMobile();
  const heroSize = useHeroSize();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [fontSpec, setFontSpec] = useState<FontSpec | null>(null);
  // Wrapper's top edge in hero coordinates (the hero is `fixed inset-0`, so
  // viewport coordinates are hero coordinates). Measured from the real DOM so
  // it stays correct under panel scroll, the mobile menu opening, and
  // preceding shape-wrapped paragraphs changing height.
  const [topOffset, setTopOffset] = useState<number | null>(null);
  const [fontsReady, setFontsReady] = useState(false);

  // Pretext measures via canvas with whatever font is loaded at prepare()
  // time. If the webfont lands later, those cached measurements are wrong, so
  // flush and re-prepare once all fonts are in.
  useEffect(() => {
    let cancelled = false;
    document.fonts.ready.then(() => {
      if (cancelled) return;
      clearCache();
      setFontsReady(true);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!isMobile) return;
    const el = wrapperRef.current;
    if (!el) return;

    let raf = 0;
    let settleTimer = 0;
    const measure = () => {
      raf = 0;
      const node = wrapperRef.current;
      if (!node) return;
      const style = window.getComputedStyle(node);
      const fontSize = parseFloat(style.fontSize);
      const parsedLineHeight = parseFloat(style.lineHeight);
      const font = `${style.fontStyle} ${style.fontWeight} ${style.fontSize} ${style.fontFamily}`;
      const lineHeightPx = Number.isFinite(parsedLineHeight)
        ? parsedLineHeight
        : fontSize * 1.4;
      const rectTop = node.getBoundingClientRect().top;

      setFontSpec((prev) =>
        prev &&
        prev.font === font &&
        Math.abs(prev.lineHeightPx - lineHeightPx) < 0.5
          ? prev
          : { font, lineHeightPx },
      );
      setTopOffset((prev) =>
        prev !== null && Math.abs(prev - rectTop) < 0.5 ? prev : rectTop,
      );
    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(measure);
    };
    // Reflowing while a scroll gesture is in flight changes the panel's
    // scrollHeight under the user's finger; the browser then re-clamps (or
    // scroll-anchors) the position every frame, which fights the gesture and
    // can leave the panel feeling frozen. Wait for the scroll to settle
    // before re-measuring.
    const scheduleAfterSettle = () => {
      window.clearTimeout(settleTimer);
      settleTimer = window.setTimeout(schedule, 150);
    };

    schedule();
    window.addEventListener("resize", scheduleAfterSettle);
    // Capture-phase catches the content panel's inner scroll, not just the
    // window's.
    window.addEventListener("scroll", scheduleAfterSettle, true);

    // Observe every ancestor up to the scrollable panel: a preceding
    // paragraph growing/shrinking anywhere in that chain shifts this one
    // without resizing it, and only an ancestor's resize reveals that.
    const observer = new ResizeObserver(schedule);
    observer.observe(el);
    let node: HTMLElement | null = el.parentElement;
    while (node) {
      observer.observe(node);
      const overflowY = window.getComputedStyle(node).overflowY;
      if (overflowY === "auto" || overflowY === "scroll") break;
      if (node === document.body) break;
      node = node.parentElement;
    }

    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.clearTimeout(settleTimer);
      window.removeEventListener("resize", scheduleAfterSettle);
      window.removeEventListener("scroll", scheduleAfterSettle, true);
      observer.disconnect();
    };
  }, [isMobile]);

  const prepared = useMemo(() => {
    if (!isMobile || !fontSpec) return null;
    // `fontsReady` re-runs preparation after webfonts finish loading;
    // measurements taken against fallback fonts are stale.
    void fontsReady;
    return prepareWithSegments(text, fontSpec.font);
  }, [isMobile, fontSpec, text, fontsReady]);

  const lines = useMemo(() => {
    if (!prepared || !fontSpec || !heroSize || topOffset === null) return null;
    const { width: heroWidth, height: heroHeight } = heroSize;
    if (heroWidth <= 0 || heroHeight <= 0) return null;

    const lh = fontSpec.lineHeightPx;
    const rightBoundary = heroWidth - RIGHT_MARGIN_PX;
    const containerMax = heroWidth * CONTAINER_MAX_WIDTH_RATIO;
    const result: ({ text: string; width: number } | null)[] = [];
    let cursor: LayoutCursor = { segmentIndex: 0, graphemeIndex: 0 };

    for (let i = 0; i < MAX_LINES; i++) {
      const yTop = topOffset + result.length * lh;
      let maxWidth = containerMax;
      // Lines below the hero's bottom edge are clipped by the panel anyway;
      // scrolling re-measures topOffset and reflows them when they surface.
      if (yTop < heroHeight) {
        // Sample the silhouette at the line's top, middle, and bottom so a
        // frond flaring out mid-line still pushes the text off it.
        const treeEdge = Math.max(
          getPalmRightEdgePx(heroHeight, PALM_TRANSLATE_X_PX, yTop),
          getPalmRightEdgePx(heroHeight, PALM_TRANSLATE_X_PX, yTop + lh / 2),
          getPalmRightEdgePx(heroHeight, PALM_TRANSLATE_X_PX, yTop + lh),
        );
        maxWidth = Math.min(containerMax, rightBoundary - treeEdge - TREE_GAP_PX);
        if (maxWidth < MIN_LINE_WIDTH_PX) {
          result.push(null); // spacer: leave the band next to the wide tree empty
          continue;
        }
      }

      const line = layoutNextLine(prepared, cursor, maxWidth);
      if (line === null) break;
      result.push({ text: line.text, width: line.width });
      cursor = line.end;
    }

    // Spacers pushed after the text was exhausted serve no purpose.
    while (result.length > 0 && result[result.length - 1] === null) {
      result.pop();
    }
    return result;
  }, [prepared, fontSpec, heroSize, topOffset]);

  const showLines = isMobile && lines !== null && fontSpec !== null;
  const lineRuns = showLines
    ? markEmphasis(
        lines.map((line) => line?.text ?? ""),
        emphasize,
      )
    : null;

  return (
    <div ref={wrapperRef}>
      {showLines && lineRuns ? (
        <>
          <p className="sr-only">{text}</p>
          <div aria-hidden>
            {lines.map((line, i) =>
              line === null ? (
                <div key={i} style={{ height: fontSpec.lineHeightPx }} />
              ) : (
                <div
                  key={i}
                  className="ml-auto whitespace-nowrap"
                  style={{
                    width: Math.ceil(line.width) + WIDTH_BUFFER_PX,
                    height: fontSpec.lineHeightPx,
                  }}
                >
                  {renderRuns(lineRuns[i])}
                </div>
              ),
            )}
          </div>
        </>
      ) : (
        <p>{renderRuns(markEmphasis([text], emphasize)[0])}</p>
      )}
    </div>
  );
}
