import React, { useState } from 'react';
import { cn } from '../lib/utils';
import NeuroReset from './NeuroReset';
import Gamification from './Gamification';
import { CheckCircle2, ChevronLeft, ChevronRight, PartyPopper, Target, ShieldCheck, Zap } from 'lucide-react';

const ResultsDisplay = ({ results }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [completed, setCompleted] = useState(false);
  
  if (!results) return null;

  const progress = ((currentStep + 1) / results.micro_steps.length) * 100;

  const handleNextStep = () => {
    if (currentStep < results.micro_steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      setCompleted(true);
      const saved = localStorage.getItem('hemma_stats');
      let stats = saved ? JSON.parse(saved) : { streak: 0, totalSessions: 0, level: 1, badges: [] };
      stats.totalSessions += 1;
      if (!stats.badges.includes('first_step')) stats.badges.push('first_step');
      if (stats.totalSessions >= 5 && !stats.badges.includes('murabit')) stats.badges.push('murabit');
      stats.level = Math.floor(stats.totalSessions / 3) + 1;
      localStorage.setItem('hemma_stats', JSON.stringify(stats));
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 0) setCurrentStep(prev => prev - 1);
  };

  return (
    <div dir="rtl" className="w-full max-w-5xl mx-auto space-y-12 pb-32 animate-fade-in-up px-4 md:px-0">
      
      {/* 🎊 Celebration Achievement Overlay */}
      {completed && (
        <div className="fixed inset-0 z-[500] flex items-center justify-center p-6 animate-fade-in backdrop-blur-3xl bg-primary/20">
          <div className="glass-card max-w-2xl w-full p-10 md:p-16 text-center space-y-10 rounded-[4rem] relative overflow-hidden border-2 border-primary/30">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary via-secondary to-primary"></div>
            <div className="space-y-6">
              <PartyPopper className="w-24 h-24 text-primary mx-auto animate-bounce" />
              <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-slate-900 dark:text-white">أحسنت! 🌟</h2>
              <p className="text-xl md:text-2xl font-bold text-slate-600 dark:text-slate-400 leading-relaxed">
                لقد كسرت حاجز المقاومة الأول ودخلت في حالة "التدفق" (Flow State). دماغك الآن في قمة استعداده.
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
               <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-3xl">
                  <span className="block text-4xl font-black text-primary">1</span>
                  <span className="text-[10px] uppercase font-black tracking-widest text-slate-400">جلسة مكتملة</span>
               </div>
               <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-3xl">
                  <span className="block text-4xl font-black text-secondary">+{results.micro_steps.length}</span>
                  <span className="text-[10px] uppercase font-black tracking-widest text-slate-400">نقطة سيادة</span>
               </div>
            </div>

            <button 
              onClick={() => setCompleted(false)}
              className="w-full py-6 btn-primary-premium text-2xl"
            >
              استمر في الإنجاز 🚀
            </button>
          </div>
        </div>
      )}

      <Gamification />

      {/* 🎯 Main Critical Focus Card */}
      <div className="glass-card p-8 md:p-16 lg:p-24 rounded-[3rem] md:rounded-[5rem] border-none relative overflow-hidden group">
        <div className="absolute top-0 right-0 bg-primary/10 text-primary px-10 py-3 rounded-bl-[2.5rem] font-black text-[10px] tracking-[0.4em] uppercase">
          Neuro-Triage Mission
        </div>

        <div className="flex flex-col items-center text-center space-y-12 md:space-y-16">
          {/* Mission Header */}
          <div className="space-y-4 max-w-3xl">
            <div className="flex justify-center gap-2 mb-4">
              <Target className="text-primary w-6 h-6 md:w-8 md:h-8" />
              <h1 className="text-sm md:text-xl font-black text-primary uppercase tracking-[0.3em] italic">مهمتك الحرجة الآن</h1>
            </div>
            <h2 className="text-4xl md:text-6xl lg:text-8xl font-black text-slate-900 dark:text-white leading-[1.1] tracking-tighter">
              {results.critical_mission}
            </h2>
          </div>

          {/* ⚡ Micro-Step Focused Terminal */}
          <div className="w-full max-w-4xl bg-slate-50 dark:bg-slate-950/50 border-4 border-slate-100 dark:border-white/5 rounded-[3rem] md:rounded-[4rem] p-8 md:p-14 lg:p-20 space-y-10 md:space-y-12 relative shadow-2xl">
            
            <div className="flex justify-between items-center px-4">
                <div className="flex items-center gap-3">
                  <Zap className="w-5 h-5 text-secondary animate-pulse" />
                  <span className="text-[10px] md:text-xs font-black text-secondary uppercase tracking-[0.4em]">المسار المجهري (Micro-Path)</span>
                </div>
                <span className="text-slate-400 font-bold text-xs md:text-sm">{currentStep + 1} / {results.micro_steps.length}</span>
            </div>

            <div className="min-h-[160px] md:min-h-[220px] flex items-center justify-center">
              <p className="text-3xl md:text-5xl lg:text-7xl font-black text-slate-800 dark:text-white leading-snug animate-fade-in-up text-center" key={currentStep}>
                {results.micro_steps[currentStep]}
              </p>
            </div>

            {/* Progress Bar */}
            <div className="space-y-4">
              <div className="w-full h-3 md:h-4 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden shadow-inner">
                  <div 
                      className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-1000 ease-out shadow-[0_0_20px_rgba(99,102,241,0.5)]"
                      style={{ width: `${progress}%` }}
                  ></div>
              </div>
              <div className="flex justify-between text-[10px] font-black text-slate-400 tracking-widest">
                <span>بداية المسار</span>
                <span>اكتمال السيادة</span>
              </div>
            </div>

            {/* Step Controls */}
            <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={handlePrevStep}
                  disabled={currentStep === 0}
                  className="flex-1 py-5 md:py-6 bg-white dark:bg-slate-800 text-slate-500 rounded-3xl font-black text-lg border border-slate-100 dark:border-white/10 hover:bg-slate-50 transition-all disabled:opacity-30 disabled:pointer-events-none"
                >
                  <ChevronRight className="inline-block ml-2" /> السابق
                </button>
                <button 
                  onClick={handleNextStep}
                  className="flex-[2] py-5 md:py-6 btn-primary-premium text-xl md:text-2xl shadow-premium group"
                >
                  <span className="flex items-center justify-center gap-4">
                    {currentStep === results.micro_steps.length - 1 ? 'إنهاء المسار بنجاح' : 'الخطوة التالية'}
                    <ChevronLeft className={cn("group-hover:-translate-x-2 transition-transform", currentStep === results.micro_steps.length - 1 && "hidden")} />
                    {currentStep === results.micro_steps.length - 1 && <CheckCircle2 size={24} />}
                  </span>
                </button>
            </div>
          </div>
        </div>
      </div>

      {/* Auxiliary Context Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12">
        
        {/* Neuro Reset Task (Takes half on large) */}
        <div className="lg:col-span-12 xl:col-span-7">
          {results.reset_tool && (
            <NeuroReset toolType={results.reset_tool} onComplete={() => {}} />
          )}
        </div>

        {/* Deep Analysis Intelligence Card */}
        <div className="lg:col-span-12 xl:col-span-5 glass-card p-10 md:p-14 rounded-[3.5rem] border-none flex flex-col justify-center space-y-8 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1 h-full bg-primary/20"></div>
          <div className="flex items-center gap-4">
             <div className="w-14 h-14 bg-indigo-50 dark:bg-indigo-900/30 rounded-2xl flex items-center justify-center text-3xl">🔍</div>
             <h4 className="font-black text-slate-500 dark:text-slate-400 uppercase text-xs tracking-[0.4em]">تحليل المهندس السلوكي</h4>
          </div>
          <div className="space-y-6">
            <p className="text-xl md:text-2xl text-slate-700 dark:text-slate-300 font-bold leading-relaxed italic border-r-4 border-primary/10 pr-6">
              {results.problem_analysis}
            </p>
            <div className="p-6 bg-primary/5 rounded-3xl border border-primary/10 flex items-start gap-4">
              <ShieldCheck className="text-primary shrink-0 mt-1" />
              <p className="text-sm font-bold text-primary dark:text-indigo-300 leading-relaxed">
                البروتوكول المقترح: {results.focus_protocol}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Willpower Anchor - Full Width Immersive Card */}
      <div className="bg-slate-900 text-white p-12 md:p-20 lg:p-24 rounded-[4rem] md:rounded-[5rem] shadow-3xl relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[100px] -mr-64 -mt-64 group-hover:opacity-60 transition-opacity"></div>
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-secondary/10 rounded-full blur-[80px] -ml-32 -mb-32"></div>
        
        <div className="relative z-10 flex flex-col lg:flex-row items-center gap-12 lg:gap-20 text-center lg:text-right">
          <div className="w-32 h-32 md:w-40 md:h-40 bg-white/5 rounded-[3rem] backdrop-blur-md flex items-center justify-center text-7xl md:text-8xl shadow-2xl shadow-black/20 shrink-0">
             📜
          </div>
          <div className="space-y-6">
             <div className="flex items-center justify-center lg:justify-start gap-4">
               <h3 className="text-primary font-black uppercase text-xs md:text-sm tracking-[0.6em] italic">مرساة السيادة والهمة</h3>
               <div className="h-px flex-1 bg-white/10 hidden lg:block"></div>
             </div>
             <p className="text-3xl md:text-5xl lg:text-6xl font-black leading-[1.2] italic tracking-tight">
               "{results.willpower_anchor}"
             </p>
             <p className="text-slate-500 text-xs md:text-sm font-bold uppercase tracking-[0.3em]">Neural Re-entry Protocol Active • {results.why_now}</p>
          </div>
        </div>
      </div>

      {/* Bottom Action */}
      <div className="text-center pt-10">
        <button 
            onClick={() => window.location.reload()}
            className="group flex items-center justify-center gap-3 mx-auto text-xs font-black text-slate-400 hover:text-primary transition-all uppercase tracking-[0.5em]"
        >
            <RefreshCw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-700" />
            <span>ابدأ من جديد (Protocol Reset)</span>
        </button>
      </div>
    </div>
  );
};

export default ResultsDisplay;
