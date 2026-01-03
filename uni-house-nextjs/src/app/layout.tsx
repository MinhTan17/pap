import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getLocale } from 'next-intl/server';
import { SpeedInsights } from '@vercel/speed-insights/next';
import FloatingContactIcons from "@/components/FloatingContactIcons";
import { DataProvider } from "@/contexts/DataContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Phú An Phát - Gia công cắt Laser CNC & Thép chất lượng cao",
  description: "Công ty TNHH Phú An Phát - Chuyên gia công cắt Laser CNC, phay mài 6 mặt, khuôn mẫu cơ khí chính xác và cung cấp thép các loại",
  icons: {
    icon: '/icons/banners/logo.png',
    shortcut: '/icons/banners/logo.png',
    apple: '/icons/banners/logo.png',
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <DataProvider>
            {children}
            <FloatingContactIcons />
          </DataProvider>
        </NextIntlClientProvider>
        <SpeedInsights />
      </body>
    </html>
  );
}
