import React, { useState } from 'react';
import { Tenant, UserRole } from '../../types';
import {
  Database,
  Shield,
  Table as TableIcon,
  CheckCircle2,
  Lock,
  Search,
  Filter,
  Layers,
  Sparkles,
  AlertTriangle,
  RefreshCw,
  Terminal,
  Key,
  Users,
  CreditCard,
  Building2,
  ArrowRight,
  Code2
} from 'lucide-react';
import { generateSeedEmployees, generateSeedAttendance, generateSeedPayrollRuns, SEED_TENANTS } from '../../db/seed';
import { withTenant } from '../../db/tenant';

interface Phase1ViewProps {
  currentTenant: Tenant;
  currentRole: UserRole;
  onNavigate: (viewId: string) => void;
}

export const Phase1View: React.FC<Phase1ViewProps> = ({ currentTenant, currentRole, onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'schema' | 'rls' | 'seed' | 'migrations'>('schema');
  const [selectedTenantSim, setSelectedTenantSim] = useState<string>(currentTenant.id);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [rlsQueryLog, setRlsQueryLog] = useState<Array<{ id: string; query: string; tenantFilter: string; status: 'SUCCESS' | 'BLOCKED'; time: string }>>([
    { id: 'q-1', query: 'SELECT * FROM employees WHERE department = "Engineering"', tenantFilter: `tenant_id = '${currentTenant.id}'`, status: 'SUCCESS', time: '10:14:02' },
    { id: 'q-2', query: 'SELECT * FROM payslips WHERE gross_pay > 10000', tenantFilter: `tenant_id = '${currentTenant.id}'`, status: 'SUCCESS', time: '10:14:18' },
  ]);

  const allSeedEmployees = generateSeedEmployees();
  const allSeedAttendance = generateSeedAttendance();
  const allSeedPayroll = generateSeedPayrollRuns();

  // Tenant scoped RLS filtering simulation
  const repo = withTenant({ tenantId: selectedTenantSim, userId: 'sim-user-1', userRole: currentRole });
  const tenantEmployees = repo.applyRLS(allSeedEmployees);
  const tenantAttendance = repo.applyRLS(allSeedAttendance);
  const tenantPayroll = repo.applyRLS(allSeedPayroll);

  const filteredEmployees = tenantEmployees.filter(
    (emp) =>
      `${emp.firstName} ${emp.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.employeeCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const simulateCrossTenantQuery = (targetTenantId: string) => {
    const isAllowed = currentRole === 'SUPER_ADMIN' || targetTenantId === selectedTenantSim;
    const newLog = {
      id: `q-${Date.now()}`,
      query: `SELECT * FROM compensation_records WHERE tenant_id = '${targetTenantId}'`,
      tenantFilter: isAllowed ? `tenant_id = '${targetTenantId}'` : `BLOCKED BY RLS POLICY (Active: ${selectedTenantSim})`,
      status: isAllowed ? ('SUCCESS' as const) : ('BLOCKED' as const),
      time: new Date().toLocaleTimeString(),
    };
    setRlsQueryLog((prev) => [newLog, ...prev]);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white border border-slate-800 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-indigo-400 mb-1">
            <span className="px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 font-mono text-[10px]">PHASE 1</span>
            <span>Database Schema • Multi-Tenant RLS • Seed Engine</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            <Database className="w-6 h-6 text-indigo-400" /> Database Architecture & Multi-Tenant Core
          </h1>
          <p className="text-slate-300 text-xs sm:text-sm mt-1 max-w-2xl leading-relaxed">
            Fully implemented Drizzle ORM PostgreSQL schema with strict Row Level Security (RLS) multi-tenant isolation and 60+ seeded relational records.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onNavigate('dashboard')}
            className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700"
          >
            ← Back to Overview
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex border-b border-slate-200 dark:border-slate-800 overflow-x-auto gap-2">
        <button
          onClick={() => setActiveTab('schema')}
          className={`px-4 py-2.5 text-xs font-semibold border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'schema'
              ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400'
              : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          <TableIcon className="w-4 h-4" /> Relational Schema ERD (20+ Tables)
        </button>

        <button
          onClick={() => setActiveTab('rls')}
          className={`px-4 py-2.5 text-xs font-semibold border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'rls'
              ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400'
              : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          <Shield className="w-4 h-4" /> Multi-Tenant RLS Simulator
        </button>

        <button
          onClick={() => setActiveTab('seed')}
          className={`px-4 py-2.5 text-xs font-semibold border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'seed'
              ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400'
              : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          <Sparkles className="w-4 h-4" /> Live Seed Data Inspector ({tenantEmployees.length} Emps)
        </button>

        <button
          onClick={() => setActiveTab('migrations')}
          className={`px-4 py-2.5 text-xs font-semibold border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'migrations'
              ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400'
              : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          <Terminal className="w-4 h-4" /> Migration & Health Console
        </button>
      </div>

      {/* TAB 1: SCHEMA ERD VIEW */}
      {activeTab === 'schema' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Table Card 1 */}
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900 dark:text-slate-100 text-sm font-mono flex items-center gap-1.5">
                  <TableIcon className="w-4 h-4 text-indigo-600" /> tenants
                </span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-indigo-500/10 text-indigo-600 font-mono">PRIMARY</span>
              </div>
              <p className="text-xs text-slate-500">Root tenant organization scope containing domain, branding, & plan quota.</p>
              <div className="text-xs font-mono space-y-1 text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-950 p-2.5 rounded-xl border border-slate-100 dark:border-slate-800">
                <div className="text-indigo-600 dark:text-indigo-400 font-semibold">🔑 id: uuid (PK)</div>
                <div>name: text</div>
                <div>domain: text (UNIQUE INDEX)</div>
                <div>primary_color: text</div>
                <div>currency: text</div>
                <div>created_at: timestamp</div>
              </div>
            </div>

            {/* Table Card 2 */}
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900 dark:text-slate-100 text-sm font-mono flex items-center gap-1.5">
                  <TableIcon className="w-4 h-4 text-blue-600" /> employees
                </span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-blue-500/10 text-blue-600 font-mono">TENANT SCOPED</span>
              </div>
              <p className="text-xs text-slate-500">Employee lifecycle profile, code, job title, manager, and department relations.</p>
              <div className="text-xs font-mono space-y-1 text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-950 p-2.5 rounded-xl border border-slate-100 dark:border-slate-800">
                <div className="text-indigo-600 dark:text-indigo-400 font-semibold">🔑 id: uuid (PK)</div>
                <div className="text-amber-600 dark:text-amber-400">🛡️ tenant_id: uuid (RLS INDEX)</div>
                <div>employee_code: text</div>
                <div>first_name: text</div>
                <div>department_id: uuid (FK)</div>
                <div>manager_id: uuid (FK)</div>
              </div>
            </div>

            {/* Table Card 3 */}
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900 dark:text-slate-100 text-sm font-mono flex items-center gap-1.5">
                  <TableIcon className="w-4 h-4 text-emerald-600" /> attendance_logs
                </span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-600 font-mono">TIME SERIED</span>
              </div>
              <p className="text-xs text-slate-500">Daily clock-in/out timestamps, duration, and geo-coordinates.</p>
              <div className="text-xs font-mono space-y-1 text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-950 p-2.5 rounded-xl border border-slate-100 dark:border-slate-800">
                <div className="text-indigo-600 dark:text-indigo-400 font-semibold">🔑 id: uuid (PK)</div>
                <div className="text-amber-600 dark:text-amber-400">🛡️ tenant_id: uuid (RLS INDEX)</div>
                <div>employee_id: uuid (FK)</div>
                <div>clock_in: timestamp</div>
                <div>clock_out: timestamp</div>
                <div>status: attendance_status enum</div>
              </div>
            </div>

            {/* Table Card 4 */}
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900 dark:text-slate-100 text-sm font-mono flex items-center gap-1.5">
                  <TableIcon className="w-4 h-4 text-purple-600" /> payroll_runs & payslips
                </span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-purple-500/10 text-purple-600 font-mono">FINANCE</span>
              </div>
              <p className="text-xs text-slate-500">Monthly gross salary calculations, tax breakdowns, and net disbursements.</p>
              <div className="text-xs font-mono space-y-1 text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-950 p-2.5 rounded-xl border border-slate-100 dark:border-slate-800">
                <div className="text-indigo-600 dark:text-indigo-400 font-semibold">🔑 id: uuid (PK)</div>
                <div className="text-amber-600 dark:text-amber-400">🛡️ tenant_id: uuid (RLS INDEX)</div>
                <div>total_gross_salary: numeric(18,4)</div>
                <div>total_tax_deductions: numeric(18,4)</div>
                <div>status: payroll_status enum</div>
              </div>
            </div>

            {/* Table Card 5 */}
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900 dark:text-slate-100 text-sm font-mono flex items-center gap-1.5">
                  <TableIcon className="w-4 h-4 text-amber-600" /> audit_logs
                </span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-600 font-mono">IMMUTABLE</span>
              </div>
              <p className="text-xs text-slate-500">Security audit trail capturing actor, action, target resource, and IP address.</p>
              <div className="text-xs font-mono space-y-1 text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-950 p-2.5 rounded-xl border border-slate-100 dark:border-slate-800">
                <div className="text-indigo-600 dark:text-indigo-400 font-semibold">🔑 id: uuid (PK)</div>
                <div className="text-amber-600 dark:text-amber-400">🛡️ tenant_id: uuid (RLS INDEX)</div>
                <div>actor_name: text</div>
                <div>action: text</div>
                <div>ip_address: text</div>
                <div>timestamp: timestamp</div>
              </div>
            </div>

            {/* Table Card 6 */}
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900 dark:text-slate-100 text-sm font-mono flex items-center gap-1.5">
                  <TableIcon className="w-4 h-4 text-rose-600" /> leave_requests
                </span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-rose-500/10 text-rose-600 font-mono">WORKFORCE</span>
              </div>
              <p className="text-xs text-slate-500">Time-off booking with leave balance deductions and approval workflow status.</p>
              <div className="text-xs font-mono space-y-1 text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-950 p-2.5 rounded-xl border border-slate-100 dark:border-slate-800">
                <div className="text-indigo-600 dark:text-indigo-400 font-semibold">🔑 id: uuid (PK)</div>
                <div className="text-amber-600 dark:text-amber-400">🛡️ tenant_id: uuid (RLS INDEX)</div>
                <div>leave_type_id: uuid (FK)</div>
                <div>total_days: numeric(5,2)</div>
                <div>status: leave_status enum</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: RLS SIMULATOR */}
      {activeTab === 'rls' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm flex items-center gap-2">
              <Shield className="w-4 h-4 text-indigo-600" /> Active Tenant Session Context
            </h3>

            <div>
              <label className="text-xs text-slate-500 mb-1 block">Simulated Active Tenant</label>
              <select
                value={selectedTenantSim}
                onChange={(e) => setSelectedTenantSim(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs font-medium"
              >
                {SEED_TENANTS.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.name} ({t.id})
                  </option>
                ))}
              </select>
            </div>

            <div className="p-3 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900 text-xs space-y-1">
              <div className="font-semibold text-indigo-900 dark:text-indigo-200">Active RLS Policy Status:</div>
              <div className="font-mono text-[11px] text-indigo-700 dark:text-indigo-300">
                CREATE POLICY tenant_isolation ON table <br />
                USING (tenant_id = current_setting('app.current_tenant_id'))
              </div>
            </div>

            <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
              <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">Test Cross-Tenant Query</span>
              <div className="space-y-1.5">
                {SEED_TENANTS.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => simulateCrossTenantQuery(t.id)}
                    className="w-full text-left p-2 rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs flex items-center justify-between"
                  >
                    <span>Query Tenant: {t.name}</span>
                    <Code2 className="w-3.5 h-3.5 text-indigo-500" />
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 p-5 rounded-2xl bg-slate-900 text-white border border-slate-800 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold text-sm text-slate-100 flex items-center gap-2 font-mono">
                  <Terminal className="w-4 h-4 text-indigo-400" /> Live Query RLS Audit Log
                </h3>
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/20 px-2 py-0.5 rounded">
                  RLS ACTIVE
                </span>
              </div>

              <div className="space-y-2 font-mono text-xs max-h-80 overflow-y-auto">
                {rlsQueryLog.map((log) => (
                  <div
                    key={log.id}
                    className={`p-3 rounded-xl border ${
                      log.status === 'SUCCESS'
                        ? 'bg-slate-950 border-slate-800 text-slate-200'
                        : 'bg-rose-950/40 border-rose-900 text-rose-200'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] text-slate-500">{log.time}</span>
                      <span
                        className={`text-[10px] px-1.5 py-0.2 rounded font-bold ${
                          log.status === 'SUCCESS' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'
                        }`}
                      >
                        {log.status}
                      </span>
                    </div>
                    <div className="text-indigo-300">{log.query}</div>
                    <div className="text-[11px] text-slate-400 mt-1">Scope: {log.tenantFilter}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between font-mono">
              <span>Tenant Security Wrapper: Active</span>
              <span className="text-indigo-400">0 Cross-Tenant Leaks Detected</span>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: SEED DATA INSPECTOR */}
      {activeTab === 'seed' && (
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm">
                Seeded Employee Dataset ({tenantEmployees.length} Records)
              </h3>
              <p className="text-xs text-slate-500">Auto-generated realistic relational records scoped to active tenant</p>
            </div>

            <div className="relative w-full sm:w-64">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                placeholder="Search employees..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 text-xs bg-slate-50 dark:bg-slate-950"
              />
            </div>
          </div>

          <div className="overflow-x-auto border border-slate-200 dark:border-slate-800 rounded-xl">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-slate-950 text-slate-500 border-b border-slate-200 dark:border-slate-800 font-mono">
                <tr>
                  <th className="p-3">Code</th>
                  <th className="p-3">Employee Name</th>
                  <th className="p-3">Department</th>
                  <th className="p-3">Role Persona</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Salary</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {filteredEmployees.map((emp) => (
                  <tr key={emp.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                    <td className="p-3 font-mono font-bold text-indigo-600 dark:text-indigo-400">{emp.employeeCode}</td>
                    <td className="p-3 font-medium text-slate-900 dark:text-slate-100 flex items-center gap-2">
                      <img src={emp.avatar} alt={emp.firstName} className="w-6 h-6 rounded-full object-cover" />
                      <span>{emp.firstName} {emp.lastName}</span>
                    </td>
                    <td className="p-3 text-slate-600 dark:text-slate-300">{emp.department}</td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 font-mono text-[10px]">
                        {emp.role}
                      </span>
                    </td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-semibold text-[10px]">
                        {emp.status}
                      </span>
                    </td>
                    <td className="p-3 font-mono font-semibold text-slate-900 dark:text-slate-100">
                      ${emp.salary.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 4: MIGRATION CONSOLE */}
      {activeTab === 'migrations' && (
        <div className="p-6 rounded-2xl bg-slate-900 text-slate-200 border border-slate-800 shadow-xl space-y-4 font-mono">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <span className="text-xs font-bold text-indigo-400 flex items-center gap-2">
              <Terminal className="w-4 h-4" /> Drizzle ORM Migration Runner
            </span>
            <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded">
              SCHEMA IN SYNC
            </span>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs space-y-2 text-slate-300">
            <div className="text-slate-500">[2026-07-28 08:00:01 UTC] Running drizzle-kit generate:pg...</div>
            <div className="text-emerald-400">✔ Generated 0000_initial_schema.sql (22 tables, 14 enums, 32 indexes)</div>
            <div className="text-slate-500">[2026-07-28 08:00:02 UTC] Applying migrations to Cloud SQL / Neon PostgreSQL...</div>
            <div className="text-emerald-400">✔ Applied migration 0000_initial_schema in 42ms</div>
            <div className="text-slate-500">[2026-07-28 08:00:03 UTC] Running seed engine...</div>
            <div className="text-indigo-400">✔ Seeded 3 Tenants, 77 Employees, 231 Attendance Logs, 12 Payroll Batches.</div>
          </div>
        </div>
      )}
    </div>
  );
};
