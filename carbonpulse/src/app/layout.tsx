import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { MotionProvider } from "@/components/providers/MotionProvider";
import CustomCursor from "@/components/shared/CustomCursor";
import Navigation from "@/components/shared/Navigation";
import FloatingAICoach from "@/components/shared/FloatingAICoach";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Suspense } from "react";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

export const metadata: Metadata = {
  title: "CarbonPulse - Your Climate Impact",
  description: "Understand, improve, and reduce your carbon footprint with CarbonPulse.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${outfit.variable} antialiased selection:bg-emerald-500/20 text-stone-900 bg-[#FAF9F6] min-h-screen`}>
        <MotionProvider>
          <TooltipProvider>
            <div className="flex flex-col min-h-screen pb-20 md:pb-0">
              <Suspense fallback={null}>
                <CustomCursor />
              </Suspense>
              <Navigation />
              <main className="flex-1 w-full relative pt-20">
                {children}
              </main>
              <FloatingAICoach />
            </div>
          </TooltipProvider>
        </MotionProvider>
      </body>
    </html>
  );
}
