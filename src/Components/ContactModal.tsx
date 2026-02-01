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
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1rem',
            zIndex: 60,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="w-full max-w-md bg-gray-900 text-white rounded-2xl p-8 relative mx-auto my-8"
            style={{
              maxHeight: 'calc(100vh - 4rem)',
              overflowY: 'auto',
              WebkitOverflowScrolling: 'touch',
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
            <h2 className="text-2xl font-bold mb-2">
              Let’s talk about your project
            </h2>
            <p className="text-gray-400 mb-6">
              Tell us what you’re looking for — we’ll get back quickly.
            </p>

            {/* Success */}
            {isSuccess ? (
              <div className="text-center py-10">
                <p className="text-lg font-semibold">🎉 Message sent!</p>
                <p className="text-gray-400 mt-2">We’ll contact you shortly.</p>
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
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded focus:ring-2 focus:ring-blue-500 outline-none"
                />

                <input
                  type="email"
                  name="email"
                  placeholder="Email address"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded focus:ring-2 focus:ring-blue-500 outline-none"
                />

                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone number"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded focus:ring-2 focus:ring-blue-500 outline-none"
                />

                <select
                  name="service"
                  required
                  value={formData.service}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded focus:ring-2 focus:ring-blue-500 outline-none"
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
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded focus:ring-2 focus:ring-blue-500 outline-none"
                />

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 py-2 rounded font-medium transition"
                >
                  {isSubmitting ? "Sending..." : "Send request"}
                </button>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ContactModal;
