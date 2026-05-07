import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Code2, Sun, Moon } from 'lucide-react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [theme, setTheme] = useState('dark');
  const menuItems = ['Home', 'About', 'Projects', 'Skills', 'Contact'];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const handleNavClick = (section) => {
    const el = document.getElementById(section.toLowerCase());
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className={`fixed top-0 left-0 w-full h-20 flex items-center justify-between px-6 md:px-12 z-[100] transition-all duration-300 ${isScrolled ? 'bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800 shadow-sm' : 'bg-transparent'}`}>
      <div className="flex items-center gap-3 cursor-pointer group" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
        <h1 className="text-xl font-bold tracking-widest text-slate-900 dark:text-white">
          AKSHAY <span className="text-blue-600 dark:text-blue-400">ANILKUMAR</span>
        </h1>
      </div>
      
      <div className="hidden lg:flex items-center gap-8 font-medium text-sm">
        {menuItems.map((item) => (
          <button
            key={item}
            onClick={() => handleNavClick(item)}
            className="text-slate-600 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400 transition-colors relative group"
          >
            {item}
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 dark:bg-blue-400 transition-all group-hover:w-full rounded-full"></span>
          </button>
        ))}
      </div>

      <div className="flex items-center gap-4">
        <button 
          onClick={toggleTheme} 
          className="relative p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors overflow-hidden flex items-center justify-center w-10 h-10"
          aria-label="Toggle Dark Mode"
        >
          <motion.div
            initial={false}
            animate={{ 
              rotate: theme === 'dark' ? 0 : 180,
              scale: theme === 'dark' ? 1 : 0
            }}
            transition={{ duration: 0.3 }}
            className="absolute"
          >
            <Moon className="w-5 h-5" />
          </motion.div>
          <motion.div
            initial={false}
            animate={{ 
              rotate: theme === 'light' ? 0 : -180,
              scale: theme === 'light' ? 1 : 0
            }}
            transition={{ duration: 0.3 }}
            className="absolute"
          >
            <Sun className="w-5 h-5" />
          </motion.div>
        </button>

        {/* Mobile menu icon placeholder */}
        <div className="lg:hidden w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex flex-col justify-center items-center gap-1.5 cursor-pointer">
           <div className="h-0.5 bg-slate-600 dark:bg-slate-300 w-5 rounded-full"></div>
           <div className="h-0.5 bg-slate-600 dark:bg-slate-300 w-5 rounded-full"></div>
           <div className="h-0.5 bg-slate-600 dark:bg-slate-300 w-5 rounded-full"></div>
        </div>
      </div>
    </nav>
  );
}
