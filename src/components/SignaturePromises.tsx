import { motion } from "motion/react";
import { Sparkles, MapPin, Heart, ShieldCheck } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function SignaturePromises() {
  const { t } = useTranslation();

  const promises = [
    {
      icon: <MapPin className="w-6 h-6" />,
      title: t("promises.items.venues.title"),
      description: t("promises.items.venues.description")
    },
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: t("promises.items.design.title"),
      description: t("promises.items.design.description")
    },
    {
      icon: <Heart className="w-6 h-6" />,
      title: t("promises.items.storytelling.title"),
      description: t("promises.items.storytelling.description")
    },
    {
      icon: <ShieldCheck className="w-6 h-6" />,
      title: t("promises.items.execution.title"),
      description: t("promises.items.execution.description")
    }
  ];

  return (
    <section className="py-24 bg-sand/30">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-20">
          <span className="text-xs uppercase tracking-[0.3em] text-gold font-bold mb-4 block">
            {t("promises.tagline")}
          </span>
          <h2 className="text-4xl md:text-5xl font-light mb-6">{t("promises.title")}</h2>
          <p className="text-olive font-light">
            {t("promises.subtitle")}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {promises.map((promise, i) => (
            <motion.div
              key={promise.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-ivory p-10 rounded-2xl border border-sand/50 hover:shadow-xl transition-all duration-500 group"
            >
              <div className="w-12 h-12 bg-sand rounded-xl flex items-center justify-center text-gold mb-6 group-hover:bg-gold group-hover:text-ivory transition-colors duration-500">
                {promise.icon}
              </div>
              <h3 className="text-xl font-serif mb-4 text-charcoal">{promise.title}</h3>
              <p className="text-sm text-olive leading-relaxed font-light">
                {promise.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

