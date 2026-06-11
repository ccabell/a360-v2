# A360 Component Inventory

Complete catalog of available UI components with usage patterns and props.

---

## 📦 **Core shadcn/ui Components**

### Layout Components

#### **Card**
```tsx
<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
    <CardDescription>Description</CardDescription>
  </CardHeader>
  <CardContent>Content here</CardContent>
  <CardFooter>Footer actions</CardFooter>
</Card>
```
**Props**: className, variant (default/outlined)
**When to use**: Primary content containers, data displays, sections
**Sizing**: Responsive, auto-width based on content

---

#### **ScrollArea**
```tsx
<ScrollArea className="h-[400px]">
  Long scrollable content here
</ScrollArea>
```
**Props**: className (set height)
**When to use**: Long message lists, large result sets, chat histories
**Styling**: Light gray scrollbar, smooth scrolling

---

### Input Components

#### **Input**
```tsx
<Input
  type="text"
  placeholder="Search..."
  value={value}
  onChange={(e) => setValue(e.target.value)}
  disabled={loading}
/>
```
**Props**: type, placeholder, value, onChange, disabled, className
**When to use**: Text input, search boxes, form fields
**States**: default, focus (blue ring), disabled (gray)

---

#### **Button**
```tsx
<Button
  variant="default" | "outline" | "ghost" | "destructive"
  size="default" | "sm" | "lg" | "icon"
  onClick={handler}
  disabled={loading}
>
  {loading ? "Loading..." : "Click me"}
</Button>
```
**Props**: variant, size, onClick, disabled, className
**Variants**: 
- `default`: Blue background (primary)
- `outline`: Border only (secondary)
- `ghost`: Text only (tertiary)
- `destructive`: Red (delete/dangerous)
**When to use**: All interactive actions

---

### Data Display Components

#### **Badge**
```tsx
<Badge variant="default" | "secondary" | "outline">
  Label
</Badge>
```
**Props**: variant, className
**When to use**: Tags, status indicators, type labels, metadata
**Variants**:
- `default`: Filled blue
- `secondary`: Light blue/gray
- `outline`: Border only

---

#### **Separator**
```tsx
<Separator className="my-4" />
```
**Props**: className (spacing)
**When to use**: Visual dividers between sections
**Styling**: Light gray line

---

### Feedback Components

#### **Skeleton** (if needed for loading)
```tsx
<div className="space-y-2">
  <Skeleton className="h-12 w-12 rounded-full" />
  <Skeleton className="h-4 w-[250px]" />
  <Skeleton className="h-4 w-[200px]" />
</div>
```
**When to use**: Loading placeholders while content loads

---

## 🎯 **Custom Citation Components**

### **InlineCitationBadge**
```tsx
<InlineCitationBadge
  number={1}
  citation={citation}
  onClick={() => scrollToCitation(citation.id)}
/>
```
**Props**: number, citation, onClick
**Renders**: `[1]` `[2]` `[3]` clickable badges in text
**Styling**: Blue background, hover effect
**When to use**: Inline in message text to reference sources

---

### **ReferenceCard**
```tsx
<ReferenceCard
  citation={citation}
  number={1}
/>
```
**Props**: citation, number
**Renders**: Full citation details (title, authors, journal, links)
**Styling**: Card with color-coded border by source type
**When to use**: Inside ReferencesSection, expandable reference display

**Citation source colors**:
- `pubmed`: Emerald/green
- `youtube`: Red
- `supabase`: Blue
- `pdf`: Orange
- `transcript`: Purple

---

### **ReferencesSection**
```tsx
<ReferencesSection
  citations={[citation1, citation2, citation3]}
  defaultExpanded={true}
  onExpandChange={(expanded) => console.log(expanded)}
/>
```
**Props**: citations[], defaultExpanded, onExpandChange
**Renders**: Collapsible "References (3)" with ReferenceCards inside
**When to use**: Below agent responses to show all sources

---

### **MessageWithCitations**
```tsx
<MessageWithCitations
  message="Botox is FDA-approved[1]..."
  citations={citations}
  role="agent" | "user"
  className="..."
/>
```
**Props**: message, citations, role, className
**Renders**: Message text with inline badges + expandable references
**When to use**: Chat bubbles that contain citations

---

## 🏗️ **Layout Patterns**

### **Page Structure**
```tsx
<div className="p-8 max-w-4xl mx-auto">
  {/* Header */}
  <div className="mb-8">
    <h2 className="text-2xl font-bold text-slate-900">Page Title</h2>
    <p className="text-sm text-slate-600 mt-1">Subtitle</p>
  </div>

  {/* Main Content */}
  <div className="space-y-6">
    {/* Sections */}
  </div>
</div>
```

---

### **Card Grid**
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  <Card>...</Card>
  <Card>...</Card>
  <Card>...</Card>
</div>
```

---

### **Input + Button Pattern**
```tsx
<div className="flex gap-3">
  <Input placeholder="Search..." value={query} onChange={handleChange} />
  <Button onClick={handleSearch} disabled={loading}>
    <SearchIcon className="h-4 w-4 mr-2" />
    Search
  </Button>
</div>
```

---

### **Empty State**
```tsx
<Card className="p-12 text-center border-slate-200 bg-slate-50 border-dashed">
  <SearchIcon className="h-12 w-12 text-slate-400 mx-auto mb-4" />
  <p className="text-slate-700 font-medium">No results found</p>
  <p className="text-sm text-slate-500 mt-2">Try a different search term</p>
</Card>
```

---

### **Loading State**
```tsx
<Card className="p-8 text-center bg-slate-50 border-slate-200">
  <div className="flex items-center justify-center gap-3">
    <div className="animate-spin h-5 w-5 border-2 border-blue-400 border-t-blue-600 rounded-full" />
    <p className="text-slate-600">Loading results...</p>
  </div>
</Card>
```

---

## 🎨 **Styling Utilities**

### **Text Styles**
```tsx
// Headings
<h1 className="text-3xl font-bold text-slate-900">Main Title</h1>
<h2 className="text-2xl font-bold text-slate-900">Section Title</h2>
<h3 className="text-lg font-semibold text-slate-900">Subsection</h3>

// Body text
<p className="text-slate-700">Main content paragraph</p>
<p className="text-slate-600">Secondary content</p>
<p className="text-slate-500 text-sm">Helper text or metadata</p>

// Links
<a className="text-blue-600 hover:text-blue-700 hover:underline">Link text</a>
```

---

### **Spacing**
```tsx
// Padding
p-4   // 1rem
p-6   // 1.5rem
p-8   // 2rem

// Margin
m-4, m-6, m-8
mt-4, mb-6, etc.

// Gap (flex/grid)
gap-2, gap-3, gap-4, gap-6

// Space between children
<div className="space-y-4">
  <Item />  {/* 1rem gap between items */}
  <Item />
</div>
```

---

### **Colors (Light Theme)**
```tsx
// Background
bg-white         // Page background
bg-slate-50      // Section background
bg-slate-100     // Hover background

// Text
text-slate-900   // Primary text (dark)
text-slate-700   // Secondary text
text-slate-600   // Tertiary text
text-slate-500   // Muted text

// Borders
border-slate-200 // Light border
border-slate-300 // Medium border

// Status colors
bg-blue-100      // Info/primary
bg-emerald-100   // Success/good
bg-amber-100     // Warning
bg-red-100       // Danger/error
```

---

### **Rounded Corners**
```tsx
rounded      // 0.375rem (4px)
rounded-lg   // 0.5rem (8px)
rounded-xl   // 0.75rem (12px)
rounded-2xl  // 1rem (16px)
rounded-full // 9999px (fully rounded)
```

---

### **Shadows**
```tsx
shadow-none   // No shadow
shadow-sm     // Small shadow
shadow        // Default shadow
shadow-md     // Medium shadow
shadow-lg     // Large shadow
```

---

## 📱 **Responsive Design**

### **Breakpoints**
```tsx
// Mobile-first: default
<div className="...">

// Tablet (768px)
<div className="md:...">

// Desktop (1024px)
<div className="lg:...">

// Large desktop (1280px)
<div className="xl:...">

// Full width (1536px)
<div className="2xl:...">
```

### **Examples**
```tsx
// Single column on mobile, 2 on tablet, 3 on desktop
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

// Full width input on mobile, max-w-lg on desktop
<div className="max-w-lg">
  <Input className="w-full" />
</div>

// Hide on mobile, show on tablet+
<div className="hidden md:block">
```

---

## 🔧 **Component State Patterns**

### **Loading State**
```tsx
const [loading, setLoading] = useState(false)

<Button disabled={loading}>
  {loading ? "Loading..." : "Search"}
</Button>

<Input disabled={loading} />
```

### **Error State**
```tsx
const [error, setError] = useState<string | null>(null)

{error && (
  <Card className="p-4 border-red-200 bg-red-50">
    <p className="text-red-700">{error}</p>
  </Card>
)}
```

### **Empty State**
```tsx
{results.length === 0 ? (
  <EmptyStateCard />
) : (
  <ResultsList results={results} />
)}
```

### **Expandable/Collapsible**
```tsx
const [expanded, setExpanded] = useState(false)

<ReferencesSection
  citations={citations}
  defaultExpanded={expanded}
  onExpandChange={setExpanded}
/>
```

---

## 📋 **Form Patterns**

### **Text Input**
```tsx
<div className="space-y-2">
  <label className="text-sm font-semibold text-slate-900">Label</label>
  <Input
    type="text"
    placeholder="Enter text..."
    value={value}
    onChange={(e) => setValue(e.target.value)}
  />
  <p className="text-xs text-slate-500">Helper text</p>
</div>
```

### **Textarea**
```tsx
<textarea
  placeholder="Enter details..."
  value={value}
  onChange={(e) => setValue(e.target.value)}
  className="w-full p-4 rounded-lg border border-slate-200 text-slate-900 placeholder-slate-500 mb-4 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50"
  rows={4}
/>
```

### **Select/Dropdown**
```tsx
<select className="w-full p-3 rounded-lg border border-slate-200 text-slate-900">
  <option>Option 1</option>
  <option>Option 2</option>
</select>
```

---

## ✨ **Animation & Interaction**

### **CSS Classes**
```tsx
// Fade in animation
className="animate-fadeIn"

// Hover effects
className="hover:bg-slate-100 transition-colors"
className="hover:shadow-md transition-shadow"
className="hover:underline"

// Disabled state
className="disabled:opacity-50 disabled:cursor-not-allowed"

// Focus states
className="focus:outline-none focus:ring-2 focus:ring-blue-500"
```

### **Transitions**
```tsx
className="transition-all duration-200"
className="transition-colors"
className="transition-opacity"
className="transition-transform"
```

---

## 🎯 **Quick Reference: Component Selection**

| Need | Component | Props |
|------|-----------|-------|
| Data container | `Card` | className |
| Text input | `Input` | type, placeholder, value, onChange |
| Button action | `Button` | variant, size, onClick, disabled |
| Tag/label | `Badge` | variant |
| Expandable list | `ReferencesSection` | citations, defaultExpanded |
| Inline reference | `InlineCitationBadge` | number, citation, onClick |
| Scrollable area | `ScrollArea` | className (with height) |
| Visual divider | `Separator` | className |
| Long content | `ScrollArea` | className |
| Loading state | Spinner div | animate-spin classes |
| Empty state | Card | p-12, text-center, border-dashed |

---

## 📐 **Page Templates**

### **Standard Page Layout**
```tsx
export default function PageName() {
  return (
    <div className="p-8 max-w-4xl mx-auto">
      {/* Header section */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-900">Page Title</h2>
        <p className="text-sm text-slate-600 mt-1">Subtitle/description</p>
      </div>

      {/* Content section */}
      <div className="space-y-6">
        {/* Content goes here */}
      </div>
    </div>
  )
}
```

### **Modal/Overlay Pattern**
```tsx
{showModal && (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
    <Card className="max-w-md">
      <CardHeader>
        <CardTitle>Dialog Title</CardTitle>
      </CardHeader>
      <CardContent>Content here</CardContent>
      <CardFooter className="flex gap-2">
        <Button variant="outline" onClick={handleCancel}>Cancel</Button>
        <Button onClick={handleConfirm}>Confirm</Button>
      </CardFooter>
    </Card>
  </div>
)}
```

---

This is your **complete component toolkit**. Use this when designing pages.

