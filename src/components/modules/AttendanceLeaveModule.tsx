import React, { useState } from 'react';
import { Tenant, UserRole } from '../../types';
import {
  Clock,
  Calendar,
  CheckCircle2,
  XCircle,
  AlertCircle,
  UserCheck,
  UserX,
  MapPin,
  Camera,
  Filter,
  Plus,
  ChevronRight,
  TrendingUp,
  FileSpreadsheet,
  Check,
  X
} from 'lucide-react';
import { generateSeedEmployees, generateSeedAttendance } from '../../db/seed';

interface AttendanceLeaveModuleProps {
  currentTenant: Tenant;
  currentRole: UserRole;
  onNavigate: (viewId: string) => void;
}

export const AttendanceLeaveModule: React.FC<AttendanceLeaveModuleProps> = ({
  currentTenant,
  currentRole,
}) => {
  const [activeTab, setActiveTab] = useState<'clockin' | 'roster' | 'leave_requests' | 'policies'>('clockin');
  const [clockedIn, setClockedIn] = useState(false);
  const [clockTime, setClockTime] = useState<string | null>(null);
  const [leaveRequests, setLeaveRequests] = useState([
    { id: 'lr-1', employeeName: 'Jordan Smith', dept: 'Engineering', type: 'Annual Leave', dates: 'Oct 14 - Oct 18', days: 5, reason: 'Family vacation', status: 'PENDING' },
    { id: 'lr-2', employeeName: 'Maya Lin', dept: 'Product & Design', type: 'Sick Leave', dates: 'Oct 12 - Oct 13', days: 2, reason: 'Flu recovery', status: 'APPROVED' },
    { id: 'lr-3', employeeName: 'Chris Taylor', dept: 'Sales & Marketing', type: 'Maternity/Paternity', dates: 'Nov 01 - Nov 28', days: 20, reason: 'Parental leave', status: 'PENDING' },
  ]);

  const handleClockIn = () => {
    setClockedIn(true);
    setClockTime(new Date().toLocaleTimeString());
  };

  const handleClockOut = () => {
    setClockedIn(false);
    setClockTime(null);
  };

  const handleApproveLeave = (id: string) => {
    setLeaveRequests(leaveRequests.map(r => r.id === id ? { ...r, status: 'APPROVED' } : r));
  };

  const handleRejectLeave = (id: string) => {
    setLeaveRequests(leaveRequests.map(r => r.id === id ? { ...r, status: 'REJECTED' } : r));
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400 mb-1">
            <span className="px-2 py-0.5 rounded bg-emerald-500/10 font-mono text-[10px]">MODULE 3 & 4 / PHASE 4</span>
            <span>Attendance Tracking • Geofencing • Leave Approvals</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
            Workforce Attendance & Leave Management
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Clock in/out with geo-tagging, track real-time team presence, and process multi-level leave approvals.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {!clockedIn ? (
            <button
              onClick={handleClockIn}
              className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center gap-2 shadow-lg shadow-emerald-600/30 transition-colors"
            >
              <Clock className="w-4 h-4" /> Clock In Now
            </button>
          ) : (
            <button
              onClick={handleClockOut}
              className="px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold flex items-center gap-2 shadow-lg shadow-rose-600/30 transition-colors"
            >
              <Clock className="w-4 h-4" /> Clock Out ({clockTime})
            </button>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 dark:border-slate-800 overflow-x-auto gap-2">
        <button
          onClick={() => setActiveTab('clockin')}
          className={`px-4 py-2.5 text-xs font-semibold border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'clockin'
              ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400'
              : 'border-transparent text-slate-500'
          }`}
        >
          <Clock className="w-4 h-4" /> My Clock-In & Time Card
        </button>

        <button
          onClick={() => setActiveTab('roster')}
          className={`px-4 py-2.5 text-xs font-semibold border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'roster'
              ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400'
              : 'border-transparent text-slate-500'
          }`}
        >
          <UserCheck className="w-4 h-4" /> Today's Team Roster (177 In)
        </button>

        <button
          onClick={() => setActiveTab('leave_requests')}
          className={`px-4 py-2.5 text-xs font-semibold border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'leave_requests'
              ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400'
              : 'border-transparent text-slate-500'
          }`}
        >
          <Calendar className="w-4 h-4" /> Leave Approvals Ledger ({leaveRequests.filter(r=>r.status==='PENDING').length} Pending)
        </button>
      </div>

      {/* TAB 1: MY CLOCK IN & GEOFENCE */}
      {activeTab === 'clockin' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col items-center text-center space-y-4">
            <div className="p-4 rounded-2xl bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600">
              <Clock className="w-10 h-10" />
            </div>

            <div>
              <h3 className="font-bold text-slate-900 dark:text-slate-100 text-base">
                {clockedIn ? 'Currently Clocked In' : 'Clock In for Today'}
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                {clockedIn ? `Checked in at ${clockTime} • Geofence Verified` : 'New York HQ Office Geo-Zone'}
              </p>
            </div>

            <div className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-950 text-left text-xs space-y-1 font-mono text-slate-600 dark:text-slate-400 border border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-bold">
                <MapPin className="w-3.5 h-3.5" /> GPS Coordinates: 40.7128° N, 74.0060° W
              </div>
              <div>Device ID: #DEV-MACBOOK-PRO-16</div>
            </div>

            {!clockedIn ? (
              <button
                onClick={handleClockIn}
                className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg shadow-emerald-600/30 transition-colors"
              >
                CLOCK IN
              </button>
            ) : (
              <button
                onClick={handleClockOut}
                className="w-full py-3 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs shadow-lg shadow-rose-600/30 transition-colors"
              >
                CLOCK OUT
              </button>
            )}
          </div>

          <div className="lg:col-span-2 p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm">Recent Attendance Logs</h3>
            <div className="space-y-2 text-xs font-mono">
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 flex items-center justify-between border border-slate-100 dark:border-slate-800">
                <div>
                  <div className="font-bold text-slate-900 dark:text-slate-100">July 28, 2026 (Today)</div>
                  <div className="text-slate-500">Clock In: 09:01 AM • Clock Out: Pending</div>
                </div>
                <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 font-semibold">
                  PRESENT
                </span>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 flex items-center justify-between border border-slate-100 dark:border-slate-800">
                <div>
                  <div className="font-bold text-slate-900 dark:text-slate-100">July 27, 2026</div>
                  <div className="text-slate-500">Clock In: 08:58 AM • Clock Out: 05:45 PM (8h 47m)</div>
                </div>
                <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 font-semibold">
                  PRESENT
                </span>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 flex items-center justify-between border border-slate-100 dark:border-slate-800">
                <div>
                  <div className="font-bold text-slate-900 dark:text-slate-100">July 26, 2026</div>
                  <div className="text-slate-500">Remote Check-In (Home Office)</div>
                </div>
                <span className="px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-600 font-semibold">
                  REMOTE
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: LEAVE APPROVALS */}
      {activeTab === 'leave_requests' && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 space-y-4 shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm">
              Pending & Processed Leave Applications
            </h3>
            <span className="text-xs font-mono text-slate-500">Multi-Level Workflow</span>
          </div>

          <div className="space-y-3 text-xs">
            {leaveRequests.map((req) => (
              <div
                key={req.id}
                className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 flex flex-col md:flex-row md:items-center justify-between gap-3"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900 dark:text-slate-100 text-sm">{req.employeeName}</span>
                    <span className="px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-800 font-mono text-[10px]">
                      {req.dept}
                    </span>
                  </div>
                  <div className="text-slate-500 mt-1">
                    <span className="font-semibold text-indigo-600 dark:text-indigo-400">{req.type}</span> • {req.dates} ({req.days} Days)
                  </div>
                  <div className="text-slate-400 text-[11px] mt-0.5 italic">"{req.reason}"</div>
                </div>

                <div className="flex items-center gap-2">
                  {req.status === 'PENDING' ? (
                    <>
                      <button
                        onClick={() => handleApproveLeave(req.id)}
                        className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs flex items-center gap-1 transition-colors"
                      >
                        <Check className="w-3.5 h-3.5" /> Approve
                      </button>
                      <button
                        onClick={() => handleRejectLeave(req.id)}
                        className="px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-semibold text-xs flex items-center gap-1 transition-colors"
                      >
                        <X className="w-3.5 h-3.5" /> Reject
                      </button>
                    </>
                  ) : (
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold font-mono ${
                        req.status === 'APPROVED' ? 'bg-emerald-500/10 text-emerald-600' : 'bg-rose-500/10 text-rose-600'
                      }`}
                    >
                      {req.status}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
