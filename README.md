# Next.js Portfolio - Migration from Vite

Portfolio website migrated from Vite+React to Next.js 14 with App Router.

## Features

- ✅ **Next.js 14** with App Router
- ✅ **TypeScript** for type safety
- ✅ **Tailwind CSS** for styling
- ✅ **Framer Motion** for animations
- ✅ **Email Contact Form** with Nodemailer
- ✅ **Particle Background** with tsParticles
- ✅ **Responsive Design**
- ✅ **SEO Optimized**

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Create a `.env.local` file in the root directory and add your email configuration:

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
CONTACT_EMAIL=your-email@gmail.com
```

**Important for Gmail users:**

- Don't use your regular Gmail password
- Create an App Password: https://myaccount.google.com/apppasswords
- Enable 2-Step Verification first if needed

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
portfolio-nextjs/
├── app/
│   ├── api/
│   │   └── contact/
│   │       └── route.ts       # Contact form API endpoint
│   ├── globals.css            # Global styles
│   ├── layout.tsx             # Root layout
│   └── page.tsx               # Home page
├── components/
│   ├── ui/                    # shadcn/ui components
│   │   ├── badge.tsx
│   │   └── dialog.tsx
│   ├── ContactSection.tsx
│   ├── Footer.tsx
│   ├── HeroSection.tsx
│   ├── Navbar.tsx
│   ├── ParticleBackground.tsx
│   ├── ProjectDetailModal.tsx
│   ├── ProjectsSection.tsx
│   ├── TechStack.tsx
│   └── TypeWriter.tsx
├── lib/
│   └── utils.ts               # Utility functions
├── public/                    # Static assets
├── .env.local                 # Environment variables (create this)
├── tailwind.config.ts         # Tailwind configuration
└── package.json
```

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

### Other Platforms

This is a standard Next.js app and can be deployed to:

- Netlify
- Railway
- Render
- Or any platform supporting Node.js

## Email Configuration

The contact form uses Nodemailer. Supported email providers:

- Gmail (recommended for development)
- Outlook/Office365
- SendGrid
- Mailgun
- Any SMTP server

## Customization

### Update Personal Information

Edit the following files:

- `components/ContactSection.tsx` - Contact info
- `components/HeroSection.tsx` - Hero text and roles
- `components/Navbar.tsx` - Logo and brand name
- `components/ProjectsSection.tsx` - Your projects
- `components/TechStack.tsx` - Your tech stack
- `app/layout.tsx` - Metadata and SEO

### Modify Colors

Colors are defined in `app/globals.css` using CSS variables. Update the `:root` section.

### Change Animations

Animations are built with Framer Motion. Check component files for animation configurations.

## License

MIT

## Migration Notes

This project was successfully migrated from Vite+React to Next.js 14. All features are preserved:

- Identical UI/UX
- Same animations
- All components working
- Added backend functionality for contact form
