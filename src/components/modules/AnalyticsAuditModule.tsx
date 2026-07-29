import React, { useState } from 'react';
import { Tenant, UserRole } from '../../types';
import {
  ShieldAlert,
  BarChart3,
  TrendingUp,
  Users,
  Search,
  Filter,
  Download,
  Terminal,
  Activity,
  DollarSign,
  AlertCircle,
  FileSpreadsheet
} from 'lucide-react';
import { generateSeedAuditLogs, SeedAuditLog } from '../../db/seed';

interface AnalyticsAuditModuleProps {
  currentTenant: Tenant;
  currentRole: UserRole;
  onNavigate: (viewId: string) => void;
}

export const AnalyticsAuditModule: React.FC<AnalyticsAuditModuleProps> = ({
  currentTenant,
}) => {
  const [activeTab, setActiveTab] = useState<'analytics' | 'audit'>('analytics');
  const [auditLogs] = useState<SeedAuditLog[]>(
    generateSeedAuditLogs().filter((l) => l.tenantId === currentTenant.id)
  );

  const [searchFilter, setSearchFilter] = useState('');

  const filteredLogs = auditLogs.filter(
    (log) =>
      log.userEmail.toLowerCase().includes(searchFilter.toLowerCase()) ||
      log.action.toLowerCase().includes(searchFilter.toLowerCase()) ||
      log.module.toLowerCase().includes(searchFilter.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-rose-600 dark:text-rose-400 mb-1">
            <span className="px-2 py-0.5 rounded bg-rose-500/10 font-mono text-[10px]">MODULE 8 & 9 / PHASE 8 & 9</span>
            <span>Analytics • Attrition Forecasting • Security Audit Ledger</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
            Workforce Intelligence & Immutable Security Audit
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Real-time attrition risk analytics, headcount projections, and immutable SOC2-compliant system activity logs.
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 dark:border-slate-800 overflow-x-auto gap-2">
        <button
          onClick={() => setActiveTab('analytics')}
          className={`px-4 py-2.5 text-xs font-semibold border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'analytics'
              ? 'border-rose-600 text-rose-600 dark:text-rose-400'
              : 'border-transparent text-slate-500'
          }`}
        >
          <BarChart3 className="w-4 h-4" /> Headcount & Costing Analytics
        </button>

        <button
          onClick={() => setActiveTab('audit')}
          className={`px-4 py-2.5 text-xs font-semibold border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'audit'
              ? 'border-rose-600 text-rose-600 dark:text-rose-400'
              : 'border-transparent text-slate-500'
          }`}
        >
          <ShieldAlert className="w-4 h-4" /> Audit Trail Stream ({auditLogs.length} Events)
        </button>
      </div>

      {/* TAB 1: ANALYTICS & FORECASTING */}
      {activeTab === 'analytics' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
            <div className="flex items-center justify-between text-xs font-mono text-slate-500">
              <span>ATTRITION RISK INDEX</span>
              <span className="text-emerald-500 font-bold">LOW (2.4%)</span>
            </div>
            <div className="text-3xl font-bold text-slate-900 dark:text-slate-100 font-mono">2.4%</div>
            <p className="text-xs text-slate-500">Down 0.8% from previous quarter across all departments.</p>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
            <div className="flex items-center justify-between text-xs font-mono text-slate-500">
              <span>MONTHLY PAYROLL BURNT</span>
              <span className="text-indigo-500 font-bold">BUDGETED</span>
            </div>
            <div className="text-3xl font-bold text-slate-900 dark:text-slate-100 font-mono">$248,500</div>
            <p className="text-xs text-slate-500">Includes basic compensation, statutory taxes, and health benefits.</p>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
            <div className="flex items-center justify-between text-xs font-mono text-slate-500">
              <span>H1 FORECASTED HEADCOUNT</span>
              <span className="text-amber-500 font-bold">+15 SEATS</span>
            </div>
            <div className="text-3xl font-bold text-slate-900 dark:text-slate-100 font-mono">195 Seats</div>
            <p className="text-xs text-slate-500">Based on approved job requisitions and engineering expansion.</p>
          </div>
        </div>
      )}

      {/* TAB 2: AUDIT LOG STREAM */}
      {activeTab === 'audit' && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 space-y-4 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="relative flex-1 max-w-sm">
              <Search className="w-3.5 h-3.5 absolute left-3 top-3 text-slate-400" />
              <input
                type="text"
                placeholder="Filter logs by user, action, module..."
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs"
              />
            </div>

            <button className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-semibold hover:bg-slate-50 flex items-center gap-1.5">
              <Download className="w-3.5 h-3.5" /> Export Audit CSV
            </button>
          </div>

          <div className="overflow-x-auto border border-slate-200 dark:border-slate-800 rounded-xl">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-slate-950 text-slate-500 border-b border-slate-200 dark:border-slate-800 font-mono">
                <tr>
                  <th className="p-3">Timestamp</th>
                  <th className="p-3">Actor Email</th>
                  <th className="p-3">Module Scope</th>
                  <th className="p-3">Action</th>
                  <th className="p-3">IP Address</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-mono">
                {filteredLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                    <td className="p-3 text-slate-400 text-[10px]">{log.timestamp}</td>
                    <td className="p-3 font-bold text-slate-900 dark:text-slate-100">{log.userEmail}</td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-[10px] font-bold">
                        {log.module}
                      </span>
                    </td>
                    <td className="p-3 text-slate-700 dark:text-slate-300">{log.action}</td>
                    <td className="p-3 text-slate-400 text-[11px]">{log.ipAddress}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
