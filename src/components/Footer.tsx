import { useTranslation } from "react-i18next";
import logo from "../assets/Images/logo.png";

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-charcoal text-ivory/60 py-20 border-t border-ivory/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-20">
          <div className="md:col-span-2">
            <a href="#" aria-label="Kech Weddings Home" className="inline-block mb-6">
              <img
                src={logo}
                alt="Kech Weddings"
                className="h-16 md:h-20 w-auto object-contain"
              />
            </a>
            <p className="max-w-sm font-light leading-relaxed">
              {t("footer.description")}
            </p>
            <div className="mt-8 flex gap-6">
              <a href="#" className="w-10 h-10 rounded-full border border-ivory/20 flex items-center justify-center text-ivory hover:bg-gold hover:border-gold transition-all">
                <i className="fab fa-instagram text-lg"></i>
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-ivory/20 flex items-center justify-center text-ivory hover:bg-gold hover:border-gold transition-all">
                <i className="fab fa-facebook-f text-lg"></i>
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-ivory/20 flex items-center justify-center text-ivory hover:bg-gold hover:border-gold transition-all">
                <i className="fab fa-tiktok text-lg"></i>
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-ivory text-xs uppercase tracking-widest font-bold mb-6">{t("footer.quick_links")}</h4>
            <ul className="space-y-4 text-sm font-light">
              <li><a href="#" className="hover:text-gold transition-colors">{t("nav.home")}</a></li>
              <li><a href="#about" className="hover:text-gold transition-colors">{t("nav.about")}</a></li>
              <li><a href="#services" className="hover:text-gold transition-colors">{t("nav.services")}</a></li>
              <li><a href="#gallery" className="hover:text-gold transition-colors">{t("nav.gallery")}</a></li>
              <li><a href="#process" className="hover:text-gold transition-colors">{t("nav.process")}</a></li>
              <li><a href="#contact" className="hover:text-gold transition-colors">{t("nav.contact")}</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-ivory text-xs uppercase tracking-widest font-bold mb-6">{t("footer.legal")}</h4>
            <ul className="space-y-4 text-sm font-light">
              <li><a href="#" className="hover:text-gold transition-colors">{t("footer.privacy")}</a></li>
              <li><a href="#" className="hover:text-gold transition-colors">{t("footer.terms")}</a></li>
              <li><a href="#" className="hover:text-gold transition-colors">{t("footer.cookies")}</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-ivory/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] uppercase tracking-widest">
          <p>{t("footer.rights")}</p>
          <p>{t("footer.designed")}</p>
        </div>
      </div>
    </footer>
  );
}

