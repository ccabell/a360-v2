/**
 * Migration: add page_number column to evidence_links
 *
 * Requires a direct PostgreSQL connection string (not available via REST API).
 * Run with:
 *   DB_URL="postgresql://postgres.{ref}:{password}@aws-0-us-east-1.pooler.supabase.com:6543/postgres" \
 *   npx tsx scripts/migrate-add-page-number.ts
 *
 * OR run via Supabase dashboard SQL editor:
 *   ALTER TABLE evidence_links ADD COLUMN IF NOT EXISTS page_number INT;
 */

import postgres from "postgres";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env.local") });

const DB_URL = process.env.DB_URL;

if (!DB_URL) {
  console.error(
    "DB_URL environment variable required.\n" +
      "This migration needs a direct Postgres connection string.\n\n" +
      "Alternative: Run this SQL in Supabase dashboard SQL editor:\n" +
      "  ALTER TABLE evidence_links ADD COLUMN IF NOT EXISTS page_number INT;\n"
  );
  process.exit(1);
}

const sql = postgres(DB_URL, { ssl: "require", max: 1 });

async function migrate() {
  try {
    await sql`ALTER TABLE evidence_links ADD COLUMN IF NOT EXISTS page_number INT`;
    console.log("Migration applied: page_number INT column added to evidence_links");

    const [row] = await sql`
      SELECT column_name FROM information_schema.columns
      WHERE table_name = 'evidence_links' AND column_name = 'page_number'
    `;
    if (row) {
      console.log("Verified: page_number column exists.");
    } else {
      console.error("ERROR: column still not found after migration.");
      process.exit(1);
    }
  } finally {
    await sql.end();
  }
}

migrate();
