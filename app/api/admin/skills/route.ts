import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";
import { readPortfolioData, writePortfolioData, generateId } from "@/lib/data";
import { Skill } from "@/lib/types";

// Middleware: Check authentication
function checkAuth(request: NextRequest) {
  const token = request.headers.get("authorization")?.replace("Bearer ", "");
  if (!token || !verifyToken(token)) {
    return false;
  }
  return true;
}

// GET - Barcha skilllarni olish (admin)
export async function GET(request: NextRequest) {
  if (!checkAuth(request)) {
    return NextResponse.json(
      { success: false, message: "Unauthorized" },
      { status: 401 },
    );
  }

  try {
    const data = readPortfolioData();
    return NextResponse.json({ success: true, data: data.skills });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to fetch skills" },
      { status: 500 },
    );
  }
}

// POST - Yangi skill qo'shish
export async function POST(request: NextRequest) {
  if (!checkAuth(request)) {
    return NextResponse.json(
      { success: false, message: "Unauthorized" },
      { status: 401 },
    );
  }

  try {
    const body = await request.json();
    const data = readPortfolioData();

    const newSkill: Skill = {
      id: generateId(),
      category: body.category,
      name: body.name,
      visible: body.visible ?? true,
      order: body.order ?? data.skills.length + 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    data.skills.push(newSkill);
    writePortfolioData(data);

    return NextResponse.json({ success: true, data: newSkill });
  } catch (error) {
    console.error("Error creating skill:", error);
    return NextResponse.json(
      { success: false, message: "Failed to create skill" },
      { status: 500 },
    );
  }
}

// PUT - Skillni yangilash
export async function PUT(request: NextRequest) {
  if (!checkAuth(request)) {
    return NextResponse.json(
      { success: false, message: "Unauthorized" },
      { status: 401 },
    );
  }

  try {
    const body = await request.json();
    const data = readPortfolioData();

    const skillIndex = data.skills.findIndex((s) => s.id === body.id);
    if (skillIndex === -1) {
      return NextResponse.json(
        { success: false, message: "Skill not found" },
        { status: 404 },
      );
    }

    data.skills[skillIndex] = {
      ...data.skills[skillIndex],
      ...body,
      updatedAt: new Date().toISOString(),
    };

    writePortfolioData(data);

    return NextResponse.json({ success: true, data: data.skills[skillIndex] });
  } catch (error) {
    console.error("Error updating skill:", error);
    return NextResponse.json(
      { success: false, message: "Failed to update skill" },
      { status: 500 },
    );
  }
}

// DELETE - Skillni o'chirish
export async function DELETE(request: NextRequest) {
  if (!checkAuth(request)) {
    return NextResponse.json(
      { success: false, message: "Unauthorized" },
      { status: 401 },
    );
  }

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { success: false, message: "Skill ID required" },
        { status: 400 },
      );
    }

    const data = readPortfolioData();
    const filteredSkills = data.skills.filter((s) => s.id !== id);

    if (filteredSkills.length === data.skills.length) {
      return NextResponse.json(
        { success: false, message: "Skill not found" },
        { status: 404 },
      );
    }

    data.skills = filteredSkills;
    writePortfolioData(data);

    return NextResponse.json({ success: true, message: "Skill deleted" });
  } catch (error) {
    console.error("Error deleting skill:", error);
    return NextResponse.json(
      { success: false, message: "Failed to delete skill" },
      { status: 500 },
    );
  }
}
