import { motion } from "motion/react";

export default function TrustBar() {
  const partners = [
    "VOGUE WEDDINGS", "BRIDES", "HARPER'S BAZAAR", "THE KNOT", "MARTHA STEWART"
  ];

  return (
    <section className="py-12 border-b border-sand bg-ivory">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-wrap justify-center md:justify-between items-center gap-8 md:gap-4 opacity-40 grayscale hover:grayscale-0 transition-all duration-700">
          {partners.map((partner, i) => (
            <motion.span
              key={partner}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-sm font-serif tracking-[0.3em] font-medium"
            >
              {partner}
            </motion.span>
          ))}
        </div>
      </div>
    </section>
  );
}
