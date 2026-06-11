# A360 Page Designs

Detailed design specs for each module. Use these as blueprints before building.

---

## Page 1: Chat

**Purpose**: Interactive conversation with AI agents, with citations and evidence-based responses

**Primary Users**: Practitioners asking treatment questions

**Key Goals**:
- Enable natural conversation with agents
- Show evidence/citations for every claim
- Allow follow-up questions
- Maintain conversation history

---

### Components Needed

| Component | Purpose | Quantity | Notes |
|-----------|---------|----------|-------|
| ScrollArea | Message container | 1 | Fixed height, scrollable |
| ChatBubble | User/agent messages | Dynamic | Variant by role |
| MessageWithCitations | Agent responses | Dynamic | With [1][2][3] citations |
| ReferencesSection | Expandable refs | Dynamic | Below each agent message |
| Input | Chat input | 1 | Placeholder: "Ask an agent..." |
| Button | Send button | 1 | Icon: Send, variant: default |
| Skeleton | Loading placeholder | 1 | While agent thinking |

### Layout
```
┌────────────────────────────────────────┐
│ Title: Chat with Agent                 │
│ Subtitle: Ask questions with evidence  │
└────────────────────────────────────────┘

┌────────────────────────────────────────┐
│          Message Area (ScrollArea)     │
│  ┌──────────────────────────────────┐  │
│  │ User: "What is Botox?"           │  │
│  │                                  │  │
│  │ Agent: "Botox is FDA-approved[1]│  │
│  │         with onset within 3-7    │  │
│  │         days[2]"                 │  │
│  │                                  │  │
│  │ References                       │  │
│  │ [1] Clinical Efficacy [Expand]   │  │
│  │ [2] Timeline and Efficacy [...]  │  │
│  │                                  │  │
│  │ Follow-up questions:             │  │
│  │ • Have you had Botox before?     │  │
│  │ • What is your timeline?         │  │
│  └──────────────────────────────────┘  │
│                                         │
│  [Loading: "Agent thinking..."]        │
│                                         │
└────────────────────────────────────────┘

┌────────────────────────────────────────┐
│ [Input: Ask an agent...]         [Send]│
└────────────────────────────────────────┘
```

### Key Interactions

**Send Message**:
- Trigger: Click Send or press Enter
- Action: POST /api/agents/consultation with message
- Feedback: Input disabled, spinner appears
- Result: Agent response with citations

**Expand Citation**:
- Trigger: Click [1] badge
- Action: Toggle ReferencesSection expand state
- Feedback: References section expands/collapses
- Result: See full citation details

**Click Citation Link**:
- Trigger: Click link in ReferenceCard
- Action: Open URL in new tab
- Feedback: External icon shown
- Result: User navigates to source

### States

**Empty**: First load
```
Icon: Sparkles (centered)
Message: "Start a conversation with the agent"
Helper: "Ask about treatments, evidence, or recommendations"
No input disabled
```

**Loading**: Waiting for agent
```
Spinner in chat area
Text: "Agent thinking..."
Input disabled
Send button disabled
```

**Error**: API failure
```
Error card in chat area
Message: "Something went wrong. Please try again."
Retry button
Input enabled
```

---

## Page 2: RAG Search

**Purpose**: Search knowledge base for evidence-based information

**Primary Users**: Practitioners researching topics

**Key Goals**:
- Find relevant research quickly
- Show sources and confidence
- Support detailed exploration
- Drive to citations

---

### Components Needed

| Component | Purpose | Quantity | Notes |
|-----------|---------|----------|-------|
| Input | Search box | 1 | Placeholder: "Search for treatments..." |
| Button | Search button | 1 | Icon: Search |
| Card | Result card | Dynamic | One per result |
| Badge | Source type | Dynamic | pubmed, youtube, internal, pdf |
| ReferencesSection | Results list | 1 | Alternative view of results |
| Separator | Section divider | Multiple | Between sections |

### Layout
```
┌────────────────────────────────────────┐
│ Title: Knowledge Base Search            │
│ Subtitle: Search across research, video│
└────────────────────────────────────────┘

┌────────────────────────────────────────┐
│ [Search input...] [Search button]      │
└────────────────────────────────────────┘

(After search:)

┌────────────────────────────────────────┐
│ Found 5 relevant results               │
│                                         │
│ [1] Clinical Efficacy... [Expand]      │
│     📚 PubMed • 2024                   │
│     ✓ 98% relevant                     │
│                                         │
│ [2] Advanced Techniques... [Expand]    │
│     🎥 YouTube • 12:34                 │
│     ✓ 92% relevant                     │
│                                         │
│ [3] Product Guide... [Expand]          │
│     📝 Internal • Updated 2024          │
│     ✓ 95% relevant                     │
│                                         │
└────────────────────────────────────────┘
```

### Key Interactions

**Search**:
- Trigger: Enter query, click Search
- Action: GET /api/search with query
- Feedback: Loading card
- Result: Results rendered below

**Expand Result**:
- Trigger: Click [Expand] on result
- Action: Toggle expanded state
- Feedback: Result expands to show details
- Result: Full metadata and link visible

**Click Link**:
- Trigger: Click source link
- Action: Open in new tab
- Feedback: External icon
- Result: Navigate to source

### States

**Initial**: Before search
```
Empty card (p-12, text-center, border-dashed)
Icon: Search (h-12)
Message: "Search the knowledge base"
Helper: "Includes PubMed, YouTube, research, internal docs"
Input active
```

**Loading**: Searching
```
Loading card
Spinner + "Searching knowledge base..."
Input disabled
```

**No Results**: Search returned nothing
```
Empty card
Message: "No results found"
Helper: "Try a different search term"
Search button active
```

**Results**: Found matches
```
List of ReferencesSection items
Each shows: Source badge + title + excerpt + link
Sorted by relevance
```

---

## Page 3: TCP (Treatment Care Planning)

**Purpose**: Generate personalized 3-tier treatment plans with evidence

**Primary Users**: Practitioners planning treatments

**Key Goals**:
- Collect patient information
- Generate 3-tier options
- Show evidence for each tier
- Support plan sharing

---

### Components Needed

| Component | Purpose | Quantity | Notes |
|-----------|---------|----------|-------|
| Card | Input container | 1 | Patient info form |
| Textarea | Patient details | 1 | Multi-line input |
| Button | Generate plan | 1 | Variant: default, size: lg |
| Card | Plan tier card | 3 | One per tier |
| Badge | Tier indicator | 3 | Tier 1/2/3 |
| Badge | RECOMMENDED | 1 | On Tier 2 only |
| ReferencesSection | Plan evidence | 3 | Citations per tier |

### Layout - Input State
```
┌────────────────────────────────────────┐
│ Title: Treatment Care Planning          │
│ Subtitle: Generate 3-tier treatment plans
└────────────────────────────────────────┘

┌────────────────────────────────────────┐
│ Patient Information                    │
│                                         │
│ [Textarea: patient details...]         │
│ [4 rows, multiline]                    │
│                                         │
│ [Generate 3-Tier Plan button]          │
│  (full width, size lg)                 │
└────────────────────────────────────────┘
```

### Layout - Plan State
```
┌────────────────────────────────────────┐
│ Recommended Approach (info card)       │
│ Start with Foundation, progress based  │
│ on goals and satisfaction              │
└────────────────────────────────────────┘

┌────────────────────────────────────────┐
│ Tier 1: Foundation Plan                │
│ $400-600 | 6-8 weeks                   │
│                                         │
│ Treatments:        Benefits:      Consid:
│ • Botox 20U        • Non-invasive • Maint
│ • Skincare         • Minimal DT   • Every
│                                         │
│ Evidence:                              │
│ [1] FDA-Approved [Expand]              │
│     ✓ 98% confident                    │
│                                         │
├────────────────────────────────────────┤
│ Tier 2: Advanced Plan [RECOMMENDED]    │
│ $1,200-1,800 | 8-12 weeks              │
│ ...                                    │
├────────────────────────────────────────┤
│ Tier 3: Premium Plan                   │
│ $2,500-4,000 | 12-16 weeks             │
│ ...                                    │
└────────────────────────────────────────┘

[Generate New Plan] [Send Plan to Patient]
```

### Key Interactions

**Generate Plan**:
- Trigger: Fill patient info, click button
- Action: POST /api/agents/tcp with patient data
- Feedback: "Generating..." loading state
- Result: 3 plan cards render below

**Plan Structure**:
- Header: Tier badge + title + cost/timeline
- Content: 3-column grid (Treatments, Benefits, Considerations)
- Evidence: ReferencesSection with citations

**Send Plan**:
- Trigger: Click "Send Plan to Patient"
- Action: POST /api/plans/{id}/send
- Feedback: Confirmation or draft email preview
- Result: Plan shared

### States

**Input**: Initial form
```
Textarea active
Button enabled
Help text: "Describe patient concerns, goals, budget"
```

**Loading**: Generating
```
Loading card: "Generating Treatment Plan..."
Textarea disabled
Button disabled
```

**Plans Generated**: Show all 3 tiers
```
Card for each tier
Recommended badge on Tier 2
Full citations per tier
Send button active
```

---

## Page 4: Reach Campaign Manager

**Purpose**: Create post-treatment engagement campaigns

**Primary Users**: Practice managers, marketers

**Key Goals**:
- Extract opportunities from consultations
- Create personalized campaigns
- Draft email templates
- Track engagement

---

### Components Needed

| Component | Purpose | Quantity | Notes |
|-----------|---------|----------|-------|
| Card | Empty state | 1 | When no campaigns |
| Button | Create campaign | 1 | Primary action |
| Input | Campaign search | 1 | Optional search |
| Card | Campaign card | Dynamic | List of campaigns |
| Badge | Status badge | Dynamic | Draft/Sent/Active |

### Layout
```
┌────────────────────────────────────────┐
│ Title: Reach Campaign Manager           │
│ Subtitle: Post-treatment engagement     │
└────────────────────────────────────────┘

┌────────────────────────────────────────┐
│                                         │
│  Icon: Mail                            │
│  "Create Post-Treatment Campaigns"     │
│  "Extract patient intent from consults"│
│                                         │
│  [Create Campaign button]              │
│                                         │
└────────────────────────────────────────┘
```

---

## Page 5: Agent Tester

**Purpose**: Debug and test individual agents

**Primary Users**: Developers, QA

**Key Goals**:
- Select agent
- Send test messages
- View raw responses
- Debug issues

---

### Components Needed

| Component | Purpose | Quantity | Notes |
|-----------|---------|----------|-------|
| Select | Agent selector | 1 | Dropdown of agents |
| Input | Test message | 1 | Text input |
| Button | Send test | 1 | Run agent |
| Card | Raw response | 1 | JSON display |
| Button | Copy JSON | 1 | Copy to clipboard |
| Badge | Status badge | 1 | Success/Error |

### Layout
```
┌────────────────────────────────────────┐
│ Title: Agent Tester                    │
│ Subtitle: Test agents and debug output │
└────────────────────────────────────────┘

┌────────────────────────────────────────┐
│ Select Agent:  [Dropdown]              │
│ Test Message:  [Input...]              │
│ [Send Test button]                     │
│                                         │
│ Response:                              │
│ ┌──────────────────────────────────┐   │
│ │ {                                │   │
│ │   "message": "Botox...",        │   │
│ │   "citations": [...],            │   │
│ │   "confidence": 0.95             │   │
│ │ }                                │   │
│ │                      [Copy JSON] │   │
│ └──────────────────────────────────┘   │
│                                         │
└────────────────────────────────────────┘
```

---

## Page 6: Consultation Intelligence

**Purpose**: Post-consultation analysis and KPI dashboard

**Primary Users**: Practitioners, clinic managers

**Key Goals**:
- Analyze conversation
- Extract KPIs
- Show recommendations
- Track outcomes

---

### Components Needed

| Component | Purpose | Quantity | Notes |
|-----------|---------|----------|-------|
| Card | KPI card | Multiple | One per metric |
| Badge | Status indicator | Dynamic | Green/Yellow/Red |
| ReferencesSection | Evidence | Dynamic | Support for KPIs |
| Input | Upload/paste | 1 | Consultation input |
| Button | Analyze | 1 | Trigger analysis |

### Layout
```
┌────────────────────────────────────────┐
│ Title: Consultation Intelligence        │
│ Subtitle: Real-time analysis dashboard │
└────────────────────────────────────────┘

┌────────────────────────────────────────┐
│ Upload Consultation:                   │
│                                         │
│ [Paste transcript or upload...]        │
│ [Analyze button]                       │
│                                         │
└────────────────────────────────────────┘

(After analysis:)

┌────────────────────────────────────────┐
│ KPI Summary                            │
│                                         │
│ [Treatment Interest: 92%] [Expand]    │
│ [Patient Concerns: 3] [Expand]        │
│ [Recommended Follow-up: Yes] [...]    │
│                                         │
│ Evidence:                              │
│ [1] AI Detected treatment desire...   │
│     ✓ High confidence                 │
│                                         │
└────────────────────────────────────────┘
```

---

## Design Consistency Rules

**All pages must follow:**

1. **Header Section**
   - h2 title (text-2xl, bold, slate-900)
   - Subtitle (text-sm, slate-600)
   - mb-8 margin

2. **Main Content**
   - max-w-4xl container
   - p-8 padding
   - space-y-6 section spacing

3. **Cards**
   - border-slate-200
   - bg-white default, bg-slate-50 on hover
   - rounded-lg

4. **Buttons**
   - Primary: variant="default" (blue)
   - Secondary: variant="outline"
   - Size: lg for main actions, default for secondary
   - Full width (w-full) for mobile-friendly

5. **Loading State**
   - Always show spinner + text
   - Disable all inputs
   - Disable all buttons

6. **Empty State**
   - p-12 center aligned
   - Icon (h-12 w-12)
   - Helpful message + CTA

7. **Error State**
   - Error card: border-red-200, bg-red-50
   - Error message in slate-900
   - Retry button

---

## Mobile Responsiveness

**All pages must work at:**
- **Mobile** (< 768px): Single column, full width, text-sm
- **Tablet** (768-1024px): 2 columns if applicable
- **Desktop** (> 1024px): Full layout with max-w-4xl

Example:
```tsx
// Grid that adapts
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

// Button that stacks on mobile
<div className="flex flex-col md:flex-row gap-2">
  <Button className="w-full">Primary</Button>
  <Button variant="outline" className="w-full">Secondary</Button>
</div>
```

---

This is your **design blueprint for all pages**. Follow these specs when building.

