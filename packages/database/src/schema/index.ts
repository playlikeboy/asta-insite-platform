import { sql } from 'drizzle-orm';
import {
  boolean,
  check,
  index,
  integer,
  pgEnum,
  pgTable,
  smallint,
  text,
  timestamp,
  uuid,
} from 'drizzle-orm/pg-core';

const timestamps = {
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
};

export const userStatus = pgEnum('user_status', ['active', 'suspended', 'deleted']);
export const providerApprovalStatus = pgEnum('provider_approval_status', [
  'draft',
  'pending_review',
  'approved',
  'rejected',
  'deactivated',
]);
export const adminRole = pgEnum('admin_role', [
  'super_admin',
  'operations',
  'finance',
  'moderator',
]);

/**
 * One row per person. Appwrite owns credentials, phone and email; roles come from which
 * profile rows exist. A person can hold both profiles, pending decision D-01.
 */
export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  appwriteUserId: text('appwrite_user_id').notNull().unique(),
  status: userStatus('status').notNull().default('active'),
  deletedAt: timestamp('deleted_at', { withTimezone: true }),
  ...timestamps,
});

export const customerProfiles = pgTable('customer_profiles', {
  userId: uuid('user_id')
    .primaryKey()
    .references(() => users.id, { onDelete: 'cascade' }),
  fullName: text('full_name').notNull(),
  city: text('city'),
  onboardedAt: timestamp('onboarded_at', { withTimezone: true }),
  ...timestamps,
});

export const providerProfiles = pgTable(
  'provider_profiles',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    userId: uuid('user_id')
      .notNull()
      .unique()
      .references(() => users.id, { onDelete: 'cascade' }),
    businessName: text('business_name').notNull(),
    description: text('description'),
    yearsOfExperience: smallint('years_of_experience'),
    approvalStatus: providerApprovalStatus('approval_status').notNull().default('draft'),
    availableForLeads: boolean('available_for_leads').notNull().default(false),
    approvedAt: timestamp('approved_at', { withTimezone: true }),
    ...timestamps,
  },
  (table) => [
    index('provider_profiles_approval_status_idx').on(table.approvalStatus),
    check(
      'provider_profiles_years_of_experience_range',
      sql`${table.yearsOfExperience} IS NULL OR ${table.yearsOfExperience} BETWEEN 0 AND 100`,
    ),
  ],
);

/** Admin access comes only from this table, never from a client-supplied value. */
export const adminUsers = pgTable('admin_users', {
  userId: uuid('user_id')
    .primaryKey()
    .references(() => users.id, { onDelete: 'restrict' }),
  role: adminRole('role').notNull(),
  ...timestamps,
});

export const serviceCategories = pgTable(
  'service_categories',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    slug: text('slug').notNull().unique(),
    name: text('name').notNull(),
    isActive: boolean('is_active').notNull().default(true),
    sortOrder: integer('sort_order').notNull().default(0),
    ...timestamps,
  },
  (table) => [index('service_categories_active_sort_idx').on(table.isActive, table.sortOrder)],
);
