"use client";

import { track } from "@vercel/analytics";
import { useEffect, useMemo, useRef, useState } from "react";
import { showcaseItems } from "./content";

type Availability = Record<string, boolean | undefined>;

export function ShowcaseCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [availability, setAvailability] = useState<Availability>({});
  const videoRef = useRef<HTMLVideoElement>(null);
  const activeItem = showcaseItems[activeIndex];

  useEffect(() => {
    let cancelled = false;

    Promise.all(
      showcaseItems.map(async (item) => {
        try {
          const response = await fetch(item.src, { method: "HEAD", cache: "no-store" });
          return [item.id, response.ok] as const;
        } catch {
          return [item.id, false] as const;
        }
      }),
    ).then((results) => {
      if (!cancelled) setAvailability(Object.fromEntries(results));
    });

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    videoRef.current?.pause();
  }, [activeIndex]);

  const hasVideo = availability[activeItem.id] === true;
  const positionLabel = useMemo(
    () => `${activeIndex + 1} di ${showcaseItems.length}`,
    [activeIndex],
  );

  const selectItem = (index: number) => {
    setActiveIndex(index);
    track("showcase_select", { style: showcaseItems[index].id });
  };

  const move = (direction: number) => {
    selectItem((activeIndex + direction + showcaseItems.length) % showcaseItems.length);
  };

  const notifyPlayback = (playing: boolean) => {
    window.dispatchEvent(new CustomEvent(playing ? "edge:showcase-play" : "edge:showcase-stop"));
    if (playing) track("showcase_play", { style: activeItem.id });
  };

  return (
    <div className="showcase-shell" data-reveal>
      <div className="showcase-stage" data-style={activeItem.id}>
        {hasVideo ? (
          <video
            ref={videoRef}
            key={activeItem.src}
            src={activeItem.src}
            controls
            playsInline
            preload="metadata"
            onPlay={() => notifyPlayback(true)}
            onPause={() => notifyPlayback(false)}
            onEnded={() => notifyPlayback(false)}
          >
            Il browser non supporta la riproduzione video.
          </video>
        ) : (
          <div className="showcase-placeholder" aria-label={`Direzione visiva ${activeItem.label}`}>
            <span className="showcase-frame frame-one" />
            <span className="showcase-frame frame-two" />
            <span className="showcase-orbit" />
            <span className="showcase-pulse" />
            <strong>{activeItem.label}</strong>
            <small>EDGE VISUALS · VISUAL LANGUAGE</small>
          </div>
        )}

        <div className="showcase-counter" aria-live="polite">
          <span>{positionLabel}</span>
          <i><b style={{ width: `${((activeIndex + 1) / showcaseItems.length) * 100}%` }} /></i>
        </div>
      </div>

      <div className="showcase-panel">
        <div className="showcase-copy" aria-live="polite">
          <span>{activeItem.number} / {activeItem.label}</span>
          <h3>{activeItem.title}</h3>
          <p>{activeItem.description}</p>
        </div>

        <div className="showcase-nav" aria-label="Seleziona uno stile di montaggio">
          {showcaseItems.map((item, index) => (
            <button
              type="button"
              key={item.id}
              className={index === activeIndex ? "is-active" : ""}
              aria-pressed={index === activeIndex}
              onClick={() => selectItem(index)}
            >
              <span>{item.number}</span>
              <b>{item.label}</b>
              <i aria-hidden="true" />
            </button>
          ))}
        </div>

        <div className="showcase-arrows">
          <button type="button" onClick={() => move(-1)} aria-label="Mostra lo stile precedente">←</button>
          <button type="button" onClick={() => move(1)} aria-label="Mostra lo stile successivo">→</button>
        </div>
      </div>
    </div>
  );
}
