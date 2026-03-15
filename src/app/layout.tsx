import { Analytics } from "@vercel/analytics/next"

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NM Magic 2026 - 7-9 August 2026",
  description: "Norgesmesterskapet i Magic: The Gathering 2026 - Alt du trenger å vite om årets mest spennende Magic-turnering!",
  icons: {
    icon: "/NMMTG_Ikon_farge_26_400x400.png",
    apple: "/NMMTG_Ikon_farge_26_400x400.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
