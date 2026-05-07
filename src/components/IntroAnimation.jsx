import React, { useEffect, useState } from 'react';

export default function IntroAnimation({ onComplete }) {
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    // Start fading out after 2 seconds
    const fadeTimer = setTimeout(() => {
      setIsFading(true);
    }, 2000);

    // Call onComplete after fade out animation (2.8 seconds total)
    const completeTimer = setTimeout(() => {
      onComplete();
    }, 2800);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <div 
      className={`fixed inset-0 z-[1000] bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center transition-all duration-700 ease-in-out ${
        isFading ? 'opacity-0 blur-xl pointer-events-none' : 'opacity-100 blur-0'
      }`}
    >
      <div className="relative">
        {/* Simple stylized SVG Tire/Alloy wheel */}
        <svg 
          viewBox="0 0 100 100" 
          className="w-24 h-24 animate-[spin_2s_linear_infinite] text-slate-800 dark:text-slate-200"
          fill="none" 
          stroke="currentColor" 
          strokeWidth="4" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          {/* Outer Tire */}
          <circle cx="50" cy="50" r="45" strokeWidth="8" className="text-slate-900 dark:text-slate-100" />
          {/* Inner Rim */}
          <circle cx="50" cy="50" r="32" strokeWidth="4" />
          {/* Center Hub */}
          <circle cx="50" cy="50" r="8" fill="currentColor" />
          {/* Spokes */}
          <line x1="50" y1="18" x2="50" y2="42" strokeWidth="6" />
          <line x1="50" y1="82" x2="50" y2="58" strokeWidth="6" />
          <line x1="18" y1="50" x2="42" y2="50" strokeWidth="6" />
          <line x1="82" y1="50" x2="58" y2="50" strokeWidth="6" />
          
          <line x1="27" y1="27" x2="44" y2="44" strokeWidth="4" />
          <line x1="73" y1="73" x2="56" y2="56" strokeWidth="4" />
          <line x1="27" y1="73" x2="44" y2="56" strokeWidth="4" />
          <line x1="73" y1="27" x2="56" y2="44" strokeWidth="4" />
        </svg>

        {/* Motion blur trail effect */}
        <div className="absolute inset-0 bg-blue-500/20 blur-xl rounded-full scale-110 animate-pulse"></div>
      </div>
      
      <h2 className="mt-8 text-sm font-semibold text-slate-500 dark:text-slate-400 tracking-[0.2em] uppercase">
        Loading System
      </h2>
    </div>
  );
}
