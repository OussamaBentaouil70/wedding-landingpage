import { motion, AnimatePresence } from "motion/react";
import { useState, useMemo } from "react";
import { X } from "lucide-react";
import weddingImage1 from "../assets/Images/Hero/1710679035744.jpg";
import weddingImage2 from "../assets/Images/agafay-desert/EclecticElegance_AgafayDesert_MoroccoWedding-85.webp";
import weddingImage3 from "../assets/Images/Elopement/Wedding-at-Be-Agafay-wedding-at-the-desert-in-Marrakech-48.jpg";
import weddingImage4 from "../assets/Images/Kerala/Grand-Canal-The-Oberoi-Marrakech-Morocco-Indian-Wedding-Ptaufiq-Photography-Ceremony-12.jpg";
import weddingImage5 from "../assets/Images/Jewish/Marrakech-jewish-wedding-cover.jpg";

interface WeddingType {
  id: string;
  title: string;
  image: string;
  href?: string;
  description: string;
  features: string[];
}

export default function WeddingTypes() {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const weddingTypes: WeddingType[] = useMemo(() => [
    {
      id: "wedding_in_marrakech",
      title: "Wedding in Marrakech",
      image: weddingImage1,
      description:
        "A refined celebration in the heart of Marrakech, designed around your story with signature elegance and seamless coordination.",
      features: [
        "Exclusive riads, villas, and private venues",
        "Bespoke decor, floral styling, and guest experience",
        "Full planning and on-site execution",
      ],
    },
    {
      id: "agafay_desert_wedding",
      title: "Agafay Desert Wedding",
      image: weddingImage2,
      href: "/gafay-desert",
      description:
        "From intimate sunset ceremonies to immersive multi-day desert experiences, we design weddings in Agafay with exclusivity and unforgettable moments.",
      features: [
        "Luxury desert camps and private setups",
        "Golden hour ceremonies and candlelit dinners",
        "Complete remote event production",
      ],
    },
    {
      id: "elopement_wedding_morocco",
      title: "Elopement Wedding in Morocco",
      image: weddingImage3,
      href: "/elopement",
      description:
        "From intimate vows to romantic escapes, we design elopements focused on emotion, privacy, and meaningful moments.",
      features: [
        "Location scouting and romantic styling",
        "Photography-focused intimate planning",
        "Secluded venues across Morocco",
      ],
    },
    {
      id: "kerala_wedding_marrakech",
      title: "Kerala Wedding in Marrakech",
      image: weddingImage4,
      href: "/kerala",
      description:
        "From vibrant rituals to multi-day celebrations, we design Kerala weddings with cultural authenticity in luxury Moroccan settings.",
      features: [
        "Traditional ceremony coordination",
        "Indian cuisine and hospitality planning",
        "Multi-day event design and logistics",
      ],
    },
    {
      id: "jewish_wedding_marrakech",
      title: "Jewish Wedding in Marrakech",
      image: weddingImage5,
      href: "/jewish",
      description:
        "From chuppah ceremonies to elegant multi-day celebrations, we create Jewish weddings that honor heritage and elevate every detail.",
      features: [
        "Kosher catering coordination",
        "Culturally aligned ceremonial setup",
        "Luxury planning with tradition at the center",
      ],
    }
  ], []);

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
            Our Offerings
          </span>
          <h2 className="text-4xl md:text-5xl font-light mb-6">Wedding Experiences</h2>
          <p className="text-olive font-light">
            Discover our curated wedding experiences in Morocco. Click to explore each universe.
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
              onClick={() => {
                if (type.href) {
                  window.location.assign(type.href);
                } else {
                  setSelectedId(type.id);
                }
              }}
              className="group relative aspect-4/5 overflow-hidden rounded-2xl cursor-pointer shadow-lg"
            >
              <img
                src={type.image}
                alt={type.title}
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-linear-to-t from-charcoal/90 via-charcoal/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute bottom-0 left-0 p-8 w-full">
                <h3 className="text-2xl font-serif text-ivory mb-2">{type.title}</h3>
                <p className="text-xs text-ivory/70 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  {type.href ? "Explore Experience -\u003e" : "Open Details -\u003e"}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedType && (
          <div className="fixed inset-0 z-100 flex items-center justify-center p-4 md:p-8">
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

              <div className="w-full md:w-1/2 aspect-16/10 md:aspect-auto relative shrink-0">
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
                  Venue Experience
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
                    Start Planning -\u003e
                  </button>
                  <button
                    onClick={() => setSelectedId(null)}
                    className="flex-1 border border-sand text-olive py-3 md:py-4 rounded-xl text-[10px] md:text-xs uppercase tracking-widest font-bold hover:bg-ivory transition-all"
                  >
                    Close
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


