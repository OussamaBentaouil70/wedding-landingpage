import { motion } from "motion/react";
import { useTranslation } from "react-i18next";

export default function ContactForm() {
  const { t } = useTranslation();

  return (
    <section id="contact" className="py-24 bg-ivory">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-20">
          <div>
            <span className="text-xs uppercase tracking-[0.3em] text-gold font-bold mb-4 block">
              {t("contact.tagline")}
            </span>
            <h2 className="text-4xl md:text-5xl font-light mb-8 leading-tight text-charcoal">
              {t("contact.title_part1")} <br />
              <span className="italic">{t("contact.title_part2")}</span>
            </h2>
            <p className="text-olive font-light leading-relaxed mb-12 max-w-md">
              {t("contact.subtitle")}
            </p>

            <div className="space-y-8">
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 bg-lavender rounded-full flex items-center justify-center text-gold shrink-0">
                  <i className="fas fa-envelope"></i>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-olive mb-1">{t("contact.email_label")}</p>
                  <p className="text-lg font-serif">concierge@kechweddings.com</p>
                </div>
              </div>
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 bg-lavender rounded-full flex items-center justify-center text-gold shrink-0">
                  <i className="fas fa-phone"></i>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-olive mb-1">{t("contact.phone_label")}</p>
                  <p className="text-lg font-serif">+212 600 000 000</p>
                </div>
              </div>
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 bg-lavender rounded-full flex items-center justify-center text-gold shrink-0">
                  <i className="fas fa-map-marker-alt"></i>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-olive mb-1">{t("contact.visit_label")}</p>
                  <p className="text-lg font-serif">Gueliz, Marrakech, Morocco</p>
                </div>
              </div>
            </div>

            <div className="mt-16 flex gap-6">
              <a href="#" className="w-12 h-12 bg-gold text-ivory rounded-full flex items-center justify-center hover:bg-charcoal transition-all">
                <i className="fab fa-instagram text-xl"></i>
              </a>
              <a href="#" className="w-12 h-12 bg-gold text-ivory rounded-full flex items-center justify-center hover:bg-charcoal transition-all">
                <i className="fab fa-facebook-f text-xl"></i>
              </a>
              <a href="#" className="w-12 h-12 bg-gold text-ivory rounded-full flex items-center justify-center hover:bg-charcoal transition-all">
                <i className="fab fa-tiktok text-xl"></i>
              </a>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white p-10 md:p-12 rounded-[2rem] shadow-xl border border-lavender"
          >
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-olive">{t("contact.form.first_name")}</label>
                  <input type="text" className="w-full bg-lavender/30 border border-lavender/50 rounded-xl px-4 py-3 focus:border-gold outline-none transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-olive">{t("contact.form.last_name")}</label>
                  <input type="text" className="w-full bg-lavender/30 border border-lavender/50 rounded-xl px-4 py-3 focus:border-gold outline-none transition-all" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest font-bold text-olive">{t("contact.form.email")}</label>
                <input type="email" className="w-full bg-lavender/30 border border-lavender/50 rounded-xl px-4 py-3 focus:border-gold outline-none transition-all" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest font-bold text-olive">{t("contact.form.type")}</label>
                <select className="w-full bg-lavender/30 border border-lavender/50 rounded-xl px-4 py-3 focus:border-gold outline-none transition-all">
                  <option value="desert_agafay">{t("wedding_types.options.desert_agafay")}</option>
                  <option value="riad">{t("wedding_types.options.riad")}</option>
                  <option value="garden">{t("wedding_types.options.garden")}</option>
                  <option value="villas">{t("wedding_types.options.villas")}</option>
                  <option value="camps">{t("wedding_types.options.camps")}</option>
                  <option value="beach">{t("wedding_types.options.beach")}</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest font-bold text-olive">{t("contact.form.message")}</label>
                <textarea rows={4} className="w-full bg-lavender/30 border border-lavender/50 rounded-xl px-4 py-3 focus:border-gold outline-none transition-all resize-none"></textarea>
              </div>
              <button className="w-full bg-gold text-ivory py-4 rounded-xl text-xs uppercase tracking-widest font-bold hover:bg-charcoal transition-all duration-500 shadow-lg">
                {t("contact.form.button")}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

