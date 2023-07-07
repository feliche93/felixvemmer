-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TABLE IF NOT EXISTS "directus_activity" (
	"id" serial PRIMARY KEY NOT NULL,
	"action" varchar(45) NOT NULL,
	"user" uuid,
	"timestamp" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"ip" varchar(50),
	"user_agent" varchar(255),
	"collection" varchar(64) NOT NULL,
	"item" varchar(255) NOT NULL,
	"comment" text,
	"origin" varchar(255)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "directus_relations" (
	"id" serial PRIMARY KEY NOT NULL,
	"many_collection" varchar(64) NOT NULL,
	"many_field" varchar(64) NOT NULL,
	"one_collection" varchar(64),
	"one_field" varchar(64),
	"one_collection_field" varchar(64),
	"one_allowed_collections" text,
	"junction_field" varchar(64),
	"sort_field" varchar(64),
	"one_deselect_action" varchar(255) DEFAULT 'nullify'::character varying NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "directus_webhooks" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"method" varchar(10) DEFAULT 'POST'::character varying NOT NULL,
	"url" varchar(255) NOT NULL,
	"status" varchar(10) DEFAULT 'active'::character varying NOT NULL,
	"data" boolean DEFAULT true NOT NULL,
	"actions" varchar(100) NOT NULL,
	"collections" varchar(255) NOT NULL,
	"headers" json
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "directus_collections" (
	"collection" varchar(64) PRIMARY KEY NOT NULL,
	"icon" varchar(30),
	"note" text,
	"display_template" varchar(255),
	"hidden" boolean DEFAULT false NOT NULL,
	"singleton" boolean DEFAULT false NOT NULL,
	"translations" json,
	"archive_field" varchar(64),
	"archive_app_filter" boolean DEFAULT true NOT NULL,
	"archive_value" varchar(255),
	"unarchive_value" varchar(255),
	"sort_field" varchar(64),
	"accountability" varchar(255) DEFAULT 'all'::character varying,
	"color" varchar(255),
	"item_duplication_fields" json,
	"sort" integer,
	"group" varchar(64),
	"collapse" varchar(255) DEFAULT 'open'::character varying NOT NULL,
	"preview_url" varchar(255)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "directus_panels" (
	"id" uuid PRIMARY KEY NOT NULL,
	"dashboard" uuid NOT NULL,
	"name" varchar(255),
	"icon" varchar(30) DEFAULT NULL::character varying,
	"color" varchar(10),
	"show_header" boolean DEFAULT false NOT NULL,
	"note" text,
	"type" varchar(255) NOT NULL,
	"position_x" integer NOT NULL,
	"position_y" integer NOT NULL,
	"width" integer NOT NULL,
	"height" integer NOT NULL,
	"options" json,
	"date_created" timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
	"user_created" uuid
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "directus_presets" (
	"id" serial PRIMARY KEY NOT NULL,
	"bookmark" varchar(255),
	"user" uuid,
	"role" uuid,
	"collection" varchar(64),
	"search" varchar(100),
	"layout" varchar(100) DEFAULT 'tabular'::character varying,
	"layout_query" json,
	"layout_options" json,
	"refresh_interval" integer,
	"filter" json,
	"icon" varchar(30) DEFAULT 'bookmark'::character varying,
	"color" varchar(255)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "directus_migrations" (
	"version" varchar(255) PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"timestamp" timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "directus_notifications" (
	"id" serial PRIMARY KEY NOT NULL,
	"timestamp" timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
	"status" varchar(255) DEFAULT 'inbox'::character varying,
	"recipient" uuid NOT NULL,
	"sender" uuid,
	"subject" varchar(255) NOT NULL,
	"message" text,
	"collection" varchar(64),
	"item" varchar(255)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "directus_sessions" (
	"token" varchar(64) PRIMARY KEY NOT NULL,
	"user" uuid,
	"expires" timestamp with time zone NOT NULL,
	"ip" varchar(255),
	"user_agent" varchar(255),
	"share" uuid,
	"origin" varchar(255)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "directus_translations" (
	"id" uuid PRIMARY KEY NOT NULL,
	"language" varchar(255) NOT NULL,
	"key" varchar(255) NOT NULL,
	"value" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "directus_settings" (
	"id" serial PRIMARY KEY NOT NULL,
	"project_name" varchar(100) DEFAULT 'Directus'::character varying NOT NULL,
	"project_url" varchar(255),
	"project_color" varchar(50) DEFAULT NULL::character varying,
	"project_logo" uuid,
	"public_foreground" uuid,
	"public_background" uuid,
	"public_note" text,
	"auth_login_attempts" integer DEFAULT 25,
	"auth_password_policy" varchar(100),
	"storage_asset_transform" varchar(7) DEFAULT 'all'::character varying,
	"storage_asset_presets" json,
	"custom_css" text,
	"storage_default_folder" uuid,
	"basemaps" json,
	"mapbox_key" varchar(255),
	"module_bar" json,
	"project_descriptor" varchar(100),
	"default_language" varchar(255) DEFAULT 'en-US'::character varying NOT NULL,
	"custom_aspect_ratios" json
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "directus_dashboards" (
	"id" uuid PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"icon" varchar(30) DEFAULT 'dashboard'::character varying NOT NULL,
	"note" text,
	"date_created" timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
	"user_created" uuid,
	"color" varchar(255)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "posts_content" (
	"id" serial PRIMARY KEY NOT NULL,
	"posts_id" uuid,
	"item" varchar(255),
	"collection" varchar(255)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "directus_fields" (
	"id" serial PRIMARY KEY NOT NULL,
	"collection" varchar(64) NOT NULL,
	"field" varchar(64) NOT NULL,
	"special" varchar(64),
	"interface" varchar(64),
	"options" json,
	"display" varchar(64),
	"display_options" json,
	"readonly" boolean DEFAULT false NOT NULL,
	"hidden" boolean DEFAULT false NOT NULL,
	"sort" integer,
	"width" varchar(30) DEFAULT 'full'::character varying,
	"translations" json,
	"note" text,
	"conditions" json,
	"required" boolean DEFAULT false,
	"group" varchar(64),
	"validation" json,
	"validation_message" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "block_image" (
	"id" uuid PRIMARY KEY NOT NULL,
	"user_created" uuid,
	"date_created" timestamp with time zone,
	"user_updated" uuid,
	"date_updated" timestamp with time zone,
	"image" uuid
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "posts" (
	"id" uuid PRIMARY KEY NOT NULL,
	"status" varchar(255) DEFAULT 'draft'::character varying NOT NULL,
	"sort" integer,
	"user_created" uuid,
	"date_created" timestamp with time zone,
	"user_updated" uuid,
	"date_updated" timestamp with time zone,
	"title" text,
	"excerpt" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "directus_permissions" (
	"id" serial PRIMARY KEY NOT NULL,
	"role" uuid,
	"collection" varchar(64) NOT NULL,
	"action" varchar(10) NOT NULL,
	"permissions" json,
	"validation" json,
	"presets" json,
	"fields" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "directus_shares" (
	"id" uuid PRIMARY KEY NOT NULL,
	"name" varchar(255),
	"collection" varchar(64),
	"item" varchar(255),
	"role" uuid,
	"password" varchar(255),
	"user_created" uuid,
	"date_created" timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
	"date_start" timestamp with time zone,
	"date_end" timestamp with time zone,
	"times_used" integer DEFAULT 0,
	"max_uses" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "block_code" (
	"id" uuid PRIMARY KEY NOT NULL,
	"user_created" uuid,
	"date_created" timestamp with time zone,
	"user_updated" uuid,
	"date_updated" timestamp with time zone,
	"code" varchar(255)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "directus_roles" (
	"id" uuid PRIMARY KEY NOT NULL,
	"name" varchar(100) NOT NULL,
	"icon" varchar(30) DEFAULT 'supervised_user_circle'::character varying NOT NULL,
	"description" text,
	"ip_access" text,
	"enforce_tfa" boolean DEFAULT false NOT NULL,
	"admin_access" boolean DEFAULT false NOT NULL,
	"app_access" boolean DEFAULT true NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "block_rich_text" (
	"id" uuid PRIMARY KEY NOT NULL,
	"user_created" uuid,
	"date_created" timestamp with time zone,
	"user_updated" uuid,
	"date_updated" timestamp with time zone,
	"content" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "directus_users" (
	"id" uuid PRIMARY KEY NOT NULL,
	"first_name" varchar(50),
	"last_name" varchar(50),
	"email" varchar(128),
	"password" varchar(255),
	"location" varchar(255),
	"title" varchar(50),
	"description" text,
	"tags" json,
	"avatar" uuid,
	"language" varchar(255) DEFAULT NULL::character varying,
	"theme" varchar(20) DEFAULT 'auto'::character varying,
	"tfa_secret" varchar(255),
	"status" varchar(16) DEFAULT 'active'::character varying NOT NULL,
	"role" uuid,
	"token" varchar(255),
	"last_access" timestamp with time zone,
	"last_page" varchar(255),
	"provider" varchar(128) DEFAULT 'default'::character varying NOT NULL,
	"external_identifier" varchar(255),
	"auth_data" json,
	"email_notifications" boolean DEFAULT true
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "directus_operations" (
	"id" uuid PRIMARY KEY NOT NULL,
	"name" varchar(255),
	"key" varchar(255) NOT NULL,
	"type" varchar(255) NOT NULL,
	"position_x" integer NOT NULL,
	"position_y" integer NOT NULL,
	"options" json,
	"resolve" uuid,
	"reject" uuid,
	"flow" uuid NOT NULL,
	"date_created" timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
	"user_created" uuid
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "directus_folders" (
	"id" uuid PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"parent" uuid
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "directus_flows" (
	"id" uuid PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"icon" varchar(30),
	"color" varchar(255),
	"description" text,
	"status" varchar(255) DEFAULT 'active'::character varying NOT NULL,
	"trigger" varchar(255),
	"accountability" varchar(255) DEFAULT 'all'::character varying,
	"options" json,
	"operation" uuid,
	"date_created" timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
	"user_created" uuid
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "directus_files" (
	"id" uuid PRIMARY KEY NOT NULL,
	"storage" varchar(255) NOT NULL,
	"filename_disk" varchar(255),
	"filename_download" varchar(255) NOT NULL,
	"title" varchar(255),
	"type" varchar(255),
	"folder" uuid,
	"uploaded_by" uuid,
	"uploaded_on" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"modified_by" uuid,
	"modified_on" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"charset" varchar(50),
	"filesize" bigint,
	"width" integer,
	"height" integer,
	"duration" integer,
	"embed" varchar(200),
	"description" text,
	"location" text,
	"tags" text,
	"metadata" json
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "directus_revisions" (
	"id" serial PRIMARY KEY NOT NULL,
	"activity" integer NOT NULL,
	"collection" varchar(64) NOT NULL,
	"item" varchar(255) NOT NULL,
	"data" json,
	"delta" json,
	"parent" integer
);
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "directus_users_email_unique" ON "directus_users" ("email");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "directus_users_external_identifier_unique" ON "directus_users" ("external_identifier");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "directus_users_token_unique" ON "directus_users" ("token");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "directus_operations_reject_unique" ON "directus_operations" ("reject");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "directus_operations_resolve_unique" ON "directus_operations" ("resolve");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "directus_flows_operation_unique" ON "directus_flows" ("operation");--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "directus_collections" ADD CONSTRAINT "directus_collections_group_foreign" FOREIGN KEY ("group") REFERENCES "directus_collections"("collection") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "directus_panels" ADD CONSTRAINT "directus_panels_dashboard_foreign" FOREIGN KEY ("dashboard") REFERENCES "directus_dashboards"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "directus_panels" ADD CONSTRAINT "directus_panels_user_created_foreign" FOREIGN KEY ("user_created") REFERENCES "directus_users"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "directus_presets" ADD CONSTRAINT "directus_presets_user_foreign" FOREIGN KEY ("user") REFERENCES "directus_users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "directus_presets" ADD CONSTRAINT "directus_presets_role_foreign" FOREIGN KEY ("role") REFERENCES "directus_roles"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "directus_notifications" ADD CONSTRAINT "directus_notifications_recipient_foreign" FOREIGN KEY ("recipient") REFERENCES "directus_users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "directus_notifications" ADD CONSTRAINT "directus_notifications_sender_foreign" FOREIGN KEY ("sender") REFERENCES "directus_users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "directus_sessions" ADD CONSTRAINT "directus_sessions_user_foreign" FOREIGN KEY ("user") REFERENCES "directus_users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "directus_sessions" ADD CONSTRAINT "directus_sessions_share_foreign" FOREIGN KEY ("share") REFERENCES "directus_shares"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "directus_settings" ADD CONSTRAINT "directus_settings_project_logo_foreign" FOREIGN KEY ("project_logo") REFERENCES "directus_files"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "directus_settings" ADD CONSTRAINT "directus_settings_public_foreground_foreign" FOREIGN KEY ("public_foreground") REFERENCES "directus_files"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "directus_settings" ADD CONSTRAINT "directus_settings_public_background_foreign" FOREIGN KEY ("public_background") REFERENCES "directus_files"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "directus_settings" ADD CONSTRAINT "directus_settings_storage_default_folder_foreign" FOREIGN KEY ("storage_default_folder") REFERENCES "directus_folders"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "directus_dashboards" ADD CONSTRAINT "directus_dashboards_user_created_foreign" FOREIGN KEY ("user_created") REFERENCES "directus_users"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "posts_content" ADD CONSTRAINT "posts_content_posts_id_foreign" FOREIGN KEY ("posts_id") REFERENCES "posts"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "block_image" ADD CONSTRAINT "block_image_user_created_foreign" FOREIGN KEY ("user_created") REFERENCES "directus_users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "block_image" ADD CONSTRAINT "block_image_user_updated_foreign" FOREIGN KEY ("user_updated") REFERENCES "directus_users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "block_image" ADD CONSTRAINT "block_image_image_foreign" FOREIGN KEY ("image") REFERENCES "directus_files"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "posts" ADD CONSTRAINT "posts_user_updated_foreign" FOREIGN KEY ("user_updated") REFERENCES "directus_users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "posts" ADD CONSTRAINT "posts_user_created_foreign" FOREIGN KEY ("user_created") REFERENCES "directus_users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "directus_permissions" ADD CONSTRAINT "directus_permissions_role_foreign" FOREIGN KEY ("role") REFERENCES "directus_roles"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "directus_shares" ADD CONSTRAINT "directus_shares_collection_foreign" FOREIGN KEY ("collection") REFERENCES "directus_collections"("collection") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "directus_shares" ADD CONSTRAINT "directus_shares_role_foreign" FOREIGN KEY ("role") REFERENCES "directus_roles"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "directus_shares" ADD CONSTRAINT "directus_shares_user_created_foreign" FOREIGN KEY ("user_created") REFERENCES "directus_users"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "block_code" ADD CONSTRAINT "block_code_user_created_foreign" FOREIGN KEY ("user_created") REFERENCES "directus_users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "block_code" ADD CONSTRAINT "block_code_user_updated_foreign" FOREIGN KEY ("user_updated") REFERENCES "directus_users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "block_rich_text" ADD CONSTRAINT "block_rich_text_user_updated_foreign" FOREIGN KEY ("user_updated") REFERENCES "directus_users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "block_rich_text" ADD CONSTRAINT "block_rich_text_user_created_foreign" FOREIGN KEY ("user_created") REFERENCES "directus_users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "directus_users" ADD CONSTRAINT "directus_users_role_foreign" FOREIGN KEY ("role") REFERENCES "directus_roles"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "directus_operations" ADD CONSTRAINT "directus_operations_resolve_foreign" FOREIGN KEY ("resolve") REFERENCES "directus_operations"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "directus_operations" ADD CONSTRAINT "directus_operations_reject_foreign" FOREIGN KEY ("reject") REFERENCES "directus_operations"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "directus_operations" ADD CONSTRAINT "directus_operations_flow_foreign" FOREIGN KEY ("flow") REFERENCES "directus_flows"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "directus_operations" ADD CONSTRAINT "directus_operations_user_created_foreign" FOREIGN KEY ("user_created") REFERENCES "directus_users"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "directus_folders" ADD CONSTRAINT "directus_folders_parent_foreign" FOREIGN KEY ("parent") REFERENCES "directus_folders"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "directus_flows" ADD CONSTRAINT "directus_flows_user_created_foreign" FOREIGN KEY ("user_created") REFERENCES "directus_users"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "directus_files" ADD CONSTRAINT "directus_files_uploaded_by_foreign" FOREIGN KEY ("uploaded_by") REFERENCES "directus_users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "directus_files" ADD CONSTRAINT "directus_files_modified_by_foreign" FOREIGN KEY ("modified_by") REFERENCES "directus_users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "directus_files" ADD CONSTRAINT "directus_files_folder_foreign" FOREIGN KEY ("folder") REFERENCES "directus_folders"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "directus_revisions" ADD CONSTRAINT "directus_revisions_parent_foreign" FOREIGN KEY ("parent") REFERENCES "directus_revisions"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "directus_revisions" ADD CONSTRAINT "directus_revisions_activity_foreign" FOREIGN KEY ("activity") REFERENCES "directus_activity"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

*/