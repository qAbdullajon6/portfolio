/**
 * Portfolio ma'lumotlari API.
 * Agar tashqi backend ishlatilsa, .env.local da quyidagini o'rnating:
 *
 *   NEXT_PUBLIC_PORTFOLIO_API_URL=https://your-backend.com/api/portfolio
 *
 * Bo'sh qoldirilsa, loyihadagi /api/portfolio (local JSON) ishlatiladi.
 */

const PORTFOLIO_API_URL =
  (process.env.NEXT_PUBLIC_PORTFOLIO_API_URL || "").trim() || "/api/portfolio";

/** Portfolio API ning to'liq URL manzili */
export function getPortfolioApiUrl(): string {
  return PORTFOLIO_API_URL || "/api/portfolio";
}

/** Portfolio ma'lumotlarini API dan olish (local yoki tashqi backend) */
export async function fetchPortfolioData(): Promise<{
  success: boolean;
  data?: {
    personalInfo?: unknown;
    skills?: unknown[];
    projects?: unknown[];
    experiences?: unknown[];
    education?: unknown[];
    certifications?: unknown[];
  };
  message?: string;
}> {
  const url = getPortfolioApiUrl();
  const res = await fetch(url);
  const json = await res.json();
  if (!res.ok) {
    throw new Error(json?.message ?? "Ma'lumotlarni yuklashda xatolik");
  }
  return json;
}
