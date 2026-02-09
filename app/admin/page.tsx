"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Code,
  Briefcase,
  GraduationCap,
  Award,
  User,
  LogOut,
  Eye,
  EyeOff,
  Plus,
  Edit,
  Trash2,
  ChevronUp,
  ChevronDown,
} from "lucide-react";
import { toast } from "sonner";
import {
  Skill,
  Project,
  Experience,
  Education,
  Certification,
} from "@/lib/types";
import EditModal from "@/components/admin/EditModal";

type Section =
  | "skills"
  | "projects"
  | "experiences"
  | "education"
  | "certifications";

export default function AdminDashboard() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [activeSection, setActiveSection] = useState<Section>("skills");
  const [token, setToken] = useState<string>("");

  // Data states
  const [skills, setSkills] = useState<Skill[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [education, setEducation] = useState<Education[]>([]);
  const [certifications, setCertifications] = useState<Certification[]>([]);

  // Modal states
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);

  useEffect(() => {
    const adminToken = Cookies.get("admin_token");
    if (!adminToken) {
      router.push("/admin/login");
      return;
    }
    setToken(adminToken);
    setIsLoading(false);
    loadData(adminToken);
  }, [router]);

  const loadData = async (authToken: string) => {
    try {
      // Load all data
      const headers = { Authorization: `Bearer ${authToken}` };

      const [
        skillsRes,
        projectsRes,
        experiencesRes,
        educationRes,
        certificationsRes,
      ] = await Promise.all([
        fetch("/api/admin/skills", { headers }),
        fetch("/api/admin/projects", { headers }),
        fetch("/api/admin/experiences", { headers }),
        fetch("/api/admin/education", { headers }),
        fetch("/api/admin/certifications", { headers }),
      ]);

      const [
        skillsData,
        projectsData,
        experiencesData,
        educationData,
        certificationsData,
      ] = await Promise.all([
        skillsRes.json(),
        projectsRes.json(),
        experiencesRes.json(),
        educationRes.json(),
        certificationsRes.json(),
      ]);

      if (skillsData.success) setSkills(skillsData.data);
      if (projectsData.success) setProjects(projectsData.data);
      if (experiencesData.success) setExperiences(experiencesData.data);
      if (educationData.success) setEducation(educationData.data);
      if (certificationsData.success)
        setCertifications(certificationsData.data);
    } catch (error) {
      toast.error("Ma'lumotlarni yuklashda xatolik");
    }
  };

  const handleLogout = () => {
    Cookies.remove("admin_token");
    router.push("/admin/login");
    toast.success("Tizimdan chiqdingiz");
  };

  const toggleVisibility = async (id: string, currentVisibility: boolean) => {
    try {
      const endpoint = `/api/admin/${activeSection}`;
      const response = await fetch(endpoint, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ id, visible: !currentVisibility }),
      });

      const data = await response.json();
      if (!response.ok) {
        toast.error(data?.message || `Server xatosi (${response.status})`);
        return;
      }
      if (data.success) {
        loadData(token);
        toast.success(currentVisibility ? "Yashirildi" : "Ko'rsatildi");
      } else {
        toast.error(data.message || "Yashirish/ko'rsatish amalga oshmadi");
      }
    } catch (error) {
      console.error("toggleVisibility error:", error);
      toast.error("Xatolik yuz berdi. Server javob bermayotgan bo'lishi mumkin.");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Rostdan ham o'chirmoqchimisiz?")) return;

    try {
      const endpoint = `/api/admin/${activeSection}?id=${id}`;
      const response = await fetch(endpoint, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await response.json();
      if (data.success) {
        loadData(token);
        toast.success("O'chirildi");
      }
    } catch (error) {
      toast.error("Xatolik yuz berdi");
    }
  };

  const handleReorder = async (index: number, direction: "up" | "down") => {
    const list = getCurrentData().slice().sort((a: any, b: any) => a.order - b.order);
    const otherIndex = direction === "up" ? index - 1 : index + 1;
    if (otherIndex < 0 || otherIndex >= list.length) return;
    const a = list[index];
    const b = list[otherIndex];
    try {
      const endpoint = `/api/admin/${activeSection}`;
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };
      await Promise.all([
        fetch(endpoint, { method: "PUT", headers, body: JSON.stringify({ id: a.id, order: b.order }) }),
        fetch(endpoint, { method: "PUT", headers, body: JSON.stringify({ id: b.id, order: a.order }) }),
      ]);
      loadData(token);
      toast.success("Tartib o'zgartirildi");
    } catch (error) {
      toast.error("Tartibni o'zgartirishda xatolik");
    }
  };

  const handleEdit = (item: any) => {
    setEditingItem(item);
    setShowModal(true);
  };

  const handleAdd = () => {
    setEditingItem(null);
    setShowModal(true);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const getCurrentData = () => {
    switch (activeSection) {
      case "skills":
        return skills;
      case "projects":
        return projects;
      case "experiences":
        return experiences;
      case "education":
        return education;
      case "certifications":
        return certifications;
      default:
        return [];
    }
  };

  const sections = [
    {
      id: "skills" as Section,
      label: "Ko'nikmalar",
      icon: Code,
      count: skills.length,
    },
    {
      id: "projects" as Section,
      label: "Loyihalar",
      icon: Briefcase,
      count: projects.length,
    },
    {
      id: "experiences" as Section,
      label: "Tajriba",
      icon: User,
      count: experiences.length,
    },
    {
      id: "education" as Section,
      label: "Ta'lim",
      icon: GraduationCap,
      count: education.length,
    },
    {
      id: "certifications" as Section,
      label: "Sertifikatlar",
      icon: Award,
      count: certifications.length,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted">
      {/* Header */}
      <header className="bg-card/60 backdrop-blur-md border-b border-border sticky top-0 z-40 shadow-lg shadow-black/5">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-10 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/30 flex items-center justify-center shadow-inner">
                <LayoutDashboard className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground tracking-tight">
                  Admin Panel
                </h1>
                <p className="text-sm text-muted-foreground mt-0.5">
                  Portfolio boshqaruvi
                </p>
              </div>
            </div>
            <div className="flex items-center gap-5">
              <a
                href="/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors px-4 py-2 rounded-xl hover:bg-primary/10"
              >
                Portfolio →
              </a>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-5 py-2.5 bg-destructive/10 text-destructive rounded-xl hover:bg-destructive/20 transition-colors font-medium border border-destructive/20"
              >
                <LogOut className="w-5 h-5" />
                Chiqish
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-[1600px] mx-auto px-6 lg:px-10 py-10 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
          {/* Sidebar */}
          <aside className="lg:col-span-3 xl:col-span-3">
            <div className="bg-card/60 backdrop-blur-md border border-border rounded-2xl p-6 sticky top-28 shadow-xl shadow-black/5">
              <nav className="space-y-3">
                {sections.map((section) => {
                  const Icon = section.icon;
                  return (
                    <button
                      key={section.id}
                      onClick={() => setActiveSection(section.id)}
                      className={`w-full flex items-center justify-between px-5 py-4 rounded-xl transition-all duration-200 text-left ${
                        activeSection === section.id
                          ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                          : "hover:bg-muted/80 text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <Icon className="w-5 h-5 flex-shrink-0" />
                        <span className="font-medium text-base">
                          {section.label}
                        </span>
                      </div>
                      <span
                        className={`text-sm font-semibold min-w-[2rem] h-8 flex items-center justify-center rounded-lg px-2 ${
                          activeSection === section.id
                            ? "bg-white/20"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {section.count}
                      </span>
                    </button>
                  );
                })}
              </nav>
            </div>
          </aside>

          {/* Main Content */}
          <main className="lg:col-span-9 xl:col-span-9 space-y-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <StatsCard
                title="Jami elementlar"
                value={getCurrentData().length}
                icon={<LayoutDashboard className="w-6 h-6" />}
                color="blue"
              />
              <StatsCard
                title="Ko'rinuvchilar"
                value={
                  getCurrentData().filter((item: any) => item.visible).length
                }
                icon={<Eye className="w-6 h-6" />}
                color="green"
              />
              <StatsCard
                title="Yashirin"
                value={
                  getCurrentData().filter((item: any) => !item.visible).length
                }
                icon={<EyeOff className="w-6 h-6" />}
                color="orange"
              />
            </div>

            {/* Data Section */}
            <div className="bg-card/60 backdrop-blur-md border border-border rounded-2xl p-8 lg:p-10 shadow-xl shadow-black/5">
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 pb-6 mb-6 border-b border-border">
                <div>
                  <h2 className="text-2xl lg:text-3xl font-bold text-foreground tracking-tight">
                    {sections.find((s) => s.id === activeSection)?.label}
                  </h2>
                  <p className="text-muted-foreground mt-2">
                    {getCurrentData().length} ta element
                  </p>
                </div>
                <button
                  onClick={handleAdd}
                  className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-purple-600 text-white rounded-xl hover:shadow-lg hover:shadow-primary/30 transition-all font-medium shrink-0"
                >
                  <Plus className="w-5 h-5" />
                  Yangi qo&apos;shish
                </button>
              </div>

              {/* Data Grid */}
              <div className="space-y-4">
                {getCurrentData().length === 0 ? (
                  <div className="text-center py-20 lg:py-24 rounded-2xl bg-muted/20 border border-dashed border-border">
                    <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-muted/50 flex items-center justify-center">
                      <LayoutDashboard className="w-10 h-10 text-muted-foreground" />
                    </div>
                    <p className="text-foreground text-lg font-semibold mb-2">
                      Ma&apos;lumot topilmadi
                    </p>
                    <p className="text-muted-foreground max-w-sm mx-auto mb-6">
                      Yangi element qo&apos;shish uchun yuqoridagi tugmani bosing
                    </p>
                  </div>
                ) : (
                  getCurrentData()
                    .slice()
                    .sort((a: any, b: any) => a.order - b.order)
                    .map((item: any, index: number) => (
                      <DataCard
                        key={item.id}
                        item={item}
                        section={activeSection}
                        orderIndex={index}
                        totalCount={getCurrentData().length}
                        onToggleVisibility={() =>
                          toggleVisibility(item.id, item.visible)
                        }
                        onEdit={() => handleEdit(item)}
                        onDelete={() => handleDelete(item.id)}
                        onMoveUp={() => handleReorder(index, "up")}
                        onMoveDown={() => handleReorder(index, "down")}
                      />
                    ))
                )}
              </div>
            </div>
          </main>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <EditModal
          section={activeSection}
          item={editingItem}
          token={token}
          onClose={() => {
            setShowModal(false);
            setEditingItem(null);
          }}
          onSuccess={() => {
            setShowModal(false);
            setEditingItem(null);
            loadData(token);
          }}
        />
      )}
    </div>
  );
}

// Data Card Component
function DataCard({
  item,
  section,
  orderIndex,
  totalCount,
  onToggleVisibility,
  onEdit,
  onDelete,
  onMoveUp,
  onMoveDown,
}: {
  item: any;
  section: Section;
  orderIndex: number;
  totalCount: number;
  onToggleVisibility: () => void;
  onEdit: () => void;
  onDelete: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
}) {
  const getDisplayText = () => {
    switch (section) {
      case "skills":
        return item.name;
      case "projects":
        return item.title;
      case "experiences":
        return item.title;
      case "education":
        return item.degree;
      case "certifications":
        return item.name;
      default:
        return "";
    }
  };

  const getSubText = () => {
    switch (section) {
      case "skills":
        return item.category;
      case "projects":
        return item.description;
      case "experiences":
        return item.company;
      case "education":
        return item.institution;
      case "certifications":
        return item.issuer;
      default:
        return "";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2 }}
      className={`group p-6 lg:p-7 rounded-2xl border-2 transition-all duration-200 cursor-pointer ${
        item.visible
          ? "bg-gradient-to-br from-background to-card border-border hover:border-primary/50 hover:shadow-xl hover:shadow-primary/5"
          : "bg-muted/30 border-muted opacity-75 hover:opacity-100"
      }`}
    >
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">
        <div className="flex items-start gap-3 flex-1 min-w-0">
          {/* Tartib tugmalari */}
          <div className="flex flex-col gap-1 flex-shrink-0">
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); onMoveUp(); }}
              disabled={orderIndex === 0}
              className="p-2 rounded-lg bg-muted/80 hover:bg-muted border border-border disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              title="Yuqoriga"
            >
              <ChevronUp className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); onMoveDown(); }}
              disabled={orderIndex === totalCount - 1}
              className="p-2 rounded-lg bg-muted/80 hover:bg-muted border border-border disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              title="Pastga"
            >
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>
          <div className="flex-1 min-w-0 space-y-2">
          <div className="flex flex-wrap items-center gap-3">
            <h3 className="font-bold text-lg lg:text-xl text-foreground group-hover:text-primary transition-colors">
              {getDisplayText()}
            </h3>
            {!item.visible && (
              <span className="px-3 py-1 text-xs font-medium bg-amber-500/10 text-amber-600 dark:text-amber-400 rounded-full border border-amber-500/20">
                Yashirin
              </span>
            )}
          </div>
          <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
            {getSubText()}
          </p>
          </div>
        </div>
        <div className="flex items-center gap-3 flex-shrink-0">
          <button
            onClick={onToggleVisibility}
            className={`p-3 rounded-xl transition-all hover:scale-105 ${
              item.visible
                ? "bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/20"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
            title={item.visible ? "Yashirish" : "Ko'rsatish"}
          >
            {item.visible ? (
              <Eye className="w-5 h-5" />
            ) : (
              <EyeOff className="w-5 h-5" />
            )}
          </button>
          <button
            onClick={onEdit}
            className="p-3 rounded-xl bg-primary/10 text-primary hover:bg-primary/20 transition-all hover:scale-105"
            title="Tahrirlash"
          >
            <Edit className="w-5 h-5" />
          </button>
          <button
            onClick={onDelete}
            className="p-3 rounded-xl bg-destructive/10 text-destructive hover:bg-destructive/20 transition-all hover:scale-105"
            title="O'chirish"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

// Stats Card Component
function StatsCard({
  title,
  value,
  icon,
  color,
}: {
  title: string;
  value: number;
  icon: React.ReactNode;
  color: "blue" | "green" | "orange";
}) {
  const colorClasses = {
    blue: "from-blue-500 to-cyan-500",
    green: "from-green-500 to-emerald-500",
    orange: "from-orange-500 to-amber-500",
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-card/60 backdrop-blur-md border border-border rounded-2xl p-6 hover:shadow-xl hover:shadow-black/5 transition-all duration-200"
    >
      <div className="flex items-center justify-between gap-4 mb-3">
        <div
          className={`p-3 rounded-xl bg-gradient-to-br ${colorClasses[color]} text-white shadow-lg`}
        >
          {icon}
        </div>
        <span className="text-3xl lg:text-4xl font-bold text-foreground tabular-nums">
          {value}
        </span>
      </div>
      <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
    </motion.div>
  );
}
