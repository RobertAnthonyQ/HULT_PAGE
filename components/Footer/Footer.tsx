"use client";
import React, { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { Linkedin } from "lucide-react";
import UserProfileInitialization from "../UserProfileInitialization/UserProfileInitialization";

const TagSphere = dynamic(
  () => import("react-tag-sphere").then((mod) => mod.TagSphere),
  {
    ssr: false,
    loading: () => <div className="w-full h-full" />,
  },
);

interface ProfileSummary {
  name: string;
  career?: string;
  linkedin_url?: string;
  isNew?: boolean;
}

interface ProfileResponse {
  first_name: string;
  last_name: string;
  career?: string;
  linkedin_url?: string;
}

const glitchStyles = `
  @keyframes tech-flicker {
    0% { opacity: 1; transform: translateX(0); }
    10% { opacity: 0.8; transform: translateX(-1px); }
    15% { opacity: 1; transform: translateX(1px); }
    20% { opacity: 0.9; transform: translateX(0); }
    100% { opacity: 1; transform: translateX(0); }
  }
  .tech-hover-effect:hover {
    animation: tech-flicker 0.2s infinite;
  }
`;

const HULT_WORDS: ProfileSummary[] = [
  { name: "Hult Prize" },
  { name: "Impact" },
  { name: "Innovation" },
  { name: "Sustainability" },
  { name: "SDGs" },
  { name: "Entrepreneurship" },
  { name: "Social Change" },
  { name: "Future" },
  { name: "Global" },
  { name: "Leadership" },
  { name: "Venture" },
  { name: "Business" },
  { name: "Change Makers" },
  { name: "Empowerment" },
  { name: "Environment" },
  { name: "Community" },
  { name: "Scalability" },
  { name: "Equity" },
  { name: "Diversity" },
  { name: "Inclusion" },
  { name: "PUCP" },
  { name: "Peru" },
  { name: "Lima" },
  { name: "Competition" },
  { name: "Pitch" },
  { name: "Accelerator" },
  { name: "Incubator" },
  { name: "Mentorship" },
  { name: "Networking" },
  { name: "Success" },
  { name: "Growth" },
  { name: "Purpose" },
  { name: "Vision" },
  { name: "Mission" },
  { name: "Action" },
  { name: "Strategy" },
  { name: "Transformation" },
  { name: "Progress" },
  { name: "Creativity" },
  { name: "Collaboration" },
  { name: "Ecosystem" },
  { name: "Disruption" },
  { name: "Scalability" },
  { name: "Quantum" },
  { name: "Momentum" },
  { name: "Execution" },
  { name: "Framework" },
  { name: "Bootstrap" },
  { name: "Funding" },
  { name: "Impactful" },
  { name: "Unicorn" },
  { name: "Exit" },
  { name: "Revenue" },
  { name: "Validation" },
  { name: "Prototype" },
  { name: "MVP" },
  { name: "Feedback" },
  { name: "Iterate" },
  { name: "Pivot" },
  { name: "Scaleup" },
  { name: "Moonshot" },
  { name: "Launchpad" },
  { name: "Synergy" },
  { name: "Catalyst" },
];

const getCombinedItems = (profiles: ProfileSummary[]) => {
  if (profiles.length === 0) return HULT_WORDS;
  const combined = [...profiles];
  if (combined.length < 80) {
    let i = 0;
    while (combined.length < 80) {
      combined.push(HULT_WORDS[i % HULT_WORDS.length]);
      i++;
    }
  }
  return combined;
};

const OptimizedSphere = React.memo(({ items }: { items: ProfileSummary[] }) => {
  const [radius, setRadius] = useState(300);
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => {
      setRadius(window.innerWidth < 768 ? 600 : 850);
    };
    handleResize();

    if (typeof window !== "undefined") {
      const timer = setTimeout(() => {
        setMounted(true);
      }, 500);

      window.addEventListener("resize", handleResize);
      return () => {
        window.removeEventListener("resize", handleResize);
        clearTimeout(timer);
      };
    }
  }, []);

  const tags = items.map((item, index) => (
    <div
      key={`${item.name}-${index}`}
      className="group relative flex flex-col items-center justify-center transition-all duration-300 pointer-events-auto px-4 py-2"
      style={{
        cursor: item.linkedin_url ? "pointer" : "default",
      }}
      onClick={(e) => {
        if (item.linkedin_url) {
          e.stopPropagation();
          window.open(item.linkedin_url, "_blank", "noopener,noreferrer");
        }
      }}
    >
      <div className="flex flex-col items-center gap-1">
        <div className="flex items-center gap-2">
          <span
            className={`${item.isNew ? "text-hult-pink opacity-100 font-bold scale-110" : "text-white opacity-40"} group-hover:text-hult-pink group-hover:font-[800] group-hover:opacity-100 transition-all duration-200 uppercase tracking-[0.25em] tech-hover-effect`}
            style={{
              fontSize:
                index % 3 === 0 ? "18px" : index % 3 === 1 ? "16px" : "14px",
              fontWeight: item.isNew ? 800 : 300,
              fontFamily: "Inter, var(--font-sans), sans-serif",
            }}
          >
            {item.name}
          </span>
          {item.linkedin_url && (
            <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:text-hult-pink scale-75">
              <Linkedin
                size={14}
                className="transition-colors duration-300"
                fill="currentColor"
              />
            </div>
          )}
        </div>
        {(item.career || item.isNew) && (
          <div
            className={`${item.isNew ? "opacity-100" : "opacity-0 group-hover:opacity-100"} transition-all duration-300 pointer-events-none z-10 whitespace-nowrap`}
          >
            <p className="text-[10px] text-hult-pink font-mono uppercase tracking-[0.2em]">
              [ {item.isNew ? "NEW_REVOLUTIONARY" : item.career} ]
            </p>
          </div>
        )}
      </div>
    </div>
  ));

  return (
    <div
      ref={containerRef}
      className="absolute -right-[900px] md:-right-[800px] top-1/2 -translate-y-1/2 w-[1800px] h-[1800px] flex items-center justify-center pointer-events-none z-10 overflow-visible"
    >
      <style dangerouslySetInnerHTML={{ __html: glitchStyles }} />
      <div className="w-full h-full flex items-center justify-center pointer-events-auto">
        {mounted && (
          <TagSphere
            tags={tags}
            radius={radius}
            maxSpeed={3}
            initialSpeed={10}
            initialDirection={135}
            keepRollingAfterMouseOut={true}
            fullWidth={true}
            blur={true}
            blurMultiplier={0.8}
          />
        )}
      </div>
    </div>
  );
});
OptimizedSphere.displayName = "OptimizedSphere";

const Footer: React.FC = () => {
  const [profiles, setProfiles] = useState<ProfileSummary[]>([]);

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const response = await fetch("/api/profiles/summary");
        if (response.ok) {
          const data: ProfileResponse[] = await response.json();
          const mapped = data.map((p) => ({
            name: `${p.first_name} ${p.last_name}`,
            career: p.career,
            linkedin_url: p.linkedin_url,
          }));
          if (mapped.length > 0) {
            setProfiles(mapped);
          }
        }
      } catch (error) {
        console.error("Error fetching profiles for sphere:", error);
      }
    };

    fetchProfiles();
  }, []);

  const handleProfileCreated = (
    newProfile: ProfileSummary & { isNew?: boolean },
  ) => {
    setProfiles((prev) => [{ ...newProfile, isNew: true }, ...prev]);
  };

  return (
    <footer id="footer" className="relative w-full h-screen bg-black flex items-center justify-start overflow-hidden border-t-2 border-hult-pink px-10 md:px-24 py-10">
      {/* Interactive Tag Sphere - This is now memoized and won't re-render when we toggle the form */}
      <OptimizedSphere items={getCombinedItems(profiles)} />

      {/* Branding / Form Area */}
      <div className="z-20 w-full max-w-lg flex flex-col items-start mt-[-20px]">
        <div className="font-mono text-hult-pink text-xs mb-3 tracking-[0.2em] uppercase font-bold">
          NETWORK_ESTABLISHED
        </div>
        <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-4 tracking-tighter">
          JOIN THE <br /> <span className="text-hult-pink">REVOLUTION.</span>
        </h2>

        <div id="apply" className="w-full">
          <UserProfileInitialization onSuccess={handleProfileCreated} />
        </div>
      </div>

      <div className="absolute bottom-10 w-full flex justify-between px-10 text-[10px] md:text-xs font-mono text-gray-500 uppercase">
        <div>© 2026 Hult Prize PUCP</div>
        <div className="flex gap-4">
          <a href="#" className="hover:text-hult-pink transition-colors">
            Instagram
          </a>
          <a href="#" className="hover:text-hult-pink transition-colors">
            LinkedIn
          </a>
          <a href="#" className="hover:text-hult-pink transition-colors">
            Manifesto
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
