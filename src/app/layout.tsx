import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXTAUTH_URL || 'http://localhost:3000'),
  title: "SkillNova AI: Bridging Skills to Careers",
  description: "Build the skills your target role requires. Assess current skills, identify gaps, follow canonical roadmaps, improve your portfolio, and practice technical interviews.",
  icons: {
    icon: "/logo.jpg",
    apple: "/logo.jpg",
  },
  openGraph: {
    title: "SkillNova AI: Bridging Skills to Careers",
    description: "Build the skills your target role requires. Assess current skills, identify gaps, follow canonical roadmaps, and practice interviews.",
    url: "https://skillnova.dev",
    siteName: "SkillNova AI",
    images: [
      {
        url: "/logo.jpg",
        width: 800,
        height: 600,
        alt: "SkillNova AI Brand Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SkillNova AI: Bridging Skills to Careers",
    description: "Build the skills your target role requires. Canonical roadmaps, skill gap audit, and interview practice.",
    images: ["/logo.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
