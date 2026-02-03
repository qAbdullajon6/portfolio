import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "fallback-secret-key";

export interface JWTPayload {
  username: string;
  iat?: number;
  exp?: number;
}

export function signToken(payload: Omit<JWTPayload, "iat" | "exp">): string {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: "7d", // Token 7 kun amal qiladi
  });
}

export function verifyToken(token: string): JWTPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as JWTPayload;
  } catch (error) {
    return null;
  }
}

export function isAuthenticated(token: string | undefined): boolean {
  if (!token) return false;
  const payload = verifyToken(token);
  return payload !== null;
}

// Helper for Next.js API routes
export async function verifyAuth(request: Request): Promise<{
  authenticated: boolean;
  message?: string;
  payload?: JWTPayload;
}> {
  const authHeader = request.headers.get("Authorization");

  if (!authHeader) {
    return { authenticated: false, message: "Authorization header topilmadi" };
  }

  const token = authHeader.replace("Bearer ", "");
  const payload = verifyToken(token);

  if (!payload) {
    return {
      authenticated: false,
      message: "Token yaroqsiz yoki muddati o'tgan",
    };
  }

  return { authenticated: true, payload };
}
