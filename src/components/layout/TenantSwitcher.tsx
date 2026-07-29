import React, { useState } from 'react';
import { Tenant } from '../../types';
import { DEMO_TENANTS } from '../../lib/store';
import { Building2, Check, ChevronDown, Sparkles } from 'lucide-react';

interface TenantSwitcherProps {
  currentTenant: Tenant;
  onSelectTenant: (tenant: Tenant) => void;
}

export const TenantSwitcher: React.FC<TenantSwitcherProps> = ({ currentTenant, onSelectTenant }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2.5 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-left text-xs font-medium text-slate-800 dark:text-slate-200"
      >
        <span className="flex items-center justify-center w-6 h-6 rounded bg-blue-600/10 text-blue-600 font-bold text-xs">
          {currentTenant.logo}
        </span>
        <div className="hidden sm:block leading-tight">
          <div className="font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
            {currentTenant.name}
            <span className="text-[10px] px-1.5 py-0.2 rounded bg-blue-500/10 text-blue-600 dark:text-blue-400 font-mono">
              {currentTenant.plan}
            </span>
          </div>
          <div className="text-[11px] text-slate-500 font-mono">{currentTenant.domain}</div>
        </div>
        <ChevronDown className="w-3.5 h-3.5 text-slate-400 ml-1" />
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          <div className="absolute top-full left-0 mt-1.5 w-64 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xl z-50 p-1.5 text-xs">
            <div className="px-2 py-1.5 text-[11px] font-semibold text-slate-400 uppercase tracking-wider flex items-center justify-between">
              <span>Select Active Tenant</span>
              <Building2 className="w-3 h-3 text-slate-400" />
            </div>
            <div className="space-y-1 mt-1">
              {DEMO_TENANTS.map((tenant) => (
                <button
                  key={tenant.id}
                  onClick={() => {
                    onSelectTenant(tenant);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center justify-between p-2 rounded-lg transition-colors text-left ${
                    tenant.id === currentTenant.id
                      ? 'bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 font-medium'
                      : 'hover:bg-slate-100 dark:hover:bg-slate-800/60 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="w-6 h-6 rounded bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-xs">
                      {tenant.logo}
                    </span>
                    <div>
                      <div className="font-medium text-slate-900 dark:text-slate-100">{tenant.name}</div>
                      <div className="text-[10px] text-slate-500 font-mono">{tenant.usedSeats}/{tenant.seats} seats • {tenant.country}</div>
                    </div>
                  </div>
                  {tenant.id === currentTenant.id && <Check className="w-4 h-4 text-blue-600" />}
                </button>
              ))}
            </div>
            <div className="mt-2 pt-2 border-t border-slate-100 dark:border-slate-800 px-2 py-1 flex items-center justify-between text-[11px] text-slate-500">
              <span className="flex items-center gap-1"><Sparkles className="w-3 h-3 text-amber-500" /> Multi-Tenant RLS Enabled</span>
              <span className="font-mono text-slate-400">UUID Scope</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
