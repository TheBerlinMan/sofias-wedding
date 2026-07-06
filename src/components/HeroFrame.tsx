"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";

type HeroSize = { width: number; height: number } | null;

const HeroSizeContext = createContext<HeroSize>(null);

// The tree images and shape-aware text both need to agree on the exact
// pixel size of the hero box they're rendered relative to (it uses
// `height: 100%`), so we measure the real element via ResizeObserver instead
// of guessing from `window.innerWidth/innerHeight` — those can disagree with
// a `fixed inset-0` box on mobile browsers as the address bar shows/hides.
export function useHeroSize(): HeroSize {
  return useContext(HeroSizeContext);
}

export default function HeroFrame({
  className,
  style,
  children,
}: {
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState<HeroSize>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (!entry) return;
      const { width, height } = entry.contentRect;
      setSize({ width, height });
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={className} style={style}>
      <HeroSizeContext.Provider value={size}>
        {children}
      </HeroSizeContext.Provider>
    </div>
  );
}
