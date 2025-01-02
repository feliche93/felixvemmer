import { pgTable, serial, text, integer, boolean, timestamp, numeric } from 'drizzle-orm/pg-core'

export const npmPackages = pgTable('npm_packages', {
  id: serial('id').primaryKey(),
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
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow()
})