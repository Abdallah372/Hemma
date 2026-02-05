import React, { useState, useEffect, useRef } from 'react';
import { cn } from '../lib/utils';
import { diagnosticService } from '../services/diagnosticService';
import { Send, User, Bot, Loader2, Sparkles } from 'lucide-react';

const DiagnosticChat = ({ initialTask, apiKey, onFinalDiagnosis }) => {
  const [messages, setMessages] = useState([]);
  const [extractedInfo, setExtractedInfo] = useState({});
  const [currentInput, setCurrentInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [stage, setStage] = useState('rapport'); // rapport, exploration, deep-dive
  const [ready, setReady] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const startSession = async () => {
      setLoading(true);
      try {
        const result = await diagnosticService.startDiagnostic(initialTask, apiKey);
        setMessages([
          { role: 'student', content: initialTask },
          { role: 'ai', content: result.openingQuestion }
        ]);
        setExtractedInfo({ initialAnalysis: result });
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    startSession();
  }, [initialTask, apiKey]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!currentInput.trim() || loading) return;

    const newMessages = [...messages, { role: 'student', content: currentInput }];
    setMessages(newMessages);
    setCurrentInput('');
    setLoading(true);

    try {
      const result = await diagnosticService.getNextQuestion(newMessages, extractedInfo, apiKey);
      setMessages([...newMessages, { role: 'ai', content: result.nextQuestion }]);
      setExtractedInfo(result.extractedInfo);
      setStage(result.stage);
      if (result.readyForDiagnosis) setReady(true);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleFinalize = async () => {
    setLoading(true);
    try {
      const diagnosis = await diagnosticService.finalizeDiagnosis(messages, extractedInfo, apiKey);
      onFinalDiagnosis(diagnosis);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto flex flex-col h-[80vh] md:h-[75vh] glass-card rounded-3xl md:rounded-[3rem] border-none overflow-hidden animate-fade-in-up">
      
      {/* 📊 Session Progress Bar */}
      <div className="bg-surface/50 p-4 border-b border-border flex flex-col items-center gap-3">
        <header className="flex items-center gap-2">
           <Bot className="w-5 h-5 text-primary" />
           <span className="text-[10px] md:text-xs font-black text-slate-500 uppercase tracking-[0.3em]">
             {stage === 'rapport' ? '🤝 بناء الثقة' : stage === 'exploration' ? '🔍 الاستكشاف' : '🧠 التعمق السقراطي'}
           </span>
        </header>
        <div className="flex gap-2 w-full max-w-xs justify-center">
            {[1, 2, 3, 4].map(i => (
                <div key={i} className={cn(
                  "h-1.5 flex-1 rounded-full transition-all duration-700",
                  i <= (ready ? 4 : (stage === 'deep-dive' ? 3 : 2)) 
                    ? "bg-primary shadow-[0_0_15px_rgba(99,102,241,0.5)]" 
                    : "bg-border/50"
                )}></div>
            ))}
        </div>
      </div>

      {/* 💬 Scrollable Chat Canvas */}
      <div className="flex-1 overflow-y-auto px-4 md:px-8 py-8 md:py-12 space-y-6 md:space-y-8 no-scrollbar">
        {messages.map((m, i) => (
          <div key={i} className={cn(
            "flex w-full animate-fade-in-up",
            m.role === 'ai' ? "justify-start" : "justify-end"
          )}>
            <div className={cn(
              "flex items-end gap-3 max-w-[90%] md:max-w-[80%]",
              m.role === 'ai' ? "flex-row" : "flex-row-reverse"
            )}>
              {/* Avatar Icons */}
              <div className={cn(
                "hidden sm:flex w-8 h-8 md:w-10 md:h-10 rounded-xl items-center justify-center shrink-0 mb-2",
                m.role === 'ai' ? "bg-primary text-white" : "bg-secondary text-white"
              )}>
                {m.role === 'ai' ? <Bot size={20} /> : <User size={20} />}
              </div>

              {/* Bubbles */}
              <div className={cn(
                "p-5 md:p-6 rounded-[2rem] font-bold leading-relaxed text-sm md:text-base lg:text-lg shadow-sm border",
                m.role === 'ai' 
                  ? "bg-surface text-foreground rounded-bl-none border-border" 
                  : "bg-primary text-white rounded-br-none border-primary/10 shadow-lg shadow-primary/20"
              )}>
                {m.content}
              </div>
            </div>
          </div>
        ))}
        
        {loading && (
          <div className="flex justify-start animate-fade-in-up">
            <div className="flex items-center gap-3 bg-surface p-4 md:p-5 rounded-[2.5rem] rounded-tl-none border border-border shadow-sm">
              <Loader2 className="w-5 h-5 text-primary animate-spin" />
              <span className="text-xs font-black text-slate-400 uppercase tracking-widest">المساعد الذكي يفكر...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* ⌨️ Human-AI Input Terminal */}
      <div className="p-6 md:p-10 bg-surface/50 border-t border-border">
        {!ready ? (
          <div className="flex gap-4 bg-surface p-2.5 md:p-4 rounded-[3rem] shadow-premium border border-border focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20 transition-all">
            <input
              type="text"
              value={currentInput}
              onChange={(e) => setCurrentInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="تحدث معي... ماذا يواجهك بالتحديد؟"
              className="flex-1 px-4 md:px-6 bg-transparent outline-none font-bold text-foreground text-base md:text-lg"
              disabled={loading}
              aria-label="Student input"
            />
            <button 
              onClick={handleSendMessage}
              disabled={loading || !currentInput.trim()}
              className="bg-primary text-white p-4 md:p-5 rounded-full hover:scale-105 active:scale-95 transition-all shadow-lg flex items-center justify-center disabled:opacity-50"
            >
              <Send className="w-5 h-5 md:w-6 md:h-6" />
            </button>
          </div>
        ) : (
          <button 
            onClick={handleFinalize}
            disabled={loading}
            className="w-full py-6 md:py-8 btn-primary-premium text-2xl md:text-3xl lg:text-4xl animate-pulse shadow-2xl flex flex-col items-center gap-2 group border border-primary/20"
          >
            <div className="flex items-center gap-4">
              <span>✨ استخلاص مسار السيادة</span>
              <Sparkles className="group-hover:rotate-12 transition-transform" />
            </div>
            <span className="text-[10px] md:text-xs opacity-70 uppercase tracking-[0.3em] font-black">جاهز للبدء الآن</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default DiagnosticChat;
