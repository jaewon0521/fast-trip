import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Fast Trip",
  description: "빠른 여행 플래너",
};

export default function RootLayout({
  children,
  login,
}: Readonly<{
  children: React.ReactNode;
  login: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Navbar />
        <main className="max-w-[1200px] mx-auto pl-8 pr-4 max-md:px-4 py-2">{children}</main>/
      </body>
    </html>
  );
}
