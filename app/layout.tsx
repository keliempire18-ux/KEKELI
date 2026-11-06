import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import { ThemeProvider } from "next-themes";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import "./globals.css";

const display = Cormorant_Garamond({ subsets: ["latin"], weight: ["300", "400", "500"], variable: "--font-display" });
const sans = Manrope({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: { default: "KEKELI", template: "%s · KEKELI" },
  description: "Robes, jupes, chaussures, sacs, accessoires et perruques. Mode féminine haut de gamme.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" suppressHydrationWarning className={`${display.variable} ${sans.variable}`}>
      <body className="min-h-dvh bg-bg text-fg">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
