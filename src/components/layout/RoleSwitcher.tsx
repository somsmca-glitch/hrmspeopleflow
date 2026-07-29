import React, { useState } from 'react';
import { UserRole } from '../../types';
import { DEMO_USERS } from '../../lib/store';
import { Shield, ChevronDown, Check, UserCheck } from 'lucide-react';

interface RoleSwitcherProps {
  currentRole: UserRole;
  onSelectRole: (role: UserRole) => void;
}

const ROLE_LABELS: Record<UserRole, { label: string; desc: string; color: string }> = {
  SUPER_ADMIN: { label: 'Super Admin', desc: 'Platform Owner & Multi-Tenant Console', color: 'bg-red-500/10 text-red-600 dark:text-red-400' },
  COMPANY_ADMIN: { label: 'Company Admin / HR', desc: 'Full HR & Org Level Management', color: 'bg-blue-500/10 text-blue-600 dark:text-blue-400' },
  MANAGER: { label: 'Manager (MSS)', desc: 'Team Approval & Performance Reviews', color: 'bg-purple-500/10 text-purple-600 dark:text-purple-400' },
  EMPLOYEE: { label: 'Employee (ESS)', desc: 'Self-Service, Leave & Payslip Portal', color: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' },
  RECRUITER: { label: 'Recruiter', desc: 'ATS Candidate Pipeline & Job Boards', color: 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400' },
  PAYROLL_ADMIN: { label: 'Payroll Admin', desc: 'Salary Runs, Tax Engine & Disbursements', color: 'bg-amber-500/10 text-amber-600 dark:text-amber-400' },
};

export const RoleSwitcher: React.FC<RoleSwitcherProps> = ({ currentRole, onSelectRole }) => {
  const [isOpen, setIsOpen] = useState(false);
  const activeUser = DEMO_USERS[currentRole];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors text-xs font-medium"
      >
        <Shield className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
        <span className={`px-1.5 py-0.5 rounded text-[10px] font-semibold ${ROLE_LABELS[currentRole].color}`}>
          {ROLE_LABELS[currentRole].label}
        </span>
        <span className="hidden md:inline text-slate-600 dark:text-slate-300 text-xs">({activeUser.name})</span>
        <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          <div className="absolute top-full right-0 mt-1.5 w-72 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xl z-50 p-2 text-xs">
            <div className="px-2 py-1 text-[11px] font-semibold text-slate-400 uppercase tracking-wider flex items-center justify-between">
              <span>Simulate Role Persona</span>
              <UserCheck className="w-3.5 h-3.5 text-indigo-500" />
            </div>
            <div className="space-y-1 mt-1.5">
              {(Object.keys(ROLE_LABELS) as UserRole[]).map((role) => {
                const info = ROLE_LABELS[role];
                const user = DEMO_USERS[role];
                return (
                  <button
                    key={role}
                    onClick={() => {
                      onSelectRole(role);
                      setIsOpen(false);
                    }}
                    className={`w-full text-left p-2 rounded-lg transition-colors flex items-center justify-between ${
                      role === currentRole
                        ? 'bg-indigo-50 dark:bg-indigo-950/40 text-indigo-900 dark:text-indigo-200 font-medium'
                        : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className={`text-[10px] px-1.5 py-0.2 rounded font-semibold ${info.color}`}>
                          {info.label}
                        </span>
                        <span className="text-[11px] text-slate-500 font-medium">{user.name}</span>
                      </div>
                      <div className="text-[10px] text-slate-400 mt-0.5">{info.desc}</div>
                    </div>
                    {role === currentRole && <Check className="w-4 h-4 text-indigo-600 shrink-0" />}
                  </button>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
};
