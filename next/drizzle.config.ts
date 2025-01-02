import * as dotenv from "dotenv";
import { defineConfig } from "drizzle-kit";

dotenv.config({ path: ".env.local" });
const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
	throw new Error("DATABASE_URL environment variable not set");
}

export default defineConfig({
	schema: "./drizzle/schema",
	out: "./drizzle/migration",
	dbCredentials: {
		url: connectionString,
	},
	dialect: "postgresql",
	casing: "snake_case",
});
