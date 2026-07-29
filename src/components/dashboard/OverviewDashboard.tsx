import React from 'react';
import { Tenant, UserRole } from '../../types';
import {
  Users,
  Clock,
  Calendar,
  CreditCard,
  Briefcase,
  TrendingUp,
  UserPlus,
  ArrowUpRight,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  FileCheck2,
  Building2,
  Download,
  Globe2,
  Smile,
  PieChart as PieChartIcon
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar
} from 'recharts';

interface OverviewDashboardProps {
  currentTenant: Tenant;
  currentRole: UserRole;
  onNavigate: (viewId: string) => void;
}

const HEADCOUNT_TREND = [
  { month: 'Jan', headcount: 152, newHires: 12, contractors: 8 },
  { month: 'Feb', headcount: 158, newHires: 14, contractors: 10 },
  { month: 'Mar', headcount: 164, newHires: 15, contractors: 11 },
  { month: 'Apr', headcount: 171, newHires: 18, contractors: 12 },
  { month: 'May', headcount: 176, newHires: 16, contractors: 14 },
  { month: 'Jun', headcount: 180, newHires: 19, contractors: 15 },
  { month: 'Jul', headcount: 184, newHires: 22, contractors: 16 },
];

const DEPARTMENT_DISTRIBUTION = [
  { name: 'Engineering', count: 68, color: '#5d5fef' },
  { name: 'Product & Design', count: 32, color: '#8b5cf6' },
  { name: 'Sales & Marketing', count: 44, color: '#10b981' },
  { name: 'Customer Support', count: 24, color: '#f59e0b' },
  { name: 'HR & Ops', count: 16, color: '#ef4444' },
];

const DEPARTMENT_POPULARITY = [
  { name: 'Engineering & AI', popularity: 85, percentage: '45%', color: 'bg-[#5d5fef]' },
  { name: 'Product Design & UX', popularity: 65, percentage: '29%', color: 'bg-[#10b981]' },
  { name: 'Enterprise Sales', popularity: 45, percentage: '18%', color: 'bg-[#8b5cf6]' },
  { name: 'Global Talent Ops', popularity: 55, percentage: '25%', color: 'bg-[#f59e0b]' },
];

const REVENUE_WORKLOAD_DATA = [
  { day: 'Mon', active: 140, offline: 120 },
  { day: 'Tue', active: 172, offline: 115 },
  { day: 'Wed', active: 55, offline: 225 },
  { day: 'Thu', active: 155, offline: 65 },
  { day: 'Fri', active: 120, offline: 110 },
  { day: 'Sat', active: 160, offline: 135 },
  { day: 'Sun', active: 210, offline: 110 },
];

export const OverviewDashboard: React.FC<OverviewDashboardProps> = ({
  currentTenant,
  currentRole,
  onNavigate,
}) => {
  return (
    <div className="space-y-6">
      {/* SECTION 1: TOP STATS & VISITOR INSIGHTS GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: "Today's Workforce Summary" with 4 Pastel KPI Cards */}
        <div className="lg:col-span-2 bg-white dark:bg-[#111827] p-6 rounded-3xl border border-slate-100 dark:border-slate-800/80 shadow-sm flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-extrabold text-slate-900 dark:text-white tracking-tight">Today's Workforce Summary</h2>
              <p className="text-xs text-slate-400 mt-0.5">Real-time status for {currentTenant.name}</p>
            </div>
            <button
              onClick={() => onNavigate('analytics')}
              className="px-3.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 flex items-center gap-1.5 transition-colors"
            >
              <Download className="w-3.5 h-3.5" /> Export Report
            </button>
          </div>

          {/* 4 Pastel Metric Cards directly matching the Dabang reference image */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 pt-2">
            
            {/* Pastel Card 1: Pink */}
            <div className="p-4 rounded-2xl bg-[#ffe5ec] dark:bg-rose-950/40 border border-rose-200/50 dark:border-rose-900/30 flex flex-col justify-between space-y-3">
              <div className="w-9 h-9 rounded-xl bg-rose-500/15 flex items-center justify-center text-rose-600">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <div className="text-2xl font-black text-rose-950 dark:text-rose-100 font-mono">184</div>
                <div className="text-xs font-bold text-rose-900/80 dark:text-rose-300/80 mt-0.5">Total Headcount</div>
              </div>
              <div className="text-[10px] font-extrabold text-rose-700 dark:text-rose-300 bg-rose-200/50 dark:bg-rose-900/50 px-2 py-0.5 rounded-full w-fit">
                +8% from last year
              </div>
            </div>

            {/* Pastel Card 2: Peach / Yellow */}
            <div className="p-4 rounded-2xl bg-[#fff3d6] dark:bg-amber-950/40 border border-amber-200/50 dark:border-amber-900/30 flex flex-col justify-between space-y-3">
              <div className="w-9 h-9 rounded-xl bg-amber-500/15 flex items-center justify-center text-amber-600">
                <Briefcase className="w-5 h-5" />
              </div>
              <div>
                <div className="text-2xl font-black text-amber-950 dark:text-amber-100 font-mono">24</div>
                <div className="text-xs font-bold text-amber-900/80 dark:text-amber-300/80 mt-0.5">Open Requisitions</div>
              </div>
              <div className="text-[10px] font-extrabold text-amber-800 dark:text-amber-300 bg-amber-200/50 dark:bg-amber-900/50 px-2 py-0.5 rounded-full w-fit">
                +5% target reached
              </div>
            </div>

            {/* Pastel Card 3: Mint / Green */}
            <div className="p-4 rounded-2xl bg-[#e8f8f2] dark:bg-emerald-950/40 border border-emerald-200/50 dark:border-emerald-900/30 flex flex-col justify-between space-y-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/15 flex items-center justify-center text-emerald-600">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <div className="text-2xl font-black text-emerald-950 dark:text-emerald-100 font-mono">98.4%</div>
                <div className="text-xs font-bold text-emerald-900/80 dark:text-emerald-300/80 mt-0.5">Attendance Rate</div>
              </div>
              <div className="text-[10px] font-extrabold text-emerald-800 dark:text-emerald-300 bg-emerald-200/50 dark:bg-emerald-900/50 px-2 py-0.5 rounded-full w-fit">
                +1.2% from yesterday
              </div>
            </div>

            {/* Pastel Card 4: Lavender / Purple */}
            <div className="p-4 rounded-2xl bg-[#f0e8ff] dark:bg-purple-950/40 border border-purple-200/50 dark:border-purple-900/30 flex flex-col justify-between space-y-3">
              <div className="w-9 h-9 rounded-xl bg-purple-500/15 flex items-center justify-center text-purple-600">
                <CreditCard className="w-5 h-5" />
              </div>
              <div>
                <div className="text-2xl font-black text-purple-950 dark:text-purple-100 font-mono">$178.5k</div>
                <div className="text-xs font-bold text-purple-900/80 dark:text-purple-300/80 mt-0.5">Monthly Payroll</div>
              </div>
              <div className="text-[10px] font-extrabold text-purple-800 dark:text-purple-300 bg-purple-200/50 dark:bg-purple-900/50 px-2 py-0.5 rounded-full w-fit">
                0.5% processed
              </div>
            </div>

          </div>
        </div>

        {/* Right 1 Col: "Workforce Insights" Curved Chart */}
        <div className="bg-white dark:bg-[#111827] p-6 rounded-3xl border border-slate-100 dark:border-slate-800/80 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-extrabold text-slate-900 dark:text-white text-base">Workforce Insights</h3>
            <span className="text-[10px] font-mono text-slate-400">Monthly</span>
          </div>

          <div className="h-44 w-full my-auto">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={HEADCOUNT_TREND} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                <defs>
                  <linearGradient id="purpleLineGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" stroke="#94a3b8" fontSize={10} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={10} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1e293b',
                    borderColor: '#334155',
                    borderRadius: '0.75rem',
                    color: '#fff',
                    fontSize: '11px',
                  }}
                />
                <Area type="monotone" dataKey="headcount" stroke="#8b5cf6" strokeWidth={3} fill="url(#purpleLineGrad)" />
                <Area type="monotone" dataKey="newHires" stroke="#ef4444" strokeWidth={2} fill="none" />
                <Area type="monotone" dataKey="contractors" stroke="#10b981" strokeWidth={2} fill="none" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800 text-[11px] font-semibold">
            <span className="flex items-center gap-1.5 text-purple-600">
              <span className="w-2.5 h-2.5 rounded-full bg-purple-500" /> Full Time
            </span>
            <span className="flex items-center gap-1.5 text-rose-500">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500" /> New Hires
            </span>
            <span className="flex items-center gap-1.5 text-emerald-500">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> Contractors
            </span>
          </div>
        </div>
      </div>

      {/* SECTION 2: MIDDLE CHARTS (Total Workload vs Customer / Team Satisfaction & Target vs Reality) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Total Active Workload Bar Chart */}
        <div className="bg-white dark:bg-[#111827] p-6 rounded-3xl border border-slate-100 dark:border-slate-800/80 shadow-sm flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold text-slate-900 dark:text-white text-base">Active Workload</h3>
            <span className="text-[10px] font-mono text-slate-400">Weekly Activity</span>
          </div>

          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={REVENUE_WORKLOAD_DATA} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                <XAxis dataKey="day" stroke="#94a3b8" fontSize={10} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={10} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1e293b',
                    borderColor: '#334155',
                    borderRadius: '0.75rem',
                    color: '#fff',
                    fontSize: '11px',
                  }}
                />
                <Bar dataKey="active" fill="#00b4d8" radius={[4, 4, 0, 0]} />
                <Bar dataKey="offline" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="flex items-center justify-center gap-6 pt-2 border-t border-slate-100 dark:border-slate-800 text-xs font-semibold">
            <span className="flex items-center gap-1.5 text-[#00b4d8]">
              <span className="w-2.5 h-2.5 rounded-full bg-[#00b4d8]" /> On-Site Tasks
            </span>
            <span className="flex items-center gap-1.5 text-emerald-500">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> Remote Output
            </span>
          </div>
        </div>

        {/* Team Satisfaction Wave Chart */}
        <div className="bg-white dark:bg-[#111827] p-6 rounded-3xl border border-slate-100 dark:border-slate-800/80 shadow-sm flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold text-slate-900 dark:text-white text-base">Employee Satisfaction</h3>
            <span className="text-[10px] font-mono text-emerald-500 font-bold bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-full">
              4.8 / 5.0 Rating
            </span>
          </div>

          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={HEADCOUNT_TREND} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                <defs>
                  <linearGradient id="satisfactionGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" stroke="#94a3b8" fontSize={10} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={10} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1e293b',
                    borderColor: '#334155',
                    borderRadius: '0.75rem',
                    color: '#fff',
                    fontSize: '11px',
                  }}
                />
                <Area type="monotone" dataKey="headcount" stroke="#10b981" strokeWidth={3} fill="url(#satisfactionGrad)" />
                <Area type="monotone" dataKey="newHires" stroke="#0284c7" strokeWidth={2} fill="none" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800 text-xs font-semibold">
            <div>
              <span className="text-slate-400 text-[10px] uppercase">Last Month</span>
              <div className="font-mono text-slate-900 dark:text-white font-bold">$3,004 Score</div>
            </div>
            <div>
              <span className="text-slate-400 text-[10px] uppercase">This Month</span>
              <div className="font-mono text-emerald-600 font-bold">$4,504 Score</div>
            </div>
          </div>
        </div>

        {/* Target vs Reality Goal Card */}
        <div className="bg-white dark:bg-[#111827] p-6 rounded-3xl border border-slate-100 dark:border-slate-800/80 shadow-sm flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold text-slate-900 dark:text-white text-base">Hiring Target vs Reality</h3>
            <span className="text-[10px] font-mono text-purple-600 font-bold">Q3 Goals</span>
          </div>

          <div className="h-44 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={HEADCOUNT_TREND} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                <XAxis dataKey="month" stroke="#94a3b8" fontSize={10} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={10} tickLine={false} />
                <Bar dataKey="headcount" fill="#ffb703" radius={[4, 4, 0, 0]} />
                <Bar dataKey="newHires" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800 text-xs">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5 font-medium text-slate-600 dark:text-slate-300">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> Target Hires
              </span>
              <span className="font-mono font-bold text-emerald-600">8,823 Global</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5 font-medium text-slate-600 dark:text-slate-300">
                <span className="w-2.5 h-2.5 rounded-full bg-[#ffb703]" /> Actual Onboarded
              </span>
              <span className="font-mono font-bold text-amber-600">12,122 Commercial</span>
            </div>
          </div>
        </div>

      </div>

      {/* SECTION 3: TOP DEPARTMENTS, REGIONAL MAP & ACTIVITY LOG */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Top Department Popularity / Growth */}
        <div className="bg-white dark:bg-[#111827] p-6 rounded-3xl border border-slate-100 dark:border-slate-800/80 shadow-sm flex flex-col justify-between space-y-4">
          <div>
            <h3 className="font-extrabold text-slate-900 dark:text-white text-base">Top Department Output</h3>
            <p className="text-xs text-slate-400 mt-0.5">Key headcount volume & quarterly growth</p>
          </div>

          <div className="space-y-4 my-2">
            {DEPARTMENT_POPULARITY.map((dept, idx) => (
              <div key={dept.name} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span className="text-slate-700 dark:text-slate-200">0{idx + 1}. {dept.name}</span>
                  <span className="px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-mono text-[10px] font-bold">
                    {dept.percentage}
                  </span>
                </div>
                <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div
                    className={`${dept.color} h-full rounded-full transition-all duration-500`}
                    style={{ width: `${dept.popularity}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={() => onNavigate('employees')}
            className="w-full py-2 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 font-semibold text-xs transition-colors"
          >
            Explore Department Roster →
          </button>
        </div>

        {/* Regional Offices Mapping Widget */}
        <div className="bg-white dark:bg-[#111827] p-6 rounded-3xl border border-slate-100 dark:border-slate-800/80 shadow-sm flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-extrabold text-slate-900 dark:text-white text-base">Regional Hub Distribution</h3>
              <p className="text-xs text-slate-400 mt-0.5">Global office locations & remote staff</p>
            </div>
            <Globe2 className="w-5 h-5 text-[#5d5fef]" />
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-800 dark:text-slate-200">🇺🇸 San Francisco (HQ)</span>
              <span className="font-mono text-purple-600 font-bold">92 Staff</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-800 dark:text-slate-200">🇬🇧 London Office</span>
              <span className="font-mono text-indigo-600 font-bold">44 Staff</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-800 dark:text-slate-200">🇸🇬 Singapore Hub</span>
              <span className="font-mono text-emerald-600 font-bold">28 Staff</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-800 dark:text-slate-200">🌐 Global Remote</span>
              <span className="font-mono text-amber-600 font-bold">20 Staff</span>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-800 font-mono">
            <span>Total Volume: 1,135</span>
            <span>Services: 635</span>
          </div>
        </div>

        {/* AI Assistant Quick Prompt Widget */}
        <div className="bg-gradient-to-br from-slate-900 to-[#111827] text-white p-6 rounded-3xl border border-slate-800 shadow-xl flex flex-col justify-between space-y-4 relative overflow-hidden">
          <div className="absolute -right-6 -top-6 w-32 h-32 bg-[#5d5fef]/20 rounded-full blur-2xl pointer-events-none" />

          <div>
            <div className="flex items-center gap-2 mb-2 text-xs font-bold text-[#5d5fef] uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-[#5d5fef]" />
              <span>AI Policy Assistant</span>
            </div>
            <h4 className="text-base font-bold text-white leading-snug">
              "What is our carry-forward policy for unused leave?"
            </h4>
            <p className="text-xs text-slate-400 mt-2">
              Query our AI RAG Engine for instant answers on employee benefits, tax guidelines, or company handbooks.
            </p>
          </div>

          <button
            onClick={() => onNavigate('ai-assistant')}
            className="w-full py-2.5 px-4 rounded-2xl bg-[#5d5fef] hover:bg-[#4b4dcd] text-white font-bold text-xs shadow-lg shadow-[#5d5fef]/30 flex items-center justify-between transition-all"
          >
            <span>Ask AI Assistant</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
