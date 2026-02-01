# Vercel ga Deploy Qilish Bo'yicha Ko'rsatma

## 1-Qadam: GitHub Repository Yaratish

1. GitHub.com ga kiring
2. Yangi repository yarating
3. Repository nomini kiriting (masalan: `portfolio`)
4. Public yoki Private tanlang
5. **Create repository** tugmasini bosing

## 2-Qadam: Loyihani GitHub ga Push Qilish

Terminal orqali quyidagi komandalarni bajaring:

```bash
# Git init (agar qilinmagan bo'lsa)
git init

# Barcha fayllarni qo'shish
git add .

# Commit qilish
git commit -m "Initial commit: Next.js portfolio"

# Remote repository qo'shish (GitHub sizga bergan URL ni qo'ying)
git remote add origin https://github.com/sizning-username/repository-nomi.git

# Push qilish
git push -u origin main
```

**Eslatma:** Agar `main` branch o'rniga `master` ishlatayotgan bo'lsangiz:

```bash
git branch -M main  # master dan main ga o'zgartirish
```

## 3-Qadam: Vercel.com ga Kirish

1. [Vercel.com](https://vercel.com) ga kiring
2. GitHub akkaunt bilan login qiling
3. "Add New" > "Project" tugmasini bosing

## 4-Qadam: Repository Import Qilish

1. GitHub repositories ro'yxatidan loyihangizni toping
2. **Import** tugmasini bosing
3. Vercel avtomatik Next.js loyiha ekanligini aniqlaydi

## 5-Qadam: Environment Variables Qo'shish

Deploy qilishdan oldin **Environment Variables** (muhit o'zgaruvchilari) qo'shish kerak:

1. "Environment Variables" bo'limiga o'ting
2. Quyidagi o'zgaruvchilarni qo'shing:

```
Name: SMTP_HOST
Value: smtp.gmail.com

Name: SMTP_PORT
Value: 587

Name: SMTP_USER
Value: sizning-email@gmail.com

Name: SMTP_PASS
Value: sizning-app-password

Name: CONTACT_EMAIL
Value: sizning-email@gmail.com
```

**Gmail App Password olish:**

1. Google Account Settings ga kiring: https://myaccount.google.com/
2. Security > 2-Step Verification ni yoqing
3. App Passwords ga o'ting: https://myaccount.google.com/apppasswords
4. "Select app" > "Mail" tanlang
5. "Select device" > "Other" tanlang va "Next.js Portfolio" deb yozing
6. **Generate** tugmasini bosing
7. Yaratilgan 16 ta belgili parolni nusxalang
8. Shu parolni `SMTP_PASS` ga kiriting

## 6-Qadam: Deploy

1. **Deploy** tugmasini bosing
2. Vercel loyihani build qiladi (2-3 daqiqa davom etadi)
3. Build tugagach, sizga sayt URL beriladi (masalan: `portfolio-xyz.vercel.app`)

## 7-Qadam: Domen Sozlash (Ixtiyoriy)

Agar o'z domeningiz bo'lsa:

1. Vercel dashboard da **Settings** > **Domains** ga o'ting
2. Domen nomini kiriting (masalan: `myportfolio.com`)
3. Vercel sizga DNS sozlamalarni ko'rsatadi
4. Domen provayderingizda (GoDaddy, Namecheap, va h.k.) DNS sozlamalarini o'zgartiring
5. 24 soat ichida domen faollashadi

## Yangilash (Update)

Har safar GitHub repository ga push qilganingizda, Vercel avtomatik deploy qiladi:

```bash
# O'zgarishlarni qo'shish
git add .

# Commit qilish
git commit -m "Update: feature description"

# Push qilish
git push
```

## Environment Variables Yangilash

1. Vercel dashboard ga kiring
2. Loyihangizni tanlang
3. **Settings** > **Environment Variables** ga o'ting
4. Kerakli o'zgaruvchini yangilang
5. **Redeploy** qiling (Settings > Deployments > uchta nuqta > Redeploy)

## Analytics va Monitoring

Vercel sizga bepul taqdim etadi:

- **Analytics** - Traffic ko'rish
- **Speed Insights** - Performance monitoring
- **Logs** - Real-time logs

## Muammolar va Yechimlar

### Build Failed

- Logs ni tekshiring
- Local da `npm run build` ishlatib test qiling
- Error xabarlarini o'qing

### Contact Form Ishlamayapti

- Environment variables to'g'ri kiritilganini tekshiring
- Gmail App Password ishlatayotganingizni tasdiqlang
- Vercel Logs da xatolarni tekshiring

### 404 Error

- next.config.ts sozlamalarini tekshiring
- Public folder fayllarini tekshiring

## Qo'shimcha Resurslar

- [Vercel Docs](https://vercel.com/docs)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Vercel CLI](https://vercel.com/docs/cli) - Terminal orqali deploy qilish

## Yordam

Agar muammo bo'lsa:

1. [Vercel Support](https://vercel.com/support)
2. [Vercel Community](https://github.com/vercel/vercel/discussions)
3. [Next.js GitHub](https://github.com/vercel/next.js/discussions)
