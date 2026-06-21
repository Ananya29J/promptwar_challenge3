"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { getCoachGreeting, getCoachResponses } from "@/lib/carbon-data";
import type { CoachMessage } from "@/types";
import BentoCard from "@/components/shared/BentoCard";
import { Bot, User, Send, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

export default function AICoach() {
  const [messages, setMessages] = useState<CoachMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initial greeting
    setTimeout(() => {
      setMessages([getCoachGreeting()]);
    }, 500);
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSuggestionClick = (suggestion: string) => {
    const userMsg: CoachMessage = {
      id: Date.now().toString(),
      role: "user",
      content: suggestion,
      timestamp: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      const responses = getCoachResponses();
      const response = responses[suggestion] || {
        id: Date.now().toString(),
        role: "coach",
        content: "I'm still learning about that! Let me get back to you with some insights later.",
        timestamp: new Date().toISOString(),
        suggestions: ["How can I reduce my energy usage?", "What's my biggest impact area?"],
      };
      setMessages((prev) => [...prev, response]);
    }, 1500);
  };

  const lastCoachMsg = messages.filter((m) => m.role === "coach").pop();
  const activeSuggestions = lastCoachMsg?.suggestions || [];

  return (
    <BentoCard className="flex flex-col h-[500px]" padding="sm">
      {/* Header */}
      <div className="flex items-center gap-3 p-3 border-b border-stone-100 bg-stone-50 rounded-t-[1.5rem]">
        <div className="w-10 h-10 rounded-[1rem] bg-emerald-100 flex items-center justify-center text-emerald-600 relative">
          <Bot className="w-5 h-5" />
          <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full" />
        </div>
        <div>
          <h3 className="font-bold text-stone-800 flex items-center gap-2">
            Eco Coach <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
          </h3>
          <p className="text-xs font-bold text-stone-400">Online • Ready to help</p>
        </div>
      </div>

      {/* Messages Area */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth"
        style={{ scrollbarWidth: "thin", scrollbarColor: "rgba(255,255,255,0.1) transparent" }}
      >
        <AnimatePresence initial={false}>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={cn(
                "flex gap-3 max-w-[85%]",
                msg.role === "user" ? "ml-auto flex-row-reverse" : "mr-auto"
              )}
            >
              <div className={cn(
                "w-8 h-8 rounded-[1rem] flex-shrink-0 flex items-center justify-center",
                msg.role === "user" ? "bg-cyan-100 text-cyan-600" : "bg-emerald-100 text-emerald-600"
              )}>
                {msg.role === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>
              <div className={cn(
                "p-3 rounded-2xl text-sm whitespace-pre-wrap font-medium shadow-sm border",
                msg.role === "user" 
                  ? "bg-emerald-50 border-emerald-100 text-emerald-900 rounded-tr-sm" 
                  : "bg-white border-stone-200 text-stone-700 rounded-tl-sm"
              )}>
                {msg.content}
              </div>
            </motion.div>
          ))}
          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="flex gap-3 mr-auto max-w-[85%]"
            >
              <div className="w-8 h-8 rounded-[1rem] bg-emerald-100 text-emerald-600 flex items-center justify-center">
                <Bot className="w-4 h-4" />
              </div>
              <div className="p-4 rounded-[1.5rem] rounded-tl-sm bg-white border border-stone-200 flex items-center gap-1 shadow-sm">
                <motion.div className="w-2 h-2 rounded-full bg-stone-300" animate={{ y: [0, -3, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0 }} />
                <motion.div className="w-2 h-2 rounded-full bg-stone-300" animate={{ y: [0, -3, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }} />
                <motion.div className="w-2 h-2 rounded-full bg-stone-300" animate={{ y: [0, -3, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Suggestions & Input Area */}
      <div className="p-3 border-t border-stone-100 bg-stone-50 rounded-b-[1.5rem] space-y-3">
        {activeSuggestions.length > 0 && !isTyping && (
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {activeSuggestions.map((sug, i) => (
              <motion.button
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                onClick={() => handleSuggestionClick(sug)}
                className="whitespace-nowrap px-4 py-2 rounded-full bg-white hover:bg-emerald-50 border border-stone-200 text-stone-600 font-bold text-xs transition-colors shadow-sm"
              >
                {sug}
              </motion.button>
            ))}
          </div>
        )}
        <div className="relative">
          <input 
            type="text" 
            placeholder="Ask about your footprint..." 
            className="w-full bg-white border border-stone-200 rounded-[1.2rem] py-3 pl-4 pr-12 text-sm font-medium focus:outline-none focus:border-emerald-300 text-stone-800 placeholder:text-stone-400 shadow-sm"
            disabled // Decorative since suggestions drive the UX in this demo
          />
          <button className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-emerald-50 hover:bg-emerald-100 rounded-[1rem] flex items-center justify-center text-emerald-600 transition-colors">
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </BentoCard>
  );
}
