# Extraction — Deep Dive & Strategic Reassessment

Both runs analyzed. Standing back from prompt-tweaking to answer the real question: are we doing this right?

---

## 1. What the two runs actually tell us (the honest read)

The second run's judging report is more thorough than mine and its headline is unambiguous:

- **Pass 1: fundamentally sound.** 373/429 exact anchors (87%), 1 fabrication, catalog discipline excellent, the trap-handling that killed v3.2's over-extraction is working. Pass 1 is promotable after two narrow fixes.
- **Pass 2: structurally broken by the prompt, not by the model.** 25 fabrications out of 195 quotes. Three template sentences from the worked examples are being copied verbatim into outputs across 12/20 patients — including onto Robert Harrington (male patient) getting a "let me talk to my husband" hesitation, and 6 patients getting fabricated warfarin/blood-thinner concerns. The fix is surgical: replace the example strings. But this reveals something deeper.

The root cause of most failures isn't the model. It's the prompts — and specifically the worked examples. That's the most important signal from both runs.

---

## 2. Are we doing this the right way? The honest answer is: partially.

Here's the full picture of what we're doing and what the field actually knows works.

### What we're doing now (prompt engineering only)
We write detailed instructions + worked examples → send to a general-purpose model → validate output → retry on failure. That's a legitimate approach. The v3.3 prompts are genuinely sophisticated. But there are three structural weaknesses:

**A. We're asking one general model to do a specialized job with no domain adaptation.** GPT-4o has never seen a medspa consultation transcript. It has no calibration against "what does a real interest look like vs. a provider recommendation vs. a patient being polite." It infers from the prompt alone. That's why "I'd recommend Restylane Kysse" becomes a stated patient interest — the model doesn't have enough grounding to know that's a provider utterance pattern, even when the prompt says it shouldn't.

**B. The worked examples are carrying too much weight and contaminating output.** Few-shot examples in LLM prompts are powerful — and dangerous at exactly the scale we're seeing. The warfarin/husband examples are being treated as *templates to complete* rather than *patterns to learn from*. This is a known failure mode with long, complex prompts where the examples are detailed and realistic-sounding.

**C. We have 122 real transcripts and we're using exactly 0 of them to calibrate the model.** This is the biggest gap. We have genuine ground truth (or can create it): real transcripts from real medspa consultations. We're not using them to fine-tune, to build a retrieval-augmented validation layer, or even as in-context examples. We're just writing rules and hoping.

### What the field knows works better (in ascending order of effort/payoff)

**Option 1 — Fix the prompt engineering (lowest effort, immediate).** Replace the worked examples with obviously synthetic/un-copyable versions. Add a negative examples section for Pass 2 the same way Pass 1's Traps section works. This addresses the immediate breakage. Probably gets Pass 2 to acceptable quality for the demo. But it's still asking a general model to do specialized work with no grounding.

**Option 2 — Few-shot with real (labeled) transcripts (medium effort, high payoff).** Take 10-15 of your 122 transcripts, hand-label the key fields (offerings, dispositions, objections, outcome, a few evidence quotes). Use THOSE as the in-context examples instead of invented ones. Three things happen: (a) the examples can't be "warfarin" if none of your real transcripts have warfarin; (b) the model sees the actual linguistic patterns of medspa consultations; (c) the validator can catch model-echoes of the real examples trivially. This is the highest-leverage thing you can do without training a model. Takes a week to label carefully; payoff is immediate and lasting.

**Option 3 — Fine-tune a model on your 122 transcripts (higher effort, transformative).** This is where "we have data we're not leveraging" becomes concrete. You have 122 consultation transcripts. If you label even 50-60 of them with correct extractions (a data-labeling job, not a technical one), you can fine-tune a smaller, faster, cheaper model (GPT-4o-mini or Claude Haiku) that has been specifically trained on what medspa consultation extraction looks like. The benefits: (a) dramatically better anchoring because the model has seen the language patterns; (b) far less prompt engineering needed — the training encodes the rules; (c) cheaper at runtime (smaller model, shorter prompt needed); (d) the model stops hallucinating provider-speech-as-patient-interest because it's seen hundreds of examples of both.

**Option 4 — Structured extraction / constrained decoding (different approach entirely).** Instead of "write JSON from instructions," use a structured output framework where the model fills typed fields with explicit constraints. Tools like Instructor (Python), Marvin, or the OpenAI structured outputs API enforce the schema at generation time, not after. Combined with span-extraction (the model identifies character positions in the transcript, not prose quotes), anchoring becomes a property of the generation method rather than a post-hoc validation. This is closer to how production-grade information extraction systems work.

---

## 3. The 122 transcripts — what we actually have and what we can do with them

This is the asset you're not fully using. Here's the breakdown of value:

**For immediate use (no labeling needed):**
- Use a sample of them as worked examples in the prompt, replacing the synthetic examples. Pick 3-4 that cover the key scenario types (multi-offering, price objection, returning patient, multi-speaker). The model sees real language; the validator can detect verbatim copying trivially.
- Use them to build a "known bad patterns" filter — scan them to find the characteristic phrases that appear in real transcripts vs. the ones Claude Code invented for the test set.

**For medium-term use (2-3 weeks of labeling):**
- Label 30-50 with correct Pass 1 extractions. Use these as a fine-tuning dataset for GPT-4o-mini or Haiku. The labeling isn't technical — it's a structured form-filling job that a trained medspa coordinator could do with a 2-hour onboarding.
- Use the labeled set as your golden eval set. Run every prompt version against it; report a score. Stop guessing whether v3.3 is better than v3.2 — measure it.

**For longer-term use:**
- The 122 + the 20 synthetic test transcripts become a comprehensive eval suite. As the product matures, every prompt change gets scored against it before shipping. This is standard ML practice and it's what separates "we think it's better" from "we know it's better."

---

## 4. The model training question — are we using the right models?

You asked whether we're training models right. Here's the honest answer:

**Right now we're not training anything — we're prompting.** That's not wrong for an early-stage product. Prompt engineering is fast to iterate and doesn't require labeled data. But you're right that there's a gap.

The options, from least to most training:

| Approach | What it takes | When to use |
|---|---|---|
| Better prompts + real examples | Hours | Right now, for the demo |
| Golden eval set (labeled) | 1-2 weeks | Soon — stops guessing |
| Fine-tuning on labeled transcripts | 3-4 weeks labeling + 1 day training | Post-demo, when you have 50+ labels |
| Custom model (your own base) | Months + significant data | Not yet — premature |

**The most important thing you're not doing:** you have no formal eval set. Every prompt version change is being judged by running it on test transcripts and eyeballing. That's how you end up with "v3.3 is better, right?" being a genuinely open question even after two runs. Build the golden set first — it's the foundation everything else sits on.

---

## 5. What HITL actually buys you (and what it doesn't)

You mentioned HITL as a safety net, and it is one — but it's important to be clear about what it catches. HITL catches errors that a provider *notices and disagrees with*. It does NOT catch:

- Fabricated warfarin concerns on patients who didn't mention it (the provider doesn't know what's in the extraction JSON)
- Quietly wrong interest attributions (the provider sees "patient interested in filler" and doesn't realize it came from their own recommendation, not the patient's mouth)
- Checklist items marked complete that weren't (the provider is the one marking them)

HITL works well as a quality gate when the reviewer has the transcript in front of them and can verify claims. Without that, it's a "does this look right" sanity check, not a clinical-accuracy guarantee. The demo HITL is probably fine for the demo — but for production, the providers need to understand they're verifying, not rubber-stamping.

---

## 6. Recommended path forward (prioritized)

**This week (demo unblocked):**
1. Fix Pass 2 prompt: replace synthetic examples with 3-4 real transcript snippets (pick non-sensitive ones from the 122). This kills the leakage, which is the only production-blocking defect.
2. Add a validator hard-reject: any evidence quote matching a known example string → reject, flag, never store.
3. Do NOT run the Claude A/B until Pass 2 is fixed. Measuring two models against a broken prompt is wasted.

**Post-demo (2-4 weeks):**
1. Label 30 transcripts with correct Pass 1 extractions. This is the single highest-leverage investment in the system's future quality.
2. Build a formal eval harness that reports a score every time you change a prompt. Stop eyeballing.
3. Fine-tune GPT-4o-mini on the labeled set. Run a 3-way comparison: GPT-4o prompted, GPT-4o-mini prompted, GPT-4o-mini fine-tuned. The fine-tuned small model will almost certainly outperform the prompted large model on this specialized task — and at a fraction of the cost per run.

**Longer term:**
1. Consider span-extraction rather than quote-extraction. The model finds the START and END character of the span; the system extracts the verbatim text. Anchoring becomes guaranteed by construction.
2. As you accumulate more labeled data (100+), revisit whether a fully fine-tuned model on your domain outperforms the prompted approach entirely. At that scale, it usually does.

---

## 7. The one-line answer to "are we doing this the right way?"

You're doing the right things in the right order for an early-stage product. Prompt engineering first is correct — you learn what the task actually requires before investing in labeled data and fine-tuning. But you've hit the ceiling of what prompt engineering alone can deliver reliably, and the 122 transcripts are the asset that unlocks the next level. The path forward is: fix the immediate prompt defect, build the golden eval set, and fine-tune. In that order.
