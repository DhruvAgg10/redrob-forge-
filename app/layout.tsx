import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Redrob Forge — Verify skills. Get hired through work.",
  description: "India's first project-first hiring funnel. Competition-driven skill verification with portable W3C credentials.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white text-[#111111]">{children}</body>
    </html>
  );
}
