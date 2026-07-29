import React, { useState } from 'react';
import { Tenant, UserRole } from '../../types';
import {
  Users,
  Search,
  Filter,
  UserPlus,
  Download,
  Upload,
  MoreVertical,
  Building2,
  Mail,
  Phone,
  Calendar,
  DollarSign,
  Shield,
  FileText,
  ChevronRight,
  Briefcase,
  X,
  Check,
  MapPin,
  GitFork,
  Grid,
  List,
  Sparkles,
  ExternalLink,
  Laptop
} from 'lucide-react';
import { generateSeedEmployees, SeedEmployee } from '../../db/seed';

interface EmployeesModuleProps {
  currentTenant: Tenant;
  currentRole: UserRole;
  onNavigate: (viewId: string) => void;
}

export const EmployeesModule: React.FC<EmployeesModuleProps> = ({
  currentTenant,
  currentRole,
}) => {
  const [employees, setEmployees] = useState<SeedEmployee[]>(generateSeedEmployees().filter(e => e.tenantId === currentTenant.id));
  const [viewMode, setViewMode] = useState<'grid' | 'table' | 'orgchart'>('table');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDept, setSelectedDept] = useState<string>('ALL');
  const [selectedEmployee, setSelectedEmployee] = useState<SeedEmployee | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);

  // New Employee Form State
  const [newEmp, setNewEmp] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    department: 'Engineering',
    jobTitle: 'Software Engineer',
    role: 'EMPLOYEE' as UserRole,
    salary: 85000,
    status: 'FULL_TIME' as const,
    location: currentTenant.country,
  });

  const filteredEmployees = employees.filter((emp) => {
    const matchesSearch =
      `${emp.firstName} ${emp.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.employeeCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDept = selectedDept === 'ALL' || emp.department === selectedDept;
    return matchesSearch && matchesDept;
  });

  const handleAddEmployee = (e: React.FormEvent) => {
    e.preventDefault();
    const created: SeedEmployee = {
      id: `emp-${currentTenant.id}-${Date.now()}`,
      tenantId: currentTenant.id,
      employeeCode: `EMP-${employees.length + 101}`,
      firstName: newEmp.firstName,
      lastName: newEmp.lastName,
      email: newEmp.email,
      phone: newEmp.phone || '+1 (555) 019-2831',
      department: newEmp.department,
      jobTitle: newEmp.jobTitle,
      role: newEmp.role,
      salary: Number(newEmp.salary),
      status: newEmp.status,
      joiningDate: new Date().toISOString().split('T')[0],
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
      location: newEmp.location,
    };
    setEmployees([created, ...employees]);
    setIsAddModalOpen(false);
    setNewEmp({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      department: 'Engineering',
      jobTitle: 'Software Engineer',
      role: 'EMPLOYEE',
      salary: 85000,
      status: 'FULL_TIME',
      location: currentTenant.country,
    });
  };

  return (
    <div className="space-y-6">
      {/* Module Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-indigo-600 dark:text-indigo-400 mb-1">
            <span className="px-2 py-0.5 rounded bg-indigo-500/10 font-mono text-[10px]">MODULE 2 / PHASE 3</span>
            <span>Core HR • Employee 360 • Org Chart</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
            Employee Directory & Lifecycle
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Manage employee 360 profiles, reporting lines, departments, compensation, and onboarding status.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsImportModalOpen(true)}
            className="px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-100 text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <Upload className="w-4 h-4 text-indigo-500" /> Import CSV
          </button>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center gap-1.5 shadow-lg shadow-indigo-600/30 transition-colors"
          >
            <UserPlus className="w-4 h-4" /> Add Employee
          </button>
        </div>
      </div>

      {/* Controls & Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs">
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-72">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search by name, ID, email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 text-xs bg-slate-50 dark:bg-slate-950 focus:outline-none"
            />
          </div>

          <select
            value={selectedDept}
            onChange={(e) => setSelectedDept(e.target.value)}
            className="p-1.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs font-medium"
          >
            <option value="ALL">All Departments</option>
            <option value="Engineering">Engineering</option>
            <option value="Product & Design">Product & Design</option>
            <option value="Sales & Marketing">Sales & Marketing</option>
            <option value="Human Resources">Human Resources</option>
            <option value="Finance & Ops">Finance & Ops</option>
          </select>
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl self-end sm:self-auto">
          <button
            onClick={() => setViewMode('table')}
            className={`p-1.5 rounded-lg text-xs font-medium flex items-center gap-1 ${
              viewMode === 'table' ? 'bg-white dark:bg-slate-900 text-indigo-600 shadow-sm' : 'text-slate-500'
            }`}
          >
            <List className="w-3.5 h-3.5" /> Table
          </button>
          <button
            onClick={() => setViewMode('grid')}
            className={`p-1.5 rounded-lg text-xs font-medium flex items-center gap-1 ${
              viewMode === 'grid' ? 'bg-white dark:bg-slate-900 text-indigo-600 shadow-sm' : 'text-slate-500'
            }`}
          >
            <Grid className="w-3.5 h-3.5" /> Cards
          </button>
          <button
            onClick={() => setViewMode('orgchart')}
            className={`p-1.5 rounded-lg text-xs font-medium flex items-center gap-1 ${
              viewMode === 'orgchart' ? 'bg-white dark:bg-slate-900 text-indigo-600 shadow-sm' : 'text-slate-500'
            }`}
          >
            <Building2 className="w-3.5 h-3.5" /> Org Tree
          </button>
        </div>
      </div>

      {/* VIEW MODE 1: TABLE */}
      {viewMode === 'table' && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-slate-950 text-slate-500 border-b border-slate-200 dark:border-slate-800 font-mono">
                <tr>
                  <th className="p-3.5">Code</th>
                  <th className="p-3.5">Employee Name</th>
                  <th className="p-3.5">Department</th>
                  <th className="p-3.5">Job Title</th>
                  <th className="p-3.5">Role Persona</th>
                  <th className="p-3.5">Status</th>
                  <th className="p-3.5">Joining Date</th>
                  <th className="p-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {filteredEmployees.map((emp) => (
                  <tr key={emp.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                    <td className="p-3.5 font-mono font-bold text-indigo-600 dark:text-indigo-400">
                      {emp.employeeCode}
                    </td>
                    <td className="p-3.5 font-medium text-slate-900 dark:text-slate-100">
                      <div className="flex items-center gap-2.5">
                        <img src={emp.avatar} alt={emp.firstName} className="w-7 h-7 rounded-full object-cover" />
                        <div>
                          <div className="font-semibold">{emp.firstName} {emp.lastName}</div>
                          <div className="text-[10px] text-slate-400 font-mono">{emp.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="p-3.5 text-slate-700 dark:text-slate-300">{emp.department}</td>
                    <td className="p-3.5 text-slate-600 dark:text-slate-400">{emp.jobTitle}</td>
                    <td className="p-3.5">
                      <span className="px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-[10px] font-mono">
                        {emp.role}
                      </span>
                    </td>
                    <td className="p-3.5">
                      <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-semibold text-[10px]">
                        {emp.status}
                      </span>
                    </td>
                    <td className="p-3.5 font-mono text-slate-500">{emp.joiningDate}</td>
                    <td className="p-3.5 text-right">
                      <button
                        onClick={() => setSelectedEmployee(emp)}
                        className="px-2.5 py-1 rounded-lg bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 font-medium hover:bg-indigo-100 transition-colors"
                      >
                        360 Profile →
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* VIEW MODE 2: GRID CARDS */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredEmployees.map((emp) => (
            <div
              key={emp.id}
              className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <img src={emp.avatar} alt={emp.firstName} className="w-10 h-10 rounded-full object-cover" />
                    <div>
                      <h4 className="font-bold text-slate-900 dark:text-slate-100 text-sm">
                        {emp.firstName} {emp.lastName}
                      </h4>
                      <p className="text-xs text-indigo-600 dark:text-indigo-400 font-mono font-medium">
                        {emp.employeeCode}
                      </p>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600">
                    {emp.status}
                  </span>
                </div>

                <div className="mt-4 space-y-1.5 text-xs text-slate-600 dark:text-slate-400">
                  <div className="flex items-center gap-2">
                    <Briefcase className="w-3.5 h-3.5 text-slate-400" />
                    <span>{emp.jobTitle}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Building2 className="w-3.5 h-3.5 text-slate-400" />
                    <span>{emp.department}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 text-slate-400" />
                    <span className="font-mono text-[11px] truncate">{emp.email}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setSelectedEmployee(emp)}
                className="mt-4 w-full py-2 rounded-xl bg-slate-50 dark:bg-slate-800 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 text-slate-700 dark:text-slate-200 hover:text-indigo-600 text-xs font-semibold transition-colors"
              >
                View 360 Profile
              </button>
            </div>
          ))}
        </div>
      )}

      {/* VIEW MODE 3: ORG TREE */}
      {viewMode === 'orgchart' && (
        <div className="p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm text-center">
          <div className="max-w-2xl mx-auto space-y-6">
            <div className="p-4 rounded-2xl bg-indigo-600 text-white max-w-xs mx-auto shadow-lg">
              <div className="font-bold text-sm">Alex Morgan</div>
              <div className="text-xs opacity-90">VP of People & Culture (Company Admin)</div>
            </div>

            <div className="w-0.5 h-6 bg-slate-300 dark:bg-slate-700 mx-auto" />

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-left">
                <div className="font-bold text-xs text-slate-900 dark:text-slate-100">David Chen</div>
                <div className="text-[10px] text-slate-500">Engineering Manager</div>
                <div className="mt-2 text-[10px] text-indigo-600 font-mono">8 Direct Reports</div>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-left">
                <div className="font-bold text-xs text-slate-900 dark:text-slate-100">Marcus Vance</div>
                <div className="text-[10px] text-slate-500">Lead Talent Partner</div>
                <div className="mt-2 text-[10px] text-indigo-600 font-mono">3 Direct Reports</div>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-left">
                <div className="font-bold text-xs text-slate-900 dark:text-slate-100">Elena Rostova</div>
                <div className="text-[10px] text-slate-500">Head of Compensation</div>
                <div className="mt-2 text-[10px] text-indigo-600 font-mono">2 Direct Reports</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* EMPLOYEE 360 PROFILE SLIDE-OVER DRAWER */}
      {selectedEmployee && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex justify-end">
          <div className="w-full max-w-lg bg-white dark:bg-slate-900 h-full shadow-2xl p-6 overflow-y-auto space-y-6 text-xs">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
              <div className="flex items-center gap-3">
                <img src={selectedEmployee.avatar} alt={selectedEmployee.firstName} className="w-12 h-12 rounded-full object-cover ring-2 ring-indigo-500" />
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
                    {selectedEmployee.firstName} {selectedEmployee.lastName}
                  </h3>
                  <div className="text-indigo-600 dark:text-indigo-400 font-mono font-medium">
                    {selectedEmployee.employeeCode} • {selectedEmployee.department}
                  </div>
                </div>
              </div>
              <button onClick={() => setSelectedEmployee(null)} className="p-1 rounded-lg text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 space-y-2">
                <div className="font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider text-[10px]">Employment & Job</div>
                <div className="grid grid-cols-2 gap-2 text-slate-600 dark:text-slate-300">
                  <div>Job Title: <span className="font-medium text-slate-900 dark:text-slate-100">{selectedEmployee.jobTitle}</span></div>
                  <div>Joining: <span className="font-mono text-slate-900 dark:text-slate-100">{selectedEmployee.joiningDate}</span></div>
                  <div>Role Access: <span className="font-mono text-slate-900 dark:text-slate-100">{selectedEmployee.role}</span></div>
                  <div>Location: <span className="font-medium text-slate-900 dark:text-slate-100">{selectedEmployee.location}</span></div>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 space-y-2">
                <div className="font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider text-[10px]">Compensation & Payroll</div>
                <div className="flex items-center justify-between">
                  <span>Base Annual Salary:</span>
                  <span className="font-mono font-bold text-sm text-emerald-600 dark:text-emerald-400">
                    ${selectedEmployee.salary.toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 space-y-2">
                <div className="font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider text-[10px]">Assigned Assets & Equipment</div>
                <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                  <Laptop className="w-4 h-4 text-indigo-500" />
                  <span>MacBook Pro 16" (Serial: #MBP-2024-88A)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ADD EMPLOYEE MODAL */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-2xl shadow-2xl p-6 border border-slate-200 dark:border-slate-800 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
              <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm">Add New Employee</h3>
              <button onClick={() => setIsAddModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddEmployee} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-slate-500">First Name</label>
                  <input
                    required
                    type="text"
                    value={newEmp.firstName}
                    onChange={(e) => setNewEmp({ ...newEmp, firstName: e.target.value })}
                    className="w-full p-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 mt-1"
                  />
                </div>
                <div>
                  <label className="text-slate-500">Last Name</label>
                  <input
                    required
                    type="text"
                    value={newEmp.lastName}
                    onChange={(e) => setNewEmp({ ...newEmp, lastName: e.target.value })}
                    className="w-full p-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 mt-1"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-500">Work Email</label>
                <input
                  required
                  type="email"
                  value={newEmp.email}
                  onChange={(e) => setNewEmp({ ...newEmp, email: e.target.value })}
                  className="w-full p-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 mt-1"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-slate-500">Department</label>
                  <select
                    value={newEmp.department}
                    onChange={(e) => setNewEmp({ ...newEmp, department: e.target.value })}
                    className="w-full p-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 mt-1"
                  >
                    <option value="Engineering">Engineering</option>
                    <option value="Product & Design">Product & Design</option>
                    <option value="Sales & Marketing">Sales & Marketing</option>
                    <option value="Human Resources">Human Resources</option>
                    <option value="Finance & Ops">Finance & Ops</option>
                  </select>
                </div>
                <div>
                  <label className="text-slate-500">Base Salary ($)</label>
                  <input
                    type="number"
                    value={newEmp.salary}
                    onChange={(e) => setNewEmp({ ...newEmp, salary: Number(e.target.value) })}
                    className="w-full p-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 mt-1"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs transition-colors mt-2"
              >
                Create Employee Record
              </button>
            </form>
          </div>
        </div>
      )}

      {/* CSV IMPORT MODAL */}
      {isImportModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-2xl shadow-2xl p-6 border border-slate-200 dark:border-slate-800 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
              <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm">Bulk Employee CSV Import</h3>
              <button onClick={() => setIsImportModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-2xl text-center space-y-2 bg-slate-50 dark:bg-slate-950">
              <Upload className="w-8 h-8 text-indigo-500 mx-auto" />
              <div className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                Drag and drop your employee CSV file here
              </div>
              <p className="text-[10px] text-slate-400">Supports column auto-mapping and rollback on error</p>
            </div>

            <button
              onClick={() => setIsImportModalOpen(false)}
              className="w-full py-2 rounded-xl bg-slate-800 text-white text-xs font-semibold"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
