# 🚀 Test Qo'llanmasi - Admin Panel

## Boshlash

1. **Server ishga tushiring** (allaqachon ishlab turibdi ✅)

```bash
npm run dev
```

2. **.env.local tekshiring** (allaqachon sozlangan ✅)

## Test Bosqichlari

### 1. Login sahifasini tekshirish

📍 URL: http://localhost:3000/admin/login

**Testlar:**

- [ ] Sahifa to'g'ri yuklanadi
- [ ] Username va Password inputlari ishlaydi
- [ ] "Ko'z" belgisi parolni ko'rsatadi/yashiradi
- [ ] Login tugmasi ishlaydi
- [ ] "Bosh sahifaga qaytish" linki ishlaydi

**Login ma'lumotlari:**

- Username: `admin`
- Password: `admin123`

### 2. Admin Dashboard

📍 URL: http://localhost:3000/admin/dashboard (logindan keyin avtomatik o'tadi)

**Testlar:**

- [ ] Dashboard yuklanadi
- [ ] Sidebar'da 5 ta bo'lim ko'rinadi:
  - Ko'nikmalar (Skills)
  - Loyihalar (Projects)
  - Tajriba (Experiences)
  - Ta'lim (Education)
  - Sertifikatlar (Certifications)
- [ ] Har bir bo'limda element soni ko'rinadi
- [ ] "Portfolio →" linki yangi tabda ochiladi
- [ ] "Chiqish" tugmasi ishlaydi

### 3. Skills (Ko'nikmalar) boshqarish

**Yangi skill qo'shish:**

1. "Ko'nikmalar" bo'limini tanlash
2. "Qo'shish" tugmasini bosish
3. Formani to'ldirish:
   - Ko'nikma nomi: `Vue.js`
   - Kategoriya: `Frontend`
   - Ko'rsatish: ✓ (checked)
4. "Saqlash" tugmasini bosish
5. Skill ro'yxatda paydo bo'lishini tekshirish

**Skill tahrirlash:**

1. Skill yonidagi ✏️ belgisini bosish
2. Ma'lumotni o'zgartirish
3. Saqlash
4. O'zgarish saqlanganini tekshirish

**Visibility toggle:**

1. 👁️ belgisini bosish
2. Skill kulrang bo'lishini tekshirish (yashirilgan)
3. Yana 👁️‍🗨️ bosib qayta ko'rsatish

**Skill o'chirish:**

1. 🗑️ belgisini bosish
2. Tasdiqlash dialogini accept qilish
3. Skill o'chirilganini tekshirish

### 4. Projects (Loyihalar) boshqarish

**Yangi loyiha qo'shish:**

1. "Loyihalar" bo'limiga o'tish
2. "Qo'shish" tugmasini bosish
3. Formani to'ldirish:
   - Loyiha nomi: `Test Project`
   - Qisqacha tavsif: `Test description`
   - To'liq tavsif: `Detailed description here`
   - Texnologiyalar: `React`, `Node.js` (har birini Enter bilan qo'shish)
   - GitHub URL: `https://github.com/username/repo`
   - Featured: ✓
   - Ko'rsatish: ✓
4. Saqlash
5. Loyiha ro'yxatda paydo bo'lishini tekshirish

**Texnologiyalar qo'shish:**

- Input'ga yozish
- Enter bosish yoki Plus tugmasini bosish
- X belgisi bilan o'chirish mumkin

### 5. Experiences (Tajriba) boshqarish

**Yangi tajr iba qo'shish:**

1. "Tajriba" bo'limiga o'tish
2. Formani to'ldirish:
   - Lavozim: `Junior Developer`
   - Kompaniya: `Test Company`
   - Joylashuv: `Tashkent`
   - Boshlanish sanasi: `2024-01-01`
   - Tugash sanasi: (bo'sh qoldirish)
   - "Hozirda shu yerda ishlayman": ✓
   - Mas'uliyatlar: har birini Enter bilan qo'shish
3. Saqlash

### 6. Education (Ta'lim) boshqarish

**Yangi ta'lim qo'shish:**

1. "Ta'lim" bo'limiga o'tish
2. Formani to'ldirish:
   - Daraja: `Master's Degree`
   - Muassasa: `University Name`
   - Joylashuv: `Tashkent`
   - Boshlanish: `2022-09-01`
   - Tugash: `2024-06-01`
   - Tavsif: `Description here`
3. Saqlash

### 7. Certifications (Sertifikatlar) boshqarish

**Yangi sertifikat qo'shish:**

1. "Sertifikatlar" bo'limiga o'tish
2. Formani to'ldirish:
   - Sertifikat nomi: `JavaScript Advanced`
   - Kim tomonidan: `Coursera`
   - Sana: `2024-01-15`
   - URL: (ixtiyoriy)
3. Saqlash

### 8. Public Portfolio ko'rish

📍 URL: http://localhost:3000

**Testlar:**

- [ ] Faqat `visible: true` bo'lgan elementlar ko'rinadi
- [ ] Resume sahifasi: http://localhost:3000/resume
- [ ] Navbar'da "Resume" linki ishlaydi

### 9. Data JSON faylni tekshirish

📂 Fayl: `data/portfolio.json`

**Tekshirish:**

- [ ] Fayl mavjud
- [ ] Yangi qo'shgan ma'lumotlar saqlanganini ko'rish
- [ ] JSON format to'g'ri

## ⚠️ Muammolarni hal qilish

### Login ishlamayapti

1. Browser console'ni oching (F12)
2. Network tabga o'ting
3. Login tugmasini bosing
4. `/api/admin/login` request'ni tekshiring
5. Response'da xatolik bormi?

### Ma'lumotlar saqlanmayapti

1. Console'da xatolikni tekshiring
2. `data/portfolio.json` fayli bor-yo'qligini tekshiring
3. File permissions'ni tekshiring

### Token expired

1. Cookie'ni o'chiring (Browser DevTools → Application → Cookies)
2. Qaytadan login qiling

## ✅ Muvaffaqiyatli Test

Agar barcha testlar o'tsa:

- ✅ Admin panel to'liq ishlayapti
- ✅ CRUD operatsiyalar ishlayapti
- ✅ Visibility toggle ishlayapti
- ✅ Ma'lumotlar saqlanayapti
- ✅ Public portfolio'da faqat visible elementlar ko'rinadi

## 📸 Screenshot olish

Agar hamma narsa ishlasa, screenshot olib qo'yishingiz mumkin:

1. Login page
2. Dashboard - Skills section
3. Modal - Add new skill
4. Dashboard - Projects section
5. Public portfolio

---

**Muborak bo'lsin!** 🎉 Admin panel tayyor!
