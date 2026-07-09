"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

type MusicContextValue = {
  playing: boolean;
  toggle: () => void;
  start: () => void;
};

const MusicContext = createContext<MusicContextValue | null>(null);

// Exposes the shared <audio> element's state so any gesture in the tree
// (e.g. the mobile splash's "Entrar" button) can start playback — browsers
// block unsolicited autoplay with sound, so we need a real click to hook into.
export function useMusic() {
  const ctx = useContext(MusicContext);
  if (!ctx) throw new Error("useMusic must be used within MusicProvider");
  return ctx;
}

export default function MusicProvider({ children }: { children: ReactNode }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    audioRef.current
      ?.play()
      .then(() => setPlaying(true))
      .catch(() => {
        // Autoplay was blocked; wait for a user gesture via start()/toggle().
      });
  }, []);

  const start = useCallback(() => {
    const audio = audioRef.current;
    if (!audio || !audio.paused) return;
    audio
      .play()
      .then(() => setPlaying(true))
      .catch(() => {});
  }, []);

  const toggle = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      audio
        .play()
        .then(() => setPlaying(true))
        .catch(() => {});
    } else {
      audio.pause();
      setPlaying(false);
    }
  }, []);

  return (
    <MusicContext.Provider value={{ playing, toggle, start }}>
      {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
      <audio ref={audioRef} src="/audio/andar-com-fe.mp3" loop preload="none" />
      {children}
    </MusicContext.Provider>
  );
}

// Rendered by HeroStage inside its gated content div, so on mobile it only
// appears once "Entrar" has been pressed (desktop has no splash gate).
export function MusicToggleButton({ className = "" }: { className?: string }) {
  const { playing, toggle } = useMusic();

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={playing ? "Pausar música" : "Tocar música"}
      className={`flex h-9 w-9 items-center justify-center text-[#6B835B] drop-shadow-2xl transition hover:opacity-70 sm:h-10 sm:w-10 sm:drop-shadow-none ${className}`}
    >
      {playing ? <SpeakerOnIcon /> : <SpeakerOffIcon />}
    </button>
  );
}

function SpeakerOnIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-6 w-6"
      aria-hidden
    >
      <path d="M4 9v6h4l5 4V5L8 9H4Z" />
      <path d="M16.5 8.5a5 5 0 0 1 0 7" />
      <path d="M19 6a8.5 8.5 0 0 1 0 12" />
    </svg>
  );
}

function SpeakerOffIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-6 w-6"
      aria-hidden
    >
      <path d="M4 9v6h4l5 4V5L8 9H4Z" />
      <path d="M16 9l5 6" />
      <path d="M21 9l-5 6" />
    </svg>
  );
}
