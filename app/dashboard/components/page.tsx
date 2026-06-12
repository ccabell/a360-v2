'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { ScrollArea } from '@/components/ui/scroll-area'
import { MessageWithCitations } from '@/components/citations/message-with-citations'
import { ReferencesSection } from '@/components/citations/references-section'
import type { Citation } from '@/components/citations/types'
import { Send, Search, ArrowRight, AlertCircle, CheckCircle2, Info } from 'lucide-react'

export default function ComponentsPage() {
  const [activeTab, setActiveTab] = useState('overview')
  const [buttonVariant, setButtonVariant] = useState<'default' | 'outline' | 'destructive' | 'secondary' | 'ghost' | 'link'>('default')
  const [inputType, setInputType] = useState<'text' | 'email' | 'password' | 'search'>('text')
  const [cardState, setCardState] = useState<'default' | 'info' | 'success' | 'error' | 'empty' | 'loading'>('default')

  const sampleCitations: Citation[] = [
    {
      id: 'cit_1',
      number: 1,
      sourceType: 'pubmed',
      sourceId: '12345678',
      title: 'Clinical Efficacy of Botulinum Toxin Type A',
      evidence: 'FDA-approved for dynamic wrinkles, onset 3-7 days',
      confidence: 0.98,
      metadata: {
        pmid: '12345678',
        journal: 'Journal of Dermatology',
        year: 2024,
      },
    },
    {
      id: 'cit_2',
      number: 2,
      sourceType: 'youtube',
      sourceId: 'xyz123',
      title: 'Advanced Injectable Techniques Masterclass',
      evidence: 'Expert demonstration of proper injection placement',
      confidence: 0.95,
      metadata: {
        videoId: 'xyz123',
        duration: 2732,
      },
    },
    {
      id: 'cit_3',
      number: 3,
      sourceType: 'supabase',
      sourceId: 'prod_botox',
      title: 'Botox Product Information',
      evidence: 'Recommended dosage: 20-40 units per treatment area',
      confidence: 0.99,
      metadata: {
        table: 'gl_products',
        recordId: 'prod_botox',
      },
    },
  ]

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'buttons', label: 'Buttons' },
    { id: 'inputs', label: 'Inputs' },
    { id: 'cards', label: 'Cards' },
    { id: 'badges', label: 'Badges' },
    { id: 'citations', label: 'Citations' },
    { id: 'colors', label: 'Design System' },
  ]

  return (
    <div className="p-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Component Gallery</h1>
        <p className="text-muted-foreground mt-2">Interactive showcase of all UI components and design system</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-8 border-b border-border overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 font-medium border-b-2 transition-colors whitespace-nowrap ${
              activeTab === tab.id
                ? 'border-primary text-primary'
                : 'border-transparent text-muted-foreground hover:text-foreground'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="space-y-8">
        {/* Overview */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Component Library</CardTitle>
                <CardDescription>All shadcn/ui and custom components used in A360</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
                    <h3 className="font-semibold text-primary mb-2">Core Components</h3>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>✓ Button - All variants and sizes</li>
                      <li>✓ Input - Text inputs with states</li>
                      <li>✓ Card - Container component</li>
                      <li>✓ Badge - Labels and tags</li>
                    </ul>
                  </div>
                  <div className="p-4 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900 rounded-lg">
                    <h3 className="font-semibold text-emerald-900 dark:text-emerald-300 mb-2">Citation Components</h3>
                    <ul className="text-sm text-emerald-700 dark:text-emerald-400 space-y-1">
                      <li>✓ MessageWithCitations - Messages with citations</li>
                      <li>✓ ReferencesSection - Reference lists</li>
                      <li>✓ InlineCitationBadge - [1][2][3] badges</li>
                      <li>✓ ReferenceCard - Full citation details</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>How to Use This Gallery</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-foreground">
                  Each tab below shows a different component with interactive examples. You can:
                </p>
                <ul className="space-y-2 text-foreground">
                  <li>• <strong>Edit props</strong> - Change component properties using controls</li>
                  <li>• <strong>See variations</strong> - View all states and styles</li>
                  <li>• <strong>Copy code</strong> - Use components in your pages</li>
                  <li>• <strong>Check design system</strong> - See colors, spacing, typography</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Buttons */}
        {activeTab === 'buttons' && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Button Component</CardTitle>
                <CardDescription>Interactive button with variant selector</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Controls */}
                <div className="p-4 bg-muted/50 rounded-lg border border-border">
                  <label className="block text-sm font-semibold text-foreground mb-3">Variant:</label>
                  <div className="flex flex-wrap gap-2">
                    {(['default', 'outline', 'secondary', 'ghost', 'destructive', 'link'] as const).map((v) => (
                      <button
                        key={v}
                        onClick={() => setButtonVariant(v)}
                        className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                          buttonVariant === v
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-background border border-border text-foreground hover:bg-muted'
                        }`}
                      >
                        {v}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Preview */}
                <div className="p-8 bg-background border border-border rounded-lg flex items-center justify-center min-h-[200px]">
                  <div className="space-y-4">
                    <Button variant={buttonVariant} size="lg">
                      <Send className="h-4 w-4 mr-2" />
                      {buttonVariant.charAt(0).toUpperCase() + buttonVariant.slice(1)}
                    </Button>
                    <p className="text-sm text-muted-foreground">Variant: {buttonVariant}</p>
                  </div>
                </div>

                {/* All Variants */}
                <div className="space-y-4">
                  <h4 className="font-semibold text-foreground">All Variants:</h4>
                  <div className="flex flex-wrap gap-3">
                    <Button variant="default">Default</Button>
                    <Button variant="secondary">Secondary</Button>
                    <Button variant="outline">Outline</Button>
                    <Button variant="ghost">Ghost</Button>
                    <Button variant="destructive">Destructive</Button>
                    <Button variant="link">Link</Button>
                  </div>
                </div>

                {/* Sizes */}
                <div className="space-y-4">
                  <h4 className="font-semibold text-foreground">All Sizes:</h4>
                  <div className="flex flex-wrap gap-3 items-center">
                    <Button size="sm">Small</Button>
                    <Button size="default">Default</Button>
                    <Button size="lg">Large</Button>
                    <Button size="icon">
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* With Icons */}
                <div className="space-y-4">
                  <h4 className="font-semibold text-foreground">With Icons:</h4>
                  <div className="flex flex-wrap gap-3">
                    <Button>
                      <Send className="h-4 w-4 mr-2" />
                      Send
                    </Button>
                    <Button variant="outline">
                      <Search className="h-4 w-4 mr-2" />
                      Search
                    </Button>
                  </div>
                </div>

                {/* States */}
                <div className="space-y-4">
                  <h4 className="font-semibold text-foreground">States:</h4>
                  <div className="flex flex-wrap gap-3">
                    <Button disabled>Disabled</Button>
                    <Button disabled>
                      <div className="animate-spin h-4 w-4 mr-2 border-2 border-current border-t-transparent rounded-full" />
                      Loading
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Inputs */}
        {activeTab === 'inputs' && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Input Component</CardTitle>
                <CardDescription>Interactive input with type selector</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Controls */}
                <div className="p-4 bg-muted/50 rounded-lg border border-border">
                  <label className="block text-sm font-semibold text-foreground mb-3">Type:</label>
                  <div className="flex flex-wrap gap-2">
                    {(['text', 'email', 'password', 'search'] as const).map((t) => (
                      <button
                        key={t}
                        onClick={() => setInputType(t)}
                        className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                          inputType === t
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-background border border-border text-foreground hover:bg-muted'
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Preview */}
                <div className="p-8 bg-background border border-border rounded-lg">
                  <div className="space-y-4 max-w-sm">
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2">Input Preview:</label>
                      <Input
                        type={inputType}
                        placeholder={`Enter ${inputType}...`}
                        className="w-full"
                      />
                    </div>
                  </div>
                </div>

                {/* All Types */}
                <div className="space-y-4">
                  <h4 className="font-semibold text-foreground">All Input Types:</h4>
                  <div className="space-y-3 max-w-sm">
                    <div>
                      <label className="block text-xs font-semibold text-foreground mb-1">Text</label>
                      <Input type="text" placeholder="Enter text..." />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-foreground mb-1">Email</label>
                      <Input type="email" placeholder="you@example.com" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-foreground mb-1">Password</label>
                      <Input type="password" placeholder="••••••••" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-foreground mb-1">Search</label>
                      <Input type="search" placeholder="Search..." />
                    </div>
                  </div>
                </div>

                {/* States */}
                <div className="space-y-4">
                  <h4 className="font-semibold text-foreground">States:</h4>
                  <div className="space-y-3 max-w-sm">
                    <div>
                      <label className="block text-xs font-semibold text-foreground mb-1">Default</label>
                      <Input placeholder="Empty input" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-foreground mb-1">Filled</label>
                      <Input value="Some text" readOnly />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-foreground mb-1">Disabled</label>
                      <Input placeholder="Disabled" disabled />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-foreground mb-1">Error</label>
                      <Input placeholder="Invalid" className="border-destructive" />
                      <p className="text-xs text-destructive mt-1">This field is required</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Cards */}
        {activeTab === 'cards' && (
          <div className="space-y-6">
            {/* State Selector */}
            <div className="p-4 bg-muted/50 rounded-lg border border-border">
              <label className="block text-sm font-semibold text-foreground mb-3">Card State:</label>
              <div className="flex flex-wrap gap-2">
                {(['default', 'info', 'success', 'error', 'empty', 'loading'] as const).map((s) => (
                  <button
                    key={s}
                    onClick={() => setCardState(s)}
                    className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                      cardState === s
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-background border border-border text-foreground hover:bg-muted'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Default Card */}
            {cardState === 'default' && (
              <Card className="border-border">
                <CardHeader>
                  <CardTitle>Default Card</CardTitle>
                  <CardDescription>Standard card with header, content, and footer</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-foreground">This is the content area of the card.</p>
                </CardContent>
                <CardFooter className="flex gap-2">
                  <Button variant="outline">Cancel</Button>
                  <Button>Save</Button>
                </CardFooter>
              </Card>
            )}

            {/* Info Card */}
            {cardState === 'info' && (
              <Card className="border-primary/20 bg-primary/5">
                <CardHeader>
                  <div className="flex items-start gap-3">
                    <Info className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <CardTitle className="text-primary">Information</CardTitle>
                      <CardDescription className="text-primary/80">This is an info message</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-foreground">Use this card to display helpful information to users.</p>
                </CardContent>
              </Card>
            )}

            {/* Success Card */}
            {cardState === 'success' && (
              <Card className="border-emerald-200 dark:border-emerald-900 bg-emerald-50 dark:bg-emerald-950/40">
                <CardHeader>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-emerald-600 mt-0.5" />
                    <div>
                      <CardTitle className="text-emerald-900 dark:text-emerald-300">Success!</CardTitle>
                      <CardDescription className="text-emerald-700 dark:text-emerald-400">Operation completed</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-emerald-800 dark:text-emerald-300">Your action was completed successfully.</p>
                </CardContent>
              </Card>
            )}

            {/* Error Card */}
            {cardState === 'error' && (
              <Card className="border-destructive/30 bg-destructive/5">
                <CardHeader>
                  <div className="flex items-start gap-3">
                    <AlertCircle className="h-5 w-5 text-destructive mt-0.5" />
                    <div>
                      <CardTitle className="text-destructive">Error</CardTitle>
                      <CardDescription className="text-destructive/80">Something went wrong</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-foreground">Unable to complete your request. Please try again.</p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="text-destructive">
                    Retry
                  </Button>
                </CardFooter>
              </Card>
            )}

            {/* Empty State */}
            {cardState === 'empty' && (
              <Card className="p-12 text-center border-dashed border-border bg-muted/50">
                <div className="text-4xl mb-4">🔍</div>
                <CardTitle className="mb-2">No results found</CardTitle>
                <CardDescription className="mb-6">Try adjusting your search terms</CardDescription>
                <Button>Start New Search</Button>
              </Card>
            )}

            {/* Loading State */}
            {cardState === 'loading' && (
              <Card className="p-8 text-center bg-muted/50 border-border">
                <div className="flex items-center justify-center gap-3">
                  <div className="animate-spin h-5 w-5 border-2 border-primary/30 border-t-primary rounded-full" />
                  <p className="text-muted-foreground font-medium">Loading...</p>
                </div>
              </Card>
            )}

            {/* Grid Layout */}
            <div className="space-y-4">
              <h3 className="font-semibold text-foreground">3-Tier Card Grid:</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Tier 1</CardTitle>
                    <CardDescription>$400-600</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-foreground">Foundation plan</p>
                  </CardContent>
                </Card>
                <Card className="border-primary/30 ring-2 ring-primary">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>Tier 2</CardTitle>
                        <CardDescription>$1,200-1,800</CardDescription>
                      </div>
                      <Badge className="bg-primary/10 text-primary">RECOMMENDED</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-foreground">Advanced plan</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Tier 3</CardTitle>
                    <CardDescription>$2,500-4,000</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-foreground">Premium plan</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        )}

        {/* Badges */}
        {activeTab === 'badges' && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Badge Component</CardTitle>
                <CardDescription>All badge variants and use cases</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="font-semibold text-foreground mb-3">Variants:</h4>
                  <div className="flex flex-wrap gap-3">
                    <Badge variant="default">Default</Badge>
                    <Badge variant="secondary">Secondary</Badge>
                    <Badge variant="outline">Outline</Badge>
                  </div>
                </div>

                <Separator />

                <div>
                  <h4 className="font-semibold text-foreground mb-3">Status Colors:</h4>
                  <div className="flex flex-wrap gap-3">
                    <Badge className="bg-primary/10 text-primary">Info</Badge>
                    <Badge className="bg-emerald-100 text-emerald-700">Success</Badge>
                    <Badge className="bg-amber-100 text-amber-700">Warning</Badge>
                    <Badge className="bg-red-100 text-red-700">Error</Badge>
                  </div>
                </div>

                <Separator />

                <div>
                  <h4 className="font-semibold text-foreground mb-3">Source Types:</h4>
                  <div className="flex flex-wrap gap-3">
                    <Badge className="bg-emerald-100 text-emerald-700">📚 PubMed</Badge>
                    <Badge className="bg-red-100 text-red-700">🎥 YouTube</Badge>
                    <Badge className="bg-primary/10 text-primary">📝 Internal</Badge>
                    <Badge className="bg-orange-100 text-orange-700">📄 PDF</Badge>
                    <Badge className="bg-purple-100 text-purple-700">🎙️ Podcast</Badge>
                  </div>
                </div>

                <Separator />

                <div>
                  <h4 className="font-semibold text-foreground mb-3">Tier Badges:</h4>
                  <div className="flex flex-wrap gap-3">
                    <Badge className="bg-muted text-muted-foreground">Tier 1</Badge>
                    <Badge className="bg-primary/10 text-primary">Tier 2</Badge>
                    <Badge className="bg-purple-100 text-purple-700">Tier 3</Badge>
                    <Badge className="bg-amber-100 text-amber-700">RECOMMENDED</Badge>
                  </div>
                </div>

                <Separator />

                <div>
                  <h4 className="font-semibold text-foreground mb-3">Confidence Scores:</h4>
                  <div className="flex flex-wrap gap-3">
                    <Badge className="bg-emerald-100 text-emerald-700">✓ 98% Confident</Badge>
                    <Badge className="bg-primary/10 text-primary">✓ 92% Confident</Badge>
                    <Badge className="bg-amber-100 text-amber-700">✓ 78% Confident</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Citations */}
        {activeTab === 'citations' && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Citation Components</CardTitle>
                <CardDescription>Messages with citations and reference sections</CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                <div>
                  <h4 className="font-semibold text-foreground mb-4">Message with Single Citation:</h4>
                  <div className="p-4 bg-muted/50 rounded-lg border border-border">
                    <MessageWithCitations
                      role="agent"
                      message="Botox is FDA-approved for dynamic wrinkles[1] and typically takes 3-7 days for full effect."
                      citations={[sampleCitations[0]]}
                    />
                  </div>
                </div>

                <Separator />

                <div>
                  <h4 className="font-semibold text-foreground mb-4">Message with Multiple Citations:</h4>
                  <div className="p-4 bg-muted/50 rounded-lg border border-border">
                    <MessageWithCitations
                      role="agent"
                      message="Botox is FDA-approved for dynamic wrinkles[1]. The best injection technique is demonstrated in this masterclass[2]. The recommended dosage is 20-40 units per treatment area[3]."
                      citations={sampleCitations}
                    />
                  </div>
                </div>

                <Separator />

                <div>
                  <h4 className="font-semibold text-foreground mb-4">References Section:</h4>
                  <div className="p-4 bg-muted/50 rounded-lg border border-border">
                    <ReferencesSection citations={sampleCitations} defaultExpanded={false} />
                  </div>
                </div>

                <Separator />

                <div>
                  <h4 className="font-semibold text-foreground mb-4">Citation Source Types:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900 rounded">
                      <p className="font-semibold text-emerald-900 dark:text-emerald-300">📚 PubMed</p>
                      <p className="text-xs text-emerald-700 dark:text-emerald-400">Peer-reviewed research</p>
                    </div>
                    <div className="p-3 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 rounded">
                      <p className="font-semibold text-red-900 dark:text-red-300">🎥 YouTube</p>
                      <p className="text-xs text-red-700 dark:text-red-400">Video content</p>
                    </div>
                    <div className="p-3 bg-primary/5 border border-primary/20 rounded">
                      <p className="font-semibold text-primary">📝 Internal</p>
                      <p className="text-xs text-primary/80">Product guides</p>
                    </div>
                    <div className="p-3 bg-orange-50 dark:bg-orange-950/40 border border-orange-200 dark:border-orange-900 rounded">
                      <p className="font-semibold text-orange-900 dark:text-orange-300">📄 PDF</p>
                      <p className="text-xs text-orange-700 dark:text-orange-400">Documents</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Design System */}
        {activeTab === 'colors' && (
          <div className="space-y-6">
            {/* Colors */}
            <Card>
              <CardHeader>
                <CardTitle>Color System (Theme Tokens)</CardTitle>
                <CardDescription>Semantic tokens — adapt automatically to light and dark</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="font-semibold text-foreground mb-3">Text Colors</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <div className="p-3 border border-border rounded">
                      <div className="text-foreground font-semibold mb-1">Primary</div>
                      <p className="text-xs text-muted-foreground">text-foreground</p>
                    </div>
                    <div className="p-3 border border-border rounded">
                      <div className="text-muted-foreground font-semibold mb-1">Muted</div>
                      <p className="text-xs text-muted-foreground">text-muted-foreground</p>
                    </div>
                    <div className="p-3 border border-border rounded">
                      <div className="text-primary font-semibold mb-1">Accent</div>
                      <p className="text-xs text-muted-foreground">text-primary</p>
                    </div>
                    <div className="p-3 border border-border rounded">
                      <div className="text-destructive font-semibold mb-1">Destructive</div>
                      <p className="text-xs text-muted-foreground">text-destructive</p>
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h4 className="font-semibold text-foreground mb-3">Surface Tokens</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <div className="p-3 bg-background border border-border rounded">
                      <div className="text-foreground font-semibold mb-1">Background</div>
                      <p className="text-xs text-muted-foreground">bg-background</p>
                    </div>
                    <div className="p-3 bg-card border border-border rounded">
                      <div className="text-card-foreground font-semibold mb-1">Card</div>
                      <p className="text-xs text-muted-foreground">bg-card</p>
                    </div>
                    <div className="p-3 bg-muted border border-border rounded">
                      <div className="text-foreground font-semibold mb-1">Muted</div>
                      <p className="text-xs text-muted-foreground">bg-muted</p>
                    </div>
                    <div className="p-3 bg-primary border border-border rounded">
                      <div className="text-primary-foreground font-semibold mb-1">Primary</div>
                      <p className="text-xs text-primary-foreground/80">bg-primary</p>
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h4 className="font-semibold text-foreground mb-3">Status Colors</h4>
                  <p className="text-xs text-muted-foreground mb-3">
                    Semantic status hues — no theme token yet, used sparingly for success/warning/error signals.
                  </p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <div className="p-3 bg-primary/5 border border-primary/20 rounded">
                      <div className="text-primary font-semibold mb-1">Info</div>
                      <p className="text-xs text-primary/80">primary</p>
                    </div>
                    <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900 rounded">
                      <div className="text-emerald-900 dark:text-emerald-300 font-semibold mb-1">Success</div>
                      <p className="text-xs text-emerald-700 dark:text-emerald-400">emerald</p>
                    </div>
                    <div className="p-3 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900 rounded">
                      <div className="text-amber-900 dark:text-amber-300 font-semibold mb-1">Warning</div>
                      <p className="text-xs text-amber-700 dark:text-amber-400">amber</p>
                    </div>
                    <div className="p-3 bg-destructive/5 border border-destructive/20 rounded">
                      <div className="text-destructive font-semibold mb-1">Error</div>
                      <p className="text-xs text-destructive/80">destructive</p>
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h4 className="font-semibold text-foreground mb-3">Citation Source Colors</h4>
                  <p className="text-xs text-muted-foreground mb-3">
                    Source-type taxonomy used by ReferenceCard.
                  </p>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900 rounded">
                      <p className="text-emerald-900 dark:text-emerald-300 font-semibold">📚 PubMed</p>
                      <p className="text-xs text-emerald-700 dark:text-emerald-400">emerald</p>
                    </div>
                    <div className="p-3 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 rounded">
                      <p className="text-red-900 dark:text-red-300 font-semibold">🎥 YouTube</p>
                      <p className="text-xs text-red-700 dark:text-red-400">red</p>
                    </div>
                    <div className="p-3 bg-primary/5 border border-primary/20 rounded">
                      <p className="text-primary font-semibold">📝 Internal</p>
                      <p className="text-xs text-primary/80">primary</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Spacing */}
            <Card>
              <CardHeader>
                <CardTitle>Spacing Scale</CardTitle>
                <CardDescription>Padding, margin, and gap values</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-4">
                    <span className="w-20 font-mono text-sm text-muted-foreground">p-4</span>
                    <div className="h-4 bg-primary/30" style={{ width: '1rem' }}></div>
                    <span className="text-sm text-muted-foreground">1rem (16px)</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="w-20 font-mono text-sm text-muted-foreground">p-6</span>
                    <div className="h-4 bg-primary/30" style={{ width: '1.5rem' }}></div>
                    <span className="text-sm text-muted-foreground">1.5rem (24px)</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="w-20 font-mono text-sm text-muted-foreground">p-8</span>
                    <div className="h-4 bg-primary/30" style={{ width: '2rem' }}></div>
                    <span className="text-sm text-muted-foreground">2rem (32px)</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Typography */}
            <Card>
              <CardHeader>
                <CardTitle>Typography</CardTitle>
                <CardDescription>Heading, body, and helper text styles</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-2xl font-bold text-foreground mb-1">Page Title (h2)</h3>
                  <p className="text-xs text-muted-foreground">text-2xl font-bold text-foreground</p>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-foreground mb-1">Section Title (h3)</h4>
                  <p className="text-xs text-muted-foreground">text-lg font-semibold text-foreground</p>
                </div>
                <div>
                  <p className="text-base text-foreground mb-1">Body Text (p)</p>
                  <p className="text-xs text-muted-foreground">text-base text-foreground</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Secondary Text</p>
                  <p className="text-xs text-muted-foreground">text-sm text-muted-foreground</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Helper Text</p>
                  <p className="text-xs text-muted-foreground">text-xs text-muted-foreground</p>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
