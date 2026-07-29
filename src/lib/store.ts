import { Tenant, User, UserRole, NavigationItem, NotificationItem, AuditLogItem } from '../types';

export const DEMO_TENANTS: Tenant[] = [
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
  }
];

export const DEMO_USERS: Record<UserRole, User> = {
  SUPER_ADMIN: {
    id: 'usr-00',
    name: 'Sarah Connor',
    email: 'sarah.admin@peopleflow.io',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
    role: 'SUPER_ADMIN',
    tenantId: 'system',
    department: 'Platform Ops',
    jobTitle: 'Super Administrator',
    employeeCode: 'SYS-001'
  },
  COMPANY_ADMIN: {
    id: 'usr-01',
    name: 'Alex Morgan',
    email: 'alex.morgan@acme.com',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
    role: 'COMPANY_ADMIN',
    tenantId: 'tenant-acme',
    department: 'Human Resources',
    jobTitle: 'VP of People & Culture',
    employeeCode: 'EMP-101'
  },
  MANAGER: {
    id: 'usr-02',
    name: 'David Chen',
    email: 'david.chen@acme.com',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    role: 'MANAGER',
    tenantId: 'tenant-acme',
    department: 'Engineering',
    jobTitle: 'Engineering Manager',
    employeeCode: 'EMP-142'
  },
  EMPLOYEE: {
    id: 'usr-03',
    name: 'Maya Lin',
    email: 'maya.lin@acme.com',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150',
    role: 'EMPLOYEE',
    tenantId: 'tenant-acme',
    department: 'Product Design',
    jobTitle: 'Senior UI/UX Designer',
    employeeCode: 'EMP-215'
  },
  RECRUITER: {
    id: 'usr-04',
    name: 'Marcus Vance',
    email: 'marcus.v@acme.com',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
    role: 'RECRUITER',
    tenantId: 'tenant-acme',
    department: 'Talent Acquisition',
    jobTitle: 'Lead Talent Partner',
    employeeCode: 'EMP-189'
  },
  PAYROLL_ADMIN: {
    id: 'usr-05',
    name: 'Elena Rostova',
    email: 'elena.r@acme.com',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150',
    role: 'PAYROLL_ADMIN',
    tenantId: 'tenant-acme',
    department: 'Finance & Payroll',
    jobTitle: 'Head of Compensation & Payroll',
    employeeCode: 'EMP-112'
  }
};

export const NAVIGATION_ITEMS: NavigationItem[] = [
  {
    id: 'dashboard',
    title: 'Overview',
    icon: 'LayoutDashboard',
    path: '/dashboard',
    category: 'Core',
    requiredRoles: ['SUPER_ADMIN', 'COMPANY_ADMIN', 'MANAGER', 'EMPLOYEE', 'RECRUITER', 'PAYROLL_ADMIN']
  },
  {
    id: 'phase1',
    title: 'DB Schema & RLS',
    icon: 'ShieldAlert',
    path: '/phase1',
    category: 'Core',
    requiredRoles: ['SUPER_ADMIN', 'COMPANY_ADMIN', 'MANAGER', 'EMPLOYEE', 'RECRUITER', 'PAYROLL_ADMIN'],
    badge: 'Phase 1',
    badgeColor: 'bg-indigo-500/10 text-indigo-600'
  },
  {
    id: 'core-hr',
    title: 'Employee Lifecycle',
    icon: 'Users',
    path: '/employees',
    category: 'Workforce',
    requiredRoles: ['SUPER_ADMIN', 'COMPANY_ADMIN', 'MANAGER', 'RECRUITER'],
    badge: '184 Active',
    badgeColor: 'bg-blue-500/10 text-blue-600'
  },
  {
    id: 'attendance',
    title: 'Attendance & Time',
    icon: 'Clock',
    path: '/attendance',
    category: 'Workforce',
    requiredRoles: ['SUPER_ADMIN', 'COMPANY_ADMIN', 'MANAGER', 'EMPLOYEE', 'PAYROLL_ADMIN']
  },
  {
    id: 'leave',
    title: 'Leave & Absence',
    icon: 'Calendar',
    path: '/leave',
    category: 'Workforce',
    requiredRoles: ['SUPER_ADMIN', 'COMPANY_ADMIN', 'MANAGER', 'EMPLOYEE'],
    badge: '4 Pending',
    badgeColor: 'bg-amber-500/10 text-amber-600'
  },
  {
    id: 'payroll',
    title: 'Payroll & Comp',
    icon: 'CreditCard',
    path: '/payroll',
    category: 'Operations',
    requiredRoles: ['SUPER_ADMIN', 'COMPANY_ADMIN', 'PAYROLL_ADMIN'],
    badge: 'July Run',
    badgeColor: 'bg-emerald-500/10 text-emerald-600'
  },
  {
    id: 'recruitment',
    title: 'Recruitment (ATS)',
    icon: 'Briefcase',
    path: '/recruitment',
    category: 'Talent',
    requiredRoles: ['SUPER_ADMIN', 'COMPANY_ADMIN', 'RECRUITER', 'MANAGER'],
    badge: '8 Jobs',
    badgeColor: 'bg-purple-500/10 text-purple-600'
  },
  {
    id: 'onboarding',
    title: 'On/Offboarding',
    icon: 'UserCheck',
    path: '/onboarding',
    category: 'Talent',
    requiredRoles: ['SUPER_ADMIN', 'COMPANY_ADMIN', 'MANAGER', 'RECRUITER']
  },
  {
    id: 'performance',
    title: 'Performance & OKRs',
    icon: 'TrendingUp',
    path: '/performance',
    category: 'Talent',
    requiredRoles: ['SUPER_ADMIN', 'COMPANY_ADMIN', 'MANAGER', 'EMPLOYEE']
  },
  {
    id: 'engagement',
    title: 'Engagement & Surveys',
    icon: 'HeartHandshake',
    path: '/engagement',
    category: 'Talent',
    requiredRoles: ['SUPER_ADMIN', 'COMPANY_ADMIN', 'MANAGER', 'EMPLOYEE']
  },
  {
    id: 'analytics',
    title: 'Analytics & Reports',
    icon: 'BarChart3',
    path: '/analytics',
    category: 'Operations',
    requiredRoles: ['SUPER_ADMIN', 'COMPANY_ADMIN', 'PAYROLL_ADMIN']
  },
  {
    id: 'ai-assistant',
    title: 'AI Policy Assistant',
    icon: 'Sparkles',
    path: '/ai-assistant',
    category: 'Core',
    requiredRoles: ['SUPER_ADMIN', 'COMPANY_ADMIN', 'MANAGER', 'EMPLOYEE', 'RECRUITER', 'PAYROLL_ADMIN'],
    badge: 'RAG AI',
    badgeColor: 'bg-indigo-500/10 text-indigo-600'
  },
  {
    id: 'super-admin',
    title: 'Platform Console',
    icon: 'ShieldAlert',
    path: '/super-admin',
    category: 'Admin',
    requiredRoles: ['SUPER_ADMIN'],
    badge: 'System',
    badgeColor: 'bg-red-500/10 text-red-600'
  },
  {
    id: 'settings',
    title: 'Tenant Settings',
    icon: 'Sliders',
    path: '/settings',
    category: 'Admin',
    requiredRoles: ['SUPER_ADMIN', 'COMPANY_ADMIN']
  }
];

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-1',
    title: 'Leave Request Pending Approval',
    message: 'Liam Carter requested 3 days Annual Leave (Aug 12 - Aug 14).',
    time: '10 mins ago',
    type: 'leave',
    read: false,
    link: '/leave'
  },
  {
    id: 'notif-2',
    title: 'July Payroll Draft Ready',
    message: 'Monthly payroll processing for 184 employees is ready for review.',
    time: '1 hour ago',
    type: 'payroll',
    read: false,
    link: '/payroll'
  },
  {
    id: 'notif-3',
    title: 'Interview Scheduled',
    message: 'Senior Full Stack Lead interview with candidate Priya Patel at 3:00 PM.',
    time: '3 hours ago',
    type: 'interview',
    read: true,
    link: '/recruitment'
  },
  {
    id: 'notif-4',
    title: 'Document Expiry Alert',
    message: 'Visa expiry notice for 2 employees within 30 days.',
    time: 'Yesterday',
    type: 'policy',
    read: true,
    link: '/employees'
  }
];

export const INITIAL_AUDIT_LOGS: AuditLogItem[] = [
  {
    id: 'log-101',
    tenantId: 'tenant-acme',
    actor: 'Alex Morgan (Company Admin)',
    action: 'CREATE_EMPLOYEE',
    target: 'Employee #EMP-245 (Jordan Smith)',
    timestamp: '2026-07-28 09:15:22 UTC',
    ipAddress: '192.168.1.45',
    status: 'SUCCESS'
  },
  {
    id: 'log-102',
    tenantId: 'tenant-acme',
    actor: 'Elena Rostova (Payroll Admin)',
    action: 'APPROVE_PAYROLL_RUN',
    target: 'Payroll Batch #PR-2026-07',
    timestamp: '2026-07-28 08:30:10 UTC',
    ipAddress: '10.0.4.12',
    status: 'SUCCESS'
  },
  {
    id: 'log-103',
    tenantId: 'tenant-acme',
    actor: 'David Chen (Manager)',
    action: 'APPROVE_LEAVE_REQUEST',
    target: 'Leave Request #LR-892 (Maya Lin)',
    timestamp: '2026-07-27 16:45:00 UTC',
    ipAddress: '172.16.2.8',
    status: 'SUCCESS'
  }
];
