import React, { useState, useEffect } from 'react';
import { cn } from '../lib/utils';
import { Trophy, Flame, Brain, Info } from 'lucide-react';

const Gamification = () => {
  const [stats, setStats] = useState({
    streak: 0,
    totalSessions: 0,
    level: 1,
    badges: []
  });

  useEffect(() => {
    const saved = localStorage.getItem('hemma_stats');
    if (saved) {
      setStats(JSON.parse(saved));
    }
  }, []);

  const badges_list = [
    { id: 'first_step', title: 'الخطوة الأولى', icon: '🌟', desc: 'بدأت أول رحلة سيادة عصبية' },
    { id: 'murabit', title: 'المُرابط', icon: '🏰', desc: 'أكملت 5 جلسات تشخيصية' },
    { id: 'himma_high', title: 'عالي الهمة', icon: '🦅', desc: 'وصلت لمستوى تركيز 10/10' }
  ];

  return (
    <div className="w-full flex flex-wrap justify-center gap-4 py-8 md:py-12 animate-fade-in-up">
      {/* Streak Counter */}
      <div className="flex flex-col items-center p-6 md:p-8 glass-card rounded-3xl min-w-[140px] md:min-w-[160px] group hover:scale-105 transition-all">
        <Flame className="w-8 h-8 md:w-10 md:h-10 text-orange-500 mb-2 group-hover:animate-bounce" />
        <span className="text-3xl md:text-4xl font-black text-slate-800 dark:text-white">{stats.streak}</span>
        <span className="text-[10px] md:text-xs font-black text-slate-400 uppercase tracking-widest">يوم متتالي</span>
      </div>
      
      {/* Level Rank */}
      <div className="flex flex-col items-center p-6 md:p-8 glass-card rounded-3xl min-w-[140px] md:min-w-[160px] group hover:scale-105 transition-all">
        <Trophy className="w-8 h-8 md:w-10 md:h-10 text-yellow-500 mb-2 group-hover:rotate-12 transition-transform" />
        <span className="text-3xl md:text-4xl font-black text-slate-800 dark:text-white">Lvl {stats.level}</span>
        <span className="text-[10px] md:text-xs font-black text-slate-400 uppercase tracking-widest">رتبة إدراكية</span>
      </div>

      {/* Badges Hub */}
      <div className="flex gap-4 items-center px-4 md:px-10 mt-4 md:mt-0">
        {badges_list.map(b => (
          <div key={b.id} className="group relative">
            <div className={cn(
              "w-14 h-14 md:w-16 md:h-16 rounded-2xl flex items-center justify-center text-2xl md:text-3xl shadow-premium border-2 transition-all duration-500",
              stats.badges.includes(b.id) 
                ? "bg-primary/10 border-primary scale-110 shadow-lg shadow-primary/20 rotate-3" 
                : "bg-slate-50 dark:bg-slate-800 border-transparent opacity-30 grayscale"
            )}>
              {b.icon}
            </div>
            {/* Tooltip */}
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 p-4 bg-slate-900 text-white rounded-2xl text-xs w-40 hidden group-hover:block z-[150] shadow-2xl animate-fade-in-up">
              <div className="flex items-center gap-2 mb-1">
                <Info size={12} className="text-primary" />
                <p className="font-black text-primary">{b.title}</p>
              </div>
              <p className="opacity-80 leading-relaxed font-bold">{b.desc}</p>
              <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-slate-900"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gamification;
