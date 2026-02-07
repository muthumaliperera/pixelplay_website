import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const FORMSPREE_ENDPOINT = "https://formspree.io/f/xdadobwg";

const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setIsSuccess(true);
        setTimeout(() => {
          setIsSuccess(false);
          onClose();
        }, 1500);
      }
    } catch (error) {
      console.error("Form submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 backdrop-blur-xl px-4"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "1rem",
            zIndex: 60,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="w-full max-w-2xl bg-black/80 text-white rounded-2xl  relative mx-auto my-8"
            style={{
              maxHeight: "calc(100vh - 4rem)",
              overflowY: "auto",
              WebkitOverflowScrolling: "touch",

              backgroundImage: "url('/assets/modal_bg.png')",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 40, opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
              aria-label="Close"
            >
              ✕
            </button>

            {/* Header */}
            <div className="flex justify-center items-center gap-5 border-b-2 pb-8 border-white/30">
              <p className="text-4xl font-thin">
                Hi there! <br></br>What are you looking to create today?
              </p>
              <p className="text-gray-400 mt-8 text-right">
                Tell us a bit about what you're looking for. We'll take it from
                there.
              </p>
            </div>
            <div className="p-8">
              <div
                className="bg-[#191919] p-6 rounded-2xl overflow-clip"
                style={{
                  borderTop: "2px solid ",
                  borderImage:
                    "linear-gradient(90deg,rgba(179, 226, 52, 0) 24%, rgba(179, 226, 52, 1) 49%, rgba(179, 226, 52, 0) 77%) 1",
                }}
              >
                {/* Success */}
                {isSuccess ? (
                  <div className="text-center py-10">
                    <p className="text-lg font-semibold">🎉 Message sent!</p>
                    <p className="text-gray-400 mt-2">
                      We’ll contact you shortly.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                      type="text"
                      name="name"
                      placeholder="Your name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-transparent border-2 border-white/30 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                    />

                    <input
                      type="email"
                      name="email"
                      placeholder="Email address"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-transparent border-2 border-white/30 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                    />

                    <input
                      type="tel"
                      name="phone"
                      placeholder="Phone number"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-transparent border-2 border-white/30 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                    />

                    <select
                      name="service"
                      required
                      value={formData.service}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-[#191919] border-2 border-white/30 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                    >
                      <option value="">What do you need?</option>
                      <option value="uiux">UI / UX Design</option>
                      <option value="web">Web Development</option>
                      <option value="mobile">Mobile App</option>
                      <option value="branding">Branding</option>
                      <option value="other">Other</option>
                    </select>

                    <textarea
                      name="message"
                      placeholder="Tell us more about your idea"
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-transparent border-2 border-white/30 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                    />

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full text-black bg-[#B3E234] hover:opacity-80 disabled:opacity-50 py-4 rounded-xl font-medium transition"
                    >
                      {isSubmitting ? "Sending..." : "Send request"}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ContactModal;
