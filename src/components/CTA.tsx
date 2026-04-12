import { motion } from "motion/react";
import { useTranslation } from "react-i18next";

import ctaBackground from "../assets/Images/pexels-bikareantalya-32737658.jpg";

export default function CTA() {
  const { t } = useTranslation();

  return (
    <section className="py-24 bg-ivory">
      <div className="max-w-7xl mx-auto px-6">
        <div className="relative h-125 rounded-[3rem] overflow-hidden flex items-center justify-center text-center px-6">
          <img
            src={ctaBackground}
            alt="Marrakech Wedding Background"
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-charcoal/60" />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative z-10 max-w-2xl"
          >
            <h2 className="text-4xl md:text-6xl font-light text-ivory mb-8 leading-tight">
              {t("cta.title_part1")} <br />
              <span className="italic">{t("cta.title_part2")}</span>
            </h2>
            <p className="text-ivory/80 font-light mb-10 text-lg">
              {t("cta.subtitle")}
            </p>
            <button className="bg-ivory text-charcoal px-10 py-4 rounded-full text-xs uppercase tracking-widest font-bold hover:bg-gold hover:text-ivory transition-all duration-500 shadow-xl">
              {t("cta.button")}
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

