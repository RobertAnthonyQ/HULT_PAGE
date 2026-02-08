"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { Rocket, MapPin, Wifi, Calendar } from "lucide-react";
import Galaxy from './Galaxy';
import React from "react";

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

// --- DATA DEL EXCEL CURADA (MISIONES) ---
const MISSIONS = [
  {
    id: "01",
    title: "INITIALIZATION",
    dates: "FEB 07",
    type: "PHYSICAL", // Presencial
    location: "CAMPUS PUCP",
    events: ["Bienvenida Oficial (3-5pm)"],
    color: "#E0025F", // Hult Pink
    top: "10%",
  },
  {
    id: "02",
    title: "THE FORGE",
    dates: "FEB 10 - 19",
    type: "VIRTUAL", // Virtual
    location: "ENCRYPTED SERVER",
    events: ["Taller 1: Ideación", "Mentorías 1-1", "Taller 2: IA & Business"],
    color: "#00D1FF", // Electric Blue
    top: "35%",
  },
  {
    id: "03",
    title: "THE FILTER",
    dates: "FEB 20 - 23",
    type: "HYBRID",
    location: "BREAKOUT ROOMS",
    events: ["Evento Breakout", "Pitch Practice", "SEMIFINAL (FEB 23)"],
    color: "#FFD700", // Gold
    top: "65%",
  },
  {
    id: "04",
    title: "ASCENSION",
    dates: "FEB 28",
    type: "PHYSICAL",
    location: "MAIN AUDITORIUM",
    events: ["Gran Cierre", "Awards Ceremony"],
    color: "#E0025F", // Hult Pink
    top: "90%",
  },
];

export default function Journey() {
  const containerRef = useRef<HTMLDivElement>(null);
  const rocketRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const pulseRef = useRef<SVGPathElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
        },
      });

      // 1. Cohete siguiendo el camino
      tl.to(rocketRef.current, {
        motionPath: {
          path: pathRef.current!,
          align: pathRef.current!,
          autoRotate: 90,
          alignOrigin: [0.5, 0.5],
        },
        ease: "none",
      });

      // 2. Línea dibujándose (Laser effect)
      const paths = [pathRef.current, pulseRef.current];
      paths.forEach(p => {
        if (!p) return;
        const len = p.getTotalLength() || 3000;
        gsap.set(p, { strokeDasharray: len, strokeDashoffset: len });
      });

      tl.to(paths, {
        strokeDashoffset: 0,
        ease: "none",
      }, "<");

      // 3. Activación de Tarjetas
      cardsRef.current.forEach((card, index) => {
        if (!card) return;
        
        const mission = MISSIONS[index];
        
        gsap.to(card, {
          scrollTrigger: {
            trigger: card,
            start: "top center+=100", 
            toggleActions: "play none none reverse",
          },
          opacity: 1,
          scale: 1,
          filter: "grayscale(0)",
          boxShadow: `0 0 30px ${mission.color}44`,
          borderColor: mission.color,
          duration: 0.8,
          ease: "back.out(1.7)"
        });
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="bg-[#020202] relative w-full h-[3000px] overflow-hidden">
      
      {/* Galaxy Background - RE-HABILITADA LA INTERACCIÓN */}
      <div className="absolute inset-0 z-0 opacity-50">
        <Galaxy 
          mouseRepulsion
          mouseInteraction
          density={1}
          glowIntensity={0.3}
          saturation={0}
          hueShift={140}
          twinkleIntensity={0.3}
          rotationSpeed={0.1}
          repulsionStrength={2}
          autoCenterRepulsion={0}
          starSpeed={0.5}
          speed={1}
        />
      </div>

      {/* Background Grid */}
      <div className="fixed inset-0 pointer-events-none opacity-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

      {/* HEADER FLOTANTE */}
      <div className="sticky top-0 z-40 w-full py-6 px-8 flex justify-between items-end bg-gradient-to-b from-black via-black/80 to-transparent pointer-events-none">
        <div>
           <h2 className="text-4xl md:text-6xl font-display text-white uppercase leading-none">
             Mission <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E0025F] to-white">Protocol</span>
           </h2>
        </div>
        <div className="font-mono text-xs text-[#E0025F] animate-pulse">
           {"/// LIVE_TRACKING_ENABLED"}
        </div>
      </div>

      {/* --- EL COHETE --- */}
      <div ref={rocketRef} className="absolute z-50 top-0 left-0 w-16 h-16 md:w-24 md:h-24 flex items-center justify-center pointer-events-none">
         {/* Estela de fuego del cohete */}
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[120%] w-2 md:w-3 h-20 md:h-32 bg-gradient-to-t from-[#E0025F] to-transparent blur-xl opacity-80"></div>
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[100%] w-1 md:w-1.5 h-10 md:h-16 bg-white blur-md opacity-40"></div>
         
         <div className="relative z-10 p-2 md:p-3 bg-black/50 rounded-full border border-white/20 backdrop-blur-md shadow-[0_0_20px_rgba(224,2,95,0.3)]">
            <Rocket className="w-8 h-8 md:w-10 md:h-10 text-white fill-white transform -rotate-45" />
         </div>
      </div>


      {/* --- LAS ESTACIONES --- */}
      <div className="relative w-full h-full max-w-7xl mx-auto pointer-events-none">
        {MISSIONS.map((mission, index) => {
          const isRight = index % 2 !== 0;
          
          return (
            <div 
              key={mission.id}
              className={`
                absolute w-full md:w-[45%] flex px-4 md:px-0
                ${isRight 
                  ? 'justify-start md:left-[55%] md:justify-start' 
                  : 'justify-start md:right-[55%] md:justify-end'
                }
              `}
              style={{ top: mission.top }}
            >
              {/* Tarjeta Holográfica */}
              <div 
                ref={el => { cardsRef.current[index] = el; }}
                className="relative w-full max-w-[320px] p-6 bg-[#050505]/80 backdrop-blur-lg border border-white/5 transition-all duration-700 group pointer-events-auto opacity-20 scale-95 grayscale"
                style={{ 
                  '--mission-color': mission.color 
                } as React.CSSProperties}
              >
                  {/* ... esquinas ... */}
                  <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/30"></div>
                  <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-white/30"></div>
                  <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-white/30"></div>
                  <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/30"></div>

                  {/* Header de Misión */}
                  <div className="flex justify-between items-start mb-4">
                      <div>
                          <span className="font-mono text-[10px] text-gray-500 block mb-1">
                              {`SECTOR_${mission.id} // ${mission.type}`}
                          </span>
                          <h3 className="font-display text-xl md:text-2xl text-white uppercase group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-400 transition-all">
                              {mission.title}
                          </h3>
                      </div>
                      <div className="p-2 rounded border border-white/5 bg-white/5" style={{ color: mission.color }}>
                          {mission.type === 'PHYSICAL' ? <MapPin size={16} /> : <Wifi size={16} />}
                      </div>
                  </div>

                  {/* Lista de Eventos */}
                  <ul className="space-y-2 mb-4">
                      {mission.events.map((event, i) => (
                          <li key={i} className="flex items-center gap-2 font-mono text-[10px] md:text-xs text-gray-300">
                             <span className="w-1 h-1 rounded-full" style={{ backgroundColor: mission.color }}></span>
                             {event}
                          </li>
                      ))}
                  </ul>

                  {/* Footer de Metadata */}
                  <div className="flex items-center justify-between pt-4 border-t border-white/5">
                      <div className="flex items-center gap-2 text-[#E0025F]">
                          <Calendar size={12} />
                          <span className="font-mono text-[10px]">{mission.dates}</span>
                      </div>
                      <div className="font-mono text-[10px] text-gray-500 truncate ml-2">
                          {`[${mission.location}]`}
                      </div>
                  </div>
              </div>
              
              {/* Línea conectora */}
              <div className={`
                  absolute top-1/2 -translate-y-1/2 h-[1px] bg-white/20
                  w-[15%] right-[-15%]
                  md:w-[11.2%]
                  ${isRight ? 'md:left-[-11.2%] md:right-auto' : 'md:right-[-11.2%] md:left-auto'}
              `}>
                  <div 
                    className={`
                      absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full 
                      right-0
                      ${isRight ? 'md:left-0 md:right-auto' : 'md:right-0 md:left-auto'}
                    `} 
                    style={{ 
                      backgroundColor: mission.color,
                      boxShadow: `0 0 10px ${mission.color}` 
                    }}
                  ></div>
              </div>

            </div>
          );
        })}
      </div>


      {/* --- EL PATH SVG (Responsive) --- */}
      <svg 
        className="absolute top-0 left-0 w-full h-full pointer-events-none z-10 transition-transform duration-500 md:translate-x-0 translate-x-[35%]"
        viewBox="0 0 100 3000" 
        preserveAspectRatio="none"
      >
        <defs>
            {/* Gradiente para la línea activa - AHORA MÁS ROSADO */}
            <linearGradient id="path-gradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#E0025F" stopOpacity="0" />
                <stop offset="5%" stopColor="#E0025F" stopOpacity="1" />
                <stop offset="80%" stopColor="#E0025F" stopOpacity="1" />
                <stop offset="100%" stopColor="#E0025F" stopOpacity="0.5" />
            </linearGradient>
            
            {/* Filtro de Glow */}
            <filter id="glow" x="-100%" y="-100%" width="300%" height="300%">
                <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                </feMerge>
            </filter>

            <filter id="glow-large" x="-100%" y="-100%" width="300%" height="300%">
                <feGaussianBlur stdDeviation="12" result="coloredBlur" />
                <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                </feMerge>
            </filter>
        </defs>

        {/* 1. Línea Base (La que está "medio oculta") */}
        <path
          d="M 50 0 C 50 400, 50 400, 50 800 C 50 1200, 50 1200, 50 1600 C 50 2000, 50 2000, 50 2400 L 50 3000"
          stroke="#ffffff" 
          strokeWidth="1" 
          strokeOpacity="0.1" 
          fill="none"
        />

        {/* 2. Rastro de Energía (Ancho y suave) - ROSADO INTENSO */}
        <path
          ref={pulseRef}
          d="M 50 0 C 50 400, 50 400, 50 800 C 50 1200, 50 1200, 50 1600 C 50 2000, 50 2000, 50 2400 L 50 3000"
          stroke="#E0025F" 
          strokeWidth="10" 
          strokeOpacity="0.4" 
          fill="none"
          filter="url(#glow-large)"
        />

        {/* 3. Línea Principal (Láser que se dibuja) */}
        <path
          ref={pathRef}
          d="M 50 0 C 50 400, 50 400, 50 800 C 50 1200, 50 1200, 50 1600 C 50 2000, 50 2000, 50 2400 L 50 3000"
          stroke="url(#path-gradient)" 
          strokeWidth="4" 
          fill="none"
          filter="url(#glow)"
        />

      </svg>

    </section>
  );
}
