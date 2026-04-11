import { motion, AnimatePresence } from "motion/react";
import { useState, useMemo } from "react";
import { X } from "lucide-react";
import { useTranslation } from "react-i18next";

interface WeddingType {
  id: string;
  title: string;
  image: string;
  description: string;
  features: string[];
  experience: string;
}

export default function WeddingTypes() {
  const { t } = useTranslation();
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const weddingTypes: WeddingType[] = useMemo(() => [
    {
      id: "desert_agafay",
      title: t("wedding_types.items.desert_agafay.title"),
      image: "https://images.unsplash.com/photo-1546190255-451a91afc548?q=80&w=2070&auto=format&fit=crop",
      description: t("wedding_types.items.desert_agafay.description"),
      features: t("wedding_types.items.desert_agafay.features", { returnObjects: true }) as string[],
      experience: t("wedding_types.items.desert_agafay.experience")
    },
    {
      id: "riad",
      title: t("wedding_types.items.riad.title"),
      image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=2070&auto=format&fit=crop",
      description: t("wedding_types.items.riad.description"),
      features: t("wedding_types.items.riad.features", { returnObjects: true }) as string[],
      experience: t("wedding_types.items.riad.experience")
    },
    {
      id: "garden",
      title: t("wedding_types.items.garden.title"),
      image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=2069&auto=format&fit=crop",
      description: t("wedding_types.items.garden.description"),
      features: t("wedding_types.items.garden.features", { returnObjects: true }) as string[],
      experience: t("wedding_types.items.garden.experience")
    },
    {
      id: "villas",
      title: t("wedding_types.items.villas.title"),
      image: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070&auto=format&fit=crop",
      description: t("wedding_types.items.villas.description"),
      features: t("wedding_types.items.villas.features", { returnObjects: true }) as string[],
      experience: t("wedding_types.items.villas.experience")
    },
    {
      id: "camps",
      title: t("wedding_types.items.camps.title"),
      image: "https://images.unsplash.com/photo-1510076857177-7470076d4098?q=80&w=2072&auto=format&fit=crop",
      description: t("wedding_types.items.camps.description"),
      features: t("wedding_types.items.camps.features", { returnObjects: true }) as string[],
      experience: t("wedding_types.items.camps.experience")
    },
    {
      id: "beach",
      title: t("wedding_types.items.beach.title"),
      image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=2070&auto=format&fit=crop",
      description: t("wedding_types.items.beach.description"),
      features: t("wedding_types.items.beach.features", { returnObjects: true }) as string[],
      experience: t("wedding_types.items.beach.experience")
    }
  ], [t]);

  const selectedType = useMemo(() => 
    weddingTypes.find(type => type.id === selectedId) || null
  , [selectedId, weddingTypes]);

  const scrollToForm = () => {
    setSelectedId(null);
    const form = document.getElementById("reservation-form");
    if (form) {
      form.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="services" className="py-24 bg-lavender/30">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-20">
          <span className="text-xs uppercase tracking-[0.3em] text-gold font-bold mb-4 block">
            {t("wedding_types.tagline")}
          </span>
          <h2 className="text-4xl md:text-5xl font-light mb-6">{t("wedding_types.title")}</h2>
          <p className="text-olive font-light">
            {t("wedding_types.subtitle")}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {weddingTypes.map((type, i) => (
            <motion.div
              key={type.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              onClick={() => setSelectedId(type.id)}
              className="group relative aspect-[4/5] overflow-hidden rounded-2xl cursor-pointer shadow-lg"
            >
              <img
                src={type.image}
                alt={type.title}
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute bottom-0 left-0 p-8 w-full">
                <h3 className="text-2xl font-serif text-ivory mb-2">{type.title}</h3>
                <p className="text-xs text-ivory/70 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  {t("wedding_types.explore")}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedType && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedId(null)}
              className="absolute inset-0 bg-charcoal/80 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative bg-white w-full max-w-5xl max-h-[90vh] md:max-h-none rounded-3xl overflow-y-auto md:overflow-hidden shadow-2xl flex flex-col md:flex-row"
            >
              <button
                onClick={() => setSelectedId(null)}
                className="absolute top-4 right-4 md:top-6 md:right-6 z-20 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center text-charcoal shadow-md hover:bg-gold hover:text-white transition-all"
              >
                <X size={20} />
              </button>

              <div className="w-full md:w-1/2 aspect-[16/10] md:aspect-auto relative shrink-0">
                <img
                  src={selectedType.image}
                  alt={selectedType.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gold/10" />
              </div>

              <div className="w-full md:w-1/2 p-6 md:p-12 flex flex-col justify-center">
                <span className="text-[10px] uppercase tracking-[0.3em] text-gold font-bold mb-4 block">
                  {t("wedding_types.modal.tagline")}
                </span>
                <h2 className="text-2xl md:text-4xl font-serif text-charcoal mb-4 md:mb-6">{selectedType.title}</h2>
                <p className="text-sm md:text-base text-olive font-light leading-relaxed mb-6 md:mb-8">
                  {selectedType.description}
                </p>
                
                <div className="space-y-3 md:space-y-4 mb-8 md:mb-10">
                  {selectedType.features.map((feature, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <span className="text-gold mt-1">✦</span>
                      <p className="text-xs md:text-sm text-olive">{feature}</p>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
                  <button
                    onClick={scrollToForm}
                    className="flex-1 bg-gold text-ivory py-3 md:py-4 rounded-xl text-[10px] md:text-xs uppercase tracking-widest font-bold hover:bg-charcoal transition-all duration-500 shadow-lg"
                  >
                    {t("wedding_types.modal.planning")}
                  </button>
                  <button
                    onClick={() => setSelectedId(null)}
                    className="flex-1 border border-sand text-olive py-3 md:py-4 rounded-xl text-[10px] md:text-xs uppercase tracking-widest font-bold hover:bg-ivory transition-all"
                  >
                    {t("wedding_types.modal.close")}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}


