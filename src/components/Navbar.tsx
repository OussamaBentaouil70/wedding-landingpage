import { motion, AnimatePresence } from "motion/react";
import { Menu, X, Globe, ChevronDown } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import logo from "../assets/Images/logo.png";

function LanguageSwitcher({ scrolled, isMobile = false }: { scrolled: boolean; isMobile?: boolean }) {
  const [isLangOpen, setIsLangOpen] = useState(false);
  const { i18n } = useTranslation();
  const langRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(event.target as Node)) {
        setIsLangOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const languages = [
    { code: "en", label: "English" },
    { code: "fr", label: "Français" },
  ];

  return (
    <div className="relative" ref={langRef}>
      <button 
        onClick={() => setIsLangOpen(!isLangOpen)}
        className={`flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold hover:text-gold transition-colors ${
          scrolled || isMobile ? 'text-charcoal' : 'text-ivory'
        } ${isMobile && !scrolled ? 'md:text-ivory' : ''}`}
      >
        <Globe size={14} className="text-gold" />
        <span>{i18n.language.toUpperCase()}</span>
        {!isMobile && <ChevronDown size={12} className={`transition-transform duration-300 ${isLangOpen ? 'rotate-180' : ''}`} />}
      </button>

      <AnimatePresence>
        {isLangOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className={`absolute right-0 mt-4 w-32 bg-white rounded-xl shadow-xl border border-lavender overflow-hidden z-[60]`}
          >
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => {
                  i18n.changeLanguage(lang.code);
                  setIsLangOpen(false);
                }}
                className={`w-full text-left px-4 py-3 text-[10px] uppercase tracking-widest font-bold transition-colors hover:bg-lavender/30 ${
                  i18n.language === lang.code ? "text-gold" : "text-charcoal"
                }`}
              >
                {lang.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: t("nav.home"), href: "/" },
    { name: t("nav.about"), href: "#about" },
    { name: t("nav.services"), href: "#services" },
    { name: t("nav.gallery"), href: "#gallery" },
    { name: t("nav.process"), href: "#process" },
    { name: t("nav.contact"), href: "#contact" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-ivory/90 backdrop-blur-md py-4 shadow-sm" : "bg-transparent py-8"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center"
        >
          <a href="/" aria-label="Kech Weddings Home" className="block">
            <img
              src={logo}
              alt="Kech Weddings"
              className={`h-14 md:h-16 w-auto object-contain transition-all duration-500 ${scrolled ? "brightness-0" : ""}`}
            />
          </a>
        </motion.div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link, i) => (
            <motion.a
              key={link.name}
              href={link.href}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`text-xs uppercase tracking-widest hover:text-gold transition-colors font-medium ${scrolled ? 'text-charcoal' : 'text-ivory'}`}
            >
              {link.name}
            </motion.a>
          ))}
          
          <LanguageSwitcher scrolled={scrolled} />

          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-gold text-ivory px-6 py-2 rounded-full text-xs uppercase tracking-widest hover:bg-charcoal transition-colors shadow-lg"
          >
            {t("nav.inquire")}
          </motion.button>
        </div>

        {/* Mobile Toggle */}
        <div className="flex items-center gap-4 md:hidden">
          <LanguageSwitcher scrolled={scrolled} isMobile />
          <button className={`${scrolled ? 'text-charcoal' : 'text-ivory'}`} onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden absolute top-full left-0 right-0 bg-ivory border-t border-sand p-6 flex flex-col gap-4 shadow-xl"
        >
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="text-sm uppercase tracking-widest font-medium py-2 border-b border-sand/50"
            >
              {link.name}
            </a>
          ))}
          <button className="bg-charcoal text-ivory px-6 py-3 rounded-full text-xs uppercase tracking-widest mt-4">
            {t("nav.inquire")}
          </button>
        </motion.div>
      )}
    </nav>
  );
}



