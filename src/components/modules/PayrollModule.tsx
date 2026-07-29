import React, { useState } from 'react';
import { Tenant, UserRole } from '../../types';
import {
  CreditCard,
  DollarSign,
  Download,
  CheckCircle2,
  Lock,
  FileText,
  Mail,
  Send,
  Building,
  TrendingUp,
  AlertCircle,
  FileCheck,
  ChevronRight,
  Eye,
  Sparkles,
  X
} from 'lucide-react';
import { generateSeedPayrollRuns, SeedPayrollRun } from '../../db/seed';

interface PayrollModuleProps {
  currentTenant: Tenant;
  currentRole: UserRole;
  onNavigate: (viewId: string) => void;
}

export const PayrollModule: React.FC<PayrollModuleProps> = ({
  currentTenant,
  currentRole,
}) => {
  const [payrollRuns, setPayrollRuns] = useState<SeedPayrollRun[]>(
    generateSeedPayrollRuns().filter((p) => p.tenantId === currentTenant.id)
  );
  const [activeRun, setActiveRun] = useState<SeedPayrollRun>(payrollRuns[0]);
  const [activeStep, setActiveStep] = useState<'review' | 'payslips' | 'bank_export'>('review');
  const [selectedPayslip, setSelectedPayslip] = useState<any | null>(null);

  const mockPayslips = [
    { id: 'ps-1', name: 'Alex Morgan', code: 'EMP-101', gross: 12500, tax: 2750, pf: 1500, net: 8250, email: 'alex.morgan@acme.com' },
    { id: 'ps-2', name: 'Jordan Smith', code: 'EMP-102', gross: 9800, tax: 2156, pf: 1176, net: 6468, email: 'jordan.smith@acme.com' },
    { id: 'ps-3', name: 'David Chen', code: 'EMP-103', gross: 11200, tax: 2464, pf: 1344, net: 7392, email: 'david.chen@acme.com' },
    { id: 'ps-4', name: 'Elena Rostova', code: 'EMP-104', gross: 13500, tax: 2970, pf: 1620, net: 8910, email: 'elena.rostova@acme.com' },
  ];

  const handleLockRun = () => {
    setActiveRun({ ...activeRun, status: 'LOCKED' });
    setPayrollRuns(payrollRuns.map((r) => (r.id === activeRun.id ? { ...r, status: 'LOCKED' } : r)));
  };

  const handleDisburseRun = () => {
    setActiveRun({ ...activeRun, status: 'DISBURSED' });
    setPayrollRuns(payrollRuns.map((r) => (r.id === activeRun.id ? { ...r, status: 'DISBURSED' } : r)));
  };

  return (
    <div className="space-y-6">
      {/* Module Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-purple-600 dark:text-purple-400 mb-1">
            <span className="px-2 py-0.5 rounded bg-purple-500/10 font-mono text-[10px]">MODULE 5 / PHASE 5</span>
            <span>Payroll Engine • Tax Calculations • Bank Files</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
            Payroll Processing & Compensation
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Automated gross-to-net salary calculations, statutory deductions, payslip PDF rendering, and direct bank batch export.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {activeRun.status === 'DRAFT' && (
            <button
              onClick={handleLockRun}
              className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold flex items-center gap-1.5 shadow-lg shadow-purple-600/30 transition-colors"
            >
              <Lock className="w-4 h-4" /> Lock Payroll Draft
            </button>
          )}

          {activeRun.status === 'LOCKED' && (
            <button
              onClick={handleDisburseRun}
              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center gap-1.5 shadow-lg shadow-emerald-600/30 transition-colors"
            >
              <DollarSign className="w-4 h-4" /> Disburse & Dispatch Payslips
            </button>
          )}

          {activeRun.status === 'DISBURSED' && (
            <span className="px-3 py-1.5 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold text-xs flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4" /> Disbursed on {activeRun.disbursementDate}
            </span>
          )}
        </div>
      </div>

      {/* Payroll Run Selector Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        {payrollRuns.map((run) => (
          <div
            key={run.id}
            onClick={() => setActiveRun(run)}
            className={`p-4 rounded-2xl border cursor-pointer transition-all ${
              activeRun.id === run.id
                ? 'bg-slate-900 text-white border-slate-900 shadow-md'
                : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-purple-300'
            }`}
          >
            <div className="flex items-center justify-between text-xs font-mono">
              <span className={activeRun.id === run.id ? 'text-purple-300' : 'text-slate-500'}>{run.monthYear}</span>
              <span
                className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                  run.status === 'DISBURSED'
                    ? 'bg-emerald-500/20 text-emerald-400'
                    : run.status === 'LOCKED'
                    ? 'bg-amber-500/20 text-amber-400'
                    : 'bg-indigo-500/20 text-indigo-300'
                }`}
              >
                {run.status}
              </span>
            </div>

            <div className="mt-2 text-xl font-bold font-mono">
              ${run.grossSalary.toLocaleString()}
            </div>
            <div className={`text-[11px] mt-1 ${activeRun.id === run.id ? 'text-slate-400' : 'text-slate-500'}`}>
              {run.headcountProcessed} Employees Processed
            </div>
          </div>
        ))}
      </div>

      {/* Main Execution Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Breakdown Panel */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm">
            July 2026 Salary Breakdown
          </h3>

          <div className="space-y-3 text-xs font-mono">
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 flex justify-between">
              <span className="text-slate-500">Total Gross Payroll:</span>
              <span className="font-bold text-slate-900 dark:text-slate-100">${activeRun.grossSalary.toLocaleString()}</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 flex justify-between">
              <span className="text-slate-500">Statutory Tax Deductions:</span>
              <span className="font-bold text-rose-500">-${activeRun.taxDeductions.toLocaleString()}</span>
            </div>

            <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-100 dark:border-emerald-900 flex justify-between">
              <span className="text-emerald-900 dark:text-emerald-200 font-bold">Total Net Disbursement:</span>
              <span className="font-bold text-emerald-600 dark:text-emerald-400 text-sm">${activeRun.netDisbursement.toLocaleString()}</span>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-500 space-y-1">
            <div className="flex items-center justify-between">
              <span>Currency:</span>
              <span className="font-mono text-slate-800 dark:text-slate-200">{currentTenant.currency}</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Bank Gateway:</span>
              <span className="font-mono text-indigo-600">ACH / NACH Direct Debit</span>
            </div>
          </div>
        </div>

        {/* Employee Payslips Table */}
        <div className="lg:col-span-2 p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm">
              Employee Payslip Ledger & Dispatch ({mockPayslips.length} Samples)
            </h3>
            <button className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 text-xs font-semibold hover:bg-slate-50 flex items-center gap-1">
              <Download className="w-3.5 h-3.5" /> Download NACH File
            </button>
          </div>

          <div className="overflow-x-auto border border-slate-200 dark:border-slate-800 rounded-xl">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-slate-950 text-slate-500 border-b border-slate-200 dark:border-slate-800 font-mono">
                <tr>
                  <th className="p-3">Employee</th>
                  <th className="p-3">Gross Salary</th>
                  <th className="p-3">Deductions</th>
                  <th className="p-3">Net Salary</th>
                  <th className="p-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {mockPayslips.map((ps) => (
                  <tr key={ps.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                    <td className="p-3">
                      <div className="font-semibold text-slate-900 dark:text-slate-100">{ps.name}</div>
                      <div className="text-[10px] text-slate-400 font-mono">{ps.code}</div>
                    </td>
                    <td className="p-3 font-mono text-slate-800 dark:text-slate-200">${ps.gross.toLocaleString()}</td>
                    <td className="p-3 font-mono text-rose-500">-${(ps.tax + ps.pf).toLocaleString()}</td>
                    <td className="p-3 font-mono font-bold text-emerald-600 dark:text-emerald-400">${ps.net.toLocaleString()}</td>
                    <td className="p-3 text-right">
                      <button
                        onClick={() => setSelectedPayslip(ps)}
                        className="px-2.5 py-1 rounded-lg bg-purple-50 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400 font-medium hover:bg-purple-100 transition-colors"
                      >
                        Preview PDF →
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* PAYSLIP PDF PREVIEW MODAL */}
      {selectedPayslip && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-2xl shadow-2xl p-6 border border-slate-200 dark:border-slate-800 space-y-4 text-xs">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-slate-100 text-sm">
                <FileText className="w-4 h-4 text-purple-600" /> Payslip PDF Statement: {selectedPayslip.name}
              </div>
              <button onClick={() => setSelectedPayslip(null)} className="text-slate-400 hover:text-slate-600">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-4 font-mono">
              <div className="flex justify-between items-start border-b border-slate-200 dark:border-slate-800 pb-3">
                <div>
                  <div className="font-bold text-indigo-600 text-sm">{currentTenant.name}</div>
                  <div className="text-[10px] text-slate-400">{currentTenant.domain}</div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-slate-900 dark:text-slate-100">PAYSLIP - JULY 2026</div>
                  <div className="text-[10px] text-slate-400">Date: 2026-07-31</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-[11px]">
                <div>Employee Name: <span className="font-bold">{selectedPayslip.name}</span></div>
                <div>Employee Code: <span className="font-bold">{selectedPayslip.code}</span></div>
              </div>

              <div className="space-y-1 pt-2 border-t border-slate-200 dark:border-slate-800">
                <div className="flex justify-between">
                  <span>Basic Salary:</span>
                  <span>${selectedPayslip.gross.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-rose-500">
                  <span>Income Tax (TDS):</span>
                  <span>-${selectedPayslip.tax.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-rose-500">
                  <span>Provident Fund (PF/401k):</span>
                  <span>-${selectedPayslip.pf.toLocaleString()}</span>
                </div>
                <div className="flex justify-between font-bold text-sm text-emerald-600 pt-2 border-t border-slate-200 dark:border-slate-800">
                  <span>NET SALARY DISBURSED:</span>
                  <span>${selectedPayslip.net.toLocaleString()}</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setSelectedPayslip(null)}
              className="w-full py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold transition-colors"
            >
              Email Payslip to {selectedPayslip.email}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
