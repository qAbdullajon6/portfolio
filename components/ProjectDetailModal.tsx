"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  ExternalLink,
  Github,
  FileCode,
  Bot,
  Globe,
  Server,
  Calendar,
  User,
  CheckCircle,
  Clock,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

export interface ProjectDetail {
  id: number;
  title: string;
  description: string;
  fullDescription: string;
  images: string[];
  technologies: string[];
  category: string[];
  isComplete: boolean;
  role: string;
  duration: string;
  links: {
    live?: string;
    github?: string;
    swagger?: string;
    telegram?: string;
    figma?: string;
    docs?: string;
  };
  features: string[];
}

interface ProjectDetailModalProps {
  project: ProjectDetail | null;
  isOpen: boolean;
  onClose: () => void;
}

const ProjectDetailModal = ({
  project,
  isOpen,
  onClose,
}: ProjectDetailModalProps) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  if (!project) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-card border-border p-0">
        {/* Image Gallery */}
        <div className="relative">
          <div className="relative h-64 md:h-80 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.img
                key={activeImageIndex}
                src={project.images[activeImageIndex]}
                alt={project.title}
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="w-full h-full object-cover"
              />
            </AnimatePresence>
            <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
          </div>

          {/* Image thumbnails */}
          {project.images.length > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {project.images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveImageIndex(index)}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                    index === activeImageIndex
                      ? "bg-primary w-8"
                      : "bg-muted-foreground/50 hover:bg-muted-foreground"
                  }`}
                />
              ))}
            </div>
          )}

          {/* Status badge */}
          <div className="absolute top-4 right-4">
            <Badge
              variant="outline"
              className={`${
                project.isComplete
                  ? "bg-secondary/20 text-secondary border-secondary/30"
                  : "bg-accent/20 text-accent border-accent/30"
              }`}
            >
              {project.isComplete ? (
                <>
                  <CheckCircle className="w-3 h-3 mr-1" />
                  To&apos;liq bajarilgan
                </>
              ) : (
                <>
                  <Clock className="w-3 h-3 mr-1" />
                  Qisman ishtirok
                </>
              )}
            </Badge>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Header */}
          <DialogHeader>
            <DialogTitle className="text-2xl md:text-3xl font-bold text-foreground">
              {project.title}
            </DialogTitle>
          </DialogHeader>

          {/* Meta info */}
          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-primary" />
              <span>{project.role}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-primary" />
              <span>{project.duration}</span>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-3">
            <h4 className="text-lg font-semibold text-foreground">
              Loyiha haqida
            </h4>
            <p className="text-muted-foreground leading-relaxed">
              {project.fullDescription}
            </p>
          </div>

          {/* Features */}
          {project.features.length > 0 && (
            <div className="space-y-3">
              <h4 className="text-lg font-semibold text-foreground">
                Asosiy funksiyalar
              </h4>
              <ul className="grid md:grid-cols-2 gap-2">
                {project.features.map((feature, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-start gap-2 text-muted-foreground"
                  >
                    <span className="text-primary mt-1">▸</span>
                    <span>{feature}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          )}

          {/* Technologies */}
          <div className="space-y-3">
            <h4 className="text-lg font-semibold text-foreground">
              Ishlatilgan texnologiyalar
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span key={tech} className="tech-badge">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className="space-y-3">
            <h4 className="text-lg font-semibold text-foreground">Havolalar</h4>
            <div className="grid sm:grid-cols-2 gap-3">
              {project.links.live && (
                <motion.a
                  href={project.links.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center gap-3 p-4 rounded-xl bg-primary/10 border border-primary/30 
                             text-primary hover:bg-primary/20 transition-colors group"
                >
                  <Globe className="w-5 h-5" />
                  <div className="flex-1">
                    <div className="font-medium">Live Demo</div>
                    <div className="text-xs text-primary/70">
                      Jonli ko&apos;rish
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.a>
              )}

              {project.links.swagger && (
                <motion.a
                  href={project.links.swagger}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center gap-3 p-4 rounded-xl bg-secondary/10 border border-secondary/30 
                             text-secondary hover:bg-secondary/20 transition-colors group"
                >
                  <FileCode className="w-5 h-5" />
                  <div className="flex-1">
                    <div className="font-medium">Swagger API</div>
                    <div className="text-xs text-secondary/70">
                      API hujjatlari
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.a>
              )}

              {project.links.github && (
                <motion.a
                  href={project.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center gap-3 p-4 rounded-xl bg-muted border border-border 
                             text-foreground hover:border-muted-foreground transition-colors group"
                >
                  <Github className="w-5 h-5" />
                  <div className="flex-1">
                    <div className="font-medium">GitHub</div>
                    <div className="text-xs text-muted-foreground">
                      Manba kodi
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.a>
              )}

              {project.links.telegram && (
                <motion.a
                  href={project.links.telegram}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center gap-3 p-4 rounded-xl bg-accent/10 border border-accent/30 
                             text-accent hover:bg-accent/20 transition-colors group"
                >
                  <Bot className="w-5 h-5" />
                  <div className="flex-1">
                    <div className="font-medium">Telegram Bot</div>
                    <div className="text-xs text-accent/70">
                      Botni ishga tushirish
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.a>
              )}

              {project.links.figma && (
                <motion.a
                  href={project.links.figma}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center gap-3 p-4 rounded-xl bg-pink-500/10 border border-pink-500/30 
                             text-pink-400 hover:bg-pink-500/20 transition-colors group"
                >
                  <Server className="w-5 h-5" />
                  <div className="flex-1">
                    <div className="font-medium">Figma</div>
                    <div className="text-xs text-pink-400/70">
                      Dizayn fayllari
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.a>
              )}

              {project.links.docs && (
                <motion.a
                  href={project.links.docs}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center gap-3 p-4 rounded-xl bg-yellow-500/10 border border-yellow-500/30 
                             text-yellow-400 hover:bg-yellow-500/20 transition-colors group"
                >
                  <FileCode className="w-5 h-5" />
                  <div className="flex-1">
                    <div className="font-medium">Hujjatlar</div>
                    <div className="text-xs text-yellow-400/70">
                      To&apos;liq qo&apos;llanma
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.a>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectDetailModal;
