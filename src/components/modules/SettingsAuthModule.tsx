import React, { useState } from 'react';
import { Tenant, UserRole } from '../../types';
import {
  Shield,
  Building2,
  Users,
  Key,
  Globe,
  Plus,
  CheckCircle2,
  Lock,
  Mail,
  Smartphone,
  Save,
  CreditCard,
  Sparkles,
  RefreshCw,
  Terminal,
  X,
  Sun,
  Moon,
  Palette
} from 'lucide-react';
import { SEED_TENANTS } from '../../db/seed';

interface SettingsAuthModuleProps {
  currentTenant: Tenant;
  currentRole: UserRole;
  theme?: 'light' | 'dark';
  onSetTheme?: (theme: 'light' | 'dark') => void;
  onNavigate: (viewId: string) => void;
}

export const SettingsAuthModule: React.FC<SettingsAuthModuleProps> = ({
  currentTenant,
  currentRole,
  theme = 'light',
  onSetTheme,
}) => {
  const [activeTab, setActiveTab] = useState<'tenants' | 'rbac' | 'appearance' | 'security'>('tenants');
  const [tenantsList, setTenantsList] = useState<Tenant[]>(SEED_TENANTS);
  const [isProvisionModalOpen, setIsProvisionModalOpen] = useState(false);

  // New Tenant Provisioning Form State
  const [newTenant, setNewTenant] = useState({
    name: '',
    domain: '',
    plan: 'Growth' as const,
    currency: 'USD ($)',
    country: 'United States',
    primaryColor: '#2563eb',
  });

  const handleProvisionTenant = (e: React.FormEvent) => {
    e.preventDefault();
    const created: Tenant = {
      id: `tenant-${Date.now()}`,
      name: newTenant.name,
      domain: `${newTenant.domain.toLowerCase()}.peopleflow.app`,
      logo: '🚀',
      plan: newTenant.plan,
      seats: newTenant.plan === 'Enterprise' ? 500 : 100,
      usedSeats: 1,
      currency: newTenant.currency,
      timezone: 'America/New_York (UTC-5)',
      country: newTenant.country,
      primaryColor: newTenant.primaryColor,
    };
    setTenantsList([...tenantsList, created]);
    setIsProvisionModalOpen(false);
    setNewTenant({
      name: '',
      domain: '',
      plan: 'Growth',
      currency: 'USD ($)',
      country: 'United States',
      primaryColor: '#2563eb',
    });
  };

  const rolePermissionsMatrix = [
    { module: 'Core HR & Employee Directory', superAdmin: true, companyAdmin: true, manager: 'Team Only', employee: 'Self Only' },
    { module: 'Attendance & Clock-In', superAdmin: true, companyAdmin: true, manager: 'Team Approvals', employee: 'Clock In / Out' },
    { module: 'Leave Approvals Ledger', superAdmin: true, companyAdmin: true, manager: 'Team Approvals', employee: 'Apply Leave' },
    { module: 'Payroll & Salary Runs', superAdmin: true, companyAdmin: true, manager: false, employee: 'View Payslips' },
    { module: 'Multi-Tenant Provisioning & System Settings', superAdmin: true, companyAdmin: 'Tenant Settings', manager: false, employee: false },
    { module: 'Security Audit Trail & Compliance', superAdmin: true, companyAdmin: true, manager: false, employee: false },
  ];

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-blue-600 dark:text-blue-400 mb-1">
            <span className="px-2 py-0.5 rounded bg-blue-500/10 font-mono text-[10px]">MODULE 1 / PHASE 2</span>
            <span>Multi-Tenant Provisioning • RBAC Matrix • Security</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
            Tenant Management & Role-Based Access Control
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Provision new tenant organizations, configure custom domain branding, and enforce fine-grained RBAC permissions.
          </p>
        </div>

        <button
          onClick={() => setIsProvisionModalOpen(true)}
          className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold flex items-center gap-1.5 shadow-lg shadow-blue-600/30 transition-colors"
        >
          <Building2 className="w-4 h-4" /> Provision New Tenant
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 dark:border-slate-800 overflow-x-auto gap-2">
        <button
          onClick={() => setActiveTab('tenants')}
          className={`px-4 py-2.5 text-xs font-semibold border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'tenants'
              ? 'border-blue-600 text-blue-600 dark:text-blue-400'
              : 'border-transparent text-slate-500'
          }`}
        >
          <Building2 className="w-4 h-4" /> Tenants Directory ({tenantsList.length})
        </button>

        <button
          onClick={() => setActiveTab('rbac')}
          className={`px-4 py-2.5 text-xs font-semibold border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'rbac'
              ? 'border-blue-600 text-blue-600 dark:text-blue-400'
              : 'border-transparent text-slate-500'
          }`}
        >
          <Shield className="w-4 h-4" /> RBAC Permission Matrix
        </button>

        <button
          onClick={() => setActiveTab('security')}
          className={`px-4 py-2.5 text-xs font-semibold border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'security'
              ? 'border-blue-600 text-blue-600 dark:text-blue-400'
              : 'border-transparent text-slate-500'
          }`}
        >
          <Lock className="w-4 h-4" /> Security, MFA & SAML SSO
        </button>

        <button
          onClick={() => setActiveTab('appearance')}
          className={`px-4 py-2.5 text-xs font-semibold border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'appearance'
              ? 'border-[#5d5fef] text-[#5d5fef]'
              : 'border-transparent text-slate-500'
          }`}
        >
          <Palette className="w-4 h-4" /> Appearance & Theme (2 Modes)
        </button>
      </div>

      {/* TAB 1: TENANTS DIRECTORY */}
      {activeTab === 'tenants' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tenantsList.map((tenant) => (
            <div
              key={tenant.id}
              className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="text-2xl">{tenant.logo}</span>
                    <div>
                      <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm">{tenant.name}</h3>
                      <p className="text-[11px] text-blue-600 dark:text-blue-400 font-mono">{tenant.domain}</p>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 font-mono text-[10px] font-bold">
                    {tenant.plan}
                  </span>
                </div>

                <div className="mt-4 space-y-2 text-xs font-mono text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-950 p-3 rounded-xl border border-slate-100 dark:border-slate-800">
                  <div className="flex justify-between">
                    <span>Allocated Seats:</span>
                    <span className="font-bold text-slate-900 dark:text-slate-100">{tenant.usedSeats} / {tenant.seats}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Country / Currency:</span>
                    <span className="font-bold text-slate-900 dark:text-slate-100">{tenant.country} ({tenant.currency})</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tenant ID:</span>
                    <span className="font-bold text-slate-500 text-[10px]">{tenant.id}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2 border-t border-slate-100 dark:border-slate-800 text-xs">
                <button className="w-full py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-blue-50 text-slate-700 dark:text-slate-200 font-semibold transition-colors">
                  Manage Branding
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB 2: RBAC MATRIX */}
      {activeTab === 'rbac' && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 space-y-4 shadow-sm">
          <div>
            <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm">Role Access Rights Matrix</h3>
            <p className="text-xs text-slate-500">Fine-grained access rights mapping across modules</p>
          </div>

          <div className="overflow-x-auto border border-slate-200 dark:border-slate-800 rounded-xl">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-slate-950 text-slate-500 border-b border-slate-200 dark:border-slate-800 font-mono">
                <tr>
                  <th className="p-3.5">Module Scope</th>
                  <th className="p-3.5 text-center">Super Admin</th>
                  <th className="p-3.5 text-center">Company Admin</th>
                  <th className="p-3.5 text-center">Manager</th>
                  <th className="p-3.5 text-center">Employee</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {rolePermissionsMatrix.map((row) => (
                  <tr key={row.module} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                    <td className="p-3.5 font-semibold text-slate-900 dark:text-slate-100">{row.module}</td>
                    <td className="p-3.5 text-center font-mono font-bold text-emerald-600">
                      {row.superAdmin === true ? 'FULL ACCESS' : row.superAdmin}
                    </td>
                    <td className="p-3.5 text-center font-mono text-emerald-600 font-bold">
                      {row.companyAdmin === true ? 'FULL ACCESS' : row.companyAdmin}
                    </td>
                    <td className="p-3.5 text-center font-mono text-indigo-600">
                      {row.manager === false ? 'NO ACCESS' : row.manager}
                    </td>
                    <td className="p-3.5 text-center font-mono text-slate-500">
                      {row.employee === false ? 'NO ACCESS' : row.employee}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB: APPEARANCE & THEME MODES */}
      {activeTab === 'appearance' && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 space-y-6 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-4">
            <div>
              <h3 className="font-extrabold text-slate-900 dark:text-slate-100 text-base">Theme Preferences</h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Choose explicitly between Light or Dark theme. System default settings are automatically ignored.
              </p>
            </div>
            <span className="px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 font-mono text-[11px] font-bold border border-emerald-200/60 dark:border-emerald-800/60 w-fit">
              ✓ System Default Ignored
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Light Theme Option Card */}
            <div
              onClick={() => onSetTheme?.('light')}
              className={`cursor-pointer rounded-2xl p-5 border-2 transition-all flex flex-col justify-between space-y-4 ${
                theme === 'light'
                  ? 'border-[#5d5fef] bg-[#5d5fef]/5 shadow-lg shadow-[#5d5fef]/10'
                  : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-slate-50/50 dark:bg-slate-800/30'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center">
                    <Sun className="w-5 h-5 fill-amber-500" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white text-sm">Light Theme</h4>
                    <p className="text-xs text-slate-500">Crisp, clean workspace with high contrast readability</p>
                  </div>
                </div>
                {theme === 'light' && (
                  <span className="w-6 h-6 rounded-full bg-[#5d5fef] text-white flex items-center justify-center text-xs font-bold">
                    ✓
                  </span>
                )}
              </div>

              {/* Light Theme Mini Preview Box */}
              <div className="p-3 rounded-xl bg-[#edf6f3] border border-slate-200 space-y-2 text-slate-800 text-[10px]">
                <div className="flex items-center justify-between bg-white p-2 rounded-lg shadow-sm">
                  <span className="font-bold">Dashboard Preview</span>
                  <span className="px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 font-mono font-bold">Active</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-[#ffe5ec] p-2 rounded-lg font-bold text-rose-900">Headcount: 184</div>
                  <div className="bg-[#fff3d6] p-2 rounded-lg font-bold text-amber-900">Jobs: 24</div>
                </div>
              </div>

              <button
                type="button"
                className={`w-full py-2 rounded-xl text-xs font-bold transition-all ${
                  theme === 'light'
                    ? 'bg-[#5d5fef] text-white shadow-md'
                    : 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-300'
                }`}
              >
                {theme === 'light' ? 'Active Light Theme' : 'Select Light Theme'}
              </button>
            </div>

            {/* Dark Theme Option Card */}
            <div
              onClick={() => onSetTheme?.('dark')}
              className={`cursor-pointer rounded-2xl p-5 border-2 transition-all flex flex-col justify-between space-y-4 ${
                theme === 'dark'
                  ? 'border-[#5d5fef] bg-[#5d5fef]/10 shadow-lg shadow-[#5d5fef]/20'
                  : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-slate-50/50 dark:bg-slate-800/30'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-950 text-indigo-400 flex items-center justify-center">
                    <Moon className="w-5 h-5 fill-indigo-400" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white text-sm">Dark Theme</h4>
                    <p className="text-xs text-slate-500">Deep twilight dark canvas with vibrant accent elements</p>
                  </div>
                </div>
                {theme === 'dark' && (
                  <span className="w-6 h-6 rounded-full bg-[#5d5fef] text-white flex items-center justify-center text-xs font-bold">
                    ✓
                  </span>
                )}
              </div>

              {/* Dark Theme Mini Preview Box */}
              <div className="p-3 rounded-xl bg-[#0b0f19] border border-slate-800 space-y-2 text-slate-100 text-[10px]">
                <div className="flex items-center justify-between bg-[#111827] p-2 rounded-lg shadow-sm border border-slate-800">
                  <span className="font-bold">Dashboard Preview</span>
                  <span className="px-1.5 py-0.5 rounded bg-purple-900/60 text-purple-300 font-mono font-bold">Active</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-rose-950/60 p-2 rounded-lg font-bold text-rose-200 border border-rose-900/30">Headcount: 184</div>
                  <div className="bg-amber-950/60 p-2 rounded-lg font-bold text-amber-200 border border-amber-900/30">Jobs: 24</div>
                </div>
              </div>

              <button
                type="button"
                className={`w-full py-2 rounded-xl text-xs font-bold transition-all ${
                  theme === 'dark'
                    ? 'bg-[#5d5fef] text-white shadow-md'
                    : 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-300'
                }`}
              >
                {theme === 'dark' ? 'Active Dark Theme' : 'Select Dark Theme'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* PROVISION TENANT MODAL */}
      {isProvisionModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-2xl shadow-2xl p-6 border border-slate-200 dark:border-slate-800 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
              <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm">Provision New Tenant Org</h3>
              <button onClick={() => setIsProvisionModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleProvisionTenant} className="space-y-3 text-xs">
              <div>
                <label className="text-slate-500">Company Name</label>
                <input
                  required
                  type="text"
                  placeholder="e.g. Nexus Global"
                  value={newTenant.name}
                  onChange={(e) => setNewTenant({ ...newTenant, name: e.target.value })}
                  className="w-full p-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 mt-1"
                />
              </div>

              <div>
                <label className="text-slate-500">Subdomain Prefix (.peopleflow.app)</label>
                <input
                  required
                  type="text"
                  placeholder="nexus"
                  value={newTenant.domain}
                  onChange={(e) => setNewTenant({ ...newTenant, domain: e.target.value })}
                  className="w-full p-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 mt-1"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-slate-500">Subscription Plan</label>
                  <select
                    value={newTenant.plan}
                    onChange={(e) => setNewTenant({ ...newTenant, plan: e.target.value as any })}
                    className="w-full p-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 mt-1"
                  >
                    <option value="Starter">Starter (50 Seats)</option>
                    <option value="Growth">Growth (100 Seats)</option>
                    <option value="Enterprise">Enterprise (500 Seats)</option>
                  </select>
                </div>
                <div>
                  <label className="text-slate-500">Default Currency</label>
                  <select
                    value={newTenant.currency}
                    onChange={(e) => setNewTenant({ ...newTenant, currency: e.target.value })}
                    className="w-full p-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 mt-1"
                  >
                    <option value="USD ($)">USD ($)</option>
                    <option value="EUR (€)">EUR (€)</option>
                    <option value="GBP (£)">GBP (£)</option>
                    <option value="INR (₹)">INR (₹)</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition-colors mt-2"
              >
                Provision Tenant & Seed Sandbox
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
