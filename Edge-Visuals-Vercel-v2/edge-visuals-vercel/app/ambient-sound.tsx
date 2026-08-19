"use client";

import { track } from "@vercel/analytics";
import { useCallback, useEffect, useRef, useState } from "react";
import { ambientTrack } from "./content";

const targetVolume = 0.16;

export function AmbientSound() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const animationRef = useRef<number>(0);
  const resumeAfterShowcase = useRef(false);
  const [available, setAvailable] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const fadeTo = useCallback((target: number, after?: () => void) => {
    const audio = audioRef.current;
    if (!audio) return;

    cancelAnimationFrame(animationRef.current);
    const startVolume = audio.volume;
    const start = performance.now();
    const duration = 620;

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      audio.volume = startVolume + (target - startVolume) * eased;

      if (progress < 1) animationRef.current = requestAnimationFrame(tick);
      else after?.();
    };

    animationRef.current = requestAnimationFrame(tick);
  }, []);

  useEffect(() => {
    let cancelled = false;
    fetch(ambientTrack, { method: "HEAD", cache: "no-store" })
      .then((response) => !cancelled && setAvailable(response.ok))
      .catch(() => !cancelled && setAvailable(false));

    return () => {
      cancelled = true;
      cancelAnimationFrame(animationRef.current);
    };
  }, []);

  useEffect(() => {
    const pauseForShowcase = () => {
      const audio = audioRef.current;
      if (!audio || audio.paused) return;
      resumeAfterShowcase.current = true;
      fadeTo(0, () => {
        audio.pause();
        setIsPlaying(false);
      });
    };

    const resumeAmbient = async () => {
      const audio = audioRef.current;
      if (!audio || !resumeAfterShowcase.current) return;
      resumeAfterShowcase.current = false;
      audio.volume = 0;
      try {
        await audio.play();
        setIsPlaying(true);
        fadeTo(targetVolume);
      } catch {
        setIsPlaying(false);
      }
    };

    addEventListener("edge:showcase-play", pauseForShowcase);
    addEventListener("edge:showcase-stop", resumeAmbient);
    return () => {
      removeEventListener("edge:showcase-play", pauseForShowcase);
      removeEventListener("edge:showcase-stop", resumeAmbient);
    };
  }, [fadeTo]);

  if (!available) return null;

  const toggleSound = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (!audio.paused) {
      resumeAfterShowcase.current = false;
      fadeTo(0, () => audio.pause());
      setIsPlaying(false);
      track("ambient_sound", { state: "off" });
      return;
    }

    audio.volume = 0;
    try {
      await audio.play();
      setIsPlaying(true);
      fadeTo(targetVolume);
      track("ambient_sound", { state: "on" });
    } catch {
      setIsPlaying(false);
    }
  };

  return (
    <div className={`sound-control ${isPlaying ? "is-playing" : ""}`}>
      <audio ref={audioRef} src={ambientTrack} loop preload="none" />
      <button
        type="button"
        onClick={toggleSound}
        aria-pressed={isPlaying}
        aria-label={isPlaying ? "Disattiva la musica di sottofondo" : "Attiva la musica di sottofondo"}
      >
        <span className="sound-bars" aria-hidden="true"><i /><i /><i /></span>
        <span><b>SUONO</b><small>{isPlaying ? "ON" : "OFF"}</small></span>
      </button>
    </div>
  );
}
