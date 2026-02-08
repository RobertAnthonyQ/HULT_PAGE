"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Zap, PieChart, Users, Globe as GlobeIcon } from 'lucide-react';
import { Globe } from "@/components/ui/globe";

// Card Component (Wrapper Reutilizable)
const Card: React.FC<{ 
  children: React.ReactNode; 
  className?: string; 
  delay?: number;
  noHover?: boolean;
}> = ({ children, className, delay = 0, noHover = false }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    whileHover={!noHover ? { borderColor: "#E0025F" } : {}}
    className={`relative bg-[#050505] border border-white/10 overflow-hidden group flex flex-col ${className}`}
  >
    {children}
    {/* Noise Texture Overlay (Opcional para textura) */}
    <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
  </motion.div>
);

const Intel: React.FC = () => {
  return (
    <section className="w-full bg-[#020202] py-16 px-4 md:px-12 relative border-b border-white/5 overflow-hidden">
      
      {/* Background Grid Sutil */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

      {/* --- BENTO GRID PANORÁMICO --- */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4">
        
        {/* ROW 1: THE HOOK (Texto + Foto) */}
        
        {/* 1. THE MANIFESTO (Span 2) */}
        <Card className="col-span-1 md:col-span-2 min-h-[280px] p-6 md:p-10 justify-between">
          <div className="flex justify-between items-start">
            <Zap className="text-hult-pink" size={28} />
            <span className="font-mono text-[10px] text-gray-600 border border-gray-800 px-2 py-0.5 rounded">01 // VISION</span>
          </div>
          
          <div className="relative z-10 mt-auto">
            <h3 className="font-display text-4xl md:text-5xl text-white leading-[0.9] mb-4 uppercase">
              We Don&apos;t Compete.<br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-hult-pink to-white">We Solve.</span>
            </h3>
            <p className="font-mono text-xs text-gray-400 max-w-lg pl-4 border-l-2 border-hult-pink/50">
              The Nobel Prize for Students. Turning pure chaos into profitable startups that fix the planet.
            </p>
          </div>
        </Card>

        {/* 2. THE VIBE (Span 1 - La Foto) */}
        <Card delay={0.1} className="col-span-1 min-h-[280px] relative group" noHover={true}>
          {/* Imagen con efecto Zoom lento */}
          <div 
            className="absolute inset-0 bg-[url('/images/hult.webp')] bg-cover bg-center transition-transform duration-[2s] group-hover:scale-105"
          ></div>
          
          {/* Capas de estilo */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80"></div>
          <div className="absolute inset-0 bg-hult-pink/20 mix-blend-overlay group-hover:bg-hult-pink/0 transition-colors duration-500"></div>
          
          <div className="absolute bottom-6 left-6 z-10">
             <div className="flex items-center gap-2 mb-1">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
                <span className="font-mono text-[9px] text-white/80 uppercase tracking-widest">Live Feed</span>
             </div>
             <p className="font-display text-xl text-white uppercase">Human Energy</p>
          </div>
        </Card>


        {/* ROW 2: THE HORIZON (Split Stats & Globe) */}
        
        {/* 3. THE STATS (Span 1) - Hidden on Mobile, consolidated into Globe */}
        <Card delay={0.2} className="hidden md:flex col-span-1 p-8 justify-between bg-black">
            <div className="space-y-8">
                {/* Stat 1: Countries */}
                <div className="group/stat cursor-default">
                    <h4 className="font-display text-5xl text-white leading-none tracking-tighter group-hover/stat:text-hult-pink transition-colors duration-300">
                        130<span className="text-hult-pink group-hover/stat:text-white transition-colors">+</span>
                    </h4>
                    <div className="font-mono text-[9px] text-gray-400 uppercase tracking-[0.2em] mt-1 flex items-center gap-2">
                        <GlobeIcon size={12} /> Countries Impacted
                    </div>
                </div>

                {/* Stat 2: Entrepreneurs */}
                <div className="group/stat cursor-default">
                    <h4 className="font-display text-5xl text-white leading-none tracking-tighter group-hover/stat:text-hult-pink transition-colors duration-300">
                        50K<span className="text-hult-pink group-hover/stat:text-white transition-colors">+</span>
                    </h4>
                    <div className="font-mono text-[9px] text-gray-400 uppercase tracking-[0.2em] mt-1 flex items-center gap-2">
                        <Users size={12} /> Entrepreneurs
                    </div>
                </div>

                {/* Stat 3: Participants */}
                <div className="group/stat cursor-default">
                    <h4 className="font-display text-5xl text-white leading-none tracking-tighter group-hover/stat:text-hult-pink transition-colors duration-300">
                        200K<span className="text-hult-pink group-hover/stat:text-white transition-colors">+</span>
                    </h4>
                    <div className="font-mono text-[9px] text-gray-400 uppercase tracking-[0.2em] mt-1 flex items-center gap-2">
                        <Zap size={12} /> Annual Participants
                    </div>
                </div>
            </div>

            <div className="mt-6 pt-6 border-t border-white/5">
                <div className="flex items-center gap-2 text-hult-pink">
                    <PieChart size={18} />
                    <span className="font-display text-xs text-white uppercase tracking-wider">100% Equity Founders</span>
                </div>
            </div>
        </Card>

        {/* 4. THE GLOBE (Span 2) */}
        <Card delay={0.3} className="col-span-1 md:col-span-2 h-[480px] md:h-auto relative overflow-hidden bg-black">
            {/* FONDO: Gradiente Radial */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(224,2,95,0.08),rgba(0,0,0,0))]" />
            
            {/* HUD OVERLAYS */}
            <div className="absolute inset-0 z-10 pointer-events-none p-6">
                {/* Mobile Specific HUD: Absolute Positioning */}
                <div className="md:hidden flex flex-col gap-10 absolute inset-x-6 top-10 z-20">
                    <div className="grid grid-cols-2 gap-x-10 gap-y-12">
                        {/* Metric 1 */}
                        <div className="relative pl-3">
                            <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-hult-pink/40" />
                            <h4 className="font-display text-4xl text-white leading-none tracking-tighter">
                                130<span className="text-hult-pink">+</span>
                            </h4>
                            <div className="font-mono text-[8px] text-gray-500 uppercase tracking-[0.2em] mt-2">Countries</div>
                        </div>

                        {/* Metric 2 */}
                        <div className="relative pl-3">
                            <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-hult-pink/40" />
                            <h4 className="font-display text-4xl text-white leading-none tracking-tighter">
                                1M<span className="text-hult-pink">+</span>
                            </h4>
                            <div className="font-mono text-[8px] text-gray-500 uppercase tracking-[0.2em] mt-2">Seed Capital</div>
                        </div>

                        {/* Metric 3 */}
                        <div className="relative pl-3">
                            <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-hult-pink/40" />
                            <h4 className="font-display text-4xl text-white leading-none tracking-tighter">
                                50K<span className="text-hult-pink">+</span>
                            </h4>
                            <div className="font-mono text-[8px] text-gray-500 uppercase tracking-[0.2em] mt-2">Entrepreneurs</div>
                        </div>

                        {/* Metric 4 */}
                        <div className="relative pl-3">
                            <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-hult-pink/40" />
                            <h4 className="font-display text-4xl text-white leading-none tracking-tighter">
                                200K<span className="text-hult-pink">+</span>
                            </h4>
                            <div className="font-mono text-[8px] text-gray-500 uppercase tracking-[0.2em] mt-2">Participants</div>
                        </div>
                    </div>

                    {/* Aligned Footer Metric */}
                    <div className="flex items-center gap-3 text-hult-pink border-t border-white/10 pt-6">
                        <PieChart size={16} />
                        <div className="flex flex-col">
                            <span className="font-display text-xs text-white uppercase tracking-wider">100% Equity Founders</span>
                            <span className="font-mono text-[7px] text-hult-pink/60 uppercase">Retention Protocol Active</span>
                        </div>
                    </div>
                </div>

                {/* Desktop HUD Layout: Regular Flex */}
                <div className="hidden md:flex flex-col h-full justify-between">
                    <div className="flex justify-between items-start">
                        <motion.div 
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            className="bg-black/40 backdrop-blur-md border border-white/10 p-4 rounded-sm"
                        >
                            <p className="font-mono text-[10px] text-hult-pink mb-1 tracking-widest uppercase">Seed Capital</p>
                            <p className="font-display text-3xl text-white">$1,000,000<span className="text-hult-pink">USD</span></p>
                        </motion.div>

                        <motion.div 
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            className="text-right"
                        >
                            <div className="bg-white/5 border border-white/10 px-3 py-1 rounded-full mb-2 inline-block">
                                <span className="font-mono text-[9px] text-white/60 tracking-tighter uppercase">UN SDG Aligned</span>
                            </div>
                            <p className="font-mono text-[10px] text-gray-500 max-w-[150px] leading-tight">
                                Solving the world&apos;s most urgent social & environmental issues.
                            </p>
                        </motion.div>
                    </div>

                    <div className="flex justify-end">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-[1px] bg-white/10"></div>
                            <span className="font-mono text-[9px] text-white/20 uppercase tracking-[0.3em]">Global Protocol // v.2.0</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* EL GLOBO (Optimized positioning) - Mobile is centered at top, Desktop is centered with offset */}
            <div className="absolute inset-x-0 top-0 flex justify-center md:inset-0 md:items-center md:translate-y-24">
                <div className="w-[460px] h-[460px] md:w-[950px] md:h-[950px] opacity-100 cursor-grab active:cursor-grabbing">
                    <Globe />
                </div>
            </div>
        </Card>

      </div>
    </section>
  );
};

export default Intel;