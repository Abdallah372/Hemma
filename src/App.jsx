import React, { useState } from 'react';
import Header from './components/Header';
import InputForm from './components/InputForm';
import DiagnosticChat from './components/DiagnosticChat';
import ResultsDisplay from './components/ResultsDisplay';
import { cn } from './lib/utils';
import { AlertCircle, X } from 'lucide-react';

function App() {
  const [stage, setStage] = useState('input'); // input, diagnostic, results
  const [sessionData, setSessionData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);

  const handleStartDiagnostic = (data) => {
    if (!data.apiKey) {
      setError("يرجى إدخال مفتاح الـ API لبدء البروتوكول الذكي.");
      return;
    }
    setSessionData(data);
    setStage('diagnostic');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFinalDiagnosis = (diagnosis) => {
    setResults(diagnosis);
    setStage('results');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-background selection:bg-primary/20 transition-colors duration-500">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-8 md:py-16 lg:py-24 relative z-10">
        
        {/* Global Error Toast */}
        {error && (
          <div className="fixed top-24 left-1/2 -translate-x-1/2 z-[200] w-full max-w-md animate-fade-in-up">
            <div className="bg-red-50 dark:bg-red-900/30 border-2 border-red-100 dark:border-red-900/50 p-4 rounded-3xl flex items-center justify-between shadow-2xl backdrop-blur-md">
              <div className="flex items-center gap-3 text-red-700 dark:text-red-400 font-bold">
                <AlertCircle className="shrink-0" />
                <p>{error}</p>
              </div>
              <button onClick={() => setError(null)} className="p-1 hover:bg-red-100 dark:hover:bg-red-900/50 rounded-full transition-colors">
                <X size={18} />
              </button>
            </div>
          </div>
        )}

        {/* Dynamic Workflow Engine */}
        <div className="w-full">
          {stage === 'input' && (
            <InputForm 
              onSubmit={handleStartDiagnostic} 
              loading={loading} 
            />
          )}

          {stage === 'diagnostic' && (
            <DiagnosticChat 
              initialTask={sessionData.subjects.map(s => s.name).join(', ')}
              apiKey={sessionData.apiKey}
              onFinalDiagnosis={handleFinalDiagnosis}
            />
          )}

          {stage === 'results' && (
            <ResultsDisplay results={results} />
          )}
        </div>
      </main>

      {/* Modern Deep Footer */}
      <footer className="py-12 md:py-20 border-t dark:border-white/5 bg-white/50 dark:bg-slate-900/50 backdrop-blur-lg">
        <div className="container mx-auto px-4 text-center space-y-8">
          <div className="flex justify-center gap-8 md:gap-16 opacity-30 grayscale hover:grayscale-0 transition-all duration-700">
             <span className="text-[10px] font-black uppercase tracking-[0.5em]">Neuro-Science</span>
             <span className="text-[10px] font-black uppercase tracking-[0.5em]">Behavioral Lab</span>
             <span className="text-[10px] font-black uppercase tracking-[0.5em]">AI Distributed</span>
          </div>
          
          <div className="space-y-4">
             <p className="text-slate-400 font-black text-[10px] md:text-sm uppercase tracking-[0.4em]">
                تم التطوير السيادي بواسطة هِمّـــة • Socratic Interview System V6
             </p>
             <p className="text-primary text-[10px] font-black uppercase tracking-widest opacity-60">
                Designed for Focus • Engineered for Sovereignty
             </p>
          </div>
        </div>
      </footer>
      
      {/* Decorative Background Elements */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[120px] animate-pulse-slow"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-secondary/5 rounded-full blur-[120px] animate-pulse-slow [animation-delay:2s]"></div>
      </div>
    </div>
  );
}

export default App;
