import React from "react"
import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";

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
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
