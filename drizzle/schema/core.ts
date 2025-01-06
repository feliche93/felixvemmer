import { sql } from 'drizzle-orm'
import { boolean, integer, numeric, pgTable, text, timestamp } from 'drizzle-orm/pg-core'

export const npmPackages = pgTable('npm_packages', {
  id: text('id').primaryKey().default(sql`'npmpkg_' || nanoid()`),
  name: text('name').notNull().unique(),
  description: text('description'),
  license: text('license'),
  homepageUrl: text('homepage_url'),
  repositoryUrl: text('repository_url'),
  bugsUrl: text('bugs_url'),
  npmUrl: text('npm_url'),

  // From search result
  dependents: integer('dependents'),
  isInsecure: boolean('is_insecure').default(false),

  // Publisher info
  publisherName: text('publisher_name'),
  publisherEmail: text('publisher_email'),

  // Search scores
  popularity: numeric('popularity'),
  quality: numeric('quality'),
  maintenance: numeric('maintenance'),
  finalScore: numeric('final_score'),

  // Timestamps
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
})

export const nodeCategories = pgTable('node_categories', {
  id: text('id').primaryKey().default(sql`'ncat_' || nanoid()`),
  name: text('name').notNull().unique(),
  description: text('description'),

  // Timestamps
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
})

export const nodeSubcategories = pgTable('node_subcategories', {
  id: text('id').primaryKey().default(sql`'nsubcat_' || nanoid()`),
  name: text('name').notNull().unique(),
  description: text('description'),
  categoryId: text('category_id').references(() => nodeCategories.id),

  // Timestamps
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
})
