'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Moon, Sun } from 'lucide-react'

export default function ThemePage() {
  const [isDark, setIsDark] = useState(false)

  return (
    <div className={isDark ? 'dark' : ''}>
      <div className="min-h-screen bg-background text-foreground">
        {/* Header */}
        <div className="border-b border-border p-6">
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Theme Preview</h1>
              <p className="text-muted-foreground mt-1">OKLch Color System</p>
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setIsDark(!isDark)}
              className="rounded-full"
            >
              {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-6xl mx-auto p-6 space-y-12">
          {/* Colors */}
          <section className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-4">Colors</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {/* Background */}
                <div className="space-y-2">
                  <div className="h-24 rounded-lg border border-border bg-background flex items-center justify-center">
                    <span className="text-xs font-mono text-foreground">--background</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Background</p>
                </div>

                {/* Foreground */}
                <div className="space-y-2">
                  <div className="h-24 rounded-lg border border-border bg-foreground flex items-center justify-center">
                    <span className="text-xs font-mono text-background">--foreground</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Foreground</p>
                </div>

                {/* Card */}
                <div className="space-y-2">
                  <div className="h-24 rounded-lg border border-border bg-card flex items-center justify-center">
                    <span className="text-xs font-mono text-card-foreground">--card</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Card</p>
                </div>

                {/* Muted */}
                <div className="space-y-2">
                  <div className="h-24 rounded-lg border border-border bg-muted flex items-center justify-center">
                    <span className="text-xs font-mono text-muted-foreground">--muted</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Muted</p>
                </div>

                {/* Primary */}
                <div className="space-y-2">
                  <div className="h-24 rounded-lg border border-border bg-primary flex items-center justify-center">
                    <span className="text-xs font-mono text-primary-foreground">--primary</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Primary</p>
                </div>

                {/* Secondary */}
                <div className="space-y-2">
                  <div className="h-24 rounded-lg border border-border bg-secondary flex items-center justify-center">
                    <span className="text-xs font-mono text-secondary-foreground">--secondary</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Secondary</p>
                </div>

                {/* Accent */}
                <div className="space-y-2">
                  <div className="h-24 rounded-lg border border-border bg-accent flex items-center justify-center">
                    <span className="text-xs font-mono text-accent-foreground">--accent</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Accent</p>
                </div>

                {/* Destructive */}
                <div className="space-y-2">
                  <div className="h-24 rounded-lg border border-border bg-destructive flex items-center justify-center">
                    <span className="text-xs font-mono text-white">--destructive</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Destructive</p>
                </div>
              </div>
            </div>
          </section>

          <Separator />

          {/* Buttons */}
          <section className="space-y-6">
            <h2 className="text-2xl font-bold">Buttons</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button variant="default">Default</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="destructive">Destructive</Button>
              <Button variant="link">Link</Button>
              <Button disabled>Disabled</Button>
              <Button size="lg">Large</Button>
            </div>
          </section>

          <Separator />

          {/* Cards */}
          <section className="space-y-6">
            <h2 className="text-2xl font-bold">Cards</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Default Card</CardTitle>
                  <CardDescription>With header and content</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>This is a card with default styling using CSS variables.</p>
                </CardContent>
                <CardFooter>
                  <Button size="sm">Action</Button>
                </CardFooter>
              </Card>

              <Card className="bg-muted">
                <CardHeader>
                  <CardTitle>Muted Card</CardTitle>
                  <CardDescription>Using muted background</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>This card uses the muted background color.</p>
                </CardContent>
              </Card>

              <Card className="border-destructive">
                <CardHeader>
                  <CardTitle>Destructive Card</CardTitle>
                  <CardDescription>Error or danger state</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>This card shows a destructive action state.</p>
                </CardContent>
              </Card>

              <Card className="border-primary bg-primary/5">
                <CardHeader>
                  <CardTitle>Primary Card</CardTitle>
                  <CardDescription>Highlighted state</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>This card uses the primary color scheme.</p>
                </CardContent>
              </Card>
            </div>
          </section>

          <Separator />

          {/* Badges */}
          <section className="space-y-6">
            <h2 className="text-2xl font-bold">Badges</h2>
            <div className="flex flex-wrap gap-4">
              <Badge>Default</Badge>
              <Badge variant="secondary">Secondary</Badge>
              <Badge variant="outline">Outline</Badge>
              <Badge className="bg-destructive text-white">Destructive</Badge>
            </div>
          </section>

          <Separator />

          {/* Inputs */}
          <section className="space-y-6">
            <h2 className="text-2xl font-bold">Inputs</h2>
            <div className="space-y-4 max-w-md">
              <Input placeholder="Default input" />
              <Input placeholder="Disabled input" disabled />
              <input
                type="text"
                placeholder="Native input with theme"
                className="w-full px-4 py-2 rounded-lg border border-input bg-input text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
          </section>

          <Separator />

          {/* Typography */}
          <section className="space-y-6">
            <h2 className="text-2xl font-bold">Typography</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-3xl font-bold">Heading 3 (text-3xl)</h3>
                <p className="text-muted-foreground">Large heading</p>
              </div>
              <div>
                <h4 className="text-2xl font-bold">Heading 4 (text-2xl)</h4>
                <p className="text-muted-foreground">Medium heading</p>
              </div>
              <div>
                <p className="text-lg font-semibold">Body Text Large (text-lg)</p>
                <p className="text-muted-foreground">Body text secondary</p>
              </div>
              <div>
                <p className="text-base">Regular body text (text-base)</p>
                <p className="text-sm text-muted-foreground">Small text (text-sm)</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Extra small text (text-xs)</p>
              </div>
            </div>
          </section>

          <Separator />

          {/* States */}
          <section className="space-y-6">
            <h2 className="text-2xl font-bold">States</h2>
            <div className="space-y-4">
              <Card className="border-2 border-destructive bg-destructive/5">
                <CardHeader>
                  <CardTitle className="text-destructive">Error State</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-destructive">Something went wrong</p>
                </CardContent>
              </Card>

              <Card className="border-2 border-primary bg-primary/5">
                <CardHeader>
                  <CardTitle className="text-primary">Success State</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-primary">Operation completed</p>
                </CardContent>
              </Card>

              <Card className="bg-muted">
                <CardHeader>
                  <CardTitle>Loading State</CardTitle>
                </CardHeader>
                <CardContent className="flex items-center gap-3">
                  <div className="animate-spin h-4 w-4 border-2 border-primary border-t-transparent rounded-full" />
                  <p className="text-muted-foreground">Processing...</p>
                </CardContent>
              </Card>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
