# Design-First Workflow

How to design pages BEFORE building them.

---

## 📋 The 5-Step Design Process

### **Step 1: Read the Page Design (5 min)**

**File**: `docs/PAGE_DESIGNS.md`

**Do**:
- Read the page purpose and goals
- Study the wireframe/layout
- Understand the key interactions
- Review the component list

**Output**: You know exactly what to build

---

### **Step 2: List Your Components (5 min)**

**Reference**: `docs/COMPONENT_INVENTORY.md`

**Do**:
- Copy the component list from PAGE_DESIGNS.md for your page
- For each component, read the entry in COMPONENT_INVENTORY.md
- Note the props and usage patterns
- Identify dependencies (e.g., ReferencesSection needs citations)

**Output**: A checklist of components to use

**Example (Chat page)**:
```
✓ ScrollArea - for messages (with h-[400px])
✓ ChatBubble - for user/agent messages
✓ MessageWithCitations - for agent responses
✓ ReferencesSection - expandable citations
✓ Input - for chat input
✓ Button - for send action
✓ Skeleton - for loading
```

---

### **Step 3: Sketch the Layout (10 min)**

**On paper or whiteboard**:

```
┌─────────────────────────────┐
│ Header (h2 + subtitle)      │
│ mb-8 spacing                │
└─────────────────────────────┘

┌─────────────────────────────┐
│ Main Content (p-8, max-w-4xl)│
│                              │
│ [Component 1]                │
│ space-y-6                    │
│ [Component 2]                │
│                              │
│ [Responsive: md:2col lg:3col]│
│                              │
└─────────────────────────────┘
```

**Do**:
- Sketch rough layout
- Mark spacing (gap-6, p-8, etc.)
- Note responsive breakpoints
- Identify state variations

**Output**: A visual blueprint before coding

---

### **Step 4: Create the Code Skeleton (15 min)**

**Use template** from `DESIGN_QUICK_REFERENCE.md`:

```tsx
'use client'

import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
// ... other imports

export default function PageName() {
  // State
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [data, setData] = useState(null)

  // Handlers
  const handleAction = async () => {
    // TODO: Implement
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      {/* Header - copy from DESIGN_QUICK_REFERENCE */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-900">Page Title</h2>
        <p className="text-sm text-slate-600 mt-1">Subtitle</p>
      </div>

      {/* Content sections - from PAGE_DESIGNS.md */}
      <div className="space-y-6">
        {/* Component 1 */}
        {/* Component 2 */}
        {/* Component 3 */}

        {/* States - copy from DESIGN_QUICK_REFERENCE */}
        {error && <ErrorCard error={error} />}
        {loading && <LoadingCard />}
        {data && <ContentCard data={data} />}
        {!loading && !data && <EmptyCard />}
      </div>
    </div>
  )
}
```

**Do**:
- Copy the page template
- Add comments for each section
- List components as TODOs
- Set up all state variables
- Create skeleton handlers

**Output**: Buildable code structure with placeholders

---

### **Step 5: Build Component by Component (varies)**

**Work through each TODO**:

1. **Import the component** from COMPONENT_INVENTORY.md
2. **Copy the usage pattern** from DESIGN_QUICK_REFERENCE.md
3. **Fill in props** with your data
4. **Add className overrides** as needed
5. **Wire event handlers**
6. **Test responsiveness**

**For citations specifically**:
- Use MessageWithCitations for agent messages
- Use ReferencesSection for standalone references
- Follow citation data types from API_CONTRACT.md

**Output**: Fully built page

---

## 🎯 Example: Building Chat Page

### Step 1: Read Design
✓ Read from PAGE_DESIGNS.md (Chat section)
✓ Understand: messages, citations, follow-ups

### Step 2: List Components
```
✓ ScrollArea (messages container)
✓ ChatBubble (user messages)
✓ MessageWithCitations (agent responses)
✓ ReferencesSection (citations)
✓ Input (chat input)
✓ Button (send)
✓ Skeleton (loading)
```

### Step 3: Sketch Layout
```
Header
  |
Messages (ScrollArea)
  | - ChatBubble (user)
  | - MessageWithCitations (agent)
  |   - ReferencesSection
  |
Input + Button
```

### Step 4: Create Skeleton
```tsx
'use client'

import { useState } from 'react'
import { ScrollArea } from '@/components/ui/scroll-area'
import { MessageWithCitations } from '@/components/citations/message-with-citations'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export default function ChatPage() {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSend = async () => {
    // TODO: Call API
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-900">Chat</h2>
        <p className="text-sm text-slate-600 mt-1">Ask questions with evidence</p>
      </div>

      <div className="space-y-6">
        {/* TODO: Messages area with ScrollArea */}
        {/* TODO: Input area with Input + Button */}
        {/* TODO: States (loading, error, empty) */}
      </div>
    </div>
  )
}
```

### Step 5: Build Components
```tsx
// Add ScrollArea with messages
<ScrollArea className="flex-1 pr-4 mb-6 border border-slate-200 rounded-lg p-6">
  <div className="space-y-4">
    {messages.map((msg) => (
      msg.role === 'user' ? (
        <ChatBubble key={msg.id} variant="sent">{msg.content}</ChatBubble>
      ) : (
        <MessageWithCitations 
          key={msg.id}
          message={msg.content}
          citations={msg.citations}
          role="agent"
        />
      )
    ))}
  </div>
</ScrollArea>

// Add Input + Button
<div className="flex gap-3">
  <Input
    placeholder="Ask an agent..."
    value={input}
    onChange={(e) => setInput(e.target.value)}
    disabled={loading}
  />
  <Button onClick={handleSend} disabled={loading}>
    Send
  </Button>
</div>
```

✅ **Page built from design!**

---

## 📚 Design Documents Quick Map

| When You Need | Use This File |
|---------------|---------------|
| Overview of all pages | `PAGE_DESIGNS.md` |
| Component options | `COMPONENT_INVENTORY.md` |
| Copy-paste patterns | `DESIGN_QUICK_REFERENCE.md` |
| Specific page design | `PAGE_DESIGNS.md` (section for that page) |
| Component usage | `COMPONENT_INVENTORY.md` + `DESIGN_QUICK_REFERENCE.md` |
| Responsive patterns | `DESIGN_QUICK_REFERENCE.md` |
| State patterns | `DESIGN_QUICK_REFERENCE.md` |

---

## ✅ Pre-Build Checklist

Before you start coding a page:

- [ ] Read `PAGE_DESIGNS.md` section for your page
- [ ] List all components needed
- [ ] Sketch layout on paper
- [ ] Understand all state variations (empty, loading, error, success)
- [ ] Know responsive breakpoints
- [ ] Have copy-paste patterns ready from DESIGN_QUICK_REFERENCE.md

---

## 🚀 Building Multiple Pages Efficiently

**Process**:
1. Design all 6 pages (read PAGE_DESIGNS.md for all)
2. Build pages in parallel:
   - Page 1 (Person A)
   - Page 2 (Person B)
   - Page 3 (Person C)
   - etc.

**Each person follows the 5-step process independently**

**All reference the same**:
- COMPONENT_INVENTORY.md (components)
- DESIGN_QUICK_REFERENCE.md (patterns)
- PAGE_DESIGNS.md (their specific page)

**Result**: Consistent, fast, parallel page development

---

## 🎓 Key Principles

### 1. **Design Before Coding**
Read the design spec completely before writing code.

### 2. **Component Catalog**
Every component has documented usage. Don't reinvent.

### 3. **Patterns Not Templates**
Copy patterns, adapt to your needs, but maintain consistency.

### 4. **One Source of Truth**
COMPONENT_INVENTORY.md is your reference for all components.

### 5. **State Management**
Every page needs: empty, loading, error, success states.

### 6. **Responsive First**
Design for mobile, tablet, desktop from the start.

---

## 📖 Reading Order (First Time)

1. **DESIGN_QUICK_REFERENCE.md** (5 min) - See the system
2. **COMPONENT_INVENTORY.md** (10 min) - Know what's available
3. **PAGE_DESIGNS.md** (20 min) - Understand all pages
4. **PAGE_DESIGN_TEMPLATE.md** (5 min) - Know the structure
5. **This file (DESIGN_WORKFLOW.md)** (5 min) - How to execute

**Total**: 45 minutes to be fully oriented

---

## 🎯 Next Steps

1. Open `PAGE_DESIGNS.md`
2. Pick a page to build
3. Follow the 5-step process
4. Reference DESIGN_QUICK_REFERENCE.md while coding
5. Check COMPONENT_INVENTORY.md for component details

**You're ready to build!**

---

**Pro Tips**:
- Keep DESIGN_QUICK_REFERENCE.md open in a second window while coding
- Use keyboard search (Ctrl+F) to find components in the inventory
- Copy component patterns verbatim, then customize
- Test responsive design after each section

---

This workflow ensures:
- ✅ Consistent design across all pages
- ✅ Fast, parallel development
- ✅ Zero surprises during implementation
- ✅ Quality from day 1

