# Design Quick Reference

Keep this open while building. Copy-paste patterns and component usage.

---

## 🎨 Color System (Light Theme)

```
Text Colors:
text-slate-900    ← Primary (dark, titles, body)
text-slate-700    ← Secondary (descriptions)
text-slate-600    ← Tertiary (helper text)
text-slate-500    ← Muted (meta, timestamps)

Background Colors:
bg-white          ← Page background
bg-slate-50       ← Section background
bg-slate-100      ← Hover background

Border Colors:
border-slate-200  ← Standard border
border-slate-300  ← Stronger border

Status Colors:
bg-blue-100       ← Info/Primary
bg-emerald-100    ← Success
bg-amber-100      ← Warning
bg-red-100        ← Error/Danger
```

---

## 📐 Spacing Scale

```
p-4   = 1rem (16px)    padding
p-6   = 1.5rem (24px)
p-8   = 2rem (32px)

m-4   = 1rem spacing   margin
m-6   = 1.5rem
m-8   = 2rem

gap-3 = 0.75rem (12px) flex/grid gap
gap-4 = 1rem
gap-6 = 1.5rem

space-y-4 = 1rem      vertical spacing between children
space-y-6 = 1.5rem
```

---

## 🔤 Typography

```
Titles:
<h1 className="text-3xl font-bold text-slate-900">Page Title</h1>
<h2 className="text-2xl font-bold text-slate-900">Section Title</h2>
<h3 className="text-lg font-semibold text-slate-900">Subsection</h3>

Body Text:
<p className="text-slate-700">Main content paragraph</p>
<p className="text-slate-600">Secondary text</p>
<p className="text-sm text-slate-500">Helper text</p>

Links:
<a className="text-blue-600 hover:text-blue-700 hover:underline">Link</a>
```

---

## 🧩 Component Copy-Paste Templates

### Input + Button Pattern
```tsx
<div className="flex gap-3">
  <Input
    placeholder="Search..."
    value={query}
    onChange={(e) => setQuery(e.target.value)}
    className="flex-1"
  />
  <Button onClick={handleSearch} disabled={loading}>
    <SearchIcon className="h-4 w-4 mr-2" />
    Search
  </Button>
</div>
```

### Card Container
```tsx
<Card className="border-slate-200">
  <CardHeader>
    <CardTitle className="text-slate-900">Title</CardTitle>
    <CardDescription className="text-slate-600">
      Description
    </CardDescription>
  </CardHeader>
  <CardContent className="space-y-4">
    {/* Content here */}
  </CardContent>
  <CardFooter className="flex gap-2">
    <Button variant="outline">Cancel</Button>
    <Button>Confirm</Button>
  </CardFooter>
</Card>
```

### Empty State
```tsx
<Card className="p-12 text-center border-slate-200 bg-slate-50 border-dashed">
  <SearchIcon className="h-12 w-12 text-slate-400 mx-auto mb-4" />
  <p className="text-slate-700 font-medium">No results found</p>
  <p className="text-sm text-slate-500 mt-2">Try a different query</p>
  <Button className="mt-6">Create New</Button>
</Card>
```

### Loading State
```tsx
<Card className="p-8 text-center bg-slate-50 border-slate-200">
  <div className="flex items-center justify-center gap-3">
    <div className="animate-spin h-5 w-5 border-2 border-blue-400 border-t-blue-600 rounded-full" />
    <p className="text-slate-600">Loading...</p>
  </div>
</Card>
```

### Error State
```tsx
<Card className="p-4 border-red-200 bg-red-50">
  <p className="text-red-700 font-medium">Error</p>
  <p className="text-red-600 text-sm mt-1">{error}</p>
  <Button
    onClick={handleRetry}
    variant="outline"
    className="mt-3 text-red-600"
  >
    Try Again
  </Button>
</Card>
```

### Page Header
```tsx
<div className="mb-8">
  <h2 className="text-2xl font-bold text-slate-900">Page Title</h2>
  <p className="text-sm text-slate-600 mt-1">Subtitle or description</p>
</div>
```

### Responsive Grid
```tsx
{/* Single column on mobile, 2 on tablet, 3 on desktop */}
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {items.map((item) => (
    <Card key={item.id}>
      {/* Content */}
    </Card>
  ))}
</div>
```

---

## 📋 Citation Components Pattern

### Full Citation in Message
```tsx
<MessageWithCitations
  message="Botox is FDA-approved for dynamic wrinkles[1]. Studies show efficacy within 3-7 days[2]."
  citations={[
    {
      id: "cit_1",
      number: 1,
      sourceType: "pubmed",
      sourceId: "12345678",
      title: "Clinical Efficacy...",
      evidence: "FDA-approved for dynamic wrinkles",
      confidence: 0.98,
      metadata: { pmid: "12345678", journal: "...", year: 2024 }
    },
    {
      id: "cit_2",
      number: 2,
      sourceType: "pubmed",
      sourceId: "87654321",
      title: "Timeline and Efficacy...",
      evidence: "Onset within 3-7 days",
      confidence: 0.96,
      metadata: { pmid: "87654321", journal: "...", year: 2023 }
    }
  ]}
  role="agent"
/>
```

### Just References
```tsx
<ReferencesSection
  citations={citations}
  defaultExpanded={true}
  onExpandChange={(expanded) => setExpanded(expanded)}
/>
```

---

## 🔄 State Management Pattern

```tsx
const [loading, setLoading] = useState(false)
const [error, setError] = useState<string | null>(null)
const [data, setData] = useState<Data | null>(null)

const handleAction = async () => {
  setLoading(true)
  setError(null)
  
  try {
    const response = await fetch('/api/endpoint')
    const result = await response.json()
    setData(result)
  } catch (err) {
    setError(err instanceof Error ? err.message : 'Unknown error')
  } finally {
    setLoading(false)
  }
}

// Render based on state
{loading && <LoadingCard />}
{error && <ErrorCard error={error} onRetry={handleAction} />}
{!loading && !error && data && <ContentCard data={data} />}
{!loading && !error && !data && <EmptyCard />}
```

---

## 🎯 Button Patterns

### Primary Action
```tsx
<Button onClick={handleAction} className="w-full md:w-auto" size="lg">
  Primary Action
</Button>
```

### Button Group
```tsx
<div className="flex flex-col md:flex-row gap-2 w-full">
  <Button variant="outline" className="flex-1">Secondary</Button>
  <Button className="flex-1">Primary</Button>
</div>
```

### Disabled State
```tsx
<Button disabled={loading} onClick={handleAction}>
  {loading ? "Loading..." : "Click me"}
</Button>
```

---

## 📱 Responsive Patterns

```tsx
// Full width on mobile, fixed width on desktop
<div className="w-full md:max-w-md">
  <Input />
</div>

// Stack on mobile, row on desktop
<div className="flex flex-col md:flex-row gap-4">
  <div className="flex-1">Left</div>
  <div className="flex-1">Right</div>
</div>

// Hide on mobile, show on desktop
<div className="hidden md:block">
  Desktop only content
</div>

// Smaller font on mobile
<p className="text-sm md:text-base">Responsive text</p>
```

---

## 🎬 Animation Classes

```tsx
// Fade in (defined in globals.css)
className="fade-in"

// Hover effects
className="hover:bg-slate-100 transition-colors"
className="hover:shadow-md transition-shadow"

// Spinning loader
<div className="animate-spin h-5 w-5 border-2 border-blue-400 border-t-blue-600 rounded-full" />

// Transitions
className="transition-all duration-200"
className="transition-colors"
className="transition-opacity"
```

---

## ✅ Checklist Before Building a Page

- [ ] Read PAGE_DESIGNS.md for your page
- [ ] List all components you'll need
- [ ] Copy component structure from COMPONENT_INVENTORY.md
- [ ] Create basic layout with spacing
- [ ] Add empty/loading/error states
- [ ] Wire state management
- [ ] Add responsive breakpoints
- [ ] Test on mobile (< 768px)
- [ ] Test on tablet (768px - 1024px)
- [ ] Test on desktop (> 1024px)
- [ ] Check color contrast
- [ ] Check keyboard navigation

---

## 🚀 Building Order (Recommended)

1. **Layout structure** (Container + header + sections)
2. **Main components** (Cards, inputs, buttons)
3. **State management** (loading, error, success)
4. **Interactions** (Click handlers, API calls)
5. **Responsive design** (Mobile, tablet, desktop)
6. **Polish** (Animations, hover effects, accessibility)

---

## 📖 Common Page Structure Template

```tsx
'use client'

import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export default function PageName() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [data, setData] = useState(null)

  const handleAction = async () => {
    setLoading(true)
    setError(null)
    try {
      // API call
      setData(result)
    } catch (err) {
      setError('Error message')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-900">Page Title</h2>
        <p className="text-sm text-slate-600 mt-1">Subtitle</p>
      </div>

      {/* Content */}
      <div className="space-y-6">
        {/* Input section */}
        <Card>
          <CardHeader>
            <CardTitle>Input Section</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input placeholder="Enter..." />
            <Button onClick={handleAction} disabled={loading} className="w-full">
              {loading ? 'Loading...' : 'Submit'}
            </Button>
          </CardContent>
        </Card>

        {/* States */}
        {error && <ErrorCard error={error} />}
        {loading && <LoadingCard />}
        {data && <ContentCard data={data} />}
        {!loading && !data && <EmptyCard />}
      </div>
    </div>
  )
}
```

---

## 🎓 Design System Rules

**ALWAYS follow these:**

1. **Spacing**: Use space-y-X for vertical gaps, gap-X for grid/flex
2. **Colors**: Use slate-900 for text, white for background
3. **Rounded**: Use rounded-lg for cards, rounded-xl for larger components
4. **Max width**: Use max-w-4xl for content pages
5. **Padding**: Use p-8 for pages, p-6 for cards, p-4 for internal
6. **Gaps**: Use gap-6 for sections, gap-3 for components
7. **Loading**: Always show spinner + text
8. **Errors**: Always show error card with actionable message
9. **Empty**: Always show empty state with CTA
10. **Mobile**: Always test responsive design

---

**Reference this daily while building pages.** Print or bookmark this file.

