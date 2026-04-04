import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useCallback, useEffect } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import gallery1 from "@/assets/gallery1.jpg";
import gallery2 from "@/assets/gallery2.jpg";
import gallery3 from "@/assets/gallery3.jpg";
import gallery4 from "@/assets/gallery4.jpg";
import gallery5 from "@/assets/gallery5.jpg";
import gallery6 from "@/assets/gallery6.jpg";

const images = [
  { src: gallery1, alt: "Yacht deck view" },
  { src: gallery2, alt: "Aerial yacht view" },
  { src: gallery3, alt: "Jumping from yacht" },
  { src: gallery4, alt: "Sunset from bow" },
  { src: gallery5, alt: "Puerto Banús luxury yachts" },
  { src: gallery6, alt: "Bow sailing view" },
];

const GallerySection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const { t } = useLanguage();

  const close = useCallback(() => setLightboxIndex(null), []);
  const prev = useCallback(() => setLightboxIndex((i) => (i !== null ? (i - 1 + images.length) % images.length : null)), []);
  const next = useCallback(() => setLightboxIndex((i) => (i !== null ? (i + 1) % images.length : null)), []);

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
            {images.map((img, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.7, delay: i * 0.1 }}
                className="overflow-hidden rounded-lg group cursor-pointer"
                onClick={() => setLightboxIndex(i)}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-48 md:h-64 object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <AnimatePresence>
        {lightboxIndex !== null && (
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
            <motion.img
              key={lightboxIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              src={images[lightboxIndex].src}
              alt={images[lightboxIndex].alt}
              className="max-w-[90vw] max-h-[85vh] object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />
            <button onClick={(e) => { e.stopPropagation(); next(); }} className="absolute right-4 md:right-8 text-primary-foreground/60 hover:text-primary-foreground transition-colors z-10" aria-label="Next">
              <ChevronRight className="w-10 h-10" />
            </button>
            <div className="absolute bottom-6 text-primary-foreground/50 font-body text-sm">
              {lightboxIndex + 1} / {images.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default GallerySection;
