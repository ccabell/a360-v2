# Demo Script — Scribe (Clinical Notes)

**Surface:** `/dashboard/scribe` · **Practice:** Orange Twist · **Runtime:** existing a360-v2 app (no new repo/runtime)

The one-line pitch to open with:
> "Every scribe writes a note. Ours understands the aesthetic consultation — and turns one conversation into every record the visit needs."

---

## Stage path (≈3 minutes)

### 0. Land on Scribe
- Click **Scribe** in the left sidebar.
- The **Orange Twist** practice header is on top: logo, `BODY | FACE | SKIN`, a **location selector** (Newport Beach default — open it to show Irvine / San Diego / Scottsdale), and a strip of the practice's **products & services** pulled from the Global Library with **View all**.
- *Say:* "This header is shared by every demo agent — practice identity, locations, and the live product library."

### 1. Select patient
- Five patients, each with a summary, **visit type**, and a one-line visit description.
- Pick **Sofia Reyes** — she carries the green **STAGE-READY** badge (cached, never depends on a live model).
- *Say:* "Treatment visit — Botox touch-up plus microneedling. Scribe works from the real consultation transcript."

### 2. Choose records & style
- The fan-out menu. SOAP, **Cosmetic Procedure Note** (aesthetics-native — the thing no competitor has), Patient After-Visit Summary, and **Coding & Opportunities** are pre-selected. Provider Letter is optional — toggle it on to show breadth.
- Show the **Length** (Concise/Standard/Comprehensive) and **Format** (Paragraph/Bulleted) controls.
- Click **Generate N records →**.

### 3. Generate & review — the moment
- Watch the ribbon: **Ingesting transcript → Extracting entities → Structuring records → Drafting sections → Complete**. *Let it play — it's scripted and deterministic.*
- **Split-pane:** transcript on the left; on the right, three views — **Extracted entities · Records · Clinical intelligence**.
- **The extraction beat (lead with this):** during *Extracting entities*, watch core fields populate by category — concerns, treatments, products, dosing, anatomy, follow-up, opportunities — each with a **confidence %** and a **source link**. *Say:* "Before it writes a word, it reads the visit — real extraction, not a template." (This is genuine extraction; for non-cached patients it runs live and is saved to the `extractions` table.)
- **Source linking (the trust beat):** on the **Records** view, hover any note line — the exact transcript line that produced it **highlights and scrolls into view**. Hover a transcript line to light up the entities/lines it fed. *Say:* "Every statement traces back to what was actually said. No invented findings."
- **Fan-out tabs:** click across **SOAP → Procedure Note → After-Visit Summary → Coding & Opportunities**. Same conversation, every record type. On **Coding & Opportunities**, point out the suggested codes *and* the extracted **revenue opportunities** with horizons and dollar values — "the note pays for itself."
- **Clinical intelligence (the AI-IQ beat):** open the third view. Guidance **mined from the A360 podcast network** (31 shows, ~8,700 episodes), matched to *this* patient's entities — pearls ("'Botox didn't work' = underdosing"), pairing/sequencing, aftercare cadence, screening, opportunity. *Say:* "It's not just transcribing — it knows aesthetics."
- **Polished output + AI rewrite:** flip **Structured ↔ Document** (clean letterhead view), **Paragraph ↔ Bulleted**, hit a section's **improve** for an AI rewrite of just that section, or use the **magic-edit** bar ("make it more concise"). **Copy** drops it onto the clipboard for the EHR.

### Optional — show it's real
- Back out and pick a patient **without** the STAGE-READY badge. Scribe generates live from that patient's real transcript (no source links on live runs). Use only if the room wants to see it unscripted — the cached patients are the safe stage path.

---

## Determinism / safety
- **Sofia Reyes** and **Amara Okafor** are fully cached fixtures — they render identically every time with no model call. Use them on stage.
- Live generation is a graceful fallback for other patients; if it ever errors, the UI tells you to pick a STAGE-READY patient.
- No PHI anywhere — all patients and transcripts are synthetic.

## If something looks off
- Header empty? `/api/practice` — confirm the Orange Twist practice row + `branding.locations`.
- Picker empty? `/api/demo-agents/patients` — needs 5 active patients with a consultation.
- Records blank? `/api/scribe/generate` — cached patients never fail; live needs `ANTHROPIC_API_KEY`.
