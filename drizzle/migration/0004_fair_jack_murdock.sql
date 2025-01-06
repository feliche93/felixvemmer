CREATE TABLE "node_subcategories" (
	"id" text PRIMARY KEY DEFAULT 'nsubcat_' || nanoid() NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"category_id" text,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now(),
	CONSTRAINT "node_subcategories_name_unique" UNIQUE("name")
);
--> statement-breakpoint
ALTER TABLE "node_subcategories" ADD CONSTRAINT "node_subcategories_category_id_node_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."node_categories"("id") ON DELETE no action ON UPDATE no action;