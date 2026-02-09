import fs from "fs";
import path from "path";
import { PortfolioData } from "./types";

const DEFAULT_DATA_PATH = path.join(process.cwd(), "data", "portfolio.json");
const BLOB_PATHNAME = "portfolio/data.json";

function getDataFilePath(): string {
  const envPath = process.env.PORTFOLIO_DATA_PATH;
  if (envPath?.trim()) {
    return path.isAbsolute(envPath) ? envPath : path.join(process.cwd(), envPath.trim());
  }
  return DEFAULT_DATA_PATH;
}

/** Vercel Blob orqali o'qish (BLOB_READ_WRITE_TOKEN bo'lsa) */
async function readFromBlob(): Promise<PortfolioData | null> {
  const token = process.env.BLOB_READ_WRITE_TOKEN;
  if (!token?.trim()) return null;
  try {
    const { list } = await import("@vercel/blob");
    const { blobs } = await list({ prefix: "portfolio/", limit: 10 });
    const blob = blobs.find((b) => b.pathname === BLOB_PATHNAME);
    if (!blob?.url) return null;
    const res = await fetch(blob.url);
    if (!res.ok) return null;
    const text = await res.text();
    return JSON.parse(text) as PortfolioData;
  } catch {
    return null;
  }
}

/** Vercel Blob ga yozish */
async function writeToBlob(data: PortfolioData): Promise<void> {
  const token = process.env.BLOB_READ_WRITE_TOKEN;
  if (!token?.trim()) throw new Error("BLOB_READ_WRITE_TOKEN not set");
  const { put } = await import("@vercel/blob");
  const json = JSON.stringify(data, null, 2);
  await put(BLOB_PATHNAME, json, {
    access: "public",
    contentType: "application/json",
    addRandomSuffix: false,
    allowOverwrite: true,
  });
}

/** Ma'lumotlarni o'qish (fayl yoki Vercel Blob) */
export async function readPortfolioData(): Promise<PortfolioData> {
  const useBlob = !!process.env.BLOB_READ_WRITE_TOKEN?.trim();

  if (useBlob) {
    const data = await readFromBlob();
    if (data) return data;
    try {
      const fileContent = await fs.promises.readFile(DEFAULT_DATA_PATH, "utf-8");
      const parsed = JSON.parse(fileContent) as PortfolioData;
      await writeToBlob(parsed);
      return parsed;
    } catch (e) {
      console.error("Blob empty and file read failed:", e);
      throw new Error("Failed to read portfolio data");
    }
  }

  const dataPath = getDataFilePath();
  try {
    const fileContent = await fs.promises.readFile(dataPath, "utf-8");
    return JSON.parse(fileContent) as PortfolioData;
  } catch (readErr) {
    if (dataPath !== DEFAULT_DATA_PATH) {
      try {
        const defaultContent = await fs.promises.readFile(DEFAULT_DATA_PATH, "utf-8");
        const data = JSON.parse(defaultContent) as PortfolioData;
        await writePortfolioData(data);
        return data;
      } catch {
        // ignore
      }
    }
    console.error("Error reading portfolio data:", dataPath, readErr);
    throw new Error("Failed to read portfolio data");
  }
}

/** Ma'lumotlarni yozish (fayl yoki Vercel Blob) */
export async function writePortfolioData(data: PortfolioData): Promise<void> {
  if (process.env.BLOB_READ_WRITE_TOKEN?.trim()) {
    await writeToBlob(data);
    return;
  }

  const dataPath = getDataFilePath();
  try {
    const dir = path.dirname(dataPath);
    await fs.promises.mkdir(dir, { recursive: true });
    const jsonContent = JSON.stringify(data, null, 2);
    await fs.promises.writeFile(dataPath, jsonContent, "utf-8");
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    console.error("Error writing portfolio data:", dataPath, error);
    throw new Error(
      msg.includes("EACCES") || msg.includes("EPERM")
        ? "Fayl yozish ruxsati yo'q. Serverda PORTFOLIO_DATA_PATH yoki Vercel Blob ishlating."
        : "Failed to write portfolio data"
    );
  }
}

/** Faqat ko'rinadigan ma'lumotlar (public API) */
export async function getVisibleData(): Promise<Partial<PortfolioData>> {
  const data = await readPortfolioData();
  return {
    personalInfo: data.personalInfo,
    skills: data.skills.filter((s) => s.visible).sort((a, b) => a.order - b.order),
    projects: data.projects.filter((p) => p.visible).sort((a, b) => a.order - b.order),
    experiences: data.experiences.filter((e) => e.visible).sort((a, b) => a.order - b.order),
    education: data.education.filter((e) => e.visible).sort((a, b) => a.order - b.order),
    certifications: data.certifications.filter((c) => c.visible).sort((a, b) => a.order - b.order),
  };
}

export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}
