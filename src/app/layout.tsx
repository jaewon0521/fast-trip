import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import { Toaster } from "react-hot-toast";

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
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" data-theme="pastel">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <header>
          <Navbar />
        </header>
        <Toaster position="bottom-center" />
        <main className="h-[calc(100vh-77px)]">{children}</main>
      </body>
    </html>
  );
}
