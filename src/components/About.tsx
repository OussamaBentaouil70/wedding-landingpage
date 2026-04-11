import { motion } from "motion/react";
import { useTranslation } from "react-i18next";

export default function About() {
  const { t } = useTranslation();

  return (
    <section id="about" className="py-24 md:py-32 bg-ivory overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=2070&auto=format&fit=crop"
              alt="Wedding Planner Marrakech"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-sand rounded-2xl -z-10 hidden md:block" />
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="absolute -bottom-6 -right-6 bg-gold text-ivory p-8 rounded-2xl shadow-xl hidden md:block"
          >
            <p className="text-4xl font-serif mb-1">12+</p>
            <p className="text-[10px] uppercase tracking-widest opacity-70">{t("about.years")}</p>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-xs uppercase tracking-[0.3em] text-gold font-bold mb-4 block">
            {t("about.tagline")}
          </span>
          <h2 className="text-4xl md:text-5xl font-light mb-8 leading-tight text-charcoal">
            {t("about.title_part1")} <br />
            <span className="italic">{t("about.title_part2")}</span>
          </h2>
          <div className="space-y-6 text-olive leading-relaxed font-light">
            <p>
              {t("about.p1")}
            </p>
            <p>
              {t("about.p2")}
            </p>
          </div>
          <div className="mt-10 flex flex-wrap gap-8">
            <div>
              <p className="text-2xl font-serif text-charcoal">350+</p>
              <p className="text-[10px] uppercase tracking-widest text-olive/60">{t("about.planned")}</p>
            </div>
            <div>
              <p className="text-2xl font-serif text-charcoal">25+</p>
              <p className="text-[10px] uppercase tracking-widest text-olive/60">{t("about.venues")}</p>
            </div>
            <div>
              <p className="text-2xl font-serif text-charcoal">100%</p>
              <p className="text-[10px] uppercase tracking-widest text-olive/60">{t("about.bespoke")}</p>
            </div>
          </div>
          <button className="mt-12 group flex items-center gap-4 text-xs uppercase tracking-widest font-bold text-charcoal hover:text-gold transition-colors">
            {t("about.button")}
            <div className="w-12 h-[1px] bg-charcoal group-hover:bg-gold transition-all group-hover:w-16" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}

