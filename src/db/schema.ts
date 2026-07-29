import { pgTable, uuid, text, timestamp, boolean, numeric, integer, pgEnum, index, uniqueIndex, jsonb } from 'drizzle-orm/pg-core';

// ENUMS
export const roleEnum = pgEnum('user_role', ['SUPER_ADMIN', 'COMPANY_ADMIN', 'MANAGER', 'EMPLOYEE', 'RECRUITER', 'PAYROLL_ADMIN']);
export const planEnum = pgEnum('subscription_plan', ['STARTER', 'GROWTH', 'ENTERPRISE']);
export const subscriptionStatusEnum = pgEnum('subscription_status', ['TRIALING', 'ACTIVE', 'PAST_DUE', 'SUSPENDED', 'CANCELLED']);
export const employmentStatusEnum = pgEnum('employment_status', ['FULL_TIME', 'PART_TIME', 'CONTRACTOR', 'INTERN', 'PROBATION', 'TERMINATED']);
export const attendanceStatusEnum = pgEnum('attendance_status', ['PRESENT', 'ABSENT', 'LATE', 'HALF_DAY', 'ON_LEAVE', 'REMOTE']);
export const leaveStatusEnum = pgEnum('leave_status', ['PENDING', 'APPROVED', 'REJECTED', 'CANCELLED']);
export const payrollStatusEnum = pgEnum('payroll_status', ['DRAFT', 'LOCKED', 'APPROVED', 'DISBURSED', 'CANCELLED']);
export const candidateStageEnum = pgEnum('candidate_stage', ['APPLIED', 'SCREENING', 'INTERVIEW', 'OFFER', 'HIRED', 'REJECTED']);

// HELPER FOR COMMON TENANT-SCOPED AUDITED COLUMNS
const baseTenantColumns = {
  id: uuid('id').defaultRandom().primaryKey(),
  tenantId: uuid('tenant_id').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
  deletedAt: timestamp('deleted_at', { withTimezone: true }),
  createdBy: uuid('created_by'),
  updatedBy: uuid('updated_by'),
};

// 1. TENANTS & SUBSCRIPTIONS
export const tenants = pgTable('tenants', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name').notNull(),
  domain: text('domain').notNull().unique(),
  logo: text('logo'),
  primaryColor: text('primary_color').default('#2563eb'),
  country: text('country').default('United States').notNull(),
  currency: text('currency').default('USD').notNull(),
  timezone: text('timezone').default('UTC').notNull(),
  fiscalYearStartMonth: integer('fiscal_year_start_month').default(1).notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
  deletedAt: timestamp('deleted_at', { withTimezone: true }),
}, (table) => [
  uniqueIndex('idx_tenant_domain').on(table.domain)
]);

export const subscriptions = pgTable('subscriptions', {
  ...baseTenantColumns,
  plan: planEnum('plan').default('STARTER').notNull(),
  status: subscriptionStatusEnum('status').default('TRIALING').notNull(),
  stripeCustomerId: text('stripe_customer_id'),
  stripeSubscriptionId: text('stripe_subscription_id'),
  seatsAllocated: integer('seats_allocated').default(10).notNull(),
  seatsUsed: integer('seats_used').default(1).notNull(),
  trialEndsAt: timestamp('trial_ends_at', { withTimezone: true }),
  currentPeriodStart: timestamp('current_period_start', { withTimezone: true }),
  currentPeriodEnd: timestamp('current_period_end', { withTimezone: true }),
}, (table) => [
  index('idx_sub_tenant').on(table.tenantId)
]);

// 2. ORGANIZATIONAL STRUCTURE
export const departments = pgTable('departments', {
  ...baseTenantColumns,
  name: text('name').notNull(),
  code: text('code').notNull(),
  headEmployeeId: uuid('head_employee_id'),
}, (table) => [
  index('idx_dept_tenant').on(table.tenantId)
]);

export const locations = pgTable('locations', {
  ...baseTenantColumns,
  name: text('name').notNull(),
  address: text('address'),
  city: text('city'),
  state: text('state'),
  country: text('country').notNull(),
  isHeadquarters: boolean('is_headquarters').default(false),
}, (table) => [
  index('idx_loc_tenant').on(table.tenantId)
]);

export const jobTitles = pgTable('job_titles', {
  ...baseTenantColumns,
  title: text('title').notNull(),
  departmentId: uuid('department_id'),
  minSalary: numeric('min_salary', { precision: 18, scale: 4 }),
  maxSalary: numeric('max_salary', { precision: 18, scale: 4 }),
}, (table) => [
  index('idx_jt_tenant').on(table.tenantId)
]);

// 3. USERS & EMPLOYEES
export const users = pgTable('users', {
  ...baseTenantColumns,
  email: text('email').notNull(),
  passwordHash: text('password_hash'),
  role: roleEnum('role').default('EMPLOYEE').notNull(),
  isEmailVerified: boolean('is_email_verified').default(false),
  mfaEnabled: boolean('mfa_enabled').default(false),
  lastLoginAt: timestamp('last_login_at', { withTimezone: true }),
}, (table) => [
  index('idx_users_tenant_email').on(table.tenantId, table.email)
]);

export const employees = pgTable('employees', {
  ...baseTenantColumns,
  userId: uuid('user_id'),
  employeeCode: text('employee_code').notNull(),
  firstName: text('first_name').notNull(),
  lastName: text('last_name').notNull(),
  workEmail: text('work_email').notNull(),
  phone: text('phone'),
  avatar: text('avatar'),
  gender: text('gender'),
  dateOfBirth: timestamp('date_of_birth'),
  joiningDate: timestamp('joining_date').notNull(),
  status: employmentStatusEnum('status').default('FULL_TIME').notNull(),
  departmentId: uuid('department_id'),
  locationId: uuid('location_id'),
  jobTitleId: uuid('job_title_id'),
  managerId: uuid('manager_id'),
}, (table) => [
  index('idx_emp_tenant_code').on(table.tenantId, table.employeeCode),
  index('idx_emp_tenant_dept').on(table.tenantId, table.departmentId)
]);

export const compensationRecords = pgTable('compensation_records', {
  ...baseTenantColumns,
  employeeId: uuid('employee_id').notNull(),
  baseSalary: numeric('base_salary', { precision: 18, scale: 4 }).notNull(),
  currency: text('currency').default('USD').notNull(),
  payFrequency: text('pay_frequency').default('MONTHLY').notNull(),
  effectiveDate: timestamp('effective_date').notNull(),
}, (table) => [
  index('idx_comp_tenant_emp').on(table.tenantId, table.employeeId)
]);

// 4. ATTENDANCE & LEAVE
export const attendanceLogs = pgTable('attendance_logs', {
  ...baseTenantColumns,
  employeeId: uuid('employee_id').notNull(),
  date: timestamp('date').notNull(),
  clockIn: timestamp('clock_in'),
  clockOut: timestamp('clock_out'),
  workDurationMinutes: integer('work_duration_minutes').default(0),
  status: attendanceStatusEnum('status').default('PRESENT').notNull(),
  locationCoordinates: text('location_coordinates'),
}, (table) => [
  index('idx_att_tenant_emp_date').on(table.tenantId, table.employeeId, table.date)
]);

export const leaveTypes = pgTable('leave_types', {
  ...baseTenantColumns,
  name: text('name').notNull(),
  code: text('code').notNull(),
  annualDays: integer('annual_days').default(14).notNull(),
  carryForwardMax: integer('carry_forward_max').default(5),
  isPaid: boolean('is_paid').default(true),
}, (table) => [
  index('idx_lt_tenant').on(table.tenantId)
]);

export const leaveRequests = pgTable('leave_requests', {
  ...baseTenantColumns,
  employeeId: uuid('employee_id').notNull(),
  leaveTypeId: uuid('leave_type_id').notNull(),
  startDate: timestamp('start_date').notNull(),
  endDate: timestamp('end_date').notNull(),
  totalDays: numeric('total_days', { precision: 5, scale: 2 }).notNull(),
  reason: text('reason'),
  status: leaveStatusEnum('status').default('PENDING').notNull(),
  approvedBy: uuid('approved_by'),
}, (table) => [
  index('idx_lr_tenant_emp').on(table.tenantId, table.employeeId)
]);

// 5. PAYROLL
export const payrollRuns = pgTable('payroll_runs', {
  ...baseTenantColumns,
  periodMonth: integer('period_month').notNull(),
  periodYear: integer('period_year').notNull(),
  totalGrossSalary: numeric('total_gross_salary', { precision: 18, scale: 4 }).notNull(),
  totalDeductions: numeric('total_deductions', { precision: 18, scale: 4 }).notNull(),
  totalNetPay: numeric('total_net_pay', { precision: 18, scale: 4 }).notNull(),
  status: payrollStatusEnum('status').default('DRAFT').notNull(),
  processedAt: timestamp('processed_at'),
}, (table) => [
  index('idx_pr_tenant_period').on(table.tenantId, table.periodYear, table.periodMonth)
]);

export const payslips = pgTable('payslips', {
  ...baseTenantColumns,
  payrollRunId: uuid('payroll_run_id').notNull(),
  employeeId: uuid('employee_id').notNull(),
  grossPay: numeric('gross_pay', { precision: 18, scale: 4 }).notNull(),
  netPay: numeric('net_pay', { precision: 18, scale: 4 }).notNull(),
  taxDeductions: numeric('tax_deductions', { precision: 18, scale: 4 }).notNull(),
  pdfUrl: text('pdf_url'),
}, (table) => [
  index('idx_ps_tenant_emp').on(table.tenantId, table.employeeId)
]);

// 6. RECRUITMENT & ATS
export const jobRequisitions = pgTable('job_requisitions', {
  ...baseTenantColumns,
  title: text('title').notNull(),
  departmentId: uuid('department_id'),
  openingsCount: integer('openings_count').default(1).notNull(),
  jobDescription: text('job_description').notNull(),
  status: text('status').default('OPEN').notNull(),
}, (table) => [
  index('idx_req_tenant').on(table.tenantId)
]);

export const candidates = pgTable('candidates', {
  ...baseTenantColumns,
  requisitionId: uuid('requisition_id').notNull(),
  fullName: text('full_name').notNull(),
  email: text('email').notNull(),
  phone: text('phone'),
  resumeUrl: text('resume_url'),
  stage: candidateStageEnum('stage').default('APPLIED').notNull(),
  aiMatchScore: integer('ai_match_score'),
}, (table) => [
  index('idx_cand_tenant_req').on(table.tenantId, table.requisitionId)
]);

// 7. SECURITY & AUDIT
export const auditLogs = pgTable('audit_logs', {
  id: uuid('id').defaultRandom().primaryKey(),
  tenantId: uuid('tenant_id').notNull(),
  actorName: text('actor_name').notNull(),
  actorEmail: text('actor_email').notNull(),
  action: text('action').notNull(),
  targetResource: text('target_resource').notNull(),
  ipAddress: text('ip_address'),
  metadata: jsonb('metadata'),
  timestamp: timestamp('timestamp', { withTimezone: true }).defaultNow().notNull(),
}, (table) => [
  index('idx_audit_tenant_time').on(table.tenantId, table.timestamp)
]);
