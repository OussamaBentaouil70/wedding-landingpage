import { motion } from "motion/react";
import { useTranslation } from "react-i18next";
import { useState } from "react";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  weddingType: string;
  message: string;
}

interface SubmissionStatus {
  type: "idle" | "loading" | "success" | "error";
  message: string;
}

export default function ContactForm() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    weddingType: "desert_agafay",
    message: "",
  });

  const [status, setStatus] = useState<SubmissionStatus>({
    type: "idle",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate required fields
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.message
    ) {
      setStatus({
        type: "error",
        message: "Please fill in all required fields",
      });
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setStatus({
        type: "error",
        message: "Please enter a valid email address",
      });
      return;
    }

    setStatus({ type: "loading", message: "" });

    try {
      // Use localhost:8000 for development with PHP built-in server
      // For XAMPP, you might need to use http://localhost/wedding-landingpage/backend/contact-handler.php
      const response = await fetch("/contact-handler.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const raw = await response.text();
      let data: any = null;
      try {
        data = raw ? JSON.parse(raw) : null;
      } catch {
        data = null;
      }

      if (!response.ok) {
        setStatus({
          type: "error",
          message:
            data?.message ||
            "Server error from backend. Please check PHP setup and logs.",
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
        setStatus({
          type: "success",
          message:
            data.message || "Thank you! Your inquiry has been sent successfully.",
        });
        // Reset form
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          weddingType: "desert_agafay",
          message: "",
        });

        // Redirect to thank-you page after successful submission.
        setTimeout(() => {
          window.location.assign("/thank-you");
        }, 700);

        // Clear success message after 5 seconds
        setTimeout(() => {
          setStatus({ type: "idle", message: "" });
        }, 5000);
      } else {
        setStatus({
          type: "error",
          message:
            data.message || "An error occurred. Please try again later.",
        });
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setStatus({
        type: "error",
        message:
          "Failed to send your inquiry. Please try again or contact us directly.",
      });
    }
  };

  return (
    <section id="contact" className="py-24 bg-ivory">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-20">
          <div>
            <span className="text-xs uppercase tracking-[0.3em] text-gold font-bold mb-4 block">
              {t("contact.tagline")}
            </span>
            <h2 className="text-4xl md:text-5xl font-light mb-8 leading-tight text-charcoal">
              {t("contact.title_part1")} <br />
              <span className="italic">{t("contact.title_part2")}</span>
            </h2>
            <p className="text-olive font-light leading-relaxed mb-12 max-w-md">
              {t("contact.subtitle")}
            </p>

            <div className="space-y-8">
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 bg-lavender rounded-full flex items-center justify-center text-gold shrink-0">
                  <i className="fas fa-envelope"></i>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-olive mb-1">{t("contact.email_label")}</p>
                  <p className="text-lg font-serif">concierge@kechweddings.com</p>
                </div>
              </div>
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 bg-lavender rounded-full flex items-center justify-center text-gold shrink-0">
                  <i className="fas fa-phone"></i>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-olive mb-1">{t("contact.phone_label")}</p>
                  <p className="text-lg font-serif">+212 600 000 000</p>
                </div>
              </div>
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 bg-lavender rounded-full flex items-center justify-center text-gold shrink-0">
                  <i className="fas fa-map-marker-alt"></i>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-olive mb-1">{t("contact.visit_label")}</p>
                  <p className="text-lg font-serif">Gueliz, Marrakech, Morocco</p>
                </div>
              </div>
            </div>

            <div className="mt-16 flex gap-6">
              <a href="#" className="w-12 h-12 bg-gold text-ivory rounded-full flex items-center justify-center hover:bg-charcoal transition-all">
                <i className="fab fa-instagram text-xl"></i>
              </a>
              <a href="#" className="w-12 h-12 bg-gold text-ivory rounded-full flex items-center justify-center hover:bg-charcoal transition-all">
                <i className="fab fa-facebook-f text-xl"></i>
              </a>
              <a href="#" className="w-12 h-12 bg-gold text-ivory rounded-full flex items-center justify-center hover:bg-charcoal transition-all">
                <i className="fab fa-tiktok text-xl"></i>
              </a>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white p-10 md:p-12 rounded-[2rem] shadow-xl border border-lavender"
          >
            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* Status Messages */}
              {status.type === "error" && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
                  <i className="fas fa-exclamation-circle mr-2"></i>
                  {status.message}
                </div>
              )}
              {status.type === "success" && (
                <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl text-sm">
                  <i className="fas fa-check-circle mr-2"></i>
                  {status.message}
                </div>
              )}

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-olive">
                    {t("contact.form.first_name")}
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    className="w-full bg-lavender/30 border border-lavender/50 rounded-xl px-4 py-3 focus:border-gold outline-none transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-olive">
                    {t("contact.form.last_name")}
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    className="w-full bg-lavender/30 border border-lavender/50 rounded-xl px-4 py-3 focus:border-gold outline-none transition-all"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest font-bold text-olive">
                  {t("contact.form.email")}
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full bg-lavender/30 border border-lavender/50 rounded-xl px-4 py-3 focus:border-gold outline-none transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest font-bold text-olive">
                  Phone (Optional)
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full bg-lavender/30 border border-lavender/50 rounded-xl px-4 py-3 focus:border-gold outline-none transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest font-bold text-olive">
                  {t("contact.form.type")}
                </label>
                <select
                  name="weddingType"
                  value={formData.weddingType}
                  onChange={handleChange}
                  className="w-full bg-lavender/30 border border-lavender/50 rounded-xl px-4 py-3 focus:border-gold outline-none transition-all"
                >
                  <option value="desert_agafay">{t("wedding_types.options.desert_agafay")}</option>
                  <option value="riad">{t("wedding_types.options.riad")}</option>
                  <option value="garden">{t("wedding_types.options.garden")}</option>
                  <option value="villas">{t("wedding_types.options.villas")}</option>
                  <option value="camps">{t("wedding_types.options.camps")}</option>
                  <option value="beach">{t("wedding_types.options.beach")}</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest font-bold text-olive">
                  {t("contact.form.message")}
                </label>
                <textarea
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full bg-lavender/30 border border-lavender/50 rounded-xl px-4 py-3 focus:border-gold outline-none transition-all resize-none"
                ></textarea>
              </div>
              <button
                type="submit"
                disabled={status.type === "loading"}
                className="w-full bg-gold text-ivory py-4 rounded-xl text-xs uppercase tracking-widest font-bold hover:bg-charcoal transition-all duration-500 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {status.type === "loading" ? (
                  <>
                    <i className="fas fa-spinner fa-spin"></i>
                    Sending...
                  </>
                ) : (
                  t("contact.form.button")
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

