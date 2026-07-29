import React from 'react';
import { UserRole, NavigationItem } from '../../types';
import { NAVIGATION_ITEMS } from '../../lib/store';
import {
  LayoutDashboard,
  Users,
  Clock,
  Calendar,
  CreditCard,
  Briefcase,
  UserCheck,
  TrendingUp,
  HeartHandshake,
  BarChart3,
  Sparkles,
  ShieldAlert,
  Sliders,
  ChevronRight,
  Flame,
  Sparkle
} from 'lucide-react';

interface SidebarProps {
  currentRole: UserRole;
  activeView: string;
  onNavigate: (viewId: string) => void;
  isMobileOpen: boolean;
  onCloseMobile: () => void;
}

const ICON_MAP: Record<string, React.ElementType> = {
  LayoutDashboard,
  Users,
  Clock,
  Calendar,
  CreditCard,
  Briefcase,
  UserCheck,
  TrendingUp,
  HeartHandshake,
  BarChart3,
  Sparkles,
  ShieldAlert,
  Sliders
};

export const Sidebar: React.FC<SidebarProps> = ({
  currentRole,
  activeView,
  onNavigate,
  isMobileOpen,
  onCloseMobile
}) => {
  const visibleItems = NAVIGATION_ITEMS.filter((item) =>
    item.requiredRoles.includes(currentRole)
  );

  const categories: Array<NavigationItem['category']> = ['Core', 'Workforce', 'Talent', 'Operations', 'Admin'];

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={onCloseMobile}
        />
      )}

      <aside
        className={`fixed lg:sticky top-0 left-0 z-40 h-screen w-64 bg-white dark:bg-[#111827] text-slate-800 dark:text-slate-100 border-r border-slate-200/80 dark:border-slate-800/80 flex flex-col justify-between transition-transform duration-200 shrink-0 ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div>
          {/* Brand Header */}
          <div className="h-16 px-5 border-b border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-2xl bg-[#5d5fef] flex items-center justify-center shadow-lg shadow-[#5d5fef]/30 text-white font-black text-base tracking-wider">
                <Sparkle className="w-5 h-5 text-white fill-white" />
              </div>
              <div>
                <span className="font-extrabold text-lg tracking-tight text-slate-900 dark:text-white">
                  PeopleFlow
                </span>
                <span className="text-[10px] ml-1.5 px-1.5 py-0.5 rounded-full bg-[#5d5fef]/10 text-[#5d5fef] font-mono font-bold">
                  PRO
                </span>
              </div>
            </div>
          </div>

          {/* Navigation Items grouped by category */}
          <div className="p-3 space-y-4 overflow-y-auto max-h-[calc(100vh-220px)] scrollbar-thin">
            {categories.map((cat) => {
              const catItems = visibleItems.filter((i) => i.category === cat);
              if (catItems.length === 0) return null;

              return (
                <div key={cat} className="space-y-1">
                  <div className="px-3 text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                    {cat}
                  </div>
                  {catItems.map((item) => {
                    const Icon = ICON_MAP[item.icon] || LayoutDashboard;
                    const isActive = activeView === item.id;

                    return (
                      <button
                        key={item.id}
                        onClick={() => {
                          onNavigate(item.id);
                          onCloseMobile();
                        }}
                        className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs font-medium transition-all group ${
                          isActive
                            ? 'bg-[#5d5fef] text-white shadow-lg shadow-[#5d5fef]/30 font-bold'
                            : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100/80 dark:hover:bg-slate-800/50'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <Icon
                            className={`w-4 h-4 transition-transform group-hover:scale-110 ${
                              isActive ? 'text-white' : 'text-slate-400 group-hover:text-slate-700 dark:group-hover:text-slate-200'
                            }`}
                          />
                          <span>{item.title}</span>
                        </div>
                        {item.badge && (
                          <span
                            className={`text-[10px] px-2 py-0.5 rounded-full font-mono font-bold ${
                              isActive
                                ? 'bg-white/20 text-white'
                                : item.badgeColor || 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                            }`}
                          >
                            {item.badge}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>

        {/* Dabang-inspired Pro Banner Card */}
        <div className="p-3">
          <div className="p-4 rounded-2xl bg-gradient-to-br from-[#5d5fef] to-[#8b5cf6] text-white shadow-xl shadow-[#5d5fef]/20 relative overflow-hidden group">
            <div className="absolute -right-4 -bottom-4 w-20 h-20 bg-white/10 rounded-full blur-xl group-hover:scale-125 transition-transform" />
            
            <div className="w-8 h-8 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center mb-3">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <h4 className="font-bold text-sm tracking-tight text-white">PeopleFlow Pro</h4>
            <p className="text-[11px] text-white/80 mt-0.5 leading-snug">
              Unlock AI automated payroll, automated ATS, & multi-region workflows.
            </p>
            <button
              onClick={() => onNavigate('settings')}
              className="mt-3 w-full py-2 px-3 rounded-xl bg-white text-[#5d5fef] hover:bg-slate-50 font-bold text-xs shadow-md transition-all text-center"
            >
              Get Pro Access
            </button>
          </div>
          <div className="mt-2 text-center text-[10px] text-slate-400 dark:text-slate-500 font-medium">
            designed by <a href="https://Inspiresights.com" target="_blank" rel="noopener noreferrer" className="text-[#5d5fef] hover:underline font-semibold">Inspiresights.com</a>
          </div>
        </div>
      </aside>
    </>
  );
};
