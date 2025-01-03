CREATE TABLE "npm_packages" (
	"id" text PRIMARY KEY DEFAULT 'npmpkg_' || nanoid() NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"license" text,
	"homepage_url" text,
	"repository_url" text,
	"bugs_url" text,
	"npm_url" text,
	"dependents" integer,
	"is_insecure" boolean DEFAULT false,
	"publisher_name" text,
	"publisher_email" text,
	"popularity" numeric,
	"quality" numeric,
	"maintenance" numeric,
	"final_score" numeric,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now(),
	CONSTRAINT "npm_packages_name_unique" UNIQUE("name")
);