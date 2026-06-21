"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  Leaf,
  Globe,
  TrendingUp,
  BarChart3,
  FlaskConical,
  Trophy,
  Menu,
  X,
  Command,
} from "lucide-react";

const navLinks = [
  { href: "/", label: "Home", icon: Leaf },
  { href: "/earth", label: "Earth", icon: Globe },
  { href: "/score", label: "Score", icon: TrendingUp },
  { href: "/timeline", label: "Timeline", icon: BarChart3 },
  { href: "/simulator", label: "Forecaster", icon: FlaskConical },
];

export default function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      {/* Desktop Navigation (Floating Pill) */}
      <motion.nav
        className="fixed top-6 left-1/2 -translate-x-1/2 z-50 hidden md:block"
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 30, delay: 0.2 }}
      >
        <div className="bg-white/80 backdrop-blur-2xl border border-stone-200/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-[2rem] px-4 py-2 flex items-center gap-6">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group pr-4 border-r border-stone-100" data-hoverable>
            <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center group-hover:scale-105 transition-transform">
              <Leaf className="w-4 h-4 text-emerald-600" />
            </div>
            <span className="text-sm font-bold text-stone-800 tracking-tight">
              CarbonPulse
            </span>
          </Link>

          {/* Links */}
          <div className="flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  data-hoverable
                  className={cn(
                    "relative px-4 py-2 rounded-[1.5rem] text-sm font-medium transition-colors duration-200",
                    isActive
                      ? "text-emerald-700"
                      : "text-stone-500 hover:text-stone-900 hover:bg-stone-50"
                  )}
                >
                  {isActive && (
                    <motion.div
                      layoutId="nav-active"
                      className="absolute inset-0 bg-emerald-50 rounded-[1.5rem]"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="relative flex items-center gap-2 z-10">
                    <link.icon className={cn("w-4 h-4", isActive ? "text-emerald-600" : "text-stone-400")} />
                    {link.label}
                  </span>
                </Link>
              );
            })}
          </div>

          <div className="pl-4 border-l border-stone-100 flex items-center">
             <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-stone-50 border border-stone-100 text-stone-400 text-xs font-medium">
                <Command className="w-3 h-3" />
                <span>K</span>
             </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Header */}
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 md:hidden bg-white/80 backdrop-blur-2xl border-b border-stone-100"
        initial={{ y: -80 }}
        animate={{ y: 0 }}
      >
        <div className="flex items-center justify-between h-16 px-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center">
              <Leaf className="w-4 h-4 text-emerald-600" />
            </div>
            <span className="text-sm font-bold text-stone-800">CarbonPulse</span>
          </Link>

          <button
            className="w-10 h-10 rounded-full bg-stone-50 border border-stone-100 flex items-center justify-center text-stone-600"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 top-16 z-40 bg-white md:hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
          >
            <div className="p-4 flex flex-col gap-2">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "flex items-center gap-3 px-4 py-4 rounded-[1.5rem]",
                      isActive ? "bg-emerald-50 text-emerald-700 font-medium" : "text-stone-600 font-medium hover:bg-stone-50"
                    )}
                    onClick={() => setMobileOpen(false)}
                  >
                    <div className={cn("w-8 h-8 rounded-full flex items-center justify-center", isActive ? "bg-emerald-100 text-emerald-600" : "bg-stone-100 text-stone-500")}>
                      <link.icon className="w-4 h-4" />
                    </div>
                    {link.label}
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom Tab Bar (Mobile) */}
      <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden pb-[env(safe-area-inset-bottom)]">
        <div className="bg-white/90 backdrop-blur-2xl border-t border-stone-100 px-2 py-2">
          <div className="flex items-center justify-around">
            {navLinks.slice(0, 5).map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "flex flex-col items-center gap-1 py-1 px-2",
                    isActive ? "text-emerald-600" : "text-stone-400"
                  )}
                >
                  <div className={cn("w-10 h-8 rounded-full flex items-center justify-center transition-colors", isActive ? "bg-emerald-50" : "")}>
                    <link.icon className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-medium">{link.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
