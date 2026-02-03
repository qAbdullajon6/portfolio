"use client";

import { useState, useRef, useEffect } from "react";
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
  Loader2,
} from "lucide-react";
import ProjectDetailModal from "./ProjectDetailModal";
import { Project } from "@/lib/types";
import { getPortfolioApiUrl } from "@/lib/portfolio-api";

type ProjectCategory =
  | "all"
  | "frontend"
  | "backend"
  | "fullstack"
  | "telegram"
  | "partial";

const DEFAULT_PLACEHOLDER_IMAGE =
  "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=60";

/** Kategoriya nomi -> filter key */
const CATEGORY_TO_KEY: Record<string, ProjectCategory> = {
  Frontend: "frontend",
  Backend: "backend",
  "Full Stack": "fullstack",
  "Telegram Bot": "telegram",
  Qisman: "partial",
};

const VALID_CATEGORY_KEYS: ProjectCategory[] = ["frontend", "backend", "fullstack", "telegram", "partial"];

/** Loyihaning barcha kategoriya keylari (filtrlash uchun) */
function getProjectCategoryKeys(project: Project): ProjectCategory[] {
  const keys: ProjectCategory[] = [];
  const categories = project.categories ?? (project.category ? [project.category] : []);
  for (const cat of categories) {
    const key = (CATEGORY_TO_KEY[cat] ?? cat?.toLowerCase().replace(/\s+/g, "")) as ProjectCategory;
    if (key && VALID_CATEGORY_KEYS.includes(key) && !keys.includes(key)) keys.push(key);
  }
  const status = project.status?.toLowerCase() ?? "";
  if ((status.includes("qisman") || status.includes("partial")) && !keys.includes("partial")) {
    keys.push("partial");
  }
  return keys;
}

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
  project: Project;
  index: number;
  onViewDetails: (project: Project) => void;
}) => {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: "-50px" });
  const mainImage =
    project.images?.[0]?.trim() ?? project.image?.trim();
  const imageUrl = mainImage || DEFAULT_PLACEHOLDER_IMAGE;
  const technologies = Array.isArray(project.technologies)
    ? project.technologies
    : [];

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
          src={imageUrl}
          alt={project.title ?? "Loyiha"}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          onError={(e) => {
            const target = e.currentTarget;
            if (target.src !== DEFAULT_PLACEHOLDER_IMAGE) {
              target.src = DEFAULT_PLACEHOLDER_IMAGE;
            }
          }}
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

        {/* Status badge */}
        <div className="absolute top-4 right-4">
          <span
            className={`px-3 py-1 rounded-full text-xs font-mono 
                          ${
                            project.status?.toLowerCase().includes("to'liq") ||
                            project.featured
                              ? "bg-secondary/20 text-secondary border border-secondary/30"
                              : "bg-accent/20 text-accent border border-accent/30"
                          }`}
          >
            {project.status ?? (project.featured ? "To'liq" : "Loyiha")}
          </span>
        </div>
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
          {technologies.slice(0, 4).map((tech) => (
            <span key={String(tech)} className="tech-badge text-xs">
              {tech}
            </span>
          ))}
          {technologies.length > 4 && (
            <span className="text-xs text-muted-foreground">
              +{technologies.length - 4}
            </span>
          )}
        </div>

        {/* Quick links */}
        <div className="flex gap-3" onClick={(e) => e.stopPropagation()}>
          {project.liveUrl && (
            <motion.a
              href={project.liveUrl}
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
          {/* GitHub – birinchi ochiq linkni ko'rsatish */}
          {(() => {
            const links = project.githubLinks?.length
              ? project.githubLinks
              : project.githubUrl
                ? [{ label: "GitHub", url: project.githubUrl, isPrivate: false }]
                : [];
            const firstPublic = links.find((l) => !l.isPrivate);
            if (!firstPublic) return null;
            return (
              <motion.a
                href={firstPublic.url}
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
            );
          })()}
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
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<ProjectCategory>("all");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  useEffect(() => {
    async function fetchProjects() {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch(getPortfolioApiUrl());
        const json = await res.json();
        if (!res.ok) {
          throw new Error(json.message ?? "Ma'lumotlarni yuklashda xatolik");
        }
        const list = json?.data?.projects;
        setProjects(Array.isArray(list) ? list : []);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Ma'lumotlarni yuklashda xatolik"
        );
        setProjects([]);
      } finally {
        setLoading(false);
      }
    }
    fetchProjects();
  }, []);

  const filteredProjects =
    activeFilter === "all"
      ? projects
      : projects.filter((p) => getProjectCategoryKeys(p).includes(activeFilter));

  const handleViewDetails = (project: Project) => {
    setSelectedProject(project);
  };

  const handleCloseModal = () => {
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

          {/* Loading */}
          {loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center py-20 gap-4"
            >
              <Loader2 className="w-12 h-12 animate-spin text-primary" />
              <p className="text-muted-foreground">Loyihalar yuklanmoqda...</p>
            </motion.div>
          )}

          {/* Error */}
          {!loading && error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <p className="text-destructive mb-4">{error}</p>
              <p className="text-muted-foreground text-sm">
                Keyinroq qayta urinib ko&apos;ring yoki backend server ishlatayotganingizni tekshiring.
              </p>
            </motion.div>
          )}

          {/* Projects grid */}
          {!loading && !error && (
            <motion.div
              layout
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
              initial={false}
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
          )}

          {/* Empty state */}
          {!loading && !error && filteredProjects.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <p className="text-muted-foreground text-lg">
                {projects.length === 0
                  ? "Hozircha loyihalar yo&apos;q. Backend orqali qo&apos;shiladi."
                  : "Bu kategoriyada loyihalar topilmadi"}
              </p>
            </motion.div>
          )}
        </div>
      </section>

      {/* Project Detail Modal */}
      <ProjectDetailModal
        project={selectedProject}
        onClose={handleCloseModal}
      />
    </>
  );
};

export default ProjectsSection;
