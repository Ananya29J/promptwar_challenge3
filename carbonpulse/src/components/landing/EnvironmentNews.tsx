"use client";

import BentoCard from "@/components/shared/BentoCard";
import ScrollReveal from "@/components/shared/ScrollReveal";
import { Newspaper, ArrowRight, Leaf } from "lucide-react";

const newsItems = [
  {
    id: 1,
    category: "Innovation",
    title: "Breakthrough in Solid-State Batteries Promises 500-Mile Range EVs",
    source: "EcoTech Daily",
    date: "2 hours ago",
    readTime: "4 min read",
    image: "https://images.unsplash.com/photo-1593941707882-a5bba14938cb?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 2,
    category: "Policy",
    title: "EU Reaches Historic Agreement to Ban Deforestation-Linked Products",
    source: "Global Climate Network",
    date: "5 hours ago",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 3,
    category: "Conservation",
    title: "Major Ocean Cleanup Effort Removes 100 Tons of Plastic from Pacific",
    source: "Ocean Action",
    date: "1 day ago",
    readTime: "3 min read",
    image: "https://images.unsplash.com/photo-1484291470158-b8f8d608850d?auto=format&fit=crop&q=80&w=800",
  }
];

export default function EnvironmentNews() {
  return (
    <section className="py-24 relative z-10 bg-[#f4f3f0] border-y border-stone-200/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal preset="fadeUp" className="flex justify-between items-end mb-12">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 flex items-center justify-center text-emerald-600">
                <Newspaper className="w-6 h-6" />
              </div>
              <h2 className="text-3xl md:text-4xl font-black text-stone-800 tracking-tight">Latest Impact News</h2>
            </div>
            <p className="text-stone-500 font-medium max-w-xl">
              Stay informed on global sustainability efforts, breakthroughs in green technology, and climate policies.
            </p>
          </div>
          <button className="hidden md:flex items-center gap-2 text-stone-600 font-bold hover:text-emerald-600 transition-colors">
            View All News <ArrowRight className="w-4 h-4" />
          </button>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {newsItems.map((item, index) => (
            <ScrollReveal key={item.id} preset="fadeUp" delay={index * 0.1}>
              <BentoCard padding="none" hoverable className="h-full flex flex-col group cursor-pointer">
                <div className="relative h-48 w-full overflow-hidden">
                  <div className="absolute inset-0 bg-stone-100 animate-pulse" />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-stone-800 shadow-sm">
                    {item.category}
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center gap-2 text-xs font-bold text-stone-400 mb-3">
                    <span className="text-emerald-600">{item.source}</span>
                    <span>•</span>
                    <span>{item.date}</span>
                  </div>
                  <h3 className="text-xl font-bold text-stone-800 mb-4 leading-snug group-hover:text-emerald-700 transition-colors line-clamp-3">
                    {item.title}
                  </h3>
                  <div className="mt-auto flex items-center justify-between text-xs font-bold text-stone-400 pt-4 border-t border-stone-100">
                    <span className="flex items-center gap-1.5"><Leaf className="w-3.5 h-3.5 text-emerald-500" /> Eco Alert</span>
                    <span>{item.readTime}</span>
                  </div>
                </div>
              </BentoCard>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
