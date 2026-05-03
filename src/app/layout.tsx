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
  title: {
    template: "%s | VeloDash Premium",
    default: "VeloDash | Premium Bike Repair Slots",
  },
  description: "The autonomous marketplace for premium bike repair slots. Express service, AI estimation, and certified workshops.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="de"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased selection:bg-safety-orange selection:text-white`}
    >
      <body className="min-h-full flex flex-col bg-slate-light text-carbon-black font-sans">{children}</body>
    </html>
  );
}
