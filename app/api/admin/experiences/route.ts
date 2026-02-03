import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";
import { readPortfolioData, writePortfolioData, generateId } from "@/lib/data";
import { Experience } from "@/lib/types";

function checkAuth(request: NextRequest) {
  const token = request.headers.get("authorization")?.replace("Bearer ", "");
  return token && verifyToken(token) !== null;
}

export async function GET(request: NextRequest) {
  if (!checkAuth(request)) {
    return NextResponse.json(
      { success: false, message: "Unauthorized" },
      { status: 401 },
    );
  }

  try {
    const data = readPortfolioData();
    return NextResponse.json({ success: true, data: data.experiences });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to fetch experiences" },
      { status: 500 },
    );
  }
}

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

    const newExperience: Experience = {
      id: generateId(),
      title: body.title,
      company: body.company,
      location: body.location,
      startDate: body.startDate,
      endDate: body.endDate || "",
      current: body.current ?? false,
      responsibilities: body.responsibilities || [],
      visible: body.visible ?? true,
      order: body.order ?? data.experiences.length + 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    data.experiences.push(newExperience);
    writePortfolioData(data);

    return NextResponse.json({ success: true, data: newExperience });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to create experience" },
      { status: 500 },
    );
  }
}

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

    const index = data.experiences.findIndex((e) => e.id === body.id);
    if (index === -1) {
      return NextResponse.json(
        { success: false, message: "Experience not found" },
        { status: 404 },
      );
    }

    data.experiences[index] = {
      ...data.experiences[index],
      ...body,
      updatedAt: new Date().toISOString(),
    };

    writePortfolioData(data);
    return NextResponse.json({ success: true, data: data.experiences[index] });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to update experience" },
      { status: 500 },
    );
  }
}

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
        { success: false, message: "ID required" },
        { status: 400 },
      );
    }

    const data = readPortfolioData();
    data.experiences = data.experiences.filter((e) => e.id !== id);
    writePortfolioData(data);

    return NextResponse.json({ success: true, message: "Experience deleted" });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to delete experience" },
      { status: 500 },
    );
  }
}
