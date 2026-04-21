import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "./providers"; // ← Add this line
import { GoogleAnalytics } from '@next/third-parties/google'
import WhatsAppFloat from "@/components/WhatsAppFloat";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Oticsurveys", // ← Update this too
  description: "Surveying & Geospatial Solutions", // ← Update this
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Providers>{children}</Providers> {/* ← Wrap children here */}
        <GoogleAnalytics gaId="G-2ZDPTVCZHC" />
        <WhatsAppFloat />
      </body>
    </html>
  );
}