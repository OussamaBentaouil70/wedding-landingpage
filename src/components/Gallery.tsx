import { motion, AnimatePresence } from "motion/react";
import { useState, useRef, useMemo } from "react";
import { X, ZoomIn, ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslation } from "react-i18next";

import galleryImage1 from "../assets/Images/pexels-aysenur-sahin-57769289-36966419.jpg";
import galleryImage2 from "../assets/Images/Destination-Wedding-Photographer-3-1536x1024-1.jpg";
import galleryImage3 from "../assets/Images/pexels-mographe-15531226.jpg";
import galleryImage4 from "../assets/Images/pexels-mographe-30374225.jpg";
import galleryImage5 from "../assets/Images/pexels-voltaccess-48169519-7556738.jpg";
import galleryImage6 from "../assets/Images/pexels-lilen-diaz-1025474869-36785663.jpg";

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState<any | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();

  const images = useMemo(() => [
    {
      url: galleryImage1,
      title: t("gallery.items.riad.title"),
      category: t("gallery.items.riad.category")
    },
    {
      url: galleryImage2,
      title: t("gallery.items.desert.title"),
      category: t("gallery.items.desert.category")
    },
    {
      url: galleryImage3,
      title: t("gallery.items.garden.title"),
      category: t("gallery.items.garden.category")
    },
    {
      url: galleryImage4,
      title: t("gallery.items.details.title"),
      category: t("gallery.items.details.category")
    },
    {
      url: galleryImage5,
      title: t("gallery.items.nomadic.title"),
      category: t("gallery.items.nomadic.category")
    },
    {
      url: galleryImage6,
      title: t("gallery.items.coastal.title"),
      category: t("gallery.items.coastal.category")
    }
  ], [t]);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === "left" ? scrollLeft - clientWidth / 2 : scrollLeft + clientWidth / 2;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  return (
    <section id="gallery" className="py-24 bg-ivory overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div className="max-w-2xl">
          <span className="text-xs uppercase tracking-[0.3em] text-gold font-bold mb-4 block">
            {t("gallery.tagline")}
          </span>
          <h2 className="text-4xl md:text-5xl font-light mb-6 text-charcoal">{t("gallery.title")}</h2>
          <p className="text-olive font-light">
            {t("gallery.subtitle")}
          </p>
        </div>
        
        <div className="flex gap-4">
          <button 
            onClick={() => scroll("left")}
            className="w-12 h-12 rounded-full border border-sand flex items-center justify-center text-charcoal hover:bg-gold hover:text-ivory transition-all shadow-sm"
          >
            <ChevronLeft size={20} />
          </button>
          <button 
            onClick={() => scroll("right")}
            className="w-12 h-12 rounded-full border border-sand flex items-center justify-center text-charcoal hover:bg-gold hover:text-ivory transition-all shadow-sm"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      <div 
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto pb-12 px-6 md:px-[calc((100vw-1280px)/2+24px)] scrollbar-hide snap-x snap-mandatory"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {images.map((image, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.8 }}
            onClick={() => setSelectedImage(image)}
            className="relative flex-none w-75 md:w-112.5 aspect-16/10 overflow-hidden rounded-2xl shadow-xl cursor-pointer snap-center group"
          >
            <img
              src={image.url}
              alt={image.title}
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-charcoal/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-center items-center p-8">
              <div className="w-12 h-12 rounded-full bg-gold/90 flex items-center justify-center text-ivory mb-4 scale-50 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-500">
                <ZoomIn size={24} />
              </div>
              <div className="mt-auto w-full text-left">
                <span className="text-[10px] uppercase tracking-widest text-gold font-bold mb-2 block">
                  {image.category}
                </span>
                <h3 className="text-xl font-serif text-ivory">{image.title}</h3>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <div className="fixed inset-0 z-100 flex items-center justify-center p-4 md:p-12">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedImage(null)}
              className="absolute inset-0 bg-charcoal/95 backdrop-blur-md cursor-zoom-out"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative max-w-6xl w-full max-h-[90vh] flex items-center justify-center pointer-events-none"
            >
              <img
                src={selectedImage.url}
                alt={selectedImage.title}
                className="max-w-full max-h-full object-contain rounded-lg shadow-2xl pointer-events-auto"
                referrerPolicy="no-referrer"
              />
              
              <div className="absolute -bottom-16 left-0 right-0 text-center pointer-events-auto">
                <h3 className="text-ivory font-serif text-2xl mb-1">{selectedImage.title}</h3>
                <p className="text-gold text-xs uppercase tracking-widest font-bold">{selectedImage.category}</p>
              </div>

              <button
                onClick={() => setSelectedImage(null)}
                className="absolute -top-12 right-0 md:-right-12 text-ivory hover:text-gold transition-colors pointer-events-auto"
              >
                <X size={32} />
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}


