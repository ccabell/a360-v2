# A360 Integration Diagram - UI ↔ Dify Agent Flow

Visual guide showing how everything connects.

---

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                    FRONTEND (a360-v2)                            │
│                  Next.js + React + TypeScript                    │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  ┌────────────────────────────────────────────────────────┐     │
│  │           Chat Page (Dashboard Module)                 │     │
│  │  ┌──────────────────────────────────────────────┐      │     │
│  │  │  User Input                                  │      │     │
│  │  │  "What is Botox approved for?"              │      │     │
│  │  └────────────────────┬─────────────────────────┘      │     │
│  │                       │                                 │     │
│  │                       ▼                                 │     │
│  │  ┌──────────────────────────────────────────────┐      │     │
│  │  │  API Request                                 │      │     │
│  │  │  POST /api/agents/consultation               │      │     │
│  │  │  body: { message, context }                  │      │     │
│  │  └────────────────────┬─────────────────────────┘      │     │
│  └────────────────────────┼─────────────────────────────────┘     │
│                           │                                       │
│                     HTTP/REST                                     │
│                           │                                       │
└───────────────────────────┼───────────────────────────────────────┘
                            │
        ┌───────────────────┴────────────────────┐
        │                                        │
        ▼                                        ▼
┌──────────────────────┐         ┌──────────────────────┐
│   API Layer          │         │   Dify Agent         │
│  (Your backend)      │         │  (Hosted on Railway) │
├──────────────────────┤         ├──────────────────────┤
│                      │         │                      │
│ 1. Receive request   │         │ 1. Receive query     │
│ 2. Validate input    │         │ 2. Run retrieval     │
│ 3. Call Dify API     │──────→  │ 3. Generate response │
│ 4. Parse response    │  JSON   │ 4. Format output     │
│ 5. Return to UI      │  ←────  │ 5. Return JSON       │
│                      │         │                      │
└──────────────────────┘         └──────┬───────────────┘
        │                               │
        │                    ┌──────────┘
        │                    │
        │                    ▼
        │         ┌──────────────────────────┐
        │         │  Supabase GL Database    │
        │         ├──────────────────────────┤
        │         │                          │
        │         │ gl_agent_fuel_documents  │
        │         │ ├─ content              │
        │         │ ├─ source_type          │
        │         │ ├─ source_id            │
        │         │ ├─ metadata (JSONB)     │
        │         │ └─ confidence           │
        │         │                          │
        │         └──────────────────────────┘
        │
        ▼
┌─────────────────────────────────────────────┐
│    Response Rendering (Frontend)            │
├─────────────────────────────────────────────┤
│                                             │
│  MessageWithCitations Component:            │
│                                             │
│  "Botox is FDA-approved[1] with onset      │
│   within 3-7 days[2]"                      │
│                                             │
│  ┌─────────────────────────────────────┐   │
│  │ References (1)                      │   │
│  │ [1] Clinical Efficacy...            │   │
│  │     PubMed • 2024                   │   │
│  │     ✓ 98% confident                 │   │
│  │     📄 [View Source]                │   │
│  │                                     │   │
│  │ [2] Timeline and Efficacy...        │   │
│  │     PubMed • 2023                   │   │
│  │     ✓ 96% confident                 │   │
│  │     📄 [View Source]                │   │
│  └─────────────────────────────────────┘   │
│                                             │
│  Follow-up Questions:                      │
│  • Have you had Botox before?              │
│  • What is your timeline?                  │
│  • Would you like a treatment plan?        │
│                                             │
└─────────────────────────────────────────────┘
```

---

## 📊 Data Flow: Message → Citations → UI

```
STEP 1: Dify Agent Generates Response
┌──────────────────────────────────────────┐
│ LLM Output (Dify)                        │
├──────────────────────────────────────────┤
│ message: "Botox is FDA-approved[1]"      │
│ retrieved_documents: [                   │
│   {                                      │
│     title: "Clinical Efficacy...",       │
│     source_type: "pubmed",               │
│     source_id: "12345678",               │
│     evidence: "FDA-approved...",         │
│     metadata: {                          │
│       pmid: "12345678",                  │
│       authors: "Smith J, et al",         │
│       journal: "...",                    │
│       year: 2024                         │
│     }                                    │
│   }                                      │
│ ]                                        │
└──────────────────────────────────────────┘
           │
           ▼
STEP 2: Citation Formatter Maps Data
┌──────────────────────────────────────────┐
│ A360 CitationResponse                    │
├──────────────────────────────────────────┤
│ {                                        │
│   "message": "Botox is FDA-approved[1]", │
│   "citations": [                         │
│     {                                    │
│       "id": "cit_1",                     │
│       "number": 1,                       │
│       "sourceType": "pubmed",            │
│       "sourceId": "12345678",            │
│       "title": "Clinical Efficacy...",   │
│       "evidence": "FDA-approved...",     │
│       "confidence": 0.98,                │
│       "metadata": {                      │
│         "pmid": "12345678",              │
│         "authors": "Smith J, et al",     │
│         "journal": "JAD",                │
│         "year": 2024,                    │
│         "doi": "10.1016/j.jad.2024..."   │
│       }                                  │
│     }                                    │
│   ],                                     │
│   "follow_up_questions": [...]           │
│ }                                        │
└──────────────────────────────────────────┘
           │
           ▼
STEP 3: Frontend Renders with Components
┌──────────────────────────────────────────┐
│ <MessageWithCitations>                   │
│   message="Botox is FDA-approved[1]"     │
│   citations={citations}                  │
│ </MessageWithCitations>                  │
│                                          │
│ Internal Logic:                          │
│ 1. Parse [1] from message                │
│ 2. Find citations[0]                     │
│ 3. Render as InlineCitationBadge [1]     │
│ 4. Show ReferenceCard on expand          │
└──────────────────────────────────────────┘
           │
           ▼
STEP 4: User Sees Formatted Output
┌──────────────────────────────────────────┐
│ "Botox is FDA-approved[1]"               │
│                                          │
│ [Click [1] to expand]                    │
│                                          │
│ [1] Clinical Efficacy of Botulinum...    │
│     Smith J, et al.                      │
│     Journal of Aesthetic Dermatology     │
│     2024 • DOI: 10.1016/...              │
│     ✓ 98% confident                      │
│     [View Source] [Copy Citation]        │
└──────────────────────────────────────────┘
```

---

## 🔄 Dify Agent Workflow

```
CONSULTATION ASSISTANT AGENT
┌─────────────────────────────────────────────────────┐
│                                                      │
│  ┌────────────────────────────────────────────┐    │
│  │ 1. TRIGGER: User sends message             │    │
│  │    "What is Botox approved for?"           │    │
│  └────────────┬─────────────────────────────── ┘    │
│               │                                      │
│  ┌────────────▼────────────────────────────────┐    │
│  │ 2. RETRIEVAL: Search Supabase GL            │    │
│  │    Query: "Botox FDA approval efficacy"     │    │
│  │    Top K: 5                                 │    │
│  │    Result: 3 matching documents             │    │
│  └────────────┬─────────────────────────────── ┘    │
│               │                                      │
│  ┌────────────▼────────────────────────────────┐    │
│  │ 3. LLM: Generate Response                   │    │
│  │    Input:                                   │    │
│  │    - User question                          │    │
│  │    - Retrieved documents (3x)               │    │
│  │    - Prompt with citation instructions      │    │
│  │    Output: Text with [1], [2], [3]         │    │
│  └────────────┬─────────────────────────────── ┘    │
│               │                                      │
│  ┌────────────▼────────────────────────────────┐    │
│  │ 4. CONDITIONAL: Check retrieval results     │    │
│  │    If docs found:                           │    │
│  │    → Proceed to formatter                   │    │
│  │    If no docs:                              │    │
│  │    → Return "I don't have info on that"     │    │
│  └────────────┬─────────────────────────────── ┘    │
│               │                                      │
│  ┌────────────▼────────────────────────────────┐    │
│  │ 5. FORMATTER: Map to A360 Schema            │    │
│  │    Input:                                   │    │
│  │    - LLM response + [1], [2], [3]          │    │
│  │    - Retrieved documents with metadata      │    │
│  │    Output:                                  │    │
│  │    {                                        │    │
│  │      message: "...[1][2][3]",               │    │
│  │      citations: [{...}, {...}, {...}],      │    │
│  │      follow_up_questions: [...]             │    │
│  │    }                                        │    │
│  └────────────┬─────────────────────────────── ┘    │
│               │                                      │
│  ┌────────────▼────────────────────────────────┐    │
│  │ 6. OUTPUT: Return JSON to API               │    │
│  │    ✓ Valid schema                           │    │
│  │    ✓ Citation numbers match                 │    │
│  │    ✓ Metadata complete                      │    │
│  │    ✓ Ready for frontend                     │    │
│  └────────────────────────────────────────────┘    │
│                                                      │
└─────────────────────────────────────────────────────┘
```

---

## 📋 Citation Mapping by Source Type

```
PUBMED ARTICLE
┌──────────────────────────┐
│ Dify Retrieval           │
├──────────────────────────┤
│ content: "FDA-approved   │
│   for glabellar lines..."│
│ metadata: {              │
│   pmid: "12345678",      │
│   authors: "Smith J",    │
│   journal: "JAD",        │
│   year: 2024,            │
│   doi: "10.1016/..."     │
│ }                        │
└──────────────────────────┘
           │
           ▼
┌──────────────────────────────────────┐
│ A360 Citation                        │
├──────────────────────────────────────┤
│ sourceType: "pubmed"                 │
│ sourceId: "12345678"                 │
│ title: "Clinical Efficacy..."        │
│ evidence: "FDA-approved for..."      │
│ metadata: {pmid, authors, journal...}│
│ url: "https://pubmed.ncbi..."        │
└──────────────────────────────────────┘
           │
           ▼
┌──────────────────────────────────────┐
│ UI Rendering (ReferenceCard)         │
├──────────────────────────────────────┤
│ [1] Clinical Efficacy of...          │
│     Smith J, et al.                  │
│     Journal of Aesthetic Derm • 2024 │
│     ✓ 98% confident                  │
│     📄 DOI [View Source]              │
└──────────────────────────────────────┘

─────────────────────────────────────────

YOUTUBE VIDEO
┌──────────────────────────┐
│ Dify Retrieval           │
├──────────────────────────┤
│ content: "Expert        │
│   demonstrates..."       │
│ metadata: {              │
│   videoId: "dQw4...",    │
│   timestamp: 234,        │
│   thumbnail: "url"       │
│ }                        │
└──────────────────────────┘
           │
           ▼
┌──────────────────────────────────────┐
│ A360 Citation                        │
├──────────────────────────────────────┤
│ sourceType: "youtube"                │
│ sourceId: "dQw4w9WgXcQ"              │
│ title: "Advanced Injection Techniques"│
│ evidence: "Expert demonstrates..."   │
│ metadata: {videoId, timestamp, ...}  │
│ url: "https://youtube.com/watch..."  │
└──────────────────────────────────────┘
           │
           ▼
┌──────────────────────────────────────┐
│ UI Rendering (ReferenceCard)         │
├──────────────────────────────────────┤
│ [2] Advanced Injection Techniques    │
│     🎥 Video                         │
│     ✓ 89% confident                  │
│     [📺 Watch Video (12:34)]          │
│     [Thumbnail Preview]              │
└──────────────────────────────────────┘

─────────────────────────────────────────

SUPABASE PRODUCT
┌──────────────────────────┐
│ Dify Retrieval           │
├──────────────────────────┤
│ content: "20-40 units    │
│   per area..."           │
│ metadata: {              │
│   table: "gl_products",  │
│   recordId: "botox_..."  │
│ }                        │
└──────────────────────────┘
           │
           ▼
┌──────────────────────────────────────┐
│ A360 Citation                        │
├──────────────────────────────────────┤
│ sourceType: "supabase"               │
│ sourceId: "products:botox_cosmetic"  │
│ title: "Botox Cosmetic Product Guide"│
│ evidence: "Recommended dosing: 20..."│
│ metadata: {table, recordId, ...}     │
│ url: "/dashboard/products/botox"     │
└──────────────────────────────────────┘
           │
           ▼
┌──────────────────────────────────────┐
│ UI Rendering (ReferenceCard)         │
├──────────────────────────────────────┤
│ [3] Botox Cosmetic Product Guide     │
│     📚 Product Guide                 │
│     ✓ 98% confident                  │
│     [Internal Link] → View Product   │
└──────────────────────────────────────┘
```

---

## 🔌 Frontend Integration Points

```
CHAT PAGE COMPONENT HIERARCHY
┌─────────────────────────────────────────────────────┐
│ <ChatPage>                                          │
├─────────────────────────────────────────────────────┤
│                                                     │
│ State:                                              │
│ - messages: Message[]                               │
│ - input: string                                     │
│ - loading: boolean                                  │
│                                                     │
│ ┌──────────────────────────────────────────────┐   │
│ │ <ScrollArea>                                 │   │
│ │  ┌─────────────────────────────────────────┐ │   │
│ │  │ <ChatBubble variant="sent">             │ │   │
│ │  │  User message here                      │ │   │
│ │  │ </ChatBubble>                           │ │   │
│ │  │                                         │ │   │
│ │  │ <ChatBubble variant="received">         │ │   │
│ │  │  <MessageWithCitations                  │ │   │
│ │  │   message={message}                     │ │   │
│ │  │   citations={citations}                 │ │   │
│ │  │  >                                      │ │   │
│ │  │   Content:                              │ │   │
│ │  │   ┌──────────────────────────────────┐  │ │   │
│ │  │   │ InlineCitationBadge [1]          │  │ │   │
│ │  │   │ InlineCitationBadge [2]          │  │ │   │
│ │  │   │ InlineCitationBadge [3]          │  │ │   │
│ │  │   │                                  │  │ │   │
│ │  │   │ <ReferencesSection>              │  │ │   │
│ │  │   │  <ReferenceCard [1]/>            │  │ │   │
│ │  │   │  <ReferenceCard [2]/>            │  │ │   │
│ │  │   │  <ReferenceCard [3]/>            │  │ │   │
│ │  │   │ </ReferencesSection>             │  │ │   │
│ │  │   └──────────────────────────────────┘  │ │   │
│ │  │  </MessageWithCitations>                │ │   │
│ │  │ </ChatBubble>                           │ │   │
│ │  └─────────────────────────────────────────┘ │   │
│ │                                             │   │
│ │  {loading && <LoadingIndicator />}          │   │
│ │                                             │   │
│ └──────────────────────────────────────────────┘   │
│                                                     │
│ <InputArea>                                         │
│  <Input placeholder="Ask..." value={input} />      │
│  <Button onClick={handleSendMessage}>Send</Button> │
│ </InputArea>                                        │
│                                                     │
└─────────────────────────────────────────────────────┘

MESSAGE FLOW:
1. User types: "What is Botox?"
2. Click Send
3. handleSendMessage() →
   - POST /api/agents/consultation
   - body: { message: "What is Botox?" }
4. API returns AgentResponse
   - message: "Botox is FDA-approved[1]..."
   - citations: [{id, number, sourceType, ...}, ...]
   - follow_up_questions: [...]
5. Add to messages state
6. Render with MessageWithCitations
7. User sees message with [1][2][3] badges
8. User clicks [1] → ReferenceCard expands
9. User clicks link → Opens source
```

---

## 🎯 Implementation Checklist

### Before Building Dify Agents
- [ ] Read all docs/ files
- [ ] Understand Citation interface (types.ts)
- [ ] Review API_CONTRACT.md examples
- [ ] Understand citation number matching rule

### While Building Dify Agents
- [ ] Use templates from DIFY_AGENT_EXAMPLES.md
- [ ] Configure Retrieval block correctly
- [ ] Add LLM prompt with citation instructions
- [ ] Test response against API_CONTRACT.md
- [ ] Validate JSON before deployment

### After Deploying Agents
- [ ] Call API with test messages
- [ ] Verify citations render in Chat page
- [ ] Click citation badges → check metadata
- [ ] Click source links → verify URLs
- [ ] Test follow-up questions appear
- [ ] Iterate on prompt based on output quality

---

## 📈 Scaling from 1 to 5 Agents

```
AGENT 1: Consultation Assistant
┌──────────────────┐
│ Retrieval → LLM  │
│ Citations: [1-3] │
└────────┬─────────┘
         │
         ▼
    ✅ Works!
    → Copy pattern


AGENTS 2-3: Treatment Planner + Evidence Researcher
┌──────────────────┐    ┌──────────────────┐
│ Retrieval → LLM  │    │ Multi-Retrieval  │
│ Citations: [1-5] │    │ → Synthesize     │
└────────┬─────────┘    │ Citations: [1-10]│
         │              └────────┬─────────┘
         │                       │
         └───────────┬───────────┘
                     │
                     ▼
                ✅ Pattern holds
                → All follow same schema


AGENTS 4-5: Specialized agents
┌──────────────────┐
│ Advanced patterns│
│ but same output │
│ schema!         │
└────────┬─────────┘
         │
         ▼
    ✅ Zero UI changes needed!
```

---

## 🚀 Timeline

```
Week 1: Foundation
├─ Read all documentation (6 hours)
├─ Set up Supabase GL with metadata (4 hours)
└─ Build Agent #1: Consultation Assistant (4 hours)
   └─ Total: 14 hours

Week 2: Scaling
├─ Build Agent #2: Treatment Planner (3 hours)
├─ Build Agent #3: Evidence Researcher (3 hours)
├─ Refine prompts based on feedback (3 hours)
└─ Polish citation metadata (2 hours)
   └─ Total: 11 hours

Week 3: Polish
├─ Build Agents #4-5 (specialized) (6 hours)
├─ Optimize retrieval performance (3 hours)
├─ Fine-tune confidence scores (2 hours)
└─ Test edge cases (2 hours)
   └─ Total: 13 hours

TOTAL: ~40 hours to 5 production agents
```

---

**Visual Guide Complete!** Now read the docs in order and start building. 🚀

