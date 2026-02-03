"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Download,
  Mail,
  Phone,
  MapPin,
  Github,
  Linkedin,
  Globe,
  Briefcase,
  GraduationCap,
  Award,
  Code,
  Calendar,
} from "lucide-react";
import ResumeNavbar from "@/components/ResumeNavbar";
import Footer from "@/components/Footer";
import {
  Skill,
  Project,
  Experience,
  Education,
  Certification,
} from "@/lib/types";
import { getPortfolioApiUrl } from "@/lib/portfolio-api";

export default function Resume() {
  const [isDownloading, setIsDownloading] = useState(false);
  const [loading, setLoading] = useState(true);

  // Data states
  const [skills, setSkills] = useState<Skill[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [education, setEducation] = useState<Education[]>([]);
  const [certifications, setCertifications] = useState<Certification[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(getPortfolioApiUrl());
      const data = await response.json();

      if (data.success) {
        setSkills(data.data.skills || []);
        setProjects(data.data.projects || []);
        setExperiences(data.data.experiences || []);
        setEducation(data.data.education || []);
        setCertifications(data.data.certifications || []);
      }
    } catch (error) {
      console.error("Ma'lumotlarni yuklashda xatolik:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    setIsDownloading(true);

    // Download PDF file
    const link = document.createElement("a");
    link.href = "/qAbdullajon.pdf";
    link.download = "Aziz_Mukhtorov_Resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setTimeout(() => {
      setIsDownloading(false);
    }, 1000);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted">
      <ResumeNavbar />

      <div className="container mx-auto px-4 py-24 max-w-5xl">
        {/* Header with Download Button */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-between items-center mb-8"
        >
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent">
            Resume
          </h1>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleDownload}
            disabled={isDownloading}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-purple-600 text-white rounded-lg shadow-lg hover:shadow-xl transition-all disabled:opacity-50"
          >
            <Download className="w-5 h-5" />
            {isDownloading ? "Preparing..." : "Download PDF"}
          </motion.button>
        </motion.div>

        {/* Resume Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-card/50 backdrop-blur-sm border border-border rounded-2xl shadow-2xl p-8 md:p-12 print:shadow-none print:border-0"
        >
          {/* Personal Info */}
          <section className="mb-12">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <h2 className="text-5xl font-bold mb-2 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                Qurbonov Abdullajon
              </h2>
              <p className="text-2xl text-muted-foreground mb-6">
                Full Stack Developer
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-muted-foreground">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-primary" />
                  <a
                    href="mailto:abdullajonq6@gmail.com"
                    className="hover:text-primary transition-colors"
                  >
                    abdullajonq6@gmail.com
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-primary" />
                  <a
                    href="tel:+998501081824"
                    className="hover:text-primary transition-colors"
                  >
                    +998 50 108 18 24
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-primary" />
                  <span>Tashkent, Uzbekistan</span>
                </div>
                <div className="flex items-center gap-3">
                  <Github className="w-5 h-5 text-primary" />
                  <a
                    href="https://github.com/qAbdullajon6"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-primary transition-colors"
                  >
                    github.com/qAbdullajon6
                  </a>
                </div>
              </div>
            </motion.div>
          </section>

          {/* Professional Summary */}
          <Section
            title="Professional Summary"
            icon={<Briefcase />}
            delay={0.4}
          >
            <p className="text-muted-foreground leading-relaxed">
              Passionate Full Stack Developer with expertise in modern web
              technologies. Specialized in building scalable, high-performance
              applications using React, Next.js, Node.js, and various database
              systems. Strong problem-solving skills with a focus on clean code
              and user experience. Experienced in both frontend and backend
              development, with a proven track record of delivering quality
              projects.
            </p>
          </Section>

          {/* Skills */}
          <Section title="Technical Skills" icon={<Code />} delay={0.5}>
            <div className="space-y-4">
              {Object.entries(
                skills.reduce((acc: Record<string, string[]>, skill) => {
                  const category = skill.category || "Other";
                  if (!acc[category]) acc[category] = [];
                  acc[category].push(skill.name);
                  return acc;
                }, {}),
              ).map(([category, skillList]) => (
                <SkillGroup
                  key={category}
                  title={category}
                  skills={skillList}
                />
              ))}
            </div>
          </Section>

          {/* Experience */}
          <Section title="Work Experience" icon={<Briefcase />} delay={0.6}>
            <div className="space-y-8">
              {experiences.map((exp) => (
                <ExperienceItem
                  key={exp.id}
                  title={exp.title}
                  company={exp.company}
                  location={exp.location}
                  period={`${exp.startDate} - ${exp.current ? "Present" : exp.endDate}`}
                  responsibilities={exp.responsibilities}
                />
              ))}
              {experiences.length === 0 && (
                <p className="text-muted-foreground text-center py-8">
                  Ma'lumot topilmadi
                </p>
              )}
            </div>
          </Section>

          {/* Education */}
          <Section title="Education" icon={<GraduationCap />} delay={0.7}>
            <div className="space-y-6">
              {education.map((edu) => (
                <EducationItem
                  key={edu.id}
                  degree={edu.degree}
                  institution={edu.institution}
                  period={`${edu.startDate} - ${edu.endDate}`}
                  description={edu.description}
                />
              ))}
              {education.length === 0 && (
                <p className="text-muted-foreground text-center py-8">
                  Ma'lumot topilmadi
                </p>
              )}
            </div>
          </Section>

          {/* Projects */}
          <Section title="Featured Projects" icon={<Globe />} delay={0.8}>
            <div className="space-y-6">
              {projects
                .filter((p) => p.featured)
                .map((project) => (
                  <ProjectItem
                    key={project.id}
                    name={project.title}
                    description={project.description}
                    technologies={project.technologies}
                    link={project.githubUrl || project.liveUrl}
                  />
                ))}
              {projects.filter((p) => p.featured).length === 0 && (
                <p className="text-muted-foreground text-center py-8">
                  Ma'lumot topilmadi
                </p>
              )}
            </div>
          </Section>

          {/* Certifications */}
          <Section
            title="Certifications & Achievements"
            icon={<Award />}
            delay={0.9}
          >
            <ul className="space-y-3 text-muted-foreground">
              {certifications.map((cert) => (
                <li key={cert.id} className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                  <span>
                    {cert.name} - {cert.issuer}
                  </span>
                </li>
              ))}
              {certifications.length === 0 && (
                <p className="text-center py-8">Ma'lumot topilmadi</p>
              )}
            </ul>
          </Section>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
}

// Helper Components
function Section({
  title,
  icon,
  children,
  delay,
}: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  delay: number;
}) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="mb-10 pb-10 border-b border-border last:border-0"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="text-primary">{icon}</div>
        <h3 className="text-2xl font-bold text-foreground">{title}</h3>
      </div>
      {children}
    </motion.section>
  );
}

function SkillGroup({ title, skills }: { title: string; skills: string[] }) {
  return (
    <div>
      <h4 className="text-lg font-semibold mb-3 text-foreground">{title}</h4>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill, index) => (
          <motion.span
            key={skill}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            className="px-4 py-2 bg-primary/10 text-primary rounded-lg text-sm font-medium hover:bg-primary/20 transition-colors"
          >
            {skill}
          </motion.span>
        ))}
      </div>
    </div>
  );
}

function ExperienceItem({
  title,
  company,
  location,
  period,
  responsibilities,
}: {
  title: string;
  company: string;
  location: string;
  period: string;
  responsibilities: string[];
}) {
  return (
    <div className="relative pl-6 border-l-2 border-primary/30">
      <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-primary"></div>
      <div className="mb-3">
        <h4 className="text-xl font-semibold text-foreground">{title}</h4>
        <p className="text-muted-foreground font-medium">{company}</p>
        <div className="flex flex-wrap gap-4 mt-2 text-sm text-muted-foreground">
          <span className="flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            {location}
          </span>
          <span className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            {period}
          </span>
        </div>
      </div>
      <ul className="space-y-2">
        {responsibilities.map((responsibility, index) => (
          <li
            key={index}
            className="flex items-start gap-3 text-muted-foreground"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
            <span>{responsibility}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function EducationItem({
  degree,
  institution,
  period,
  description,
}: {
  degree: string;
  institution: string;
  period: string;
  description?: string;
}) {
  return (
    <div className="relative pl-6 border-l-2 border-primary/30">
      <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-primary"></div>
      <h4 className="text-xl font-semibold text-foreground mb-1">{degree}</h4>
      <p className="text-muted-foreground font-medium">{institution}</p>
      <p className="text-sm text-muted-foreground mt-1 flex items-center gap-1">
        <Calendar className="w-4 h-4" />
        {period}
      </p>
      {description && (
        <p className="text-muted-foreground mt-2">{description}</p>
      )}
    </div>
  );
}

function ProjectItem({
  name,
  description,
  technologies,
  link,
}: {
  name: string;
  description: string;
  technologies: string[];
  link?: string;
}) {
  return (
    <div className="p-5 bg-muted/30 rounded-lg border border-border hover:border-primary/50 transition-colors">
      <div className="flex items-start justify-between mb-2">
        <h4 className="text-lg font-semibold text-foreground">{name}</h4>
        {link && (
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:text-primary/80 transition-colors"
          >
            <Github className="w-5 h-5" />
          </a>
        )}
      </div>
      <p className="text-muted-foreground mb-3">{description}</p>
      <div className="flex flex-wrap gap-2">
        {technologies.map((tech) => (
          <span
            key={tech}
            className="px-3 py-1 bg-primary/10 text-primary text-xs rounded-md font-medium"
          >
            {tech}
          </span>
        ))}
      </div>
    </div>
  );
}
