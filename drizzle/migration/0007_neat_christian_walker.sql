CREATE EXTENSION IF NOT EXISTS "unaccent";
CREATE OR REPLACE FUNCTION slugify(value TEXT) RETURNS TEXT AS $$ BEGIN RETURN regexp_replace(
        regexp_replace(
            lower(unaccent(value)),
            -- Lowercase and remove accents
            '[^a-z0-9\\-_]+',
            '-',
            'gi' -- Replace non-alphanumeric characters with hyphens
        ),
        '(^-+|-+$)',
        '',
        'g' -- Remove leading and trailing hyphens
    );
END;
$$ LANGUAGE plpgsql IMMUTABLE STRICT;
-- Add nullable slug columns first
ALTER TABLE "node_categories"
ADD COLUMN "slug" text;
--> statement-breakpoint
ALTER TABLE "node_subcategories"
ADD COLUMN "slug" text;
--> statement-breakpoint
-- Update existing rows with slugified names
UPDATE "node_categories"
SET "slug" = slugify("name");
--> statement-breakpoint
UPDATE "node_subcategories"
SET "slug" = slugify("name");
--> statement-breakpoint
-- Make columns not null after populating data
ALTER TABLE "node_categories"
ALTER COLUMN "slug"
SET NOT NULL;
--> statement-breakpoint
ALTER TABLE "node_subcategories"
ALTER COLUMN "slug"
SET NOT NULL;
--> statement-breakpoint
-- Add unique constraints
ALTER TABLE "node_categories"
ADD CONSTRAINT "node_categories_slug_unique" UNIQUE("slug");
--> statement-breakpoint
ALTER TABLE "node_subcategories"
ADD CONSTRAINT "node_subcategories_slug_unique" UNIQUE("slug");