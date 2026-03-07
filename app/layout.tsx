import React from "react"
import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';

import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

export const metadata: Metadata = {
  title: "Harshit Sharma | AI Product Manager",
  description:
    "Portfolio of Harshit Sharma - AI Product Manager bridging engineering depth with product vision to build the future of AI.",
  openGraph: {
    title: "Harshit Sharma | AI Product Manager",
    description:
      "Bridging engineering depth with product vision. Building the next generation of AI-powered tools at the frontier.",
    url: "https://harshit.ai",
    siteName: "Harshit Sharma",
    images: [
      {
        url: "https://harshit.ai/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Harshit Sharma — AI Product Manager",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Harshit Sharma | AI Product Manager",
    description:
      "Bridging engineering depth with product vision. Building the next generation of AI-powered tools at the frontier.",
    images: ["https://harshit.ai/images/og-image.jpg"],
  },
};

export const viewport: Viewport = {
  themeColor: "#0a1128",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`scroll-smooth ${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="font-sans antialiased">
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
