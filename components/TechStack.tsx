"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

interface Tech {
  name: string;
  icon: string;
  color: string;
  level: "Yuqori" | "O'rta" | "Boshlang'ich";
  category: "frontend" | "backend" | "tools";
}

const technologies: Tech[] = [
  // Frontend
  {
    name: "HTML5",
    icon: "🌐",
    color: "#E34F26",
    level: "Yuqori",
    category: "frontend",
  },
  {
    name: "CSS3",
    icon: "🎨",
    color: "#1572B6",
    level: "Yuqori",
    category: "frontend",
  },
  {
    name: "JavaScript",
    icon: "⚡",
    color: "#F7DF1E",
    level: "Yuqori",
    category: "frontend",
  },
  {
    name: "TypeScript",
    icon: "📘",
    color: "#3178C6",
    level: "Yuqori",
    category: "frontend",
  },
  {
    name: "React",
    icon: "⚛️",
    color: "#61DAFB",
    level: "Yuqori",
    category: "frontend",
  },
  {
    name: "Next.js",
    icon: "▲",
    color: "#ffffff",
    level: "O'rta",
    category: "frontend",
  },
  {
    name: "Vue.js",
    icon: "💚",
    color: "#4FC08D",
    level: "Boshlang'ich",
    category: "frontend",
  },
  {
    name: "Tailwind CSS",
    icon: "🌊",
    color: "#06B6D4",
    level: "Yuqori",
    category: "frontend",
  },

  // Backend
  {
    name: "Node.js",
    icon: "💚",
    color: "#339933",
    level: "Yuqori",
    category: "backend",
  },
  {
    name: "Express.js",
    icon: "🚂",
    color: "#ffffff",
    level: "Yuqori",
    category: "backend",
  },
  {
    name: "NestJS",
    icon: "🐱",
    color: "#E0234E",
    level: "Yuqori",
    category: "backend",
  },
  {
    name: "PostgreSQL",
    icon: "🐘",
    color: "#4169E1",
    level: "Yuqori",
    category: "backend",
  },
  {
    name: "MongoDB",
    icon: "🍃",
    color: "#47A248",
    level: "O'rta",
    category: "backend",
  },
  {
    name: "Redis",
    icon: "🔴",
    color: "#DC382D",
    level: "O'rta",
    category: "backend",
  },

  // Tools
  {
    name: "Git",
    icon: "📦",
    color: "#F05032",
    level: "Yuqori",
    category: "tools",
  },
  {
    name: "Docker",
    icon: "🐳",
    color: "#2496ED",
    level: "O'rta",
    category: "tools",
  },
  {
    name: "Linux",
    icon: "🐧",
    color: "#FCC624",
    level: "O'rta",
    category: "tools",
  },
];

const levelColors = {
  Yuqori: "from-secondary to-primary",
  "O'rta": "from-primary to-accent",
  "Boshlang'ich": "from-accent to-muted-foreground",
};

const TechCard = ({ tech, index }: { tech: Tech; index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

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
        boxShadow: `0 0 0 rgba(${tech.color}, 0)`,
      }}
    >
      {/* Glow effect on hover */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `radial-gradient(circle at center, ${tech.color}15, transparent 70%)`,
        }}
      />

      <div className="relative z-10">
        {/* Icon */}
        <motion.div
          whileHover={{ scale: 1.2, rotate: 10 }}
          className="text-5xl mb-4"
        >
          {tech.icon}
        </motion.div>

        {/* Name */}
        <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
          {tech.name}
        </h3>

        {/* Level badge */}
        <div
          className={`inline-flex px-3 py-1 rounded-full text-xs font-mono 
                        bg-gradient-to-r ${levelColors[tech.level]} text-primary-foreground`}
        >
          {tech.level}
        </div>
      </div>

      {/* Animated border */}
      <div className="absolute inset-0 rounded-2xl overflow-hidden">
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `linear-gradient(90deg, transparent, ${tech.color}30, transparent)`,
            animation: "shimmer 2s infinite",
          }}
        />
      </div>
    </motion.div>
  );
};

const TechStack = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const categories = [
    { key: "frontend", label: "Frontend", emoji: "🎨" },
    { key: "backend", label: "Backend", emoji: "⚙️" },
    { key: "tools", label: "Asboblar", emoji: "🛠️" },
  ];

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
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.5 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
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
        {categories.map((category, categoryIndex) => (
          <motion.div
            key={category.key}
            initial={{ opacity: 0, x: categoryIndex % 2 === 0 ? -50 : 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: categoryIndex * 0.2 }}
            className="mb-16"
          >
            <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
              <span className="text-3xl">{category.emoji}</span>
              <span className="text-foreground">{category.label}</span>
              <div className="flex-1 h-px bg-gradient-to-r from-border to-transparent" />
            </h3>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {technologies
                .filter((tech) => tech.category === category.key)
                .map((tech, index) => (
                  <TechCard key={tech.name} tech={tech} index={index} />
                ))}
            </div>
          </motion.div>
        ))}
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
