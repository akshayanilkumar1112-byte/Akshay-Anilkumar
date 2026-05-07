import React from 'react';
import { motion } from 'framer-motion';

export function NitroSkills({ skill, percentage }) {
  return (
    <div className="mb-8 w-full group">
      <div className="flex justify-between mb-2 font-racing italic font-black uppercase text-xs tracking-widest">
        <span className="text-white group-hover:text-red-600 transition-colors">{skill}</span>
        <span className="text-red-600">{percentage}% NITRO</span>
      </div>
      <div className="nitro-bar-container">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${percentage}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="nitro-bar-fill"
        />
      </div>
    </div>
  );
}

export function TechMarquee() {
  const techs = [
    "React", "Node.js", "Python", "Django", "Tailwind CSS", "Framer Motion", 
    "PostgreSQL", "Git", "Docker", "Vite", "JavaScript", "TypeScript",
    "FastAPI", "MongoDB", "Redux", "Three.js"
  ];

  return (
    <div className="py-10 bg-red-600/5 border-y border-white/5 overflow-hidden flex whitespace-nowrap">
      <div className="flex animate-marquee-slow hover:pause">
        {[...Array(2)].map((_, i) => (
          <div key={i} className="flex items-center">
            {techs.map((tech, idx) => (
              <span 
                key={idx} 
                className="mx-10 text-4xl md:text-6xl font-black italic uppercase tracking-tighter opacity-10 hover:opacity-100 hover:text-red-600 transition-all cursor-default font-racing"
              >
                {tech}
              </span>
            ))}
          </div>
        ))}
      </div>
      <style>{`
        @keyframes marquee-slow {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee-slow {
          animation: marquee-slow 40s linear infinite;
        }
        .hover\\:pause:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}
