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
import ThankYouPage from "./components/ThankYouPage";
import WeddingSubpage from "./components/WeddingSubpage";

import agafayImage1 from "./assets/Images/agafay-desert/3.jpg";
import agafayImage2 from "./assets/Images/agafay-desert/4.jpg";
import agafayImage3 from "./assets/Images/agafay-desert/EclecticElegance_AgafayDesert_MoroccoWedding-85.webp";
import agafayImage4 from "./assets/Images/agafay-desert/Destination-Wedding-Photographer-3-1536x1024-1.jpg";
import agafayImage5 from "./assets/Images/agafay-desert/marrakech-elopement-607-1000x1500.jpg";

import elopementImage1 from "./assets/Images/Elopement/30.jpg";
import elopementImage2 from "./assets/Images/Elopement/32.jpg";
import elopementImage3 from "./assets/Images/Elopement/Wedding-at-Be-Agafay-wedding-at-the-desert-in-Marrakech-48.jpg";
import elopementImage4 from "./assets/Images/Elopement/6.jpg";
import elopementImage5 from "./assets/Images/Elopement/morocco_desert_wedding-leah_black--3.jpg";

import keralaImage1 from "./assets/Images/Kerala/23.jpg";
import keralaImage2 from "./assets/Images/Kerala/30.jpg";
import keralaImage3 from "./assets/Images/Kerala/Grand-Canal-The-Oberoi-Marrakech-Morocco-Indian-Wedding-Ptaufiq-Photography-Ceremony-12.jpg";
import keralaImage4 from "./assets/Images/Kerala/3z7a4344-1-768x512.jpg.webp";

import jewishImage1 from "./assets/Images/Jewish/11.jpg";
import jewishImage2 from "./assets/Images/Jewish/21.jpg";
import jewishImage3 from "./assets/Images/Jewish/Marrakech-jewish-wedding-cover.jpg";
import jewishImage4 from "./assets/Images/Jewish/3.jpg";
import jewishImage5 from "./assets/Images/Jewish/44.jpg";

export default function App() {
  const currentPath = window.location.pathname;

  if (currentPath === "/thank-you") {
    return <ThankYouPage />;
  }

  if (currentPath === "/gafay-desert") {
    return (
      <WeddingSubpage
        pageTitle="Agafay Desert Weddings"
        overline="Weddings in Morocco"
        introTitle="Agafay Desert Weddings"
        introSubtitle="Bespoke Weddings in Morocco"
        introDescription="From intimate sunset ceremonies to immersive multi-day desert experiences, we design weddings in Agafay that combine natural beauty, exclusivity, and unforgettable moments."
        deepDiveTitle="A Desert Celebration Crafted Around Emotion"
        deepDiveParagraphs={[
          "Agafay offers a cinematic setting where light, silence, and landscape become part of your ceremony. We design each moment to feel intentional, from your first arrival to the final evening under the stars.",
          "Our team handles every production detail in remote settings, including logistics, hospitality flow, and atmosphere styling, so your guests experience effortless luxury from beginning to end.",
        ]}
        highlightsTitle="What Makes Agafay Weddings Exceptional"
        highlights={[
          "Golden-hour desert ceremony direction",
          "Luxury camp and private dinner scenography",
          "Guest transport and comfort orchestration",
          "Live entertainment and ambient lighting design",
          "Welcome and farewell experiences over multiple days",
          "Full on-site coordination by senior planners",
        ]}
        readyTitle="Plan Your Wedding"
        readyDescription="Let's craft your unforgettable desert wedding experience in Agafay."
        defaultWeddingType="agafay_desert_wedding"
        images={[agafayImage1, agafayImage2, agafayImage3]}
        sections={[
          {
            label: "What We Offer",
            title: "Our Wedding Services",
            description:
              "Tailored excellence including desert camp setup, logistics, guest experience, and full event production in remote luxury settings.",
            image: agafayImage1,
          },
          {
            label: "Where We Celebrate",
            title: "Celebrate in Morocco's Most Extraordinary Settings",
            description:
              "From luxury desert camps to private setups under the stars, just outside Marrakech.",
            image: agafayImage2,
          },
          {
            label: "Inspiration",
            title: "Wedding Themes & Inspiration",
            description:
              "Bohemian elegance, candlelit dinners, and golden sunset ceremonies in a unique desert atmosphere.",
            image: agafayImage3,
          },
        ]}
        galleryTitle="Agafay Desert Gallery"
        gallerySubtitle="A glimpse into sunset vows, candlelit tablescapes, and immersive desert wedding weekends."
        galleryItems={[
          { url: agafayImage1, title: "Sunset Ceremony", category: "Ceremony" },
          { url: agafayImage3, title: "Desert Editorial", category: "Style" },
          { url: agafayImage2, title: "Guest Experience", category: "Hospitality" },
          { url: agafayImage4, title: "Golden Portraits", category: "Photography" },
          { url: agafayImage5, title: "Afterglow Moments", category: "Inspiration" },
        ]}
      />
    );
  }

  if (currentPath === "/elopement") {
    return (
      <WeddingSubpage
        pageTitle="Elopement Weddings in Morocco"
        overline="Elopement Wedding in Morocco"
        introTitle="Elopement Weddings in Morocco"
        introSubtitle="Bespoke Weddings in Morocco"
        introDescription="From intimate vows to romantic escapes, we design elopements that focus on emotion, privacy, and meaningful experiences in breathtaking Moroccan settings."
        deepDiveTitle="Intimate, Personal, and Entirely Yours"
        deepDiveParagraphs={[
          "Elopements are about authenticity, quiet luxury, and emotional storytelling. We curate every detail around your personality, allowing your celebration to feel spontaneous yet perfectly orchestrated.",
          "Whether you choose a secluded riad, a rooftop at dusk, or a dramatic desert frame, we build a seamless journey around intimacy, aesthetics, and timeless photographic moments.",
        ]}
        highlightsTitle="Elopement Signature Elements"
        highlights={[
          "Private location scouting across Morocco",
          "Styling direction for editorial photography",
          "Bespoke vow and ceremony atmosphere",
          "Sunrise and sunset timeline planning",
          "Luxury couple-only hospitality touchpoints",
          "Discreet full-day coordination",
        ]}
        readyTitle="Plan Your Wedding"
        readyDescription="Let's create your intimate and unforgettable elopement in Morocco."
        defaultWeddingType="elopement_wedding_morocco"
        images={[elopementImage1, elopementImage2, elopementImage3]}
        sections={[
          {
            label: "What We Offer",
            title: "Our Wedding Services",
            description:
              "Tailored excellence including location scouting, styling, photography, and full coordination for intimate celebrations.",
            image: elopementImage1,
          },
          {
            label: "Where We Celebrate",
            title: "Celebrate in Morocco's Most Extraordinary Settings",
            description:
              "From secluded riads to desert landscapes and hidden gems across Morocco.",
            image: elopementImage2,
          },
          {
            label: "Inspiration",
            title: "Wedding Themes & Inspiration",
            description:
              "Romantic minimalism, cinematic moments, and deeply personal experiences.",
            image: elopementImage3,
          },
        ]}
        galleryTitle="Elopement Gallery"
        gallerySubtitle="Intimate vows, cinematic portraits, and meaningful moments in Morocco's most romantic settings."
        galleryItems={[
          { url: elopementImage1, title: "Private Vows", category: "Ceremony" },
          { url: elopementImage2, title: "Romantic Escape", category: "Destination" },
          { url: elopementImage3, title: "Desert Elopement", category: "Agafay" },
          { url: elopementImage4, title: "Editorial Couple Session", category: "Photography" },
          { url: elopementImage5, title: "Minimal Luxury", category: "Inspiration" },
        ]}
      />
    );
  }

  if (currentPath === "/kerala") {
    return (
      <WeddingSubpage
        pageTitle="Kerala Weddings in Marrakech"
        overline="Kerala Wedding in Marrakech"
        introTitle="Kerala Weddings in Marrakech"
        introSubtitle="Bespoke Weddings in Morocco"
        introDescription="From vibrant traditional rituals to multi-day celebrations, we design Kerala weddings that respect cultural authenticity while elevating the experience in a luxury Moroccan setting."
        deepDiveTitle="Tradition Elevated in Marrakech"
        deepDiveParagraphs={[
          "Kerala weddings are rich in symbolism, rhythm, and community. We preserve every meaningful tradition while shaping a refined guest journey tailored to destination celebration standards.",
          "From ceremony sequencing and decor direction to culinary curation and multi-day scheduling, our planning approach keeps heritage at the center while delivering elegant execution at scale.",
        ]}
        highlightsTitle="Kerala Wedding Planning Focus"
        highlights={[
          "Traditional ritual timeline and ceremony management",
          "Floral-rich decor with cultural alignment",
          "Indian cuisine and menu coordination",
          "Family and guest hospitality planning",
          "Multi-day event flow and logistics",
          "Venue transformation for ceremonial authenticity",
        ]}
        readyTitle="Plan Your Wedding"
        readyDescription="Let's bring your Kerala wedding vision to life in Marrakech."
        defaultWeddingType="kerala_wedding_marrakech"
        images={[keralaImage1, keralaImage2, keralaImage3]}
        sections={[
          {
            label: "What We Offer",
            title: "Our Wedding Services",
            description:
              "Tailored excellence including traditional ceremony coordination, decor, catering (Indian cuisine), and guest experience.",
            image: keralaImage1,
          },
          {
            label: "Where We Celebrate",
            title: "Celebrate in Morocco's Most Extraordinary Settings",
            description:
              "From grand villas to elegant venues adapted for multi-day Indian celebrations.",
            image: keralaImage2,
          },
          {
            label: "Inspiration",
            title: "Wedding Themes & Inspiration",
            description:
              "Colorful ceremonies, floral richness, cultural traditions, and refined luxury.",
            image: keralaImage3,
          },
        ]}
        galleryTitle="Kerala Wedding Gallery"
        gallerySubtitle="A visual journey through vibrant rituals, multi-day celebrations, and refined destination elegance."
        galleryItems={[
          { url: keralaImage1, title: "Ceremonial Entrance", category: "Ritual" },
          { url: keralaImage3, title: "Traditional Ceremony", category: "Culture" },
          { url: keralaImage2, title: "Family Celebration", category: "Hospitality" },
          { url: keralaImage4, title: "Color and Texture", category: "Decor" },
        ]}
      />
    );
  }

  if (currentPath === "/jewish") {
    return (
      <WeddingSubpage
        pageTitle="Jewish Weddings in Marrakech"
        overline="Jewish Wedding in Marrakech"
        introTitle="Jewish Weddings in Marrakech"
        introSubtitle="Bespoke Weddings in Morocco"
        introDescription="From traditional ceremonies under the chuppah to elegant multi-day celebrations, we design Jewish weddings that honor heritage, rituals, and refined aesthetics, while ensuring seamless coordination in Marrakech."
        deepDiveTitle="Heritage, Meaning, and Refined Execution"
        deepDiveParagraphs={[
          "Jewish weddings are deeply symbolic and beautifully layered. We coordinate each ritual with precision and sensitivity, ensuring every moment remains authentic to your traditions and values.",
          "From kosher requirements and ceremonial staging to guest flow and atmosphere direction, we create a celebration that feels culturally grounded, elegant, and effortless for you and your families.",
        ]}
        highlightsTitle="Jewish Wedding Experience Highlights"
        highlights={[
          "Chuppah ceremony setup and ritual alignment",
          "Kosher catering coordination support",
          "Tradition-sensitive scheduling across events",
          "Venue sourcing with Jewish heritage context",
          "Elegant decor blending timeless and modern styles",
          "Comprehensive guest and family coordination",
        ]}
        readyTitle="Plan Your Wedding"
        readyDescription="Let's create a Jewish wedding in Marrakech that reflects your traditions and vision."
        defaultWeddingType="jewish_wedding_marrakech"
        images={[jewishImage1, jewishImage2, jewishImage3]}
        sections={[
          {
            label: "What We Offer",
            title: "Our Wedding Services",
            description:
              "Tailored excellence for every step of your journey, including kosher catering coordination, ceremonial setup, and culturally aligned planning.",
            image: jewishImage1,
          },
          {
            label: "Where We Celebrate",
            title: "Celebrate in Morocco's Most Extraordinary Settings",
            description:
              "From historic riads rich in Jewish heritage to luxury villas and exclusive venues in Marrakech.",
            image: jewishImage2,
          },
          {
            label: "Inspiration",
            title: "Wedding Themes & Inspiration",
            description:
              "Timeless elegance, traditional rituals, and modern luxury blended into meaningful celebrations.",
            image: jewishImage3,
          },
        ]}
        galleryTitle="Jewish Wedding Gallery"
        gallerySubtitle="Discover moments shaped by tradition, elegance, and meaningful family celebration in Marrakech."
        galleryItems={[
          { url: jewishImage3, title: "Chuppah Moment", category: "Ceremony" },
          { url: jewishImage1, title: "Family Celebration", category: "Tradition" },
          { url: jewishImage2, title: "Evening Reception", category: "Reception" },
          { url: jewishImage4, title: "Historic Atmosphere", category: "Venue" },
          { url: jewishImage5, title: "Elegant Details", category: "Inspiration" },
        ]}
      />
    );
  }

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

