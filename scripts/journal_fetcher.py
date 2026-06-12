"""
journal_fetcher.py — PMC full-text ingestion → evidence_links

For each queued article in ingestion_queue, fetches the PMC XML,
extracts product-level clinical claims via Claude, and writes rows
to evidence_links.

Usage:
    python scripts/journal_fetcher.py [--limit 10] [--dry-run]

Env vars required:
    GL_SUPABASE_URL
    GL_SUPABASE_KEY
    ANTHROPIC_API_KEY
"""

import argparse
import os
import sys
import time
import xml.etree.ElementTree as ET
from textwrap import dedent

import anthropic
import httpx
from supabase import create_client

# ---------------------------------------------------------------------------
# Config
# ---------------------------------------------------------------------------

SUPABASE_URL = os.environ["GL_SUPABASE_URL"]
SUPABASE_KEY = os.environ["GL_SUPABASE_KEY"]
ANTHROPIC_API_KEY = os.environ["ANTHROPIC_API_KEY"]

PMC_FETCH_URL = "https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi"
NCBI_TOOL = "a360_gl_fetcher"
NCBI_EMAIL = "ccabell@aesthetics360.com"

# evidence_links.source enum value for journal articles
EVIDENCE_SOURCE = "pubmed"

# Delay between PMC requests (NCBI rate limit: 3/sec without API key, 10/sec with)
NCBI_DELAY = 0.4


# ---------------------------------------------------------------------------
# NCBI fetch
# ---------------------------------------------------------------------------

def fetch_pmc_text(pmc_url: str, client: httpx.Client) -> str | None:
    """Fetch full-text XML from PMC and return abstract + body as plain text."""
    # Extract PMC ID from URL like https://pmc.ncbi.nlm.nih.gov/articles/PMC4482214/
    parts = [p for p in pmc_url.rstrip("/").split("/") if p.startswith("PMC")]
    if not parts:
        print(f"  [warn] Cannot parse PMC ID from {pmc_url}")
        return None

    pmc_id = parts[0].replace("PMC", "")
    params = {
        "db": "pmc",
        "id": pmc_id,
        "rettype": "xml",
        "retmode": "xml",
        "tool": NCBI_TOOL,
        "email": NCBI_EMAIL,
    }

    try:
        resp = client.get(PMC_FETCH_URL, params=params, timeout=30)
        resp.raise_for_status()
    except httpx.HTTPError as e:
        print(f"  [error] PMC fetch failed for PMC{pmc_id}: {e}")
        return None

    return _xml_to_text(resp.text)


def _xml_to_text(xml_str: str) -> str:
    """Pull abstract + body text out of PMC XML, strip tags."""
    try:
        root = ET.fromstring(xml_str)
    except ET.ParseError:
        return xml_str[:8000]  # fallback: raw truncated

    chunks = []

    # Abstract
    for abstract in root.iter("abstract"):
        chunks.append(_element_text(abstract))

    # Body sections — intro, methods, results, conclusions
    target_titles = {"introduction", "methods", "results", "conclusions", "discussion", "background"}
    for sec in root.iter("sec"):
        title_el = sec.find("title")
        title = (title_el.text or "").lower() if title_el is not None else ""
        if not title or any(t in title for t in target_titles):
            chunks.append(_element_text(sec))

    text = "\n\n".join(chunks)
    # Truncate to keep within Claude context (roughly 60k chars)
    return text[:60000] if len(text) > 60000 else text


def _element_text(el: ET.Element) -> str:
    return " ".join(el.itertext()).strip()


# ---------------------------------------------------------------------------
# Claim extraction via Claude
# ---------------------------------------------------------------------------

EXTRACTION_PROMPT = dedent("""
    You are extracting structured clinical evidence from a peer-reviewed aesthetic medicine journal article.

    ARTICLE TEXT:
    {text}

    KNOWN PRODUCTS IN THE GLOBAL LIBRARY (match by name, be exact):
    {product_names}

    TASK:
    For each product explicitly mentioned in the article, extract up to 5 high-value clinical claims.
    Each claim must be:
    - Grounded in the article text (not inferred)
    - Specific to that product
    - Useful to an aesthetic injector (outcomes, safety, technique, duration, patient satisfaction)

    For each claim, identify the most relevant field_name from this list:
    efficacy, safety, duration, patient_satisfaction, technique, indication,
    combination_use, comparator, onset, mechanism, contraindication, side_effects

    Respond with a JSON array. Each element:
    {{
      "product_name": "exact product name from the list above",
      "field_name": "one of the field names above",
      "snippet": "verbatim or near-verbatim text from the article supporting this claim (max 300 chars)",
      "claimed_value": "1-sentence plain-English summary of the claim"
    }}

    If no listed products are meaningfully discussed, return [].
    Return ONLY the JSON array, no other text.
""").strip()


def extract_claims(
    text: str,
    product_names: list[str],
    anthropic_client: anthropic.Anthropic,
) -> list[dict]:
    """Call Claude to extract product-level claims from article text."""
    prompt = EXTRACTION_PROMPT.format(
        text=text,
        product_names="\n".join(f"- {n}" for n in product_names),
    )

    try:
        msg = anthropic_client.messages.create(
            model="claude-haiku-4-5-20251001",
            max_tokens=2048,
            messages=[{"role": "user", "content": prompt}],
        )
        raw = msg.content[0].text.strip()
        # Strip markdown code fences if present
        if raw.startswith("```"):
            raw = raw.split("```")[1]
            if raw.startswith("json"):
                raw = raw[4:]
        import json
        return json.loads(raw)
    except Exception as e:
        print(f"  [error] Claude extraction failed: {e}")
        return []


# ---------------------------------------------------------------------------
# Main ingestion loop
# ---------------------------------------------------------------------------

def run(limit: int, dry_run: bool) -> None:
    sb = create_client(SUPABASE_URL, SUPABASE_KEY)
    ac = anthropic.Anthropic(api_key=ANTHROPIC_API_KEY)

    # Load offerings (products) for name → id lookup
    offerings_resp = sb.table("offerings").select("id, name").execute()
    offerings = {row["name"]: row["id"] for row in offerings_resp.data}
    product_names = list(offerings.keys())
    print(f"Loaded {len(product_names)} offerings from GL")

    # Load source_registry for authority_rank lookup
    sources_resp = sb.table("source_registry").select("id, name, authority_rank").execute()
    source_authority = {row["id"]: row["authority_rank"] for row in sources_resp.data}

    # Fetch queued articles
    queue_resp = (
        sb.table("ingestion_queue")
        .select("id, source_id, url, doi, title, rights_class")
        .eq("status", "queued")
        .limit(limit)
        .execute()
    )
    queue = queue_resp.data
    print(f"Processing {len(queue)} queued articles (limit={limit})")

    inserted = 0
    skipped = 0

    with httpx.Client() as http:
        for item in queue:
            item_id = item["id"]
            url = item["url"]
            doi = item.get("doi")
            title = item.get("title", "")
            source_id = item["source_id"]
            authority_rank = source_authority.get(source_id, 2)

            print(f"\n→ {title[:80]}...")

            # Extract PMC ID for pmid field (approximation — real PMID needs separate lookup)
            pmc_parts = [p for p in url.rstrip("/").split("/") if p.startswith("PMC")]
            pmc_id = pmc_parts[0] if pmc_parts else None

            # Fetch full text
            text = fetch_pmc_text(url, http)
            time.sleep(NCBI_DELAY)

            if not text:
                print("  [skip] No text retrieved")
                skipped += 1
                if not dry_run:
                    sb.table("ingestion_queue").update({"status": "fetch_failed"}).eq("id", item_id).execute()
                continue

            print(f"  Fetched {len(text):,} chars of text")

            # Extract claims
            claims = extract_claims(text, product_names, ac)
            print(f"  Extracted {len(claims)} claims")

            if not claims:
                skipped += 1
                if not dry_run:
                    sb.table("ingestion_queue").update({"status": "no_claims"}).eq("id", item_id).execute()
                continue

            # Build source_reference citation string
            source_reference = title
            if doi:
                source_reference += f" doi:{doi}"

            # Write evidence_links rows
            rows = []
            for claim in claims:
                product_name = claim.get("product_name", "")
                offering_id = offerings.get(product_name)
                if not offering_id:
                    # Try case-insensitive match
                    offering_id = next(
                        (v for k, v in offerings.items() if k.lower() == product_name.lower()),
                        None,
                    )
                if not offering_id:
                    print(f"  [warn] No offering found for '{product_name}' — skipping claim")
                    continue

                rows.append({
                    "offering_id": offering_id,
                    "field_name": claim.get("field_name", "efficacy"),
                    "source": EVIDENCE_SOURCE,
                    "pmid": pmc_id,
                    "doi": doi,
                    "source_reference": source_reference,
                    "snippet": claim.get("snippet", "")[:500],
                    "claimed_value": claim.get("claimed_value", "")[:500],
                    "url": url,
                    "authority_rank": authority_rank,
                })

            if dry_run:
                print(f"  [dry-run] Would insert {len(rows)} evidence_links rows")
                for r in rows[:3]:
                    print(f"    {r['field_name']} / {r['claimed_value'][:60]}")
            else:
                if rows:
                    sb.table("evidence_links").insert(rows).execute()
                    inserted += len(rows)
                sb.table("ingestion_queue").update({"status": "ingested"}).eq("id", item_id).execute()

    print(f"\nDone. {inserted} evidence_links inserted, {skipped} articles skipped.")


# ---------------------------------------------------------------------------
# CLI
# ---------------------------------------------------------------------------

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Ingest PMC journal articles into evidence_links")
    parser.add_argument("--limit", type=int, default=10, help="Max articles to process (default 10)")
    parser.add_argument("--dry-run", action="store_true", help="Print output without writing to DB")
    args = parser.parse_args()

    run(limit=args.limit, dry_run=args.dry_run)
