import React from 'react';
import { Tenant, UserRole, NotificationItem } from '../../types';
import { TenantSwitcher } from './TenantSwitcher';
import { RoleSwitcher } from './RoleSwitcher';
import { NotificationCenter } from './NotificationCenter';
import { Search, Sun, Moon, Menu, Sparkles, Command } from 'lucide-react';
import { DEMO_USERS } from '../../lib/store';

interface HeaderProps {
  currentTenant: Tenant;
  currentRole: UserRole;
  theme: 'light' | 'dark';
  notifications: NotificationItem[];
  onSelectTenant: (tenant: Tenant) => void;
  onSelectRole: (role: UserRole) => void;
  onSetTheme: (theme: 'light' | 'dark') => void;
  onOpenCommandPalette: () => void;
  onToggleMobileSidebar: () => void;
  onMarkAllNotificationsRead: () => void;
  onNavigate: (path: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTenant,
  currentRole,
  theme,
  notifications,
  onSelectTenant,
  onSelectRole,
  onSetTheme,
  onOpenCommandPalette,
  onToggleMobileSidebar,
  onMarkAllNotificationsRead,
  onNavigate,
}) => {
  const activeUser = DEMO_USERS[currentRole];

  return (
    <header className="sticky top-0 z-30 h-16 border-b border-slate-100 dark:border-slate-800 bg-white/80 dark:bg-[#111827]/80 backdrop-blur-md px-6 flex items-center justify-between gap-4">
      <div className="flex items-center gap-4">
        <button
          onClick={onToggleMobileSidebar}
          className="lg:hidden p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
        >
          <Menu className="w-5 h-5" />
        </button>

        <h1 className="text-xl font-extrabold text-slate-900 dark:text-white tracking-tight hidden sm:block">
          Dashboard
        </h1>

        <button
          onClick={onOpenCommandPalette}
          className="hidden md:flex items-center gap-2.5 px-4 py-2 rounded-full bg-slate-100/80 dark:bg-slate-800/80 hover:bg-slate-200/60 dark:hover:bg-slate-800 text-slate-500 text-xs w-64 lg:w-72 justify-between transition-colors"
        >
          <span className="flex items-center gap-2">
            <Search className="w-4 h-4 text-[#5d5fef]" />
            <span className="font-medium text-slate-400">Search here...</span>
          </span>
          <kbd className="px-1.5 py-0.5 rounded-md bg-white dark:bg-slate-700 text-[10px] font-mono font-bold text-slate-500 shadow-sm flex items-center gap-0.5">
            <Command className="w-2.5 h-2.5" /> K
          </kbd>
        </button>
      </div>

      <div className="flex items-center gap-2 sm:gap-3">
        {/* Country / Locale Pill */}
        <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100/80 dark:bg-slate-800/80 text-xs font-semibold text-slate-700 dark:text-slate-300">
          <span className="text-sm">🇺🇸</span>
          <span>Eng (US)</span>
        </div>

        <TenantSwitcher currentTenant={currentTenant} onSelectTenant={onSelectTenant} />
        <RoleSwitcher currentRole={currentRole} onSelectRole={onSelectRole} />

        <NotificationCenter
          notifications={notifications}
          onMarkAllRead={onMarkAllNotificationsRead}
          onNavigate={onNavigate}
        />

        {/* 2-Theme Selector Switcher (Light & Dark, Ignoring System Default) */}
        <div className="flex items-center bg-slate-100/90 dark:bg-slate-800/90 p-1 rounded-full border border-slate-200/80 dark:border-slate-700/80 shadow-inner">
          <button
            onClick={() => onSetTheme('light')}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold transition-all ${
              theme === 'light'
                ? 'bg-white text-slate-900 shadow-sm border border-slate-200/60'
                : 'text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200'
            }`}
            title="Light Theme"
          >
            <Sun className={`w-3.5 h-3.5 ${theme === 'light' ? 'text-amber-500 fill-amber-500' : 'text-slate-400'}`} />
            <span className="hidden sm:inline">Light</span>
          </button>
          <button
            onClick={() => onSetTheme('dark')}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold transition-all ${
              theme === 'dark'
                ? 'bg-[#5d5fef] text-white shadow-sm'
                : 'text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200'
            }`}
            title="Dark Theme"
          >
            <Moon className={`w-3.5 h-3.5 ${theme === 'dark' ? 'text-white fill-white' : 'text-slate-400'}`} />
            <span className="hidden sm:inline">Dark</span>
          </button>
        </div>

        <div className="h-6 w-[1px] bg-slate-200 dark:bg-slate-800 hidden sm:block" />

        <div className="flex items-center gap-2.5 pl-1">
          <img
            src={activeUser.avatar}
            alt={activeUser.name}
            className="w-9 h-9 rounded-full object-cover ring-2 ring-[#5d5fef]/30 shadow-sm"
          />
          <div className="hidden xl:block text-left leading-tight">
            <div className="text-xs font-bold text-slate-900 dark:text-slate-100">{activeUser.name}</div>
            <div className="text-[10px] font-semibold text-[#5d5fef] uppercase tracking-wider">{currentRole.replace('_', ' ')}</div>
          </div>
        </div>
      </div>
    </header>
  );
};
