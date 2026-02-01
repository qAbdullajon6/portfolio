"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import {
  Send,
  Mail,
  MapPin,
  Phone,
  Github,
  Linkedin,
  MessageCircle,
} from "lucide-react";
import { toast } from "sonner";

const ContactSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "developer@example.com",
      href: "mailto:developer@example.com",
    },
    {
      icon: Phone,
      label: "Telefon",
      value: "+998 90 123 45 67",
      href: "tel:+998901234567",
    },
    {
      icon: MapPin,
      label: "Joylashuv",
      value: "Toshkent, O'zbekiston",
      href: "#",
    },
  ];

  const socialLinks = [
    {
      icon: Github,
      label: "GitHub",
      href: "#",
      color: "hover:text-foreground",
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      href: "#",
      color: "hover:text-blue-500",
    },
    { icon: Send, label: "Telegram", href: "#", color: "hover:text-sky-400" },
    {
      icon: MessageCircle,
      label: "WhatsApp",
      href: "#",
      color: "hover:text-green-500",
    },
  ];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(data.message || "Xabaringiz muvaffaqiyatli yuborildi!");
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
        });
      } else {
        toast.error(data.message || "Xatolik yuz berdi. Qayta urinib ko'ring.");
      }
    } catch (error) {
      console.error("Contact form error:", error);
      toast.error("Xatolik yuz berdi. Internetga ulanishni tekshiring.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="py-32 relative section-glow"
    >
      <div className="container mx-auto px-4">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.5 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-block px-4 py-2 rounded-full border border-primary/30 bg-primary/10 
                       text-primary font-mono text-sm mb-6"
          >
            &lt;contact /&gt;
          </motion.span>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="text-foreground">Bog&apos;laning</span>{" "}
            <span className="text-gradient">Menga</span>
          </h2>

          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Loyiha taklifi bormi? Yoki shunchaki salomlashmoqchimisiz? Menga
            xabar yuboring!
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            <div className="p-8 rounded-2xl bg-card border border-border">
              <h3 className="text-2xl font-bold text-foreground mb-6">
                Aloqa ma&apos;lumotlari
              </h3>

              <div className="space-y-6">
                {contactInfo.map(({ icon: Icon, label, value, href }) => (
                  <motion.a
                    key={label}
                    href={href}
                    whileHover={{ x: 10 }}
                    className="flex items-center gap-4 group"
                  >
                    <div
                      className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/30 
                                  flex items-center justify-center group-hover:bg-primary/20 
                                  transition-colors"
                    >
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">{label}</p>
                      <p className="text-foreground font-medium group-hover:text-primary transition-colors">
                        {value}
                      </p>
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Social links */}
            <div className="p-8 rounded-2xl bg-card border border-border">
              <h3 className="text-xl font-bold text-foreground mb-6">
                Ijtimoiy tarmoqlar
              </h3>

              <div className="flex gap-4">
                {socialLinks.map(({ icon: Icon, label, href, color }) => (
                  <motion.a
                    key={label}
                    href={href}
                    whileHover={{ scale: 1.1, y: -5 }}
                    whileTap={{ scale: 0.9 }}
                    className={`w-12 h-12 rounded-xl bg-muted border border-border flex items-center 
                               justify-center text-muted-foreground ${color} transition-all duration-300
                               hover:border-primary/30`}
                    aria-label={label}
                  >
                    <Icon className="w-5 h-5" />
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Terminal style availability */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.6 }}
              className="p-6 rounded-2xl bg-darker-surface border border-secondary/30 font-mono"
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="w-3 h-3 rounded-full bg-red-500" />
                <span className="w-3 h-3 rounded-full bg-yellow-500" />
                <span className="w-3 h-3 rounded-full bg-green-500" />
                <span className="text-muted-foreground text-sm ml-2">
                  status.sh
                </span>
              </div>
              <div className="text-sm">
                <p className="text-muted-foreground">$ ./check-availability</p>
                <p className="text-secondary mt-1">
                  <span className="text-green-500">✓</span> Freelance loyihalar
                  uchun ochiq
                </p>
                <p className="text-secondary">
                  <span className="text-green-500">✓</span> Full-time ishga
                  tayyor
                </p>
                <p className="text-muted-foreground mt-2">
                  response_time: <span className="text-primary">~2 soat</span>
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <form
              onSubmit={handleSubmit}
              className="p-8 rounded-2xl bg-card border border-border space-y-6"
            >
              <h3 className="text-2xl font-bold text-foreground mb-2">
                Xabar yuborish
              </h3>
              <p className="text-muted-foreground text-sm mb-6">
                Formani to&apos;ldiring, tez orada javob beraman
              </p>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Ismingiz
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="To'liq ismingiz"
                    className="w-full px-4 py-3 rounded-xl bg-muted border border-border 
                             text-foreground placeholder:text-muted-foreground
                             focus:outline-none focus:border-primary/50 focus:ring-2 
                             focus:ring-primary/20 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="email@example.com"
                    className="w-full px-4 py-3 rounded-xl bg-muted border border-border 
                             text-foreground placeholder:text-muted-foreground
                             focus:outline-none focus:border-primary/50 focus:ring-2 
                             focus:ring-primary/20 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Mavzu
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    placeholder="Xabar mavzusi"
                    className="w-full px-4 py-3 rounded-xl bg-muted border border-border 
                             text-foreground placeholder:text-muted-foreground
                             focus:outline-none focus:border-primary/50 focus:ring-2 
                             focus:ring-primary/20 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Xabar
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    placeholder="Xabaringizni yozing..."
                    className="w-full px-4 py-3 rounded-xl bg-muted border border-border 
                             text-foreground placeholder:text-muted-foreground
                             focus:outline-none focus:border-primary/50 focus:ring-2 
                             focus:ring-primary/20 transition-all resize-none"
                  />
                </div>
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                className="w-full py-4 rounded-xl bg-primary text-primary-foreground font-semibold 
                         flex items-center justify-center gap-2 hover:shadow-lg 
                         hover:shadow-primary/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                    Yuborilmoqda...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Xabar Yuborish
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
