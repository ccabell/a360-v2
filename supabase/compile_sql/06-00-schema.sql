-- Phase 06: Add pairing_tier to item_relationships (per D-01)
-- Pairing tier is the business/recommendation decision — orthogonal to
-- relationship_type (clinical descriptor) and relationship_strength (evidence level).

ALTER TABLE item_relationships
ADD COLUMN IF NOT EXISTS pairing_tier TEXT
CHECK (pairing_tier IN ('canonical','common','conditional','compatible_only','do_not_market','rejected'));

COMMENT ON COLUMN item_relationships.pairing_tier IS 'Business/recommendation tier — orthogonal to relationship_type (clinical) and relationship_strength (evidence). Per Phase 06 pairing-engine.';
