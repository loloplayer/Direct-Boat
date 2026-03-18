import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import gallery1 from "@/assets/gallery1.jpg";
import gallery2 from "@/assets/gallery2.jpg";
import gallery3 from "@/assets/gallery3.jpg";
import gallery4 from "@/assets/gallery4.jpg";
import gallery5 from "@/assets/gallery5.jpg";
import gallery6 from "@/assets/gallery6.jpg";

const images = [
  { src: gallery1, alt: "Vista desde la cubierta del yate" },
  { src: gallery2, alt: "Vista aérea del yate en la costa" },
  { src: gallery3, alt: "Saltando al mar desde un yate" },
  { src: gallery4, alt: "Atardecer desde la proa del yate" },
  { src: gallery5, alt: "Puerto Banús con yates de lujo" },
  { src: gallery6, alt: "Vista desde la proa navegando" },
];

const GallerySection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="galeria" className="py-24 md:py-32 bg-muted">
      <div className="container mx-auto px-6">
        <motion.h2
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="font-display text-3xl md:text-5xl font-medium text-foreground text-center mb-16"
        >
          Galería
        </motion.h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {images.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.7, delay: i * 0.1 }}
              className="overflow-hidden rounded-lg group"
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
  );
};

export default GallerySection;
