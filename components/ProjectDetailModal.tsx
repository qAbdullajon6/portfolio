"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Github, Globe, CheckCircle, X, ChevronLeft, ChevronRight, FileJson, Send } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Project } from "@/lib/types";

interface ProjectDetailModalProps {
  project: Project | null;
  onClose: () => void;
}

const ProjectDetailModal = ({ project, onClose }: ProjectDetailModalProps) => {
  const allImages: string[] =
    (project?.images?.length ? project.images : project?.image ? [project.image] : []) ?? [];
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const goPrev = useCallback(() => {
    if (allImages.length === 0) return;
    setLightboxIndex((i) => (i === null ? null : i === 0 ? allImages.length - 1 : i - 1));
  }, [allImages.length]);
  const goNext = useCallback(() => {
    if (allImages.length === 0) return;
    setLightboxIndex((i) => (i === null ? null : (i + 1) % allImages.length));
  }, [allImages.length]);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxIndex(null);
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightboxIndex, goPrev, goNext]);

  if (!project) return null;

  return (
    <>
      <Dialog open={!!project} onOpenChange={onClose}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-card border-border p-0">
          {/* Project Image(s) – bosganda katta ekranda (lightbox) */}
          <div className="relative p-4 sm:p-6">
            {allImages.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 justify-items-center">
                {allImages.map((url, i) => (
                  <motion.button
                    key={url + i}
                    type="button"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.05 }}
                    onClick={() => setLightboxIndex(i)}
                    className="relative w-full max-w-[400px] aspect-square rounded-xl overflow-hidden border border-border bg-muted shadow-lg cursor-pointer hover:ring-2 hover:ring-primary/50 focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                  >
                    <img
                      src={url}
                      alt={`${project.title} – rasm ${i + 1}`}
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity bg-black/40 text-white text-sm font-medium rounded-xl">
                      Kattaroq ko&apos;rish
                    </span>
                  </motion.button>
                ))}
              </div>
            ) : (
              <div className="flex items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 aspect-video min-h-[200px]">
                <span className="text-8xl">💼</span>
              </div>
            )}

            {/* Featured badge */}
            {project.featured && (
              <div className="absolute top-6 right-6">
                <Badge
                  variant="outline"
                  className="bg-primary/20 text-primary border-primary/30"
                >
                  <CheckCircle className="w-3 h-3 mr-1" />
                  Featured
                </Badge>
              </div>
            )}
          </div>

        <div className="p-6 space-y-6">
          {/* Header */}
          <DialogHeader>
            <DialogTitle className="text-2xl md:text-3xl font-bold text-foreground">
              {project.title}
            </DialogTitle>
          </DialogHeader>

          {/* Description */}
          <div className="space-y-3">
            <h4 className="text-lg font-semibold text-foreground">
              Loyiha haqida
            </h4>
            <p className="text-muted-foreground leading-relaxed">
              {project.longDescription || project.description}
            </p>
          </div>

          {/* Technologies */}
          <div className="space-y-3">
            <h4 className="text-lg font-semibold text-foreground">
              Ishlatilgan texnologiyalar
            </h4>
            <div className="flex flex-wrap gap-2">
              {(project.technologies ?? []).map((tech: string) => (
                <span
                  key={tech}
                  className="px-3 py-1.5 bg-primary/10 text-primary rounded-lg text-sm font-medium border border-primary/20"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className="space-y-3">
            <h4 className="text-lg font-semibold text-foreground">Havolalar</h4>
            <div className="grid sm:grid-cols-2 gap-3">
              {project.liveUrl && (
                <motion.a
                  href={project.liveUrl}
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

              {/* GitHub linklar – bir nechta bo'lishi mumkin */}
              {(project.githubLinks?.length
                ? project.githubLinks
                : project.githubUrl
                  ? [{ label: "GitHub", url: project.githubUrl, isPrivate: false }]
                  : []
              ).map((link, i) => (
                <motion.a
                  key={link.url + i}
                  href={link.isPrivate ? undefined : link.url}
                  target={link.isPrivate ? undefined : "_blank"}
                  rel={link.isPrivate ? undefined : "noopener noreferrer"}
                  whileHover={link.isPrivate ? {} : { scale: 1.02, y: -2 }}
                  whileTap={link.isPrivate ? {} : { scale: 0.98 }}
                  className={`flex items-center gap-3 p-4 rounded-xl border transition-colors group ${
                    link.isPrivate
                      ? "bg-muted/50 border-border text-muted-foreground cursor-not-allowed opacity-70"
                      : "bg-muted border-border text-foreground hover:border-muted-foreground"
                  }`}
                  onClick={link.isPrivate ? (e) => e.preventDefault() : undefined}
                  title={link.isPrivate ? "Bu repo berk (private)" : undefined}
                >
                  <Github className="w-5 h-5" />
                  <div className="flex-1">
                    <div className="font-medium flex items-center gap-2">
                      {link.label || "GitHub"}
                      {link.isPrivate && (
                        <span className="px-1.5 py-0.5 text-[10px] font-semibold bg-amber-500/20 text-amber-600 dark:text-amber-400 rounded">
                          BERK
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {link.isPrivate ? "Private repository" : "Manba kodi"}
                    </div>
                  </div>
                  {!link.isPrivate && (
                    <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  )}
                </motion.a>
              ))}

              {project.swaggerUrl && (
                <motion.a
                  href={project.swaggerUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center gap-3 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 
                             text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/20 transition-colors group"
                >
                  <FileJson className="w-5 h-5" />
                  <div className="flex-1">
                    <div className="font-medium">API / Swagger</div>
                    <div className="text-xs text-emerald-600/70 dark:text-emerald-400/70">
                      Backend hujjatlari
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.a>
              )}

              {project.telegramBotUrl && (
                <motion.a
                  href={project.telegramBotUrl.startsWith("http") ? project.telegramBotUrl : `https://${project.telegramBotUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center gap-3 p-4 rounded-xl bg-sky-500/10 border border-sky-500/30 
                             text-sky-600 dark:text-sky-400 hover:bg-sky-500/20 transition-colors group"
                >
                  <Send className="w-5 h-5" />
                  <div className="flex-1">
                    <div className="font-medium">Telegram Bot</div>
                    <div className="text-xs text-sky-600/70 dark:text-sky-400/70">
                      Botga o&apos;tish
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.a>
              )}
            </div>

            {!project.liveUrl && !project.githubUrl && !project.githubLinks?.length && !project.swaggerUrl && !project.telegramBotUrl && (
              <p className="text-center text-muted-foreground py-4">
                Havolalar mavjud emas
              </p>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>

      {/* Lightbox – rasmni katta ekranda ko'rish (slayd) */}
      <AnimatePresence>
        {lightboxIndex !== null && allImages[lightboxIndex] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4"
            onClick={() => setLightboxIndex(null)}
          >
            <button
              type="button"
              onClick={() => setLightboxIndex(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-10"
              aria-label="Yopish"
            >
              <X className="w-6 h-6" />
            </button>

            {allImages.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); goPrev(); }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-10"
                  aria-label="Oldingi"
                >
                  <ChevronLeft className="w-8 h-8" />
                </button>
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); goNext(); }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-10"
                  aria-label="Keyingi"
                >
                  <ChevronRight className="w-8 h-8" />
                </button>
              </>
            )}

            <motion.img
              key={lightboxIndex}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.2 }}
              src={allImages[lightboxIndex]}
              alt={`${project.title} – rasm ${lightboxIndex + 1}`}
              className="max-w-full max-h-[85vh] w-auto h-auto object-contain"
              onClick={(e) => e.stopPropagation()}
            />

            {allImages.length > 1 && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/80 text-sm">
                {lightboxIndex + 1} / {allImages.length}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ProjectDetailModal;
