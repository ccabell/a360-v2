"""
Generate 12-03-combination-fuel-updates.sql from batch files.

Reads all 5 batch files, extracts JSON blocks, and writes UPDATE (for 12-01 seeded rows)
or INSERT WHERE NOT EXISTS (for the 21 new rows) statements.
"""

import json
import re
import os

BATCH_DIR = os.path.join(os.path.dirname(__file__), '..', 'REVIEW_QUEUE', 'combination_fuel')
OUT_PATH = os.path.join(os.path.dirname(__file__), '..', 'supabase', 'compile_sql', '12-03-combination-fuel-updates.sql')

BATCH_FILES = [
    'canonical_batch.md',
    'common_neurotoxin_sculptra_batch.md',
    'common_neurotoxin_skinvive_batch.md',
    'common_ha_sculptra_batch.md',
    'common_remaining_batch.md',
]

# Rows seeded by 12-01 (these get UPDATE statements)
SEEDED_BY_12_01 = {
    'botox_cosmetic__juvederm_vollure_xc',
    'botox_cosmetic__juvederm_voluma_xc',
    'botox_cosmetic__restylane_lyft',
    'botox_cosmetic__rha_redensity',
    'botox_cosmetic__sculptra_aesthetic',
    'botox_cosmetic__skinvive_by_juvederm',
    'daxxify__juvederm_vollure_xc',
    'daxxify__juvederm_voluma_xc',
    'daxxify__restylane_lyft',
    'daxxify__rha_redensity',
    'daxxify__skinvive_by_juvederm',
    'dysport__juvederm_vollure_xc',
    'dysport__juvederm_voluma_xc',
    'dysport__restylane_lyft',
    'dysport__rha_redensity',
    'dysport__skinvive_by_juvederm',
}


def extract_json_blocks(filepath):
    """Extract all JSON blocks from a markdown batch file."""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Find all ```json ... ``` blocks
    pattern = re.compile(r'```json\s*\n(.*?)\n```', re.DOTALL)
    matches = pattern.findall(content)

    docs = []
    for match in matches:
        try:
            doc = json.loads(match)
            if doc.get('fuel_type') == 'combination' and doc.get('pair_key'):
                docs.append(doc)
        except json.JSONDecodeError as e:
            print(f"WARNING: JSON parse error in {filepath}: {e}")
            print(f"Snippet: {match[:100]}")
    return docs


def escape_sql_string(s):
    """Escape a string for use in a SQL literal (single-quote escaping)."""
    return s.replace("'", "''")


def doc_to_sql_literal(doc):
    """Convert a fuel doc dict to a PostgreSQL JSONB literal string."""
    json_str = json.dumps(doc, ensure_ascii=False, separators=(',', ':'))
    return escape_sql_string(json_str)


def generate_update(doc, pair_num):
    pair_key = doc['pair_key']
    json_literal = doc_to_sql_literal(doc)
    sql = f"""
-- Pair {pair_num}: {doc.get('patient_facing_name', pair_key)} ({pair_key})
-- Review status: PENDING
-- Tier: {doc.get('fuel_type', 'combination')} | Evidence: {doc.get('evidence_level', 'unknown')}
UPDATE agent_fuel_documents
SET
    content = '{json_literal}'::jsonb,
    status  = 'draft'
WHERE fuel_type = 'pairing_fuel'
  AND content->>'pair_key' = '{pair_key}';
"""
    return sql


def generate_insert(doc, pair_num):
    pair_key = doc['pair_key']
    json_literal = doc_to_sql_literal(doc)
    sql = f"""
-- Pair {pair_num}: {doc.get('patient_facing_name', pair_key)} ({pair_key})
-- Review status: PENDING
-- Tier: {doc.get('fuel_type', 'combination')} | Evidence: {doc.get('evidence_level', 'unknown')}
-- NEW ROW (not seeded by 12-01) — INSERT WHERE NOT EXISTS
INSERT INTO agent_fuel_documents (fuel_type, status, content, created_at, updated_at)
SELECT
    'pairing_fuel',
    'draft',
    '{json_literal}'::jsonb,
    NOW(),
    NOW()
WHERE NOT EXISTS (
    SELECT 1 FROM agent_fuel_documents
    WHERE fuel_type = 'pairing_fuel'
      AND content->>'pair_key' = '{pair_key}'
);
"""
    return sql


def main():
    all_docs = []
    for batch_file in BATCH_FILES:
        path = os.path.join(BATCH_DIR, batch_file)
        docs = extract_json_blocks(path)
        print(f"  {batch_file}: {len(docs)} docs extracted")
        all_docs.extend(docs)

    print(f"\nTotal docs extracted: {len(all_docs)}")

    # Deduplicate by pair_key (preserve order)
    seen = set()
    unique_docs = []
    for doc in all_docs:
        pk = doc['pair_key']
        if pk not in seen:
            seen.add(pk)
            unique_docs.append(doc)
    print(f"Unique pair_keys: {len(unique_docs)}")

    header = """\
-- =============================================================================
-- Phase 12-03: Combination Fuel Document Content Updates
-- Updates all 37 pairing_fuel rows in agent_fuel_documents
-- with enriched canonical JSON content from REVIEW_QUEUE/combination_fuel/
-- =============================================================================
-- IDEMPOTENT: Safe to run multiple times (UPDATEs overwrite content; INSERTs skip if exists)
-- STATUS: PENDING CHRIS REVIEW — do not execute until COMBINATION_FUEL_REVIEW.md approved
-- DEPENDS ON: 12-01-fuel-doc-schema-unification.sql (must run first to seed 16 rows)
-- TABLE: agent_fuel_documents (NOT gl_agent_fuel_documents)
-- JSON COLUMN: content (NOT agent_fuel_json)
-- STATUS COLUMN: status (values: draft, active, archived)
-- IDEMPOTENCY KEY: content->>'pair_key'
--
-- STRUCTURE:
--   - 16 UPDATE statements: rows seeded by 12-01 (empty content → enriched content)
--   - 21 INSERT WHERE NOT EXISTS: new pairs not covered by 12-01
--   - 1 verification SELECT at end
-- =============================================================================

"""

    parts = [header]

    update_count = 0
    insert_count = 0
    for i, doc in enumerate(unique_docs, 1):
        pair_key = doc['pair_key']
        if pair_key in SEEDED_BY_12_01:
            parts.append(generate_update(doc, i))
            update_count += 1
        else:
            parts.append(generate_insert(doc, i))
            insert_count += 1

    verification = """
-- =============================================================================
-- VERIFICATION: Run after executing all statements above
-- All 37 pairs should have template_version 1.0, non-empty content, and do_not_say populated
-- =============================================================================
SELECT
    content->>'pair_key'                                        AS pair_key,
    content->>'template_version'                                AS version,
    content->>'evidence_level'                                  AS evidence,
    content->>'patient_facing_name'                             AS patient_facing_name,
    LENGTH(content->>'why_together') > 0                        AS has_why_together,
    LENGTH(content->>'clinical_rationale') > 0                  AS has_rationale,
    jsonb_array_length(content->'do_not_say'->'universal')      AS universal_dontsay_count,
    jsonb_array_length(content->'do_not_say'->'pair_specific')  AS pair_specific_dontsay_count,
    content->'do_not_say' IS NOT NULL                           AS has_do_not_say,
    status
FROM agent_fuel_documents
WHERE fuel_type = 'pairing_fuel'
ORDER BY content->>'pair_key';
"""
    parts.append(verification)

    sql_output = ''.join(parts)

    with open(OUT_PATH, 'w', encoding='utf-8') as f:
        f.write(sql_output)

    print(f"\nSQL written to: {OUT_PATH}")
    print(f"  UPDATE statements (12-01 seeded rows): {update_count}")
    print(f"  INSERT statements (new rows): {insert_count}")
    print(f"  Total pair statements: {update_count + insert_count}")


if __name__ == '__main__':
    main()
