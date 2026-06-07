import type { Metadata } from "next";
import localFont from "next/font/local";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";

const dmSans = localFont({
  src: [
    {
      path: "./fonts/DMSans-VariableFont_opsz,wght.ttf",
      style: "normal",
      weight: "100 1000",
    },
    {
      path: "./fonts/DMSans-Italic-VariableFont_opsz,wght.ttf",
      style: "italic",
      weight: "100 1000",
    },
  ],
  variable: "--font-dm-sans",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "DD Imperium — Abastecimiento y logística para Amazon",
  description:
    "Distribuidora que conecta marcas con Amazon y Walmart, a nivel nacional e internacional — con preparación y envío desde nuestro Prep Center propio.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className={`${dmSans.variable} ${jetbrainsMono.variable}`}>{children}</body>
    </html>
  );
}
