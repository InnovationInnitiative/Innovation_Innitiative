import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { LayoutShell } from "@/components/layout/LayoutShell";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Innovation Innitiative | AI, ML & Quantum Research",
  description: "Advancing AI, ML, and Quantum Solutions. A student research initiative by engineering researchers at Institute of Engineering and Management (IEM).",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className={cn(inter.className, "min-h-screen flex flex-col antialiased bg-background text-foreground")}>
        <LayoutShell
          header={<Header />}
          footer={<Footer />}
        >
          {children}
        </LayoutShell>
        <Analytics />
      </body>
    </html>
  );
}
