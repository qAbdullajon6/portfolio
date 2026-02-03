import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";
import { readPortfolioData, writePortfolioData, generateId } from "@/lib/data";
import { Certification } from "@/lib/types";

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
    return NextResponse.json({ success: true, data: data.certifications });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to fetch certifications" },
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

    const newCertification: Certification = {
      id: generateId(),
      name: body.name,
      issuer: body.issuer,
      date: body.date,
      url: body.url || "",
      visible: body.visible ?? true,
      order: body.order ?? data.certifications.length + 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    data.certifications.push(newCertification);
    writePortfolioData(data);

    return NextResponse.json({ success: true, data: newCertification });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to create certification" },
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

    const index = data.certifications.findIndex((c) => c.id === body.id);
    if (index === -1) {
      return NextResponse.json(
        { success: false, message: "Certification not found" },
        { status: 404 },
      );
    }

    data.certifications[index] = {
      ...data.certifications[index],
      ...body,
      updatedAt: new Date().toISOString(),
    };

    writePortfolioData(data);
    return NextResponse.json({
      success: true,
      data: data.certifications[index],
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to update certification" },
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
    data.certifications = data.certifications.filter((c) => c.id !== id);
    writePortfolioData(data);

    return NextResponse.json({
      success: true,
      message: "Certification deleted",
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to delete certification" },
      { status: 500 },
    );
  }
}
