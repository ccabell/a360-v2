# A360 API Contract - Dify Agent Responses

This document defines the exact JSON schema that all Dify agents must return.

**Status**: Live specification for a360-v2
**Version**: 1.0
**Last Updated**: 2026-06-11

---

## Root Response Object

```typescript
interface AgentResponse {
  message: string;              // REQUIRED - Main response text with [1], [2], [3] citations
  citations?: Citation[];       // OPTIONAL - Array of citation objects
  reasoning?: string;           // OPTIONAL - Show agent thinking/reasoning
  follow_up_questions?: string[]; // OPTIONAL - Suggest next questions (3-5 recommended)
  confidence?: number;          // OPTIONAL - Overall confidence 0-1
  metadata?: Record<string, any>; // OPTIONAL - Any additional metadata
  source_documents?: number;    // OPTIONAL - How many sources were retrieved
  timestamp?: string;           // OPTIONAL - ISO 8601 timestamp
}
```

---

## Citation Object

```typescript
interface Citation {
  id: string;                   // REQUIRED - Unique ID (e.g., "cit_1", "cit_abc123")
  number: number;               // REQUIRED - Citation number [1], [2], [3] in message
  sourceType: CitationSourceType; // REQUIRED - Type of source
  sourceId: string;             // REQUIRED - ID in original system (PMID, videoId, etc.)
  title: string;                // REQUIRED - Display title
  evidence: string;             // REQUIRED - Quote or excerpt from source (50-300 chars)
  confidence?: number;          // OPTIONAL - Confidence 0-1 (default 0.85)
  metadata?: CiteMetadata;      // OPTIONAL - Type-specific metadata
  url?: string;                 // OPTIONAL - Direct link to source
}

type CitationSourceType = 
  | "pubmed"
  | "youtube"
  | "supabase"
  | "pdf"
  | "transcript"
  | "agent_output";
```

---

## Metadata by Source Type

### PubMed Metadata

```typescript
interface PubMedMetadata {
  pmid: string;              // PubMed ID
  authors?: string;          // "Smith J, Johnson M, et al."
  journal?: string;          // Journal name
  year?: number;             // Publication year
  doi?: string;              // DOI (format: 10.1016/j.example)
  publicationType?: 
    | "practice_guideline"
    | "research"
    | "review"
    | "meta_analysis";
}
```

### YouTube Metadata

```typescript
interface YouTubeMetadata {
  videoId: string;           // YouTube video ID
  timestamp?: number;        // Start time in seconds
  duration?: number;         // Video duration in seconds
  thumbnail?: string;        // Thumbnail URL
  channel?: string;          // Channel name
  uploadDate?: string;       // ISO 8601 date
}
```

### Supabase Metadata

```typescript
interface SupabaseMetadata {
  table: "gl_products" | "gl_fuel_documents" | "procedures" | "treatments";
  recordId: string;          // Primary key of record
  section?: string;          // Section within document
  lastUpdated?: string;      // ISO 8601 timestamp
  enrichmentLevel?: 
    | "basic"
    | "intermediate"
    | "comprehensive";
}
```

### PDF Metadata

```typescript
interface PDFMetadata {
  pdfUrl: string;            // S3 or Supabase storage URL
  pageNumber?: number;       // Specific page
  filename: string;          // Display filename
  uploadDate?: string;       // ISO 8601 timestamp
  fileSize?: number;         // Size in bytes
  source?: 
    | "manufacturer"
    | "research"
    | "internal";
}
```

### Transcript Metadata

```typescript
interface TranscriptMetadata {
  speaker: string;           // Speaker name / role
  timestamp?: number;        // Time in seconds
  timestamp_text?: string;   // Formatted time "12:34"
  consultationId: string;    // Link back to consultation
  confidence?: number;       // Confidence in accuracy
}
```

### Agent Output Metadata

```typescript
interface AgentOutputMetadata {
  reasoningType?: 
    | "internal_thinking"
    | "decision_justification"
    | "calculation";
  agentId?: string;          // Which agent generated this
  agentVersion?: string;     // Version of agent
  reasoning?: string;        // Full reasoning text
}
```

---

## Full Example Responses

### Example 1: Simple Citation

**Dify Agent**: Consultation Assistant

```json
{
  "message": "Botox is FDA-approved for dynamic facial wrinkles[1].",
  "citations": [
    {
      "id": "cit_1",
      "number": 1,
      "sourceType": "pubmed",
      "sourceId": "12345678",
      "title": "Clinical Efficacy of Botulinum Toxin in Aesthetic Medicine",
      "evidence": "FDA-approved for glabellar lines, crow's feet, and forehead lines",
      "confidence": 0.98,
      "metadata": {
        "pmid": "12345678",
        "authors": "Smith J, Johnson M, Williams R",
        "journal": "Journal of Aesthetic Dermatology",
        "year": 2024,
        "doi": "10.1016/j.jaad.2024.01.015",
        "publicationType": "research"
      }
    }
  ],
  "follow_up_questions": [
    "Are you interested in learning about treatment timelines?",
    "Would you like to know about combining Botox with other treatments?"
  ],
  "confidence": 0.98
}
```

### Example 2: Multi-Source Citation

```json
{
  "message": "Botox is FDA-approved for dynamic wrinkles[1]. Studies show onset within 3-7 days[2] with peak effect at 2 weeks[2]. Our product guide[3] provides specific dosing recommendations.",
  "citations": [
    {
      "id": "cit_1",
      "number": 1,
      "sourceType": "pubmed",
      "sourceId": "12345678",
      "title": "Clinical Efficacy of Botulinum Toxin",
      "evidence": "FDA-approved for glabellar lines, crow's feet, and forehead lines",
      "confidence": 0.98,
      "metadata": {
        "pmid": "12345678",
        "authors": "Smith J, et al",
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
      "title": "Timeline and Efficacy of Botulinum Toxin Type A",
      "evidence": "Onset within 3-7 days, peak effect at 2 weeks",
      "confidence": 0.96,
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
      "sourceId": "gl_products:botox_cosmetic",
      "title": "Botox Cosmetic - A360 Product Guide",
      "evidence": "Recommended dosing: 20-40 units per treatment area",
      "confidence": 0.98,
      "metadata": {
        "table": "gl_products",
        "recordId": "botox_cosmetic",
        "lastUpdated": "2024-06-11T00:00:00Z"
      }
    }
  ],
  "follow_up_questions": [
    "What is your timeline for results?",
    "Are you interested in a treatment plan?",
    "Do you have any concerns about maintenance?"
  ],
  "confidence": 0.97,
  "source_documents": 3
}
```

### Example 3: YouTube Citation

```json
{
  "message": "Proper injection technique is critical for optimal results[1]. This expert video[2] demonstrates the correct approach.",
  "citations": [
    {
      "id": "cit_1",
      "number": 1,
      "sourceType": "pubmed",
      "sourceId": "34567890",
      "title": "Injection Technique Improves Outcomes",
      "evidence": "Proper injection angle and depth significantly improve patient satisfaction",
      "confidence": 0.94,
      "metadata": {
        "pmid": "34567890",
        "journal": "Aesthetic Surgery Journal",
        "year": 2024
      }
    },
    {
      "id": "cit_2",
      "number": 2,
      "sourceType": "youtube",
      "sourceId": "dQw4w9WgXcQ",
      "title": "Advanced Injection Techniques Masterclass",
      "evidence": "Step-by-step demonstration of proper injection angles and safety protocols",
      "confidence": 0.89,
      "metadata": {
        "videoId": "dQw4w9WgXcQ",
        "timestamp": 234,
        "duration": 1542,
        "thumbnail": "https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg",
        "uploadDate": "2024-03-15"
      },
      "url": "https://youtube.com/watch?v=dQw4w9WgXcQ&t=234"
    }
  ],
  "confidence": 0.92
}
```

### Example 4: Treatment Plan (Multiple Citations per Tier)

```json
{
  "message": "Based on your profile, here are 3 personalized treatment options:",
  "metadata": {
    "type": "treatment_plan",
    "tiers": 3,
    "total_citations": 9
  },
  "source_documents": 12,
  "follow_up_questions": [
    "Which tier interests you most?",
    "Do you have timeline preferences?",
    "What is your budget range?"
  ]
}
```

### Example 5: No Sources Found

```json
{
  "message": "I don't have specific research on that topic in our knowledge base. Here's what general principles suggest...",
  "citations": [],
  "follow_up_questions": [
    "Can you provide more context about what you're asking?",
    "Would you like to explore evidence-based alternatives?",
    "Should I research this topic further?"
  ],
  "confidence": 0.5,
  "metadata": {
    "retrieval_status": "no_results"
  }
}
```

---

## Validation Rules

### REQUIRED Fields
- ✅ `message` - Never empty
- ✅ `citations[].id` - Unique per response
- ✅ `citations[].number` - Must match inline [n] in message
- ✅ `citations[].sourceType` - One of allowed types
- ✅ `citations[].title` - Never empty
- ✅ `citations[].evidence` - 50-300 characters preferred

### Citation Number Matching

**MUST MATCH**: Inline `[1]` in message ↔ `citations[0].number: 1`

```
VALID:
Message: "Botox works[1]"
Citations: [{ number: 1, ... }]  ✅

INVALID:
Message: "Botox works[1]"
Citations: [{ number: 2, ... }]  ❌

INVALID:
Message: "Botox works[1] and fillers[2]"
Citations: [{ number: 1 }, { number: 3 }]  ❌ (missing [2])
```

### Confidence Score Range

```
0.0 - 0.5:   Low confidence (avoid if possible)
0.5 - 0.85:  Medium confidence (acceptable)
0.85 - 1.0:  High confidence (preferred)

Guidelines:
- Research articles: 0.90-1.0
- Clinical guidelines: 0.95-1.0
- Educational videos: 0.85-0.95
- Internal docs: 0.95-1.0
- Inference/synthesis: 0.75-0.90
```

### Message Text Rules

```
DO:
✅ "Botox is FDA-approved[1]"
✅ "Studies show[1][2] that..."
✅ "According to research[1], the timeline..."

DON'T:
❌ "Research shows[1]" (vague)
❌ "It's been shown[1]" (passive)
❌ "Some say[1]" (unscientific)
❌ "According to[1]" (incomplete)
```

---

## JSON Schema (TypeScript)

```typescript
// Strict TypeScript types for validation
export type CitationSourceType = 
  | "pubmed" 
  | "youtube" 
  | "supabase" 
  | "pdf" 
  | "transcript" 
  | "agent_output";

export interface AgentResponse {
  message: string;
  citations?: Citation[];
  reasoning?: string;
  follow_up_questions?: string[];
  confidence?: number;
  metadata?: Record<string, any>;
  source_documents?: number;
  timestamp?: string;
}

export interface Citation {
  id: string;
  number: number;
  sourceType: CitationSourceType;
  sourceId: string;
  title: string;
  evidence: string;
  confidence?: number;
  metadata?: Record<string, any>;
  url?: string;
}
```

---

## Testing & Validation

### Validation Checklist

```bash
# Before returning response from Dify agent:

1. Message exists and is non-empty
   ✅ message.length > 0

2. Citation numbers match inline [n]
   ✅ Every [1] in message → citations[0].number = 1
   ✅ Every [2] in message → citations[1].number = 2

3. All required citation fields present
   ✅ id, number, sourceType, sourceId, title, evidence

4. Confidence scores are valid
   ✅ 0 <= confidence <= 1 (or undefined)

5. Source IDs are correct format
   ✅ PubMed: digits only (PMID)
   ✅ YouTube: 11 character alphanumeric
   ✅ Supabase: table:recordId format
   ✅ PDF: S3 URL or storage path

6. Follow-up questions are relevant
   ✅ 3-5 questions (optional but recommended)
   ✅ Questions are open-ended

7. JSON is valid
   ✅ No syntax errors
   ✅ Proper string escaping
   ✅ No undefined values (null instead)
```

### Validation Script (JavaScript)

```javascript
function validateAgentResponse(response) {
  const errors = [];
  
  // Check message
  if (!response.message || response.message.trim() === '') {
    errors.push("message is required and non-empty");
  }
  
  // Check citation numbers match
  const citationMatches = [...response.message.matchAll(/\[(\d+)\]/g)];
  const citationNumbers = new Set(citationMatches.map(m => parseInt(m[1])));
  
  (response.citations || []).forEach(cit => {
    if (!citationNumbers.has(cit.number)) {
      errors.push(`Citation #${cit.number} not referenced in message`);
    }
  });
  
  // Check confidence scores
  (response.citations || []).forEach((cit, idx) => {
    if (cit.confidence !== undefined && (cit.confidence < 0 || cit.confidence > 1)) {
      errors.push(`Citation ${idx} confidence out of range: ${cit.confidence}`);
    }
  });
  
  return {
    valid: errors.length === 0,
    errors: errors
  };
}
```

---

## Common Errors

### Error 1: Citation Number Mismatch

```
❌ WRONG:
message: "Botox works[1]"
citations: [{ number: 2, ... }]

✅ CORRECT:
message: "Botox works[1]"
citations: [{ number: 1, ... }]
```

### Error 2: Missing Metadata

```
❌ WRONG:
{
  "id": "cit_1",
  "number": 1,
  "sourceType": "pubmed",
  "sourceId": "12345678",
  "title": "Study Title",
  "evidence": "..."
  // Missing metadata (optional but recommended)
}

✅ CORRECT:
{
  "id": "cit_1",
  "number": 1,
  "sourceType": "pubmed",
  "sourceId": "12345678",
  "title": "Study Title",
  "evidence": "...",
  "metadata": {
    "pmid": "12345678",
    "authors": "...",
    "journal": "...",
    "year": 2024
  }
}
```

### Error 3: Invalid Confidence

```
❌ WRONG:
"confidence": 105  // Out of range

✅ CORRECT:
"confidence": 0.95  // 0-1 range
```

---

## Quick Reference Card

```
REQUIRED in message:
  - [1], [2], [3] citations

REQUIRED per citation:
  - id: "cit_1"
  - number: 1
  - sourceType: "pubmed" | "youtube" | "supabase" | "pdf" | "transcript"
  - sourceId: "12345678"
  - title: "Study Title"
  - evidence: "Quote from source"

OPTIONAL:
  - confidence: 0.95
  - metadata: { ... }
  - follow_up_questions: ["Q1", "Q2"]

VALIDATION:
  - [1] in message must match citations[0].number
  - confidence must be 0-1
  - evidence should be 50-300 chars
  - JSON must be valid
```

