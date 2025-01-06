CREATE TABLE "node_categories" (
	"id" text PRIMARY KEY DEFAULT 'ncat_' || nanoid() NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now(),
	CONSTRAINT "node_categories_name_unique" UNIQUE("name")
);
