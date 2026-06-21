import Hero from "@/components/landing/Hero";
import EnvironmentNews from "@/components/landing/EnvironmentNews";
import DailyQuotes from "@/components/landing/DailyQuotes";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white via-stone-50 to-stone-100">
      <Hero />
      <DailyQuotes />
      <EnvironmentNews />
      
      {/* CTA Section */}
      <section className="py-32 relative overflow-hidden bg-[#FAF9F6] border-t border-stone-200/50">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay" />
        
        {/* Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-emerald-100 blur-[120px] rounded-full pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-10">
          <h2 className="text-4xl md:text-6xl font-black tracking-tight text-stone-800">
            Ready to start your climate journey?
          </h2>
          <p className="text-xl text-stone-500 max-w-2xl mx-auto font-medium">
            Join thousands of others making a real difference. Small steps today lead to a massive impact tomorrow.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4 relative z-50">
            <Link href="/score" className="px-8 py-4 rounded-[2rem] font-bold text-white bg-emerald-500 hover:bg-emerald-600 shadow-[0_8px_30px_rgba(34,197,94,0.3)] transition-all hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(34,197,94,0.4)]">
              View My Carbon Score
            </Link>
            <Link href="/earth" className="px-8 py-4 rounded-[2rem] font-bold text-stone-600 border border-stone-200 bg-white hover:bg-stone-50 hover:text-stone-900 shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all hover:-translate-y-1">
              Explore Living Earth
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-stone-100 bg-white text-center text-sm font-bold text-stone-400">
        <p>© 2026 CarbonPulse. Built for the planet.</p>
      </footer>
    </div>
  );
}
