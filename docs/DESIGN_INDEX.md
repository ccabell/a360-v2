# Design System Index

Complete guide to A360 v2 design and component system.

---

## 📚 4 Core Design Documents

| Document | Purpose | Read Time | Use For |
|----------|---------|-----------|---------|
| **DESIGN_QUICK_REFERENCE.md** | Copy-paste patterns & snippets | 5 min | Building components |
| **COMPONENT_INVENTORY.md** | Complete component catalog | 10 min | Understanding what exists |
| **PAGE_DESIGNS.md** | Design specs for each page | 20 min | Planning each page |
| **DESIGN_WORKFLOW.md** | How to design before building | 5 min | Your development process |

---

## 🚀 Start Here

**First time?** Read in this order:
1. This file (2 min)
2. DESIGN_QUICK_REFERENCE.md (5 min)
3. COMPONENT_INVENTORY.md (10 min)
4. PAGE_DESIGNS.md (20 min)
5. DESIGN_WORKFLOW.md (5 min)

**Total**: 42 minutes to master the system

---

## 🎯 Building a Page (Quick Start)

### 1. Pick a Page from PAGE_DESIGNS.md
- Chat
- RAG Search
- TCP (Treatment Planning)
- Reach Campaign
- Agent Tester
- Consultation Intelligence

### 2. Read the Design Spec (5 min)
```
What it does
Who uses it
Components needed
Wireframe
Key interactions
States (empty, loading, error, success)
```

### 3. Follow Design Workflow (5 steps)
1. Read page design ✓
2. List components ✓
3. Sketch layout ✓
4. Create code skeleton ✓
5. Build component by component ✓

### 4. Reference While Building
- **Components**: COMPONENT_INVENTORY.md
- **Patterns**: DESIGN_QUICK_REFERENCE.md
- **Specific page**: PAGE_DESIGNS.md

### 5. Test & Verify
- Responsive on mobile/tablet/desktop
- All states working (empty, loading, error, success)
- Citations render correctly (if needed)

---

## 📁 Component Types Available

### **Layout Components**
- Card (data container)
- ScrollArea (scrollable content)
- Separator (visual divider)

### **Input Components**
- Input (text field)
- Button (action)
- Textarea (multi-line)

### **Data Display**
- Badge (labels/tags)
- Skeleton (loading placeholder)

### **Custom Components**
- InlineCitationBadge ([1], [2], [3])
- ReferenceCard (expandable citation)
- ReferencesSection (citation list)
- MessageWithCitations (message + citations)
- ChatBubble (message bubble)

---

## 🎨 Design System Rules

### Color Palette
```
Text:      text-slate-900, text-slate-700, text-slate-600
Background: bg-white, bg-slate-50, bg-slate-100
Borders:   border-slate-200
Status:    bg-blue-100, bg-emerald-100, bg-amber-100, bg-red-100
```

### Spacing Scale
```
p-4/p-6/p-8    → padding
gap-3/gap-4/gap-6 → grid/flex gaps
space-y-4/space-y-6 → vertical spacing
```

### Typography
```
h2: text-2xl font-bold text-slate-900
h3: text-lg font-semibold text-slate-900
p:  text-slate-700 (body), text-slate-600 (secondary)
```

### Responsive Breakpoints
```
Mobile: < 768px (default classes)
Tablet: md: 768px+
Desktop: lg: 1024px+
```

---

## 📖 Citation System (if your page uses citations)

### How Citations Work
1. Agent returns response with [1], [2], [3] markers
2. Citation data includes: id, number, sourceType, sourceId, title, evidence, metadata
3. Frontend renders with MessageWithCitations component
4. User clicks [1] → ReferencesSection expands with details
5. User clicks link → Opens source (PubMed, YouTube, internal, etc.)

### Citation Types Supported
- `pubmed` → Links to PubMed
- `youtube` → Links with timestamp
- `supabase` → Internal links
- `pdf` → PDF downloads
- `transcript` → Consultation transcripts
- `agent_output` → AI reasoning

### Using Citations in Pages
```tsx
<MessageWithCitations
  message="Botox is FDA-approved[1]..."
  citations={[{ id, number, sourceType, ... }]}
  role="agent"
/>
```

---

## ✅ Quality Checklist

### Before Submitting a Page
- [ ] Follows PAGE_DESIGNS.md spec
- [ ] All components from COMPONENT_INVENTORY.md used correctly
- [ ] Loading state shows spinner + text
- [ ] Error state shows error card + retry
- [ ] Empty state shows helpful message + CTA
- [ ] Success state shows all content
- [ ] Responsive: works on mobile/tablet/desktop
- [ ] No console errors
- [ ] Keyboard navigation works
- [ ] Citations render if applicable
- [ ] All buttons have proper disabled states

---

## 🔗 Component Quick Links

### Most Used Components
- **Card**: Data containers → COMPONENT_INVENTORY.md
- **Input + Button**: Search/form patterns → DESIGN_QUICK_REFERENCE.md
- **MessageWithCitations**: Chat responses → COMPONENT_INVENTORY.md
- **ReferencesSection**: Citation lists → COMPONENT_INVENTORY.md

### Copy-Paste Patterns
See DESIGN_QUICK_REFERENCE.md for:
- Input + Button pattern
- Card container
- Empty state
- Loading state
- Error state
- Page header
- Responsive grid
- Button group
- State management pattern

---

## 📊 Page Building Checklist (Per Page)

### Design Phase
- [ ] Read PAGE_DESIGNS.md for your page
- [ ] List all components needed
- [ ] Sketch layout on paper
- [ ] Understand all states
- [ ] Note responsive breakpoints

### Build Phase
- [ ] Create code skeleton
- [ ] Import all components
- [ ] Add state management
- [ ] Build component by component
- [ ] Wire event handlers
- [ ] Test responsive design

### Test Phase
- [ ] Test on mobile (< 768px)
- [ ] Test on tablet (768-1024px)
- [ ] Test on desktop (> 1024px)
- [ ] Verify all states work
- [ ] Check keyboard navigation
- [ ] Run through quality checklist

---

## 🎓 Learning Path

**Goal**: Build pages consistently and quickly

### Level 1: Understand the System (45 min)
- Read all 4 design documents
- Understand component types
- Know the workflow

### Level 2: Build First Page (2-3 hours)
- Follow 5-step design workflow
- Reference documentation constantly
- Ask questions in Slack

### Level 3: Build More Pages (1-2 hours each)
- Second page is faster
- Third page is faster still
- Patterns become automatic

### Level 4: Master the System (after 3-4 pages)
- You know components by heart
- You can estimate build time accurately
- You can mentor others

---

## 🚀 Pro Tips

1. **Keep DESIGN_QUICK_REFERENCE.md open** while coding
2. **Use keyboard search** (Ctrl+F) in component inventory
3. **Copy patterns verbatim**, then customize
4. **Test responsive design** after each section
5. **Check states (empty/loading/error/success)** last
6. **Use TypeScript** for component props
7. **Follow spacing rules** exactly
8. **Group components** with space-y-X

---

## 🆘 Common Questions

**Q: Where do I find Button component patterns?**
A: DESIGN_QUICK_REFERENCE.md → "Button Patterns"

**Q: What components does my page need?**
A: PAGE_DESIGNS.md → Your page section → "Components Needed"

**Q: How do I make it responsive?**
A: DESIGN_QUICK_REFERENCE.md → "Responsive Patterns"

**Q: What if my page uses citations?**
A: COMPONENT_INVENTORY.md → "Custom Citation Components"

**Q: How do I handle loading states?**
A: DESIGN_QUICK_REFERENCE.md → "Loading State"

---

## 📋 Document Locations

All design docs are in `docs/`:
- docs/DESIGN_QUICK_REFERENCE.md
- docs/COMPONENT_INVENTORY.md
- docs/PAGE_DESIGNS.md
- docs/DESIGN_WORKFLOW.md
- docs/DESIGN_INDEX.md (this file)

---

## 🎯 Next Step

1. Open DESIGN_QUICK_REFERENCE.md
2. Pick a page from PAGE_DESIGNS.md
3. Follow the 5-step workflow
4. Start building!

---

**Status**: Complete design system ready for building
**Last Updated**: Today
**Pages Designed**: 6
**Components**: 13+
**Patterns**: 20+

You're ready. Go build! 🚀

