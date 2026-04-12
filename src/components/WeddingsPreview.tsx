import { motion } from "motion/react";
import { useTranslation } from "react-i18next";

import previewImage1 from "../assets/Images/pexels-mographe-15531226.jpg";
import previewImage2 from "../assets/Images/pexels-mographe-30374225.jpg";
import previewImage3 from "../assets/Images/pexels-tomas-anunziata-129267-412055.jpg";
import previewImage4 from "../assets/Images/pexels-voltaccess-48169519-7556738.jpg";

export default function WeddingsPreview() {
  const { t } = useTranslation();

  const weddings = [
    {
      title: t("weddings_preview.items.desert.title"),
      location: t("weddings_preview.items.desert.location"),
      image: previewImage1
    },
    {
      title: t("weddings_preview.items.riad.title"),
      location: t("weddings_preview.items.riad.location"),
      image: previewImage2
    },
    {
      title: t("weddings_preview.items.palace.title"),
      location: t("weddings_preview.items.palace.location"),
      image: previewImage3
    },
    {
      title: t("weddings_preview.items.atlas.title"),
      location: t("weddings_preview.items.atlas.location"),
      image: previewImage4
    }
  ];

  return (
    <section id="portfolio" className="py-24 bg-ivory">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="max-w-xl">
            <span className="text-xs uppercase tracking-[0.3em] text-gold font-bold mb-4 block">
              {t("weddings_preview.tagline")}
            </span>
            <h2 className="text-4xl md:text-5xl font-light leading-tight">
              {t("weddings_preview.title_part1")} <span className="italic">{t("weddings_preview.title_part2")}</span>
            </h2>
          </div>
          <button className="text-xs uppercase tracking-widest font-bold border-b border-charcoal pb-2 hover:text-gold hover:border-gold transition-all">
            {t("weddings_preview.button")}
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {weddings.map((wedding, i) => (
            <motion.div
              key={wedding.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.8 }}
              className="group relative aspect-16/10 overflow-hidden rounded-2xl cursor-pointer"
            >
              <img
                src={wedding.image}
                alt={wedding.title}
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-linear-to-t from-charcoal/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute bottom-0 left-0 p-10 text-ivory translate-y-10 group-hover:translate-y-0 transition-transform duration-500">
                <p className="text-[10px] uppercase tracking-widest mb-2 opacity-70">{wedding.location}</p>
                <h3 className="text-3xl font-serif">{wedding.title}</h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

