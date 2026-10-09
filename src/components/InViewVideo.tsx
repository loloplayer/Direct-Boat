import { useEffect, useRef, useState, type VideoHTMLAttributes } from "react";

type Props = Omit<VideoHTMLAttributes<HTMLVideoElement>, "src" | "poster"> & {
  src: string;
  poster: string;
};

export default function InViewVideo({ src, poster, ...props }: Props) {
  const ref = useRef<HTMLVideoElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry?.isIntersecting) {
        setActive(true);
        observer.disconnect();
      }
    }, { rootMargin: "160px" });
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const video = ref.current;
    if (!active || !video) return;
    video.muted = true;
    video.defaultMuted = true;
    video.setAttribute("muted", "");
    video.setAttribute("playsinline", "");
    video.setAttribute("webkit-playsinline", "");
    video.load();
    const tryPlay = () => {
      if (document.visibilityState === "hidden" || (!video.paused && !video.ended)) return;
      video.muted = true;
      const p = video.play();
      if (p && typeof p.catch === "function") p.catch(() => undefined);
    };
    tryPlay();
    const events: [EventTarget, string][] = [
      [video, "loadeddata"], [video, "canplay"], [video, "pause"], [video, "ended"], [video, "suspend"],
      [document, "visibilitychange"], [window, "pageshow"], [window, "touchstart"], [window, "scroll"], [window, "click"],
    ];
    events.forEach(([t, e]) => t.addEventListener(e, tryPlay, { passive: true }));
    const interval = window.setInterval(tryPlay, 1500);
    return () => {
      events.forEach(([t, e]) => t.removeEventListener(e, tryPlay));
      window.clearInterval(interval);
    };
  }, [active]);

  return (
    <video ref={ref} src={active ? src : undefined} poster={poster} autoPlay muted loop playsInline preload="none" controls={false} disablePictureInPicture tabIndex={-1} {...props} />
  );
}