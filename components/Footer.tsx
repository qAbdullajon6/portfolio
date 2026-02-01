"use client";

import { motion } from "framer-motion";
import { Code2, Heart, Github, Linkedin, Send } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 border-t border-border bg-darker-surface">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo & Copyright */}
          <div className="flex flex-col items-center md:items-start gap-2">
            <div className="flex items-center gap-2">
              <div
                className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/30 
                            flex items-center justify-center"
              >
                <Code2 className="w-4 h-4 text-primary" />
              </div>
              <span className="font-bold text-foreground">
                Dev<span className="text-primary">.uz</span>
              </span>
            </div>
            <p className="text-sm text-muted-foreground flex items-center gap-1">
              © {currentYear} • Barcha huquqlar himoyalangan
            </p>
          </div>

          {/* Made with love */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-2 text-sm text-muted-foreground"
          >
            <span>Kod bilan</span>
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <Heart className="w-4 h-4 text-red-500 fill-red-500" />
            </motion.div>
            <span>yaratildi</span>
          </motion.div>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            {[
              { icon: Github, href: "#" },
              { icon: Linkedin, href: "#" },
              { icon: Send, href: "#" },
            ].map(({ icon: Icon, href }, index) => (
              <motion.a
                key={index}
                href={href}
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.9 }}
                className="w-10 h-10 rounded-lg border border-border bg-card 
                         flex items-center justify-center text-muted-foreground 
                         hover:text-primary hover:border-primary/30 transition-all"
              >
                <Icon className="w-4 h-4" />
              </motion.a>
            ))}
          </div>
        </div>

        {/* Terminal style credit */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 pt-6 border-t border-border/50 text-center"
        >
          <code className="text-xs text-muted-foreground font-mono">
            <span className="text-terminal-green">$</span> echo
            &quot;O&apos;zbekistonlik dasturchi&quot;
            <span className="text-primary"> // 🇺🇿</span>
          </code>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
