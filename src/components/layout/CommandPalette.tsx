import React, { useState, useEffect } from 'react';
import { Search, User, FileText, Calendar, CreditCard, Briefcase, Sliders, X, ArrowRight, Shield } from 'lucide-react';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (path: string) => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({ isOpen, onClose, onNavigate }) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else {
          // Open triggered from parent
        }
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const quickActions = [
    { title: 'Add New Employee', icon: User, path: '/employees', category: 'Action' },
    { title: 'Apply Leave / Time Off', icon: Calendar, path: '/leave', category: 'Action' },
    { title: 'Run Payroll Process', icon: CreditCard, path: '/payroll', category: 'Action' },
    { title: 'Post Job Opening', icon: Briefcase, path: '/recruitment', category: 'Action' },
    { title: 'Ask AI HR Policy Assistant', icon: FileText, path: '/ai-assistant', category: 'AI' },
    { title: 'Configure Tenant Settings', icon: Sliders, path: '/settings', category: 'Settings' },
    { title: 'Open Platform Admin Console', icon: Shield, path: '/super-admin', category: 'Admin' },
  ];

  const filtered = quickActions.filter(
    (a) =>
      a.title.toLowerCase().includes(query.toLowerCase()) ||
      a.category.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-start justify-center pt-20 px-4">
      <div className="w-full max-w-xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden text-sm">
        <div className="p-3 border-b border-slate-200 dark:border-slate-800 flex items-center gap-3">
          <Search className="w-5 h-5 text-slate-400 shrink-0 ml-1" />
          <input
            type="text"
            placeholder="Type a command or search employees, modules, policies... (⌘K)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            className="w-full bg-transparent border-none text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none text-sm"
          />
          <button
            onClick={onClose}
            className="p-1 rounded-md text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-2 max-h-80 overflow-y-auto">
          <div className="px-2 py-1 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
            Quick Navigation & Actions
          </div>
          <div className="space-y-1 mt-1">
            {filtered.length === 0 ? (
              <div className="p-6 text-center text-slate-400 text-xs">
                No matching actions or records found.
              </div>
            ) : (
              filtered.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <button
                    key={idx}
                    onClick={() => {
                      onNavigate(item.path);
                      onClose();
                    }}
                    className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-blue-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 text-left transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-blue-600 dark:text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-medium text-slate-900 dark:text-slate-100 text-xs">
                          {item.title}
                        </div>
                        <div className="text-[10px] text-slate-400">{item.category}</div>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
                  </button>
                );
              })
            )}
          </div>
        </div>

        <div className="p-2.5 bg-slate-50 dark:bg-slate-900/80 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-400 font-mono">
          <div className="flex items-center gap-2">
            <span className="px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300">↑↓</span>
            <span>Navigate</span>
            <span className="px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300 ml-2">↵</span>
            <span>Select</span>
          </div>
          <div>ESC to close</div>
        </div>
      </div>
    </div>
  );
};
