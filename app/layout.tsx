import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

export const metadata: Metadata = {
  title: "Portfolio - Full Stack Developer",
  description:
    "O'zbekistonlik Full Stack dasturchi portfoliyo sayti. Frontend va Backend texnologiyalarini o'zgartirish orqali zamonaviy va samarali yechimlar yarataman.",
  keywords: [
    "portfolio",
    "developer",
    "full stack",
    "o'zbekiston",
    "web development",
    "next.js",
    "react",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uz" className="dark">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased`}
      >
        {children}
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
