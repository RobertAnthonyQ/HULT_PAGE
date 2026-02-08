import React from "react";
import Hero from "@/components/Hero/Hero";
import Intel from "@/components/Intel/Intel";
import Journey from "@/components/Journey/Journey";
import Team from "@/components/Team/Team";
import FAQ from "@/components/FAQ/FAQ";
import Footer from "@/components/Footer/Footer";

export default function Home() {
  return (
    <main className="w-full min-h-screen bg-void text-white selection:bg-hult-pink selection:text-white overflow-x-hidden">
      {/* Fixed Grid Background Overlay */}
      <div className="fixed inset-0 z-0 opacity-10 pointer-events-none bg-grid-pattern bg-[length:40px_40px]" />

      {/* Navigation / Header (Minimal) */}
      <nav className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-6 py-4 mix-blend-difference">
        <div className="font-display font-bold text-xl tracking-tighter">
          HULT PRIZE <span className="text-hult-pink">PUCP</span>
        </div>
        <div className="font-mono text-xs border border-white/20 px-2 py-1">
          SYS.ONLINE
        </div>
      </nav>

      <Hero />
      <Intel />
      <Journey />
      <Team />
      <FAQ />
      <Footer />
    </main>
  );
}
