CREATE TABLE "npm_package_node_subcategory" (
	"npm_package_id" text NOT NULL,
	"node_subcategory_id" text NOT NULL,
	CONSTRAINT "npm_package_node_subcategory_npm_package_id_unique" UNIQUE("npm_package_id"),
	CONSTRAINT "npm_package_node_subcategory_npm_package_id_node_subcategory_id_unique" UNIQUE("npm_package_id","node_subcategory_id")
);
--> statement-breakpoint
ALTER TABLE "npm_package_node_subcategory" ADD CONSTRAINT "npm_package_node_subcategory_npm_package_id_npm_packages_id_fk" FOREIGN KEY ("npm_package_id") REFERENCES "public"."npm_packages"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "npm_package_node_subcategory" ADD CONSTRAINT "npm_package_node_subcategory_node_subcategory_id_node_subcategories_id_fk" FOREIGN KEY ("node_subcategory_id") REFERENCES "public"."node_subcategories"("id") ON DELETE no action ON UPDATE no action;