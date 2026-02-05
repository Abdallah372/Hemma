import React, { useState } from 'react';
import { cn } from '../lib/utils';
import ApiKeyGuide from './ApiKeyGuide';
import { HelpCircle, Plus, Sparkles, BrainCircuit, X } from 'lucide-react';

const InputForm = ({ onSubmit, loading }) => {
  const [subjects, setSubjects] = useState([{ name: '', level: 'medium' }]);
  const [energyLevel, setEnergyLevel] = useState(3);
  const [apiKey, setApiKey] = useState('');
  const [isGuideOpen, setIsGuideOpen] = useState(false);

  const focusLevels = [
    { value: 1, emoji: '😵', label: 'تائه' },
    { value: 2, emoji: '😐', label: 'مشتت' },
    { value: 3, emoji: '😊', label: 'هادئ' },
    { value: 4, emoji: '😃', label: 'متحمس' },
    { value: 5, emoji: '🔥', label: 'مسيطر' }
  ];

  const handleSubjectChange = (index, value) => {
    const newSubjects = [...subjects];
    newSubjects[index].name = value;
    setSubjects(newSubjects);
  };

  const addSubject = () => {
    setSubjects([...subjects, { name: '', level: 'medium' }]);
  };

  const removeSubject = (index) => {
    if (subjects.length > 1) {
      const newSubjects = subjects.filter((_, i) => i !== index);
      setSubjects(newSubjects);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ subjects, energyLevel, apiKey });
  };

  return (
    <form dir="rtl" onSubmit={handleSubmit} className="w-full max-w-4xl mx-auto space-y-8 md:space-y-12 pb-20 animate-fade-in-up">
      
      {/* 🔐 API Key Section - Clean & Minimal */}
      <div className="relative z-10">
        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center max-w-lg mx-auto">
          <div className="relative w-full">
            <input
              type="password" value={apiKey} onChange={(e) => setApiKey(e.target.value)}
              className="w-full px-6 py-4 rounded-2xl border-2 border-border focus:border-primary outline-none transition-all text-center font-mono text-sm bg-surface/50 shadow-sm"
              placeholder="أدخل مفتاح Gemini..." required
            />
          </div>
          <button 
            type="button"
            onClick={() => setIsGuideOpen(true)}
            className="shrink-0 w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center hover:bg-primary hover:text-white transition-all shadow-sm group border border-primary/20"
            aria-label="How to get API Key"
          >
            <HelpCircle className="w-6 h-6" />
          </button>
        </div>
        <p className="mt-3 text-[10px] text-center text-slate-400 font-black uppercase tracking-[0.3em]">مطلوب لتشغيل محرك التشخيص</p>
      </div>

      <ApiKeyGuide isOpen={isGuideOpen} onClose={() => setIsGuideOpen(false)} />

      {/* 🧠 Experience Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8">
        
        {/* Focus Meter Card */}
        <div className="lg:col-span-12 glass-card p-6 md:p-10 lg:p-12 rounded-3xl md:rounded-[3rem] text-center space-y-8 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-secondary"></div>
          
          <div className="space-y-3">
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-black text-foreground tracking-tight">كيف تشعر الآن؟ 🧠</h3>
            <p className="text-sm md:text-base text-slate-500 font-bold opacity-80">بناءً على حالتك، سنقوم بهندسة المهمة الأنسب لك</p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4 md:gap-8">
            {focusLevels.map((lvl) => (
              <button
                key={lvl.value}
                type="button"
                onClick={() => setEnergyLevel(lvl.value)}
                className={cn(
                  "flex flex-col items-center gap-4 transition-all duration-500 group",
                  energyLevel === lvl.value ? "scale-105" : "opacity-40 grayscale hover:opacity-100 hover:grayscale-0"
                )}
              >
                <div className={cn(
                  "w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-3xl flex items-center justify-center text-3xl md:text-4xl lg:text-5xl transition-all duration-500 border-4",
                  energyLevel === lvl.value 
                    ? "bg-primary/10 border-primary shadow-xl shadow-primary/20 rotate-3" 
                    : "bg-surface border-border hover:rotate-3"
                )}>
                  {lvl.emoji}
                </div>
                <span className={cn(
                  "text-[10px] md:text-xs font-black uppercase tracking-widest transition-colors",
                  energyLevel === lvl.value ? "text-primary" : "text-slate-400"
                )}>
                  {lvl.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Brain Dump Card (The most important part after focus) */}
        <div className="lg:col-span-12 glass-card p-6 md:p-10 lg:p-12 rounded-3xl md:rounded-[3rem] space-y-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-secondary/10 text-secondary rounded-2xl flex items-center justify-center">
                <BrainCircuit className="w-6 h-6 md:w-7 md:h-7" />
              </div>
              <h3 className="text-xl md:text-2xl lg:text-3xl font-black text-foreground">إفراغ الدماغ (Brain Dump)</h3>
            </div>
            <button
              type="button" onClick={addSubject}
              className="flex items-center gap-2 text-xs md:text-sm font-black text-primary bg-primary/10 px-6 py-2.5 rounded-full hover:bg-primary hover:text-white transition-all active:scale-95 border border-primary/20"
            >
              <Plus className="w-4 h-4" />
              <span>إضافة مهمة</span>
            </button>
          </div>
          
          <div className="space-y-4">
            {subjects.map((subject, index) => (
              <div key={index} className="flex items-center gap-3 animate-fade-in-up" style={{ animationDelay: `${index * 100}ms` }}>
                <input
                  type="text" placeholder="ماذا يدور في ذهنك؟ (مثلاً: الفيزياء، مسألة معينة...)"
                  value={subject.name}
                  onChange={(e) => handleSubjectChange(index, e.target.value)}
                  className="flex-1 px-6 md:px-8 py-4 md:py-6 rounded-2xl md:rounded-3xl border-2 border-border focus:border-primary outline-none bg-surface/50 transition-all font-bold text-foreground text-base md:text-lg lg:text-xl shadow-inner placeholder:opacity-50"
                  required
                />
                {subjects.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeSubject(index)}
                    className="shrink-0 w-12 h-12 md:w-16 md:h-16 rounded-2xl md:rounded-3xl bg-red-50 dark:bg-red-900/10 text-red-500 hover:bg-red-500 hover:text-white transition-all flex items-center justify-center border border-red-100 dark:border-red-900/20 group shadow-sm active:scale-90"
                    title="إزالة المهمة"
                  >
                    <X className="w-5 h-5 md:w-6 md:h-6 group-hover:rotate-90 transition-transform" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Action Call */}
      <div className="flex flex-col items-center gap-6 pt-6">
        <button
          type="submit" disabled={loading}
          className="w-full max-w-xl py-6 md:py-8 btn-primary-premium text-xl md:text-2xl lg:text-3xl group"
        >
          <span className="flex items-center gap-4">
            {loading ? 'جاري التحضير...' : 'ابدأ التشخيص الآن'}
            <Sparkles className={cn("w-6 h-6 md:w-8 md:h-8", loading && "animate-spin")} />
          </span>
        </button>
        <p className="text-[10px] md:text-xs text-slate-400 font-bold uppercase tracking-[0.4rem] text-center">
          One Task • Perfect Strategy • Zero Friction
        </p>
      </div>
    </form>
  );
};

export default InputForm;
