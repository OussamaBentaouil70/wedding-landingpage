import { motion } from "motion/react";
import { useTranslation } from "react-i18next";

export default function Process() {
  const { t } = useTranslation();

  const steps = [
    {
      number: "01",
      title: t("process.steps.step1.title"),
      description: t("process.steps.step1.description")
    },
    {
      number: "02",
      title: t("process.steps.step2.title"),
      description: t("process.steps.step2.description")
    },
    {
      number: "03",
      title: t("process.steps.step3.title"),
      description: t("process.steps.step3.description")
    },
    {
      number: "04",
      title: t("process.steps.step4.title"),
      description: t("process.steps.step4.description")
    }
  ];

  return (
    <section id="process" className="py-24 bg-charcoal text-ivory overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-3 gap-16 items-start">
          <div className="lg:sticky lg:top-32">
            <span className="text-xs uppercase tracking-[0.3em] text-sand font-bold mb-4 block text-gold">
              {t("process.tagline")}
            </span>
            <h2 className="text-4xl md:text-5xl font-light mb-8 leading-tight text-ivory">
              {t("process.title_part1")} <br />
              <span className="italic">{t("process.title_part2")}</span>
            </h2>
            <p className="text-ivory/60 font-light leading-relaxed mb-10">
              {t("process.subtitle")}
            </p>
            <div className="w-20 h-[1px] bg-gold" />
          </div>

          <div className="lg:col-span-2 space-y-12">
            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.8 }}
                className="group flex gap-8 md:gap-12 items-start border-b border-ivory/10 pb-12"
              >
                <span className="text-5xl md:text-7xl font-serif text-ivory/10 group-hover:text-gold/20 transition-colors duration-500">
                  {step.number}
                </span>
                <div>
                  <h3 className="text-2xl font-serif mb-4 group-hover:text-gold transition-colors duration-500">
                    {step.title}
                  </h3>
                  <p className="text-ivory/60 font-light leading-relaxed max-w-lg">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

