import React, { useState, useEffect } from 'react';
import { cn } from '../lib/utils';
import { Wind, Coffee, Play, X, RefreshCw } from 'lucide-react';

const NeuroReset = ({ toolType, onComplete }) => {
  const [active, setActive] = useState(false);
  const [timer, setTimer] = useState(0);
  const [phase, setPhase] = useState('idle'); // idle, inhale, hold, exhale

  useEffect(() => {
    let interval;
    if (active && toolType.includes('تنفس')) {
      interval = setInterval(() => {
        setTimer((prev) => {
          if (phase === 'inhale' && prev >= 4) { setPhase('hold'); return 0; }
          if (phase === 'hold' && prev >= 7) { setPhase('exhale'); return 0; }
          if (phase === 'exhale' && prev >= 8) { 
            setPhase('inhale'); 
            return 0; 
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [active, phase, toolType]);

  const startBreathing = () => {
    setActive(true);
    setPhase('inhale');
    setTimer(0);
  };

  return (
    <div className="w-full glass-card p-8 md:p-12 lg:p-14 rounded-[3rem] text-center space-y-8 relative overflow-hidden group">
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 blur-2xl"></div>
      
      <div className="flex flex-col items-center gap-6">
        <div className="w-16 h-16 md:w-20 md:h-20 bg-primary/10 text-primary rounded-[2rem] flex items-center justify-center text-3xl md:text-4xl shadow-inner group-hover:rotate-6 transition-transform">
          {toolType.includes('تنفس') ? <Wind size={32} className="md:w-10 md:h-10" /> : <Coffee size={32} className="md:w-10 md:h-10" />}
        </div>
        <div className="space-y-3">
          <h3 className="text-xl md:text-2xl lg:text-3xl font-black text-slate-800 dark:text-white tracking-tight">بروتوكول إعادة الضبط العصبي</h3>
          <p className="text-primary font-black text-[10px] md:text-xs tracking-[0.5em] uppercase px-4 py-1 bg-primary/5 rounded-full inline-block">{toolType}</p>
        </div>

        {toolType.includes('تنفس') ? (
          <div className="flex flex-col items-center space-y-10 w-full animate-fade-in-up">
            {!active ? (
              <button 
                onClick={startBreathing}
                className="btn-primary-premium flex items-center gap-3"
              >
                <Play size={20} />
                <span>ابدأ تمرين 4-7-8</span>
              </button>
            ) : (
              <div className="flex flex-col items-center space-y-10">
                <div className={cn(
                  "w-48 h-48 md:w-56 md:h-56 rounded-full border-[10px] flex items-center justify-center transition-all duration-1000",
                  phase === 'inhale' ? "border-primary scale-110 bg-primary/10 shadow-[0_0_40px_rgba(99,102,241,0.2)]" : 
                  phase === 'hold' ? "border-secondary scale-105 bg-secondary/10" : 
                  "border-slate-200 scale-90 bg-transparent"
                )}>
                  <div className="flex flex-col items-center">
                    <span className="text-6xl font-black text-slate-800 dark:text-white">{timer}</span>
                    <span className="text-[10px] font-black uppercase tracking-widest opacity-40">SECONDS</span>
                  </div>
                </div>
                
                <div className="text-2xl md:text-3xl font-black text-slate-800 dark:text-slate-200 tracking-tighter animate-pulse flex items-center gap-3">
                  {phase === 'inhale' ? 'شهيق (Inhale)... 💨' : phase === 'hold' ? 'احبس النفس (Hold)... ✋' : 'زفير (Exhale)... 🧘'}
                </div>

                <div className="flex gap-4">
                  <button onClick={() => setActive(false)} className="flex items-center gap-2 text-[10px] font-black text-slate-400 hover:text-red-500 transition-all uppercase tracking-widest">
                    <X size={12} /> إنهاء
                  </button>
                  <button onClick={() => { setPhase('inhale'); setTimer(0); }} className="flex items-center gap-2 text-[10px] font-black text-slate-400 hover:text-primary transition-all uppercase tracking-widest">
                    <RefreshCw size={12} /> إعادة
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="bg-slate-50 dark:bg-slate-900/50 p-8 md:p-12 rounded-[2.5rem] border border-slate-100 dark:border-white/5 w-full space-y-8 animate-fade-in-up">
            <p className="text-lg md:text-xl lg:text-2xl font-bold leading-relaxed italic text-slate-600 dark:text-slate-400">
              "هذا التمرين مصمم لكسر حلقة التشتت الإلكتروني وإعادة شحن القشرة الجبهية."
            </p>
            <button onClick={onComplete} className="btn-secondary-premium">
              تم التنفيذ بنجاح ✓
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default NeuroReset;
