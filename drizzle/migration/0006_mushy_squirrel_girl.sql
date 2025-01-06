ALTER TABLE "node_categories" ALTER COLUMN "description" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "node_categories" ALTER COLUMN "created_at" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "node_categories" ALTER COLUMN "updated_at" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "node_subcategories" ALTER COLUMN "description" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "node_subcategories" ALTER COLUMN "category_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "node_subcategories" ALTER COLUMN "created_at" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "node_subcategories" ALTER COLUMN "updated_at" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "npm_packages" ALTER COLUMN "npm_url" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "npm_packages" ALTER COLUMN "dependents" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "npm_packages" ALTER COLUMN "is_insecure" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "npm_packages" ALTER COLUMN "publisher_name" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "npm_packages" ALTER COLUMN "publisher_email" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "npm_packages" ALTER COLUMN "popularity" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "npm_packages" ALTER COLUMN "quality" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "npm_packages" ALTER COLUMN "maintenance" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "npm_packages" ALTER COLUMN "final_score" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "npm_packages" ALTER COLUMN "created_at" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "npm_packages" ALTER COLUMN "updated_at" SET NOT NULL;