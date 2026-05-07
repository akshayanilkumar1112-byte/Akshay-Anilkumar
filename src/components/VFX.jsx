import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export function SpeedLines() {
  const [lines, setLines] = useState([]);

  useEffect(() => {
    const newLines = Array.from({ length: 25 }).map((_, i) => ({
      id: i,
      top: Math.random() * 100 + '%',
      left: Math.random() * 100 + '%',
      width: Math.random() * 300 + 100 + 'px',
      delay: Math.random() * 5 + 's',
      duration: Math.random() * 0.5 + 0.2 + 's',
      opacity: Math.random() * 0.2 + 0.05
    }));
    setLines(newLines);
  }, []);

  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none bg-[radial-gradient(circle_at_center,#0f0f0f_0%,#050505_100%)]">
      {lines.map((line) => (
        <div
          key={line.id}
          className="speed-line"
          style={{
            top: line.top,
            width: line.width,
            animationDelay: line.delay,
            animationDuration: line.duration,
            opacity: line.opacity
          }}
        />
      ))}
    </div>
  );
}

export function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isPointer, setIsPointer] = useState(false);
  const [trail, setTrail] = useState([]);

  useEffect(() => {
    const moveCursor = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      
      // Handle trail
      setTrail(prev => [{ x: e.clientX, y: e.clientY, id: Date.now() }, ...prev.slice(0, 5)]);

      const target = e.target;
      if (target) {
        setIsPointer(window.getComputedStyle(target).cursor === 'pointer');
      }
    };
    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, []);

  return (
    <>
      {/* Trail particles */}
      {trail.map((t, i) => (
        <div
          key={t.id}
          className="fixed pointer-events-none z-[9998] bg-cyan-500/20 rounded-full blur-[2px]"
          style={{
            left: t.x,
            top: t.y,
            width: 15 - i * 2,
            height: 15 - i * 2,
            transform: 'translate(-50%, -50%)',
            opacity: (5 - i) / 15
          }}
        />
      ))}

      <div 
        className="fixed pointer-events-none z-[9999] flex items-center justify-center transition-transform duration-150 ease-out"
        style={{ 
          left: position.x, 
          top: position.y, 
          transform: `translate(-50%, -50%) ${isPointer ? 'scale(1.5)' : 'scale(1)'}`,
        }}
      >
        {/* Custom Target Cursor Visual from Screenshot */}
        <div className="relative w-10 h-10 border border-cyan-500/50 rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(0,242,255,0.3)]">
          <div className="absolute w-[1px] h-full bg-cyan-500/40"></div>
          <div className="absolute w-full h-[1px] bg-cyan-500/40"></div>
          <div className="w-3 h-3 border border-cyan-400 rounded-full flex items-center justify-center">
             <div className="w-1 h-1 bg-cyan-400 rounded-full shadow-[0_0_10px_#00f2ff]"></div>
          </div>
        </div>
        
        {isPointer && (
          <div className="absolute inset-[-10px] border border-pink-500/30 rounded-full animate-ping"></div>
        )}
      </div>
    </>
  );
}
