import { motion } from "motion/react";

import Navbar from "./Navbar";
import Footer from "./Footer";
import logo from "../assets/Images/logo.png";
import thankYouImage from "../assets/Images/Destination-Wedding-Photographer-3-1536x1024-1.jpg";

export default function ThankYouPage() {
  return (
    <div className="min-h-screen bg-ivory selection:bg-gold selection:text-ivory">
      <Navbar />
      <main>
        <section className="relative pt-36 pb-24 overflow-hidden">
          <div className="absolute inset-0">
            <img
              src={thankYouImage}
              alt="Elegant wedding celebration"
              className="h-full w-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-charcoal/70" />
          </div>

          <div className="relative z-10 max-w-6xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="max-w-3xl mx-auto text-center text-ivory"
            >
              <img
                src={logo}
                alt="Kech Weddings"
                className="h-16 md:h-20 w-auto object-contain mx-auto mb-8"
              />
              <span className="text-xs uppercase tracking-[0.4em] text-sand font-semibold">
                Thank You
              </span>
              <h1 className="mt-6 text-5xl md:text-7xl font-light leading-[1.05] text-balance">
                <span className="text-white">Your request has been received</span>
              </h1>
              <p className="mt-8 text-lg md:text-xl text-ivory/80 max-w-2xl mx-auto leading-relaxed">
                Thank you for reaching out to Kech Weddings. Our team will review your reservation details and get back to you soon with the next steps.
              </p>

              <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href="/"
                  className="inline-flex items-center justify-center rounded-full bg-gold px-8 py-4 text-xs font-bold uppercase tracking-widest text-ivory transition-colors duration-300 hover:bg-charcoal"
                >
                  Return to Homepage
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="py-16 bg-ivory">
          <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-6">
            <div className="rounded-3xl bg-white p-8 shadow-lg border border-lavender">
              <p className="text-[10px] uppercase tracking-[0.35em] text-gold font-bold mb-3">What happens next</p>
              <p className="text-charcoal/80 leading-relaxed">We will review your dates, guest count, and wedding vision before sending a tailored response.</p>
            </div>
            <div className="rounded-3xl bg-white p-8 shadow-lg border border-lavender">
              <p className="text-[10px] uppercase tracking-[0.35em] text-gold font-bold mb-3">Need help now?</p>
              <p className="text-charcoal/80 leading-relaxed">Use the buttons below or return to the homepage to explore more of our wedding experiences.</p>
            </div>
            <div className="rounded-3xl bg-white p-8 shadow-lg border border-lavender">
              <p className="text-[10px] uppercase tracking-[0.35em] text-gold font-bold mb-3">Private inquiry</p>
              <p className="text-charcoal/80 leading-relaxed">Your reservation details remain confidential and are only shared with our planning team.</p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
