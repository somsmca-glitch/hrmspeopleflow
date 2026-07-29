export type UserRole = 
  | 'SUPER_ADMIN' 
  | 'COMPANY_ADMIN' 
  | 'MANAGER' 
  | 'EMPLOYEE' 
  | 'RECRUITER' 
  | 'PAYROLL_ADMIN';

export interface Tenant {
  id: string;
  name: string;
  domain: string;
  logo: string;
  plan: 'Starter' | 'Growth' | 'Enterprise';
  seats: number;
  usedSeats: number;
  currency: string;
  timezone: string;
  country: string;
  primaryColor: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: UserRole;
  tenantId: string;
  department: string;
  jobTitle: string;
  employeeCode: string;
}

export interface NavigationItem {
  id: string;
  title: string;
  icon: string;
  path: string;
  category: 'Core' | 'Workforce' | 'Talent' | 'Operations' | 'Admin';
  requiredRoles: UserRole[];
  badge?: string;
  badgeColor?: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  type: 'leave' | 'payroll' | 'interview' | 'system' | 'policy';
  read: boolean;
  link?: string;
}

export interface AuditLogItem {
  id: string;
  tenantId: string;
  actor: string;
  action: string;
  target: string;
  timestamp: string;
  ipAddress: string;
  status: 'SUCCESS' | 'WARNING' | 'FAILED';
}

export interface EmployeeOverview {
  total: number;
  active: number;
  onboarding: number;
  onLeaveToday: number;
  inOfficeToday: number;
  remoteToday: number;
  openRequisitions: number;
  pendingApprovals: number;
  monthlyPayrollEstimate: number;
}
