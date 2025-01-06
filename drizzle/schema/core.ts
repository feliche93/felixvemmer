import { sql } from 'drizzle-orm'
import { boolean, integer, numeric, pgTable, text, timestamp } from 'drizzle-orm/pg-core'

export const npmPackages = pgTable('npm_packages', {
  id: text('id').primaryKey().default(sql`'npmpkg_' || nanoid()`),
  name: text('name').notNull().unique().notNull(),
  description: text('description'),
  license: text('license'),
  homepageUrl: text('homepage_url'),
  repositoryUrl: text('repository_url'),
  bugsUrl: text('bugs_url'),
  npmUrl: text('npm_url').notNull(),

  // From search result
  dependents: integer('dependents').notNull(),
  isInsecure: boolean('is_insecure').notNull().default(false),

  // Publisher info
  publisherName: text('publisher_name').notNull(),
  publisherEmail: text('publisher_email').notNull(),

  // Search scores
  popularity: numeric('popularity').notNull(),
  quality: numeric('quality').notNull(),
  maintenance: numeric('maintenance').notNull(),
  finalScore: numeric('final_score').notNull(),

  // Timestamps
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
})

export const nodeCategories = pgTable('node_categories', {
  id: text('id').primaryKey().default(sql`'ncat_' || nanoid()`).notNull(),
  name: text('name').notNull().unique().notNull(),
  slug: text('slug').notNull().unique().notNull(),
  description: text('description').notNull(),

  // Timestamps
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
})

export const nodeSubcategories = pgTable('node_subcategories', {
  id: text('id').primaryKey().default(sql`'nsubcat_' || nanoid()`).notNull(),
  name: text('name').notNull().unique().notNull(),
  slug: text('slug').notNull().unique().notNull(),
  description: text('description').notNull(),
  categoryId: text('category_id')
    .references(() => nodeCategories.id)
    .notNull(),

  // Timestamps
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
})
