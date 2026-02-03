import fs from "fs";
import path from "path";
import { PortfolioData } from "./types";

const DATA_FILE_PATH = path.join(process.cwd(), "data", "portfolio.json");

// Ma'lumotlarni o'qish
export function readPortfolioData(): PortfolioData {
  try {
    const fileContent = fs.readFileSync(DATA_FILE_PATH, "utf-8");
    return JSON.parse(fileContent);
  } catch (error) {
    console.error("Error reading portfolio data:", error);
    throw new Error("Failed to read portfolio data");
  }
}

// Ma'lumotlarni yozish
export function writePortfolioData(data: PortfolioData): void {
  try {
    const jsonContent = JSON.stringify(data, null, 2);
    fs.writeFileSync(DATA_FILE_PATH, jsonContent, "utf-8");
  } catch (error) {
    console.error("Error writing portfolio data:", error);
    throw new Error("Failed to write portfolio data");
  }
}

// Faqat ko'rinadigan elementlarni qaytarish (public uchun)
export function getVisibleData(): Partial<PortfolioData> {
  const data = readPortfolioData();

  return {
    personalInfo: data.personalInfo,
    skills: data.skills
      .filter((s) => s.visible)
      .sort((a, b) => a.order - b.order),
    projects: data.projects
      .filter((p) => p.visible)
      .sort((a, b) => a.order - b.order),
    experiences: data.experiences
      .filter((e) => e.visible)
      .sort((a, b) => a.order - b.order),
    education: data.education
      .filter((e) => e.visible)
      .sort((a, b) => a.order - b.order),
    certifications: data.certifications
      .filter((c) => c.visible)
      .sort((a, b) => a.order - b.order),
  };
}

// ID generator
export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}
