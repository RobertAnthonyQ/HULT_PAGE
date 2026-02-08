"use client";

import React, { useEffect } from "react";
import { motion, useSpring, useTransform } from "framer-motion";
import { ChevronDown } from "lucide-react";
import PixelSnow from "./PixelSnow";

const Hero: React.FC = () => {
  const count = useSpring(0, { stiffness: 50, damping: 20, duration: 2.5 });
  const rounded = useTransform(count, (latest) =>
    Math.round(latest).toLocaleString("en-US"),
  );

  const [isMobile, setIsMobile] = React.useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    count.set(1000000);
  }, [count]);

  return (
    <section className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden border-b border-hult-grey/50">
      {/* Parámetros de la nieve: editar en las props de PixelSnow abajo */}
      <div className="absolute inset-0 z-0 opacity-40">
        <PixelSnow
          color="#EC2088"
          flakeSize={isMobile ? 0.08 : 0.03}
          minFlakeSize={isMobile ? 3.0 : 1.25}
          pixelResolution={isMobile ? 150 : 200}
          speed={1.25}
          density={isMobile ? 0.15 : 0.5}
          direction={125}
          brightness={3}
          depthFade={8}
          farPlane={20}
          gamma={0.4545}
          variant="square"
          style={{ width: "100%", height: "100%" }}
        />
      </div>

      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(224,2,95,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(224,2,95,0.5) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 flex flex-col items-center gap-6 px-4">
        {/* Top Label */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="flex items-center gap-4"
        >
          <div className="h-px w-12 md:w-24 bg-hult-pink" />
          <span className="font-mono text-base md:text-lg tracking-[0.25em] text-hult-pink uppercase font-semibold">
            Hult Prize PUCP
          </span>
          <div className="h-px w-12 md:w-24 bg-hult-pink" />
        </motion.div>

        {/* The Million Dollar Counter */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
          className="relative group"
        >
          <div className="text-[18vw] md:text-[12vw] font-display font-bold leading-none tracking-tighter text-white transition-all duration-300">
            $
            <motion.span className="mix-blend-luminosity group-hover:mix-blend-normal transition-all duration-300">
              {rounded}
            </motion.span>
          </div>
        </motion.div>

        {/* Seed Capital Label */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="font-sans text-2xl sm:text-2xl md:text-4xl font-bold tracking-[0.2em] text-white/60 uppercase"
        >
          Seed Capital
        </motion.div>

        {/* Terminal Subtitle */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 0.4 }}
          className="font-mono text-sm sm:text-sm text-hult-pink/80 tracking-widest text-center"
        >
          <span className="animate-pulse">
            {"SEED CAPITAL // DEPLOYING RESOURCES..."}
          </span>
          <span className="ml-1 inline-block w-2 h-4 bg-hult-pink animate-pulse" />
        </motion.div>

        {/* Apply Now Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.0, duration: 0.6 }}
          className="mt-6 md:mt-4"
        >
          <a
            href="#apply"
            className="group relative inline-flex items-center gap-3 px-10 py-5 md:px-8 md:py-4 bg-hult-pink/10 border-2 border-hult-pink hover:bg-hult-pink hover:border-hult-pink transition-all duration-300 overflow-hidden"
          >
            {/* Background shine effect */}
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />

            <span className="relative font-mono text-base md:text-sm tracking-[0.2em] text-hult-pink group-hover:text-black uppercase font-bold">
              Apply Now
            </span>

            <motion.span
              animate={{ x: [0, 4, 0] }}
              transition={{
                duration: 1.5,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
              className="relative text-hult-pink group-hover:text-black"
            >
              →
            </motion.span>
          </a>
        </motion.div>

        {/* Status Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.5, duration: 0.6 }}
          className="mt-4 flex items-center gap-6 font-mono text-xs text-white/30 uppercase tracking-widest"
        >
          <span>{"STATUS: ACTIVE"}</span>
          <span className="h-1 w-1 rounded-full bg-green-500 animate-pulse" />
          <span>{"REGION: LATAM"}</span>
          <span className="hidden sm:inline">{"//  PUCP_NODE"}</span>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
      >
        <span className="font-mono text-xs text-white/20 uppercase tracking-widest">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{
            duration: 1.5,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        >
          <ChevronDown className="w-4 h-4 text-hult-pink/50" />
        </motion.div>
      </motion.div>

      <div className="absolute bottom-10 left-10 font-mono text-[10px] text-white/30 hidden md:block z-10">
        SYSTEM STATUS: ONLINE
      </div>

      <div className="absolute top-0 bottom-0 left-10 w-[1px] bg-white/10 hidden md:block" />
      <div className="absolute top-0 bottom-0 right-10 w-[1px] bg-white/10 hidden md:block" />
    </section>
  );
};

export default Hero;
