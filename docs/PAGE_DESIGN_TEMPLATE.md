# Page Design Template

Use this template to design each page/module BEFORE building it.

---

## Page: [Module Name]

**Purpose**: [What does this page do? What problem does it solve?]

**Primary Users**: [Who uses this page? Practitioners? Admins? Both?]

**Key Goals**: 
- Goal 1
- Goal 2
- Goal 3

---

## 📐 Layout Structure

### Page Layout
```
┌─────────────────────────────────────────┐
│         Header                          │
│  ─────────────────────────────────────  │
│  Title, subtitle, breadcrumb            │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│         Main Content                    │
│                                         │
│  [Primary section/interaction]          │
│                                         │
│  [Results/Output section]               │
│                                         │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│         Footer/Actions                  │
│  [Related actions, next steps]          │
└─────────────────────────────────────────┘
```

---

## 🎨 Visual Design

### Color Palette
- **Background**: white
- **Text Primary**: slate-900
- **Text Secondary**: slate-600
- **Borders**: slate-200
- **Accents**: blue-600 (primary), emerald-600 (success), red-600 (error)

### Typography
- **Page Title** (h2): 24px, bold, slate-900
- **Section Title** (h3): 18px, semibold, slate-900
- **Body Text**: 14px, slate-700
- **Helper Text**: 12px, slate-500

### Spacing
- **Page padding**: 8 (32px)
- **Section gap**: 6 (24px)
- **Component gap**: 3-4 (12-16px)
- **Border radius**: lg (8px) to xl (12px)

---

## 📦 Components List

List the specific shadcn/custom components this page needs:

| Component | Purpose | Props | State |
|-----------|---------|-------|-------|
| Card | Container | className | - |
| Input | Search | placeholder, value, onChange | focus, disabled |
| Button | Primary action | variant="default", size="lg" | loading, disabled |
| Badge | Type indicator | variant="secondary" | - |
| ReferencesSection | Show citations | citations, defaultExpanded | expanded |

---

## 🔄 User Flow

### Primary Flow (Happy Path)
```
1. User lands on page
   ↓
2. See [initial state/prompt]
   ↓
3. User performs [primary action]
   ↓
4. System shows [results/output]
   ↓
5. User can [follow-up actions]
```

### Alternative Flows
```
No Results Flow:
  User performs action
  → System finds nothing
  → Show empty state with suggestions

Error Flow:
  User performs action
  → API error occurs
  → Show error card with retry button

Loading Flow:
  User performs action
  → Show loading spinner
  → Display results when ready
```

---

## 🎯 Key Interactions

### Interaction 1: [Name]
**Trigger**: [What causes this?]
**Action**: [What happens?]
**Feedback**: [What does user see/hear?]
**Result**: [What's the outcome?]

Example:
```
Trigger: User clicks search button
Action: API call to /api/search
Feedback: Loading spinner appears, button disabled
Result: Results render in list below
```

---

## 📊 Data Model

### State Variables
```typescript
interface PageState {
  loading: boolean
  error: string | null
  results: Result[]
  filters: {
    // filter options
  }
}
```

### Props (if component)
```typescript
interface PageProps {
  param1?: string
  param2?: number
}
```

### API Endpoints Needed
- `GET /api/[endpoint]` - Purpose
- `POST /api/[endpoint]` - Purpose
- `PUT /api/[endpoint]/{id}` - Purpose

---

## 🎬 Wireframe

ASCII art wireframe of the page layout:

```
┌──────────────────────────────────────────────────┐
│ Title: Chat with Agent                           │
│ Subtitle: Ask questions with evidence            │
└──────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────┐
│                                                  │
│  [Message 1 - User]                              │
│                                                  │
│  [Message 2 - Agent with citations]              │
│  Botox is FDA-approved[1]...                     │
│                                                  │
│  References (1)                                  │
│  [1] Clinical Efficacy...  [Expand]              │
│                                                  │
└──────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────┐
│ Input: Ask an agent...                    [Send] │
└──────────────────────────────────────────────────┘
```

---

## 📱 Responsive Design

### Mobile (< 768px)
- Single column layout
- Full-width cards
- Stacked buttons (vertical)
- Smaller fonts (text-sm)
- Reduced padding (p-4)

### Tablet (768px - 1024px)
- 2 column grid for results
- Inline buttons
- Medium padding (p-6)

### Desktop (> 1024px)
- 3+ column grid for results
- Max-width centered container
- Full padding (p-8)

---

## ✨ States & Variations

### State: Empty
```
Show when: No data/results yet
Display: Empty state card with icon + message + CTA
Example: "No messages yet. Start a conversation..."
```

### State: Loading
```
Show when: Fetching data/processing
Display: Spinner + "Loading..." text
Duration: Until data arrives or error occurs
```

### State: Error
```
Show when: API error or validation failure
Display: Error card with icon + message + retry button
Example: "Something went wrong. Please try again."
```

### State: Success
```
Show when: Data loaded successfully
Display: Full content with all components
Feedback: Brief success message (if needed)
```

---

## 🔗 Navigation & Links

### Internal Links
- To other modules: `/dashboard/[module-name]`
- To detail pages: `/dashboard/[module]/[id]`

### External Links
- PubMed articles: `https://pubmed.ncbi.nlm.nih.gov/{id}`
- YouTube videos: `https://youtube.com/watch?v={id}&t={timestamp}`
- Documentation: Links in ReferenceCard components

---

## 📋 Content Guidelines

### Placeholder Text
- Input placeholders: Action-oriented ("Search treatments...")
- Empty states: Encouraging ("Start by asking a question")
- Helper text: Instructional ("Use natural language")
- Error messages: Clear & actionable ("Enter at least 3 characters")

### Tone
- Professional but approachable
- Evidence-based language
- Clear CTAs ("Search", "View Details", "Send Plan")

---

## 🎯 Accessibility

### Keyboard Navigation
- Tab order logical
- Focus visible on all interactive elements
- Enter/Space activates buttons
- Escape closes modals

### Screen Readers
- All images have alt text
- Headings use proper hierarchy (h2, h3, not skipped)
- Buttons have clear labels
- Form inputs have associated labels

### Color Contrast
- Text: Minimum 4.5:1 ratio
- UI components: Minimum 3:1 ratio
- Don't rely on color alone for meaning

---

## 📦 Component Implementation Checklist

When building this page, ensure:

- [ ] All specified components are imported
- [ ] Props are passed correctly
- [ ] State is managed properly
- [ ] Loading state shows spinner
- [ ] Error state shows error card
- [ ] Empty state shows empty card
- [ ] Success state shows full content
- [ ] Responsive breakpoints work (mobile, tablet, desktop)
- [ ] Keyboard navigation works
- [ ] No console errors
- [ ] Component types match COMPONENT_INVENTORY.md

---

## 🧪 Testing Scenarios

### Test Case 1: [Scenario Name]
```
Given: [Setup/precondition]
When: [User action]
Then: [Expected result]
```

Example:
```
Given: User is on Chat page
When: User types "What is Botox?" and clicks Send
Then: Agent response appears with citations [1], [2], [3]
      User can click [1] to expand reference
      Reference card shows PubMed link
```

### Test Case 2: [Error Scenario]
```
Given: API is down
When: User performs action
Then: Error card appears with retry button
      Button click retries the action
```

### Test Case 3: [Empty State]
```
Given: No data exists
When: User lands on page
Then: Empty state message appears
      CTA guides user to take action
```

---

## 📝 Design Notes

### Key Decisions
- Why this layout?
- Why these components?
- Why this color scheme?

### Design Constraints
- Mobile-first responsive design
- Must work with dynamic content
- Must support citations/references

### Design Patterns Used
- Citation pattern (inline badges + expandable refs)
- Empty/loading/error states
- Standard CRUD operations (if applicable)

---

## 🔄 Iteration Plan

### Phase 1: Initial Build
- Implement layout structure
- Add basic components
- Wire state management

### Phase 2: Polish
- Add animations/transitions
- Refine spacing & typography
- Improve accessibility

### Phase 3: Integration
- Connect to real APIs
- Test with live data
- Gather user feedback

### Phase 4: Optimization
- Performance improvements
- Mobile responsiveness
- Final polish

---

## 📚 Reference Links

- **Component Library**: See COMPONENT_INVENTORY.md
- **Citation System**: See DIFY_INTEGRATION.md
- **API Contract**: See API_CONTRACT.md
- **Current Implementation**: See app/dashboard/[module]/page.tsx

---

**Design Status**: [ ] Draft [ ] Review [ ] Approved [ ] In Development

**Last Updated**: [Date]

**Designer**: [Name]

**Reviewers**: [Names]

