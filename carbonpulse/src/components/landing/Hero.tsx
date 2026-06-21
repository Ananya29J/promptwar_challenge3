"use client";

import { motion } from "motion/react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { ArrowRight, Globe } from "lucide-react";
import ParticleSystem from "./ParticleSystem";
import { useMousePosition } from "@/hooks";

import EarthIllustration from "./EarthIllustration";

export default function Hero() {
  const { position } = useMousePosition();

  const titleWords = "Every Choice Leaves a Footprint.".split(" ");

  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden text-stone-800 bg-[#FAF9F6]">
      {/* Background gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white via-[#FAF9F6] to-stone-50 z-0" />
      
      {/* Animated Light Beams - Softer for Pinterest vibe */}
      <motion.div
        className="absolute top-[-20%] left-[-10%] w-[50%] h-[150%] bg-emerald-100/50 rotate-12 blur-[100px] rounded-full pointer-events-none"
        animate={{ x: [0, 50, 0], y: [0, 20, 0], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[120%] bg-peach-100/50 -rotate-12 blur-[120px] rounded-full pointer-events-none"
        animate={{ x: [0, -40, 0], y: [0, 30, 0], opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      <ParticleSystem />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full grid lg:grid-cols-2 gap-12 items-center">
        {/* Text Content */}
        <div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6">
            {titleWords.map((word, i) => (
              <motion.span
                key={i}
                className="inline-block mr-3 mb-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                {word}
              </motion.span>
            ))}
          </h1>
          
          <motion.p
            className="text-xl md:text-2xl text-stone-500 mb-10 font-medium"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            Understand it. Improve it. Reduce it.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 relative z-50"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1 }}
          >
            <Link
              href="/score"
              className="relative px-8 py-4 rounded-[2rem] font-semibold text-white bg-emerald-500 hover:bg-emerald-600 transition-all duration-300 flex items-center justify-center gap-2 group shadow-[0_8px_30px_rgba(34,197,94,0.3)] hover:shadow-[0_12px_40px_rgba(34,197,94,0.4)] hover:-translate-y-1"
            >
              Calculate My Impact
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            
            <Link
              href="/earth"
              className="px-8 py-4 rounded-[2rem] font-semibold text-stone-600 bg-white hover:bg-stone-50 hover:text-stone-900 border border-stone-200 shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-300 flex items-center justify-center gap-2 hover:-translate-y-1 group"
            >
              <Globe className="w-5 h-5 group-hover:rotate-45 transition-transform duration-500 text-emerald-500" />
              Explore Living Earth
            </Link>
          </motion.div>
        </div>

        {/* Stylized Earth Illustration */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: "easeOut", delay: 0.3 }}
          className="hidden lg:block relative z-40 pointer-events-auto"
        >
          <EarthIllustration />
        </motion.div>
      </div>
    </section>
  );
}
