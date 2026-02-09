import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";
import { readPortfolioData, writePortfolioData, generateId } from "@/lib/data";
import { Project } from "@/lib/types";

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
    return NextResponse.json({ success: true, data: data.projects });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to fetch projects" },
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

    const images = Array.isArray(body.images)
      ? body.images
      : body.image
        ? [body.image]
        : [];
    const categories = Array.isArray(body.categories)
      ? body.categories
      : body.category
        ? [body.category]
        : [];
    const githubLinks = Array.isArray(body.githubLinks)
      ? body.githubLinks
      : body.githubUrl
        ? [{ label: "GitHub", url: body.githubUrl, isPrivate: false }]
        : [];
    const newProject: Project = {
      id: generateId(),
      title: body.title,
      description: body.description,
      longDescription: body.longDescription || "",
      technologies: body.technologies || [],
      images,
      image: images[0] || body.image || "",
      githubLinks,
      githubUrl: githubLinks[0]?.url || body.githubUrl || "",
      liveUrl: body.liveUrl || "",
      swaggerUrl: body.swaggerUrl || "",
      telegramBotUrl: body.telegramBotUrl || "",
      featured: body.featured ?? false,
      visible: body.visible ?? true,
      order: body.order ?? data.projects.length + 1,
      categories,
      category: categories[0] || body.category || "",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    data.projects.push(newProject);
    writePortfolioData(data);

    return NextResponse.json({ success: true, data: newProject });
  } catch (error) {
    console.error("Error creating project:", error);
    return NextResponse.json(
      { success: false, message: "Failed to create project" },
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

    const projectIndex = data.projects.findIndex((p) => p.id === body.id);
    if (projectIndex === -1) {
      return NextResponse.json(
        { success: false, message: "Project not found" },
        { status: 404 },
      );
    }

    const prev = data.projects[projectIndex];
    const images = Array.isArray(body.images)
      ? body.images
      : body.image
        ? [body.image]
        : prev.images ?? (prev.image ? [prev.image] : []);
    const categories = Array.isArray(body.categories)
      ? body.categories
      : body.category !== undefined
        ? [body.category]
        : prev.categories ?? (prev.category ? [prev.category] : []);
    const githubLinks = Array.isArray(body.githubLinks)
      ? body.githubLinks
      : body.githubUrl !== undefined
        ? [{ label: "GitHub", url: body.githubUrl, isPrivate: false }]
        : prev.githubLinks ?? (prev.githubUrl ? [{ label: "GitHub", url: prev.githubUrl, isPrivate: false }] : []);
    data.projects[projectIndex] = {
      ...prev,
      ...body,
      images,
      image: images[0] || "",
      categories,
      category: categories[0] || "",
      githubLinks,
      githubUrl: githubLinks[0]?.url || "",
      visible: body.visible !== undefined ? body.visible : prev.visible,
      updatedAt: new Date().toISOString(),
    };

    writePortfolioData(data);

    return NextResponse.json({
      success: true,
      data: data.projects[projectIndex],
    });
  } catch (error) {
    console.error("Error updating project:", error);
    const message =
      error instanceof Error && error.message.includes("write")
        ? "Ma'lumotni saqlab bo'lmadi. Serverda fayl yozish imkoni bo'lmasa, ma'lumotlar bazasi ishlatishingiz kerak."
        : "Failed to update project";
    return NextResponse.json(
      { success: false, message },
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
        { success: false, message: "Project ID required" },
        { status: 400 },
      );
    }

    const data = readPortfolioData();
    const filteredProjects = data.projects.filter((p) => p.id !== id);

    if (filteredProjects.length === data.projects.length) {
      return NextResponse.json(
        { success: false, message: "Project not found" },
        { status: 404 },
      );
    }

    data.projects = filteredProjects;
    writePortfolioData(data);

    return NextResponse.json({ success: true, message: "Project deleted" });
  } catch (error) {
    console.error("Error deleting project:", error);
    return NextResponse.json(
      { success: false, message: "Failed to delete project" },
      { status: 500 },
    );
  }
}
