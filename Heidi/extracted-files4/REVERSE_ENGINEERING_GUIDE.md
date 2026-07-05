# Reverse Engineering Toolkit — Usage Guide

## Setup
```bash
cd /mnt/user-data/outputs
chmod +x reverse-engineer-toolkit.py
```

## Usage Patterns

### 1. Analyze the Heidi Download (One-Time Reference)
```bash
python3 reverse-engineer-toolkit.py \
  --path /home/claude/heidi \
  --output heidi-analysis.json \
  --verbose
```

**What it does:**
- Reads all `.js` bundles in `heidi/scripts/`
- Extracts components, APIs, design tokens, analytics events
- Saves structured JSON with everything found
- Prints aggregated findings

**Output:** `heidi-analysis.json` — your reference spec in JSON.

---

### 2. Analyze Your Own Implementation (Ongoing)
After building your Evidence Ask, export the production bundle:
```bash
cd /path/to/a360-v2
npm run build
# Extract to a temp dir
mkdir -p /tmp/a360-build-analysis
cp .next/static/chunks/*.js /tmp/a360-build-analysis/

# Analyze it
python3 reverse-engineer-toolkit.py \
  --path /tmp/a360-build-analysis \
  --output a360-impl-analysis.json
```

**Output:** `a360-impl-analysis.json` — your implementation's actual structure.

---

### 3. Compare Reference vs Implementation
```bash
python3 reverse-engineer-toolkit.py \
  --compare heidi-analysis.json a360-impl-analysis.json \
  --output comparison.json
```

**What it does:**
- Compares components: which ones you've built, which you're missing
- Compares design tokens: colors, spacing, typography — do yours match?
- Compares APIs: which endpoints you've implemented
- Generates a gap report

**Output:** `comparison.json` + printed summary like:
```
================================================================================
COMPONENT COVERAGE
================================================================================
Found:     8/12 (66.7%)
Gaps:      SourceCard, AnswersHub, EvidenceDemoInput, ...
Extras:    CustomChip, ExtractedAnswer

================================================================================
API ENDPOINTS
================================================================================
Found:     2 / 3
Gaps:      /api/ask
Extras:    /api/custom

================================================================================
DESIGN TOKENS (TAILWIND)
================================================================================
colors         Gaps: text-muted-foreground, bg-accent, ...
spacing        Gaps: gap-2.5, px-4, ...
typography    Gaps: text-sm, font-medium, ...
```

---

## What Each Analysis Contains

### heidi-analysis.json structure:
```json
{
  "timestamp": "2026-06-12T...",
  "source": "/home/claude/heidi/scripts",
  "components": {
    "EvidenceDemoInput": {
      "module_id": "72772",
      "classnames": ["flex flex-wrap items-center...", "rounded-xl...", ...],
      "event_handlers": ["onChange", "onClick", "onSubmit"],
      "api_calls": ["/api/ask", "POST"],
      "state_hooks": ["useState", "useRef", "useCallback"]
    },
    "SourceCard": { ... },
    ...
  },
  "design_tokens": {
    "colors": ["text-muted-foreground", "bg-accent", "border-border", ...],
    "spacing": ["px-4", "py-3", "gap-2.5", ...],
    "typography": ["text-sm", "font-medium", ...],
    "shadows": ["shadow-sm"],
    "borders": ["rounded-xl", "border-border"]
  },
  "tailwind_classes": {
    "px-4": 12,           ← frequency
    "rounded-xl": 8,
    "flex": 45,
    ...
  },
  "css_variables": ["--color-base", "--spacing-md", ...],
  "api_endpoints": ["/api/ask", "/api/search", "..."],
  "analytics_events": ["evidence_unauth_message_sent", "citation_click", ...],
  "data_flow": {
    "request_body_keys": ["question", "surface", "session_id"],
    "response_event_types": ["status", "sources", "token", "citations", "done"],
    "streaming_indicators": ["EventSource", "ReadableStream"],
    "_indicators": {
      "has_sse": true,
      "has_fetch_stream": false,
      "likely_streaming": true
    }
  },
  "user_flows": [
    {
      "name": "Ask Question",
      "steps": ["User types...", "POST...", "SSE stream...", ...],
      "involves_streaming": true,
      "involves_persistence": true
    }
  ]
}
```

### comparison.json structure:
```json
{
  "reference_source": "heidi",
  "implementation_source": "a360",
  "coverage": {
    "components": {
      "found": ["Input", "Button", "Card"],
      "count": 3,
      "percentage": 75.0
    },
    "apis": {
      "found": ["/api/ask"],
      "count": 1
    },
    "tokens_colors": 18
  },
  "gaps": {
    "components": ["EvidenceDemoInput", "SourceCard"],
    "apis": ["/api/search"],
    "tokens_colors": ["text-secondary", "bg-sand-75"]
  },
  "extras": {
    "components": ["CustomAlert"],
    "apis": ["/api/custom"],
    "tokens_colors": []
  },
  "summary": {
    "total_reference_components": 4,
    "total_impl_components": 5,
    "match_percentage": 75.0
  }
}
```

---

## Interpretation

### Reading the Comparison

**High match % (>80%):** You've captured the main structure. Gaps are nice-to-haves.

**Medium match % (50-80%):** Core components are there, but some UX details missing. Prioritize gaps.

**Low match % (<50%):** Either:
  - The reference and implementation are genuinely different (ok if intentional)
  - The implementation is incomplete (halt, rebuild the gaps)
  - The analysis missed components (possible if the code is structured differently — inspect manually)

### Using Gaps to Drive Work

The `gaps` section is your **to-do list**:
```
Gap: "EvidenceDemoInput" component
→ Check: Do you have <Ask input with suggestions>?
→ If no: That's a code gap. Build it.
→ If yes: The pattern detector didn't find it (different name?). Rename or remap.

Gap: "/api/ask" endpoint
→ Check: Do you have POST /api/ask?
→ If no: That's the 01-02 plan. Execute it.
→ If yes: The bundler didn't export it. Check your build config.

Gap: "text-muted-foreground" token
→ Check: Do you use that token or an equivalent?
→ If no: Add it to your Tailwind config.
→ If equivalent: Mark as resolved (rename in comparison).
```

---

## Running a Regular Compare (CI/CD Integration)

After each phase, regenerate the analysis:

```bash
#!/bin/bash
# compare-ci.sh

# Build your current code
npm run build

# Extract and analyze
python3 reverse-engineer-toolkit.py \
  --path .next/static/chunks \
  --output a360-analysis-latest.json

# Compare against reference
python3 reverse-engineer-toolkit.py \
  --compare heidi-analysis.json a360-analysis-latest.json \
  --output comparison-latest.json

# Check thresholds
MATCH=$(jq '.summary.match_percentage' comparison-latest.json)
if (( $(echo "$MATCH < 75" | bc -l) )); then
  echo "⚠️  Coverage below 75%: $MATCH%"
  echo "Gaps:"
  jq '.gaps' comparison-latest.json
  exit 1
fi

echo "✓ Coverage at $MATCH%"
exit 0
```

Then in your deploy CI: `bash compare-ci.sh` before merging.

---

## Advanced: Custom Matchers

Want to detect components by a different pattern? Edit the toolkit:

```python
# In _find_components(), add:
component_patterns = [
    'EvidenceDemoInput',  # your custom name
    'AskExperience',      # your extraction
    'CitationChip',       # your component
    ...
]
```

Or detect by a function signature pattern you know:

```python
# In _find_components(), replace the loop with:
def _find_custom_component(self, content: str, name: str) -> Optional[str]:
    # E.g., detect "export const MyComponent = () => { ... }"
    pattern = rf'export\s+const\s+{name}\s*=\s*\([^)]*\)\s*=>\s*\{{'
    match = re.search(pattern, content)
    return match.group(0)[:500] if match else None
```

---

## Troubleshooting

**Q: "No components found"**
→ The bundle names or structure differ. Manually inspect `heidi_download/scripts/` and note which files have the component code, then add those file names to the toolkit's manual scan.

**Q: "Comparison shows 0% but I built the feature"**
→ Component names differ. Compare manually: did you name it `AskExperience` but the reference calls it `EvidenceInput`? Remap in the comparison.

**Q: "API endpoints not detected"**
→ The API might be built as a string constant. Try: `grep -o '/api/[a-z]*' scripts/*.js` and add results to the toolkit's allowlist.

**Q: "Design tokens mismatch"**
→ The toolkit looks for Tailwind patterns. If you use CSS modules or CSS-in-JS, customize the token extractors.

---

## One-Time Setup for You

1. Run the toolkit on `heidi_download/` now → save as `heidi-reference.json`
2. Commit this to the repo: `git add heidi-reference.json`
3. After each phase (01-02, 01-03, 01-04), regenerate your analysis and compare
4. Use the gap report to verify completeness before demo

```bash
git add heidi-reference.json
git commit -m "Reference: Heidi Evidence Ask structure (reverse-engineered)"

# After Phase 01 complete:
npm run build
python3 reverse-engineer-toolkit.py --path .next/static/chunks --output a360-phase01.json
python3 reverse-engineer-toolkit.py --compare heidi-reference.json a360-phase01.json
# Review comparison.json, iterate on gaps
```

---

## Output Format — Save & Iterate

All `.json` files are in `/mnt/user-data/outputs/` so you can:
- **Track over time:** `heidi-reference.json`, `a360-phase01.json`, `a360-phase02.json`, etc.
- **Build a regression suite:** Run the compare after every commit
- **Automate quality gates:** Block merge if coverage drops below threshold
- **Audit completeness:** "Are we shipping all the components Heidi has?" ← one JSON query

```bash
jq '.summary' a360-phase01.json
# {
#   "total_reference_components": 12,
#   "total_impl_components": 10,
#   "match_percentage": 83.33
# }
```
