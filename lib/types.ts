export interface Skill {
  id: string;
  category: string;
  name: string;
  icon?: string; // Emoji icon
  color?: string; // Hex color
  level?: "Yuqori" | "O'rta" | "Boshlang'ich"; // Skill level
  visible: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
}

/** GitHub repo ma'lumoti */
export interface GithubLink {
  /** Nomi: "Frontend", "Backend", "Monorepo", etc. */
  label: string;
  url: string;
  /** Repo berk (private) yoki yo'qligi */
  isPrivate?: boolean;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  technologies: string[];
  /** Bir nechta rasm; birinchisi asosiy rasm hisoblanadi */
  images?: string[];
  /** Eski format – images bo'lmasa ishlatiladi */
  image?: string;
  /** Bir nechta GitHub repo – frontend, backend, etc. */
  githubLinks?: GithubLink[];
  /** Eski format – githubLinks bo'lmasa ishlatiladi */
  githubUrl?: string;
  liveUrl?: string;
  /** Backend API / Swagger hujjatlari URL */
  swaggerUrl?: string;
  featured: boolean;
  visible: boolean;
  order: number;
  /** Bir nechta kategoriya – asosiy sahifadagi filtrlarda ishlatiladi */
  categories?: string[];
  /** Eski format – categories bo'lmasa ishlatiladi */
  category?: string;
  status?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Experience {
  id: string;
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  responsibilities: string[];
  visible: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  location: string;
  startDate: string;
  endDate?: string;
  description?: string;
  visible: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  url?: string;
  visible: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface PersonalInfo {
  name: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  github?: string;
  linkedin?: string;
  website?: string;
  summary: string;
  updatedAt: string;
}

export interface PortfolioData {
  personalInfo: PersonalInfo;
  skills: Skill[];
  projects: Project[];
  experiences: Experience[];
  education: Education[];
  certifications: Certification[];
}
