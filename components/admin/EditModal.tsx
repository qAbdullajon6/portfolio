"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { X, Save, Plus, Trash2, ChevronUp, ChevronDown } from "lucide-react";
import { toast } from "sonner";

type Section =
  | "skills"
  | "projects"
  | "experiences"
  | "education"
  | "certifications";

interface EditModalProps {
  section: Section;
  item: any;
  token: string;
  onClose: () => void;
  onSuccess: () => void;
}

export default function EditModal({
  section,
  item,
  token,
  onClose,
  onSuccess,
}: EditModalProps) {
  const [formData, setFormData] = useState(() => {
    if (item && section === "projects") {
      const images = Array.isArray(item.images) ? item.images : item.image ? [item.image] : [];
      const categories = Array.isArray(item.categories) ? item.categories : item.category ? [item.category] : [];
      const githubLinks = Array.isArray(item.githubLinks)
        ? item.githubLinks
        : item.githubUrl
          ? [{ label: "GitHub", url: item.githubUrl, isPrivate: false }]
          : [];
      return { ...item, images, categories, githubLinks };
    }
    return item || getDefaultFormData(section);
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const method = item ? "PUT" : "POST";
      const response = await fetch(`/api/admin/${section}`, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (data.success) {
        toast.success(item ? "Yangilandi!" : "Qo'shildi!");
        onSuccess();
      } else {
        toast.error(data.message || "Xatolik yuz berdi");
      }
    } catch (error) {
      toast.error("Server bilan aloqa o'rnatib bo'lmadi");
    } finally {
      setIsLoading(false);
    }
  };

  // Array field helpers
  const addArrayItem = (field: string, value: string) => {
    if (!value.trim()) return;
    const currentArray = formData[field] || [];
    setFormData({ ...formData, [field]: [...currentArray, value] });
  };

  const removeArrayItem = (field: string, index: number) => {
    const currentArray = formData[field] || [];
    setFormData({
      ...formData,
      [field]: currentArray.filter((_: any, i: number) => i !== index),
    });
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-card border border-border rounded-2xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl"
      >
        {/* Header - Fixed */}
        <div className="flex items-center justify-between px-6 py-5 sm:px-8 sm:py-6 border-b border-border flex-shrink-0">
          <h3 className="text-2xl sm:text-3xl font-bold text-foreground">
            {item ? "Tahrirlash" : "Yangi qo'shish"}
          </h3>
          <button
            onClick={onClose}
            className="p-2.5 hover:bg-muted rounded-xl transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form - Scrollable */}
        <form onSubmit={handleSubmit} className="flex flex-col flex-1 min-h-0">
          <div className="flex-1 overflow-y-auto px-6 py-6 sm:px-8 sm:py-8 space-y-6">
            {section === "skills" && (
              <SkillsForm formData={formData} setFormData={setFormData} />
            )}
            {section === "projects" && (
              <ProjectsForm
                formData={formData}
                setFormData={setFormData}
                addArrayItem={addArrayItem}
                removeArrayItem={removeArrayItem}
                token={token}
              />
            )}
            {section === "experiences" && (
              <ExperiencesForm
                formData={formData}
                setFormData={setFormData}
                addArrayItem={addArrayItem}
                removeArrayItem={removeArrayItem}
              />
            )}
            {section === "education" && (
              <EducationForm formData={formData} setFormData={setFormData} />
            )}
            {section === "certifications" && (
              <CertificationsForm
                formData={formData}
                setFormData={setFormData}
              />
            )}

            {/* Visibility Toggle */}
            <div className="flex items-center gap-3 p-5 bg-muted/30 rounded-xl">
              <input
                type="checkbox"
                id="visible"
                checked={formData.visible ?? true}
                onChange={(e) =>
                  setFormData({ ...formData, visible: e.target.checked })
                }
                className="w-5 h-5 accent-primary rounded"
              />
              <label htmlFor="visible" className="text-sm font-medium">
                Portfolio websiteda ko&apos;rsatish
              </label>
            </div>
          </div>

          {/* Actions - Fixed */}
          <div className="flex gap-4 px-6 py-5 sm:px-8 sm:py-6 border-t border-border flex-shrink-0 bg-card/80">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-5 py-3.5 bg-muted text-foreground rounded-xl hover:bg-muted/80 transition-colors font-medium"
            >
              Bekor qilish
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 px-5 py-3.5 bg-gradient-to-r from-primary to-purple-600 text-white rounded-xl hover:shadow-lg transition-all disabled:opacity-50 flex items-center justify-center gap-2 font-medium"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  Saqlash
                </>
              )}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}

// Helper function for default form data
function getDefaultFormData(section: Section) {
  switch (section) {
    case "skills":
      return { name: "", category: "", visible: true };
    case "projects":
      return {
        title: "",
        description: "",
        longDescription: "",
        technologies: [],
        images: [] as string[],
        categories: [] as string[],
        githubLinks: [] as Array<{ label: string; url: string; isPrivate?: boolean }>,
        liveUrl: "",
        swaggerUrl: "",
        telegramBotUrl: "",
        featured: false,
        visible: true,
      };
    case "experiences":
      return {
        title: "",
        company: "",
        location: "",
        startDate: "",
        endDate: "",
        current: false,
        responsibilities: [],
        visible: true,
      };
    case "education":
      return {
        degree: "",
        institution: "",
        location: "",
        startDate: "",
        endDate: "",
        description: "",
        visible: true,
      };
    case "certifications":
      return {
        name: "",
        issuer: "",
        date: "",
        url: "",
        visible: true,
      };
    default:
      return {};
  }
}

// Skills Form Component
function SkillsForm({
  formData,
  setFormData,
}: {
  formData: any;
  setFormData: (data: any) => void;
}) {
  return (
    <>
      <InputField
        label="Ko'nikma nomi *"
        placeholder="React.js"
        value={formData.name || ""}
        onChange={(value) => setFormData({ ...formData, name: value })}
        required
      />
      <InputField
        label="Kategoriya *"
        placeholder="Frontend"
        value={formData.category || ""}
        onChange={(value) => setFormData({ ...formData, category: value })}
        required
      />
      <InputField
        label="Icon (Emoji)"
        placeholder="⚛️"
        value={formData.icon || ""}
        onChange={(value) => setFormData({ ...formData, icon: value })}
      />
      <InputField
        label="Rang (Hex)"
        placeholder="#61DAFB"
        value={formData.color || ""}
        onChange={(value) => setFormData({ ...formData, color: value })}
      />
      <div className="space-y-2">
        <label className="block text-sm font-medium text-foreground mb-2.5">
          Daraja
        </label>
        <select
          value={formData.level || "O'rta"}
          onChange={(e) => setFormData({ ...formData, level: e.target.value })}
          className="w-full px-4 py-3 bg-muted border border-border rounded-xl text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="Yuqori">Yuqori</option>
          <option value="O'rta">O&apos;rta</option>
          <option value="Boshlang'ich">Boshlang&apos;ich</option>
        </select>
      </div>
    </>
  );
}

// Projects Form Component
function ProjectsForm({
  formData,
  setFormData,
  addArrayItem,
  removeArrayItem,
  token,
}: {
  formData: any;
  setFormData: (data: any) => void;
  addArrayItem: (field: string, value: string) => void;
  removeArrayItem: (field: string, index: number) => void;
  token: string;
}) {
  const [techInput, setTechInput] = useState("");
  const [uploading, setUploading] = useState(false);

  const images: string[] = Array.isArray(formData.images) ? formData.images : formData.image ? [formData.image] : [];

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const formDataUpload = new FormData();
      formDataUpload.append("file", file);
      const response = await fetch("/api/admin/upload", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formDataUpload,
      });
      const data = await response.json();
      if (data.success) {
        setFormData({ ...formData, images: [...images, data.url] });
        toast.success("Rasm yuklandi!");
      } else {
        toast.error(data.message || "Rasm yuklashda xatolik");
      }
    } catch (error) {
      toast.error("Rasm yuklashda xatolik");
    } finally {
      setUploading(false);
    }
  };

  const removeImage = (index: number) => {
    const next = images.filter((_, i) => i !== index);
    setFormData({ ...formData, images: next });
  };

  const moveImage = (index: number, direction: "up" | "down") => {
    const next = [...images];
    const target = direction === "up" ? index - 1 : index + 1;
    if (target < 0 || target >= next.length) return;
    [next[index], next[target]] = [next[target], next[index]];
    setFormData({ ...formData, images: next });
  };

  return (
    <>
      <InputField
        label="Loyiha nomi *"
        placeholder="E-Commerce Platform"
        value={formData.title || ""}
        onChange={(value) => setFormData({ ...formData, title: value })}
        required
      />
      <TextAreaField
        label="Qisqacha tavsif *"
        placeholder="Loyiha haqida qisqacha ma'lumot"
        value={formData.description || ""}
        onChange={(value) => setFormData({ ...formData, description: value })}
        required
        rows={2}
      />
      <TextAreaField
        label="To'liq tavsif"
        placeholder="Loyiha haqida batafsil ma'lumot"
        value={formData.longDescription || ""}
        onChange={(value) =>
          setFormData({ ...formData, longDescription: value })
        }
        rows={4}
      />

      {/* Kategoriyalar – bir nechta tanlash (asosiy sahifadagi filtrlarda ko'rinadi) */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-2.5">
          Kategoriyalar
        </label>
        <p className="text-xs text-muted-foreground mb-3">
          Bir nechta kategoriya tanlashingiz mumkin. Asosiy sahifada shu bo&apos;yicha filtrlash ishlaydi.
        </p>
        <div className="flex flex-wrap gap-3">
          {["Frontend", "Backend", "Full Stack", "Telegram Bot", "Qisman"].map((cat) => {
            const list: string[] = Array.isArray(formData.categories) ? formData.categories : formData.category ? [formData.category] : [];
            const checked = list.includes(cat);
            return (
              <label
                key={cat}
                className={`flex items-center gap-2 px-4 py-3 rounded-xl border-2 cursor-pointer transition-all ${
                  checked
                    ? "bg-primary/20 border-primary text-primary"
                    : "bg-muted/30 border-border hover:border-primary/50"
                }`}
              >
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => {
                    const next = checked ? list.filter((c) => c !== cat) : [...list, cat];
                    setFormData({ ...formData, categories: next, category: next[0] || "" });
                  }}
                  className="w-4 h-4 accent-primary rounded"
                />
                <span className="font-medium text-sm">{cat}</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Technologies Array */}
      <div>
        <label className="block text-sm font-medium mb-2">Texnologiyalar</label>
        <div className="flex gap-2 mb-2">
          <input
            type="text"
            placeholder="React.js"
            value={techInput}
            onChange={(e) => setTechInput(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addArrayItem("technologies", techInput);
                setTechInput("");
              }
            }}
            className="flex-1 px-4 py-3 bg-background border border-border rounded-xl outline-none focus:ring-2 focus:ring-primary"
          />
          <button
            type="button"
            onClick={() => {
              addArrayItem("technologies", techInput);
              setTechInput("");
            }}
            className="px-4 py-2 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {(formData.technologies || []).map((tech: string, index: number) => (
            <span
              key={index}
              className="px-3 py-1 bg-primary/10 text-primary rounded-lg text-sm flex items-center gap-2"
            >
              {tech}
              <button
                type="button"
                onClick={() => removeArrayItem("technologies", index)}
                className="hover:text-destructive transition-colors"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
        </div>
      </div>

      {/* Rasmlar – 400×400 kvadrat, bir qatorga bir nechta */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-2.5">
          Loyiha rasmlari
        </label>
        <p className="text-xs text-muted-foreground mb-3">
          Birinchi rasm asosiy rasm. Rasmlar 400×400 kvadratda ko&apos;rsatiladi, cho&apos;zilmaydi. Tartibni yuqoriga/pastga bilan o&apos;zgartiring.
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {images.map((url, index) => (
            <div
              key={`${url}-${index}`}
              className="group rounded-xl border border-border bg-muted/20 overflow-hidden"
            >
              {/* 400×400 kvadrat – object-cover bilan cho'zilmaydi */}
              <div className="relative w-full max-w-[400px] aspect-square overflow-hidden bg-muted mx-auto">
                <img
                  src={url}
                  alt={`Rasm ${index + 1}`}
                  className="w-full h-full object-cover"
                />
                {index === 0 && (
                  <span className="absolute top-2 left-2 px-2 py-1 text-xs font-medium bg-primary text-primary-foreground rounded">
                    Asosiy
                  </span>
                )}
              </div>
              {/* Tugmalar */}
              <div className="flex items-center justify-center gap-2 p-2 border-t border-border">
                <button
                  type="button"
                  onClick={() => moveImage(index, "up")}
                  disabled={index === 0}
                  className="p-2 rounded-lg bg-background border border-border hover:bg-muted disabled:opacity-40 disabled:cursor-not-allowed"
                  title="Yuqoriga"
                >
                  <ChevronUp className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => moveImage(index, "down")}
                  disabled={index === images.length - 1}
                  className="p-2 rounded-lg bg-background border border-border hover:bg-muted disabled:opacity-40 disabled:cursor-not-allowed"
                  title="Pastga"
                >
                  <ChevronDown className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="p-2 rounded-lg bg-destructive/10 text-destructive hover:bg-destructive/20 transition-colors"
                  title="O'chirish"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
          {/* Rasm qo'shish */}
          <label className="flex flex-col items-center justify-center gap-2 min-h-[200px] sm:min-h-[280px] rounded-xl border-2 border-dashed border-primary/40 bg-primary/5 hover:bg-primary/10 text-primary cursor-pointer transition-colors p-4">
            {uploading ? (
              <>
                <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                <span className="text-sm font-medium">Yuklanmoqda...</span>
              </>
            ) : (
              <>
                <Plus className="w-8 h-8" />
                <span className="text-sm font-medium">Rasm qo&apos;shish</span>
              </>
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              disabled={uploading}
              className="hidden"
            />
          </label>
        </div>
      </div>

      {/* GitHub linklar – bir nechta (frontend, backend, etc.) */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-2.5">
          GitHub havolalari
        </label>
        <p className="text-xs text-muted-foreground mb-3">
          Frontend, Backend yoki boshqa repolar uchun alohida linklar qo&apos;shing. Berk repo bo&apos;lsa belgilang.
        </p>
        <div className="space-y-3">
          {(formData.githubLinks || []).map((link: { label: string; url: string; isPrivate?: boolean }, index: number) => (
            <div
              key={index}
              className="flex flex-wrap gap-2 p-3 rounded-xl border border-border bg-muted/20"
            >
              <input
                type="text"
                placeholder="Nomi (masalan: Frontend)"
                value={link.label}
                onChange={(e) => {
                  const next = [...(formData.githubLinks || [])];
                  next[index] = { ...next[index], label: e.target.value };
                  setFormData({ ...formData, githubLinks: next });
                }}
                className="w-32 px-3 py-2 bg-background border border-border rounded-lg outline-none focus:ring-2 focus:ring-primary text-sm"
              />
              <input
                type="text"
                placeholder="https://github.com/..."
                value={link.url}
                onChange={(e) => {
                  const next = [...(formData.githubLinks || [])];
                  next[index] = { ...next[index], url: e.target.value };
                  setFormData({ ...formData, githubLinks: next });
                }}
                className="flex-1 min-w-[200px] px-3 py-2 bg-background border border-border rounded-lg outline-none focus:ring-2 focus:ring-primary text-sm"
              />
              <label className="flex items-center gap-2 px-3 py-2 rounded-lg border border-border bg-background cursor-pointer hover:bg-muted/50">
                <input
                  type="checkbox"
                  checked={link.isPrivate ?? false}
                  onChange={(e) => {
                    const next = [...(formData.githubLinks || [])];
                    next[index] = { ...next[index], isPrivate: e.target.checked };
                    setFormData({ ...formData, githubLinks: next });
                  }}
                  className="w-4 h-4 accent-primary"
                />
                <span className="text-xs text-muted-foreground whitespace-nowrap">Berk</span>
              </label>
              <button
                type="button"
                onClick={() => {
                  const next = (formData.githubLinks || []).filter((_: unknown, i: number) => i !== index);
                  setFormData({ ...formData, githubLinks: next });
                }}
                className="p-2 rounded-lg bg-destructive/10 text-destructive hover:bg-destructive/20 transition-colors"
                title="O'chirish"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => {
              const next = [...(formData.githubLinks || []), { label: "", url: "", isPrivate: false }];
              setFormData({ ...formData, githubLinks: next });
            }}
            className="flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors text-sm font-medium"
          >
            <Plus className="w-4 h-4" />
            GitHub link qo&apos;shish
          </button>
        </div>
      </div>

      <InputField
        label="Live Demo URL"
        placeholder="https://example.com"
        value={formData.liveUrl || ""}
        onChange={(value) => setFormData({ ...formData, liveUrl: value })}
      />
      <InputField
        label="API / Swagger URL"
        placeholder="https://api.example.com/docs yoki Swagger link"
        value={formData.swaggerUrl || ""}
        onChange={(value) => setFormData({ ...formData, swaggerUrl: value })}
      />
      <InputField
        label="Telegram Bot URL"
        placeholder="https://t.me/your_bot yoki t.me/your_bot"
        value={formData.telegramBotUrl || ""}
        onChange={(value) => setFormData({ ...formData, telegramBotUrl: value })}
      />

      <div className="flex items-center gap-2 p-3 bg-muted/30 rounded-lg">
        <input
          type="checkbox"
          id="featured"
          checked={formData.featured ?? false}
          onChange={(e) =>
            setFormData({ ...formData, featured: e.target.checked })
          }
          className="w-4 h-4 accent-primary"
        />
        <label htmlFor="featured" className="text-sm font-medium">
          Asosiy loyihalar ro'yxatiga qo'shish
        </label>
      </div>
    </>
  );
}

// Experiences Form Component
function ExperiencesForm({
  formData,
  setFormData,
  addArrayItem,
  removeArrayItem,
}: {
  formData: any;
  setFormData: (data: any) => void;
  addArrayItem: (field: string, value: string) => void;
  removeArrayItem: (field: string, index: number) => void;
}) {
  const [respInput, setRespInput] = useState("");

  return (
    <>
      <InputField
        label="Lavozim *"
        placeholder="Full Stack Developer"
        value={formData.title || ""}
        onChange={(value) => setFormData({ ...formData, title: value })}
        required
      />
      <InputField
        label="Kompaniya *"
        placeholder="Tech Company"
        value={formData.company || ""}
        onChange={(value) => setFormData({ ...formData, company: value })}
        required
      />
      <InputField
        label="Joylashuv *"
        placeholder="Tashkent, Uzbekistan"
        value={formData.location || ""}
        onChange={(value) => setFormData({ ...formData, location: value })}
        required
      />

      <div className="grid grid-cols-2 gap-4">
        <InputField
          label="Boshlanish sanasi *"
          type="date"
          value={formData.startDate || ""}
          onChange={(value) => setFormData({ ...formData, startDate: value })}
          required
        />
        <InputField
          label="Tugash sanasi"
          type="date"
          value={formData.endDate || ""}
          onChange={(value) => setFormData({ ...formData, endDate: value })}
          disabled={formData.current}
        />
      </div>

      <div className="flex items-center gap-2 p-3 bg-muted/30 rounded-lg">
        <input
          type="checkbox"
          id="current"
          checked={formData.current ?? false}
          onChange={(e) =>
            setFormData({ ...formData, current: e.target.checked, endDate: "" })
          }
          className="w-4 h-4 accent-primary"
        />
        <label htmlFor="current" className="text-sm font-medium">
          Hozirda shu yerda ishlayman
        </label>
      </div>

      {/* Responsibilities Array */}
      <div>
        <label className="block text-sm font-medium mb-2">
          Mas'uliyatlar va yutuqlar
        </label>
        <div className="flex gap-2 mb-2">
          <input
            type="text"
            placeholder="Developed and maintained web applications..."
            value={respInput}
            onChange={(e) => setRespInput(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addArrayItem("responsibilities", respInput);
                setRespInput("");
              }
            }}
            className="flex-1 px-4 py-3 bg-background border border-border rounded-xl outline-none focus:ring-2 focus:ring-primary"
          />
          <button
            type="button"
            onClick={() => {
              addArrayItem("responsibilities", respInput);
              setRespInput("");
            }}
            className="px-4 py-2 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
        <div className="space-y-2">
          {(formData.responsibilities || []).map(
            (resp: string, index: number) => (
              <div
                key={index}
                className="flex items-start gap-2 p-2 bg-muted/30 rounded-lg text-sm"
              >
                <span className="flex-1">{resp}</span>
                <button
                  type="button"
                  onClick={() => removeArrayItem("responsibilities", index)}
                  className="text-destructive hover:text-destructive/80 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ),
          )}
        </div>
      </div>
    </>
  );
}

// Education Form Component
function EducationForm({
  formData,
  setFormData,
}: {
  formData: any;
  setFormData: (data: any) => void;
}) {
  return (
    <>
      <InputField
        label="Daraja *"
        placeholder="Bachelor's Degree in Computer Science"
        value={formData.degree || ""}
        onChange={(value) => setFormData({ ...formData, degree: value })}
        required
      />
      <InputField
        label="Muassasa *"
        placeholder="Tashkent State Technical University"
        value={formData.institution || ""}
        onChange={(value) => setFormData({ ...formData, institution: value })}
        required
      />
      <InputField
        label="Joylashuv *"
        placeholder="Tashkent, Uzbekistan"
        value={formData.location || ""}
        onChange={(value) => setFormData({ ...formData, location: value })}
        required
      />

      <div className="grid grid-cols-2 gap-4">
        <InputField
          label="Boshlanish sanasi *"
          type="date"
          value={formData.startDate || ""}
          onChange={(value) => setFormData({ ...formData, startDate: value })}
          required
        />
        <InputField
          label="Tugash sanasi"
          type="date"
          value={formData.endDate || ""}
          onChange={(value) => setFormData({ ...formData, endDate: value })}
        />
      </div>

      <TextAreaField
        label="Tavsif"
        placeholder="Specialized in Software Engineering..."
        value={formData.description || ""}
        onChange={(value) => setFormData({ ...formData, description: value })}
        rows={3}
      />
    </>
  );
}

// Certifications Form Component
function CertificationsForm({
  formData,
  setFormData,
}: {
  formData: any;
  setFormData: (data: any) => void;
}) {
  return (
    <>
      <InputField
        label="Sertifikat nomi *"
        placeholder="Modern React with Redux"
        value={formData.name || ""}
        onChange={(value) => setFormData({ ...formData, name: value })}
        required
      />
      <InputField
        label="Kim tomonidan berilgan *"
        placeholder="Udemy"
        value={formData.issuer || ""}
        onChange={(value) => setFormData({ ...formData, issuer: value })}
        required
      />
      <InputField
        label="Sana *"
        type="date"
        value={formData.date || ""}
        onChange={(value) => setFormData({ ...formData, date: value })}
        required
      />
      <InputField
        label="Sertifikat URL"
        placeholder="https://certificate-url.com"
        value={formData.url || ""}
        onChange={(value) => setFormData({ ...formData, url: value })}
      />
    </>
  );
}

// Reusable Input Component
function InputField({
  label,
  placeholder,
  value,
  onChange,
  type = "text",
  required = false,
  disabled = false,
}: {
  label: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  required?: boolean;
  disabled?: boolean;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-foreground mb-2.5">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        disabled={disabled}
        className="w-full px-4 py-3.5 bg-background border border-border rounded-xl outline-none focus:ring-2 focus:ring-primary transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      />
    </div>
  );
}

// Reusable TextArea Component
function TextAreaField({
  label,
  placeholder,
  value,
  onChange,
  rows = 3,
  required = false,
}: {
  label: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  rows?: number;
  required?: boolean;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-foreground mb-2.5">{label}</label>
      <textarea
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        rows={rows}
        className="w-full px-4 py-3.5 bg-background border border-border rounded-xl outline-none focus:ring-2 focus:ring-primary transition-all resize-none"
      />
    </div>
  );
}
