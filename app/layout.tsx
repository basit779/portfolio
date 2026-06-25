import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

const title = "Abdul Basit — Aspiring DevOps Engineer";
const description =
  "IT student going deep into DevOps — Linux, Docker, CI/CD, and cloud. Building real projects, learning in public, and looking for an internship to grow.";

// Resolves to the live deploy URL on Vercel automatically; falls back to
// localhost in dev. Replace with your custom domain if/when you have one.
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000");

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  keywords: [
    "DevOps", "intern", "Docker", "Linux", "CI/CD", "Next.js",
    "Abdul Basit", "NUML", "Islamabad", "student developer",
  ],
  authors: [{ name: "Abdul Basit" }],
  openGraph: {
    title,
    description: "DevOps in the making · Docker · Linux · CI/CD · Cloud",
    url: "/",
    siteName: "Abdul Basit",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: "DevOps in the making · Docker · Linux · CI/CD · Cloud",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrains.variable}`}
    >
      <body className="noise antialiased">{children}</body>
    </html>
  );
}
