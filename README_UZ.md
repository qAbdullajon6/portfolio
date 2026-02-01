# Portfolio - Next.js

Bu loyiha Vite dan Next.js ga muvaffaqiyatli ko'chirildi va Vercel.com ga deploy qilishga tayyor!

## 🚀 Tezkor Boshlash

### 1. Dependencies o'rnatish

```bash
npm install
```

### 2. Environment Variables sozlash

`.env.local` faylini yarating va quyidagilarni kiriting:

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=sizning-email@gmail.com
SMTP_PASS=sizning-app-password
CONTACT_EMAIL=sizning-email@gmail.com
```

**Gmail App Password:**

1. https://myaccount.google.com/apppasswords ga kiring
2. Yangi app password yarating
3. Parolni `SMTP_PASS` ga qo'ying

### 3. Development Server

```bash
npm run dev
```

Brauzerda: http://localhost:3000

## 📦 Vercel ga Deploy Qilish

Batafsil ko'rsatma uchun `DEPLOYMENT.md` faylini o'qing.

**Qisqacha:**

1. Loyihani GitHub ga push qiling
2. Vercel.com ga kiring va GitHub bilan login qiling
3. Repository ni import qiling
4. Environment Variables qo'shing
5. Deploy tugmasini bosing!

## 📁 Loyiha Strukturasi

```
├── app/
│   ├── api/contact/         # Contact form API
│   ├── globals.css          # Global styles
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Home page
├── components/              # React components
├── lib/                     # Utility functions
├── public/                  # Static assets
├── .env.local               # Environment variables (create this)
├── .env.example             # Example env file
├── DEPLOYMENT.md            # Batafsil deploy ko'rsatma
└── package.json
```

## ✨ Xususiyatlar

- ✅ Next.js 14 (App Router)
- ✅ TypeScript
- ✅ Tailwind CSS
- ✅ Framer Motion animations
- ✅ Email Contact Form
- ✅ Particle Background
- ✅ SEO optimized
- ✅ Responsive Design
- ✅ Production ready

## 📝 Fayllar

- `DEPLOYMENT.md` - Vercel ga deploy qilish bo'yicha batafsil O'zbekcha ko'rsatma
- `.env.example` - Environment variables namunasi
- `vercel.json` - Vercel konfiguratsiyasi (avtomatik)

## 🔧 Customization

Portfolio ni o'zingizga moslashtirish uchun quyidagi fayllarni tahrirlang:

- `app/layout.tsx` - SEO metadata
- `components/HeroSection.tsx` - Ism va bio
- `components/ProjectsSection.tsx` - Loyihalaringiz
- `components/TechStack.tsx` - Texnologiyalaringiz
- `components/ContactSection.tsx` - Kontakt ma'lumotlari

## 📧 Contact Form

Contact form Nodemailer ishlatadi. Gmail, Outlook, SendGrid va boshqa SMTP serverlar bilan ishlaydi.

## 🎨 Dizayn

Ranglar va stillar `app/globals.css` da CSS variables orqali boshqariladi.

## 📄 License

MIT

---

**Muallif:** Abdullajon  
**Texnologiyalar:** Next.js, TypeScript, Tailwind CSS, Framer Motion
