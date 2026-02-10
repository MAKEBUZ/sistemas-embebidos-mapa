import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sistemas Embebidos",
  description: "Actividad de Sistemas Embebidos",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-surface-light flex flex-col min-h-screen text-txt-main`}
      >
        <Navbar />
        <main className="flex-grow container mx-auto p-6">
          {children}
        </main>
        <footer className="bg-brand-primary text-txt-inverse text-center p-6 mt-12 shadow-inner">
          <p>© 2026 Sistemas Embebidos</p>
        </footer>
      </body>
    </html>
  );
}
