import { useState } from "react";
import { WEDDING_TYPE_OPTIONS } from "../constants/weddingTypes";

interface ReservationFormProps {
  defaultWeddingType?: string;
  compact?: boolean;
}

export default function ReservationForm({
  defaultWeddingType = "wedding_in_marrakech",
  compact = false,
}: ReservationFormProps) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    weddingDate: "",
    guests: "",
    weddingType: defaultWeddingType,
    message: "",
  });
  const [status, setStatus] = useState<{
    type: "idle" | "loading" | "success" | "error";
    message: string;
  }>({ type: "idle", message: "" });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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
        const fallbackMessage =
          response.status >= 500
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
          weddingType: defaultWeddingType,
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

  return (
    <>
      <h3 className="text-2xl font-serif mb-6 text-charcoal">Begin Your Journey</h3>
      <form className={compact ? "space-y-3" : "space-y-4"} onSubmit={handleSubmit}>
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
          <label className="text-[10px] uppercase tracking-widest font-semibold text-olive">Full Name</label>
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
          <label className="text-[10px] uppercase tracking-widest font-semibold text-olive">Email Address</label>
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
            <label className="text-[10px] uppercase tracking-widest font-semibold text-olive">Wedding Date</label>
            <input
              type="date"
              name="weddingDate"
              value={formData.weddingDate}
              onChange={handleChange}
              className="w-full bg-transparent border-b border-sand py-2 focus:border-gold outline-none transition-all text-sm"
            />
          </div>
          <div className="space-y-1">
            <label className="text-[10px] uppercase tracking-widest font-semibold text-olive">Number of Guests</label>
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
          <label className="text-[10px] uppercase tracking-widest font-semibold text-olive">Wedding Type</label>
          <select
            name="weddingType"
            value={formData.weddingType}
            onChange={handleChange}
            className="w-full bg-transparent border-b border-sand py-2 focus:border-gold outline-none transition-all text-sm"
          >
            {WEDDING_TYPE_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <div className="space-y-1">
          <label className="text-[10px] uppercase tracking-widest font-semibold text-olive">Message</label>
          <textarea
            name="message"
            rows={3}
            value={formData.message}
            onChange={handleChange}
            placeholder="Tell us about your vision"
            required
            className="w-full bg-transparent border-b border-sand py-2 focus:border-gold outline-none transition-all text-sm resize-none"
          />
        </div>
        <button
          type="submit"
          disabled={status.type === "loading"}
          className="w-full bg-gold text-ivory py-4 rounded-full text-xs uppercase tracking-widest font-bold mt-6 hover:bg-charcoal transition-all duration-500 shadow-lg hover:shadow-gold/20 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {status.type === "loading" ? "Sending..." : "Request a Consultation"}
        </button>
        <p className="text-[10px] text-center text-olive/60 mt-4 uppercase tracking-tighter">
          Private & Confidential - Response within 24 hours
        </p>
      </form>
    </>
  );
}
