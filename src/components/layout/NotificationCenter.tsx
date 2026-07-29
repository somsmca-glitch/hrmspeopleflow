import React, { useState } from 'react';
import { NotificationItem } from '../../types';
import { Bell, CheckCheck, Clock, ShieldAlert, Sparkles, X } from 'lucide-react';

interface NotificationCenterProps {
  notifications: NotificationItem[];
  onMarkAllRead: () => void;
  onNavigate: (path: string) => void;
}

export const NotificationCenter: React.FC<NotificationCenterProps> = ({
  notifications,
  onMarkAllRead,
  onNavigate,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        title="Notifications"
      >
        <Bell className="w-4 h-4" />
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center animate-pulse">
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          <div className="absolute top-full right-0 mt-1.5 w-80 sm:w-96 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xl z-50 overflow-hidden text-xs">
            <div className="p-3 bg-slate-50 dark:bg-slate-900/80 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-slate-900 dark:text-slate-100 text-sm">Notifications</span>
                {unreadCount > 0 && (
                  <span className="px-1.5 py-0.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 font-semibold text-[10px]">
                    {unreadCount} unread
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2">
                {unreadCount > 0 && (
                  <button
                    onClick={onMarkAllRead}
                    className="text-[11px] text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 font-medium"
                  >
                    <CheckCheck className="w-3.5 h-3.5" /> Mark all read
                  </button>
                )}
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-slate-400 hover:text-slate-600 p-0.5 rounded"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="max-h-80 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800/60">
              {notifications.length === 0 ? (
                <div className="p-6 text-center text-slate-400">No notifications at this time.</div>
              ) : (
                notifications.map((notif) => (
                  <div
                    key={notif.id}
                    onClick={() => {
                      if (notif.link) onNavigate(notif.link);
                      setIsOpen(false);
                    }}
                    className={`p-3 transition-colors cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50 flex gap-3 items-start ${
                      !notif.read ? 'bg-blue-50/40 dark:bg-blue-950/20' : ''
                    }`}
                  >
                    <div className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 shrink-0 mt-0.5">
                      {notif.type === 'leave' && <Clock className="w-3.5 h-3.5 text-amber-500" />}
                      {notif.type === 'payroll' && <Sparkles className="w-3.5 h-3.5 text-emerald-500" />}
                      {notif.type === 'policy' && <ShieldAlert className="w-3.5 h-3.5 text-rose-500" />}
                      {notif.type === 'interview' && <Bell className="w-3.5 h-3.5 text-blue-500" />}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between text-slate-900 dark:text-slate-100 font-semibold">
                        <span>{notif.title}</span>
                        <span className="text-[10px] text-slate-400 font-normal">{notif.time}</span>
                      </div>
                      <p className="text-slate-600 dark:text-slate-400 text-[11px] mt-0.5 leading-relaxed">
                        {notif.message}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="p-2 bg-slate-50 dark:bg-slate-900/80 border-t border-slate-100 dark:border-slate-800 text-center text-[10px] text-slate-400">
              In-app, Email & Push notification channels active
            </div>
          </div>
        </>
      )}
    </div>
  );
};
