import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "react-hot-toast";
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
  title: "Fast Trip",
  description: "빠른 여행 플래너",
  manifest: "/manifest.json",
  openGraph: {
    title: "Fast Trip",
    description: "빠른 여행 플래너",
    url: "https://fast-trip-peach.vercel.app",
    siteName: "Fast Trip",
    images: [{ url: "/images/trip-main.png" }],
  },
  keywords: [
    "여행",
    "여행 플래너",
    "여행 계획",
    "여행 안내",
    "여행 정보",
    "fast-trip",
    "fasttrip",
    "Fast Trip",
  ],
  authors: [{ name: "Fast Trip" }],
  icons: [
    { rel: "apple-touch-icon", url: "/icons/icon-152x152.png" },
    { rel: "icon", url: "/icons/icon-32x32.png" },
  ],
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" data-theme="pastel">
      <head>
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Fast Trip" />
        <link rel="apple-touch-icon" href="/icons/icon-152x152.png" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Toaster position="bottom-center" />
        <main>{children}</main>
      </body>
    </html>
  );
}
