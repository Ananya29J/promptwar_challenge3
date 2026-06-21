"use client";

import ScrollReveal from "@/components/shared/ScrollReveal";
import { Quote } from "lucide-react";

const quotes = [
  {
    text: "The greatest threat to our planet is the belief that someone else will save it.",
    author: "Robert Swan"
  },
  {
    text: "We do not inherit the earth from our ancestors, we borrow it from our children.",
    author: "Native American Proverb"
  },
  {
    text: "What you do makes a difference, and you have to decide what kind of difference you want to make.",
    author: "Jane Goodall"
  }
];

export default function DailyQuotes() {
  // Just show the first quote for simplicity, could rotate in the future
  const quote = quotes[0];

  return (
    <section className="py-24 relative overflow-hidden bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <ScrollReveal preset="scale">
          <div className="w-16 h-16 mx-auto bg-emerald-50 rounded-full flex items-center justify-center mb-8">
            <Quote className="w-8 h-8 text-emerald-500" />
          </div>
          <blockquote className="text-3xl md:text-5xl font-black text-stone-800 tracking-tight leading-tight mb-8">
            "{quote.text}"
          </blockquote>
          <div className="flex items-center justify-center gap-4">
            <div className="h-px w-12 bg-emerald-500" />
            <p className="text-xl font-bold text-stone-500 uppercase tracking-widest">
              {quote.author}
            </p>
            <div className="h-px w-12 bg-emerald-500" />
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
