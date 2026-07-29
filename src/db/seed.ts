import { Tenant, User, UserRole, NotificationItem, AuditLogItem } from '../types';

export interface SeedEmployee {
  id: string;
  tenantId: string;
  employeeCode: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  department: string;
  jobTitle: string;
  role: UserRole;
  salary: number;
  status: 'FULL_TIME' | 'PART_TIME' | 'CONTRACTOR';
  joiningDate: string;
  avatar: string;
  location: string;
}

export interface SeedAttendance {
  id: string;
  tenantId: string;
  employeeId: string;
  employeeName: string;
  date: string;
  clockIn: string;
  clockOut: string;
  hoursWorked: number;
  status: 'PRESENT' | 'REMOTE' | 'ON_LEAVE' | 'LATE';
}

export interface SeedPayrollRun {
  id: string;
  tenantId: string;
  monthYear: string;
  headcountProcessed: number;
  grossSalary: number;
  taxDeductions: number;
  netDisbursement: number;
  status: 'DRAFT' | 'LOCKED' | 'DISBURSED';
  disbursementDate: string;
}

export interface SeedJobRequisition {
  id: string;
  tenantId: string;
  title: string;
  department: string;
  location: string;
  applicantsCount: number;
  status: 'OPEN' | 'INTERVIEWING' | 'CLOSED';
  salaryRange: string;
}

export interface SeedAuditLog {
  id: string;
  tenantId: string;
  userEmail: string;
  action: string;
  module: string;
  timestamp: string;
  ipAddress: string;
}

export function generateSeedAuditLogs(): SeedAuditLog[] {
  return [
    { id: 'al-1', tenantId: 'tenant-acme', userEmail: 'superadmin@peopleflow.io', action: 'TENANT_PROVISIONED', module: 'Tenants & Settings', timestamp: '2026-07-28 08:15:22', ipAddress: '192.168.1.100' },
    { id: 'al-2', tenantId: 'tenant-acme', userEmail: 'alex.morgan@acme.com', action: 'PAYROLL_LOCKED', module: 'Payroll', timestamp: '2026-07-28 08:02:11', ipAddress: '10.0.0.12' },
    { id: 'al-3', tenantId: 'tenant-acme', userEmail: 'jordan.smith@acme.com', action: 'CLOCK_IN_GEOFENCE', module: 'Attendance', timestamp: '2026-07-28 09:01:05', ipAddress: '172.16.0.4' },
    { id: 'al-4', tenantId: 'tenant-acme', userEmail: 'hr.admin@acme.com', action: 'LEAVE_APPROVED', module: 'Leave Approvals', timestamp: '2026-07-27 16:45:00', ipAddress: '10.0.0.15' },
    { id: 'al-5', tenantId: 'tenant-techpulse', userEmail: 'sarah.c@techpulse.io', action: 'ROLE_PERMISSIONS_UPDATED', module: 'RBAC', timestamp: '2026-07-27 14:20:30', ipAddress: '198.51.100.42' },
  ];
}

export const SEED_TENANTS: Tenant[] = [
  {
    id: 'tenant-acme',
    name: 'Acme Corp',
    domain: 'acme.peopleflow.app',
    logo: '⚡',
    plan: 'Enterprise',
    seats: 250,
    usedSeats: 184,
    currency: 'USD ($)',
    timezone: 'America/New_York (UTC-5)',
    country: 'United States',
    primaryColor: '#2563eb',
  },
  {
    id: 'tenant-techpulse',
    name: 'TechPulse AI',
    domain: 'techpulse.peopleflow.app',
    logo: '🚀',
    plan: 'Growth',
    seats: 100,
    usedSeats: 62,
    currency: 'EUR (€)',
    timezone: 'Europe/London (UTC+0)',
    country: 'United Kingdom',
    primaryColor: '#7c3aed',
  },
  {
    id: 'tenant-globallogistics',
    name: 'Global Logistics Ltd',
    domain: 'globallogistics.peopleflow.app',
    logo: '🌐',
    plan: 'Starter',
    seats: 50,
    usedSeats: 38,
    currency: 'INR (₹)',
    timezone: 'Asia/Kolkata (UTC+5:30)',
    country: 'India',
    primaryColor: '#059669',
  },
];

const DEPARTMENTS = ['Engineering', 'Product & Design', 'Sales & Marketing', 'Customer Support', 'Human Resources', 'Finance & Ops'];
const FIRST_NAMES = ['Alex', 'Jordan', 'Taylor', 'Morgan', 'Casey', 'Sam', 'Chris', 'Pat', 'Devon', 'Riley', 'Avery', 'Dakota', 'Reese', 'Quinn', 'Skyler', 'Priya', 'Liam', 'Sophia', 'Lucas', 'Emma'];
const LAST_NAMES = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson', 'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin'];

export function generateSeedEmployees(): SeedEmployee[] {
  const employees: SeedEmployee[] = [];
  let empCounter = 100;

  SEED_TENANTS.forEach((tenant) => {
    const count = tenant.id === 'tenant-acme' ? 45 : tenant.id === 'tenant-techpulse' ? 20 : 12;

    for (let i = 0; i < count; i++) {
      empCounter++;
      const fn = FIRST_NAMES[i % FIRST_NAMES.length];
      const ln = LAST_NAMES[(i + 3) % LAST_NAMES.length];
      const dept = DEPARTMENTS[i % DEPARTMENTS.length];
      const code = `EMP-${empCounter}`;
      
      let role: UserRole = 'EMPLOYEE';
      if (i === 0) role = 'COMPANY_ADMIN';
      else if (i % 5 === 0) role = 'MANAGER';
      else if (i === 3) role = 'PAYROLL_ADMIN';
      else if (i === 4) role = 'RECRUITER';

      employees.push({
        id: `emp-${tenant.id}-${i + 1}`,
        tenantId: tenant.id,
        employeeCode: code,
        firstName: fn,
        lastName: ln,
        email: `${fn.toLowerCase()}.${ln.toLowerCase()}@${tenant.domain.replace('.peopleflow.app', '.com')}`,
        phone: `+1 (${555}) ${100 + i}-${2000 + i}`,
        department: dept,
        jobTitle: dept === 'Engineering' ? 'Senior Full-Stack Engineer' : dept === 'Product & Design' ? 'UX Architect' : `${dept} Lead`,
        role,
        salary: 75000 + (i * 2400) % 65000,
        status: i % 10 === 0 ? 'CONTRACTOR' : 'FULL_TIME',
        joiningDate: `2024-${((i % 11) + 1).toString().padStart(2, '0')}-15`,
        avatar: `https://images.unsplash.com/photo-${1500000000000 + (i * 123456) % 90000000}?w=150&auto=format&fit=crop&q=80`,
        location: tenant.country,
      });
    }
  });

  return employees;
}

export function generateSeedAttendance(): SeedAttendance[] {
  const logs: SeedAttendance[] = [];
  const emps = generateSeedEmployees();

  emps.forEach((emp, index) => {
    const dates = ['2026-07-28', '2026-07-27', '2026-07-26'];
    dates.forEach((d) => {
      const isRemote = index % 3 === 0;
      const isLeave = index % 14 === 0;

      logs.push({
        id: `att-${emp.id}-${d}`,
        tenantId: emp.tenantId,
        employeeId: emp.id,
        employeeName: `${emp.firstName} ${emp.lastName}`,
        date: d,
        clockIn: isLeave ? '--:--' : '09:02 AM',
        clockOut: isLeave ? '--:--' : '05:45 PM',
        hoursWorked: isLeave ? 0 : 8.5,
        status: isLeave ? 'ON_LEAVE' : isRemote ? 'REMOTE' : 'PRESENT',
      });
    });
  });

  return logs;
}

export function generateSeedPayrollRuns(): SeedPayrollRun[] {
  const runs: SeedPayrollRun[] = [];
  const months = ['2026-07', '2026-06', '2026-05', '2026-04'];

  SEED_TENANTS.forEach((tenant) => {
    months.forEach((m, idx) => {
      const isCurrentMonth = idx === 0;
      const baseGross = tenant.id === 'tenant-acme' ? 185000 : tenant.id === 'tenant-techpulse' ? 82000 : 38000;
      const tax = Math.round(baseGross * 0.22);

      runs.push({
        id: `pr-${tenant.id}-${m}`,
        tenantId: tenant.id,
        monthYear: m,
        headcountProcessed: tenant.usedSeats,
        grossSalary: baseGross,
        taxDeductions: tax,
        netDisbursement: baseGross - tax,
        status: isCurrentMonth ? 'DRAFT' : 'DISBURSED',
        disbursementDate: isCurrentMonth ? '2026-07-31' : `${m}-28`,
      });
    });
  });

  return runs;
}

export function generateSeedJobRequisitions(): SeedJobRequisition[] {
  return [
    { id: 'req-1', tenantId: 'tenant-acme', title: 'Senior AI / ML Engineer', department: 'Engineering', location: 'New York, USA', applicantsCount: 42, status: 'OPEN', salaryRange: '$140k - $180k' },
    { id: 'req-2', tenantId: 'tenant-acme', title: 'Product Marketing Manager', department: 'Sales & Marketing', location: 'Remote', applicantsCount: 19, status: 'INTERVIEWING', salaryRange: '$110k - $135k' },
    { id: 'req-3', tenantId: 'tenant-techpulse', title: 'Frontend React Lead', department: 'Engineering', location: 'London, UK', applicantsCount: 28, status: 'OPEN', salaryRange: '£85k - £105k' },
    { id: 'req-4', tenantId: 'tenant-globallogistics', title: 'Supply Chain Ops Lead', department: 'Operations', location: 'Mumbai, IN', applicantsCount: 15, status: 'OPEN', salaryRange: '₹18L - ₹24L' },
  ];
}
