# 📚 Storybook Interactive Component Library

**A360 Storybook** is now set up with **all shadcn/ui components** and **custom citation components** - fully interactive with editable props.

---

## 🚀 Getting Started

### Start Storybook
```bash
npm run storybook
```

This starts Storybook on **http://localhost:6006**

### Access Online
Once running, open your browser to:
```
http://localhost:6006
```

---

## 📋 What's Included

### Core UI Components
- **Button** - All variants (default, destructive, outline, secondary, ghost, link) and sizes
- **Input** - Text inputs with all states (default, filled, disabled, error)
- **Card** - Container with header, content, footer subcomponents
- **Badge** - Tags and labels with variant options
- **Separator** - Visual dividers
- **ScrollArea** - Scrollable containers for long content

### Custom Citation Components  
- **MessageWithCitations** - Agent responses with inline [1][2][3] citations
- **ReferencesSection** - Expandable collapsible reference lists
- **InlineCitationBadge** - Clickable citation badges
- **ReferenceCard** - Full citation details by source type

### Design System
- **Color System** - All colors documented (text, background, status, source types)
- **Spacing Scale** - p-4, p-6, p-8, gap values
- **Typography** - Heading, body, helper text styles
- **Responsive Design** - Mobile (375px), Tablet (768px), Desktop (1280px)

---

## 🎯 How to Use Storybook

### 1. Navigate to a Component
- Left sidebar shows all components organized by category
- Click on any component to view it
- Example: `Components > Button > Default`

### 2. View Interactive Stories
- Each component has multiple **stories** (variations)
- Examples:
  - `Button` has: Default, Variants, Sizes, WithIcons, Disabled, Loading, FullWidth
  - `MessageWithCitations` has: SingleCitation, MultipleCitations, LongResponse, ConversationFlow
  - `Card` has: Default, InfoCard, SuccessCard, EmptyState, LoadingState, Grid

### 3. Edit Component Props in Controls Panel
- Look at the **Controls** panel (top-right area)
- Change any prop value and the component updates in real-time
- Example: For `Button`, change `variant` from "default" to "outline" and see it update

### 4. Test Responsive Design
- Top toolbar has a **viewport selector**
- Choose Mobile, Tablet, or Desktop to see responsive behavior
- Test how components adapt to different screen sizes

### 5. View Code & Copy
- Click the **"Show code"** button to see the implementation
- Click the **"Copy"** button to copy component code to clipboard
- Paste directly into your pages

### 6. Read Documentation
- Each story has a description explaining its purpose
- The **Docs** tab shows full documentation with prop tables
- Referenced in sidebar under each component

---

## 📖 Component Categories

### **Welcome**
- Overview of the entire design system
- Color palette guide
- Spacing scale reference
- Citation source types

### **Components/Button**
Story Examples:
- Default - Single button
- Variants - All 6 variants side-by-side
- Sizes - sm, default, lg, icon
- WithIcons - Buttons with Lucide icons
- Disabled - Disabled state
- Loading - Loading spinner state
- FullWidth - Full-width variants

### **Components/Input**
Story Examples:
- Default - Basic text input
- Types - email, password, number, search variants
- States - Empty, filled, disabled, error
- WithLabels - Input with labels
- Interactive - State management demo
- SearchInput - Search-specific styling

### **Components/Card**
Story Examples:
- Default - Full card (header, content, footer)
- Simple - Header + content only
- InfoCard - Blue info styling
- SuccessCard - Emerald success styling
- ErrorCard - Red error styling
- EmptyState - Empty state with icon + CTA
- LoadingState - Loading spinner
- WithBadge - Card with recommended badge
- Grid - 3-column responsive grid

### **Components/Badge**
Story Examples:
- Default - Single badge
- Variants - All 3 variants
- Status - Info, Success, Warning, Error colors
- SourceTypes - PubMed, YouTube, Internal, PDF, Podcast
- TierBadges - Tier 1/2/3, RECOMMENDED
- InContext - Badges used in real layouts
- ConfidenceScores - With confidence percentages

### **Components/Citations/MessageWithCitations**
Story Examples:
- SingleCitation - Message with one [1] citation
- MultipleCitations - Message with [1][2][3] citations
- UserMessage - User message (no citations)
- LongResponse - Full agent response
- MixedSources - Citations from different source types
- ConversationFlow - Full chat conversation example
- DenseCitations - Message with many citations

### **Components/Citations/ReferencesSection**
Story Examples:
- Default - Expanded references
- Collapsed - Collapsed by default (toggle to expand)
- SingleCitation - One reference only
- ManyCitations - 8 references
- MixedSources - PubMed, YouTube, PDF, Transcript, Supabase
- Interactive - Toggle state demo
- InContext - References below a message
- VariedConfidence - Different confidence score levels

### **Components/Utility**
- Separator - Section dividers
- ScrollArea - Scrollable containers
- Combined examples - Using multiple utilities together

---

## 🎨 Design Tokens Reference

### **Text Colors**
```
text-slate-900  → Primary (dark, strong)
text-slate-700  → Secondary (readable)
text-slate-600  → Tertiary (lighter)
text-slate-500  → Muted (very light)
```

### **Background Colors**
```
bg-white        → Page background
bg-slate-50     → Section background  
bg-slate-100    → Hover background
```

### **Status Colors**
```
bg-blue-100     → Info/Primary
bg-emerald-100  → Success  
bg-amber-100    → Warning
bg-red-100      → Error/Danger
```

### **Spacing Scale**
```
p-4   = 1rem (16px)
p-6   = 1.5rem (24px)
p-8   = 2rem (32px)

gap-3 = 0.75rem (12px)
gap-4 = 1rem
gap-6 = 1.5rem
```

---

## 📝 Citation Source Types

Storybook includes examples of all 6 citation source types:

| Type | Color | Usage |
|------|-------|-------|
| **PubMed** | Emerald | Clinical research, peer-reviewed articles |
| **YouTube** | Red | Video demonstrations, educational content |
| **Supabase** | Blue | Internal product guides, database content |
| **PDF** | Orange | Whitepapers, downloadable documents |
| **Transcript** | Purple | Consultation recordings, transcribed content |
| **Agent Output** | Gray | AI-generated analysis and recommendations |

---

## 🔧 Using Components in Your Pages

### 1. Read the Story
- Find the component in Storybook
- Look at the story that matches your use case
- Note the props being used

### 2. Copy the Code
- Click "Show Code" to see implementation
- Click "Copy" to copy the component code
- Paste into your page file

### 3. Customize Props
- Change props to match your needs
- Reference DESIGN_QUICK_REFERENCE.md for patterns
- Use the component inventory for available options

### 4. Test Responsiveness
- Test on mobile, tablet, desktop in Storybook
- Ensure responsive classes are included
- Check on actual device if needed

---

## 🎓 Example: Building a Page with Storybook

**Workflow:**
1. Open `/dashboard/rag` design in PAGE_DESIGNS.md
2. Open Storybook → Components > Card > Default
3. Study the Card structure and props
4. Open Storybook → Components > Input > Default
5. Open Storybook → Components/Citations/ReferencesSection
6. Use DESIGN_QUICK_REFERENCE.md spacing and colors
7. Build the page component by component
8. Refer back to Storybook as needed for variations

**Page Building Checklist:**
- [ ] Read component stories in Storybook
- [ ] Note component props needed
- [ ] Copy code from stories
- [ ] Customize colors and spacing
- [ ] Test responsive design
- [ ] Test all states (empty, loading, error)
- [ ] Compare with design reference

---

## 🚀 Next Steps

1. **Start Storybook**
   ```bash
   npm run storybook
   ```

2. **Explore Components**
   - Visit http://localhost:6006
   - Browse the Welcome page
   - Click on each component category

3. **Try Editing Props**
   - Find the Controls panel
   - Change props and see updates
   - Test responsive design

4. **Build Your Pages**
   - Reference Storybook while coding
   - Copy component code directly
   - Use the design system colors and spacing

5. **Share with Team**
   - Storybook URL can be shared
   - Run `npm run storybook:build` to create static build
   - Deploy to Vercel for team access

---

## 📚 Design Documents

- **PAGE_DESIGNS.md** - Detailed designs for each page/module
- **COMPONENT_INVENTORY.md** - Full component documentation
- **DESIGN_QUICK_REFERENCE.md** - Copy-paste patterns
- **DESIGN_WORKFLOW.md** - 5-step process for building pages
- **API_CONTRACT.md** - Dify agent integration schema

---

## 🐛 Troubleshooting

### Storybook won't start
```bash
# Kill any existing process
pkill -f "storybook dev"

# Clear cache
rm -rf node_modules/.cache

# Start again
npm run storybook
```

### Components not showing
- Make sure all files are in `/stories` directory
- Verify `.storybook/main.ts` points to correct stories path
- Check that component imports are correct

### Props not showing in Controls
- Ensure argTypes are defined in the story
- Component must be properly exported as default
- Check that props are using valid Tailwind classes

### Styling issues
- Verify `globals.css` is imported in preview
- Check that Tailwind classes exist
- Make sure component uses className prop

---

## 📦 File Structure

```
/c/Projects/a360-v2/
├── .storybook/
│   ├── main.ts           ← Storybook config
│   └── preview.ts        ← Global styles & settings
├── stories/
│   ├── Introduction.stories.tsx      ← Welcome page
│   ├── Button.stories.tsx            ← Button stories
│   ├── Input.stories.tsx             ← Input stories
│   ├── Card.stories.tsx              ← Card stories
│   ├── Badge.stories.tsx             ← Badge stories
│   ├── MessageWithCitations.stories.tsx
│   ├── ReferencesSection.stories.tsx
│   └── UtilityComponents.stories.tsx
└── package.json          ← storybook scripts
```

---

## 🎯 Key Points

✅ **All shadcn components are interactive** - Edit props in Controls panel
✅ **Responsive design built-in** - Test on mobile, tablet, desktop
✅ **Citation components documented** - See real examples
✅ **Design system visible** - Colors, spacing, typography
✅ **Copy-paste ready** - Take code directly to your pages
✅ **Fully documented** - Every story has description and usage

---

**Start Storybook now:**
```bash
npm run storybook
# Then open http://localhost:6006
```

Happy component exploring! 🎨✨
