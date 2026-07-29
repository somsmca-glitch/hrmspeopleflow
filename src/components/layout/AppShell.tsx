import React, { useState, useEffect } from 'react';
import { Tenant, UserRole, NotificationItem } from '../../types';
import { DEMO_TENANTS, INITIAL_NOTIFICATIONS } from '../../lib/store';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { CommandPalette } from './CommandPalette';
import { OverviewDashboard } from '../dashboard/OverviewDashboard';
import { Phase1View } from '../phase1/Phase1View';
import { EmployeesModule } from '../modules/EmployeesModule';
import { AttendanceLeaveModule } from '../modules/AttendanceLeaveModule';
import { PayrollModule } from '../modules/PayrollModule';
import { SettingsAuthModule } from '../modules/SettingsAuthModule';
import { RecruitmentATSModule } from '../modules/RecruitmentATSModule';
import { AIAssistantModule } from '../modules/AIAssistantModule';
import { AnalyticsAuditModule } from '../modules/AnalyticsAuditModule';

export const AppShell: React.FC = () => {
  const [currentTenant, setCurrentTenant] = useState<Tenant>(DEMO_TENANTS[0]);
  const [currentRole, setCurrentRole] = useState<UserRole>('COMPANY_ADMIN');
  const [activeView, setActiveView] = useState<string>('dashboard');
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem('peopleflow_theme');
    if (saved === 'dark' || saved === 'light') {
      return saved;
    }
    // Explicitly default to 'light' theme, ignoring system preferences
    return 'light';
  });
  const [isCommandOpen, setIsCommandOpen] = useState<boolean>(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState<boolean>(false);
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);

  useEffect(() => {
    localStorage.setItem('peopleflow_theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const handleMarkAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  return (
    <div className={`min-h-screen bg-[#dae0ed] dark:bg-[#0b0f19] text-slate-900 dark:text-slate-100 flex flex-col font-sans antialiased p-2 sm:p-3 lg:p-4 transition-colors`}>
      <div className="flex flex-1 rounded-3xl bg-white dark:bg-[#111827] shadow-2xl shadow-emerald-950/5 dark:shadow-none border border-slate-200/80 dark:border-slate-800/80 overflow-hidden">
        {/* Sidebar */}
        <Sidebar
          currentRole={currentRole}
          activeView={activeView}
          onNavigate={(viewId) => setActiveView(viewId)}
          isMobileOpen={isMobileSidebarOpen}
          onCloseMobile={() => setIsMobileSidebarOpen(false)}
        />

        {/* Main Workspace Area */}
        <div className="flex-1 flex flex-col min-w-0 bg-[#f8faf9] dark:bg-[#0f172a]/60">
          {/* Header */}
          <Header
            currentTenant={currentTenant}
            currentRole={currentRole}
            theme={theme}
            notifications={notifications}
            onSelectTenant={(t) => setCurrentTenant(t)}
            onSelectRole={(r) => setCurrentRole(r)}
            onSetTheme={(t) => setTheme(t)}
            onOpenCommandPalette={() => setIsCommandOpen(true)}
            onToggleMobileSidebar={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
            onMarkAllNotificationsRead={handleMarkAllNotificationsRead}
            onNavigate={(viewId) => setActiveView(viewId)}
          />

          {/* Dynamic Module Content View */}
          <main className="flex-1 p-4 sm:p-6 lg:p-7 max-w-7xl w-full mx-auto">
            {activeView === 'dashboard' ? (
              <OverviewDashboard
                currentTenant={currentTenant}
                currentRole={currentRole}
                onNavigate={(viewId) => setActiveView(viewId)}
              />
            ) : activeView === 'phase1' ? (
              <Phase1View
                currentTenant={currentTenant}
                currentRole={currentRole}
                onNavigate={(viewId) => setActiveView(viewId)}
              />
            ) : activeView === 'employees' || activeView === 'core-hr' || activeView === 'org-chart' ? (
              <EmployeesModule
                currentTenant={currentTenant}
                currentRole={currentRole}
                onNavigate={(viewId) => setActiveView(viewId)}
              />
            ) : activeView === 'attendance' || activeView === 'leave' || activeView === 'time-off' ? (
              <AttendanceLeaveModule
                currentTenant={currentTenant}
                currentRole={currentRole}
                onNavigate={(viewId) => setActiveView(viewId)}
              />
            ) : activeView === 'payroll' || activeView === 'compensation' ? (
              <PayrollModule
                currentTenant={currentTenant}
                currentRole={currentRole}
                onNavigate={(viewId) => setActiveView(viewId)}
              />
            ) : activeView === 'settings' || activeView === 'tenants' || activeView === 'rbac' ? (
              <SettingsAuthModule
                currentTenant={currentTenant}
                currentRole={currentRole}
                theme={theme}
                onSetTheme={(t) => setTheme(t)}
                onNavigate={(viewId) => setActiveView(viewId)}
              />
            ) : activeView === 'recruitment' || activeView === 'ats' || activeView === 'requisitions' || activeView === 'onboarding' || activeView === 'performance' || activeView === 'engagement' ? (
              <RecruitmentATSModule
                currentTenant={currentTenant}
                currentRole={currentRole}
                onNavigate={(viewId) => setActiveView(viewId)}
                initialTab={
                  activeView === 'onboarding' ? 'onboarding' :
                  activeView === 'performance' ? 'performance' :
                  activeView === 'engagement' ? 'engagement' : 'recruitment'
                }
              />
            ) : activeView === 'ai-assistant' || activeView === 'ai-policy' || activeView === 'rag' ? (
              <AIAssistantModule
                currentTenant={currentTenant}
                currentRole={currentRole}
                onNavigate={(viewId) => setActiveView(viewId)}
              />
            ) : activeView === 'analytics' || activeView === 'audit' || activeView === 'logs' || activeView === 'security' ? (
              <AnalyticsAuditModule
                currentTenant={currentTenant}
                currentRole={currentRole}
                onNavigate={(viewId) => setActiveView(viewId)}
              />
            ) : (
              <div className="p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center space-y-3">
                <div className="inline-flex p-3 rounded-2xl bg-blue-50 dark:bg-blue-950/40 text-blue-600 font-bold text-lg">
                  Module: {activeView.toUpperCase()}
                </div>
                <h2 className="text-xl font-bold">Phase 0 Architecture Scaffold Complete</h2>
                <p className="text-sm text-slate-500 max-w-md mx-auto">
                  Module navigation target <span className="font-mono text-blue-600">/{activeView}</span> is wired into the multi-tenant routing shell and ready for Phase 1+ domain implementations.
                </p>
                <button
                  onClick={() => setActiveView('dashboard')}
                  className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold"
                >
                  Return to Dashboard Overview
                </button>
              </div>
            )}
          </main>

          {/* App Footer */}
          <footer className="px-6 py-3 border-t border-slate-200/60 dark:border-slate-800/60 text-center text-xs text-slate-500 dark:text-slate-400 font-medium">
            designed by <a href="https://Inspiresights.com" target="_blank" rel="noopener noreferrer" className="font-semibold text-[#5d5fef] hover:underline">Inspiresights.com</a>
          </footer>
        </div>
      </div>

      {/* Global Command Palette (⌘K) */}
      <CommandPalette
        isOpen={isCommandOpen}
        onClose={() => setIsCommandOpen(false)}
        onNavigate={(path) => {
          const clean = path.replace('/', '') || 'dashboard';
          setActiveView(clean);
        }}
      />
    </div>
  );
};
