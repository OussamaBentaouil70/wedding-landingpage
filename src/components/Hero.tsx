import { motion } from "motion/react";
import { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";

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
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    weddingDate: "",
    guests: "",
    weddingType: "desert_agafay",
    message: "",
  });
  const [status, setStatus] = useState<{
    type: "idle" | "loading" | "success" | "error";
    message: string;
  }>({ type: "idle", message: "" });
  const { t } = useTranslation();

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!formData.fullName || !formData.email || !formData.message) {
      setStatus({ type: "error", message: "Please fill in your name, email, and message." });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setStatus({ type: "error", message: "Please enter a valid email address." });
      return;
    }

    setStatus({ type: "loading", message: "" });

    const [firstName = "Guest", ...rest] = formData.fullName.trim().split(/\s+/);
    const lastName = rest.join(" ") || "Reservation";
    const details = [
      formData.message,
      formData.weddingDate ? `Preferred date: ${formData.weddingDate}` : "",
      formData.guests ? `Estimated guests: ${formData.guests}` : "",
    ]
      .filter(Boolean)
      .join("\n");

    try {
      const response = await fetch("/contact-handler.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email: formData.email,
          phone: "",
          weddingType: formData.weddingType,
          message: details,
        }),
      });

      const raw = await response.text();
      let data: any = null;
      try {
        data = raw ? JSON.parse(raw) : null;
      } catch {
        data = null;
      }

      if (!response.ok) {
        const fallbackMessage = response.status >= 500
          ? "Server error from backend. Check PHP logs and configuration."
          : "Request failed. Please verify your form data and try again.";
        setStatus({
          type: "error",
          message: data?.message || fallbackMessage,
        });
        return;
      }

      if (!data || typeof data !== "object") {
        setStatus({
          type: "error",
          message: "Backend returned an invalid response. Please check PHP setup.",
        });
        return;
      }

      if (data.success) {
        setStatus({ type: "success", message: data.message || "Your reservation request has been sent." });
        setFormData({
          fullName: "",
          email: "",
          weddingDate: "",
          guests: "",
          weddingType: "desert_agafay",
          message: "",
        });
        setTimeout(() => {
          window.location.assign("/thank-you");
        }, 700);
      } else {
        setStatus({ type: "error", message: data.message || "Something went wrong. Please try again." });
      }
    } catch (error) {
      console.error("Reservation form error:", error);
      setStatus({ type: "error", message: "Failed to send. Please check that the PHP backend is running." });
    }
  };

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
          <h3 className="text-2xl font-serif mb-6 text-charcoal">{t("hero.form.title")}</h3>
          <form className="space-y-4" onSubmit={handleSubmit}>
            {status.type === "error" && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded-lg text-xs">
                {status.message}
              </div>
            )}
            {status.type === "success" && (
              <div className="bg-green-50 border border-green-200 text-green-700 px-3 py-2 rounded-lg text-xs">
                {status.message}
              </div>
            )}
            <div className="space-y-1">
              <label className="text-[10px] uppercase tracking-widest font-semibold text-olive">{t("hero.form.name")}</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="E.g. Sarah & James"
                required
                className="w-full bg-transparent border-b border-sand py-2 focus:border-gold outline-none transition-colors text-sm"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] uppercase tracking-widest font-semibold text-olive">{t("hero.form.email")}</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="hello@example.com"
                required
                className="w-full bg-transparent border-b border-sand py-2 focus:border-gold outline-none transition-all text-sm"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-widest font-semibold text-olive">{t("hero.form.date")}</label>
                <input
                  type="date"
                  name="weddingDate"
                  value={formData.weddingDate}
                  onChange={handleChange}
                  className="w-full bg-transparent border-b border-sand py-2 focus:border-gold outline-none transition-all text-sm"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-widest font-semibold text-olive">{t("hero.form.guests")}</label>
                <input
                  type="number"
                  name="guests"
                  value={formData.guests}
                  onChange={handleChange}
                  min="1"
                  placeholder="100"
                  className="w-full bg-transparent border-b border-sand py-2 focus:border-gold outline-none transition-all text-sm"
                />
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-[10px] uppercase tracking-widest font-semibold text-olive">{t("hero.form.type")}</label>
              <select
                name="weddingType"
                value={formData.weddingType}
                onChange={handleChange}
                className="w-full bg-transparent border-b border-sand py-2 focus:border-gold outline-none transition-all text-sm"
              >
                <option value="desert_agafay">{t("wedding_types.options.desert_agafay")}</option>
                <option value="riad">{t("wedding_types.options.riad")}</option>
                <option value="garden">{t("wedding_types.options.garden")}</option>
                <option value="villas">{t("wedding_types.options.villas")}</option>
                <option value="camps">{t("wedding_types.options.camps")}</option>
                <option value="beach">{t("wedding_types.options.beach")}</option>
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-[10px] uppercase tracking-widest font-semibold text-olive">{t("hero.form.message")}</label>
              <textarea
                name="message"
                rows={3}
                value={formData.message}
                onChange={handleChange}
                placeholder={t("hero.form.message_placeholder")}
                required
                className="w-full bg-transparent border-b border-sand py-2 focus:border-gold outline-none transition-all text-sm resize-none"
              />
            </div>
            <button
              type="submit"
              disabled={status.type === "loading"}
              className="w-full bg-gold text-ivory py-4 rounded-full text-xs uppercase tracking-widest font-bold mt-6 hover:bg-charcoal transition-all duration-500 shadow-lg hover:shadow-gold/20 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {status.type === "loading" ? "Sending..." : t("hero.form.button")}
            </button>
            <p className="text-[10px] text-center text-olive/60 mt-4 uppercase tracking-tighter">
              {t("hero.form.disclaimer")}
            </p>
          </form>
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