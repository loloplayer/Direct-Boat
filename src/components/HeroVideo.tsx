import { useEffect, useRef } from "react";

type Props = { src: string; poster: string; className?: string; "aria-label"?: string };

export default function HeroVideo({ src, poster, className, ...rest }: Props) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    // React does not always set the muted attribute; mobile browsers refuse autoplay without it.
    video.muted = true;
    video.defaultMuted = true;
    video.setAttribute("muted", "");
    video.setAttribute("playsinline", "");
    video.setAttribute("webkit-playsinline", "");
    video.controls = false;

    const tryPlay = () => {
      if (!video.paused) return;
      const p = video.play();
      if (p && typeof p.catch === "function") p.catch(() => undefined);
    };
    tryPlay();

    const events: [EventTarget, string][] = [
      [video, "loadedmetadata"], [video, "canplay"], [video, "pause"], [video, "stalled"],
      [document, "visibilitychange"], [window, "pageshow"], [window, "touchstart"],
      [window, "pointerdown"], [window, "scroll"], [window, "click"],
    ];
    events.forEach(([t, e]) => t.addEventListener(e, tryPlay, { passive: true }));
    const interval = window.setInterval(tryPlay, 2000);
    const stop = window.setTimeout(() => window.clearInterval(interval), 20000);
    return () => {
      events.forEach(([t, e]) => t.removeEventListener(e, tryPlay));
      window.clearInterval(interval);
      window.clearTimeout(stop);
    };
  }, [src]);

  return (
    <video ref={ref} className={className} autoPlay muted loop playsInline preload="auto" poster={poster} controls={false} disablePictureInPicture disableRemotePlayback controlsList="nodownload nofullscreen noremoteplayback" {...rest}>
      <source src={src} type="video/mp4" />
    </video>
  );
}
