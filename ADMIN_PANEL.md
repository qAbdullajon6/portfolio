# Admin Panel - Portfolio Boshqaruv Tizimi

Portfolio website uchun to'liq funksional admin panel. Skills, Projects, Experience, Education va Certifications bo'limlarini boshqarish imkoniyati.

## 🚀 Xususiyatlar

### ✅ Authentication

- JWT token asosida autentifikatsiya
- Secure login/logout
- Token 7 kun amal qiladi

### 📊 Ma'lumotlar Boshqaruvi

- **Skills** - Ko'nikmalarni qo'shish/tahrirlash/o'chirish
- **Projects** - Loyihalarni boshqarish
- **Experiences** - Ish tajribasini boshqarish
- **Education** - Ta'lim ma'lumotlarini boshqarish
- **Certifications** - Sertifikatlarni boshqarish

### 👁️ Visibility Control

- Har bir element uchun ko'rsatish/yashirish funksiyasi
- Visible = true -> Portfolio websiteda ko'rinadi
- Visible = false -> Faqat admin panelda ko'rinadi

### 🎨 Modern UI

- Responsive dizayn
- Dark mode support
- Smooth animations (Framer Motion)
- Gradient colors va glassmorphism

## 📝 O'rnatish

### 1. Environment Variables

`.env.local` faylini yarating:

```bash
# Admin Panel Authentication
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin123
```

### 2. Data File

Ma'lumotlar `data/portfolio.json` da saqlanadi. Birinchi martada default ma'lumotlar bilan yaratilgan.

## 🔐 Kirish

### Login Sahifasi

URL: `http://localhost:3000/admin/login`

**Default credentials:**

- Username: `admin`
- Password: `admin123`

> ⚠️ **Muhim**: Production da parolni o'zgartiring!

### Admin Dashboard

Login'dan keyin: `http://localhost:3000/admin/dashboard`

## 📖 Foydalanish

### Skills Boshqarish

1. Sidebar'dan "Ko'nikmalar" ni tanlang
2. "Qo'shish" tugmasini bosing
3. Ko'nikma nomi va kategoriyasini kiriting
4. Visibility'ni sozlang
5. Saqlang

### Projects Boshqarish

1. "Loyihalar" bo'limiga o'ting
2. Yangi loyiha qo'shish yoki mavjudni tahrirlash
3. Title, description, technologies va boshqa ma'lumotlarni kiriting
4. Featured va visibility sozlamalarini belgilang

### Visibility Toggle

Har bir element uchun:

- 👁️ **Ko'z belgisi** - Element ko'rinadi
- 👁️‍🗨️ **Yopiq ko'z** - Element yashirin

Ko'z belgisiga bosib, elementni ko'rsatish/yashirishingiz mumkin.

### Tahrirlash

- ✏️ **Edit tugmasi** - Elementni tahrirlash
- 🗑️ **Delete tugmasi** - Elementni o'chirish

## 🗂️ Ma'lumotlar Tuzilmasi

### Skills

```json
{
  "id": "unique-id",
  "category": "Frontend",
  "name": "React.js",
  "visible": true,
  "order": 1,
  "createdAt": "2026-02-02T10:00:00Z",
  "updatedAt": "2026-02-02T10:00:00Z"
}
```

### Projects

```json
{
  "id": "unique-id",
  "title": "Project Name",
  "description": "Short description",
  "longDescription": "Detailed description",
  "technologies": ["React", "Node.js"],
  "image": "image-url",
  "githubUrl": "github-link",
  "liveUrl": "live-demo-link",
  "featured": true,
  "visible": true,
  "order": 1,
  "createdAt": "2026-02-02T10:00:00Z",
  "updatedAt": "2026-02-02T10:00:00Z"
}
```

## 🔌 API Endpoints

### Public API

```
GET /api/portfolio - Faqat visible ma'lumotlarni qaytaradi
```

### Admin API (Authentication kerak)

```
# Login
POST /api/admin/login

# Skills
GET    /api/admin/skills
POST   /api/admin/skills
PUT    /api/admin/skills
DELETE /api/admin/skills?id=xxx

# Projects
GET    /api/admin/projects
POST   /api/admin/projects
PUT    /api/admin/projects
DELETE /api/admin/projects?id=xxx

# Experiences
GET    /api/admin/experiences
POST   /api/admin/experiences
PUT    /api/admin/experiences
DELETE /api/admin/experiences?id=xxx

# Education
GET    /api/admin/education
POST   /api/admin/education
PUT    /api/admin/education
DELETE /api/admin/education?id=xxx

# Certifications
GET    /api/admin/certifications
POST   /api/admin/certifications
PUT    /api/admin/certifications
DELETE /api/admin/certifications?id=xxx
```

### Authentication Header

```javascript
headers: {
  'Authorization': 'Bearer YOUR_JWT_TOKEN'
}
```

## 🛡️ Xavfsizlik

1. **JWT Token**: 7 kun amal qiladi, cookie'da saqlanadi
2. **API Protection**: Barcha admin API'lar JWT token bilan himoyalangan
3. **Environment Variables**: Sensitiv ma'lumotlar .env.local da
4. **.gitignore**: .env.local va data/portfolio.json gitignore'da

## 📱 Responsive Design

Admin panel barcha ekranlarda ishlaydi:

- Desktop: Full sidebar
- Tablet: Collapsible sidebar
- Mobile: Optimized layout

## 🎯 Keyingi Qadamlar

1. **Database Integration**: JSON file o'rniga MongoDB yoki PostgreSQL
2. **Image Upload**: Rasmlarni yuklash funksiyasi
3. **Multi-user**: Ko'p foydalanuvchilar uchun support
4. **Activity Log**: Admin harakatlari tarixi
5. **Backup/Restore**: Ma'lumotlarni zahiralash

## 🐛 Troubleshooting

### Login ishlamayapti?

- `.env.local` fayl to'g'ri yaratilganini tekshiring
- Environment variables to'g'ri o'rnatilganini tekshiring
- Server'ni restart qiling: `npm run dev`

### Ma'lumotlar saqlanmayapti?

- `data/portfolio.json` fayl mavjudligini tekshiring
- File permission'larni tekshiring

### Token expired error?

- Cookie'ni o'chiring va qaytadan login qiling
- Token 7 kundan eski bo'lsa, yangilash kerak

## 📞 Yordam

Muammo bo'lsa:

1. Console'da error'larni tekshiring
2. Network tab'da API response'larni ko'ring
3. `.env.local` to'g'ri sozlanganini tekshiring

---

**Muvaffaqiyatlar!** 🚀
