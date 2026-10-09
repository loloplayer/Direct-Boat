import { useEffect, useRef } from "react";

type Props = { src: string; poster: string; className?: string; "aria-label"?: string };

export default function HeroVideo({ src, poster, className, ...rest }: Props) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    // Mobile browsers only allow autoplay when the video is muted and inline; set everything explicitly.
    video.muted = true;
    video.defaultMuted = true;
    video.volume = 0;
    video.loop = true;
    video.autoplay = true;
    video.playsInline = true;
    video.setAttribute("muted", "");
    video.setAttribute("playsinline", "");
    video.setAttribute("webkit-playsinline", "");
    video.setAttribute("x5-playsinline", "");
    video.controls = false;
    video.removeAttribute("controls");

    const tryPlay = () => {
      if (document.visibilityState === "hidden") return;
      video.muted = true;
      if (video.ended) video.currentTime = 0;
      if (!video.paused && !video.ended) return;
      if (video.readyState === 0 && video.networkState === 3) video.load();
      const p = video.play();
      if (p && typeof p.catch === "function") p.catch(() => undefined);
    };
    tryPlay();

    const events: [EventTarget, string][] = [
      [video, "loadedmetadata"], [video, "loadeddata"], [video, "canplay"], [video, "canplaythrough"],
      [video, "pause"], [video, "ended"], [video, "stalled"], [video, "suspend"], [video, "waiting"],
      [document, "visibilitychange"], [window, "pageshow"], [window, "focus"], [window, "load"],
      [window, "touchstart"], [window, "touchend"], [window, "pointerdown"], [window, "scroll"],
      [window, "click"], [window, "keydown"],
    ];
    events.forEach(([t, e]) => t.addEventListener(e, tryPlay, { passive: true }));
    // Keep retrying for as long as the page is open so the video never stays paused.
    const interval = window.setInterval(tryPlay, 1000);
    return () => {
      events.forEach(([t, e]) => t.removeEventListener(e, tryPlay));
      window.clearInterval(interval);
    };
  }, [src]);

  return (
    <video
      ref={ref}
      className={className}
      src={src}
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      poster={poster}
      controls={false}
      disablePictureInPicture
      disableRemotePlayback
      controlsList="nodownload nofullscreen noremoteplayback"
      tabIndex={-1}
      {...rest}
    />
  );
}
