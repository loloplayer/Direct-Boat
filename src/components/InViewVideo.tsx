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

  return (
    <video ref={ref} poster={poster} autoPlay muted loop playsInline preload="none" {...props}>
      {active && <source src={src} type="video/mp4" />}
    </video>
  );
}