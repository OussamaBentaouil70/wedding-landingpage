import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function Testimonials() {
  const { t } = useTranslation();
  const testimonials = t("testimonials.items", { returnObjects: true }) as Array<{ text: string; author: string; location: string }>;

  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((prev) => (prev + 1) % testimonials.length);
  const prev = () => setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <section className="py-24 bg-ivory overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="bg-sand/20 rounded-[3rem] p-12 md:p-24 relative">
          <Quote className="absolute top-12 left-12 w-16 h-16 text-gold/10" />
          
          <div className="relative z-10 max-w-3xl mx-auto text-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <p className="text-2xl md:text-3xl font-serif italic leading-relaxed text-charcoal mb-10">
                  "{testimonials[current].text}"
                </p>
                <div>
                  <p className="text-lg font-medium text-charcoal">{testimonials[current].author}</p>
                  <p className="text-xs uppercase tracking-widest text-olive mt-1">{testimonials[current].location}</p>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="flex justify-center gap-6 mt-16">
              <button
                onClick={prev}
                className="w-12 h-12 rounded-full border border-sand flex items-center justify-center hover:bg-gold hover:text-ivory transition-all"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={next}
                className="w-12 h-12 rounded-full border border-sand flex items-center justify-center hover:bg-gold hover:text-ivory transition-all"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

