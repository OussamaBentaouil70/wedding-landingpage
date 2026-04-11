/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import TrustBar from "./components/TrustBar";
import About from "./components/About";
import SignaturePromises from "./components/SignaturePromises";
import WeddingTypes from "./components/WeddingTypes";
import Gallery from "./components/Gallery";
import Process from "./components/Process";
import Testimonials from "./components/Testimonials";
import CTA from "./components/CTA";
import ContactForm from "./components/ContactForm";
import Footer from "./components/Footer";
import WhatsAppButton from "./components/WhatsAppButton";

export default function App() {
  return (
    <div className="min-h-screen bg-ivory selection:bg-gold selection:text-ivory">
      <Navbar />
      <main>
        <Hero />
        <TrustBar />
        <About />
        <SignaturePromises />
        <WeddingTypes />
        <Gallery />
        <Process />
        <Testimonials />
        <CTA />
        <ContactForm />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}

