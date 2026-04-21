import { motion, AnimatePresence } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { X, ZoomIn, ChevronLeft, ChevronRight } from "lucide-react";

import Navbar from "./Navbar";
import Footer from "./Footer";
import WhatsAppButton from "./WhatsAppButton";
import ReservationForm from "./ReservationForm";

interface SectionContent {
  label: string;
  title: string;
  description: string;
  image?: string;
}

interface GalleryItem {
  url: string;
  title: string;
  category: string;
}

interface WeddingSubpageProps {
  pageTitle: string;
  overline: string;
  introTitle: string;
  introSubtitle: string;
  introDescription: string;
  deepDiveTitle: string;
  deepDiveParagraphs: string[];
  highlightsTitle: string;
  highlights: string[];
  readyTitle: string;
  readyDescription: string;
  defaultWeddingType: string;
  images: string[];
  sections: SectionContent[];
  galleryTitle: string;
  gallerySubtitle: string;
  galleryItems: GalleryItem[];
}

export default function WeddingSubpage({
  pageTitle,
  overline,
  introTitle,
  introSubtitle,
  introDescription,
  deepDiveTitle,
  deepDiveParagraphs,
  highlightsTitle,
  highlights,
  readyTitle,
  readyDescription,
  defaultWeddingType,
  images,
  sections,
  galleryTitle,
  gallerySubtitle,
  galleryItems,
}: WeddingSubpageProps) {
  const [currentImage, setCurrentImage] = useState(0);
  const [incomingImage, setIncomingImage] = useState<number | null>(null);
  const [isFading, setIsFading] = useState(false);
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);
  const currentImageRef = useRef(0);
  const galleryScrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    currentImageRef.current = currentImage;
  }, [currentImage]);

  useEffect(() => {
    let fadeTimer: number | undefined;

    const timer = window.setInterval(() => {
      const nextImageIndex = (currentImageRef.current + 1) % images.length;

      setIncomingImage(nextImageIndex);
      setIsFading(true);

      fadeTimer = window.setTimeout(() => {
        setCurrentImage(nextImageIndex);
        currentImageRef.current = nextImageIndex;
        setIncomingImage(null);
        setIsFading(false);
      }, 1200);
    }, 5000);

    return () => {
      window.clearInterval(timer);
      if (fadeTimer !== undefined) {
        window.clearTimeout(fadeTimer);
      }
    };
  }, [images.length]);

  const scrollGallery = (direction: "left" | "right") => {
    if (galleryScrollRef.current) {
      const { scrollLeft, clientWidth } = galleryScrollRef.current;
      const scrollTo = direction === "left" ? scrollLeft - clientWidth / 2 : scrollLeft + clientWidth / 2;
      galleryScrollRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-ivory selection:bg-gold selection:text-ivory">
      <Navbar />
      <main>
        <section className="relative min-h-screen flex items-center pt-32 pb-20 lg:py-20 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <motion.img
              key={currentImage}
              src={images[currentImage]}
              initial={{ opacity: 1 }}
              animate={{ opacity: isFading ? 0 : 1 }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
              className="absolute inset-0 w-full h-full object-cover object-center"
              referrerPolicy="no-referrer"
            />
            {incomingImage !== null && (
              <motion.img
                key={incomingImage}
                src={images[incomingImage]}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.2, ease: "easeInOut" }}
                className="absolute inset-0 w-full h-full object-cover object-center"
                referrerPolicy="no-referrer"
              />
            )}
            <div className="absolute inset-0 bg-charcoal/45" />
          </div>

          <div className="max-w-7xl mx-auto px-6 w-full relative z-10 grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-ivory text-center lg:text-left"
            >
              <span className="text-xs uppercase tracking-[0.3em] font-medium mb-6 block text-sand">
                {overline}
              </span>
              <h1 className="text-5xl md:text-7xl font-light leading-[1.1] mb-8 text-balance text-white">
                {pageTitle}
              </h1>
              <p className="text-lg md:text-xl font-light text-ivory/85 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                {introDescription}
              </p>
            </motion.div>

            <motion.div
              id="reservation-form"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="bg-ivory/95 backdrop-blur-xl p-8 md:p-10 rounded-2xl shadow-2xl max-w-md mx-auto lg:ml-auto border border-lavender"
            >
              <ReservationForm defaultWeddingType={defaultWeddingType} />
            </motion.div>
          </div>
        </section>

        <section className="py-24 bg-ivory">
          <div className="max-w-5xl mx-auto px-6 text-center">
            <span className="text-xs uppercase tracking-[0.3em] text-gold font-bold mb-4 block">{introTitle}</span>
            <h2 className="text-4xl md:text-5xl font-light text-charcoal mb-6">{introSubtitle}</h2>
            <p className="text-lg text-olive font-light leading-relaxed">{introDescription}</p>
          </div>
        </section>

        <section className="py-20 bg-lavender/30">
          <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-8">
            {sections.map((section, index) => (
              <motion.article
                key={section.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className={`group relative rounded-3xl p-8 md:p-10 border transition-all duration-500 ${
                  section.image
                    ? "overflow-hidden bg-linear-to-br from-white via-ivory to-lavender/40 border-gold/40 shadow-[0_20px_55px_-30px_rgba(51,51,51,0.55)] hover:-translate-y-1 hover:shadow-[0_30px_70px_-35px_rgba(51,51,51,0.65)]"
                    : "bg-white border-lavender/50 shadow-sm"
                }`}
              >
                {section.image && (
                  <div className="relative mb-7 overflow-hidden rounded-2xl aspect-16/10 ring-1 ring-gold/25 shadow-[0_20px_45px_-30px_rgba(0,0,0,0.65)]">
                    <img
                      src={section.image}
                      alt={section.title}
                      className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-charcoal/55 via-charcoal/10 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 h-24 bg-linear-to-t from-charcoal/35 to-transparent" />
                    <span className="absolute top-4 left-4 text-[10px] uppercase tracking-[0.24em] text-ivory/95 bg-charcoal/40 border border-ivory/30 px-3 py-1.5 rounded-full backdrop-blur-sm">
                      Signature Venue
                    </span>
                  </div>
                )}
                {section.image && (
                  <div className="mb-4 h-px w-16 bg-linear-to-r from-gold to-transparent" />
                )}
                <p className="text-[10px] uppercase tracking-[0.3em] text-gold font-bold mb-4">{section.label}</p>
                <h3 className={`font-serif text-charcoal mb-4 ${section.image ? "text-[2rem] leading-tight" : "text-2xl md:text-3xl"}`}>
                  {section.title}
                </h3>
                <p className="text-olive font-light leading-relaxed">{section.description}</p>
              </motion.article>
            ))}
          </div>
        </section>

        <section className="py-24 bg-ivory">
          <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-10 items-start">
            <div className="bg-white rounded-4xl p-8 md:p-10 shadow-sm border border-lavender/50">
              <p className="text-[10px] uppercase tracking-[0.3em] text-gold font-bold mb-4">Editorial Story</p>
              <h3 className="text-2xl md:text-3xl font-serif text-charcoal mb-6">{deepDiveTitle}</h3>
              <div className="space-y-5">
                {deepDiveParagraphs.map((paragraph, index) => (
                  <p key={index} className="text-olive font-light leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            <div className="bg-lavender/30 rounded-4xl p-8 md:p-10 border border-lavender/60">
              <p className="text-[10px] uppercase tracking-[0.3em] text-gold font-bold mb-4">Experience Highlights</p>
              <h3 className="text-2xl md:text-3xl font-serif text-charcoal mb-6">{highlightsTitle}</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {highlights.map((item, index) => (
                  <div key={index} className="bg-white rounded-2xl px-4 py-4 border border-lavender/60">
                    <p className="text-sm text-olive leading-relaxed">
                      <span className="text-gold mr-2">✦</span>
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="py-24 bg-lavender/20 overflow-hidden" id="gallery">
          <div className="max-w-7xl mx-auto px-6 mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="max-w-2xl">
              <span className="text-xs uppercase tracking-[0.3em] text-gold font-bold mb-4 block">Visual Storytelling</span>
              <h2 className="text-4xl md:text-5xl font-light mb-6 text-charcoal">{galleryTitle}</h2>
              <p className="text-olive font-light">{gallerySubtitle}</p>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => scrollGallery("left")}
                className="w-12 h-12 rounded-full border border-sand flex items-center justify-center text-charcoal hover:bg-gold hover:text-ivory transition-all shadow-sm"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={() => scrollGallery("right")}
                className="w-12 h-12 rounded-full border border-sand flex items-center justify-center text-charcoal hover:bg-gold hover:text-ivory transition-all shadow-sm"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>

          <div
            ref={galleryScrollRef}
            className="flex gap-6 overflow-x-auto pb-8 px-6 md:px-[calc((100vw-1280px)/2+24px)] scrollbar-hide snap-x snap-mandatory"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {galleryItems.map((image, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08, duration: 0.7 }}
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
                    <span className="text-[10px] uppercase tracking-widest text-gold font-bold mb-2 block">{image.category}</span>
                    <h3 className="text-xl font-serif text-ivory">{image.title}</h3>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="py-24 bg-ivory" id="contact">
          <div className="max-w-5xl mx-auto px-6">
            <div className="text-center mb-12">
              <span className="text-xs uppercase tracking-[0.3em] text-gold font-bold mb-4 block">Ready?</span>
              <h2 className="text-4xl md:text-5xl font-light text-charcoal mb-4">{readyTitle}</h2>
              <p className="text-olive font-light leading-relaxed max-w-3xl mx-auto">{readyDescription}</p>
            </div>
            <div className="bg-white p-8 md:p-12 rounded-4xl shadow-xl border border-lavender max-w-3xl mx-auto">
              <ReservationForm defaultWeddingType={defaultWeddingType} compact />
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />

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
    </div>
  );
}
