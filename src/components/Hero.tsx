import { motion } from "motion/react";
import { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import ReservationForm from "./ReservationForm";

import heroImage1 from "../assets/Images/Hero/1710679035744.jpg";
import heroImage2 from "../assets/Images/Hero/aaa7385c0a2c88ee.jpg";
import heroImage3 from "../assets/Images/Hero/Amine-et-Jad-mariage-oatlas-marrakech-11.webp";
import heroImage4 from "../assets/Images/Hero/RM-carousel-events-weddings.webp";

const images = [
  heroImage1,
  heroImage2,
  heroImage3,
  heroImage4
];

export default function Hero() {
  const [currentImage, setCurrentImage] = useState(0);
  const [incomingImage, setIncomingImage] = useState<number | null>(null);
  const [isFading, setIsFading] = useState(false);
  const currentImageRef = useRef(0);
  const { t } = useTranslation();

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
  }, []);

  return (
    <section className="relative min-h-screen flex items-center pt-32 pb-20 lg:py-20 overflow-hidden">
      {/* Background Slideshow */}
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
        {/* Left: Title & Subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-ivory text-center lg:text-left"
        >
          <span className="text-xs uppercase tracking-[0.3em] font-medium mb-6 block text-sand">
            {t("hero.tagline")}
          </span>
          <h1 className="text-5xl md:text-8xl font-light leading-[1.1] mb-8 text-balance text-white">
            {t("hero.title_part1")} <br />
            <span className="italic font-serif">{t("hero.title_part2")}</span> {t("hero.title_part3")}
          </h1>
          <p className="text-lg md:text-xl font-light text-ivory/80 max-w-lg mx-auto lg:mx-0 leading-relaxed">
            {t("hero.subtitle")}
          </p>
        </motion.div>

        {/* Right: Reservation Form */}
        <motion.div
          id="reservation-form"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="bg-ivory/95 backdrop-blur-xl p-8 md:p-10 rounded-2xl shadow-2xl max-w-md mx-auto lg:ml-auto border border-lavender"
        >
          <ReservationForm defaultWeddingType="wedding_in_marrakech" />
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 hidden md:block"
      >
        <div className="w-px h-16 bg-linear-to-b from-ivory to-transparent" />
      </motion.div>
    </section>
  );
}