"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Skill } from "@/lib/types";
import { getPortfolioApiUrl } from "@/lib/portfolio-api";

const levelColors = {
  Yuqori: "from-secondary to-primary",
  "O'rta": "from-primary to-accent",
  "Boshlang'ich": "from-accent to-muted-foreground",
};

const TechCard = ({ tech, index }: { tech: Skill; index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  // Default values agar backend'da bo'lmasa
  const icon = tech.icon || "💻";
  const color = tech.color || "#61DAFB";
  const level = tech.level || "O'rta";

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50, rotateX: -15 }}
      animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{
        scale: 1.05,
        rotateY: 5,
        transition: { duration: 0.2 },
      }}
      className="group relative p-6 rounded-2xl bg-card border border-border 
                 hover:border-primary/50 transition-all duration-300 cursor-pointer"
      style={{
        boxShadow: `0 0 0 rgba(${color}, 0)`,
      }}
    >
      {/* Glow effect on hover */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `radial-gradient(circle at center, ${color}15, transparent 70%)`,
        }}
      />

      <div className="relative z-10">
        {/* Icon */}
        <motion.div
          whileHover={{ scale: 1.2, rotate: 10 }}
          className="text-5xl mb-4"
        >
          {icon}
        </motion.div>

        {/* Name */}
        <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
          {tech.name}
        </h3>

        {/* Level badge */}
        <div
          className={`inline-flex px-3 py-1 rounded-full text-xs font-mono 
                        bg-gradient-to-r ${levelColors[level]} text-primary-foreground`}
        >
          {level}
        </div>
      </div>

      {/* Animated border */}
      <div className="absolute inset-0 rounded-2xl overflow-hidden">
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `linear-gradient(90deg, transparent, ${color}30, transparent)`,
            animation: "shimmer 2s infinite",
          }}
        />
      </div>
    </motion.div>
  );
};

const TechStack = () => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      const response = await fetch(getPortfolioApiUrl());
      const data = await response.json();

      if (data.success && data.data?.skills) {
        setSkills(data.data.skills);
      } else {
        console.warn("⚠️ No skills found in response");
      }
    } catch (error) {
      console.error("❌ Skills yuklashda xatolik:", error);
    } finally {
      setLoading(false);
    }
  };

  // Group skills by category
  const skillsByCategory = skills.reduce(
    (acc: Record<string, Skill[]>, skill) => {
      const category = skill.category || "Other";
      if (!acc[category]) acc[category] = [];
      acc[category].push(skill);
      return acc;
    },
    {},
  );

  const getCategoryEmoji = (category: string) => {
    const emojis: Record<string, string> = {
      Frontend: "🎨",
      Backend: "⚙️",
      Tools: "🛠️",
      Database: "🗄️",
      Other: "✨",
    };
    return emojis[category] || "💼";
  };

  if (loading) {
    return (
      <section id="skills" className="py-32 relative section-glow">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center py-20">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="py-32 relative section-glow"
    >
      <div className="container mx-auto px-4">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-block px-4 py-2 rounded-full border border-secondary/30 bg-secondary/10 
                       text-secondary font-mono text-sm mb-6"
          >
            &lt;skills /&gt;
          </motion.span>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="text-foreground">Texnologiyalar</span>{" "}
            <span className="text-gradient">Stack</span>
          </h2>

          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Zamonaviy veb-dasturlashning eng so&apos;nggi texnologiyalari bilan
            ishlayman
          </p>
        </motion.div>

        {/* Categories */}
        {Object.entries(skillsByCategory).map(
          ([category, categorySkills], categoryIndex) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, x: categoryIndex % 2 === 0 ? -50 : 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: categoryIndex * 0.2 }}
              className="mb-16"
            >
              <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
                <span className="text-3xl">{getCategoryEmoji(category)}</span>
                <span className="text-foreground">{category}</span>
                <div className="flex-1 h-px bg-gradient-to-r from-border to-transparent" />
              </h3>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {categorySkills.map((tech, index) => (
                  <TechCard key={tech.id} tech={tech} index={index} />
                ))}
              </div>
            </motion.div>
          ),
        )}

        {/* Empty state */}
        {skills.length === 0 && !loading && (
          <div className="text-center py-20">
            <p className="text-muted-foreground text-lg">
              Hali ko&apos;nikmalar qo&apos;shilmagan
            </p>
          </div>
        )}
      </div>

      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </section>
  );
};

export default TechStack;
