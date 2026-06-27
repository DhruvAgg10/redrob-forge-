import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Redrob Forge — Verify skills. Get hired through work.",
  description: "India's first project-first hiring funnel. Competition-driven skill verification with portable W3C credentials.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white text-[#111111]" style={{ WebkitTapHighlightColor: "rgba(37,99,235,0.15)" }}>{children}</body>
    </html>
  );
}
