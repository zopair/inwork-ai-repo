import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "InWork | منصة الخدمات التشاركية الذكية",
  description:
    "InWork منصة خدمات تشاركية ذكية تجمع طالبي الخدمات بمقدميها، وتسهّل اكتشاف الخبرات ومقارنة العروض والاتفاق بوضوح.",
  applicationName: "InWork",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "InWork",
  },
};

export const viewport: Viewport = {
  themeColor: "#0F172A",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
