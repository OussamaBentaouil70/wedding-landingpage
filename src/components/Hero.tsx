import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

const images = [
  "https://images.unsplash.com/photo-1546190255-451a91afc548?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=2069&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070&auto=format&fit=crop"
];

export default function Hero() {
  const [currentImage, setCurrentImage] = useState(0);
  const { t } = useTranslation();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center pt-32 pb-20 lg:py-20 overflow-hidden">
      {/* Background Slideshow */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence>
          <motion.img
            key={currentImage}
            src={images[currentImage]}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-charcoal/40 backdrop-blur-[2px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 w-full relative z-10 grid lg:grid-cols-2 gap-16 items-center">
        {/* Left: Title & Subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-ivory text-center lg:text-left"
        >
          <span className="text-xs uppercase tracking-[0.3em] font-medium mb-6 block text-sand">
            {t("hero.tagline")}
          </span>
          <h1 className="text-5xl md:text-8xl font-light leading-[1.1] mb-8 text-balance">
            {t("hero.title_part1")} <br />
            <span className="italic font-serif">{t("hero.title_part2")}</span> {t("hero.title_part3")}
          </h1>
          <p className="text-lg md:text-xl font-light text-ivory/80 max-w-lg mx-auto lg:mx-0 leading-relaxed">
            {t("hero.subtitle")}
          </p>
        </motion.div>

        {/* Right: Reservation Form */}
        <motion.div
          id="reservation-form"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="bg-ivory/95 backdrop-blur-xl p-8 md:p-10 rounded-2xl shadow-2xl max-w-md mx-auto lg:ml-auto border border-lavender"
        >
          <h3 className="text-2xl font-serif mb-6 text-charcoal">{t("hero.form.title")}</h3>
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-1">
              <label className="text-[10px] uppercase tracking-widest font-semibold text-olive">{t("hero.form.name")}</label>
              <input
                type="text"
                placeholder="E.g. Sarah & James"
                className="w-full bg-transparent border-b border-sand py-2 focus:border-gold outline-none transition-colors text-sm"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] uppercase tracking-widest font-semibold text-olive">{t("hero.form.email")}</label>
              <input
                type="email"
                placeholder="hello@example.com"
                className="w-full bg-transparent border-b border-sand py-2 focus:border-gold outline-none transition-all text-sm"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-widest font-semibold text-olive">{t("hero.form.date")}</label>
                <input
                  type="date"
                  className="w-full bg-transparent border-b border-sand py-2 focus:border-gold outline-none transition-all text-sm"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-widest font-semibold text-olive">{t("hero.form.guests")}</label>
                <input
                  type="number"
                  min="1"
                  placeholder="100"
                  className="w-full bg-transparent border-b border-sand py-2 focus:border-gold outline-none transition-all text-sm"
                />
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-[10px] uppercase tracking-widest font-semibold text-olive">{t("hero.form.type")}</label>
              <select className="w-full bg-transparent border-b border-sand py-2 focus:border-gold outline-none transition-all text-sm">
                <option value="desert_agafay">{t("wedding_types.options.desert_agafay")}</option>
                <option value="riad">{t("wedding_types.options.riad")}</option>
                <option value="garden">{t("wedding_types.options.garden")}</option>
                <option value="villas">{t("wedding_types.options.villas")}</option>
                <option value="camps">{t("wedding_types.options.camps")}</option>
                <option value="beach">{t("wedding_types.options.beach")}</option>
              </select>
            </div>
            <button className="w-full bg-gold text-ivory py-4 rounded-full text-xs uppercase tracking-widest font-bold mt-6 hover:bg-charcoal transition-all duration-500 shadow-lg hover:shadow-gold/20">
              {t("hero.form.button")}
            </button>
            <p className="text-[10px] text-center text-olive/60 mt-4 uppercase tracking-tighter">
              {t("hero.form.disclaimer")}
            </p>
          </form>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 hidden md:block"
      >
        <div className="w-[1px] h-16 bg-gradient-to-b from-ivory to-transparent" />
      </motion.div>
    </section>
  );
}
