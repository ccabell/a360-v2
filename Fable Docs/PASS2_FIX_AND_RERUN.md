# Pass 2 Fix + Rerun — Claude Code Instructions

Self-contained. Read this entire file, execute every step in order, stop only at the STOP gates. No manual steps required from Chris.

---

## Context (read before touching anything)

Two judging runs confirmed that Pass 2's worked examples contain realistic-sounding sentences that GPT-4o copies verbatim into patient outputs for patients who never said those things:
- "I see you're on warfarin for atrial fibrillation. That does elevate bruising risk." → appeared in 8 patients who have no warfarin mention
- "Let me talk to my husband first." → appeared in 5 patients including the male patient Robert Harrington
- "I see you're on blood thinners, which can increase bruising" → appeared in 2 patients

This contaminated 12/20 patients with fabricated clinical concerns, hesitations, and checklist completions. The root cause is entirely in the Pass 2 prompt's Worked Examples section. Pass 1 is fine — do NOT touch it.

---

## STEP 1 — Verify you're in the right place

```bash
# Confirm the prompt library URL is reachable
curl -s -o /dev/null -w "%{http_code}" https://prompt-runner-admin.vercel.app/
# Confirm the extraction_run_v3.3 folder exists with 20 patient bundles
ls C:\Projects\Prompts\extraction_run_v3.3\*.json | wc -l   # expect 22 (20 patients + manifest + catalog)
# Confirm Pass 1 outputs are saved and reusable (you will NOT re-run Pass 1)
```

**STOP GATE 1:** If the run folder is missing or has fewer than 20 patient JSONs, stop and report. Do not proceed.

---

## STEP 2 — Apply the corrected Pass 2 prompt to Prompt Runner

The ONLY change is the Worked Examples section (lines 189–213 of the original). Everything else in the prompt is identical. Update the prompt in Prompt Runner with this exact replacement for the Worked Examples section:

### REMOVE this entire section from the prompt (lines 189–213):

```
## Worked Examples

**Example 1 — objection vs hesitation vs concern**
"That's way more than I budgeted for." → objection, type `price` (+ tags: sticker_shock or budget_constraint per wording)
"I need to think about it and maybe talk to my husband." → hesitation, topic "decision with partner" (+ tag partner_consultation)
"Will there be bruising? I have a presentation next week." → concern, category `practical`

**Example 2 — humor, not fear**
"Ha, needles, my favorite thing in the world." (laughs, then: "Okay, where do you want me?") → no fear objection; proceed signal. Optionally concern only if reluctance recurs.

**Example 3 — commitment level**
"That sounds great, can we book something for next week?" → `committed`
"Interesting, let me think about it." → `considering`
"I don't think this is for me." → `not_interested`

**Example 4 — checklist with structured evidence**
"I see you're on warfarin for atrial fibrillation. That does elevate bruising risk."
→ { item: "Reviewed relevant medical history", category "clinical", completed true, evidence quote as spoken } — ALSO emit tag `contraindication_mentioned` and a concern (raised_by provider, category `safety`).

**Example 5 — price_quote event then objection**
Provider: "For both areas you'd be at about $680 today." Patient: "Oof — that's a lot more than I expected."
→ events: [price_quote (provider), price_objection (patient)]; objection type `price`; tag `sticker_shock`.
```

### REPLACE with this exact text:

```
## Classification Guide (schema-only — no copyable quotes)

These show the CLASSIFICATION LOGIC only. The quotes are structural placeholders — never copy them. Every quote in your output must come from the actual transcript above.

**Objection vs hesitation vs concern:**
- Patient expresses direct pushback about cost → objection, type `price`, tag `sticker_shock` or `budget_constraint`
- Patient defers to a third party or says they need time → hesitation, topic describes what they need (e.g. "decision with partner"), tag `partner_consultation` if partner mentioned
- Either party raises a clinical or practical worry → concern, category `clinical|practical|safety|financial|other`, raised_by `patient` or `provider`
- Rule: the SAME utterance goes in exactly ONE of these three lists, never two.

**Commitment level — classify by behavior, not words:**
- Patient books, pays, or receives treatment this visit → `committed`
- Patient asks concrete next-step questions, expresses strong intent → `interested`
- Patient engages but raises questions, needs time → `considering`
- Patient expresses significant doubt or objections → `uncertain`
- Patient explicitly declines → `not_interested`
- TRAP: politeness ("sounds interesting") is NOT `committed` or `interested`. Look for booking actions and concrete questions.

**Checklist — completed=true ONLY when the transcript contains it:**
- `completed: true` requires a quote from the transcript showing the item actually happened.
- `completed: false` when the item should have happened but no transcript evidence exists.
- `completed: null` when not applicable to this visit type.
- NEVER set `completed: true` on a checklist item without a real anchored quote from the transcript above.

**Signal tags — require a quotable moment:**
- `contraindication_mentioned`: only when the transcript contains explicit mention of a contraindication (pregnancy, blood thinner, autoimmune condition, recent procedure, allergy). Do NOT emit this tag if the transcript has no such mention.
- `partner_consultation`: only when the transcript contains a patient or provider mentioning a partner/spouse in a decision context.
- Every tag must be supportable by a quote. No tag without a quote.

**Price event → objection:**
- A price quote followed by patient surprise or pushback → events: price_quote then price_objection; objection type `price`.
- A quantity or unit count is NOT a price quote. Only dollar amounts are price quotes.
```

After updating, verify in the Prompt Runner UI that:
1. The warfarin sentence no longer appears anywhere in the Pass 2 prompt
2. The "talk to my husband" sentence no longer appears anywhere in the Pass 2 prompt
3. The version tag is updated to `3.3.1` or `3.3-fix1` — whatever the system supports

**STOP GATE 2:** Do NOT run anything until you have confirmed visually in the Prompt Runner UI that the old example sentences are gone. Screenshot or paste the new examples section back to confirm.

---

## STEP 3 — Add the validator hard-reject rule

In the validation code (scripts/v33_test_harness.py or wherever quote anchoring runs), add this check immediately after schema validation, before any other processing:

```python
BANNED_EXAMPLE_STRINGS = [
    "warfarin for atrial fibrillation",
    "blood thinners, which can increase bruising",
    "blood thinners",
    "let me talk to my husband",
    "talk to my husband first",
    "on warfarin",
    "atrial fibrillation",
]

def check_example_leakage(extraction_json: dict, patient_id: str) -> list[str]:
    """
    Hard-reject: any evidence quote that matches a known example string
    is a prompt-leakage fabrication. Returns list of violation descriptions.
    """
    violations = []
    blob = json.dumps(extraction_json).lower()
    for banned in BANNED_EXAMPLE_STRINGS:
        if banned.lower() in blob:
            # Find which field contains it
            violations.append(
                f"LEAKAGE DETECTED: banned example string '{banned}' found in output for patient {patient_id}. "
                f"This is a fabricated quote from the prompt examples. Field must be rejected."
            )
    return violations

# In your validation loop, add:
leakage_violations = check_example_leakage(pass2_output, patient_id)
if leakage_violations:
    validation_report["pass2"]["leakage_violations"] = leakage_violations
    validation_report["pass2"]["valid"] = False
    # DO NOT store the output as-is. Flag for HITL.
```

---

## STEP 4 — Re-run Pass 2 only on all 20 patients

Pass 1 outputs are good — reuse them. Only re-run Pass 2.

```bash
cd C:\Projects\Prompts
python scripts/v33_test_harness.py --run --model gpt4o --pass2-only --reuse-pass1
# If --pass2-only flag doesn't exist, add it to the harness:
# Load each patient's existing pass1 output from the run folder
# Run only pass2 with the corrected prompt
# Merge into the existing bundle (overwrite pass2 and validation_report fields only)
```

If the harness doesn't support `--pass2-only`, here is the logic to add:

```python
# In run_patient() or equivalent:
if args.pass2_only:
    # Load existing pass1 from the saved bundle
    bundle_path = f"extraction_run_v3.3/{patient_id}.json"
    existing = json.load(open(bundle_path))
    pass1_output = existing["gpt4o"]["pass1"]
    # Run only pass2 with the corrected prompt, passing pass1_output as context
    pass2_output = run_pass2(transcript, pass1_output, model="gpt4o")
    # Validate pass2 output (schema + anchoring + leakage check)
    validation = validate_pass2(pass2_output, transcript, patient_id)
    # Merge back into bundle
    existing["gpt4o"]["pass2"] = pass2_output
    existing["gpt4o"]["validation_report"]["pass2"] = validation
    existing["prompt_versions"]["pass2"] = "3.3.1-fix1"
    json.dump(existing, open(bundle_path, "w"), indent=2)
```

Run it. Expected duration: ~5 minutes for 20 patients at Pass 2 only.

---

## STEP 5 — Re-export and validate

```bash
python scripts/v33_test_harness.py --export
```

After export, run this quick sanity check:

```python
import json, glob

BANNED = ["warfarin for atrial fibrillation","talk to my husband first",
          "blood thinners, which can increase bruising"]

clean = contaminated = 0
for fn in glob.glob("extraction_run_v3.3/*.json"):
    if "manifest" in fn or "catalog" in fn: continue
    blob = json.dumps(json.load(open(fn))).lower()
    if any(b.lower() in blob for b in BANNED):
        print(f"STILL CONTAMINATED: {fn}")
        contaminated += 1
    else:
        clean += 1

print(f"\nClean: {clean}/20  |  Still contaminated: {contaminated}/20")
print("PASS" if contaminated == 0 else "FAIL — do not send to Fable until clean")
```

**STOP GATE 3:** If contaminated > 0, the fix didn't work. Do not export to Fable. Report what's still contaminated and which banned string is still appearing.

---

## STEP 6 — Fix the Anthropic API key for the Claude arm

```bash
# Find where ANTHROPIC_API_KEY is set
grep -r "ANTHROPIC_API_KEY" C:\Projects\Prompts\.env C:\Projects\rag\.env 2>/dev/null

# The key in rag/.env is stale/wrong. Update it:
# Open C:\Projects\Prompts\.env (or wherever v33_test_harness.py reads from)
# Replace ANTHROPIC_API_KEY with a key that has access to claude-sonnet-4-6
# Verify:
python -c "
import anthropic, os
from dotenv import load_dotenv
load_dotenv('C:/Projects/Prompts/.env')
c = anthropic.Anthropic(api_key=os.getenv('ANTHROPIC_API_KEY'))
r = c.messages.create(model='claude-sonnet-4-6', max_tokens=10, messages=[{'role':'user','content':'hi'}])
print('API KEY OK — model accessible:', r.model)
"
```

Once the key is confirmed working, run the Claude arm:

```bash
python scripts/v33_test_harness.py --run --model claude --pass2-only --reuse-pass1
python scripts/v33_test_harness.py --export
```

This produces the A/B comparison (GPT-4o repaired vs Claude Sonnet) in the same bundle format Fable already knows how to judge.

---

## STEP 7 — Package and hand to Fable

When all 20 bundles are clean and the Claude arm is done:

1. Zip the updated `extraction_run_v3.3/` folder
2. Hand the zip to Fable (Chris pastes the zip here)
3. Tell Fable: "This is the repaired Pass 2 run. Pass 2 prompt is now v3.3.1-fix1. Both GPT-4o and Claude Sonnet arms are included. Judge Pass 2 only — Pass 1 verdict from the prior run stands."

---

## Summary of what this changes

| | Before | After |
|---|---|---|
| Pass 2 examples | Realistic sentences that leak into outputs | Schema-only classification guide with no copyable quotes |
| Warfarin fabrication | 8/20 patients | 0/20 (hard-rejected by validator) |
| Husband fabrication | 5/20 patients (incl. male patient) | 0/20 |
| Pass 1 | Unchanged — it was working | Unchanged |
| Claude arm | Blocked by API key | Unblocked and running |

Pass 1 verdict from the prior judging run stands: promotable after the two narrow fixes (provider-speech-as-stated-interest constraint, stated/future dedup). Those are prompt changes for the next iteration — not today.
