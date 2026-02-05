import React from 'react';
import { cn } from '../lib/utils';
import { ExternalLink, Key, ShieldCheck, Zap, X } from 'lucide-react';

const ApiKeyGuide = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const steps = [
    {
      icon: <ExternalLink size={24} />,
      title: 'افتح الرابط',
      desc: 'ادخل إلى AI Studio الخاص بجوجل',
      link: 'https://aistudio.google.com/app/apikey',
      linkLabel: 'اضغط هنا للفتح'
    },
    {
      icon: <Key size={24} />,
      title: 'أنشئ المفتاح',
      desc: 'انقر على Create API key',
    },
    {
      icon: <Zap size={24} />,
      title: 'انسخ والصق',
      desc: 'انسخ الرمز وضعه في هِمّة',
    }
  ];

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 md:p-8 animate-fade-in">
      {/* Immersive Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-2xl transition-opacity animate-fade-in"
        onClick={onClose}
      ></div>

      {/* Modern Compact Modal */}
      <div className="relative bg-white dark:bg-slate-900 w-full max-w-xl rounded-[3rem] shadow-[0_32px_64px_-12px_rgba(0,0,0,0.3)] border border-white/20 dark:border-white/5 overflow-hidden animate-fade-in-up">
        
        {/* Dynamic Gradient Header */}
        <div className="h-2 w-full bg-gradient-to-r from-primary via-secondary to-primary"></div>
        
        <div className="p-8 md:p-14 space-y-12">
          {/* Header */}
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-primary/10 text-primary rounded-[1.5rem] flex items-center justify-center mx-auto mb-4">
               <Key size={32} />
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tighter leading-tight">الحصول على المفتاح 🔑</h2>
            <p className="text-slate-500 dark:text-slate-400 font-bold text-sm md:text-base italic">خطوات بسيطة لتفعيل محرك السيادة العصبية</p>
          </div>

          {/* Minimalist Steps List */}
          <div className="grid grid-cols-1 gap-6 md:gap-8">
            {steps.map((step, idx) => (
              <div key={idx} className="flex items-center gap-6 p-5 rounded-3xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-all group border border-transparent hover:border-slate-100 dark:hover:border-white/5">
                <div className="w-14 h-14 bg-white dark:bg-slate-800 shadow-sm rounded-2xl flex items-center justify-center text-primary shrink-0 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-indigo-100/50 dark:shadow-none">
                  {step.icon}
                </div>
                <div className="flex-1 space-y-1 text-right">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-black bg-primary/10 text-primary px-2 py-0.5 rounded-md">STEP {idx+1}</span>
                    <h4 className="font-black text-slate-800 dark:text-slate-200 tracking-tight text-lg">{step.title}</h4>
                  </div>
                  <p className="text-sm text-slate-500 dark:text-slate-400 font-bold leading-relaxed">{step.desc}</p>
                  {step.link && (
                    <a 
                      href={step.link} target="_blank" rel="noreferrer"
                      className="inline-block text-xs text-primary font-black underline decoration-primary/20 underline-offset-4 hover:decoration-primary transition-all mt-1"
                    >
                      {step.linkLabel} ↗️
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Compact Info Box */}
          <div className="p-6 bg-slate-50 dark:bg-slate-800/50 rounded-3xl border border-slate-100 dark:border-white/5 flex items-start gap-4 animate-pulse">
             <ShieldCheck className="text-primary mt-1 shrink-0" size={20} />
             <p className="text-[11px] md:text-xs font-bold text-slate-500 dark:text-slate-400 leading-relaxed">
               تنبيه أمان: "هِمّة" يحفظ المفتاح محلياً في جهازك فقط. لن يتم تسريبه أو استخدامه لأغراض أخرى.
             </p>
          </div>

          {/* Action Area */}
          <div className="pt-2">
            <button 
              onClick={onClose}
              className="w-full py-6 btn-primary-premium text-xl"
            >
              فهمت، لنبدأ 🚀
            </button>
            <p className="mt-4 text-[10px] text-center text-slate-400 dark:text-slate-500 font-black uppercase tracking-[0.4em] opacity-60">
              Free • Secure • Decentralized
            </p>
          </div>
        </div>

        {/* Minimal Close Icon */}
        <button 
            onClick={onClose}
            className="absolute top-8 left-8 w-10 h-10 flex items-center justify-center rounded-2xl bg-slate-100/50 dark:bg-slate-800/50 text-slate-400 hover:text-red-500 transition-all border border-transparent hover:border-red-100 dark:border-white/5"
            aria-label="Close Guide"
        >
            <X size={20} />
        </button>
      </div>
    </div>
  );
};

export default ApiKeyGuide;
