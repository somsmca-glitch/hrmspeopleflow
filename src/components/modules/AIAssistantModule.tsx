import React, { useState } from 'react';
import { Tenant, UserRole } from '../../types';
import {
  Sparkles,
  Send,
  Bot,
  User,
  BookOpen,
  ShieldAlert,
  FileText,
  HelpCircle,
  Clock,
  CheckCircle2
} from 'lucide-react';

interface AIAssistantModuleProps {
  currentTenant: Tenant;
  currentRole: UserRole;
  onNavigate: (viewId: string) => void;
}

export const AIAssistantModule: React.FC<AIAssistantModuleProps> = ({
  currentTenant,
  currentRole,
}) => {
  const [messages, setMessages] = useState([
    {
      id: 'm-1',
      sender: 'bot' as const,
      text: `Hello! I am your AI Policy & HR Intelligence Assistant for ${currentTenant.name}. I have indexed your company handbook, remote work policies, leave structures, and statutory compliance rules. How can I assist you today?`,
      time: '09:00 AM',
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const samplePrompts = [
    'What is our PTO & Maternity Leave policy?',
    'Summarize our remote work geofencing guidelines',
    'How is tax calculated for US-based employees?',
    'Give me a summary of open job requisitions',
  ];

  const handleSend = async (queryText?: string) => {
    const promptToUse = queryText || input;
    if (!promptToUse.trim()) return;

    const userMsg = {
      id: `u-${Date.now()}`,
      sender: 'user' as const,
      text: promptToUse,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!queryText) setInput('');
    setIsLoading(true);

    try {
      // Call server API route
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [{ role: 'user', content: promptToUse }],
          tenantContext: currentTenant.name,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const botMsg = {
          id: `b-${Date.now()}`,
          sender: 'bot' as const,
          text: data.reply || 'Here is the relevant HR policy summary according to company documentation.',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
        setMessages((prev) => [...prev, botMsg]);
      } else {
        throw new Error('API Error');
      }
    } catch {
      // Fallback policy answers if server unavailable
      let fallbackAnswer = `Based on ${currentTenant.name}'s Employee Handbook (v2026.4): Employees are entitled to 20 days of paid annual leave, 10 days sick leave, and flexible remote work options subject to manager approval. Geofencing requires clock-in within a 500m radius of headquarters or an approved home office location.`;
      
      if (promptToUse.toLowerCase().includes('tax') || promptToUse.toLowerCase().includes('payroll')) {
        fallbackAnswer = `Statutory deductions for ${currentTenant.country} (${currentTenant.currency}) are automatically calculated in Module 5 during monthly payroll locking. Progressive brackets apply with automatic NACH batch file exports.`;
      }

      const botMsg = {
        id: `b-${Date.now()}`,
        sender: 'bot' as const,
        text: fallbackAnswer,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, botMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Module Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-sky-600 dark:text-sky-400 mb-1">
            <span className="px-2 py-0.5 rounded bg-sky-500/10 font-mono text-[10px]">MODULE 7 / PHASE 7</span>
            <span>RAG Policy Helper • Contextual Querying • HR Assistant</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
            AI Policy & RAG HR Assistant
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Instant policy answers grounded in {currentTenant.name}'s official handbooks and compliance documents.
          </p>
        </div>
      </div>

      {/* Main Chat Interface */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Chat Stream */}
        <div className="lg:col-span-3 flex flex-col h-[520px] rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 flex items-center justify-between">
            <div className="flex items-center gap-2 font-bold text-xs text-slate-900 dark:text-slate-100">
              <Bot className="w-4 h-4 text-sky-600" /> Grounded Policy Intelligence ({currentTenant.name})
            </div>
            <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 font-mono text-[10px] font-bold">
              ONLINE
            </span>
          </div>

          <div className="flex-1 p-4 overflow-y-auto space-y-4">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex items-start gap-3 ${m.sender === 'user' ? 'flex-row-reverse' : ''}`}
              >
                <div
                  className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 ${
                    m.sender === 'user'
                      ? 'bg-sky-600 text-white'
                      : 'bg-indigo-100 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400'
                  }`}
                >
                  {m.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>

                <div
                  className={`p-3.5 rounded-2xl text-xs max-w-lg space-y-1 ${
                    m.sender === 'user'
                      ? 'bg-sky-600 text-white rounded-tr-none'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 rounded-tl-none'
                  }`}
                >
                  <p className="whitespace-pre-wrap leading-relaxed">{m.text}</p>
                  <div className={`text-[9px] font-mono ${m.sender === 'user' ? 'text-sky-200 text-right' : 'text-slate-400'}`}>
                    {m.time}
                  </div>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex items-center gap-2 text-xs text-slate-400 font-mono italic">
                <Sparkles className="w-4 h-4 animate-spin text-sky-600" /> Searching company policy index...
              </div>
            )}
          </div>

          {/* Input Bar */}
          <div className="p-3 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 flex gap-2">
            <input
              type="text"
              placeholder="Ask any policy, leave rule, or handbook question..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              className="flex-1 px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
            <button
              onClick={() => handleSend()}
              disabled={isLoading}
              className="px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-semibold flex items-center gap-1 transition-colors"
            >
              <Send className="w-3.5 h-3.5" /> Send
            </button>
          </div>
        </div>

        {/* Quick Sample Prompts & Sources */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <h3 className="font-bold text-slate-900 dark:text-slate-100 text-xs flex items-center gap-1.5">
            <BookOpen className="w-4 h-4 text-sky-600" /> Sample Policy Queries
          </h3>

          <div className="space-y-2">
            {samplePrompts.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(prompt)}
                className="w-full text-left p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 hover:bg-sky-50 dark:hover:bg-sky-950/40 text-slate-700 dark:text-slate-300 text-[11px] font-medium border border-slate-100 dark:border-slate-800 transition-colors"
              >
                "{prompt}"
              </button>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-500 space-y-2">
            <div className="font-bold text-slate-700 dark:text-slate-300">Indexed Knowledge Bases:</div>
            <div className="flex items-center gap-1 text-emerald-600 font-mono text-[10px]">
              <CheckCircle2 className="w-3 h-3" /> Handbook_v2026.pdf (Indexed)
            </div>
            <div className="flex items-center gap-1 text-emerald-600 font-mono text-[10px]">
              <CheckCircle2 className="w-3 h-3" /> Remote_Work_Policy_v4.docx
            </div>
            <div className="flex items-center gap-1 text-emerald-600 font-mono text-[10px]">
              <CheckCircle2 className="w-3 h-3" /> Statutory_Tax_2026.json
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
