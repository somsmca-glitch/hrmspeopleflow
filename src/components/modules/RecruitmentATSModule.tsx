import React, { useState, useEffect } from 'react';
import { Tenant, UserRole } from '../../types';
import {
  Briefcase,
  Users,
  Search,
  Plus,
  Sparkles,
  ChevronRight,
  Filter,
  CheckCircle2,
  XCircle,
  FileText,
  Mail,
  Phone,
  Award,
  BarChart3,
  X,
  UserCheck,
  TrendingUp,
  HeartHandshake,
  Check,
  Calendar,
  Layers,
  Smile,
  Target,
  Clock,
  Laptop,
  UserPlus,
  Zap,
  ChevronUp
} from 'lucide-react';
import { generateSeedJobRequisitions, SeedJobRequisition } from '../../db/seed';

interface RecruitmentATSModuleProps {
  currentTenant: Tenant;
  currentRole: UserRole;
  onNavigate: (viewId: string) => void;
  initialTab?: string;
}

export const RecruitmentATSModule: React.FC<RecruitmentATSModuleProps> = ({
  currentTenant,
  currentRole,
  onNavigate,
  initialTab = 'recruitment'
}) => {
  const [activeTab, setActiveTab] = useState<'recruitment' | 'onboarding' | 'performance' | 'engagement'>(
    (initialTab as any) || 'recruitment'
  );

  useEffect(() => {
    if (initialTab && ['recruitment', 'onboarding', 'performance', 'engagement'].includes(initialTab)) {
      setActiveTab(initialTab as any);
    }
  }, [initialTab]);

  // --- 1. RECRUITMENT STATE ---
  const [requisitions, setRequisitions] = useState<SeedJobRequisition[]>(
    generateSeedJobRequisitions().filter((r) => r.tenantId === currentTenant.id)
  );

  const [candidates, setCandidates] = useState([
    { id: 'c-1', name: 'Sophia Chen', title: 'Senior AI Engineer', stage: 'INTERVIEW', score: 94, email: 'sophia.c@gmail.com', reqId: 'req-1' },
    { id: 'c-2', name: 'Marcus Vance', title: 'Product Marketing Manager', stage: 'OFFER', score: 88, email: 'marcus.v@outlook.com', reqId: 'req-2' },
    { id: 'c-3', name: 'Liam O\'Connor', title: 'Senior AI Engineer', stage: 'SCREENING', score: 81, email: 'liam.oc@dev.io', reqId: 'req-1' },
    { id: 'c-4', name: 'Emily Zhang', title: 'Senior AI Engineer', stage: 'HIRED', score: 97, email: 'emily.z@tech.com', reqId: 'req-1' },
  ]);

  const [selectedCandidate, setSelectedCandidate] = useState<any | null>(null);
  const [isAddReqModalOpen, setIsAddReqModalOpen] = useState(false);
  const [isAddCandidateModalOpen, setIsAddCandidateModalOpen] = useState(false);
  const [isQuickMenuOpen, setIsQuickMenuOpen] = useState(false);

  const [newReq, setNewReq] = useState({
    title: '',
    department: 'Engineering',
    location: 'Remote',
    salaryRange: '$120k - $150k',
  });

  const [newCandidate, setNewCandidate] = useState({
    name: '',
    title: 'Senior AI Engineer',
    email: '',
    stage: 'APPLIED',
    score: 88,
    reqId: '',
  });

  const stages = ['APPLIED', 'SCREENING', 'INTERVIEW', 'OFFER', 'HIRED'];

  const handleAddReq = (e: React.FormEvent) => {
    e.preventDefault();
    const created: SeedJobRequisition = {
      id: `req-${Date.now()}`,
      tenantId: currentTenant.id,
      title: newReq.title,
      department: newReq.department,
      location: newReq.location,
      applicantsCount: 0,
      status: 'OPEN',
      salaryRange: newReq.salaryRange,
    };
    setRequisitions([created, ...requisitions]);
    setIsAddReqModalOpen(false);
    setNewReq({ title: '', department: 'Engineering', location: 'Remote', salaryRange: '$120k - $150k' });
  };

  const handleAddCandidate = (e: React.FormEvent) => {
    e.preventDefault();
    const created = {
      id: `c-${Date.now()}`,
      name: newCandidate.name,
      title: newCandidate.title || 'Candidate',
      email: newCandidate.email || `${newCandidate.name.toLowerCase().replace(/\s+/g, '.')}@example.com`,
      stage: newCandidate.stage,
      score: Number(newCandidate.score) || 85,
      reqId: newCandidate.reqId || (requisitions[0]?.id || 'req-1'),
    };
    setCandidates([created, ...candidates]);
    setIsAddCandidateModalOpen(false);
    setNewCandidate({
      name: '',
      title: 'Senior AI Engineer',
      email: '',
      stage: 'APPLIED',
      score: 88,
      reqId: '',
    });
  };

  // --- 2. ONBOARDING STATE ---
  const [onboardingTasks, setOnboardingTasks] = useState([
    { id: 'ob-1', employee: 'Sarah Jenkins', role: 'Frontend Lead', dept: 'Engineering', mentor: 'David Chen', progress: 75, startDate: '2026-08-01', tasks: [
      { id: 't1', title: 'Issue M3 Max Laptop & Hardware', done: true },
      { id: 't2', title: 'Setup Google Workspace & Slack', done: true },
      { id: 't3', title: 'Sign NDA & Tax W-4 Documents', done: true },
      { id: 't4', title: 'First 1-on-1 with Engineering VP', done: false }
    ]},
    { id: 'ob-2', employee: 'Michael Chang', role: 'DevOps Specialist', dept: 'Infrastructure', mentor: 'Alex Morgan', progress: 40, startDate: '2026-08-05', tasks: [
      { id: 't1', title: 'Issue M3 Max Laptop & Hardware', done: true },
      { id: 't2', title: 'Setup Google Workspace & Slack', done: true },
      { id: 't3', title: 'Sign NDA & Tax W-4 Documents', done: false },
      { id: 't4', title: 'AWS Cloud Sandbox Access Provisioning', done: false }
    ]}
  ]);

  const toggleTask = (onboardingId: string, taskId: string) => {
    setOnboardingTasks(onboardingTasks.map((ob) => {
      if (ob.id !== onboardingId) return ob;
      const updatedTasks = ob.tasks.map(t => t.id === taskId ? { ...t, done: !t.done } : t);
      const completedCount = updatedTasks.filter(t => t.done).length;
      const newProgress = Math.round((completedCount / updatedTasks.length) * 100);
      return { ...ob, tasks: updatedTasks, progress: newProgress };
    }));
  };

  // --- 3. PERFORMANCE & OKRs STATE ---
  const [okrs] = useState([
    { id: 'okr-1', title: 'Scale Platform Availability to 99.99% Uptime', owner: 'Engineering Team', progress: 85, targetDate: 'Q3 2026', keyResults: [
      { id: 'kr1', text: 'Migrate multi-tenant schemas to RLS PostgreSQL', value: '100% Complete' },
      { id: 'kr2', text: 'Automate region failover and latency health checks', value: '70% Complete' }
    ]},
    { id: 'okr-2', title: 'Accelerate Enterprise Hiring & Onboarding Speed', owner: 'Talent Acquisition', progress: 62, targetDate: 'Q3 2026', keyResults: [
      { id: 'kr1', text: 'Reduce Time-to-Hire from 34 days to 21 days', value: '24 Days Current' },
      { id: 'kr2', text: 'Achieve 95% 90-Day New Hire Retention Rate', value: '96% Current' }
    ]}
  ]);

  // --- 4. ENGAGEMENT & PULSE STATE ---
  const pulseSurveys = [
    { id: 'ps-1', topic: 'Remote Work Flexibility & Equipment Stipend', score: 4.8, maxScore: 5, responses: 142, sentiment: 'EXCELLENT' },
    { id: 'ps-2', topic: 'Cross-Departmental Communication & Leadership Clarity', score: 4.2, maxScore: 5, responses: 138, sentiment: 'GOOD' },
    { id: 'ps-3', topic: 'Career Progression Paths & Learning Stipends', score: 3.9, maxScore: 5, responses: 129, sentiment: 'NEEDS FOCUS' }
  ];

  const employeeFeedbacks = [
    { id: 'f-1', department: 'Engineering', comment: 'The new multi-tenant database migration made query response times noticeably faster. Loving the workspace tools!', sentiment: 'POSITIVE', date: '2 hours ago' },
    { id: 'f-2', department: 'Product Design', comment: 'Would love to see more structured peer feedback sessions during bi-weekly OKR check-ins.', sentiment: 'NEUTRAL', date: 'Yesterday' },
    { id: 'f-3', department: 'Sales & Marketing', comment: 'Onboarding docs were crystal clear, but getting software license keys took 2 days.', sentiment: 'CONCERN', date: '3 days ago' },
  ];

  return (
    <div className="space-y-6">
      {/* Module Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-purple-600 dark:text-purple-400 mb-1">
            <span className="px-2 py-0.5 rounded bg-purple-500/10 font-mono text-[10px]">TALENT SUITE</span>
            <span>Recruitment • Onboarding • OKRs • Pulse Surveys</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
            Talent Acquisition, Onboarding & Performance
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            End-to-end talent lifecycle management for {currentTenant.name}: from ATS job requisitions to 360 OKR reviews and engagement feedback.
          </p>
        </div>

        {activeTab === 'recruitment' && (
          <button
            onClick={() => setIsAddReqModalOpen(true)}
            className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold flex items-center gap-1.5 shadow-lg shadow-purple-600/30 transition-colors"
          >
            <Plus className="w-4 h-4" /> Open Job Requisition
          </button>
        )}
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 dark:border-slate-800 overflow-x-auto gap-2">
        <button
          onClick={() => { setActiveTab('recruitment'); onNavigate('recruitment'); }}
          className={`px-4 py-2.5 text-xs font-semibold border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'recruitment'
              ? 'border-purple-600 text-purple-600 dark:text-purple-400'
              : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          <Briefcase className="w-4 h-4" /> Recruitment & ATS ({requisitions.length} Jobs)
        </button>

        <button
          onClick={() => { setActiveTab('onboarding'); onNavigate('onboarding'); }}
          className={`px-4 py-2.5 text-xs font-semibold border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'onboarding'
              ? 'border-purple-600 text-purple-600 dark:text-purple-400'
              : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          <UserCheck className="w-4 h-4" /> On/Offboarding ({onboardingTasks.length} Active)
        </button>

        <button
          onClick={() => { setActiveTab('performance'); onNavigate('performance'); }}
          className={`px-4 py-2.5 text-xs font-semibold border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'performance'
              ? 'border-purple-600 text-purple-600 dark:text-purple-400'
              : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          <TrendingUp className="w-4 h-4" /> Performance & OKRs
        </button>

        <button
          onClick={() => { setActiveTab('engagement'); onNavigate('engagement'); }}
          className={`px-4 py-2.5 text-xs font-semibold border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'engagement'
              ? 'border-purple-600 text-purple-600 dark:text-purple-400'
              : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          <HeartHandshake className="w-4 h-4" /> Engagement & eNPS
        </button>
      </div>

      {/* TAB 1: RECRUITMENT & ATS */}
      {activeTab === 'recruitment' && (
        <div className="space-y-6">
          {/* Open Requisitions Summary */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {requisitions.map((req) => (
              <div
                key={req.id}
                className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 dark:text-slate-100 text-sm">{req.title}</span>
                  <span className="px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 font-mono text-[10px] font-bold">
                    {req.status}
                  </span>
                </div>
                <div className="text-xs text-slate-500 font-mono">
                  {req.department} • {req.location}
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800 text-xs">
                  <span className="font-bold text-indigo-600 dark:text-indigo-400">{req.applicantsCount} Applicants</span>
                  <span className="font-mono text-slate-400">{req.salaryRange}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Kanban ATS Stage Board */}
          <div className="space-y-3">
            <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-purple-600" /> Candidate Hiring Funnel
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
              {stages.map((stage) => {
                const stageCandidates = candidates.filter((c) => c.stage === stage);
                return (
                  <div
                    key={stage}
                    className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-3 min-h-[300px]"
                  >
                    <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-2">
                      <span className="font-mono text-[11px] font-bold text-slate-700 dark:text-slate-300">{stage}</span>
                      <span className="w-5 h-5 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-[10px] font-bold text-slate-600 dark:text-slate-400">
                        {stageCandidates.length}
                      </span>
                    </div>

                    <div className="space-y-2">
                      {stageCandidates.map((cand) => (
                        <div
                          key={cand.id}
                          onClick={() => setSelectedCandidate(cand)}
                          className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:border-purple-400 cursor-pointer transition-all space-y-2"
                        >
                          <div className="font-bold text-xs text-slate-900 dark:text-slate-100">{cand.name}</div>
                          <div className="text-[10px] text-slate-500">{cand.title}</div>

                          <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800">
                            <span className="flex items-center gap-1 text-[10px] font-mono font-bold text-indigo-600 dark:text-indigo-400">
                              <Sparkles className="w-3 h-3" /> AI Match {cand.score}%
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: ONBOARDING & OFFBOARDING */}
      {activeTab === 'onboarding' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {onboardingTasks.map((ob) => (
              <div
                key={ob.id}
                className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-xs font-mono text-purple-600 font-bold uppercase">{ob.dept}</span>
                    <h3 className="font-bold text-slate-900 dark:text-slate-100 text-base">{ob.employee}</h3>
                    <p className="text-xs text-slate-500">{ob.role} • Mentor: <span className="text-slate-700 dark:text-slate-300 font-medium">{ob.mentor}</span></p>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-600 font-mono text-xs font-bold">
                    {ob.progress}% Completed
                  </span>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-emerald-500 h-full transition-all duration-300"
                    style={{ width: `${ob.progress}%` }}
                  />
                </div>

                {/* Task Checklist */}
                <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800 text-xs">
                  <div className="font-semibold text-slate-700 dark:text-slate-300 mb-1">Onboarding Checklist Tasks:</div>
                  {ob.tasks.map((task) => (
                    <div
                      key={task.id}
                      onClick={() => toggleTask(ob.id, task.id)}
                      className={`p-2.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                        task.done
                          ? 'bg-slate-50 dark:bg-slate-950/60 border-slate-200 dark:border-slate-800 text-slate-400 line-through'
                          : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 font-medium hover:border-purple-300'
                      }`}
                    >
                      <span>{task.title}</span>
                      <div className={`w-5 h-5 rounded-md flex items-center justify-center border ${
                        task.done ? 'bg-emerald-600 border-emerald-600 text-white' : 'border-slate-300 dark:border-slate-700'
                      }`}>
                        {task.done && <Check className="w-3.5 h-3.5" />}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: PERFORMANCE & OKRs */}
      {activeTab === 'performance' && (
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-slate-900 dark:text-slate-100 text-base">Company Objectives & Key Results (Q3 2026)</h3>
                <p className="text-xs text-slate-500 mt-0.5">Track team goals, progress metrics, and 360 performance reviews.</p>
              </div>
              <span className="px-3 py-1 rounded-xl bg-purple-500/10 text-purple-600 font-mono text-xs font-bold">
                Q3 Active Cycle
              </span>
            </div>

            <div className="space-y-4">
              {okrs.map((okr) => (
                <div
                  key={okr.id}
                  className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-bold text-slate-900 dark:text-slate-100 text-sm">{okr.title}</div>
                      <div className="text-xs text-slate-500 mt-0.5">Owner: <span className="font-semibold text-indigo-600">{okr.owner}</span> • Target: {okr.targetDate}</div>
                    </div>
                    <span className="font-mono font-bold text-purple-600 text-base">{okr.progress}%</span>
                  </div>

                  <div className="w-full bg-slate-200 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div className="bg-purple-600 h-full" style={{ width: `${okr.progress}%` }} />
                  </div>

                  <div className="space-y-1.5 pt-2 border-t border-slate-200 dark:border-slate-800 text-xs font-mono">
                    {okr.keyResults.map((kr) => (
                      <div key={kr.id} className="flex items-center justify-between text-slate-600 dark:text-slate-400">
                        <span>• {kr.text}</span>
                        <span className="font-bold text-emerald-600">{kr.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: ENGAGEMENT & PULSE */}
      {activeTab === 'engagement' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* eNPS Headline Card */}
            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono text-purple-600 font-bold">
                  <Smile className="w-4 h-4" /> EMPLOYEE NET PROMOTER SCORE
                </div>
                <div className="text-4xl font-bold text-slate-900 dark:text-slate-100 font-mono mt-2">+52</div>
                <div className="text-xs text-emerald-600 font-semibold mt-1">↑ Excellent Engagement Category</div>
              </div>
              <p className="text-xs text-slate-500">Based on 142 anonymous employee responses across all regional offices.</p>
            </div>

            {/* Pulse Survey Breakdown */}
            <div className="lg:col-span-2 p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
              <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm">Monthly Pulse Survey Results</h3>
              <div className="space-y-3">
                {pulseSurveys.map((ps) => (
                  <div key={ps.id} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 text-xs space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-slate-900 dark:text-slate-100">{ps.topic}</span>
                      <span className="font-mono font-bold text-indigo-600">{ps.score} / {ps.maxScore}</span>
                    </div>
                    <div className="w-full bg-slate-200 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-indigo-600 h-full" style={{ width: `${(ps.score / ps.maxScore) * 100}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Anonymous Feedback Feed */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
            <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm">Anonymous Feedback & AI Sentiment Stream</h3>
            <div className="space-y-2">
              {employeeFeedbacks.map((fb) => (
                <div key={fb.id} className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 text-xs space-y-1">
                  <div className="flex items-center justify-between text-slate-400 font-mono text-[10px]">
                    <span>Dept: {fb.department} • {fb.date}</span>
                    <span className={`px-2 py-0.5 rounded font-bold ${
                      fb.sentiment === 'POSITIVE' ? 'bg-emerald-500/10 text-emerald-600' :
                      fb.sentiment === 'NEUTRAL' ? 'bg-indigo-500/10 text-indigo-600' : 'bg-rose-500/10 text-rose-600'
                    }`}>
                      {fb.sentiment}
                    </span>
                  </div>
                  <p className="text-slate-800 dark:text-slate-200 italic">"{fb.comment}"</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* CANDIDATE DETAIL MODAL */}
      {selectedCandidate && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-2xl shadow-2xl p-6 border border-slate-200 dark:border-slate-800 space-y-4 text-xs">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
              <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm">Candidate 360 Review</h3>
              <button onClick={() => setSelectedCandidate(null)} className="text-slate-400 hover:text-slate-600">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2">
              <div className="font-bold text-base text-slate-900 dark:text-slate-100">{selectedCandidate.name}</div>
              <div className="text-indigo-600 font-mono">{selectedCandidate.email}</div>

              <div className="p-3 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900 flex items-center justify-between">
                <span className="font-bold text-indigo-900 dark:text-indigo-200 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4" /> AI Resume Match Score:
                </span>
                <span className="font-mono font-bold text-base text-indigo-600 dark:text-indigo-400">{selectedCandidate.score}%</span>
              </div>
            </div>

            <button
              onClick={() => setSelectedCandidate(null)}
              className="w-full py-2 rounded-xl bg-slate-900 text-white font-semibold"
            >
              Close Profile
            </button>
          </div>
        </div>
      )}

      {/* OPEN REQUISITION MODAL */}
      {isAddReqModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-2xl shadow-2xl p-6 border border-slate-200 dark:border-slate-800 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
              <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm">Create Job Requisition</h3>
              <button onClick={() => setIsAddReqModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddReq} className="space-y-3 text-xs">
              <div>
                <label className="text-slate-500">Job Title</label>
                <input
                  required
                  type="text"
                  placeholder="e.g. Senior Frontend Engineer"
                  value={newReq.title}
                  onChange={(e) => setNewReq({ ...newReq, title: e.target.value })}
                  className="w-full p-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 mt-1"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-slate-500">Department</label>
                  <select
                    value={newReq.department}
                    onChange={(e) => setNewReq({ ...newReq, department: e.target.value })}
                    className="w-full p-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 mt-1"
                  >
                    <option value="Engineering">Engineering</option>
                    <option value="Product & Design">Product & Design</option>
                    <option value="Sales & Marketing">Sales & Marketing</option>
                  </select>
                </div>
                <div>
                  <label className="text-slate-500">Salary Range</label>
                  <input
                    type="text"
                    value={newReq.salaryRange}
                    onChange={(e) => setNewReq({ ...newReq, salaryRange: e.target.value })}
                    className="w-full p-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 mt-1"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs transition-colors mt-2"
              >
                Publish Job Requisition
              </button>
            </form>
          </div>
        </div>
      )}

      {/* MANUAL CANDIDATE ADD MODAL */}
      {isAddCandidateModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-2xl shadow-2xl p-6 border border-slate-200 dark:border-slate-800 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
              <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm flex items-center gap-2">
                <UserPlus className="w-4 h-4 text-purple-600" /> Add Candidate Manually
              </h3>
              <button onClick={() => setIsAddCandidateModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddCandidate} className="space-y-3 text-xs">
              <div>
                <label className="text-slate-500">Candidate Full Name</label>
                <input
                  required
                  type="text"
                  placeholder="e.g. Alex Rivera"
                  value={newCandidate.name}
                  onChange={(e) => setNewCandidate({ ...newCandidate, name: e.target.value })}
                  className="w-full p-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 mt-1 text-slate-900 dark:text-slate-100"
                />
              </div>

              <div>
                <label className="text-slate-500">Target Role / Job Title</label>
                <input
                  required
                  type="text"
                  placeholder="e.g. Senior AI Engineer"
                  value={newCandidate.title}
                  onChange={(e) => setNewCandidate({ ...newCandidate, title: e.target.value })}
                  className="w-full p-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 mt-1 text-slate-900 dark:text-slate-100"
                />
              </div>

              <div>
                <label className="text-slate-500">Email Address</label>
                <input
                  type="email"
                  placeholder="e.g. alex.rivera@example.com"
                  value={newCandidate.email}
                  onChange={(e) => setNewCandidate({ ...newCandidate, email: e.target.value })}
                  className="w-full p-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 mt-1 text-slate-900 dark:text-slate-100"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-slate-500">Hiring Stage</label>
                  <select
                    value={newCandidate.stage}
                    onChange={(e) => setNewCandidate({ ...newCandidate, stage: e.target.value })}
                    className="w-full p-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 mt-1 text-slate-900 dark:text-slate-100"
                  >
                    {stages.map((st) => (
                      <option key={st} value={st}>{st}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-slate-500">AI Match Score (%)</label>
                  <input
                    type="number"
                    min="1"
                    max="100"
                    value={newCandidate.score}
                    onChange={(e) => setNewCandidate({ ...newCandidate, score: Number(e.target.value) })}
                    className="w-full p-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 mt-1 text-slate-900 dark:text-slate-100"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs transition-colors mt-2"
              >
                Add Candidate
              </button>
            </form>
          </div>
        </div>
      )}

      {/* FLOATING QUICK ACTION MENU */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
        {isQuickMenuOpen && (
          <div className="mb-3 p-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl flex flex-col gap-1 w-56 animate-in fade-in slide-in-from-bottom-2 duration-200">
            <div className="px-3 py-1.5 text-[10px] font-mono font-bold text-slate-400 border-b border-slate-100 dark:border-slate-800 uppercase tracking-wider">
              Talent Quick Actions
            </div>
            <button
              onClick={() => {
                setIsAddReqModalOpen(true);
                setIsQuickMenuOpen(false);
              }}
              className="flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-purple-50 dark:hover:bg-purple-950/40 hover:text-purple-600 dark:hover:text-purple-400 rounded-xl transition-colors text-left"
            >
              <Briefcase className="w-4 h-4 text-purple-600" />
              <span>Create Job Requisition</span>
            </button>
            <button
              onClick={() => {
                setIsAddCandidateModalOpen(true);
                setIsQuickMenuOpen(false);
              }}
              className="flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-purple-50 dark:hover:bg-purple-950/40 hover:text-purple-600 dark:hover:text-purple-400 rounded-xl transition-colors text-left"
            >
              <UserPlus className="w-4 h-4 text-purple-600" />
              <span>Add Candidate Manually</span>
            </button>
          </div>
        )}

        <button
          onClick={() => setIsQuickMenuOpen(!isQuickMenuOpen)}
          className={`px-4 py-3 rounded-full font-bold text-xs text-white shadow-xl flex items-center gap-2 transition-all duration-200 ${
            isQuickMenuOpen
              ? 'bg-slate-900 dark:bg-slate-100 dark:text-slate-900 ring-4 ring-purple-500/20'
              : 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 shadow-purple-600/30'
          }`}
        >
          <Zap className="w-4 h-4 fill-white text-white dark:fill-current" />
          <span>Quick Action</span>
          <ChevronUp className={`w-4 h-4 transition-transform duration-200 ${isQuickMenuOpen ? 'rotate-180' : ''}`} />
        </button>
      </div>
    </div>
  );
};
