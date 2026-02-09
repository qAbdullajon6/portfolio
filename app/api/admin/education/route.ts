import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";
import { readPortfolioData, writePortfolioData, generateId } from "@/lib/data";
import { Education } from "@/lib/types";

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
    const data = await readPortfolioData();
    return NextResponse.json({ success: true, data: data.education });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to fetch education" },
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
    const data = await readPortfolioData();

    const newEducation: Education = {
      id: generateId(),
      degree: body.degree,
      institution: body.institution,
      location: body.location,
      startDate: body.startDate,
      endDate: body.endDate || "",
      description: body.description || "",
      visible: body.visible ?? true,
      order: body.order ?? data.education.length + 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    data.education.push(newEducation);
    await writePortfolioData(data);

    return NextResponse.json({ success: true, data: newEducation });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to create education" },
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
    const data = await readPortfolioData();

    const index = data.education.findIndex((e) => e.id === body.id);
    if (index === -1) {
      return NextResponse.json(
        { success: false, message: "Education not found" },
        { status: 404 },
      );
    }

    data.education[index] = {
      ...data.education[index],
      ...body,
      updatedAt: new Date().toISOString(),
    };

    await writePortfolioData(data);
    return NextResponse.json({ success: true, data: data.education[index] });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to update education" },
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

    const data = await readPortfolioData();
    data.education = data.education.filter((e) => e.id !== id);
    await writePortfolioData(data);

    return NextResponse.json({ success: true, message: "Education deleted" });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to delete education" },
      { status: 500 },
    );
  }
}
