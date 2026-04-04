import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Quote } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const TestimonialsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const { t } = useLanguage();

  const testimonials = [
    { text: t("testimonials.t1"), author: "María G.", location: "Madrid" },
    { text: t("testimonials.t2"), author: "James R.", location: "Londres" },
    { text: t("testimonials.t3"), author: "Sophie L.", location: "París" },
  ];

  return (
    <section id="testimonios" className="py-24 md:py-32 bg-background">
      <div className="container mx-auto px-6">
        <motion.h2
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="font-display text-3xl md:text-5xl font-medium text-foreground text-center mb-16"
        >
          {t("testimonials.title")}
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {testimonials.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="bg-muted rounded-lg p-8 relative"
            >
              <Quote className="text-accent/40 mb-4" size={28} />
              <p className="font-body text-foreground leading-relaxed mb-6 italic">
                "{item.text}"
              </p>
              <p className="font-body text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">{item.author}</span> — {item.location}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
