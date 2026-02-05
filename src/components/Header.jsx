import React, { useState, useEffect } from 'react';
import { cn } from '../lib/utils';
import { Brain, Moon, Sun } from 'lucide-react';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <header className={cn(
      "sticky top-0 z-[100] w-full transition-all duration-300",
      isScrolled ? "glass-card py-3 translate-y-0" : "bg-transparent py-6"
    )}>
      <nav className="container mx-auto px-4 md:px-6 lg:px-8 flex items-center justify-between">
        {/* Branding */}
        <div className="flex items-center gap-3 group cursor-pointer" onClick={() => window.location.reload()}>
          <div className="w-10 h-10 md:w-12 md:h-12 bg-primary rounded-2xl flex items-center justify-center text-white shadow-lg transition-transform group-hover:scale-110 group-active:scale-95">
            <Brain className="w-6 h-6 md:w-7 md:h-7" />
          </div>
          <div className="flex flex-col">
            <h1 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white leading-none tracking-tighter">
              هِمّـــة
            </h1>
            <span className="text-[10px] font-black text-primary uppercase tracking-[0.3em] opacity-80">Neuro Triage</span>
          </div>
        </div>

        {/* Navigation Content (Optional links can go here) */}
        <div className="flex items-center gap-4">
          {/* Dark Mode Toggle */}
          <button 
            onClick={toggleDarkMode}
            className="w-10 h-10 md:w-12 md:h-12 rounded-2xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-white/10 flex items-center justify-center text-slate-500 dark:text-slate-400 hover:text-primary transition-all shadow-sm"
            aria-label="Toggle Theme"
          >
            {isDarkMode ? <Sun className="w-5 h-5 md:w-6 md:h-6" /> : <Moon className="w-5 h-5 md:w-6 md:h-6" />}
          </button>
          
          <div className="hidden sm:block px-4 py-1.5 bg-primary/10 rounded-full">
            <span className="text-[10px] font-black text-primary uppercase tracking-widest animate-pulse">Live Protocol Active</span>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
