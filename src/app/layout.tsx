import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "WAR - Card Game",
  description:
    "A neon-styled War card game built with Next.js 15, TypeScript, and Framer Motion. Battle the AI to collect all 52 cards!",
  icons: {
    icon: "/favicon.svg",
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0a1a",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-[#0a0a1a] text-white">
        {children}
      </body>
    </html>
  );
}
