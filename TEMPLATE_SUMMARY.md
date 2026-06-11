# A360 v2 Template - Summary

## ✅ What's Built

### Design System
- **Light theme** (professional, readable, clean)
- **Color palette**: Blues, grays, semantic colors (emerald, red, orange, purple)
- **Typography**: Clear hierarchy, readable sans-serif
- **Spacing**: Consistent padding/margins, card-based layout

### Layout Components
- ✅ **Sidebar** - Navigation with 6 modules (Chat, Reach, RAG, Agent Tester, TCP, Consultation)
- ✅ **Header** - Page context and branding
- ✅ **Dashboard layout** - Flex layout with sidebar + main content
- ✅ **Cards** - Reusable Card component for content grouping

### Citation System (Core Feature)
Built as **reusable pattern** across all pages:

**Components:**
1. `InlineCitationBadge` - Blue [1], [2], [3] badges in text
2. `ReferenceCard` - Individual citation with metadata
3. `ReferencesSection` - Collapsible references list
4. `MessageWithCitations` - Helper to parse messages and render citations
5. `Citation` TypeScript interface - Standardized citation data model

**Citation Types Supported:**
- `pubmed` - PubMed articles with authors, journal, DOI, links
- `youtube` - Videos with timestamps, thumbnails, duration
- `supabase` - Internal GL products and fuel documents
- `pdf` - PDFs with page numbers and download links
- `transcript` - Consultation transcripts with speakers and timestamps
- `agent_output` - AI reasoning and outputs

### Pages Built

#### 1. **Chat** (`/dashboard/chat`)
- Message interface with user/agent bubbles
- Inline citations in agent responses
- Expandable references section
- Input area with send button
- Mock agent response with 3 sample citations
- **Pattern**: Chat → Agent Response → Citations

#### 2. **RAG Search** (`/dashboard/rag`)
- Semantic search box
- Search results as reference cards
- Expandable results with details
- Multiple source types (PubMed, YouTube, etc.)
- **Pattern**: Query → Results → Citations

#### 3. **TCP** (`/dashboard/tcp`)
- Patient info input
- 3-tier treatment plan generation
- Treatment cards with:
  - Tier badge (Foundation/Advanced/Premium)
  - Cost and timeline
  - Treatments, benefits, considerations (3-column layout)
  - Evidence citations embedded in cards
- **Pattern**: Input → AI Generated Plans → Evidence

#### 4. **Reach Campaign Manager** (`/dashboard/reach`)
- Placeholder for campaign creation
- Ready for integration

#### 5. **Agent Tester** (`/dashboard/agent-tester`)
- Placeholder for agent testing/debugging
- Ready for integration

#### 6. **Consultation Intelligence** (`/dashboard/consultation`)
- Placeholder for post-consultation analysis
- Ready for integration

---

## 🎯 Citation Pattern (Used Everywhere)

All pages follow the same **citation architecture**:

```
Main Content
   ↓ (with [1], [2], [3] markers in text)
   ├─ Inline Citation Badges [1] [2] [3]
   └─ Expandable References Section
       ├─ Reference Card [1] - PubMed article
       ├─ Reference Card [2] - YouTube video
       └─ Reference Card [3] - GL product
```

**Citation Card Structure:**
```
[Number] Title (linked to source)
  Authors / Journal / Metadata
  Type Badge | Confidence Badge
  CTA Links (DOI, Watch Video, View Product, etc.)
```

---

## 🔧 Agent Integration (Ready for Dify)

The system expects agent responses in this format:

```typescript
{
  "message": "Botox is FDA-approved for dynamic wrinkles[1]...",
  "citations": [
    {
      "id": "cit_1",
      "number": 1,
      "sourceType": "pubmed",
      "sourceId": "12345678",
      "title": "Clinical Efficacy of Botulinum Toxin...",
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

## 📁 Project Structure

```
a360-v2/
├── app/
│   ├── globals.css (light theme CSS variables)
│   ├── layout.tsx (root layout)
│   └── dashboard/
│       ├── layout.tsx (sidebar + header + main)
│       ├── chat/page.tsx
│       ├── rag/page.tsx
│       ├── tcp/page.tsx
│       ├── reach/page.tsx
│       ├── agent-tester/page.tsx
│       └── consultation/page.tsx
├── components/
│   ├── citations/
│   │   ├── types.ts (Citation & AgentResponse interfaces)
│   │   ├── inline-citation-badge.tsx
│   │   ├── reference-card.tsx
│   │   ├── references-section.tsx
│   │   └── message-with-citations.tsx
│   ├── layout/
│   │   └── sidebar.tsx
│   └── ui/
│       ├── button.tsx
│       ├── card.tsx
│       ├── input.tsx
│       ├── badge.tsx
│       ├── scroll-area.tsx
│       ├── separator.tsx
│       ├── tooltip.tsx
│       └── utils.ts
└── TEMPLATE_SUMMARY.md (this file)
```

---

## 🚀 Next Steps

### Phase 1: Verify Template (Now)
- [ ] Review layout at `http://localhost:3000/dashboard/chat`
- [ ] Check color palette (light theme)
- [ ] Verify citation components render correctly
- [ ] Test responsive on mobile

### Phase 2: Refine Pages (Next)
- [ ] Fine-tune Chat layout
- [ ] Add more polish to RAG results
- [ ] Enhance TCP tier cards
- [ ] Review spacing and typography

### Phase 3: Build Dify Agents (Then)
- [ ] Create agents that return CitationResponse format
- [ ] Wire agents to API endpoints
- [ ] Test citation parsing and rendering
- [ ] Iterate on citation accuracy

### Phase 4: Complete Remaining Modules (After)
- [ ] Reach campaign builder
- [ ] Agent Tester debugging console
- [ ] Consultation Intelligence dashboard
- [ ] Stacking Agent (if needed)

---

## 💡 Design Decisions

| Decision | Rationale |
|----------|-----------|
| Light theme default | Professional, readable, matches reference designs |
| Citation in all modules | Consistency, trust, transparency across all outputs |
| Inline badges [1][2][3] | OpenEvidence UX pattern, improves readability |
| Card-based layouts | Clean, scannable, organized information hierarchy |
| Expandable references | Reduces cognitive load, shows detail on demand |
| Type-specific rendering | YouTube shows thumbnails, PDFs show icons, etc. |
| Confidence scores | Helps users assess evidence quality |
| Internal links to Supabase | Enables exploration of GL products and fuel docs |

---

## ✨ Key Features Ready

✅ Reusable citation components
✅ Light theme with CSS variables
✅ Responsive card layouts
✅ Type-safe citation data model
✅ Open for Dify agent integration
✅ Professional UI with proper hierarchy
✅ All pages follow same citation pattern
✅ Mobile-friendly design

---

## 📍 Dev Server

Run locally:
```bash
cd /c/Projects/a360-v2
npm run dev
# Runs on http://localhost:3000
```

Visit any page:
- Chat: `http://localhost:3000/dashboard/chat`
- RAG Search: `http://localhost:3000/dashboard/rag`
- TCP: `http://localhost:3000/dashboard/tcp`
- Reach: `http://localhost:3000/dashboard/reach`
- Agent Tester: `http://localhost:3000/dashboard/agent-tester`
- Consultation: `http://localhost:3000/dashboard/consultation`
