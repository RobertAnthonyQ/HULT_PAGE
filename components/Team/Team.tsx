"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import Image from "next/image"
import { Linkedin } from "lucide-react"
import TextType from "./TextType"

import mariaImg from "./image/maria.png"
import greciaImg from "./image/grecia.png"
import abnerImg from "./image/abner.png"
import jesusImg from "./image/jesus.png"
import gustavoImg from "./image/gustavo.png"
import marcelaImg from "./image/marcela.jpeg"
import nayheImg from "./image/nayhe.png"

const TEAM_MEMBERS = [
  {
    name: "Nayheli Rojas",
    role: "CAMPUS DIRECTOR",
    image: nayheImg,
    linkedin: "https://www.linkedin.com/in/nayheli-rojas-ponce/",
  },
  {
    name: "María Hallasi",
    role: "DIRECTOR MARKETING",
    image: mariaImg,
    linkedin: "https://www.linkedin.com/in/mariahallasi/",
  },
  {
    name: "Grecia Flores",
    role: "DIRECTOR MARKETING",
    image: greciaImg,
    linkedin: "https://www.linkedin.com/in/grecia-flores-gutierrez",
  },
  {
    name: "Abner Contreras",
    role: "DIRECTOR COMMUNITY TEAM",
    image: abnerImg,
    linkedin: "https://www.linkedin.com/in/abnercontrerastutaya?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app",
  },
  {
    name: "Jesus Perez",
    role: "DIRECTOR COMMUNITY TEAM",
    image: jesusImg,
    linkedin: "https://www.linkedin.com/in/jesús-pérez-de-la-torre",
  },
  {
    name: "Gustavo Cosme",
    role: "DIRECTOR EXPERTS RELATION TEAM",
    image: gustavoImg,
    linkedin: "https://www.linkedin.com/in/gustavocosmev?utm_source=share_via&utm_content=profile&utm_medium=member_ios",
  },
  {
    name: "Marcela Palacios",
    role: "EVENTS DIRECTOR",
    image: marcelaImg,
    linkedin: "https://www.linkedin.com/in/marcela-arelhis-palacios-arones-8b2678233?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
  },
]

function TeamCard({
  member,
}: {
  member: (typeof TEAM_MEMBERS)[number]
}) {
  const [hovered, setHovered] = useState(false)
  const HULT_PINK = "#E0025F"

  return (
    <motion.div
      className="relative flex-shrink-0 w-56 md:w-72 h-80 md:h-96 border border-electric-white/10 bg-dark-grey overflow-hidden cursor-pointer group"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      {/* Image Container */}
      <div
        className={`absolute inset-0 transition-all duration-700 ${
          hovered ? "scale-105 grayscale-0 brightness-110" : "grayscale brightness-50"
        }`}
      >
        <Image
          src={member.image}
          alt={member.name}
          fill
          className="object-cover"
        />

        {/* Noise overlay */}
        <div
          className="absolute inset-0 opacity-20 mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.5'/%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* Top Pink Bar */}
      <motion.div
        className="absolute top-0 left-0 w-full h-1 z-20"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: hovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        style={{ backgroundColor: HULT_PINK, transformOrigin: "left" }}
      />

      {/* LinkedIn Icon */}
      <motion.a
        href={member.linkedin.startsWith('http') ? member.linkedin : `https://${member.linkedin}`}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute top-4 left-4 z-30 p-2 bg-void/50 backdrop-blur-sm border border-electric-white/10 rounded-full text-electric-white hover:bg-hult-pink transition-colors duration-300"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: hovered ? 1 : 0, scale: hovered ? 1 : 0.5 }}
      >
        <Linkedin size={16} />
      </motion.a>

      {/* Vertical Role Text */}
      <div
        className="absolute top-4 right-3 font-mono text-[10px] tracking-[0.2em] uppercase z-20"
        style={{
          writingMode: "vertical-rl",
          color: hovered ? HULT_PINK : "rgba(255,255,255,0.4)",
          transition: "color 0.3s",
        }}
      >
        {member.role}
      </div>

      {/* Bottom Info */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-void/90 via-void/40 to-transparent z-20">
        <div className="font-mono text-[10px] text-electric-white/30 tracking-widest mb-1">
          {"OPERATOR"}
        </div>
        <div className="font-sans text-lg font-bold uppercase tracking-wide text-electric-white">
          {member.name}
        </div>
      </div>
    </motion.div>
  )
}

export default function TeamSection() {
  const doubled = [...TEAM_MEMBERS, ...TEAM_MEMBERS]

  return (
    <section className="relative py-24 md:py-32 bg-void overflow-hidden">
      {/* Border top */}
      <div className="absolute top-0 left-0 right-0 h-px bg-electric-white/5" />

      {/* Section Header */}
      <div className="relative z-10 text-center mb-16 px-4">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="font-mono text-xs text-hult-pink tracking-[0.3em] uppercase mb-4"
        >
          {"// THE OPERATORS"}
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="font-sans text-4xl sm:text-5xl md:text-7xl font-bold uppercase tracking-tight text-electric-white"
        >
          <TextType
            text={["Meet The Team", "The Operators", "Hult Community"]}
            as="span"
            typingSpeed={75}
            pauseDuration={1500}
            showCursor
            cursorCharacter="_"
            deletingSpeed={50}
            loop={true}
          />
        </motion.h2>
      </div>

      {/* Marquee */}
      <div className="relative">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-20 md:w-40 bg-gradient-to-r from-void to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-20 md:w-40 bg-gradient-to-l from-void to-transparent z-10 pointer-events-none" />

        <div className="flex gap-6 animate-marquee hover:[animation-play-state:paused] w-max">
          {doubled.map((member, i) => (
            <TeamCard key={`${member.name}-${i}`} member={member} />
          ))}
        </div>
      </div>

      {/* Bottom data strip */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        viewport={{ once: true }}
        className="mt-16 flex items-center justify-center gap-8 font-mono text-[10px] text-electric-white/20 uppercase tracking-widest"
      >
        <span>{`SQUAD_SIZE: ${TEAM_MEMBERS.length}`}</span>
        <span className="h-px w-8 bg-electric-white/10" />
        <span>{"STATUS: DEPLOYED"}</span>
        <span className="h-px w-8 bg-electric-white/10" />
        <span>{"CLEARANCE: ALPHA"}</span>
      </motion.div>
    </section>
  )
}
