import { NextResponse } from "next/server";
import { getVisibleData } from "@/lib/data";

// Public endpoint - faqat ko'rinadigan ma'lumotlarni qaytaradi
export async function GET() {
  try {
    const data = await getVisibleData();
    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to fetch data" },
      { status: 500 },
    );
  }
}
