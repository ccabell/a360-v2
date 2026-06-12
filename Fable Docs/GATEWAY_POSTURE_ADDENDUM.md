# Gateway Posture — The Authority Boundary (System Addendum)

Companion to the dossier system (v2, real schema). **This is the most important positioning decision in the project and it constrains everything the clinical lens does.** It is mostly a set of rules about what NOT to assert — which deletes more work than it adds.

Decisions locked:
- **Precise dosing/protocols: characterize in ranges + link to the source for exact protocol.** Never re-state precise protocols as A360's own tables.
- **Safety exception: authority for contraindications/interactions/warnings; gateway for everything else.**

---

## 1. The principle

**A360 is a gateway to data, not an authority on data.** The product answers: *I have a question → where is the answer → what does the answer say → let me make my own judgement.* It surfaces what authoritative sources say and shows their provenance; it does not adjudicate clinical practice.

Why this matters beyond philosophy: almost every hard problem flagged in clinical review — uncited dosing tables we'd have to defend, per-claim clinical sign-off UI, contested-claim adjudication schema — is the **cost of being an authority**. Adopting the gateway posture doesn't solve those problems; it **deletes** them. You can't be asked to defend a masseter dose you never asserted.

---

## 2. The one boundary: gateway vs. authority

| Content type | Posture | Why |
|---|---|---|
| Dosing, injection technique, sequencing, product selection, candidacy nuance, aesthetic judgment | **GATEWAY** — characterize + point to source | These are judgment calls where practitioners legitimately differ. Asserting one answer is false authority and creates liability. |
| **Contraindications, drug interactions, boxed/black-box warnings, absolute don't-do-this** | **AUTHORITY** — curated, FDA-cited, stated plainly | The purpose here is to STOP a dangerous action, not inform a stylistic choice. "Here's a source, you judge" is wrong when the answer is "this can cause harm." |

The rule in one line: **gateway for the judgment calls, authority for the safety floor.**

---

## 3. What this changes in the clinical lens

### 3a. Precise dosing/protocols → ranges + link (NOT A360 tables)
The clinical lens does NOT publish a dosing table presented as A360's answer. Instead:
- **Characterize the range**: "Glabellar dosing typically falls in a ~20-unit range for onabotulinumtoxinA; masseter treatment uses substantially higher per-side amounts that vary widely by practitioner and indication."
- **Point to the authoritative protocol**: "For exact dosing, see the [Botox Cosmetic prescribing information →]" (link to the FDA/DailyMed source).
- **Never** emit "Glabella 20U, forehead 10-20U, masseter 25-50U" as a freestanding table that reads as A360's clinical instruction. That is the authority posture we're rejecting — and it's exactly the content that has no row-level citation and can't be defended.

Effect: the uncited-dosing-table problem disappears, because we stop publishing the table. We publish the *range characterization* (low-stakes, clearly approximate) plus the *pointer* to the precise source (authoritative, public, defensible).

### 3b. Inline source attribution (KEEP — this is the gateway's spine)
Every clinical statement wears its source tier IN THE PROSE, not buried in `evidence_links`:
- `[FDA label]` / `[prescribing information]` — rank 1
- `[peer-reviewed: Carruthers 2016]` — rank 2-4
- `[clinical consensus]` — rank 5
- `[field practice]` — rank 6

A doctor reading "either order is acceptable [consensus, Carruthers 2016]" vs. "some injectors prefer toxin first [field practice]" can instantly weigh them. This is not an authority feature — it is THE gateway feature. The whole "let me make my own judgement" promise is empty if the reader can't see provenance at a glance. The `evidence_links` rows already hold the rank; the prose just needs to surface it. Implementation: the compile step writes the tier tag inline as it writes each claim, drawn from the same evidence it's citing.

### 3c. Present conflict, don't resolve it (NO new schema)
Where authoritative sources disagree, the clinical lens SHOWS BOTH with their tiers rather than picking one:
> Sequencing of toxin and filler in the same session: the multidisciplinary consensus holds that either order is acceptable [consensus, Carruthers 2016]. Some practitioners prefer toxin first to assess volume after movement is reduced [field practice]. Sources differ; both are defensible.

Conflict is the FEATURE — surfacing the range of authoritative opinion IS the value. No `contested_claim` flag or special UI needed; the lens is simply comfortable saying "sources differ, here they are." This is lighter than the adjudication machinery clinical review proposed, and truer to the posture.

### 3d. Safety stays authoritative (the exception)
Contraindications, interactions, warnings: curated, FDA/prescribing-info cited, stated as fact. No "sources differ" hedging on whether something is contraindicated in pregnancy. These claims keep the highest review bar and rank-1 citation. This is the one place the clinical lens speaks with authority — because the job is to prevent harm, not inform taste.

---

## 4. What this DELETES from the prior plan

- **Backfilling row-level citations for precise dosing tables** — not needed; we don't publish the tables. (Replaced by: range characterization + source pointer.)
- **A per-claim clinical-review UI / clinical CMS** — not needed. A gateway doesn't need a clinician to *approve its claims* because it isn't asserting clinical claims (except the safety floor, which is small and FDA-cited). The existing markdown REVIEW_QUEUE is adequate for the lighter check: "does this point to the right source, and characterize it honestly?"
- **A `contested_claim` schema subsystem** — not needed; the lens presents conflict in prose.

What survives review as a real, light task: a clinician (or you) spot-checks that pointers go to the right source, ranges are honestly approximate, conflict is fairly presented, and — with real attention — that the **safety floor** content is correct. That last part is the only thing needing genuine clinical eyes, and it's a small, bounded set of claims.

---

## 5. What this ADDS (small)

1. **Inline tier tags in `content_md`** — compile step writes `[FDA label]` / `[consensus, Cite]` / `[field practice]` next to each clinical claim. Drawn from the evidence it already has. (§3b)
2. **A "see source for exact protocol" convention** — clinical lens dosing/technique sections end with a pointer link to the FDA/prescribing-info source instead of a precise table. (§3a)
3. **A `posture` distinction the compile step honors**: when writing a clinical claim, decide — is this a judgment call (characterize + point) or the safety floor (assert + FDA-cite)? Encode as a section convention, not new schema: safety sections speak with authority; all others characterize-and-point.

---

## 6. Corrected guidance for the compile prompt (clinical lens)

Add to the compiler's clinical-lens instructions:

```
POSTURE: A360 is a gateway, not an authority. For this clinical section:
- If the content is a JUDGMENT CALL (dosing, technique, sequencing, product choice, candidacy):
  - Characterize in ranges/approximations, never precise freestanding tables presented as our answer.
  - End with a pointer to the authoritative source for exact protocol (FDA label / prescribing info link).
  - Tag every claim inline with its source tier: [FDA label] / [peer-reviewed: Cite] / [consensus] / [field practice].
  - Where authoritative sources DISAGREE, present both positions with their tiers. Do not resolve. Say "sources differ."
- If the content is the SAFETY FLOOR (contraindications, interactions, boxed warnings, absolute cautions):
  - State it plainly and authoritatively. Cite the FDA/prescribing information (rank 1). This is the ONE place we assert.
  - Never hedge a contraindication as "sources differ."
- Never publish a precise dose/protocol as an A360 table that a doctor would read as our clinical instruction.
  We point to the source that owns that; we do not become that source.
```

---

## 7. The doctor's experience (what we're actually building)

A provider opens a clinical reference in A360 and sees: a high-level characterization of the topic, every statement tagged with whether it's FDA, peer-reviewed, consensus, or field practice, honest presentation of where sources disagree, a hard/clear statement of any safety contraindication, and a link to the authoritative source for anything precise. They read it, see the provenance, and make their own call — fast. That is the product: **the right data on tap at the right time, with its provenance visible, so the expert can judge.** Not an oracle that hands down doses it can't defend.
