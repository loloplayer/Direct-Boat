import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useCallback, useEffect } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import gallery2 from "@/assets/gallery2.jpg";
import gallery3 from "@/assets/gallery3.jpg";
import gallery4 from "@/assets/gallery4.jpg";
import gallery5 from "@/assets/gallery5.jpg";
const galleryVideo1 = "/videos/gallery_video1.mp4";
const galleryVideo2 = "/videos/gallery_video2.mp4";

type MediaItem =
  | { type: "image"; src: string; alt: string }
  | { type: "video"; src: string; alt: string };

const items: MediaItem[] = [
  { type: "image", src: gallery2, alt: "Aerial yacht view" },
  { type: "image", src: gallery3, alt: "Jumping from yacht" },
  { type: "video", src: galleryVideo1, alt: "Yacht experience video 1" },
  { type: "image", src: gallery4, alt: "Sunset from bow" },
  { type: "image", src: gallery5, alt: "Puerto Banús luxury yachts" },
  { type: "video", src: galleryVideo2, alt: "Yacht experience video 2" },
];

const GallerySection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const { t } = useLanguage();

  const close = useCallback(() => setLightboxIndex(null), []);
  const prev = useCallback(() => setLightboxIndex((i) => (i !== null ? (i - 1 + items.length) % items.length : null)), []);
  const next = useCallback(() => setLightboxIndex((i) => (i !== null ? (i + 1) % items.length : null)), []);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [lightboxIndex, close, prev, next]);

  const current = lightboxIndex !== null ? items[lightboxIndex] : null;

  return (
    <>
      <section id="galeria" className="py-24 md:py-32 bg-muted">
        <div className="container mx-auto px-6">
          <motion.h2
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="font-display text-3xl md:text-5xl font-medium text-foreground text-center mb-16"
          >
            {t("gallery.title")}
          </motion.h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {items.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.7, delay: i * 0.1 }}
                className="overflow-hidden rounded-lg group cursor-pointer relative"
                onClick={() => setLightboxIndex(i)}
              >
                {item.type === "image" ? (
                  <img
                    src={item.src}
                    alt={item.alt}
                    className="w-full h-48 md:h-64 object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                ) : (
                  <video
                    src={item.src}
                    className="w-full h-48 md:h-64 object-cover transition-transform duration-700 group-hover:scale-110 pointer-events-none"
                    muted
                    loop
                    playsInline
                    autoPlay
                    preload="auto"
                    ref={(el) => {
                      if (el) {
                        el.muted = true;
                        const tryPlay = () => el.play().catch(() => {});
                        tryPlay();
                      }
                    }}
                  />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <AnimatePresence>
        {current && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/90 backdrop-blur-sm"
            onClick={close}
          >
            <button onClick={(e) => { e.stopPropagation(); close(); }} className="absolute top-6 right-6 text-primary-foreground/80 hover:text-primary-foreground transition-colors z-10" aria-label="Close">
              <X className="w-8 h-8" />
            </button>
            <button onClick={(e) => { e.stopPropagation(); prev(); }} className="absolute left-4 md:left-8 text-primary-foreground/60 hover:text-primary-foreground transition-colors z-10" aria-label="Previous">
              <ChevronLeft className="w-10 h-10" />
            </button>
            {current.type === "image" ? (
              <motion.img
                key={lightboxIndex}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                src={current.src}
                alt={current.alt}
                className="max-w-[90vw] max-h-[85vh] object-contain rounded-lg"
                onClick={(e) => e.stopPropagation()}
              />
            ) : (
              <motion.video
                key={lightboxIndex}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                src={current.src}
                className="max-w-[90vw] max-h-[85vh] object-contain rounded-lg bg-foreground"
                controls
                autoPlay
                muted
                playsInline
                preload="auto"
                onClick={(e) => e.stopPropagation()}
              />
            )}
            <button onClick={(e) => { e.stopPropagation(); next(); }} className="absolute right-4 md:right-8 text-primary-foreground/60 hover:text-primary-foreground transition-colors z-10" aria-label="Next">
              <ChevronRight className="w-10 h-10" />
            </button>
            <div className="absolute bottom-6 text-primary-foreground/50 font-body text-sm">
              {(lightboxIndex ?? 0) + 1} / {items.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default GallerySection;
