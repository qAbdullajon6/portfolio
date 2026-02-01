"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  ExternalLink,
  Github,
  Bot,
  Globe,
  Server,
  Code,
  Layers,
  Eye,
} from "lucide-react";
import ProjectDetailModal, { ProjectDetail } from "./ProjectDetailModal";

type ProjectCategory =
  | "all"
  | "frontend"
  | "backend"
  | "fullstack"
  | "telegram"
  | "partial";

const projects: ProjectDetail[] = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description:
      "To'liq funksional onlayn do'kon. Foydalanuvchi autentifikatsiyasi, savat, to'lov tizimi va admin panel.",
    fullDescription:
      "Bu loyiha to'liq funksional e-commerce platformasi bo'lib, zamonaviy texnologiyalar yordamida qurilgan. Platforma foydalanuvchilar uchun qulay interfeys, admin panel, mahsulotlarni boshqarish, buyurtmalarni kuzatish va to'lov tizimini o'z ichiga oladi. Stripe orqali xavfsiz to'lovlar amalga oshiriladi.",
    images: [
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=60",
    ],
    technologies: [
      "React",
      "Node.js",
      "PostgreSQL",
      "Stripe",
      "Redis",
      "Docker",
    ],
    category: ["fullstack"],
    role: "Full Stack Developer",
    duration: "3 oy",
    isComplete: true,
    links: {
      live: "https://example.com",
      github: "https://github.com/example",
      swagger: "https://api.example.com/docs",
    },
    features: [
      "Foydalanuvchi ro'yxatdan o'tish va kirish",
      "Mahsulotlar katalogi va qidiruv",
      "Savat va buyurtma tizimi",
      "Stripe orqali to'lov",
      "Admin panel",
      "Buyurtmalarni kuzatish",
    ],
  },
  {
    id: 2,
    title: "Task Management App",
    description:
      "Loyiha va vazifalarni boshqarish tizimi. Drag & drop, real-time yangilanishlar.",
    fullDescription:
      "Vazifalarni boshqarish uchun zamonaviy web ilovasi. Kanban board uslubida vazifalarni drag & drop orqali boshqarish, real-time yangilanishlar, komanda a'zolari bilan hamkorlik qilish imkoniyatlari mavjud.",
    images: [
      "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&auto=format&fit=crop&q=60",
    ],
    technologies: ["React", "TypeScript", "Tailwind CSS", "Framer Motion"],
    category: ["frontend"],
    role: "Frontend Developer",
    duration: "1.5 oy",
    isComplete: true,
    links: {
      live: "https://example.com",
      github: "https://github.com/example",
    },
    features: [
      "Drag & drop vazifa boshqaruvi",
      "Kanban board ko'rinishi",
      "Vazifalarni filtrlash",
      "Real-time yangilanishlar",
      "Responsive dizayn",
    ],
  },
  {
    id: 3,
    title: "REST API Server",
    description:
      "Kengaytiriladigan va xavfsiz REST API. JWT autentifikatsiya, rate limiting, caching.",
    fullDescription:
      "Enterprise darajasidagi RESTful API server. Mikroservis arxitekturasi, JWT autentifikatsiya, rate limiting, caching, va to'liq API hujjatlari (Swagger) bilan ta'minlangan. Clean Architecture prinsiplariga amal qilingan.",
    images: [
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=800&auto=format&fit=crop&q=60",
    ],
    technologies: ["NestJS", "PostgreSQL", "Redis", "Docker", "Swagger", "JWT"],
    category: ["backend"],
    role: "Backend Developer",
    duration: "2 oy",
    isComplete: true,
    links: {
      github: "https://github.com/example",
      swagger: "https://api.example.com/docs",
      docs: "https://docs.example.com",
    },
    features: [
      "JWT autentifikatsiya",
      "Role-based access control",
      "Rate limiting",
      "Redis caching",
      "Swagger dokumentatsiya",
      "Unit va Integration testlar",
    ],
  },
  {
    id: 4,
    title: "Telegram Shop Bot",
    description:
      "Avtomatlashtirilgan do'kon boti. Katalog, savat, to'lov va buyurtma kuzatish.",
    fullDescription:
      "Telegram platformasi uchun to'liq funksional do'kon boti. Foydalanuvchilar mahsulotlarni ko'rish, savatga qo'shish, buyurtma berish va to'lov qilish imkoniyatiga ega. Admin panel orqali mahsulotlar va buyurtmalarni boshqarish mumkin.",
    images: [
      "https://images.unsplash.com/photo-1611606063065-ee7946f0787a?w=800&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1633675254053-d96c7668c3b8?w=800&auto=format&fit=crop&q=60",
    ],
    technologies: ["Node.js", "Telegraf.js", "MongoDB", "Redis"],
    category: ["telegram", "backend"],
    role: "Backend Developer",
    duration: "1.5 oy",
    isComplete: true,
    links: {
      telegram: "https://t.me/example_bot",
      github: "https://github.com/example",
    },
    features: [
      "Mahsulotlar katalogi",
      "Inline tugmalar bilan navigatsiya",
      "Savat tizimi",
      "To'lov integratsiyasi",
      "Buyurtma holati kuzatuvi",
      "Admin buyruqlari",
    ],
  },
  {
    id: 5,
    title: "Portfolio Dizayn",
    description:
      "Kreativ portfolio sayti frontend qismi. Animatsiyalar va interaktiv elementlar.",
    fullDescription:
      "Kreativ dizaynerlar uchun portfolio veb-sayti. GSAP animatsiyalari, parallax effektlar va interaktiv galereyalar bilan boyitilgan. Faqat frontend qismi bajarilgan, backend integratsiya qilinmagan.",
    images: [
      "https://images.unsplash.com/photo-1545665277-5937489579f2?w=800&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&auto=format&fit=crop&q=60",
    ],
    technologies: ["HTML", "CSS", "JavaScript", "GSAP"],
    category: ["frontend", "partial"],
    role: "Frontend Developer",
    duration: "3 hafta",
    isComplete: false,
    links: {
      live: "https://example.com",
      figma: "https://figma.com/example",
    },
    features: [
      "GSAP animatsiyalar",
      "Parallax scroll effektlar",
      "Interaktiv galereya",
      "Responsive dizayn",
    ],
  },
  {
    id: 6,
    title: "Telegram Admin Bot",
    description:
      "Guruh va kanallarni boshqarish uchun bot. Avtomatik moderatsiya va statistika.",
    fullDescription:
      "Telegram guruh va kanallarini boshqarish uchun kuchli admin bot. Avtomatik moderatsiya, spam filtrlash, statistika, foydalanuvchilarni boshqarish va boshqa ko'plab funksiyalar mavjud.",
    images: [
      "https://images.unsplash.com/photo-1633675254053-d96c7668c3b8?w=800&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1611606063065-ee7946f0787a?w=800&auto=format&fit=crop&q=60",
    ],
    technologies: ["Node.js", "Telegraf.js", "PostgreSQL", "Redis"],
    category: ["telegram", "backend"],
    role: "Full Stack Developer",
    duration: "1 oy",
    isComplete: true,
    links: {
      telegram: "https://t.me/admin_example_bot",
      github: "https://github.com/example",
    },
    features: [
      "Avtomatik spam filtrlash",
      "Foydalanuvchilarni ban/unban",
      "Statistika va analitika",
      "Xabarlarni rejalashtirish",
      "Anti-flood himoyasi",
    ],
  },
  {
    id: 7,
    title: "Dashboard UI",
    description:
      "Analitik dashboard interfeysi. Grafiklar, jadvallar va real-time ma'lumotlar.",
    fullDescription:
      "Biznes analitikasi uchun zamonaviy dashboard interfeysi. Interaktiv grafiklar, jadvallar, filtrlash va real-time ma'lumotlar ko'rsatish imkoniyatlari mavjud. Chart.js kutubxonasi yordamida vizualizatsiya qilingan.",
    images: [
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=60",
    ],
    technologies: ["React", "Chart.js", "Tailwind CSS", "TypeScript"],
    category: ["frontend"],
    role: "Frontend Developer",
    duration: "1 oy",
    isComplete: true,
    links: {
      live: "https://example.com",
    },
    features: [
      "Interaktiv grafiklar",
      "Real-time yangilanishlar",
      "Ma'lumotlarni eksport qilish",
      "Filtrlash va qidiruv",
      "Dark/Light tema",
    ],
  },
  {
    id: 8,
    title: "Microservices Backend",
    description:
      "Microservices arxitekturadagi backend. Message queue va service discovery.",
    fullDescription:
      "Microservices arxitekturasida qurilgan backend tizimi. RabbitMQ message queue, Docker konteynerlar, Kubernetes orkestratsiya va service discovery mexanizmlari bilan. Loyihada qisman ishtirok etilgan.",
    images: [
      "https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?w=800&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&auto=format&fit=crop&q=60",
    ],
    technologies: ["NestJS", "RabbitMQ", "Docker", "Kubernetes", "PostgreSQL"],
    category: ["backend", "partial"],
    role: "Backend Developer",
    duration: "2 oy",
    isComplete: false,
    links: {
      github: "https://github.com/example",
      docs: "https://docs.example.com",
    },
    features: [
      "Microservices arxitektura",
      "RabbitMQ message queue",
      "Docker konteynerizatsiya",
      "API Gateway",
      "Service discovery",
    ],
  },
];

const filters: { key: ProjectCategory; label: string; icon: typeof Globe }[] = [
  { key: "all", label: "Barchasi", icon: Layers },
  { key: "frontend", label: "Frontend", icon: Globe },
  { key: "backend", label: "Backend", icon: Server },
  { key: "fullstack", label: "Full Stack", icon: Code },
  { key: "telegram", label: "Telegram Bot", icon: Bot },
  { key: "partial", label: "Qisman", icon: Layers },
];

const ProjectCard = ({
  project,
  index,
  onViewDetails,
}: {
  project: ProjectDetail;
  index: number;
  onViewDetails: (project: ProjectDetail) => void;
}) => {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={cardRef}
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -10 }}
      className="group relative rounded-2xl overflow-hidden bg-card border border-border 
                 hover:border-primary/50 transition-all duration-500 cursor-pointer"
      onClick={() => onViewDetails(project)}
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <motion.img
          src={project.images[0]}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />

        {/* View overlay */}
        <div
          className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 
                        transition-opacity duration-300 flex items-center justify-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileHover={{ scale: 1.1 }}
            className="bg-primary text-primary-foreground px-4 py-2 rounded-full font-medium 
                       flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300"
          >
            <Eye className="w-4 h-4" />
            Batafsil ko&apos;rish
          </motion.div>
        </div>

        {/* Completion badge */}
        <div className="absolute top-4 right-4">
          <span
            className={`px-3 py-1 rounded-full text-xs font-mono 
                          ${
                            project.isComplete
                              ? "bg-secondary/20 text-secondary border border-secondary/30"
                              : "bg-accent/20 text-accent border border-accent/30"
                          }`}
          >
            {project.isComplete ? "To'liq" : "Qisman"}
          </span>
        </div>

        {/* Image count indicator */}
        {project.images.length > 1 && (
          <div
            className="absolute bottom-4 right-4 bg-background/80 backdrop-blur-sm 
                          px-2 py-1 rounded text-xs text-foreground"
          >
            📷 {project.images.length}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
          {project.title}
        </h3>
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
          {project.description}
        </p>

        {/* Technologies */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.slice(0, 4).map((tech) => (
            <span key={tech} className="tech-badge text-xs">
              {tech}
            </span>
          ))}
          {project.technologies.length > 4 && (
            <span className="text-xs text-muted-foreground">
              +{project.technologies.length - 4}
            </span>
          )}
        </div>

        {/* Quick links */}
        <div className="flex gap-3" onClick={(e) => e.stopPropagation()}>
          {project.links.live && (
            <motion.a
              href={project.links.live}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/10 text-primary 
                         text-sm font-medium hover:bg-primary/20 transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              Demo
            </motion.a>
          )}
          {project.links.github && (
            <motion.a
              href={project.links.github}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border 
                         text-muted-foreground text-sm font-medium hover:text-foreground 
                         hover:border-muted-foreground transition-colors"
            >
              <Github className="w-4 h-4" />
              Kod
            </motion.a>
          )}
        </div>
      </div>

      {/* Hover glow */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent" />
      </div>
    </motion.div>
  );
};

const ProjectsSection = () => {
  const [activeFilter, setActiveFilter] = useState<ProjectCategory>("all");
  const [selectedProject, setSelectedProject] = useState<ProjectDetail | null>(
    null,
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const filteredProjects = projects.filter(
    (project) =>
      activeFilter === "all" || project.category.includes(activeFilter),
  );

  const handleViewDetails = (project: ProjectDetail) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  return (
    <>
      <section id="projects" ref={sectionRef} className="py-32 relative">
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
              className="inline-block px-4 py-2 rounded-full border border-accent/30 bg-accent/10 
                         text-accent font-mono text-sm mb-6"
            >
              &lt;projects /&gt;
            </motion.span>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              <span className="text-foreground">Mening</span>{" "}
              <span className="text-gradient">Loyihalarim</span>
            </h2>

            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Frontend va Backend bo&apos;yicha qilgan ishlarim. Har bir
              loyihani bosib batafsil ko&apos;ring.
            </p>
          </motion.div>

          {/* Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap justify-center gap-3 mb-12"
          >
            {filters.map(({ key, label, icon: Icon }) => (
              <motion.button
                key={key}
                onClick={() => setActiveFilter(key)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium transition-all duration-300
                           ${
                             activeFilter === key
                               ? "bg-primary text-primary-foreground shadow-lg shadow-primary/30"
                               : "bg-card border border-border text-muted-foreground hover:text-foreground hover:border-primary/30"
                           }`}
              >
                <Icon className="w-4 h-4" />
                {label}
              </motion.button>
            ))}
          </motion.div>

          {/* Projects grid */}
          <motion.div
            layout
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, index) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  index={index}
                  onViewDetails={handleViewDetails}
                />
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Empty state */}
          {filteredProjects.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <p className="text-muted-foreground text-lg">
                Bu kategoriyada loyihalar topilmadi
              </p>
            </motion.div>
          )}
        </div>
      </section>

      {/* Project Detail Modal */}
      <ProjectDetailModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </>
  );
};

export default ProjectsSection;
