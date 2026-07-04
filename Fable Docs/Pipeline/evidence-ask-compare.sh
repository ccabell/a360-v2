#!/bin/bash
# evidence-ask-compare.sh
# Automated comparison: your build vs Heidi reference
# Run after each phase deployment

set -e

TOOLKIT="reverse-engineer-toolkit.py"
REFERENCE="heidi-evidence-deep.json"  # Already generated from the Heidi download
BUILD_OUTPUT="a360-build-latest.json"
COMPARISON_OUTPUT="a360-vs-heidi-latest.json"
PHASE_TAG="${1:-phase-01}"

echo "════════════════════════════════════════════════════════════════════════"
echo "Evidence Ask — Automated Comparison vs Heidi Reference"
echo "════════════════════════════════════════════════════════════════════════"
echo "Phase: $PHASE_TAG"
echo

# Step 1: Build your code
echo "[1/4] Building a360-v2..."
cd /path/to/a360-v2
npm run build > /dev/null 2>&1
echo "✓ Build complete"

# Step 2: Analyze the production bundles
echo "[2/4] Analyzing your implementation..."
LARGEST_BUNDLES=$(find .next/static/chunks -name "*.js" -type f -exec ls -S {} + | head -5 | cut -d' ' -f NF)
for bundle in $LARGEST_BUNDLES; do
  python3 "$TOOLKIT" --file "$bundle" --output "$BUILD_OUTPUT" --verbose > /dev/null 2>&1
done
echo "✓ Analysis complete: $BUILD_OUTPUT"

# Step 3: Compare against reference
echo "[3/4] Comparing vs Heidi..."
python3 "$TOOLKIT" --compare "$REFERENCE" "$BUILD_OUTPUT" --output "$COMPARISON_OUTPUT" > /dev/null 2>&1
echo "✓ Comparison complete: ${COMPARISON_OUTPUT}_comparison.json"

# Step 4: Report
echo "[4/4] Generating report..."
echo

# Parse results
MATCH_PCT=$(jq '.summary.match_percentage' "${COMPARISON_OUTPUT}_comparison.json" 2>/dev/null || echo "0")
COMPONENTS_FOUND=$(jq '.coverage.components.count' "${COMPARISON_OUTPUT}_comparison.json" 2>/dev/null || echo "0")
COMPONENTS_TOTAL=$(jq '.summary.total_reference_components' "${COMPARISON_OUTPUT}_comparison.json" 2>/dev/null || echo "0")

echo "════════════════════════════════════════════════════════════════════════"
echo "RESULTS — $PHASE_TAG"
echo "════════════════════════════════════════════════════════════════════════"
echo
echo "Component Coverage:    $COMPONENTS_FOUND / $COMPONENTS_TOTAL (${MATCH_PCT}%)"
echo

# Show gaps
GAPS=$(jq -r '.gaps.components[]?' "${COMPARISON_OUTPUT}_comparison.json" 2>/dev/null | head -5)
if [ ! -z "$GAPS" ]; then
  echo "⚠️  Missing Components:"
  echo "$GAPS" | sed 's/^/  - /'
  echo
fi

# Show API gaps
API_GAPS=$(jq -r '.gaps.apis[]?' "${COMPARISON_OUTPUT}_comparison.json" 2>/dev/null | grep -v "http" | grep -v "schema.org" | head -3)
if [ ! -z "$API_GAPS" ]; then
  echo "⚠️  Missing APIs:"
  echo "$API_GAPS" | sed 's/^/  - /'
  echo
fi

# Show design token gaps (sample)
TOKEN_GAPS=$(jq -r '.gaps.tokens_colors[]?' "${COMPARISON_OUTPUT}_comparison.json" 2>/dev/null | head -3)
if [ ! -z "$TOKEN_GAPS" ]; then
  echo "⚠️  Color Token Gaps (sample):"
  echo "$TOKEN_GAPS" | sed 's/^/  - /'
  echo
fi

# Pass/fail gate
THRESHOLD=75
if (( $(echo "$MATCH_PCT >= $THRESHOLD" | bc -l) )); then
  echo "✓ PASS — Coverage at ${MATCH_PCT}% (threshold: ${THRESHOLD}%)"
  EXIT_CODE=0
else
  echo "✗ FAIL — Coverage at ${MATCH_PCT}% (threshold: ${THRESHOLD}%)"
  echo "  Review gaps above and iterate"
  EXIT_CODE=1
fi

echo
echo "════════════════════════════════════════════════════════════════════════"
echo "Full report: ${COMPARISON_OUTPUT}_comparison.json"
echo "════════════════════════════════════════════════════════════════════════"
echo

# Archive this run
mkdir -p comparison-history
cp "${BUILD_OUTPUT}" "comparison-history/${BUILD_OUTPUT}-${PHASE_TAG}"
cp "${COMPARISON_OUTPUT}_comparison.json" "comparison-history/comparison-${PHASE_TAG}.json"

exit $EXIT_CODE
