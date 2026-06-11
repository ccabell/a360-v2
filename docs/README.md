# A360 v2 Documentation

Complete guide to building the A360 intelligence platform with proper UI/Agent alignment.

---

## 📚 Documentation Structure

### 1. **TEMPLATE_SUMMARY.md** (Root level)
**What**: Overview of the UI template and what's built
- Design system (light theme, colors, typography)
- Page layouts (Chat, RAG, TCP, etc.)
- Citation component architecture
- Project structure
- Next steps

**When to read**: First thing - understand what UI you have

### 2. **docs/DIFY_INTEGRATION.md** (This folder)
**What**: How to build Dify agents that work with A360
- Dify citations & attributions overview
- Citation mapping (Dify → A360 format)
- Agent architecture patterns
- Citation types and source mapping
- Supabase setup for Dify
- Best practices (DO/DON'T)
- Checklist for getting started

**When to read**: Before building your first Dify agent

### 3. **docs/DIFY_AGENT_EXAMPLES.md**
**What**: Ready-to-use Dify agent templates
- Consultation Assistant (example with prompts)
- Treatment Plan Generator (3-tier system)
- Evidence Researcher (deep-dive research)
- Conversation Opener (greeting + opening questions)
- Copy-paste LLM prompts
- Testing checklist

**When to read**: When building agents - copy these templates and customize

### 4. **docs/API_CONTRACT.md**
**What**: Exact JSON schema for agent responses
- TypeScript interfaces
- Full example responses
- Validation rules
- Citation number matching
- Common errors & fixes
- Quick reference card

**When to read**: Before testing agents - validate your responses match this schema

### 5. **components/citations/types.ts**
**What**: TypeScript types used in the UI
- Citation interface
- AgentResponse interface
- CitationSourceType enum

**When to read**: When integrating - ensures type safety

---

## 🎯 Quick Start: Building Your First Dify Agent

### Phase 1: Setup (30 min)

1. Read: `docs/DIFY_INTEGRATION.md` (sections 1-3)
2. Set up Supabase GL documents with metadata (section 8)
3. Create Dify Retrieval block (section 2)

### Phase 2: Build (1-2 hours)

1. Choose agent template: `docs/DIFY_AGENT_EXAMPLES.md`
2. Copy LLM prompt from template
3. Configure Dify nodes (Retrieval → LLM → Formatter)
4. Test with `docs/API_CONTRACT.md` validation

### Phase 3: Deploy (30 min)

1. Test endpoint returns valid JSON
2. Wire to a360-v2 API layer
3. Test citations render in UI
4. Iterate on confidence scores and metadata

### Phase 4: Scale (Ongoing)

1. Create more agents using templates
2. Refine prompts based on user feedback
3. Improve citation metadata quality
4. Track confidence scores over time

---

## 🔗 Key Mappings

### Dify → A360 Data Flow

```
Dify Knowledge Base (GL documents with metadata)
           ↓
Retrieval Block (extract matching documents)
           ↓
LLM (generate response with [1], [2], [3])
           ↓
Citation Formatter (transform to A360 schema)
           ↓
API Response (JSON matching CitationResponse)
           ↓
Frontend (MessageWithCitations component)
           ↓
UI Renders (inline badges + expandable references)
```

### Citation Type → URL Mapping

| Source | ID Format | URL Pattern | Component |
|--------|-----------|-------------|-----------|
| pubmed | `12345678` | `https://pubmed.ncbi.nlm.nih.gov/{pmid}` | Link |
| youtube | `dQw4w9WgXcQ` | `https://youtube.com/watch?v={id}&t={ts}` | Link + Thumbnail |
| supabase | `products:botox` | `/dashboard/products/{recordId}` | Internal Link |
| pdf | `s3://bucket/x.pdf` | Direct S3 URL | Link + Icon |

---

## 📋 Checklist: Ready for Dify Agents

### UI Side
- ✅ Light theme template built
- ✅ Citation components ready
- ✅ Chat page with message rendering
- ✅ RAG search page for knowledge discovery
- ✅ TCP page for treatment plans
- ✅ Reach/Agent Tester/Consultation placeholders

### Documentation Side
- ✅ Dify integration guide written
- ✅ Agent examples with templates
- ✅ API contract defined
- ✅ Validation rules documented
- ✅ TypeScript types defined

### Supabase Side
- ⏳ Documents uploaded with metadata
- ⏳ Metadata structure defined
- ⏳ Retrieval block configured

### Agent Side
- ⏳ First Dify agent created
- ⏳ Retrieval block tested
- ⏳ LLM prompt tuned
- ⏳ Response validated against schema
- ⏳ Endpoint deployed

---

## 💡 Design Philosophy

### UI Design First
We designed the UI **before** building agents because:
- UI defines what data is needed
- Prevents agent outputs that don't render
- Makes agent prompts predictable
- Simplifies integration and testing

### Citation System as Core
Citations aren't an afterthought:
- Every agent output supports citations
- Users see evidence for claims
- Builds trust in recommendations
- Enables audit trail

### Progressive Disclosure
Information revealed on demand:
- Inline badges in message [1], [2], [3]
- Expandable references on click
- Full metadata available when needed
- Doesn't overwhelm user

---

## 🛠️ Tech Stack

| Component | Technology |
|-----------|-----------|
| Frontend | Next.js 15 + React 19 + TypeScript |
| UI Components | shadcn/ui + Tailwind CSS v4 |
| Styling | Light theme with CSS variables |
| Agent Platform | Dify |
| Backend | Python FastAPI (your Prompts project) |
| Database | Supabase PostgreSQL |
| Storage | S3 for PDFs |
| Deployment | Vercel (frontend) + Railway (agents) |

---

## 📞 Integration Points

### Frontend → API

```typescript
// Chat page calls agent API
fetch('/api/agents/consultation', {
  method: 'POST',
  body: JSON.stringify({
    message: user_input,
    context: consultation_data
  })
})
.then(response => response.json())
.then(data => {
  // data: { message, citations, follow_up_questions }
  // Render with MessageWithCitations component
})
```

### API → Dify

```
Your API layer:
1. Receives user message
2. Calls Dify agent endpoint
3. Parses response
4. Validates against API_CONTRACT.md
5. Returns to frontend
```

### Dify → Supabase GL

```
Dify Retrieval Block:
1. Receives user query
2. Searches Supabase GL documents
3. Returns top 5 with metadata
4. LLM uses to generate response
5. Citation formatter maps to A360 schema
```

---

## 🚀 Next Steps in Order

1. **NOW**: Read all docs (1-2 hours)
2. **Week 1**: Build first Dify agent using template
3. **Week 1**: Test citation rendering in Chat page
4. **Week 2**: Create 2-3 more agents
5. **Week 2**: Refine prompts based on feedback
6. **Week 3**: Build remaining pages (Reach, Consultation, etc.)
7. **Week 4**: Polish and iterate

---

## 📁 Where Everything Lives

```
a360-v2/
├── TEMPLATE_SUMMARY.md           ← Start here
├── docs/
│   ├── README.md                 ← This file
│   ├── DIFY_INTEGRATION.md       ← How to build agents
│   ├── DIFY_AGENT_EXAMPLES.md    ← Copy-paste templates
│   └── API_CONTRACT.md           ← JSON schema
├── components/
│   └── citations/
│       ├── types.ts              ← TypeScript interfaces
│       ├── inline-citation-badge.tsx
│       ├── reference-card.tsx
│       ├── references-section.tsx
│       └── message-with-citations.tsx
└── app/
    └── dashboard/
        ├── chat/page.tsx         ← Example with mock data
        ├── rag/page.tsx
        ├── tcp/page.tsx
        └── ...
```

---

## 🎓 Learning Path

### If you're new to this stack:

1. Start with `TEMPLATE_SUMMARY.md` (understand the UI)
2. Review `components/citations/types.ts` (understand data model)
3. Read `docs/DIFY_INTEGRATION.md` sections 1-3 (understand the flow)
4. Review `docs/API_CONTRACT.md` (understand the contract)
5. Pick one template from `DIFY_AGENT_EXAMPLES.md`
6. Build your first agent

### If you're familiar with Dify:

1. Skim `TEMPLATE_SUMMARY.md` (UI overview)
2. Jump to `docs/DIFY_INTEGRATION.md` section 5-7 (agent patterns)
3. Use `docs/DIFY_AGENT_EXAMPLES.md` templates
4. Reference `docs/API_CONTRACT.md` for validation

### If you're familiar with React:

1. Review `components/citations/*` (see component structure)
2. Check `app/dashboard/chat/page.tsx` (see integration pattern)
3. Review `components/citations/types.ts` (see data model)
4. Understand how Dify responses map to UI

---

## ✨ Key Features Ready

✅ **Light theme** professional design
✅ **Citation system** integrated everywhere
✅ **Type-safe** TypeScript throughout
✅ **Reusable components** for all modules
✅ **Dify documentation** aligned with UI
✅ **Agent templates** ready to customize
✅ **API contract** defined precisely
✅ **Validation rules** for quality assurance

---

## 🤝 Support

- **UI Questions**: Check `TEMPLATE_SUMMARY.md` or review component files
- **Agent Building**: See `DIFY_AGENT_EXAMPLES.md` templates
- **API Issues**: Reference `API_CONTRACT.md` validation rules
- **Integration**: See integration points section above

---

## 📊 Success Metrics

You'll know this is working when:

- ✅ Dify agent returns valid JSON matching schema
- ✅ Citations render correctly in Chat page
- ✅ Citation numbers match inline [1], [2], [3]
- ✅ Links work (PubMed, YouTube, internal)
- ✅ Follow-up questions appear below response
- ✅ Multiple agents follow same pattern
- ✅ New agents can be added without UI changes

---

**Last Updated**: June 11, 2026
**Version**: 1.0
**Status**: Complete and ready for agent development
