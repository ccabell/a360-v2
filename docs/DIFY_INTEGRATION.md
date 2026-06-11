# Dify Integration Guide - A360 v2

## Overview

This guide ensures your Dify agents produce outputs that align perfectly with the A360 v2 UI citation system.

**Key Goal**: Design agents → Build agents → UI renders seamlessly

---

## 1. Dify Citations & Attributions

### Dify Native Citation System

Dify supports citations natively via the **Retrieval blocks**:

```
Retrieval (Knowledge Base) → Returns documents + metadata
                          → Agent references these with [source_index]
                          → Frontend renders citations
```

**Dify Citation Object Structure:**
```json
{
  "content": "Botox is FDA-approved for dynamic wrinkles[1]",
  "citations": [
    {
      "position": 1,
      "title": "FDA Documentation on Botulinum Toxin",
      "content": "Botox has been FDA-approved for...",
      "source_url": "https://www.fda.gov/...",
      "source_type": "web" | "file" | "notion" | "database"
    }
  ]
}
```

### A360 Citation Mapping

Our UI expects a **richer citation model** with confidence, metadata, and source types:

```json
{
  "message": "Botox is FDA-approved for dynamic wrinkles[1]",
  "citations": [
    {
      "id": "cit_1",
      "number": 1,
      "sourceType": "pubmed" | "youtube" | "supabase" | "pdf" | "transcript",
      "sourceId": "12345678",
      "title": "Clinical Efficacy of Botulinum Toxin",
      "evidence": "FDA-approved for glabellar lines...",
      "confidence": 0.95,
      "metadata": {
        "pmid": "12345678",
        "authors": "Smith J, et al.",
        "journal": "Journal of Aesthetic Dermatology",
        "year": 2024,
        "doi": "10.1016/j.jaad.2024.01.015"
      }
    }
  ]
}
```

---

## 2. Building Dify Agents for A360

### Agent Architecture Pattern

```
Retrieval (from Supabase GL documents)
    ↓
LLM (Prompt with citation instructions)
    ↓
Output (formatted response with citations)
    ↓
Post-processing (map Dify citations → A360 format)
    ↓
Frontend (renders with UI components)
```

### Step 1: Dify Retrieval Setup

In Dify, configure a **Retrieval block**:

```
Knowledge Base: "A360 Medical Aesthetics"
Query: User input or variable
Output: Documents + metadata
```

**Document metadata in Supabase should include:**
```json
{
  "source_type": "pubmed|youtube|internal|pdf",
  "source_id": "12345678|videoId|product_id|pdf_path",
  "title": "...",
  "authors": "...",
  "journal": "...",
  "year": 2024,
  "doi": "...",
  "confidence": 0.95,
  "pmid": "12345678"
}
```

### Step 2: LLM Prompt Template

**Dify Prompt Node:**

```
You are an evidence-based medical aesthetics advisor.

Instructions:
1. Answer the user's question with citations
2. Reference retrieved documents using [1], [2], [3] syntax
3. Structure your response as:
   - Main answer (with inline citations)
   - Evidence summary if needed

Retrieved Documents:
{{ retrieval_results }}

User Question: {{ user_input }}

Important:
- ALWAYS cite sources using [1], [2], [3] format
- Quote evidence directly
- Be specific about treatment indications
- Mention confidence if available
```

### Step 3: Dify Conditional Output

Add a **conditional block** to format output:

```yaml
If: retrieval_results exists
Then:
  Output Format:
    {
      "message": <llm_response>,
      "citations": [
        {
          "id": <source_uuid>,
          "number": <citation_number>,
          "sourceType": <source_type>,
          "sourceId": <source_id>,
          "title": <document_title>,
          "evidence": <extracted_quote>,
          "confidence": <confidence_score>,
          "metadata": <source_metadata>
        }
      ],
      "reasoning": <llm_thinking>,
      "follow_up_questions": [
        "Would you like to...",
        "Have you considered..."
      ]
    }
Else:
  Output Format:
    {
      "message": <llm_response>,
      "citations": [],
      "follow_up_questions": [...]
    }
```

---

## 3. Citation Types & Source Mapping

### Supported Citation Types in A360

| Source Type | Example ID | Metadata Required | UI Rendering |
|-------------|-----------|-------------------|--------------|
| `pubmed` | `12345678` | pmid, authors, journal, year, doi | Link to PubMed + full citation |
| `youtube` | `dQw4w9WgXcQ` | videoId, timestamp, duration, thumbnail | Thumbnail + "Watch Video" link |
| `supabase` | `products:botox_cosmetic` | table, recordId | Internal link to GL product |
| `pdf` | `s3://bucket/file.pdf` | pdfUrl, pageNumber, filename | PDF icon + "Open PDF" link |
| `transcript` | `consultation_id:12345` | speaker, timestamp_text, consultationId | Speaker badge + time |
| `agent_output` | `reasoning_v1:xyz` | reasoning_type, agent_id | AI icon + "Show Reasoning" |

### Mapping Dify Retrieval → Source Types

**In your Dify Retrieval, add metadata field:**

```
Document from PubMed:
  Metadata: {
    "source_type": "pubmed",
    "pmid": "12345678",
    "authors": "Smith J, Johnson M",
    "journal": "Journal of Aesthetic Dermatology",
    "year": 2024,
    "doi": "10.1016/j.jaad.2024.01.015"
  }

Document from Internal GL:
  Metadata: {
    "source_type": "supabase",
    "table": "gl_products",
    "recordId": "products:botox_cosmetic",
    "confidence": 0.98
  }

Video Reference:
  Metadata: {
    "source_type": "youtube",
    "videoId": "dQw4w9WgXcQ",
    "timestamp": 234,
    "duration": 1542
  }
```

---

## 4. Agent Response Format (API Contract)

### Endpoint Response Schema

When your Dify agents call your API, they should return:

```typescript
interface AgentResponse {
  message: string;              // Main response with [1], [2], [3]
  citations?: Citation[];       // Full citation objects
  reasoning?: string;           // Optional: show agent thinking
  follow_up_questions?: string[]; // Suggested next questions
  confidence?: number;          // Overall confidence 0-1
  metadata?: Record<string, any>; // Custom metadata
}

interface Citation {
  id: string;
  number: number;
  sourceType: CitationSourceType;
  sourceId: string;
  title: string;
  evidence: string;
  confidence?: number;
  metadata?: Record<string, any>;
}
```

### Example Response

```json
{
  "message": "For dynamic wrinkles, Botox is FDA-approved with onset within 3-7 days[1]. The Advanced Plan combining Botox with dermal fillers shows 85% satisfaction in clinical studies[2]. Our product guide[3] provides specific dosing recommendations.",
  "citations": [
    {
      "id": "cit_1",
      "number": 1,
      "sourceType": "pubmed",
      "sourceId": "12345678",
      "title": "Clinical Efficacy of Botulinum Toxin in Aesthetic Medicine",
      "evidence": "FDA-approved for glabellar lines, crow's feet, and forehead lines. Onset typically within 3-7 days with peak effect at 2 weeks.",
      "confidence": 0.95,
      "metadata": {
        "pmid": "12345678",
        "authors": "Smith J, Johnson M, Williams R",
        "journal": "Journal of Aesthetic Dermatology",
        "year": 2024,
        "doi": "10.1016/j.jaad.2024.01.015"
      }
    },
    {
      "id": "cit_2",
      "number": 2,
      "sourceType": "pubmed",
      "sourceId": "87654321",
      "title": "Combined Treatment Outcomes in Aesthetic Medicine",
      "evidence": "Multi-modal approach combining neurotoxins with dermal fillers shows 85% patient satisfaction",
      "confidence": 0.92,
      "metadata": {
        "pmid": "87654321",
        "authors": "Brown A, Davis C",
        "journal": "Dermatologic Surgery",
        "year": 2023
      }
    },
    {
      "id": "cit_3",
      "number": 3,
      "sourceType": "supabase",
      "sourceId": "products:botox_cosmetic",
      "title": "Botox Cosmetic - A360 Product Guide",
      "evidence": "Recommended dosing: 20-40 units per treatment area. Maintenance: every 12 weeks",
      "confidence": 0.98,
      "metadata": {
        "table": "gl_products",
        "recordId": "products:botox_cosmetic"
      }
    }
  ],
  "follow_up_questions": [
    "Would you like to see the 3-tier treatment plan for this patient?",
    "Do you want specific dosing recommendations?",
    "Should I check for contraindications?"
  ],
  "confidence": 0.94,
  "metadata": {
    "agent_version": "consultation_v1.2",
    "retrieval_count": 3,
    "processing_time_ms": 1234
  }
}
```

---

## 5. Conversation Flow Pattern

### Conversation Openers

Dify can provide **opening questions** to guide consultation:

```
Agent Node: Get Consultation Context
├─ Retrieval: Not needed yet
├─ LLM: Generate conversation starters
└─ Output:
    {
      "type": "conversation_opener",
      "message": "Welcome to your aesthetic consultation assistant.",
      "opening_questions": [
        "What is your primary aesthetic concern?",
        "Are you interested in preventative treatments or addressing existing concerns?",
        "What is your treatment timeline?"
      ]
    }
```

### Follow-up Questions

Based on user responses, suggest next questions:

```
Agent Node: Analyze Consultation
├─ Retrieval: Search GL for matching treatments
├─ LLM: Generate follow-ups based on answer
└─ Output:
    {
      "message": "Dynamic wrinkles around the eyes are very common...",
      "citations": [...],
      "follow_up_questions": [
        "How would you rate the severity (mild/moderate/severe)?",
        "Have you tried Botox before?",
        "What is your budget range?",
        "When would you like to see results?"
      ]
    }
```

---

## 6. Dify Best Practices for A360

### DO ✅

- ✅ **Always include citations** when referencing external sources
- ✅ **Use [1], [2], [3] syntax** in message text
- ✅ **Include confidence scores** (0-1) for evidence quality
- ✅ **Quote directly** from sources in the evidence field
- ✅ **Provide metadata** (authors, journal, year, DOI)
- ✅ **Include follow-up questions** to guide conversation
- ✅ **Return structured JSON** not plain text
- ✅ **Map citation numbers** to metadata correctly
- ✅ **Handle missing sources** gracefully (empty citations array)

### DON'T ❌

- ❌ **Don't cite without evidence** - every citation must have source
- ❌ **Don't mix up citation numbers** - [1] must match citations[0]
- ❌ **Don't forget metadata** - confidence and source details matter
- ❌ **Don't make up sources** - only cite what retrieval returned
- ❌ **Don't return raw Dify format** - transform to A360 schema
- ❌ **Don't include irrelevant citations** - quality over quantity
- ❌ **Don't skip follow-up questions** - guide user to next step

---

## 7. Dify Agent Templates

### Template 1: Consultation Assistant

**Purpose**: Answer questions about treatments with evidence

```yaml
# Dify Workflow
- Trigger: User Message
- Block 1: Retrieval
    Input: {{ user_message }}
    Database: A360 Medical Aesthetics
    Output: → relevant_documents

- Block 2: LLM
    Prompt: |
      You are an evidence-based medical aesthetics consultant.
      User: {{ user_message }}
      
      Retrieved Evidence:
      {{ relevant_documents }}
      
      Respond with:
      1. Direct answer using [1], [2], [3] citations
      2. Quote evidence from sources
      3. Mention confidence if uncertain
      4. Ask follow-up questions
      
    Output: → response

- Block 3: Format Output
    Input: {{ response }} + {{ relevant_documents }}
    Logic: Map Dify citations to A360 schema
    Output: → JSON (message, citations, follow_up_questions)
```

### Template 2: Treatment Recommender

**Purpose**: Generate 3-tier treatment plans with evidence

```yaml
# Dify Workflow
- Trigger: Patient Profile Input
- Block 1: Analyze Patient
    LLM: Extract concerns, goals, budget
    Output: → patient_profile

- Block 2: Retrieve Treatments
    Query: {{ patient_profile.concerns }}
    Database: GL Products + Research
    Output: → matching_treatments

- Block 3: Generate 3-Tier Plans
    LLM: |
      Patient: {{ patient_profile }}
      Available Treatments: {{ matching_treatments }}
      
      Generate 3-tier plan:
      1. Foundation: Entry-level, basic treatment
      2. Advanced: Multi-modal approach
      3. Premium: Comprehensive rejuvenation
      
      Include evidence, costs, timelines
      Cite all treatment research
      
    Output: → treatment_plans

- Block 4: Format Output
    Input: {{ treatment_plans }} + {{ matching_treatments }}
    Schema: {
      plans: [
        { tier: 1, treatments: [...], citations: [...] },
        { tier: 2, treatments: [...], citations: [...] },
        { tier: 3, treatments: [...], citations: [...] }
      ]
    }
```

### Template 3: Evidence Researcher

**Purpose**: Deep-dive research on specific topics

```yaml
# Dify Workflow
- Trigger: Research Topic
- Block 1: Multi-source Retrieval
    Query 1: {{ topic }} on PubMed database
    Query 2: {{ topic }} on YouTube knowledge base
    Query 3: {{ topic }} on Internal GL
    Output: → all_sources (consolidated)

- Block 2: Synthesize Evidence
    LLM: |
      Topic: {{ topic }}
      Sources:
      - {{ pubmed_results }}
      - {{ youtube_results }}
      - {{ internal_docs }}
      
      Create comprehensive summary:
      1. Current evidence [1][2]
      2. Key findings [3]
      3. Best practices [4][5]
      4. Recent developments [6]
      
      Rate confidence for each claim (0-1)
      
    Output: → synthesis

- Block 3: Generate Citations
    Input: {{ synthesis }} + {{ all_sources }}
    Logic: Match inline [1] references to source metadata
    Output: → citations array

- Block 4: Format Output
    Schema: {
      message: "{{ synthesis }}",
      citations: [
        { number: 1, sourceType: "pubmed", ... },
        { number: 2, sourceType: "youtube", ... },
        ...
      ],
      sources_analyzed: 5,
      confidence: 0.92
    }
```

---

## 8. Supabase Setup for Dify

### Document Structure in Supabase

For Dify Retrieval to work correctly, structure your GL documents:

```sql
-- gl_agent_fuel_documents table
CREATE TABLE gl_agent_fuel_documents (
  id UUID PRIMARY KEY,
  product_id UUID NOT NULL,
  content TEXT,  -- Full text for retrieval
  source_type TEXT,  -- 'pubmed' | 'youtube' | 'internal' | 'pdf'
  source_id TEXT,  -- ID in original system
  title TEXT,
  evidence TEXT,  -- Key quote or summary
  metadata JSONB,  -- {pmid, authors, journal, year, doi, ...}
  confidence NUMERIC,  -- 0-1
  created_at TIMESTAMP
);

-- Example metadata by source type
-- PubMed:
{"pmid": "12345678", "authors": "Smith J, et al", "journal": "...", "year": 2024, "doi": "..."}

-- YouTube:
{"videoId": "abc123", "timestamp": 234, "duration": 1542, "channel": "..."}

-- Internal:
{"table": "gl_products", "recordId": "...", "section": "..."}

-- PDF:
{"pdfUrl": "s3://...", "pageNumber": 5, "filename": "..."}
```

### Dify Retrieval Configuration

In Dify, configure retrieval to extract metadata:

```
Knowledge Base: "A360 Medical Aesthetics"
Embedding: OpenAI text-embedding-3-small
Retrieval Mode: Hybrid (Vector + Keyword)
Top K: 5
Score Threshold: 0.5

Metadata Filter: (optional)
  - source_type: in ['pubmed', 'youtube', 'internal']
  - confidence: > 0.8

Return Fields:
  - content
  - title
  - evidence
  - source_type
  - source_id
  - metadata
  - confidence
```

---

## 9. Testing Your Dify Agent

### Test Case 1: Simple Citation

**Input**: "What is Botox approved for?"

**Expected Output**:
```json
{
  "message": "Botox is FDA-approved for dynamic facial wrinkles[1], specifically glabellar lines, crow's feet, and forehead lines[1].",
  "citations": [
    {
      "number": 1,
      "sourceType": "pubmed",
      "title": "FDA Documentation on Botulinum Toxin",
      "evidence": "FDA-approved for glabellar lines, crow's feet, and forehead lines",
      "confidence": 0.98
    }
  ]
}
```

### Test Case 2: Multi-Source

**Input**: "What's the evidence for combining Botox with dermal fillers?"

**Expected Output**:
```json
{
  "message": "Combining Botox with dermal fillers is supported by clinical evidence[1]. Studies show 85% patient satisfaction with this multi-modal approach[2]. Our product guide provides specific combination dosing[3].",
  "citations": [
    {"number": 1, "sourceType": "pubmed", ...},
    {"number": 2, "sourceType": "pubmed", ...},
    {"number": 3, "sourceType": "supabase", ...}
  ],
  "follow_up_questions": [
    "Would you like a treatment plan for this approach?",
    "What is your timeline?"
  ]
}
```

### Test Case 3: No Sources Found

**Input**: "Very obscure treatment question"

**Expected Output**:
```json
{
  "message": "I don't have specific evidence for that approach in our knowledge base. Here's what I can say based on general principles...",
  "citations": [],
  "follow_up_questions": [
    "Can you provide more context?",
    "Are you interested in evidence-based alternatives?"
  ],
  "confidence": 0.5
}
```

---

## 10. Quick Reference: Dify → A360 Mapping

| Dify Component | A360 Component | Purpose |
|---|---|---|
| Retrieval Block | Citation Source | Fetch knowledge base documents |
| LLM with citations | MessageWithCitations | Generate response with [1], [2], [3] |
| Conditional Block | Citation formatter | Transform Dify format → A360 schema |
| Knowledge Base metadata | Citation metadata | Provide confidence, authors, links |
| Variable substitution | Follow-up questions | Guide user conversation |
| Output format block | AgentResponse JSON | Return structured response to UI |

---

## 11. Getting Started Checklist

- [ ] Read Dify citation documentation: https://docs.dify.ai/en/use-dify/build/additional-features#citations-and-attributions
- [ ] Set up Supabase GL documents with metadata
- [ ] Create first Dify Retrieval block (test with simple query)
- [ ] Create LLM prompt node with citation instructions
- [ ] Add conditional output formatting block
- [ ] Test response format matches A360 CitationResponse schema
- [ ] Create follow-up question generation
- [ ] Build conversation opener workflow
- [ ] Deploy to Railway backend
- [ ] Wire API endpoint to a360-v2 Chat page
- [ ] Test citations render correctly in UI

---

## 12. Support & Questions

**For Dify-specific questions**: https://docs.dify.ai
**For A360 UI integration**: See `TEMPLATE_SUMMARY.md`
**For API contract**: See `components/citations/types.ts`

