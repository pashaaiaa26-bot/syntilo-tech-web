import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import { Header } from "@/components/Header/Header";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: "Syntilo Tech | Elite AI-Powered Software Automation Agency",
  description: "Syntilo Tech leverages advanced AI workflows to engineer high-performance, secure management systems and enterprise dashboards in weeks. Founded by Sheraz Pasha.",
  keywords: ["AI software agency", "custom dashboard development", "business workflow automation", "SaaS MVP engineering", "Sheraz Pasha", "Syntilo Tech"],
  authors: [{ name: "Sheraz Pasha" }],
  openGraph: {
    title: "Syntilo Tech | Elite AI-Powered Software Automation Agency",
    description: "Traditional development houses take months. Syntilo Tech engineers custom software at 10x speed using advanced AI workflows. Founded by Sheraz Pasha.",
    url: "https://syntilo.tech",
    siteName: "Syntilo Tech",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Syntilo Tech | Elite AI Software Agency",
    description: "High-performance enterprise dashboards and custom workflows in weeks, not months.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable}`}>
      <body style={{ fontFamily: "var(--font-inter)" }}>
        <Header />
        {children}
      </body>
    </html>
  );
}
