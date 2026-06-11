# Dify Agent Examples - A360 v2

Ready-to-use Dify agent templates and configurations.

---

## Agent 1: Consultation Assistant

### Purpose
Answer questions about treatments, procedures, and aesthetic medicine with evidence-based citations.

### Dify Workflow Nodes

```
┌─────────────────────────────────────────────────────┐
│ START AGENT: consultation_assistant_v1.0            │
└─────────────────────────────────────────────────────┘
                        │
                        ▼
        ┌──────────────────────────────┐
        │ Node: Retrieval (Documents)  │
        ├──────────────────────────────┤
        │ Knowledge Base: "A360 GL"    │
        │ Query: {{ user_question }}   │
        │ Top K: 5                     │
        │ Score: > 0.6                 │
        └──────────────────────────────┘
                        │
                        ▼
        ┌──────────────────────────────┐
        │ Node: LLM (Generate Response)│
        ├──────────────────────────────┤
        │ Model: gpt-4o                │
        │ Temperature: 0.3             │
        └──────────────────────────────┘
                        │
                        ▼
        ┌──────────────────────────────┐
        │ Node: Citation Formatter     │
        │ (Custom JS/Python)           │
        ├──────────────────────────────┤
        │ Input: LLM response +        │
        │        Retrieval docs        │
        │ Output: A360 CitationResponse│
        └──────────────────────────────┘
                        │
                        ▼
        ┌──────────────────────────────┐
        │ Node: Follow-up Generator    │
        ├──────────────────────────────┤
        │ LLM: Generate 3-5 questions  │
        │ based on response            │
        └──────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────┐
│ END: Return JSON (message, citations, follow-ups)   │
└─────────────────────────────────────────────────────┘
```

### LLM Prompt (Node: LLM)

```
You are an evidence-based medical aesthetics consultant for A360.

Your role:
- Answer questions about aesthetic treatments with clinical evidence
- Cite all sources using [1], [2], [3] format
- Be honest about what you know vs. don't know
- Recommend further consultation when needed

Retrieved Evidence:
{{ retrieval_results }}

User Question:
{{ user_question }}

Guidelines:
1. Quote directly from evidence whenever possible
2. Use [1], [2], [3] citations inline
3. Start with the most relevant evidence first
4. Mention confidence level if discussing treatment options
5. Suggest next steps or follow-up questions

Response Format:
Provide a clear, evidence-based answer with proper citations.
```

### Citation Formatter Logic (Node: Citation Formatter)

```python
# Pseudo-code for formatting Dify retrieval → A360 schema

def format_citations(llm_response, retrieval_docs):
    """
    Parse LLM response [1], [2], [3] and map to retrieval_docs
    Return A360 CitationResponse format
    """
    
    # Extract citation numbers from response
    citation_pattern = r'\[(\d+)\]'
    citation_numbers = extract_pattern(llm_response, citation_pattern)
    
    citations = []
    for idx, num in enumerate(citation_numbers):
        if num <= len(retrieval_docs):
            doc = retrieval_docs[num - 1]
            
            citation = {
                "id": f"cit_{num}",
                "number": num,
                "sourceType": doc.get("source_type", "internal"),
                "sourceId": doc.get("source_id", ""),
                "title": doc.get("title", ""),
                "evidence": doc.get("evidence", doc.get("content", "")[:200]),
                "confidence": doc.get("confidence", 0.85),
                "metadata": doc.get("metadata", {})
            }
            citations.append(citation)
    
    return {
        "message": llm_response,
        "citations": citations,
        "confidence": calculate_avg_confidence(citations)
    }
```

### Follow-up Questions (Node: Follow-up Generator)

```
Based on the user's question about {{ user_question }}, 
and the answer provided, generate 3-5 natural follow-up questions.

Response should guide the conversation toward:
- Deeper understanding of their concern
- Treatment options discovery
- Timeline and budget clarity
- Next steps

Format as JSON array: ["Q1", "Q2", "Q3"]
```

### Example Exchange

**User**: "What is Botox approved for?"

**LLM Response**:
"Botox is FDA-approved for dynamic facial wrinkles[1], specifically glabellar lines (between the eyebrows), crow's feet (around the eyes), and forehead lines[1]. Studies show that most patients see results within 3-7 days, with peak effect at 2 weeks[2]. It requires maintenance every 12 weeks for sustained results[2]."

**Formatted Output**:
```json
{
  "message": "Botox is FDA-approved for dynamic facial wrinkles[1], specifically glabellar lines (between the eyebrows), crow's feet (around the eyes), and forehead lines[1]. Studies show that most patients see results within 3-7 days, with peak effect at 2 weeks[2]. It requires maintenance every 12 weeks for sustained results[2].",
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
        "year": 2024
      }
    },
    {
      "id": "cit_2",
      "number": 2,
      "sourceType": "pubmed",
      "sourceId": "87654321",
      "title": "Timeline and Efficacy of Botulinum Toxin Type A",
      "evidence": "Onset within 3-7 days, peak effect at 2 weeks, maintenance every 12 weeks",
      "confidence": 0.96,
      "metadata": {
        "pmid": "87654321",
        "authors": "Brown A, Davis C",
        "journal": "Dermatologic Surgery",
        "year": 2023
      }
    }
  ],
  "follow_up_questions": [
    "Have you experienced dynamic wrinkles in these areas?",
    "What is your timeline for seeing results?",
    "Would you be interested in combining Botox with other treatments?",
    "Do you have any concerns about the maintenance schedule?"
  ],
  "confidence": 0.97
}
```

---

## Agent 2: Treatment Plan Generator

### Purpose
Generate personalized 3-tier treatment plans with evidence for specific patient profiles.

### Dify Workflow Nodes

```
┌─────────────────────────────────────────────────────┐
│ START AGENT: treatment_plan_generator_v1.0          │
└─────────────────────────────────────────────────────┘
                        │
         (Patient Profile Input)
                        │
                        ▼
    ┌─────────────────────────────────┐
    │ Node: Extract Patient Context   │
    │ LLM: Parse concerns, goals, etc │
    └─────────────────────────────────┘
                        │
                        ▼
    ┌─────────────────────────────────┐
    │ Node: Retrieval (GL Products)   │
    │ Query: {{ patient_concerns }}   │
    │ Return: Matching treatments     │
    └─────────────────────────────────┘
                        │
                        ▼
    ┌─────────────────────────────────┐
    │ Node: Generate 3-Tier Plans     │
    │ LLM: Create Foundation/Advanced │
    │      /Premium options           │
    └─────────────────────────────────┘
                        │
                        ▼
    ┌─────────────────────────────────┐
    │ Node: Add Evidence Citations    │
    │ Attach research for each plan   │
    └─────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────┐
│ END: Return 3-tier plans with citations             │
└─────────────────────────────────────────────────────┘
```

### LLM Prompt (Node: Generate 3-Tier Plans)

```
You are creating a 3-tier personalized treatment plan for a patient.

Patient Profile:
{{ patient_context }}

Available Treatments:
{{ matching_treatments }}

Create three distinct treatment options:

TIER 1: FOUNDATION
- Entry-level approach
- Addresses primary concern
- Lower cost
- Basic timeline
- Cite evidence for recommended treatments

TIER 2: ADVANCED (RECOMMENDED)
- Multi-modal approach combining 2-3 treatments
- Comprehensive results
- Moderate cost
- Specific timeline
- Cite clinical studies on combination therapy

TIER 3: PREMIUM
- Most comprehensive approach
- Addresses all concerns
- Maximum results
- Longer timeline
- Cite evidence for optimal outcomes

For EACH tier, include:
1. Specific treatments with dosages/quantities
2. Total cost range
3. Timeline to full results
4. Expected benefits
5. Key considerations
6. 2-3 relevant citations [1], [2], [3]

Format as structured JSON with citations.
```

### Output Format

```json
{
  "patient_id": "uuid",
  "plans": [
    {
      "tier": 1,
      "name": "Foundation Plan",
      "cost": "$400-600",
      "timeline": "6-8 weeks",
      "treatments": [
        {
          "name": "Botox Cosmetic",
          "dosage": "20 units",
          "area": "Glabellar lines"
        },
        {
          "name": "Professional Skincare",
          "description": "Daily regimen upgrade"
        }
      ],
      "benefits": [
        "Addresses dynamic wrinkles",
        "Immediate improvement",
        "Minimal downtime"
      ],
      "considerations": [
        "Results visible 3-7 days",
        "Peak effect at 2 weeks",
        "Maintenance every 12 weeks"
      ],
      "citations": [
        {
          "id": "cit_1",
          "number": 1,
          "sourceType": "pubmed",
          "title": "Clinical Efficacy of Botulinum Toxin",
          "evidence": "FDA-approved for dynamic wrinkles..."
        }
      ]
    },
    {
      "tier": 2,
      "name": "Advanced Plan",
      "recommended": true,
      "cost": "$1,200-1,800",
      "timeline": "8-12 weeks",
      "treatments": [
        {
          "name": "Botox Cosmetic",
          "dosage": "40 units"
        },
        {
          "name": "Juvederm Voluma",
          "volume": "1.0 mL"
        },
        {
          "name": "Professional Skincare",
          "description": "Medical-grade regimen"
        }
      ],
      "benefits": [
        "Multi-modal approach",
        "Addresses volume loss",
        "Natural results",
        "Longer duration"
      ],
      "citations": [
        {
          "id": "cit_2",
          "number": 1,
          "sourceType": "pubmed",
          "title": "Combined Treatment Efficacy"
        }
      ]
    },
    {
      "tier": 3,
      "name": "Premium Plan",
      "cost": "$2,500-4,000",
      "timeline": "12-16 weeks",
      "treatments": [
        {
          "name": "Botox Cosmetic",
          "dosage": "60 units"
        },
        {
          "name": "Juvederm Voluma",
          "volume": "2.0 mL"
        },
        {
          "name": "Restylane Lyft",
          "volume": "1.0 mL"
        },
        {
          "name": "Skin Booster Treatments",
          "sessions": 3
        }
      ],
      "benefits": [
        "Comprehensive rejuvenation",
        "Addresses all concerns",
        "Maximum results",
        "Enhanced skin quality"
      ],
      "citations": [
        {
          "id": "cit_3",
          "number": 1,
          "sourceType": "pubmed",
          "title": "Multi-product Treatment Approach"
        }
      ]
    }
  ],
  "next_steps": [
    "Review plan with practitioner",
    "Discuss timeline preferences",
    "Confirm budget alignment"
  ]
}
```

---

## Agent 3: Evidence Researcher

### Purpose
Deep-dive research on specific topics with comprehensive citations.

### Dify Workflow

```
User Query: "Tell me everything about Botox"
        │
        ▼
Multi-source Retrieval:
  - Search GL PubMed docs
  - Search GL YouTube docs
  - Search GL Internal docs
        │
        ▼
LLM Synthesis:
  - Consolidate findings
  - Generate comprehensive answer
  - Include citations [1][2][3]...
        │
        ▼
Output:
  - Full research summary
  - 5+ citations
  - Confidence scores
  - Key findings highlighted
```

### LLM Prompt (Node: Synthesize Evidence)

```
You are conducting comprehensive research on: {{ topic }}

Sources Available:
- PubMed Research Articles
- YouTube Educational Videos
- Internal A360 Product Guides

Synthesize all available evidence into:

1. **Overview** [cite evidence]
   What is {{ topic }}? Brief description.

2. **Clinical Efficacy** [cite studies]
   What does research show about effectiveness?

3. **Treatment Timeline** [cite evidence]
   When do patients see results?

4. **Maintenance Requirements** [cite studies]
   What ongoing care is needed?

5. **Safety & Contraindications** [cite guidelines]
   Who should avoid this treatment?

6. **Combinations with Other Treatments** [cite research]
   What pairs well with {{ topic }}?

7. **Patient Satisfaction** [cite studies]
   What do patient outcomes show?

8. **Cost-Benefit Analysis** [cite evidence]
   Is this treatment cost-effective?

For EACH section, cite [1][2][3] your sources.
Rate your confidence (0-1) for each claim.
Highlight any conflicting evidence.
```

### Output Format

```json
{
  "topic": "Botox (Botulinum Toxin Type A)",
  "research_summary": "Comprehensive overview with [1][2][3] citations",
  "sections": [
    {
      "title": "Clinical Efficacy",
      "content": "Studies show [1] efficacy for dynamic wrinkles...",
      "citations": [1, 2, 3]
    }
  ],
  "all_citations": [
    {
      "number": 1,
      "sourceType": "pubmed",
      "title": "...",
      "confidence": 0.98
    },
    {
      "number": 2,
      "sourceType": "pubmed",
      "title": "...",
      "confidence": 0.95
    }
  ],
  "sources_analyzed": 12,
  "avg_confidence": 0.93,
  "conflicting_evidence": [
    {
      "claim": "Timeline to results",
      "source1": "Study A: 3-5 days",
      "source2": "Study B: 5-7 days"
    }
  ]
}
```

---

## Agent 4: Conversation Opener

### Purpose
Greet user and provide opening questions to guide consultation.

### Dify Configuration

```
Trigger: New Conversation
        │
        ▼
LLM Node:
  Prompt: Generate 3-5 opening questions
          about aesthetic goals
        │
        ▼
Output:
  - Welcome message
  - 3-5 opening questions
  - Brief explanation of A360
```

### LLM Prompt

```
You are starting a consultation with a new patient.

Generate a warm welcome and 3-5 opening questions to:
1. Understand their aesthetic concerns
2. Assess their familiarity with treatments
3. Identify timeline and budget preferences
4. Build rapport

Keep tone professional but friendly.
Make questions open-ended to encourage dialogue.

Output JSON:
{
  "welcome_message": "...",
  "opening_questions": [
    "Question 1?",
    "Question 2?",
    "Question 3?"
  ]
}
```

### Output

```json
{
  "type": "conversation_opener",
  "welcome_message": "Welcome to your A360 aesthetic consultation. I'm here to help you understand your options and create a personalized plan. Let's start by learning about your goals.",
  "opening_questions": [
    "What is your primary aesthetic concern - is it dynamic wrinkles, volume loss, skin texture, or something else?",
    "Is this your first time considering professional aesthetic treatments, or have you had treatments before?",
    "What's your ideal timeline - are you looking for immediate results, or are you willing to invest in a longer-term plan?",
    "Do you have a budget range in mind for treatment?",
    "Are there any specific areas you'd like to focus on first?"
  ]
}
```

---

## Quick Copy-Paste Templates

### Retrieval Block Configuration

```yaml
Knowledge Base: A360 Medical Aesthetics
Embedding Model: OpenAI text-embedding-3-small
Retrieval Mode: Hybrid (Vector + Keyword)
Top K: 5
Score Threshold: 0.6
Return Fields:
  - content
  - title
  - source_type
  - source_id
  - evidence
  - metadata
  - confidence
```

### Citation Formatting Script (JavaScript)

```javascript
function formatCitations(llmResponse, retrievalDocs) {
  const citations = [];
  const citationMatches = [...llmResponse.matchAll(/\[(\d+)\]/g)];
  
  citationMatches.forEach((match, index) => {
    const docIndex = parseInt(match[1]) - 1;
    if (docIndex < retrievalDocs.length) {
      const doc = retrievalDocs[docIndex];
      citations.push({
        id: `cit_${match[1]}`,
        number: parseInt(match[1]),
        sourceType: doc.source_type,
        sourceId: doc.source_id,
        title: doc.title,
        evidence: doc.evidence,
        confidence: doc.confidence || 0.85,
        metadata: doc.metadata
      });
    }
  });
  
  return {
    message: llmResponse,
    citations: citations
  };
}
```

### Follow-up Question Template

```
Based on this response, what are logical next questions?

Topics to consider:
- Related treatments
- Timeline clarification
- Budget details
- Safety concerns
- Combination options

Generate 3-5 questions as JSON array.
```

---

## Testing Checklist

- [ ] Dify agent responds to user query
- [ ] Response includes [1], [2], [3] citations
- [ ] Each citation has corresponding metadata
- [ ] Citations map correctly (cit_1 = citation[0])
- [ ] Confidence scores are reasonable (0-1)
- [ ] Follow-up questions are relevant
- [ ] JSON response parses without errors
- [ ] UI renders citations correctly
- [ ] Links work (PubMed, YouTube, internal)

